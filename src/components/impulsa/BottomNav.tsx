export type Tab = "inicio" | "ia" | "explora" | "ruta";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "ia", label: "Mi Guía", icon: "💬" },
  { id: "explora", label: "Explora", icon: "🧭" },
  { id: "ruta", label: "Mi Ruta", icon: "🎯" },
];

export function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          aria-current={tab === t.id}
          className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs transition ${
            tab === t.id ? "bg-primary/40 font-semibold text-accent" : "text-muted-foreground"
          }`}
        >
          <span className="text-lg">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
