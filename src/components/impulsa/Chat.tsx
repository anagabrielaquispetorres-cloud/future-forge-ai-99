import { useEffect, useRef, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { rankedOpportunities, recommendedAreas, type UserProfile } from "@/lib/impulsa-data";
import { Robot } from "./Robot";

type Msg = { id: number; from: "ia" | "user"; text: string };

const QUICK = [
  "Ver mis fortalezas",
  "Explorar carreras técnicas",
  "Cursos gratuitos",
  "Becas para mí",
  "Voluntariados",
  "No sé qué hacer",
];

function reply(input: string, p: UserProfile): string {
  const ranked = rankedOpportunities(p);
  const top = ranked.slice(0, 3);
  const interests = p.interests.slice(0, 3).join(", ") || "lo que te mueve";
  const areas = recommendedAreas(p).join(", ");
  const t = input.toLowerCase();
  const byCat = (c: string) => ranked.filter((o) => o.category === c).slice(0, 3);

  if (t.includes("fortaleza"))
    return `${p.name}, en tus respuestas destacas en ${p.strengths.join(" y ") || "varias cosas"}. Eso encaja muy bien en ${areas}, sobre todo donde puedas ${p.strengths.includes("Liderar") ? "coordinar equipos" : "aportar soluciones"}.`;
  if (t.includes("técnic") || t.includes("tecnic") || t.includes("oficio"))
    return `Mira estas rutas técnicas con salida rápida: ${byCat("Formación Técnica").map((o) => `${o.emoji} ${o.title}`).join(", ")}. Son de corto plazo y puedes empezar a trabajar antes.`;
  if (t.includes("curso"))
    return `Cursos gratis alineados a ${interests}: ${byCat("Cursos Gratis").map((o) => o.title).join(", ")}. Cada uno trae su enlace real en 🧭 Explora.`;
  if (t.includes("beca") || t.includes("dinero") || t.includes("estudiar"))
    return `Becas que encajan contigo: ${byCat("Becas").map((o) => o.title).join(", ")}. Filtra por "🎓 Becas" en Explora y revisa requisitos.`;
  if (t.includes("voluntar"))
    return `Si quieres impacto real ya: ${byCat("Voluntariados").map((o) => o.title).join(", ")}. Es la forma más rápida de probar un área sin arriesgar nada.`;
  if (t.includes("trabajo") || t.includes("empleo"))
    return `Con tu perfil podrías empezar por ${byCat("Trabajo").map((o) => o.title).join(", ")}. Son puestos de entrada donde se aprende haciendo.`;
  if (t.includes("no sé") || t.includes("no se"))
    return `Tranqui, ${p.name}. No saber también es un punto de partida. De ${interests}, ¿cuál probarías una semana? Empieza con el mini reto de ${top[0]?.title ?? "alguna opción"}: no es una decisión para toda la vida.`;
  if (t.includes("miedo") || t.includes("presion") || t.includes("presión") || t.includes("triste"))
    return `Te entiendo, ${p.name}. Sentir presión en la etapa "${p.stage}" es normal. Tu valor no depende de acertar a la primera. ¿Vemos un paso pequeño para esta semana?`;
  if (t.includes("gracias"))
    return `Siempre, ${p.name} 💙 Aquí sigo cuando quieras seguir explorando.`;
  return `Me quedo con eso, ${p.name}. Por tus intereses en ${interests} y tus valores (${p.values.join(", ") || "los que elegiste"}), creo que vale la pena mirar ${top[0]?.title ?? "nuevas opciones"}. ¿Lo exploramos juntos?`;
}

export function Chat() {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "ia",
      text: `¡Hola ${profile.name}! Soy tu Guía Impulsa. Vi que te interesa ${profile.interests.slice(0, 3).join(", ") || "explorar"}. ¿De qué quieres hablar hoy?`,
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
    <div className="flex min-h-screen flex-col pb-44">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-5 py-3 backdrop-blur">
        <Robot size={44} />
        <div>
          <p className="font-semibold">Guía Impulsa</p>
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
        {typing && <p className="text-sm text-accent">Guía Impulsa está escribiendo…</p>}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-16 mx-auto max-w-md bg-background/95 px-5 pb-3 pt-2 backdrop-blur">
        <div className="mb-2 flex gap-2 overflow-x-auto">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)} className="chip-base shrink-0 border-accent/40 bg-accent/15 text-xs text-accent">
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
