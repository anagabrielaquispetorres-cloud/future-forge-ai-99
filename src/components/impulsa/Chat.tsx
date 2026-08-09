import { useEffect, useRef, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { rankedOpportunities, type UserProfile } from "@/lib/impulsa-data";
import { Robot } from "./Robot";

type Msg = { id: number; from: "ia" | "user"; text: string };

const QUICK = ["Ver mis fortalezas", "Explorar opciones", "No sé qué hacer"];

function reply(input: string, p: UserProfile): string {
  const top = rankedOpportunities(p).slice(0, 3);
  const interests = p.interests.join(", ") || "lo que te mueve";
  const t = input.toLowerCase();

  if (t.includes("fortaleza"))
    return `${p.name}, en tus respuestas noté que destacas en ${p.strengths.join(" y ") || "varias cosas"}. Eso encaja muy bien con espacios donde puedas ${p.strengths.includes("Liderar") ? "coordinar equipos" : "aportar soluciones"} dentro de ${interests}.`;
  if (t.includes("explorar") || t.includes("opcion"))
    return `Con tu perfil (${interests}) te propongo empezar por: ${top.map((o) => `${o.emoji} ${o.title}`).join(", ")}. Entra a 🧭 Explora y prueba el mini reto de la que más te llame.`;
  if (t.includes("no sé") || t.includes("no se"))
    return `Tranqui, ${p.name}. No saber también es un punto de partida válido. Empecemos pequeño: de ${interests}, ¿cuál te daría más curiosidad probar una semana? No es una decisión para toda la vida.`;
  if (t.includes("miedo") || t.includes("presion") || t.includes("presión"))
    return `Te entiendo, ${p.name}. Sentir presión es normal, sobre todo cuando estás en etapa "${p.stage}". Recuerda que tu valor no depende de acertar a la primera. ¿Quieres que veamos un paso pequeño para esta semana?`;
  if (t.includes("beca") || t.includes("dinero") || t.includes("estudiar"))
    return `Hay becas alineadas a ${interests}. Filtra por "Becas" en 🧭 Explora y te muestro las que encajan contigo.`;
  return `Me quedo con eso, ${p.name}. Por lo que me cuentas y tus intereses en ${interests}, creo que vale la pena mirar ${top[0]?.title ?? "nuevas opciones"}. ¿Quieres que lo exploremos juntos?`;
}

export function Chat() {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "ia",
      text: `¡Hola ${profile.name}! Soy tu Guía IA. Vi que te interesa ${profile.interests.join(", ") || "explorar"}. ¿De qué quieres hablar hoy?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim().slice(0, 500);
    if (!value) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ia", text: reply(value, profile) }]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col pb-28">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-5 py-3 backdrop-blur">
        <Robot size={44} />
        <div>
          <p className="font-semibold">Guía IA</p>
          <p className="text-xs text-accent">en línea · te conoce</p>
        </div>
      </header>

      <div className="flex-1 space-y-4 px-5 py-5">
        {messages.map((m) =>
          m.from === "ia" ? (
            <div key={m.id} className="flex gap-2">
              <Robot size={28} className="mt-1 shrink-0" />
              <p className="max-w-[85%] text-sm leading-relaxed">{m.text}</p>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground">{m.text}</p>
            </div>
          ),
        )}
        {typing && <p className="text-sm text-accent">Guía IA está escribiendo…</p>}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-16 mx-auto max-w-md bg-background/95 px-5 pb-3 pt-2 backdrop-blur">
        <div className="mb-2 flex gap-2 overflow-x-auto">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)} className="chip-base shrink-0 border-accent/40 bg-accent/15 text-accent">
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escríbeme lo que sientes…"
            className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">➤</button>
        </form>
      </div>
    </div>
  );
}
