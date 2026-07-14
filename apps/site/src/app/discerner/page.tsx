/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { asc, eq, getDb, isDbConfigured, testimonial } from "@duleme/database";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "DISCERNER™ — Résolvez-vous le bon problème ?",
  description:
    "DISCERNER™ aide les dirigeants à identifier le véritable problème qui freine leur entreprise — avant d'investir du temps et de l'argent dans la mauvaise solution.",
  alternates: { canonical: "/discerner" },
};

type Story = { headline: string; body: string; attribution: string };

const FALLBACK: Story[] = [
  {
    headline: "Elle a vu quelque chose que je ne voyais plus.",
    body: "J'étais persuadé que mon problème était commercial. En quelques échanges, elle m'a montré que je passais complètement à côté du vrai sujet.",
    attribution: "Dirigeant de PME — témoignage anonymisé",
  },
  {
    headline: "Je ne me suis jamais sentie jugée.",
    body: "Avec Téféry, j'ai eu l'impression, pour la première fois depuis longtemps, de pouvoir réfléchir sans avoir besoin de me justifier.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
  },
  {
    headline: "Elle m'a redonné le droit d'être ambitieuse.",
    body: "J'ai compris que je n'avais pas un problème de compétences. J'avais un problème d'autorisation : je ne m'autorisais plus à voir plus grand.",
    attribution: "Dirigeante de PME — témoignage anonymisé",
  },
];

