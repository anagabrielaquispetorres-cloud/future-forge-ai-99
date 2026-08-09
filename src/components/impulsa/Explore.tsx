import { useMemo, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { rankedOpportunities, scoreOpportunity, type Category, type Opportunity } from "@/lib/impulsa-data";

const CATEGORIES: (Category | "Todo")[] = ["Todo", "Carreras", "Oficios", "Emprendimiento", "Cursos", "Becas"];
const REACTIONS = [
  { emoji: "😍", label: "Me encanta", delta: 4 },
  { emoji: "🙂", label: "Me gusta", delta: 2 },
  { emoji: "😐", label: "Neutral", delta: 0 },
  { emoji: "🙅", label: "No es para mí", delta: -4 },
];

export function Explore() {
  const { profile, update } = useProfile();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "Todo">("Todo");
  const [active, setActive] = useState<Opportunity | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rankedOpportunities(profile).filter(
      (o) =>
        (cat === "Todo" || o.category === cat) &&
        (!q || o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)),
    );
  }, [profile, query, cat]);

  return (
    <div className="space-y-5 px-5 pb-28 pt-8">
      <h1 className="text-2xl font-bold">Explora</h1>
      <input
        value={query}
        maxLength={60}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar carreras, cursos, becas…"
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip-base shrink-0 ${cat === c ? "border-accent bg-accent font-semibold text-accent-foreground" : "bg-card"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((o) => {
          const score = scoreOpportunity(o, profile);
          return (
            <button
              key={o.id}
              onClick={() => setActive(o)}
              className="card-surface flex w-full items-center gap-3 p-4 text-left transition hover:brightness-110"
            >
              <span className="text-2xl">{o.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold">{o.title}</p>
                <p className="text-xs text-muted-foreground">{o.category} · {o.description}</p>
              </div>
              {score > 0 && (
                <span className="chip-base border-accent/40 bg-accent/15 px-2 py-1 text-[10px] text-accent">
                  {score >= 5 ? "Alta afinidad" : "Afín"}
                </span>
              )}
            </button>
          );
        })}
        {list.length === 0 && <p className="text-sm text-muted-foreground">No hay resultados con ese filtro.</p>}
      </div>

      {active && (
        <ChallengeModal
          opportunity={active}
          onClose={() => setActive(null)}
          onFinish={(delta) => {
            update({
              affinity: { ...profile.affinity, [active.id]: (profile.affinity[active.id] ?? 0) + delta },
              completedSteps: profile.completedSteps.includes("reto")
                ? profile.completedSteps
                : [...profile.completedSteps, "reto"],
              selectedPath: delta > 0 ? active.title : profile.selectedPath,
            });
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

function ChallengeModal({
  opportunity,
  onClose,
  onFinish,
}: {
  opportunity: Opportunity;
  onClose: () => void;
  onFinish: (delta: number) => void;
}) {
  const [step, setStep] = useState(0);
  const done = step >= opportunity.quiz.length;
  const current = opportunity.quiz[step];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-4 backdrop-blur">
      <div className="card-surface max-h-[85vh] w-full max-w-md overflow-y-auto p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent">🧪 Ponme a prueba</p>
            <h3 className="text-lg font-bold">{opportunity.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-muted-foreground">✕</button>
        </div>

        {!done && current && (
          <div>
            <p className="text-xs text-muted-foreground">Pregunta {step + 1} de {opportunity.quiz.length}</p>
            <p className="mt-2 font-medium">{current.q}</p>
            <div className="mt-4 grid gap-2">
              {current.options.map((o) => (
                <button
                  key={o}
                  onClick={() => setStep(step + 1)}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-accent"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div>
            <p className="font-medium">¿Cómo te sentiste con este reto?</p>
            <p className="mt-1 text-sm text-muted-foreground">Ajusto tus recomendaciones con tu respuesta.</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {REACTIONS.map((r) => (
                <button
                  key={r.emoji}
                  onClick={() => onFinish(r.delta)}
                  title={r.label}
                  className="rounded-2xl border border-border bg-background py-4 text-2xl transition hover:border-accent"
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
