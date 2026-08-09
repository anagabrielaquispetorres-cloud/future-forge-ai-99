import { useProfile } from "@/context/ProfileContext";
import { rankedOpportunities } from "@/lib/impulsa-data";

export function MiRuta() {
  const { profile, update } = useProfile();
  const top = rankedOpportunities(profile).slice(0, 3);

  const steps = [
    { id: "descubrimiento", title: "Descubrimiento", desc: `Definiste tu etapa (${profile.stage}) y tus intereses.`, auto: profile.interests.length > 0 },
    { id: "exploracion", title: "Exploración", desc: `Revisa ${top.map((t) => t.title).join(", ") || "tus opciones"}.`, auto: false },
    { id: "reto", title: "Mini Reto", desc: "Completa un “Ponme a prueba” en Explora.", auto: false },
    { id: "reflexion", title: "Reflexión", desc: "Decide tu siguiente paso concreto de esta semana.", auto: false },
  ];

  const isDone = (id: string, auto: boolean) => auto || profile.completedSteps.includes(id);

  const toggle = (id: string) =>
    update({
      completedSteps: profile.completedSteps.includes(id)
        ? profile.completedSteps.filter((s) => s !== id)
        : [...profile.completedSteps, id],
    });

  const total = steps.filter((s) => isDone(s.id, s.auto)).length;

  return (
    <div className="space-y-6 px-5 pb-28 pt-8">
      <div>
        <h1 className="text-2xl font-bold">Mi Ruta</h1>
        <p className="text-sm text-muted-foreground">
          {profile.selectedPath ? `Camino en foco: ${profile.selectedPath}` : "Aún no eliges un camino en foco."}
        </p>
      </div>

      <div className="card-surface p-5">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Progreso</span>
          <span>{total}/{steps.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(total / steps.length) * 100}%` }} />
        </div>
      </div>

      <ol className="relative space-y-4 border-l border-border pl-6">
        {steps.map((s) => {
          const done = isDone(s.id, s.auto);
          return (
            <li key={s.id} className="relative">
              <span
                className={`absolute -left-[31px] top-4 flex size-5 items-center justify-center rounded-full text-[10px] ${
                  done ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground"
                }`}
              >
                {done ? "✓" : ""}
              </span>
              <button
                onClick={() => toggle(s.id)}
                className={`card-surface w-full p-4 text-left transition ${done ? "ring-1 ring-accent" : "hover:brightness-110"}`}
              >
                <p className="font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </button>
            </li>
          );
        })}
      </ol>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Metas sugeridas</h2>
        <div className="space-y-2">
          {top.map((o) => (
            <div key={o.id} className="card-surface p-4 text-sm">
              {o.emoji} Investiga 20 min sobre <span className="font-semibold">{o.title}</span> esta semana.
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
