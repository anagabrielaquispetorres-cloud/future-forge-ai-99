import { useProfile } from "@/context/ProfileContext";
import { Robot } from "./Robot";

export function ProfileView({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  const { profile, update } = useProfile();

  const stats = [
    { label: "Intereses descubiertos", value: profile.interests.length },
    { label: "Habilidades identificadas", value: profile.strengths.length },
    { label: "Valores definidos", value: profile.values.length },
    { label: "Retos completados", value: Object.keys(profile.affinity).length },
  ];

  return (
    <div className="space-y-6 px-5 pb-28 pt-8">
      <button onClick={onBack} className="text-sm text-accent">← Volver</button>

      <div className="flex items-center gap-3">
        <Robot size={64} />
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-3xl font-bold text-accent">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card-surface space-y-3 p-5">
        <h2 className="font-semibold">Privacidad y datos</h2>
        <p className="text-sm text-muted-foreground">
          Tus respuestas viven solo en esta sesión. Puedes editarlas o borrarlas cuando quieras.
        </p>
        <button
          onClick={() => update({ dreamText: "" })}
          className="w-full rounded-2xl border border-border px-4 py-3 text-sm"
        >
          Borrar mi respuesta abierta
        </button>
        <button
          onClick={() => update({ interests: [], strengths: [], values: [], affinity: {}, selectedPath: null })}
          className="w-full rounded-2xl border border-border px-4 py-3 text-sm"
        >
          Reiniciar mis recomendaciones
        </button>
        <button
          onClick={onReset}
          className="w-full rounded-2xl border border-destructive px-4 py-3 text-sm text-destructive"
        >
          Borrar toda mi cuenta y datos
        </button>
      </div>
    </div>
  );
}
