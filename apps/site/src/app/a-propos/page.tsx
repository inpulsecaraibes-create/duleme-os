/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, Heading } from "@duleme/ui";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "À propos — Pourquoi DULEME existe",
  description:
    "DULEME AND CIE aide les dirigeants à sécuriser les décisions qui engagent durablement leur entreprise. Notre combat : que le potentiel des dirigeants ne soit plus gâché.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — DULEME AND CIE",
    description:
      "Une entreprise n'est jamais une finalité. C'est un moyen de construire la vie que l'on veut vivre.",
  },
};

const REFUS = [
  "Je refuse que des dirigeants sacrifient leur vie pour une entreprise qui était censée l'améliorer.",
  "Je refuse que des décisions majeures soient prises à partir d'hypothèses jamais remises en question.",
  "Je refuse les modèles d'entreprise copiés-collés — parce que chaque dirigeant poursuit une vie différente.",
];

const NE_PAS = [
  "Ni coaching, ni développement personnel.",
  "Aucune solution standardisée, aucune recette.",
  "Nous ne décidons jamais à votre place.",
  "Nous ne créons aucune dépendance au cabinet.",
];

export default function AProposPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-[520px] w-[520px] rounded-full opacity-70"
            style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
            aria-hidden
          />
          <Container>
            <div className="grid grid-cols-1 items-center gap-11 py-16 md:grid-cols-[1.05fr_0.95fr]">
              <div>
                <Eyebrow>À propos</Eyebrow>
                <h1 className="mt-4 max-w-[19ch] font-serif text-[32px] font-semibold leading-[1.15] sm:text-[42px] md:text-[48px]">
                  Une entreprise devrait servir la vie de son dirigeant.
                </h1>
                <p className="mt-11 max-w-[50ch] text-[17px] text-mut">
                  DULEME AND CIE aide les dirigeants à sécuriser les décisions
                  qui engagent durablement leur entreprise. Nous ne décidons
                  jamais à leur place — nous renforçons leur capacité à décider.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/discerner/reserver">Réserver 20 minutes →</ButtonLink>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-line shadow-lift">
                <img
                  src="/photos/tefery-warm.webp"
                  alt="Téféry, fondatrice de DULEME AND CIE"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* LE COMBAT */}
        <section className="bg-bord py-16 text-[#f2e9df]">
          <Container>
            <Eyebrow className="text-[#e0b48f]">Notre combat</Eyebrow>
            <p className="mt-6 font-serif text-[clamp(22px,3.4vw,36px)] font-medium leading-[1.25]">
              « Le plus grand gâchis n'est pas l'échec. C'est de quitter ce monde
              en laissant inexploité ce que l'on avait la capacité de
              construire. »
            </p>
            <p className="mt-6 max-w-prose text-[15px] text-[#d8c6bb]">
              Les organisations ne stagnent pas parce qu'elles manquent de
              solutions. Elles stagnent parce qu'elles consacrent leur énergie à
              résoudre les mauvais problèmes. Notre travail commence là : voir
              juste, pour décider juste.
            </p>
          </Container>
        </section>

        {/* CE QUE NOUS CROYONS */}
        <section className="border-t border-line py-16">
          <Container>
            <Eyebrow>Ce que nous croyons</Eyebrow>
            <Heading className="mt-3">Trois refus qui nous définissent.</Heading>
            <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
              {REFUS.map((r, i) => (
                <div key={i} className="border-t border-line pt-5">
                  <div className="font-mono text-[13px] text-brass">
                    0{i + 1}
                  </div>
                  <p className="mt-3 font-serif text-[19px] font-medium leading-snug">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* L'ENTREPRISE EST UN MOYEN */}
        <section className="border-t border-line bg-paper2 py-16">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Eyebrow>Notre conviction</Eyebrow>
                <p className="mt-5 font-serif text-[clamp(22px,3vw,32px)] font-medium leading-snug text-accent">
                  Votre entreprise est-elle au service de votre vie&nbsp;? Ou
                  votre vie au service de votre entreprise&nbsp;?
                </p>
                <p className="mt-5 max-w-prose text-[15px] text-mut">
                  Une entreprise n'est jamais une finalité. C'est un moyen de
                  construire la vie que l'on veut vivre — le temps, les
                  relations, la santé, les projets. L'argent est un moyen.
                  L'entreprise aussi. Ce qui compte, c'est ce qu'ils rendent
                  possible.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border border-line shadow-card">
                <img
                  src="/photos/tefery-reflexion.webp"
                  alt="Téféry en pleine réflexion"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* CE QUE NOUS NE FAISONS PAS */}
        <section className="border-t border-line py-16">
          <Container>
            <Eyebrow>Pour être clair</Eyebrow>
            <Heading size="md" className="mt-3">
              Ce que DULEME ne fait pas.
            </Heading>
            <ul className="mt-8 grid list-none gap-4 md:grid-cols-2">
              {NE_PAS.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[15.5px]">
                  <span
                    className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-bord"
                    aria-hidden
                  />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-prose text-[15px] text-mut">
              Nous travaillons uniquement sur ce qui compte&nbsp;: les décisions,
              les systèmes, les hypothèses, les arbitrages et leurs conséquences.
            </p>
          </Container>
        </section>

        {/* TÉFÉRY */}
        <section className="border-t border-line bg-paper2 py-16">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
              <div className="overflow-hidden rounded-lg border border-line shadow-lift">
                <img
                  src="/photos/tefery-bordeaux.webp"
                  alt="Téféry, fondatrice de DULEME AND CIE"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div>
                <Eyebrow>La fondatrice</Eyebrow>
                <Heading size="md" className="mt-3">
                  Téféry.
                </Heading>
                <p className="mt-4 max-w-prose text-[15.5px] text-mut">
                  Depuis la Martinique, Téféry accompagne les dirigeants sur les
                  décisions qui engagent durablement leur entreprise. Sa méthode
                  n'a rien d'un discours&nbsp;: poser les bonnes questions,
                  révéler les hypothèses, remettre chaque décision sur le bon
                  terrain.
                </p>
                <p className="mt-5 font-serif text-xl italic leading-snug text-accent">
                  « Je n'apporte pas de méthode miracle. J'apporte une manière de
                  poser les problèmes qui rend les décisions plus claires — et les
                  entreprises plus solides. »
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-bord-deep py-16 text-center text-[#f0e5da]">
          <Container>
            <h2 className="mx-auto max-w-[22ch] font-serif text-[clamp(24px,3.6vw,40px)] font-semibold leading-tight">
              Une décision importante mérite un autre regard.
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[#d8c6bb]">
              Un premier échange de 20 minutes. Vous en repartez avec une lecture
              plus claire de votre situation.
            </p>
            <ButtonLink href="/discerner/reserver" variant="inverse" className="mt-7">
              Réserver 20 minutes →
            </ButtonLink>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
