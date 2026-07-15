/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES } from "@/content/cases";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "DISCERNER — Sécuriser vos décisions stratégiques les plus engageantes",
  description:
    "Cabinet de conseil stratégique pour dirigeants de PME. DISCERNER sécurise les décisions qui engageront votre entreprise pour les prochaines années — avant de transformer, recruter ou investir.",
  alternates: { canonical: "/discerner" },
};

const GRILLE: [string, string][] = [
  ["« Je manque de clients »", "Une offre qui ne crée pas assez de valeur"],
  ["« Je manque de temps »", "Une organisation qui ne suit plus l'ambition"],
  ["« Je dois recruter »", "Une délégation qui n'existe pas encore"],
  ["« Ma communication ne marche pas »", "Un positionnement pas assez clair"],
  ["« Je stagne »", "Un arbitrage repoussé depuis trop longtemps"],
];

const COUTS = [
  "Une embauche qui ne résout rien.",
  "Une réorganisation qui ne change rien.",
  "Un investissement engagé sur le mauvais levier.",
  "Des mois de travail sur un symptôme.",
  "Une équipe qui s'épuise.",
  "Une croissance qui ralentit.",
  "Une décision que vous devrez reprendre dans un an.",
];

const FAQ: [string, string][] = [
  [
    "Combien de temps dure la mission ?",
    "Deux demi-journées, avec Téféry, traitées d'un bloc — sans étalement sur des semaines.",
  ],
  [
    "Est-ce une analyse, un audit ?",
    "Non. C'est un travail de sécurisation. Nous ne produisons pas un rapport de plus : nous nous assurons que la direction que vous vous apprêtez à engager est la bonne.",
  ],
  [
    "Et si le sujet dépasse la clarification ?",
    "DISCERNER identifie ce qui mérite vraiment d'être transformé. La transformation elle-même relève d'une mission dédiée, Reconfiguration.",
  ],
];

function Cta({ center = false }: { center?: boolean }) {
  return (
    <div className={`flex flex-col gap-2.5 ${center ? "items-center" : "items-start"}`}>
      <Link
        href="/discerner/reserver"
        className="inline-block rounded-md bg-bord px-7 py-4 text-[15px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
      >
        Réserver un premier échange (20 min)
      </Link>
      <Link
        href="/discerner/premier-regard"
        className="text-[13px] text-mut underline-offset-2 transition-colors hover:text-accent"
      >
        Pas encore sûr que ce soit pour vous ? Faites le Premier Regard — 3 min, gratuit
      </Link>
    </div>
  );
}

