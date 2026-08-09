import { useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { Robot } from "./Robot";

export function Auth({ onDone }: { onDone: () => void }) {
  const { update } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (n.length < 2 || n.length > 40) return setError("Escribe tu nombre (2-40 caracteres).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Email no válido.");
    if (password.length < 6) return setError("La contraseña necesita al menos 6 caracteres.");
    setError("");
    update({ name: n, email: email.trim() });
    onDone();
  };

  const field =
    "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="flex items-center gap-3">
        <Robot size={64} />
        <div>
          <h1 className="text-xl font-bold">Creemos tu cuenta</h1>
          <p className="text-sm text-muted-foreground">Solo lo esencial, prometido.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            ¿Cómo prefieres que te llame?
          </label>
          <input id="name" className={field} value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="Ale" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" type="email" className={field} value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
        </div>
        <div>
          <label htmlFor="pass" className="mb-1 block text-sm font-medium">Contraseña</label>
          <input id="pass" type="password" className={field} value={password} maxLength={72} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className="w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-soft transition hover:brightness-110 active:scale-[0.98]">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
