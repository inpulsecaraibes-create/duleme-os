"use client";

import { useState } from "react";

export function Newsletter() {
  const [ok, setOk] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Sprint connecteurs : brancher Brevo (une publication par mois).
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
            aria-label="Votre email"
            placeholder="Votre email"
            className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink placeholder:text-mut/70 focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-bord px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep"
          >
            Recevoir Le Faux Dilemme™
          </button>
        </div>
      )}
      <p className="mt-3 text-[12.5px] text-mut">
        Une publication par mois. Jamais de spam. Désabonnement en un clic.
      </p>
    </form>
  );
}