export default function DiscernerPage() {
  return (
    <>
      <SiteHeader />

      {/* HERO — LE RISQUE */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-[520px] w-[520px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[920px] px-7 py-20 text-center sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            Cabinet de conseil stratégique · dirigeants de PME
          </p>
          <h1 className="mx-auto mt-5 max-w-[24ch] text-pretty font-serif text-[30px] font-semibold leading-[1.16] sm:text-[40px] md:text-[46px]">
            Une erreur stratégique
            <br />
            ne se voit pas tout de suite.
            <br />
            <span className="text-accent">Elle se paie pendant des années.</span>
          </h1>
          <p className="mx-auto mt-11 max-w-[60ch] text-[16px] leading-relaxed text-mut sm:text-[18px]">
            DISCERNER sécurise les décisions qui engageront votre entreprise pour les
            prochaines années. Avant de transformer, de recruter ou d&apos;investir, nous
            nous assurons que vous agissez sur ce qui compte vraiment —{" "}
            <strong className="text-ink">pas sur un symptôme</strong>.
          </p>
          <div className="mt-9 flex justify-center">
            <Cta center />
          </div>
        </div>
      </section>

      {/* 1 — LA DOULEUR */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="font-serif text-[24px] font-semibold italic leading-snug text-accent sm:text-[32px]">
            « Je ne peux plus continuer à porter seul des décisions qui engagent
            l'avenir de mon entreprise — et de ma vie. »
          </p>
          <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-mut">
            Si cette phrase vous parle, vous n'avez probablement pas un problème de
            solutions : vous en avez déjà essayé beaucoup. Ce qu'il vous manque, c'est de
            la clarté sur votre trajectoire — savoir{" "}
            <strong className="text-ink">quels arbitrages comptent vraiment</strong>, et
            lequel vous coûte le plus aujourd'hui.
          </p>
        </div>
      </section>

      {/* 2 — POURQUOI MAINTENANT */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-accent">
            Pourquoi maintenant
          </p>
          <h2 className="mt-4 max-w-[22ch] font-serif text-[24px] font-semibold leading-tight sm:text-[34px]">
            Les décisions qui attendent finissent par décider à votre place.
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-relaxed text-mut">
            Chaque mois passé sur le mauvais chantier produit des conséquences invisibles.
            Une équipe qui s'organise autour d'un problème mal posé. Des investissements qui
            s'empilent sur le mauvais levier. Des habitudes qui deviennent difficiles à
            remettre en question. Le coût d'une mauvaise lecture n'est pas fixe —{" "}
            <strong className="text-ink">il augmente avec le temps</strong>.
          </p>
        </div>
      </section>

      {/* 3 — CE QUE COÛTE UNE MAUVAISE LECTURE */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.2em] text-accent">
            Le coût caché
          </p>
          <h2 className="mt-4 font-serif text-[24px] font-semibold sm:text-[32px]">
            Ce que coûte une mauvaise lecture.
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-relaxed text-mut">
            Vous pensez avoir un problème de communication. Vous engagez 4 000 € dans une
            agence, six mois de travail, des dizaines de publications…
            <span className="text-accent"> puis vous découvrez que le problème, c'était votre offre.</span>{" "}
            Une mauvaise lecture, ce n'est jamais l'argent dépensé. C'est tout ce qui vient
            après :
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {COUTS.map((c) => (
              <li key={c} className="flex gap-2.5 text-[15px] text-ink/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bord" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 font-serif text-[19px] font-medium text-accent sm:text-[22px]">
            DISCERNER existe pour éviter cela.
          </p>
        </div>
      </section>

      {/* 4 — LA GRILLE */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            Ce qu'un dirigeant se dit — et l'angle mort qui se cache parfois derrière.
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-2 bg-card text-[11px] font-semibold uppercase tracking-wide text-mut">
              <div className="border-b border-r border-line px-4 py-3">Ce qu'il se dit…</div>
              <div className="border-b border-line px-4 py-3">L'angle mort possible…</div>
            </div>
            {GRILLE.map(([a, b], i) => (
              <div key={a} className={`grid grid-cols-2 ${i % 2 ? "bg-paper2" : "bg-paper"}`}>
                <div className="border-r border-line px-4 py-3.5 text-[14px] text-mut">{a}</div>
                <div className="px-4 py-3.5 text-[14px] font-medium text-accent">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — POURQUOI TÉFÉRY */}
      <section className="border-b border-line py-16">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-10 px-7 md:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-lg border border-line shadow-lift">
            <img
              src="/photos/tefery-bordeaux.webp"
              alt="Téféry, fondatrice de DULEME AND CIE"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="font-serif text-[24px] font-semibold sm:text-[30px]">
              Pourquoi les dirigeants viennent me voir.
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink/85">
              Ce qui me préoccupe n'est pas votre problème. C'est le temps, l'argent et
              l'énergie que vous perdez peut-être à transformer la mauvaise chose.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink/85">
              En dix ans, j'ai vu des dirigeants investir dans le marketing alors que
              leur offre n'était pas claire. Recruter alors que leur organisation
              n'était pas prête. Refaire leur communication alors que le vrai frein
              était ailleurs.
            </p>
            <p className="mt-3 font-serif text-lg italic text-accent">
              Mon rôle n'est pas de trouver plus de solutions. C'est de m'assurer que
              vous résolvez le bon problème.
            </p>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-wide text-mut">
              10 ans · plus de 1 000 entrepreneurs accompagnés
            </p>
          </div>
        </div>
      </section>

      {/* 6 — CE QU'ILS ONT COMPRIS */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[1000px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            Ce qu'ils ont compris.
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] text-mut">
            Des cas réels (anonymisés). À chaque fois, le problème annoncé n'était pas
            le vrai.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CASES.map((c) => (
              <div
                key={c.metier}
                className="flex flex-col rounded-lg border border-line bg-card p-6 shadow-card"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brass">
                  {c.metier}
                </p>
                <p className="mt-3 font-serif text-[15px] font-semibold italic leading-snug text-ink">
                  {c.croyait}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-mut">
                  <span className="font-semibold text-accent">En réalité — </span>
                  {c.realite}
                </p>
                <p className="mt-3 border-t border-line pt-3 text-[13.5px] leading-relaxed text-ink/85">
                  <span className="font-semibold text-ok">Résultat — </span>
                  {c.resultat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — SÉLECTION : NOUS N'ACCEPTONS PAS TOUTES LES SITUATIONS */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-accent">
            Une mission exigeante
          </p>
          <h2 className="mt-4 font-serif text-[24px] font-semibold sm:text-[32px]">
            Nous n'acceptons pas toutes les situations.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[15.5px] leading-relaxed text-mut">
            DISCERNER est réservé aux dirigeants confrontés à une décision qui engage
            durablement leur entreprise. C'est une mission conçue pour un moment précis —
            pas un conseil de plus. Elle est faite pour vous si :
          </p>
          <ul className="mt-5 space-y-2.5 text-[15px] text-ink/85">
            {[
              "vous dirigez une entreprise qui tourne, mais vous sentez qu'elle pourrait aller beaucoup plus loin",
              "vous êtes face à une décision qui engage plusieurs années — recruter, réorganiser, investir, changer de modèle",
              "vous préférez prendre la bonne décision plutôt que travailler encore plus",
              "vous acceptez de remettre vos certitudes en question",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="text-ok">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] italic leading-relaxed text-mut">
            En revanche, ce n'est pas pour vous si vous cherchez des conseils rapides, une
            recette marketing ou une solution miracle.
          </p>
        </div>
      </section>

      {/* 8 — CE QUE DISCERNER SÉCURISE + CE QUE VOUS ACHETEZ */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            Ce que DISCERNER sécurise.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mut">
            Vous repartez avec :
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-ink/85">
            <li>• le <strong>vrai frein</strong> à votre trajectoire — celui qui pèse réellement ;</li>
            <li>• les <strong>2 à 3 décisions</strong> qui comptent vraiment maintenant ;</li>
            <li>• celles qui peuvent attendre ;</li>
            <li>• une direction claire, cohérente avec ce que vous voulez vraiment construire.</li>
          </ul>

          <p className="mt-7 max-w-[62ch] text-[14.5px] leading-relaxed text-mut">
            Et si un chantier de transformation s'impose ensuite — repenser
            l'organisation, les rôles, le modèle — c'est l'objet d'une mission dédiée,{" "}
            <strong className="text-ink">Reconfiguration</strong>. DISCERNER vient avant :
            il vous dit d'abord ce qui mérite vraiment d'être transformé.
          </p>

          <div className="mt-9 rounded-lg border border-line bg-card p-7 shadow-card">
            <p className="mx-auto text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brass">
              Ce que vous achetez
            </p>
            <p className="mx-auto mt-3 max-w-[52ch] text-center font-serif text-[19px] leading-snug text-ink sm:text-[22px]">
              Vous n'achetez pas deux demi-journées. Vous achetez la certitude de ne pas
              engager votre entreprise dans la mauvaise direction — et d'éviter les mois,
              parfois les années, passés à transformer la mauvaise chose.
            </p>
            <div className="mt-6 flex justify-center">
              <Cta center />
            </div>
          </div>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-accent">
            En pratique
          </p>
          <div className="mt-7 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <h3 className="font-serif text-[17px] font-semibold">{q}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-mut">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — LA MISSION (clôture) */}
      <section className="py-20">
        <div className="mx-auto max-w-[720px] px-7 text-center">
          <div className="mx-auto mb-6 h-0.5 w-11 bg-brass" />
          <p className="font-serif text-[24px] font-semibold leading-snug sm:text-[30px]">
            Redonner aux dirigeants la liberté de choisir leur vie — afin que leur
            réussite ne se construise plus au détriment de leur famille.
          </p>
          <p className="mt-5 text-[14px] text-mut">
            C'est pour cela que DULEME AND CIE existe. Et cela commence par sécuriser la
            décision qui engage vos prochaines années.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta center />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
