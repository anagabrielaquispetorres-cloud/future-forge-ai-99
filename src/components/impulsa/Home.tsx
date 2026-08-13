import { useProfile } from "@/context/ProfileContext";
import { AREAS, globalProgress, rankedOpportunities, recommendedAreas } from "@/lib/impulsa-data";
import { Robot } from "./Robot";
import type { Tab } from "./BottomNav";

export function Home({ go, openProfile }: { go: (t: Tab) => void; openProfile: () => void }) {
  const { profile } = useProfile();
  const top = rankedOpportunities(profile).slice(0, 6);
  const areas = recommendedAreas(profile);
  const progress = globalProgress(profile);

  return (
    <div className="space-y-6 px-5 pb-28 pt-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">¡Hola, {profile.name}! 👋</h1>
          <p className="text-sm text-muted-foreground">
            {profile.stage} · {profile.interests.length} intereses activos
          </p>
        </div>
        <button onClick={openProfile} className="rounded-full border border-border px-3 py-2 text-xs">
          Perfil
        </button>
      </header>

      <div className="card-surface p-5">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>Tu progreso de descubrimiento</span>
          <span className="text-accent">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button
        onClick={() => go("ia")}
        className="card-surface flex w-full items-center gap-3 p-4 text-left transition hover:brightness-110"
      >
        <Robot size={64} />
        <div>
          <p className="font-semibold">Habla con tu Guía Impulsa</p>
          <p className="text-sm text-muted-foreground">
            “{profile.name}, ¿seguimos explorando {profile.interests[0] ?? "tus opciones"}?”
          </p>
        </div>
      </button>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Tus áreas recomendadas
        </h2>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => {
            const meta = AREAS.find((x) => x.id === a);
            return (
              <span key={a} className="chip-base border-accent/40 bg-accent/15 text-sm text-accent">
                {meta?.emoji} {a}
              </span>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recomendados para ti
          </h2>
          <button onClick={() => go("explora")} className="text-xs text-accent">Ver todo</button>
        </div>
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
          {top.map((o) => (
            <button
              key={o.id}
              onClick={() => go("explora")}
              className="card-surface w-56 shrink-0 p-4 text-left transition hover:brightness-110"
            >
              <span className="text-2xl">{o.emoji}</span>
              <p className="mt-2 font-semibold">{o.title}</p>
              <p className="text-xs text-muted-foreground">{o.area} · {o.category}</p>
              <p className="mt-1 text-xs text-foreground/80">{o.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
