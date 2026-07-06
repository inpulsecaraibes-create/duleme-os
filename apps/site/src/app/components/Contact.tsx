"use client";

import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-8 rounded-lg border border-line bg-paper p-6 shadow-soft sm:p-9"
      onSubmit={(e) => {
        e.preventDefault();
        // Sprint ultérieur : envoi réel (connecteur / Relationship OS).
        setSent(true);
      }}
    >
      {sent ? (
        <div className="py-4 text-center">
          <h3 className="font-serif text-2xl font-semibold text-bord">
            Merci. Votre message nous parvient directement.
          </h3>
          <p className="mx-auto mt-3 max-w-[46ch] text-mut">
            Nous le lisons personnellement et revenons vers vous sous 48 heures.
          </p>
          <p className="mt-4 text-sm italic text-mut">
            L&apos;Assistant DULEME pourra vous poser quelques questions pour
            préparer au mieux notre échange.
          </p>
        </div>
      ) : (
        <>
          <label
            htmlFor="msg"
            className="block font-serif text-lg font-semibold sm:text-2xl"
          >
            Parlez-moi de la décision qui vous préoccupe.
          </label>
          <textarea
            id="msg"
            rows={5}
            placeholder="Quelques lignes suffisent. Écrivez comme vous y penseriez à voix haute."
            className="mt-4 min-h-[130px] w-full resize-y rounded border border-line bg-paper2 p-4 text-base text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              type="text"
              aria-label="Nom"
              placeholder="Nom"
              className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
            />
            <input
              type="text"
              aria-label="Entreprise"
              placeholder="Entreprise"
              className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
            />
            <input
              type="email"
              aria-label="Email"
              placeholder="Email"
              className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
            />
          </div>
          <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-mut">
            <input type="checkbox" className="h-4 w-4 accent-bord" /> Je souhaite
            être rappelé·e.
          </label>
          <p className="mt-4 flex items-center gap-2 text-[13.5px] text-mut">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Nous lisons personnellement chaque demande. Réponse sous 48 heures.
          </p>
          <button
            type="submit"
            className="mt-5 rounded-md bg-bord px-5 py-3 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
          >
            Confier ma situation →
          </button>
        </>
      )}
    </form>
  );
}
