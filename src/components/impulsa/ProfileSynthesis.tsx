import { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { AREAS, INTERESTS_BY_AREA, recommendedAreas, type Area } from "@/lib/impulsa-data";
import { Robot } from "./Robot";

export function Analyzing({ onDone }: { onDone: () => void }) {
  const { profile } = useProfile();
  const steps = [
    "🤖 ImpulsaYA está analizando tu perfil...",
    "Cruzando tus fortalezas con áreas reales...",
    `Buscando caminos para ${profile.name || "ti"}...`,
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => v + 1), 1100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (i >= steps.length) onDone();
  }, [i, onDone, steps.length]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <div className="animate-bounce">
        <Robot size={180} />
      </div>
      <h2 className="text-xl font-bold">Analizando tus respuestas</h2>
      <p className="text-sm text-accent">{steps[Math.min(i, steps.length - 1)]}</p>
      <div className="h-2 w-64 overflow-hidden rounded-full bg-card">
        <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
      </div>
    </div>
  );
}

export function ProfileSynthesis({ onDone }: { onDone: () => void }) {
  const { profile, update } = useProfile();
  const [editing, setEditing] = useState(false);
  const [openArea, setOpenArea] = useState<Area>(recommendedAreas(profile)[0] ?? "Tecnología");
  const areas = recommendedAreas(profile);

  const toggleInterest = (id: string) =>
    update({
      interests: profile.interests.includes(id)
        ? profile.interests.filter((x) => x !== id)
        : [...profile.interests, id],
    });

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="flex items-center gap-3">
        <Robot size={72} />
        <div>
          <h1 className="text-2xl font-bold">Tu Perfil, {profile.name}</h1>
          <p className="text-sm text-muted-foreground">Etapa: {profile.stage}</p>
        </div>
      </div>

      <div className="card-surface mt-6 space-y-5 p-5">
        <Block title="Intereses" items={profile.interests} />
        <Block title="Fortalezas" items={profile.strengths} />
        <Block title="Valores" items={profile.values} />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">3 áreas recomendadas</p>
          <ol className="mt-2 space-y-2">
            {areas.map((a, idx) => {
              const meta = AREAS.find((x) => x.id === a);
              return (
                <li key={a} className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm">
                  <span className="font-semibold text-accent">{idx + 1}. {meta?.emoji} {a}</span>
                  <span className="block text-xs text-muted-foreground">{meta?.tagline}</span>
                </li>
              );
            })}
          </ol>
        </div>
        {profile.dreamText && (
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu vida ideal en 5 años</p>
            <p className="mt-1 text-sm italic text-foreground/90">“{profile.dreamText.slice(0, 240)}”</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setEditing((v) => !v)}
        className="mt-4 w-full rounded-2xl border border-accent px-5 py-3 text-sm text-accent"
      >
        ✏️ Esto no me representa
      </button>

      {editing && (
        <div className="card-surface mt-3 p-5">
          <p className="text-sm text-muted-foreground">Ajusta tus intereses y recalculo todo:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button
                key={a.id}
                onClick={() => setOpenArea(a.id)}
                className={`chip-base text-xs ${openArea === a.id ? "border-accent bg-accent text-accent-foreground" : "bg-background"}`}
              >
                {a.emoji} {a.id}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            {(INTERESTS_BY_AREA[openArea] ?? []).map((i) => (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                className={`chip-base text-xs ${profile.interests.includes(i) ? "border-accent bg-accent font-semibold text-accent-foreground" : "bg-background"}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onDone}
        className="mt-6 w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:brightness-110"
      >
        Sí, soy yo · Ir al inicio
      </button>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.length === 0 && <span className="text-sm text-muted-foreground">—</span>}
        {items.map((it) => (
          <span key={it} className="chip-base border-accent/40 bg-accent/15 text-xs text-accent">{it}</span>
        ))}
      </div>
    </div>
  );
}
