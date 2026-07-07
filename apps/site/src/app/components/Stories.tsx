"use client";

import { useState } from "react";

export type Story = {
  headline: string;
  body: string;
  attribution: string;
};

// Repli si la base n'est pas joignable (le site reste toujours présentable).
const DEFAULT_STORIES: Story[] = [
  {
    headline: "Elle a vu quelque chose que je ne voyais plus.",
    body: "J'étais persuadé que mon problème était commercial. En quelques échanges, elle m'a montré que je passais complètement à côté du vrai sujet. Ce qui m'a marqué, ce n'est pas qu'elle ait trouvé une solution. C'est qu'elle ait réussi à mettre des mots sur quelque chose que je ressentais depuis longtemps sans parvenir à l'expliquer.",
    attribution: "Dirigeant de PME — témoignage anonymisé",
  },
  {
    headline: "Je ne me suis jamais sentie jugée.",
    body: "Quand on dirige une entreprise, tout le monde donne son avis. Les banques. Les partenaires. Les proches. Les salariés. Avec Téféry, j'ai eu l'impression, pour la première fois depuis longtemps, de pouvoir réfléchir sans avoir besoin de me justifier. Cette qualité d'écoute est probablement ce qui m'a le plus marquée.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
  },
  {
    headline: "Elle m'a redonné le droit d'être ambitieuse.",
    body: "Je m'étais fixé des limites sans même m'en rendre compte. Au fil des échanges, j'ai compris que je n'avais pas un problème de compétences. J'avais un problème d'autorisation : je ne m'autorisais plus à voir plus grand. Aujourd'hui, je ne regarde plus mon entreprise de la même manière.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
  },
];

export function Stories({ stories }: { stories?: Story[] }) {
  const items = stories && stories.length > 0 ? stories : DEFAULT_STORIES;
  const [i, setI] = useState(0);
  const total = items.length;
  const go = (n: number) => setI((n + total) % total);
  const s = items[Math.min(i, total - 1)];

  return (
    <div className="mt-9">
      <div className="mx-auto max-w-[820px] rounded-lg border border-line bg-paper p-7 shadow-soft sm:p-10">
        <div className="font-serif text-[52px] leading-[0.6] text-brass" aria-hidden>
          &ldquo;
        </div>
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-accent sm:text-[32px]">
          {s.headline}
        </h3>
        <p className="mt-4 text-[15px] leading-[1.7] text-ink/85 sm:text-[17px]">
          {s.body}
        </p>
        <p className="mt-5 font-sans text-[11px] tracking-wide text-mut">
          {s.attribution}
        </p>
      </div>

      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Témoignage précédent"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-bord"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => go(idx)}
                aria-label={`Témoignage ${idx + 1}`}
                aria-current={idx === i}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  idx === i ? "scale-110 bg-accent" : "bg-line"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Témoignage suivant"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-bord"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
