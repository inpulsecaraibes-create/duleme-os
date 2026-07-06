/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, Heading } from "@duleme/ui";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Newsletter } from "@/components/Newsletter";
import { JsonLd } from "@/components/JsonLd";
import { blogLd, faqLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Le Faux Dilemme™ — Le média des décisions",
  description:
    "Le média des dirigeants qui préfèrent poser la bonne question plutôt que courir après la mauvaise réponse. Apprendre à repérer la fausse alternative pour décider sur le bon terrain.",
  openGraph: {
    title: "Le Faux Dilemme™ — Le média des décisions",
    description:
      "Recruter ou attendre ? Grossir ou tenir ? La plupart des décisions difficiles cachent une fausse alternative. Le vrai choix est ailleurs.",
  },
  alternates: { canonical: "/le-faux-dilemme" },
};

const EDITIONS: {
  cat: string;
  title: string;
  resume: string;
  min: string;
}[] = [
  {
    cat: "Gouvernance",
    title: "Quand l'urgence remplace l'arbitrage",
    resume: "Ce que révèle un comité qui décide vite, et mal.",
    min: "6 min",
  },
  {
    cat: "Croissance",
    title: "Grossir ou tenir : le faux dilemme",
    resume: "Le vrai problème est rarement celui que l'on pose.",
    min: "7 min",
  },
  {
    cat: "Décision",
    title: "Ce que révèle une décision reportée",
    resume: "Reporter est déjà une décision. Rarement la bonne.",
    min: "5 min",
  },
  {
    cat: "Organisation",
    title: "Recruter, ou repenser l'organisation ?",
    resume: "Ajouter des personnes à un système confus déplace la tension.",
    min: "6 min",
  },
  {
    cat: "Le dirigeant",
    title: "Le jour où votre entreprise a cessé de vous servir",
    resume: "Une entreprise est un moyen, jamais une finalité.",
    min: "8 min",
  },
  {
    cat: "Valeur",
    title: "Baisser les prix, ou tenir sa valeur ?",
    resume: "Ce que l'on fait payer n'est pas toujours ce que l'on croit.",
    min: "6 min",
  },
];

const FAQ = [
  {
    q: "Qu'est-ce qu'un faux dilemme ?",
    a: "Une alternative apparente — « recruter ou attendre ? », « grossir ou tenir ? » — qui masque la vraie question. Presque toujours, la bonne décision se trouve ailleurs que dans le choix binaire posé au départ.",
  },
  {
    q: "DULEME AND CIE fait-il du coaching ?",
    a: "Non. DULEME ne fait ni coaching, ni développement personnel, ni recettes toutes faites. Le travail porte uniquement sur les décisions, les systèmes, les hypothèses et les arbitrages.",
  },
  {
    q: "À qui s'adresse DULEME AND CIE ?",
    a: "Aux dirigeants de PME qui portent seuls des décisions qui engagent durablement leur entreprise, et qui cherchent un regard extérieur rigoureux — pas un avis de plus.",
  },
  {
    q: "Comment se déroule un premier échange ?",
    a: "Un échange d'une heure pour poser la vraie question de votre situation. Vous en repartez avec une lecture plus claire, que nous travaillions ensemble ensuite ou non.",
  },
];

