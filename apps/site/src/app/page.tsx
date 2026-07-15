/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CASES } from "@/content/cases";
import { Contact } from "./components/Contact";

const STATS = [
  { n: "1 000+", l: "entrepreneurs accompagnés" },
  { n: "30+", l: "ateliers animés en Martinique" },
  { n: "60+", l: "dirigeants suivis en 2026" },
  { n: "10 ans", l: "d'expérience" },
];

const AUTRES: { qui: string; ce: string }[] = [
  {
    qui: "Le consultant",
    ce: "Un diagnostic, un rapport de 40 pages… et une solution qui répond à la question de départ — sans jamais la vérifier.",
  },
  {
    qui: "Le coach",
    ce: "Il travaille sur vous. Utile — mais la décision, elle, reste entière sur vos épaules.",
  },
  {
    qui: "L'agence",
    ce: "Elle vend une solution — com', publicité, site — avant même de savoir si le problème est vraiment là.",
  },
  {
    qui: "Porter seul",
    ce: "Vous tournez avec vos propres angles morts. Le conseil le plus coûteux est parfois celui qu'on se donne à soi-même.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* 1 — HERO : L'ENJEU */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-20 -top-28 h-[520px] w-[520px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-11 px-7 py-16 md:grid-cols-[1.06fr_0.94fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
              Cabinet de conseil stratégique · dirigeants de PME
            </p>
            <h1 className="mt-5 max-w-[24ch] font-serif text-[30px] font-semibold leading-[1.16] sm:text-[38px] md:text-[44px]">
              Quatre ans à construire votre entreprise.
              <br />
              <span className="text-accent">
                Et devant vous, les décisions qui vont décider de la suite.
              </span>
            </h1>
            <p className="mt-11 max-w-[54ch] text-[15px] leading-relaxed text-mut sm:text-[17px]">
              Structurer ou rester agile, investir ou consolider, recruter ou tenir encore
              seul. À ce stade, le risque n&apos;est pas de décider trop tard — c&apos;est de
              se tromper de décision. DULEME AND CIE accompagne les dirigeants sur ces
              décisions-là&nbsp;: celles qui engagent les années à venir.
            </p>
            <div className="mt-8 flex flex-col items-start gap-2.5">
              <Link
                href="/discerner/reserver"
                className="rounded-md bg-bord px-7 py-4 text-[15px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
              >
                Réserver 20 minutes →
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-mut">Confidentiel, sans engagement.</span>
                <Link
                  href="/discerner"
                  className="border-b border-brass pb-0.5 text-[13px] font-medium text-ink"
                >
                  Découvrir DISCERNER →
                </Link>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-line shadow-lift">
            <img
              src="/photos/tefery-noir.webp"
              alt="Téféry, fondatrice de DULEME AND CIE"
              className="aspect-[5/6] w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 2 — PREUVE : VERBATIM + CHIFFRES */}
      <section className="border-t border-line bg-paper2 py-14">
        <div className="mx-auto max-w-[1160px] px-7">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="font-serif text-[52px] leading-[0.6] text-brass" aria-hidden>
                &ldquo;
              </div>
              <p className="mt-2 font-serif text-[22px] font-medium leading-snug text-accent sm:text-[28px]">
                Elle a vu quelque chose que je ne voyais plus.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-mut">
                « J&apos;étais persuadé que mon problème était commercial. En quelques
                échanges, elle m&apos;a montré que je passais complètement à côté du vrai
                sujet. »
              </p>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-wide text-mut">
                Dirigeant de PME — témoignage anonymisé
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {STATS.map((s) => (
                <div key={s.l} className="border-t border-line pt-4">
                  <div className="font-serif text-[28px] font-semibold leading-none text-accent tabular-nums sm:text-[38px]">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[12.5px] leading-snug text-mut">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — NOTRE CONVICTION */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-[820px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Notre conviction
          </p>
          <h2 className="mt-4 max-w-[24ch] font-serif text-[26px] font-semibold leading-tight sm:text-[38px]">
            Une entreprise devrait servir la vie de son dirigeant — pas l&apos;inverse.
          </h2>
          <p className="mt-5 max-w-[60ch] text-[15.5px] leading-relaxed text-mut">
            Vous avez créé votre entreprise pour être plus libre, pas pour qu&apos;elle
            décide de votre vie. Mais quand une décision devient trop lourde à porter seul,
            elle finit par gouverner l&apos;entreprise — et celui qui la dirige. Notre
            métier&nbsp;: vous aider à retrouver la clarté nécessaire pour décider juste,
            là où l&apos;enjeu est le plus grand.
          </p>
        </div>
      </section>

      {/* 4 — CE QUE FONT LES AUTRES */}
      <section className="border-t border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[1000px] px-7">
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Pourquoi tant de décisions coûtent cher
          </p>
          <h2 className="mt-4 max-w-[26ch] font-serif text-[24px] font-semibold leading-tight sm:text-[34px]">
            Face à une décision lourde, la plupart agissent avant d&apos;avoir vu le vrai
            problème.
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {AUTRES.map((a) => (
              <div key={a.qui} className="border-t border-line pt-4">
                <p className="font-serif text-[18px] font-semibold text-ink">{a.qui}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-mut">{a.ce}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[60ch] font-serif text-[17px] font-medium leading-snug text-accent sm:text-[20px]">
            Le point commun&nbsp;? On agit avant d&apos;avoir vérifié le vrai problème.
            C&apos;est exactement là que DULEME commence.
          </p>
        </div>
      </section>

      {/* 5 — CAS RÉELS */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-[1000px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Ce qu&apos;ils ont compris
          </p>
          <h2 className="mt-4 max-w-[24ch] font-serif text-[24px] font-semibold leading-tight sm:text-[34px]">
            À chaque fois, le problème annoncé n&apos;était pas le vrai.
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
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
          <div className="mt-8">
            <Link
              href="/discerner"
              className="border-b border-brass pb-0.5 text-[14px] font-medium text-ink"
            >
              Voir comment se déroule une mission DISCERNER →
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — ÉCHANGER */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-line py-16"
      >
        <div
          className="pointer-events-none absolute -bottom-36 -left-24 h-[480px] w-[480px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[760px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Commençons
          </p>
          <Contact />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
