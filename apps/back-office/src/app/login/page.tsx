"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fd.get("email") ?? ""),
          password: String(fd.get("password") ?? ""),
        }),
      });
      if (res.ok) {
        window.location.assign("/");
        return;
      }
      setError("Identifiants invalides.");
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            DULEME AND CIE
          </p>
          <h1 className="mt-2 font-serif text-2xl font-semibold">Back Office</h1>
          <p className="mt-1 text-sm text-mut">Accès réservé.</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-line bg-card p-6 shadow-card"
        >
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1.5 w-full rounded border border-line bg-paper2 p-2.5 text-[15px] focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          <label
            className="mt-4 block text-sm font-medium"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1.5 w-full rounded border border-line bg-paper2 p-2.5 text-[15px] focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          {error && (
            <p className="mt-3 text-sm text-alert" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-md bg-bord px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
