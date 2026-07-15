/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "DISCERNER™ — Sécurisez vos décisions qui engagent votre entreprise",
  description:
    "Cabinet de décision stratégique pour dirigeants de PME. DISCERNER™ vérifie que vous travaillez sur le bon problème avant d'engager du temps, de l'argent et des années.",
  alternates: { canonical: "/discerner" },
};

type Case = { metier: string; croyait: string; realite: string; resultat: string };

const CASES: Case[] = [
  {
    metier: "Dirigeant d'une salle de sport",
    croyait: "« J'ai un problème de marketing — je dois surtout réduire mes coûts. »",
    realite:
      "Le vrai sujet n'était pas le marketing. Il faisait le travail de son équipe et n'occupait plus sa place de dirigeant. Une seule question a tout changé : « Tu es l'ami de ton équipe, ou leur dirigeant ? »",
    resultat:
      "Il a repris sa place, posé des limites, retrouvé du temps pour sa famille — et porte aujourd'hui un projet à 1 à 2 millions d'euros.",
  },
  {
    metier: "Consultante indépendante",
    croyait: "« Je manque de clients, il faut que j'en trouve plus. »",
    realite:
      "En une heure, elle a compris que le problème n'était pas le nombre de clients, mais la valeur qu'elle accordait à son propre travail.",
    resultat:
      "Elle a doublé ses tarifs et attiré des clients qui reconnaissaient enfin la valeur de son expertise.",
  },
  {
    metier: "Fondatrice d'une application",
    croyait: "« J'ai un problème de communication : je n'arrive pas à expliquer mon activité. »",
    realite:
      "En quelques heures, le vrai sujet est apparu : elle ne savait pas réellement quel problème son produit résolvait.",
    resultat:
      "Business model repensé, proposition de valeur clarifiée — elle présente enfin son activité avec simplicité et confiance.",
  },
];

const GRILLE: [string, string][] = [
  ["« Je manque de clients »", "Une offre qui ne crée pas assez de valeur"],
  ["« Je manque de temps »", "Une organisation qui ne suit plus l'ambition"],
  ["« Je dois recruter »", "Une délégation qui n'existe pas encore"],
  ["« Ma communication ne marche pas »", "Un positionnement pas assez clair"],
  ["« Je stagne »", "Une décision importante repoussée depuis trop longtemps"],
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
        Pas encore sûr que ce soit pour vous ? Faites le Premier Regard™ — 3 min, gratuit
      </Link>
    </div>
  );
}

