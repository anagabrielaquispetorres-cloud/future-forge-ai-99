import { useProfile } from "@/context/ProfileContext";
import { ACHIEVEMENTS, globalProgress, recommendedAreas } from "@/lib/impulsa-data";
import { Robot } from "./Robot";

export function ProfileView({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  const { profile, update } = useProfile();
  const areas = recommendedAreas(profile);
  const progress = globalProgress(profile);

  const stats = [
    { label: "Intereses descubiertos", value: profile.interests.length },
    { label: "Habilidades identificadas", value: profile.strengths.length },
    { label: "Retos completados", value: profile.completedChallenges.length },
    { label: "Reflexiones guardadas", value: profile.reflections.length },
  ];

  const downloadCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const c = canvas.getContext("2d");
    if (!c) return;
    c.fillStyle = "#0A1931";
    c.fillRect(0, 0, 1080, 1350);
    c.strokeStyle = "#4A7FA7";
    c.lineWidth = 8;
    c.strokeRect(40, 40, 1000, 1270);
    c.fillStyle = "#B3CFE5";
    c.font = "bold 44px sans-serif";
    c.textAlign = "center";
    c.fillText("CERTIFICADO DE DESCUBRIMIENTO", 540, 170);
    c.fillStyle = "#F6FAFD";
    c.font = "28px sans-serif";
    c.fillText("ImpulsaYA · Mentor vocacional", 540, 220);
    c.font = "bold 64px sans-serif";
    c.fillText(profile.name || "Explorador/a", 540, 340);
    c.font = "26px sans-serif";
    c.fillStyle = "#B3CFE5";
    c.fillText(`Etapa: ${profile.stage || "Explorando"}`, 540, 390);

    const section = (title: string, lines: string[], y: number) => {
      c.textAlign = "left";
      c.fillStyle = "#4A7FA7";
      c.font = "bold 30px sans-serif";
      c.fillText(title, 110, y);
      c.fillStyle = "#F6FAFD";
      c.font = "26px sans-serif";
      lines.forEach((l, i) => c.fillText(l, 110, y + 45 + i * 38));
    };

    const wrap = (items: string[]) => {
      const out: string[] = [];
      let line = "";
      for (const it of items) {
        if ((line + it).length > 42) {
          out.push(line);
          line = "";
        }
        line += (line ? " · " : "") + it;
      }
      if (line) out.push(line);
      return out.slice(0, 4);
    };

    section("Fortalezas", wrap(profile.strengths), 500);
    section("Intereses explorados", wrap(profile.interests.slice(0, 12)), 700);
    section("Vocación en exploración", wrap(areas), 950);
    section("Camino en foco", [profile.selectedPath ?? "En construcción"], 1080);

    c.textAlign = "center";
    c.fillStyle = "#B3CFE5";
    c.font = "24px sans-serif";
    c.fillText(`Progreso de descubrimiento: ${progress}%`, 540, 1230);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `certificado-impulsaya-${(profile.name || "yo").toLowerCase()}.png`;
    a.click();
  };

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

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Logros</h2>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = a.test(profile);
            return (
              <div
                key={a.id}
                className={`card-surface p-4 text-sm ${unlocked ? "ring-1 ring-accent" : "opacity-50"}`}
              >
                <span className="text-2xl">{unlocked ? a.emoji : "🔒"}</span>
                <p className="mt-1 font-medium">{a.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card-surface space-y-3 p-5">
        <h2 className="font-semibold">🏅 Certificado de Descubrimiento</h2>
        <p className="text-sm text-muted-foreground">
          Un resumen de tus fortalezas y la vocación que estás explorando, listo para descargar y compartir.
        </p>
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm">
          <p className="text-xs uppercase tracking-wide text-accent">ImpulsaYA certifica que</p>
          <p className="text-lg font-bold">{profile.name || "Explorador/a"}</p>
          <p className="text-xs text-muted-foreground">
            exploró {areas.join(", ") || "nuevas áreas"} con fortalezas en {profile.strengths.join(", ") || "descubrimiento"}.
          </p>
        </div>
        <button
          onClick={downloadCertificate}
          className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          Descargar certificado
        </button>
      </section>

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
          onClick={() =>
            update({ interests: [], strengths: [], values: [], affinity: {}, selectedPath: null, dynamicRoute: [] })
          }
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
