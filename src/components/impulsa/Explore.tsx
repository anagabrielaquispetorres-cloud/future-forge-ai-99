import { useMemo, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  alternativesFor,
  rankedOpportunities,
  scoreOpportunity,
  type Category,
  type Cost,
  type Duration,
  type Opportunity,
} from "@/lib/impulsa-data";
import { Robot } from "./Robot";

const DURATIONS: (Duration | "Todo")[] = ["Todo", "Corto plazo", "Largo plazo"];
const COSTS: (Cost | "Todo")[] = ["Todo", "Gratuito", "Con Beca"];

export function Explore() {
  const { profile, update } = useProfile();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "Todo">("Todo");
  const [dur, setDur] = useState<Duration | "Todo">("Todo");
  const [cost, setCost] = useState<Cost | "Todo">("Todo");
  const [active, setActive] = useState<Opportunity | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rankedOpportunities(profile).filter(
      (o) =>
        (cat === "Todo" || o.category === cat) &&
        (dur === "Todo" || o.duration === dur) &&
        (cost === "Todo" || o.cost === cost) &&
        (!q ||
          o.title.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.area.toLowerCase().includes(q) ||
          o.interests.some((i) => i.toLowerCase().includes(q))),
    );
  }, [profile, query, cat, dur, cost]);

  return (
    <div className="space-y-4 px-5 pb-28 pt-8">
      <h1 className="text-2xl font-bold">Explora</h1>
      <input
        value={query}
        maxLength={60}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar carreras, cursos, becas, oficios…"
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["Todo", ...CATEGORIES] as (Category | "Todo")[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip-base shrink-0 text-xs ${cat === c ? "border-accent bg-accent font-semibold text-accent-foreground" : "bg-card"}`}
          >
            {c === "Todo" ? "✨ Todo" : `${CATEGORY_EMOJI[c]} ${c}`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDur(d)}
            className={`chip-base text-xs ${dur === d ? "border-accent bg-accent/25 text-accent" : "bg-card text-muted-foreground"}`}
          >
            ⏱ {d}
          </button>
        ))}
        {COSTS.filter((c) => c !== "Todo").map((c) => (
          <button
            key={c}
            onClick={() => setCost(cost === c ? "Todo" : c)}
            className={`chip-base text-xs ${cost === c ? "border-accent bg-accent/25 text-accent" : "bg-card text-muted-foreground"}`}
          >
            💰 {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{list.length} opciones para ti</p>

      <div className="space-y-3">
        {list.slice(0, 60).map((o) => {
          const score = scoreOpportunity(o, profile);
          return (
            <div key={o.id} className="card-surface p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{o.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold">{o.title}</p>
                  <p className="text-xs text-muted-foreground">{o.area} · {o.category}</p>
                  <p className="mt-1 text-sm text-foreground/90">{o.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                    <span className="chip-base px-2 py-1 text-muted-foreground">⏱ {o.duration}</span>
                    <span className="chip-base px-2 py-1 text-muted-foreground">💰 {o.cost}</span>
                    {score >= 8 && (
                      <span className="chip-base border-accent/40 bg-accent/15 px-2 py-1 text-accent">Alta afinidad</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setActive(o)}
                  className="flex-1 rounded-2xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
                >
                  🧪 Ponme a Prueba
                </button>
                <a
                  href={o.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-accent px-3 py-2 text-sm text-accent"
                >
                  Ver recurso
                </a>
              </div>
            </div>
          );
        })}
        {list.length === 0 && <p className="text-sm text-muted-foreground">No hay resultados con ese filtro.</p>}
      </div>

      {active && (
        <ChallengeFlow
          opportunity={active}
          alternatives={alternativesFor(active, profile)}
          onClose={() => setActive(null)}
          onFinish={({ delta, feeling, liked }) => {
            const milestone =
              delta > 0
                ? [
                    {
                      id: `m-${active.id}-${Date.now()}`,
                      title: `Siguiente paso: ${active.title}`,
                      detail: `Dedica 30 min a revisar "${active.link.label}" y anota qué aprendiste.`,
                      done: false,
                    },
                  ]
                : [];
            update({
              affinity: { ...profile.affinity, [active.id]: (profile.affinity[active.id] ?? 0) + delta },
              completedChallenges: profile.completedChallenges.includes(active.id)
                ? profile.completedChallenges
                : [...profile.completedChallenges, active.id],
              completedSteps: [...new Set([...profile.completedSteps, "reto", "reflexion"])],
              reflections: [...profile.reflections, { id: `${active.id}-${Date.now()}`, opportunity: active.title, feeling, liked }],
              dynamicRoute: [...profile.dynamicRoute, ...milestone],
              selectedPath: delta > 0 ? active.title : profile.selectedPath,
            });
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

type Finish = { delta: number; feeling: string; liked: string };

const FEELINGS = [
  { emoji: "😍", label: "Me encantó", delta: 5 },
  { emoji: "🙂", label: "Me gustó", delta: 2 },
  { emoji: "😐", label: "Neutral", delta: 0 },
  { emoji: "🙅", label: "No me gustó", delta: -4 },
];

const LIKED = ["Resolver el problema", "La creatividad", "Ayudar a alguien", "El detalle técnico", "Nada en especial"];

function ChallengeFlow({
  opportunity,
  alternatives,
  onClose,
  onFinish,
}: {
  opportunity: Opportunity;
  alternatives: Opportunity[];
  onClose: () => void;
  onFinish: (r: Finish) => void;
}) {
  const [step, setStep] = useState(0);
  const [feeling, setFeeling] = useState<(typeof FEELINGS)[number] | null>(null);
  const [liked, setLiked] = useState("");
  const quizDone = step >= opportunity.quiz.length;
  const current = opportunity.quiz[step];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/85 p-4 backdrop-blur">
      <div className="card-surface max-h-[88vh] w-full max-w-md overflow-y-auto p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-accent">🧪 Ponme a prueba</p>
            <h3 className="text-lg font-bold">{opportunity.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-muted-foreground">✕</button>
        </div>

        {!quizDone && current && (
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

        {quizDone && !feeling && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Robot size={40} />
              <p className="text-sm text-accent">Reflexionemos un momento</p>
            </div>
            <p className="font-medium">¿Qué te pareció este reto?</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {FEELINGS.map((r) => (
                <button
                  key={r.emoji}
                  onClick={() => setFeeling(r)}
                  className="rounded-2xl border border-border bg-background px-3 py-4 text-sm transition hover:border-accent"
                >
                  <span className="mr-1 text-xl">{r.emoji}</span> {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {quizDone && feeling && !liked && (
          <div>
            <p className="font-medium">¿Qué parte disfrutaste más?</p>
            <div className="mt-4 grid gap-2">
              {LIKED.map((l) => (
                <button
                  key={l}
                  onClick={() => setLiked(l)}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-accent"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {quizDone && feeling && liked && (
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Robot size={40} className="shrink-0" />
              <p className="text-sm">
                {feeling.delta > 0
                  ? `¡Genial! Como te ${feeling.label.toLowerCase()}, agrego un nuevo hito a tu Ruta con ${opportunity.title}.`
                  : "Sin problema: descartar también es avanzar. Te propongo mirar estas dos alternativas."}
              </p>
            </div>

            {feeling.delta > 0 ? (
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                <p className="text-xs uppercase tracking-wide text-accent">🔗 Conexión real</p>
                <a
                  href={opportunity.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-semibold underline"
                >
                  {opportunity.link.label}
                </a>
                <p className="text-xs text-muted-foreground">{opportunity.link.note}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {alternatives.map((a) => (
                  <div key={a.id} className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-sm font-semibold">{a.emoji} {a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.area} · {a.description}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onFinish({ delta: feeling.delta, feeling: feeling.label, liked })}
              className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
            >
              Guardar en Mi Ruta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