export default function DiscernerPage() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-[520px] w-[520px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[920px] px-7 py-20 text-center sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            Cabinet de décision stratégique · dirigeants de PME
          </p>
          <h1 className="mx-auto mt-5 max-w-[17ch] font-serif text-4xl font-semibold leading-[1.05] sm:text-[52px]">
            Et si vous étiez en train de résoudre{" "}
            <span className="text-accent">le mauvais problème&nbsp;?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-[16px] leading-relaxed text-mut sm:text-[18px]">
            Nous sécurisons les décisions qui engagent durablement votre entreprise —
            en vérifiant d'abord que vous travaillez sur le <strong className="text-ink">bon</strong>{" "}
            problème, avant d'y engager du temps, de l'argent et des années.
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
            solutions : vous en avez déjà essayé beaucoup. Vous avez un problème de
            clarté — <strong className="text-ink">savoir lesquelles comptent vraiment</strong>,
            et laquelle vous coûte le plus aujourd'hui.
          </p>
        </div>
      </section>

      {/* 2 — LE PRIX DU MAUVAIS PROBLÈME */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.2em] text-accent">
            Le prix du mauvais problème
          </p>
          <p className="mt-5 font-serif text-[21px] leading-relaxed text-ink/90 sm:text-[26px]">
            Vous pensez avoir un problème de communication. Vous investissez 4 000 €
            dans une agence, six mois de travail, des dizaines de publications…
            <span className="text-accent"> puis vous découvrez que le problème, c'était votre offre.</span>
          </p>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-mut">
            Le vrai coût n'est pas l'argent dépensé. Ce sont les mois passés sur le
            mauvais combat — et les bonnes décisions repoussées pendant ce temps.
          </p>
        </div>
      </section>

      {/* 3 — LA GRILLE */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            Ce que les dirigeants croient — et ce qui se cache parfois derrière.
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-2 bg-card text-[11px] font-semibold uppercase tracking-wide text-mut">
              <div className="border-b border-r border-line px-4 py-3">Ce qu'il se dit…</div>
              <div className="border-b border-line px-4 py-3">Ce qui se cache parfois derrière…</div>
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

      {/* 4 — POURQUOI TÉFÉRY */}
      <section className="border-b border-line bg-paper2 py-16">
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
              l'énergie que vous perdez peut-être à essayer de résoudre le mauvais.
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

      {/* 5 — CE QU'ILS ONT COMPRIS */}
      <section className="border-b border-line py-16">
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

      {/* 6 — POUR QUI */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <h2 className="font-serif text-[22px] font-semibold sm:text-[28px]">
            À qui s'adresse DISCERNER™ ?
          </h2>
          <ul className="mt-5 space-y-2.5 text-[15px] text-ink/85">
            {[
              "vous dirigez une entreprise qui tourne, mais vous sentez qu'elle pourrait aller beaucoup plus loin",
              "vous ne voulez plus avancer à l'intuition sur les décisions qui engagent",
              "vous préférez prendre de meilleures décisions plutôt que travailler encore plus",
              "vous acceptez de remettre vos certitudes en question",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="text-ok">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] italic leading-relaxed text-mut">
            En revanche, ce n'est probablement pas pour vous si vous cherchez des
            conseils rapides, une recette marketing ou une solution miracle.
          </p>
        </div>
      </section>

      {/* 7 — DISCERNER, CONCRÈTEMENT + PRIX */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            DISCERNER™, concrètement.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-mut">
            Un format <strong className="text-ink">concentré : deux demi-journées, en une seule fois</strong>.
            Tout est traité d'un bloc, avec Téféry — sans étalement sur des semaines.
            Vous repartez avec :
          </p>
          <ul className="mt-4 space-y-2 text-[15px] text-ink/85">
            <li>• le <strong>vrai problème</strong> qui freine réellement votre trajectoire ;</li>
            <li>• les <strong>2 à 3 décisions</strong> qui comptent vraiment maintenant ;</li>
            <li>• celles qui peuvent attendre ;</li>
            <li>• une direction claire, cohérente avec ce que vous voulez vraiment construire.</li>
          </ul>

          <div className="mt-9 rounded-lg border border-line bg-card p-7 text-center shadow-card">
            <p className="font-serif text-[28px] font-semibold text-accent">7 600 € HT</p>
            <p className="mx-auto mt-2 max-w-[50ch] text-[14px] leading-relaxed text-mut">
              Deux demi-journées. Le coût d'un mauvais problème, lui, se compte
              souvent en dizaines de milliers d'euros — et en années.
            </p>
            <div className="mt-6 flex justify-center">
              <Cta center />
            </div>
          </div>
        </div>
      </section>

      {/* 8 — LA MISSION (clôture) */}
      <section className="py-20">
        <div className="mx-auto max-w-[720px] px-7 text-center">
          <div className="mx-auto mb-6 h-0.5 w-11 bg-brass" />
          <p className="font-serif text-[24px] font-semibold leading-snug sm:text-[30px]">
            Redonner aux dirigeants la liberté de choisir leur vie — afin que leur
            réussite ne se construise plus au détriment de leur famille.
          </p>
          <p className="mt-5 text-[14px] text-mut">
            C'est pour cela que DULEME AND CIE existe. Et cela commence par une seule
            question : travaillez-vous sur le bon problème ?
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
