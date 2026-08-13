import { Robot } from "./Robot";

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="rounded-full bg-primary/15 p-4">
        <Robot size={200} />
      </div>
      <p className="chip-base inline-block bg-accent/15 text-accent">ImpulsaYA · Tu mentor virtual</p>
      <h1 className="text-3xl font-extrabold leading-tight">
        Tu futuro no tiene que estar decidido hoy
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Soy tu Guía IA. Te acompaño paso a paso a descubrir qué te mueve, en qué eres bueno y qué
        caminos existen para ti.
      </p>
      <button
        onClick={onStart}
        className="w-full max-w-sm rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:brightness-110 active:scale-[0.98]"
      >
        Comenzar mi recorrido
      </button>
    </div>
  );
}
