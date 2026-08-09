import { useProfile } from "@/context/ProfileContext";
import { rankedOpportunities, recommendedAreas } from "@/lib/impulsa-data";
import { Robot } from "./Robot";
import type { Tab } from "./BottomNav";

export function Home({ go, openProfile }: { go: (t: Tab) => void; openProfile: () => void }) {
  const { profile } = useProfile();
  const top = rankedOpportunities(profile).slice(0, 3);
  const areas = recommendedAreas(profile);

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

      <button
        onClick={() => go("ia")}
        className="card-surface flex w-full items-center gap-3 p-4 text-left transition hover:brightness-110"
      >
        <Robot size={64} />
        <div>
          <p className="font-semibold">Habla con tu Guía IA</p>
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
          {areas.map((a) => (
            <span key={a} className="chip-base border-accent/40 bg-accent/15 text-accent">{a}</span>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recomendados para ti
          </h2>
          <button onClick={() => go("explora")} className="text-xs text-accent">Ver todo</button>
        </div>
        <div className="space-y-3">
          {top.map((o) => (
            <button
              key={o.id}
              onClick={() => go("explora")}
              className="card-surface flex w-full items-center gap-3 p-4 text-left transition hover:brightness-110"
            >
              <span className="text-2xl">{o.emoji}</span>
              <div>
                <p className="font-semibold">{o.title}</p>
                <p className="text-xs text-muted-foreground">{o.category} · {o.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
