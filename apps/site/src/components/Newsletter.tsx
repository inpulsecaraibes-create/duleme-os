"use client";

import { useState } from "react";

export function Newsletter() {
  const [ok, setOk] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await fetch("/api/newsletter", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } catch {
          /* dégradable : on remercie quand même */
        }
        setBusy(false);
        setOk(true);
      }}
      className="mt-6"
    >
      {ok ? (
        <p className="font-serif text-lg text-accent">
          Merci — vous recevrez Le Faux Dilemme™ chaque mois.
        </p>
      ) : (
        <div className="flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Votre email"
            placeholder="Votre email"
            className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink placeholder:text-mut/70 focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          <button
            type="submit"
            disabled={busy}
            className="shrink-0 rounded-md bg-bord px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep disabled:opacity-60"
          >
            {busy ? "Un instant…" : "Recevoir Le Faux Dilemme™"}
          </button>
        </div>
      )}
      <p className="mt-3 text-[12.5px] text-mut">
        Une publication par mois. Jamais de spam. Désabonnement en un clic.
      </p>
    </form>
  );
}