export default function FauxDilemmePage() {
  return (
    <>
      <SiteHeader />
      <JsonLd data={blogLd} />
      <JsonLd data={faqLd(FAQ)} />
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
                <Eyebrow>Le média de DULEME AND CIE</Eyebrow>
                <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl md:text-[58px]">
                  Le Faux Dilemme<span className="align-super text-[0.4em]">™</span>
                </h1>
                <p className="mt-5 max-w-[48ch] text-[17px] text-mut">
                  Le média des dirigeants qui préfèrent poser la bonne question
                  plutôt que courir après la mauvaise réponse. Pas des recettes —
                  des façons de penser.
                </p>
                <div className="mt-7">
                  <a
                    href="#sommaire"
                    className="border-b border-brass pb-1 text-[13px] font-medium text-ink"
                  >
                    Découvrir les éditions →
                  </a>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-line shadow-lift">
                <img
                  src="/photos/photo-3.webp"
                  alt="Téféry en échange avec un dirigeant"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* CONCEPT */}
        <section className="border-t border-line bg-paper2 py-16">
          <Container>
            <div className="mb-6 h-0.5 w-11 bg-brass" />
            <Eyebrow>Qu'est-ce qu'un faux dilemme&nbsp;?</Eyebrow>
            <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1fr]">
              <p className="font-serif text-2xl font-medium leading-snug text-ink sm:text-[28px]">
                « Recruter ou attendre&nbsp;? » « Grossir ou tenir&nbsp;? »
                « Baisser les prix ou perdre le client&nbsp;? »
              </p>
              <p className="text-[15.5px] leading-relaxed text-mut">
                La plupart des décisions difficiles se présentent comme un choix
                entre deux options. Presque toujours, la vraie question est
                ailleurs. Le Faux Dilemme™, c'est apprendre à repérer la fausse
                alternative — pour décider sur le bon terrain, plutôt que de bien
                répondre à la mauvaise question.
              </p>
            </div>
          </Container>
        </section>

        {/* PULL-QUOTE (Constitution) */}
        <section className="bg-bord py-16 text-[#f2e9df]">
          <Container>
            <p className="font-serif text-[clamp(22px,3.4vw,36px)] font-medium leading-[1.25]">
              « Les organisations ne stagnent pas parce qu'elles manquent de
              solutions. Elles stagnent parce qu'elles consacrent leur énergie à
              résoudre les mauvais problèmes. »
            </p>
            <p className="mt-6 font-sans text-[12px] uppercase tracking-[0.16em] text-[#e0b48f]">
              La Constitution DULEME
            </p>
          </Container>
        </section>

        {/* ÉDITIONS */}
        <section id="sommaire" className="border-t border-line py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Au sommaire</Eyebrow>
                <Heading className="mt-3">Ce que le média explore.</Heading>
              </div>
              <span className="rounded-full border border-line px-3 py-1 font-sans text-[11px] uppercase tracking-wide text-mut">
                Premières éditions à paraître
              </span>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {EDITIONS.map((e) => (
                <article key={e.title} className="border-t border-line pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-brass">
                    {e.cat}
                  </div>
                  <h3 className="mt-2.5 font-serif text-[19px] font-semibold leading-snug">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mut">
                    {e.resume}
                  </p>
                  <div className="mt-3 font-sans text-[11px] text-mut">
                    {e.min} de lecture · à paraître
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* LA PENSÉE VIVANTE */}
        <section className="border-t border-line bg-paper2 py-16">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
              <div>
                <Eyebrow>La pensée, vivante</Eyebrow>
                <Heading size="md" className="mt-3">
                  Une pensée qui se partage en salle, autant que sur le papier.
                </Heading>
                <p className="mt-4 max-w-prose text-[15px] text-mut">
                  Conférences, ateliers, rencontres : Le Faux Dilemme™ se vit
                  aussi en public — là où les dirigeants confrontent leurs
                  décisions, rient de leurs certitudes, et repartent avec une
                  question neuve.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/photos/photo-2.webp"
                  alt="Téféry en conférence, dans le public"
                  className="h-56 w-full rounded-lg border border-line object-cover"
                />
                <img
                  src="/photos/photo-1.webp"
                  alt="Téféry en échange avec deux dirigeantes"
                  className="h-56 w-full rounded-lg border border-line object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* AUTEURE */}
        <section className="border-t border-line py-16">
          <Container>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <img
                src="/photos/photo-4.webp"
                alt="Téféry, fondatrice de DULEME AND CIE"
                className="h-20 w-20 shrink-0 rounded-full border border-line object-cover"
              />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
                  La voix du média
                </p>
                <p className="mt-2 max-w-prose font-serif text-xl leading-snug">
                  « Je n'écris pas pour donner des réponses. J'écris pour aider
                  les dirigeants à mieux poser leurs problèmes. »
                </p>
                <p className="mt-3 font-sans text-[13px] text-mut">
                  Téféry — fondatrice de DULEME AND CIE
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* NEWSLETTER */}
        <section className="border-t border-line bg-paper2 py-16">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Ne rien manquer</Eyebrow>
              <Heading size="md" className="mt-3">
                Un faux dilemme démonté, chaque mois.
              </Heading>
              <p className="mt-4 text-[15px] text-mut">
                Recevez Le Faux Dilemme™ : une décision, une idée, une question
                qui change la manière de voir. Directement par email.
              </p>
              <Newsletter />
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-t border-line py-16">
          <Container>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="font-serif text-lg font-semibold">{f.q}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-mut">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-bord py-16 text-center text-[#f0e5da]">
          <Container>
            <h2 className="mx-auto max-w-[22ch] font-serif text-[clamp(24px,3.6vw,40px)] font-semibold leading-tight">
              Vous vivez peut-être un faux dilemme en ce moment.
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[#d8c6bb]">
              Un premier échange d'une heure suffit souvent à déplacer la
              question.
            </p>
            <ButtonLink
              href="/#contact"
              className="mt-7 bg-paper text-bord hover:bg-paper2"
            >
              Parlons de votre décision →
            </ButtonLink>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
