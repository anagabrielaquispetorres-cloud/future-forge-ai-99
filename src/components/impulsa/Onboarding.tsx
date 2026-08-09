import { useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import {
  INTERESTS,
  STAGES,
  STRENGTH_SITUATIONS,
  VALUES,
  type Interest,
} from "@/lib/impulsa-data";

const TOTAL = 5;

export function Onboarding({ onDone }: { onDone: () => void }) {
  const { profile, update } = useProfile();
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState(0);

  const toggle = <T,>(list: T[], v: T, max?: number) =>
    list.includes(v) ? list.filter((x) => x !== v) : max && list.length >= max ? list : [...list, v];

  const canNext =
    (step === 1 && !!profile.stage) ||
    (step === 2 && profile.interests.length > 0) ||
    (step === 3 && profile.strengths.length > 0) ||
    (step === 4 && profile.values.length > 0) ||
    (step === 5 && profile.dreamText.trim().length > 3);

  const next = () => (step === TOTAL ? onDone() : setStep(step + 1));

  const chip = (active: boolean) =>
    `chip-base ${active ? "bg-accent text-accent-foreground border-accent font-semibold" : "bg-card text-foreground hover:border-accent"}`;

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Paso {step} de {TOTAL}</span>
          <span>{Math.round((step / TOTAL) * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-card">
          <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${(step / TOTAL) * 100}%` }} />
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <section>
            <h2 className="text-2xl font-bold">¿En qué etapa estás{profile.name ? `, ${profile.name}` : ""}?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Esto me ayuda a ajustar mis sugerencias.</p>
            <div className="mt-6 grid gap-3">
              {STAGES.map((s) => (
                <button
                  key={s}
                  onClick={() => update({ stage: s })}
                  className={`card-surface w-full px-5 py-4 text-left transition ${profile.stage === s ? "ring-2 ring-accent" : "hover:brightness-110"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-2xl font-bold">¿Qué te interesa?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Elige todos los que quieras.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i.id}
                  onClick={() => update({ interests: toggle<Interest>(profile.interests, i.id) })}
                  className={chip(profile.interests.includes(i.id))}
                >
                  {i.emoji} {i.id}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-2xl font-bold">Situación {situation + 1} de {STRENGTH_SITUATIONS.length}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{STRENGTH_SITUATIONS[situation]?.question}</p>
            <div className="mt-6 grid gap-3">
              {(STRENGTH_SITUATIONS[situation]?.options ?? []).map((o) => (
                <button
                  key={o.strength}
                  onClick={() => {
                    if (!profile.strengths.includes(o.strength))
                      update({ strengths: [...profile.strengths, o.strength] });
                    if (situation < STRENGTH_SITUATIONS.length - 1) setSituation(situation + 1);
                  }}
                  className="card-surface w-full px-5 py-4 text-left transition hover:brightness-110"
                >
                  {o.label}
                </button>
              ))}
            </div>
            {profile.strengths.length > 0 && (
              <p className="mt-4 text-sm text-accent">Fortalezas detectadas: {profile.strengths.join(", ")}</p>
            )}
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="text-2xl font-bold">¿Qué valoras más?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Selecciona hasta 3.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <button
                  key={v}
                  onClick={() => update({ values: toggle(profile.values, v, 3) })}
                  className={chip(profile.values.includes(v))}
                >
                  {v}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2 className="text-2xl font-bold">¿Cómo imaginas tu vida ideal en 5 años?</h2>
            <textarea
              value={profile.dreamText}
              maxLength={800}
              onChange={(e) => update({ dreamText: e.target.value })}
              rows={7}
              placeholder="Sin filtros. Escribe lo que se te venga a la mente..."
              className="mt-6 w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </section>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="rounded-2xl border border-border px-5 py-4 text-sm">
            Atrás
          </button>
        )}
        <button
          onClick={next}
          disabled={!canNext}
          className="flex-1 rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition enabled:hover:brightness-110 disabled:opacity-40"
        >
          {step === TOTAL ? "Ver mi perfil" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