async function getStories(): Promise<Story[]> {
  if (!isDbConfigured()) return FALLBACK;
  try {
    const rows = await getDb()
      .select()
      .from(testimonial)
      .where(eq(testimonial.published, true))
      .orderBy(asc(testimonial.position), asc(testimonial.createdAt));
    return rows.length
      ? rows.map((r) => ({ headline: r.headline, body: r.body, attribution: r.attribution }))
      : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

const GRILLE: [string, string][] = [
  ["Je manque de clients", "Une offre qui ne crée pas assez de valeur"],
  ["Je manque de temps", "Une organisation qui ne suit plus l'ambition"],
  ["Je dois recruter", "Une délégation inexistante"],
  ["Ma communication ne fonctionne pas", "Un positionnement flou"],
  ["Je stagne", "Une décision importante repoussée depuis trop longtemps"],
];

function CtaBlock() {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/discerner/premier-regard"
        className="inline-block w-fit rounded-md bg-bord px-7 py-4 text-[15px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
      >
        Faire mon Premier Regard™
      </Link>
      <Link
        href="/discerner/reserver"
        className="w-fit text-[13px] text-mut underline-offset-2 transition-colors hover:text-accent"
      >
        Je connais déjà votre travail — échanger directement
      </Link>
    </div>
  );
}

export default async function DiscernerPage() {
  const stories = await getStories();
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
        <div className="relative mx-auto max-w-[900px] px-7 py-20 text-center sm:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
            DISCERNER™ · l'expérience de discernement stratégique
          </p>
          <h1 className="mx-auto mt-5 max-w-[16ch] font-serif text-4xl font-semibold leading-[1.04] sm:text-[56px]">
            Et si vous étiez en train de résoudre{" "}
            <span className="text-accent">le mauvais problème&nbsp;?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[16px] leading-relaxed text-mut sm:text-[18px]">
            La plupart des dirigeants investissent du temps et de l'argent dans la
            mauvaise solution — parce que le bon problème n'a pas encore été posé.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaBlock />
          </div>
        </div>
      </section>

      {/* 1 — LA MAUVAISE SOLUTION */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="max-w-[24ch] font-serif text-[26px] font-semibold leading-tight sm:text-[38px]">
            On achète une solution avant d'avoir posé le bon problème.
          </h2>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-mut">
            Le problème que vous nommez — le temps, les clients, le recrutement — est
            souvent une conséquence. Le véritable frein, lui, reste invisible. Et tant
            qu'il le reste, chaque décision, même juste, s'applique au mauvais endroit.
          </p>
        </div>
      </section>

      {/* 2 — LE PRIX DU MAUVAIS DIAGNOSTIC */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Le prix du mauvais diagnostic
          </p>
          <p className="mt-5 font-serif text-[22px] leading-relaxed text-ink/90 sm:text-[27px]">
            « Vous pensez avoir un problème de communication. Vous investissez 4 000 €
            dans une agence, six mois de travail, des dizaines de publications…
            <span className="text-accent"> puis vous découvrez que le problème, c'était votre offre. »</span>
          </p>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-mut">
            Le vrai coût n'est pas l'argent dépensé. Ce sont les mois passés sur le
            mauvais combat — pendant que le véritable frein, lui, continue d'agir.
          </p>
        </div>
      </section>

      {/* 3 — CE QU'ILS ONT COMPRIS */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[1000px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[26px] font-semibold sm:text-[36px]">
            Ce qu'ils ont compris.
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {stories.slice(0, 3).map((s) => (
              <div
                key={s.headline}
                className="flex flex-col rounded-lg border border-line bg-card p-6 shadow-card"
              >
                <div className="font-serif text-[40px] leading-[0.6] text-brass" aria-hidden>
                  &ldquo;
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-accent">
                  {s.headline}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/80">
                  {s.body}
                </p>
                <p className="mt-4 text-[11px] tracking-wide text-mut">{s.attribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — POURQUOI LES DIRIGEANTS VIENNENT ME VOIR */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-10 px-7 md:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-lg border border-line shadow-lift">
            <img
              src="/tefery.jpg"
              alt="Téféry, fondatrice de DULEME AND CIE"
              className="aspect-[4/5] w-full object-cover"
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
              n'était pas prête. Changer de communication alors que leur positionnement
              était le véritable frein.
            </p>
            <p className="mt-3 font-serif text-lg italic text-accent">
              Mon rôle n'est pas de trouver plus de solutions. Mon rôle est de
              m'assurer que vous résolvez le bon problème.
            </p>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-wide text-mut">
              10 ans d'expérience · Plus de 1 000 entrepreneurs accompagnés
            </p>
          </div>
        </div>
      </section>

      {/* 5 — LA GRILLE */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[24px] font-semibold sm:text-[32px]">
            Les mauvais problèmes que je rencontre le plus souvent.
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-2 bg-card text-[11px] font-semibold uppercase tracking-wide text-mut">
              <div className="border-b border-r border-line px-4 py-3">Le dirigeant pense…</div>
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

      {/* 6 — LE PREMIER REGARD EXPLIQUÉ */}
      <section className="border-b border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Par où commencer
          </p>
          <h2 className="mt-3 max-w-[22ch] font-serif text-[26px] font-semibold leading-tight sm:text-[36px]">
            Le Premier Regard™ n'est pas un test.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-mut">
            C'est une première expérience de discernement. Quelques minutes pour poser
            votre situation avec vos mots — et vérifier si le problème que vous
            cherchez aujourd'hui à résoudre est bien celui qui mérite votre énergie.
          </p>
          <div className="mt-8">
            <CtaBlock />
          </div>
        </div>
      </section>

      {/* 7 — À QUI S'ADRESSE + CE QUE PERMET + PRIX */}
      <section className="border-b border-line py-16">
        <div className="mx-auto max-w-[900px] px-7">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-[22px] font-semibold sm:text-[26px]">
                À qui s'adresse DISCERNER™ ?
              </h2>
              <ul className="mt-5 space-y-2.5 text-[15px] text-ink/85">
                {[
                  "sentent que leur entreprise pourrait aller beaucoup plus loin",
                  "ne veulent plus avancer à l'intuition",
                  "veulent prendre de meilleures décisions plutôt que travailler davantage",
                  "acceptent de remettre leurs certitudes en question",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-ok">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] italic leading-relaxed text-mut">
                En revanche, DISCERNER™ n'est probablement pas fait pour vous si vous
                cherchez uniquement des conseils rapides, une méthode marketing ou une
                solution miracle.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-[22px] font-semibold sm:text-[26px]">
                Ce que permet DISCERNER™.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/85">
                Après DISCERNER™, vous ne verrez probablement plus votre entreprise de
                la même manière. Vous repartirez avec une compréhension plus claire :
              </p>
              <ul className="mt-3 space-y-1.5 text-[14.5px] text-mut">
                <li>• de ce qui freine réellement votre trajectoire ;</li>
                <li>• des décisions qui méritent votre attention aujourd'hui ;</li>
                <li>• de celles qui peuvent attendre ;</li>
                <li>• des actions qui risquent de vous faire perdre plusieurs mois.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-line bg-card p-7 text-center shadow-card">
            <p className="font-serif text-[26px] font-semibold text-accent">DISCERNER™ — 7 600 €</p>
            <p className="mx-auto mt-3 max-w-[52ch] text-[14px] leading-relaxed text-mut">
              Le coût d'un mauvais problème se compte souvent en dizaines de milliers
              d'euros — et en années. DISCERNER™ commence par le Premier Regard™,
              gratuit.
            </p>
          </div>
        </div>
      </section>

      {/* CLÔTURE */}
      <section className="py-20">
        <div className="mx-auto max-w-[720px] px-7 text-center">
          <div className="mx-auto mb-6 h-0.5 w-11 bg-brass" />
          <h2 className="font-serif text-[26px] font-semibold leading-tight sm:text-[34px]">
            Avant de chercher une solution, assurons-nous que c'est le bon problème.
          </h2>
          <div className="mt-8 flex justify-center">
            <CtaBlock />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
