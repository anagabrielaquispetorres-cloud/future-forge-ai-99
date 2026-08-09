import { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { INTERESTS, recommendedAreas, type Interest } from "@/lib/impulsa-data";
import { Robot } from "./Robot";

export function Analyzing({ onDone }: { onDone: () => void }) {
  const { profile } = useProfile();
  const steps = [
    "Leyendo tus intereses...",
    "Cruzando tus fortalezas...",
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
  const areas = recommendedAreas(profile);

  const toggleInterest = (id: Interest) =>
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
            {areas.map((a, idx) => (
              <li key={a} className="flex items-center gap-3 rounded-2xl bg-primary/25 px-4 py-3 text-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{idx + 1}</span>
                {a}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {profile.dreamText && (
        <div className="card-surface mt-4 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Tu sueño en 5 años</p>
          <p className="mt-2 text-sm italic">“{profile.dreamText}”</p>
        </div>
      )}

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
            {INTERESTS.map((i) => (
              <button
                key={i.id}
                onClick={() => toggleInterest(i.id)}
                className={`chip-base ${profile.interests.includes(i.id) ? "border-accent bg-accent font-semibold text-accent-foreground" : "bg-background"}`}
              >
                {i.emoji} {i.id}
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
          <span key={it} className="chip-base border-accent/40 bg-accent/15 text-accent">{it}</span>
        ))}
      </div>
    </div>
  );
}
