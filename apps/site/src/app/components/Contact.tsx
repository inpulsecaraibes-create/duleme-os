"use client";

import { useEffect, useState } from "react";

/**
 * « La première minute de l'expérience DULEME ».
 *  1. Le dirigeant choisit la décision qui l'occupe (cartes).
 *  2. Trois questions libres, propres à l'hypothèse de la carte.
 *  3. Coordonnées + espace d'expression libre.
 *  4. Invitation naturelle à un échange de 20 minutes (ou un email direct).
 */

type Category = {
  id: string;
  title: string;
  subtitle: string;
  reframe: string;
  questions: [string, string, string];
  wide?: boolean;
};

const CATEGORIES: Category[] = [
  {
    id: "recruter",
    title: "Recruter ou m'entourer",
    subtitle: "Un bras droit, une personne clé, déléguer enfin.",
    reframe:
      "Le recrutement est rarement une décision isolée. On cherche souvent quelqu'un pour résoudre un problème qui, en réalité, se situe ailleurs.",
    questions: [
      "Qu'est-ce qui, aujourd'hui, vous fait penser qu'il vous faut cette personne ?",
      "Si vous ne recrutiez personne, quel problème resterait exactement le même ?",
      "Qu'attendez-vous d'elle que vous pourriez, peut-être, décider vous-même ?",
    ],
  },
  {
    id: "dimension",
    title: "Changer de dimension",
    subtitle: "Grandir, passer un cap, saisir une opportunité.",
    reframe:
      "Grandir n'est pas qu'une question de moyens. C'est souvent le moment où ce qui vous a mené jusqu'ici cesse de suffire.",
    questions: [
      "Qu'est-ce qui vous pousse à vouloir passer ce cap maintenant ?",
      "Si votre activité doublait dans six mois, qu'est-ce qui casserait en premier ?",
      "Qu'est-ce qui vous retient, vraiment ?",
    ],
  },
  {
    id: "reorganiser",
    title: "Réorganiser mon entreprise",
    subtitle: "Clarifier les rôles, structurer, remettre de l'ordre.",
    reframe:
      "Un problème d'organisation cache souvent une décision qu'on n'a pas encore osé prendre : sur une personne, un rôle, une manière de diriger.",
    questions: [
      "Si vous deviez nommer ce qui coince vraiment, ce serait quoi ?",
      "Qu'est-ce qui, dans votre semaine, remonte systématiquement à vous ?",
      "Quelle décision repoussez-vous — sur une personne, un rôle, un périmètre ?",
    ],
  },
  {
    id: "investissement",
    title: "Un investissement important",
    subtitle: "Engager de l'argent, racheter, m'implanter ailleurs.",
    reframe:
      "Un investissement lourd n'est jamais qu'un calcul. C'est un pari sur une direction — et sur soi. Le vrai sujet est rarement le montant.",
    questions: [
      "Quel investissement envisagez-vous, et pour répondre à quoi ?",
      "Au-delà des chiffres, qu'est-ce que cette décision engage pour vous ?",
      "Qu'est-ce qui vous ferait dire, dans deux ans, que c'était le bon choix ?",
    ],
  },
  {
    id: "relation",
    title: "Une relation qui pèse",
    subtitle: "Un associé, un partenaire, une gouvernance à revoir.",
    reframe:
      "Les décisions qui touchent à une relation de pouvoir sont les plus lourdes à porter seul — parce qu'on y mêle l'humain, l'histoire et l'avenir de l'entreprise.",
    questions: [
      "Quelle est la relation qui vous pèse, et depuis combien de temps ?",
      "Quel est le vrai sujet — celui dont vous n'avez peut-être jamais parlé franchement ?",
      "Qu'est-ce que vous évitez de trancher, et pourquoi ?",
    ],
  },
  {
    id: "modele",
    title: "Repenser mon modèle",
    subtitle: "Mon offre, mon marché, ma direction ne me ressemblent plus.",
    reframe:
      "Quand le modèle ne vous ressemble plus, la question n'est pas seulement stratégique. Elle touche à ce que vous voulez, vraiment, construire.",
    questions: [
      "Qu'est-ce qui, dans votre activité, ne vous ressemble plus ?",
      "Qu'est-ce qui a changé — chez vous, ou autour de vous ?",
      "Si vous repartiez de zéro, que garderiez-vous, que changeriez-vous ?",
    ],
  },
  {
    id: "innommee",
    title: "Je n'arrive pas encore à la nommer",
    subtitle: "Quelque chose me préoccupe, sans que je parvienne à le formuler.",
    reframe:
      "C'est peut-être le point de départ le plus honnête. Les décisions les plus importantes commencent souvent par une gêne qu'on n'arrive pas encore à mettre en mots.",
    questions: [
      "Décrivez ce que vous ressentez, même de façon désordonnée.",
      "Qu'est-ce qui vous préoccupe le plus, en ce moment ?",
      "Si une seule chose pouvait changer, laquelle aimeriez-vous que ce soit ?",
    ],
    wide: true,
  },
  {
    id: "autre",
    title: "Autre",
    subtitle: "Ma situation ne rentre dans aucune de ces cases.",
    reframe:
      "Votre situation ne rentre dans aucune case ? C'est souvent bon signe — parlons-en avec vos mots.",
    questions: [
      "De quoi s'agit-il, en quelques mots ?",
      "Qu'est-ce que cela vous coûte aujourd'hui ?",
      "Quelle décision aimeriez-vous prendre avec plus de clarté ?",
    ],
    wide: true,
  },
];

const CONTACT_EMAIL = "dulemeandcie@hotmail.com";

