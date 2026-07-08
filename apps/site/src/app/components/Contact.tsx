"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « La première minute de l'expérience DULEME ».
 * Trois actes en divulgation progressive — aucune impression de formulaire :
 *  1. Le dirigeant choisit la décision qui l'occupe (cartes).
 *  2. On recadre + on pose UNE question précise → champ libre.
 *  3. Une fois qu'il a écrit, seulement, apparaissent Nom / Entreprise / Email / Tél.
 */

type Category = {
  id: string;
  title: string;
  subtitle: string;
  reframe: string;
  question: string;
  wide?: boolean;
};

const CATEGORIES: Category[] = [
  {
    id: "recruter",
    title: "Recruter ou m'entourer",
    subtitle: "Un bras droit, une personne clé, déléguer enfin.",
    reframe:
      "Le recrutement est rarement une décision isolée. On cherche souvent quelqu'un pour résoudre un problème qui, en réalité, se situe ailleurs — dans l'organisation, ou dans ce qu'on n'arrive plus à porter seul.",
    question:
      "Qu'est-ce qui, aujourd'hui, vous amène à penser qu'il vous faut cette personne ?",
  },
  {
    id: "dimension",
    title: "Changer de dimension",
    subtitle: "Grandir, passer un cap, saisir une opportunité.",
    reframe:
      "Grandir n'est pas qu'une question de moyens. C'est souvent le moment où ce qui vous a menés jusqu'ici cesse de suffire pour aller plus loin.",
    question:
      "Qu'est-ce qui vous pousse à vouloir passer ce cap maintenant — et qu'est-ce qui vous retient ?",
  },
  {
    id: "reorganiser",
    title: "Réorganiser mon entreprise",
    subtitle: "Clarifier les rôles, structurer, remettre de l'ordre.",
    reframe:
      "Un problème d'organisation cache souvent une décision qu'on n'a pas encore osé prendre : sur une personne, un périmètre, ou une manière de diriger.",
    question:
      "Si vous deviez nommer ce qui coince vraiment, ce serait quoi ?",
  },
  {
    id: "investissement",
    title: "Un investissement important",
    subtitle: "Engager de l'argent, racheter, m'implanter ailleurs.",
    reframe:
      "Un investissement lourd n'est jamais qu'un calcul. C'est un pari sur une direction — et sur soi. Le vrai sujet est rarement le montant.",
    question:
      "Au-delà des chiffres, qu'est-ce que cette décision engage réellement pour vous ?",
  },
  {
    id: "relation",
    title: "Une relation qui pèse",
    subtitle: "Un associé, un partenaire, une gouvernance à revoir.",
    reframe:
      "Les décisions qui touchent à une relation de pouvoir sont les plus lourdes à porter seul — parce qu'on y mêle l'humain, l'histoire, et l'avenir de l'entreprise.",
    question:
      "Qu'est-ce qui rend cette situation si difficile à trancher aujourd'hui ?",
  },
  {
    id: "modele",
    title: "Repenser mon modèle",
    subtitle: "Mon offre, mon marché, ma direction ne me ressemblent plus.",
    reframe:
      "Quand le modèle ne vous ressemble plus, la question n'est pas seulement stratégique. Elle touche à ce que vous voulez, vraiment, construire.",
    question:
      "Qu'est-ce qui a changé — chez vous, ou autour de vous — pour que ce sujet remonte maintenant ?",
  },
  {
    id: "innommee",
    title: "Je n'arrive pas encore à la nommer",
    subtitle: "Quelque chose me préoccupe, sans que je parvienne à le formuler.",
    reframe:
      "C'est peut-être le point de départ le plus honnête. Les décisions les plus importantes commencent souvent par une gêne qu'on n'arrive pas encore à mettre en mots.",
    question:
      "Décrivez simplement ce qui vous préoccupe, même de façon désordonnée. C'est déjà un début.",
    wide: true,
  },
];

/** Petit voile d'apparition (fondu + léger glissement) au changement d'acte. */
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const REVEAL_AT = 12; // caractères avant de révéler l'identité

