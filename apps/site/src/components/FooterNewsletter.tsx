"use client";

import { useState } from "react";

/** Inscription newsletter dans le pied de page (fond sombre). → /api/newsletter (Brevo). */
export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  if (ok) {
    return (
      <p className="mt-4 text-[13.5px] text-paper">
        Merci — vous recevrez Le Faux Dilemme™ chaque mois.
      </p>
    );
  }

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
          /* dégradable */
        }
        setBusy(false);
        setOk(true);
      }}
      className="mt-4 flex max-w-md flex-col gap-2.5 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Votre email"
        placeholder="Votre email"
        className="w-full rounded border border-paper/20 bg-paper/5 p-2.5 text-[14px] text-paper placeholder:text-[#c9b4a9]/70 focus:border-brass focus:outline focus:outline-2 focus:outline-brass/60"
      />
      <button
        type="submit"
        disabled={busy}
        className="shrink-0 rounded-md bg-paper px-4 py-2.5 text-[13px] font-semibold text-bord transition-colors hover:bg-paper2 disabled:opacity-60"
      >
        {busy ? "Un instant…" : "S'inscrire"}
      </button>
    </form>
  );
}