function Reveal({ k, children }: { k: string; children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, [k]);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const fieldCls =
  "w-full rounded border border-line bg-paper2 p-3 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";

export function Contact() {
  const [category, setCategory] = useState<Category | null>(null);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [freeText, setFreeText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const written = answers.join("").trim().length >= 12;
  const setAnswer = (i: number, v: string) =>
    setAnswers((p) => p.map((x, j) => (j === i ? v : x)));

  function reset() {
    setCategory(null);
    setAnswers(["", "", ""]);
    setFreeText("");
  }

  async function submit() {
    if (!category || !firstName || !email) return;
    const message =
      `[${category.title}]\n\n` +
      category.questions
        .map((q, i) => `• ${q}\n${answers[i]?.trim() || "—"}`)
        .join("\n\n") +
      (freeText.trim() ? `\n\n— À ajouter :\n${freeText.trim()}` : "");
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          name: `${firstName} ${lastName}`.trim(),
          email,
        }),
      });
    } catch {
      /* dégradable */
    } finally {
      setSending(false);
      setSent(true);
    }
  }

  // ——— Confirmation ———
  if (sent) {
    return (
      <Reveal k="done">
        <div className="mt-8 rounded-lg border border-line bg-paper p-8 text-center shadow-soft sm:p-12">
          <div className="mx-auto h-0.5 w-11 bg-brass" />
          <h3 className="mt-6 font-serif text-2xl font-semibold text-accent sm:text-[28px]">
            Vous venez de poser les premiers mots sur une décision qui compte.
          </h3>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink/80">
            La suite naturelle, c'est un premier échange de 20 minutes avec Téféry —
            pour vérifier ensemble que vous travaillez sur le bon problème.
          </p>
          <a
            href="/discerner/reserver"
            className="mt-7 inline-block rounded-md bg-bord px-7 py-4 text-[15px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
          >
            Réserver mon échange de 20 minutes
          </a>
          <p className="mt-5 text-[13px] text-mut">
            Ou écrivez-nous directement :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Reveal>
    );
  }

  // ——— Acte 1 : le choix ———
  if (!category) {
    const grid = CATEGORIES.filter((c) => !c.wide);
    const wide = CATEGORIES.filter((c) => c.wide);
    return (
      <div className="mt-8">
        <p className="max-w-[46ch] font-serif text-xl font-semibold leading-snug sm:text-2xl">
          Toutes les décisions ne demandent pas le même niveau d'attention.
        </p>
        <p className="mt-2 max-w-[46ch] text-[15px] text-mut sm:text-base">
          Laquelle occupe le plus votre esprit aujourd'hui&nbsp;?
        </p>
        <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c);
                setAnswers(["", "", ""]);
              }}
              className="group flex flex-col rounded-lg border border-line bg-paper p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-bord hover:shadow-lift focus:outline focus:outline-2 focus:outline-brass"
            >
              <span className="font-serif text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {c.title}
              </span>
              <span className="mt-1.5 text-[13.5px] leading-snug text-mut">{c.subtitle}</span>
            </button>
          ))}
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {wide.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c);
                setAnswers(["", "", ""]);
              }}
              className="group flex flex-col rounded-lg border border-dashed border-line bg-paper2/60 p-5 text-left transition-all hover:border-bord hover:bg-paper focus:outline focus:outline-2 focus:outline-brass"
            >
              <span className="font-serif text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                {c.title}
              </span>
              <span className="mt-1 text-[13.5px] leading-snug text-mut">{c.subtitle}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ——— Actes 2 & 3 : les 3 questions, puis coordonnées ———
  return (
    <Reveal k={category.id}>
      <div className="mt-8">
        <button
          type="button"
          onClick={reset}
          className="text-[13px] text-mut underline-offset-2 transition-colors hover:text-accent"
        >
          ← Une autre décision
        </button>

        <div className="mt-3 rounded-lg border border-line bg-paper p-6 shadow-soft sm:p-9">
          <p className="text-[15px] leading-relaxed text-ink/80 sm:text-[16px]">
            {category.reframe}
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {category.questions.map((q, i) => (
              <div key={i}>
                <label className="block font-serif text-[16px] font-semibold leading-snug text-accent">
                  {q}
                </label>
                <textarea
                  value={answers[i]}
                  onChange={(e) => setAnswer(i, e.target.value)}
                  rows={2}
                  className={`mt-2 resize-y ${fieldCls}`}
                />
              </div>
            ))}
          </div>

          {/* Acte 3 — révélé quand la réflexion a commencé */}
          <div
            className={`grid transition-all duration-500 ease-out ${
              written ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-line pt-6">
                <label className="block text-[13px] font-medium text-ink">
                  Souhaitez-vous ajouter quelque chose ? (facultatif)
                </label>
                <textarea
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  rows={2}
                  placeholder="Tout ce qui vous semble utile à partager."
                  className={`mt-2 resize-y ${fieldCls}`}
                />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Prénom"
                    className={fieldCls}
                  />
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nom"
                    className={fieldCls}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email professionnel"
                  className={`mt-3 ${fieldCls}`}
                />
                <p className="mt-4 flex items-start gap-2.5 text-[13px] leading-relaxed text-mut">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 3l7 4v5c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-4z" />
                  </svg>
                  Ce que vous écrivez reste strictement confidentiel. Un seul regard : le
                  mien. Je vous réponds personnellement.
                </p>
                <button
                  type="button"
                  disabled={sending || !firstName || !email}
                  onClick={submit}
                  className="mt-5 rounded-md bg-bord px-6 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep disabled:opacity-50"
                >
                  {sending ? "Un instant…" : "Poursuivons cette réflexion →"}
                </button>
              </div>
            </div>
          </div>

          {!written && (
            <p className="mt-4 text-[13px] italic text-mut">
              Prenez le temps. Dès les premiers mots, je vous laisse la place pour la
              suite.
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