export function Contact() {
  const [category, setCategory] = useState<Category | null>(null);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const showIdentity = text.trim().length >= REVEAL_AT;

  function choose(c: Category) {
    setCategory(c);
    setText("");
    // Focus le champ libre juste après l'apparition de l'acte 2.
    setTimeout(() => areaRef.current?.focus(), 420);
  }

  function reset() {
    setCategory(null);
    setText("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) return;
    const fd = new FormData(e.currentTarget);
    const phone = String(fd.get("phone") ?? "").trim();
    const message =
      `[Décision · ${category.title}]\n` +
      `${category.question}\n\n` +
      `${text.trim()}` +
      (phone ? `\n\n— Téléphone : ${phone}` : "");
    const payload = {
      message,
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      callbackRequested: Boolean(phone),
    };
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* dégradable : la parole reste confiée */
    } finally {
      setSending(false);
      setSent(true);
    }
  }

  // ——— Confirmation ———
  if (sent) {
    return (
      <Reveal className="mt-8 rounded-lg border border-line bg-paper p-8 text-center shadow-soft sm:p-12">
        <div className="mx-auto h-0.5 w-11 bg-brass" />
        <h3 className="mt-6 font-serif text-2xl font-semibold text-accent sm:text-[28px]">
          Vous venez de poser les premiers mots sur une décision qui compte.
        </h3>
        <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink/80 sm:text-[17px]">
          C&apos;est souvent l&apos;étape la plus difficile — et la plus
          importante. Je vous lis personnellement et je reviens vers vous sous
          48&nbsp;heures.
        </p>
        <p className="mt-5 font-serif text-lg italic text-mut">— Téféry</p>
      </Reveal>
    );
  }

  // ——— Acte 1 : le choix ———
  if (!category) {
    const grid = CATEGORIES.filter((c) => !c.wide);
    const wide = CATEGORIES.find((c) => c.wide);
    return (
      <div className="mt-8">
        <p className="max-w-[46ch] font-serif text-xl font-semibold leading-snug sm:text-2xl">
          Toutes les décisions ne demandent pas le même niveau d&apos;attention.
        </p>
        <p className="mt-2 max-w-[46ch] text-[15px] text-mut sm:text-base">
          Laquelle occupe le plus votre esprit aujourd&apos;hui&nbsp;?
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => choose(c)}
              className="group flex flex-col rounded-lg border border-line bg-paper p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-bord hover:shadow-lift focus:outline focus:outline-2 focus:outline-brass"
            >
              <span className="font-serif text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {c.title}
              </span>
              <span className="mt-1.5 text-[13.5px] leading-snug text-mut">
                {c.subtitle}
              </span>
            </button>
          ))}
        </div>

        {wide && (
          <button
            type="button"
            onClick={() => choose(wide)}
            className="group mt-3.5 flex w-full flex-col rounded-lg border border-dashed border-line bg-paper2/60 p-5 text-left transition-all hover:border-bord hover:bg-paper focus:outline focus:outline-2 focus:outline-brass sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-serif text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {wide.title}
              </span>
              <span className="mt-1 block text-[13.5px] leading-snug text-mut">
                {wide.subtitle}
              </span>
            </span>
            <span className="mt-3 shrink-0 text-brass transition-transform group-hover:translate-x-0.5 sm:mt-0" aria-hidden>
              →
            </span>
          </button>
        )}
      </div>
    );
  }

  // ——— Acte 2 + 3 : la réflexion, puis l'identité ———
  return (
    <Reveal key={category.id} className="mt-8">
      <button
        type="button"
        onClick={reset}
        className="text-[13px] text-mut underline-offset-2 transition-colors hover:text-accent"
      >
        ← Une autre décision
      </button>

      <form
        onSubmit={handleSubmit}
        className="mt-3 rounded-lg border border-line bg-paper p-6 shadow-soft sm:p-9"
      >
        <p className="text-[15px] leading-relaxed text-ink/80 sm:text-[16.5px]">
          {category.reframe}
        </p>
        <label
          htmlFor="reflect"
          className="mt-5 block font-serif text-xl font-semibold leading-snug text-accent sm:text-[26px]"
        >
          {category.question}
        </label>
        <textarea
          ref={areaRef}
          id="reflect"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={5}
          placeholder="Écrivez comme vous y penseriez à voix haute. Quelques lignes suffisent."
          className="mt-4 min-h-[140px] w-full resize-y rounded border border-line bg-paper2 p-4 text-base leading-relaxed text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
        />

        {/* Acte 3 — révélé seulement quand la réflexion a commencé */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            showIdentity
              ? "mt-6 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-line pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required={showIdentity}
                  aria-label="Nom"
                  placeholder="Nom"
                  className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
                />
                <input
                  type="text"
                  name="company"
                  aria-label="Entreprise"
                  placeholder="Entreprise"
                  className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
                />
                <input
                  type="email"
                  name="email"
                  required={showIdentity}
                  aria-label="Email"
                  placeholder="Email"
                  className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
                />
                <input
                  type="tel"
                  name="phone"
                  aria-label="Téléphone (facultatif)"
                  placeholder="Téléphone (facultatif)"
                  className="w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
                />
              </div>

              <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-mut">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brass"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 3l7 4v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-4z" />
                </svg>
                Ce que vous venez d&apos;écrire reste strictement confidentiel.
                Aucune liste, aucune prospection — un seul regard&nbsp;: le mien.
                Je vous réponds personnellement sous 48&nbsp;heures.
              </p>

              <button
                type="submit"
                disabled={sending}
                className="mt-5 rounded-md bg-bord px-6 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep disabled:opacity-60"
              >
                {sending ? "Un instant…" : "Poursuivons cette réflexion →"}
              </button>
            </div>
          </div>
        </div>

        {!showIdentity && (
          <p className="mt-4 text-[13px] italic text-mut">
            Prenez le temps. Dès les premiers mots, je vous laisse la place pour
            la suite.
          </p>
        )}
      </form>
    </Reveal>
  );
}
