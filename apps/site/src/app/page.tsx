/* eslint-disable @next/next/no-img-element */
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Stories } from "./components/Stories";
import { Contact } from "./components/Contact";

const STATS = [
  { n: "1 000+", l: "entrepreneurs accompagnés" },
  { n: "30+", l: "ateliers animés en Martinique" },
  { n: "60+", l: "dirigeants suivis en 2026" },
  { n: "10 ans", l: "d'expérience" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* 1 — POURQUOI RESTER */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-20 -top-28 h-[520px] w-[520px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-11 px-7 py-16 md:grid-cols-[1.06fr_0.94fr]">
          <div>
            <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
              Cabinet de la décision stratégique
            </p>
            <h1 className="mt-4 max-w-[15ch] font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-[60px]">
              Vous prenez peut-être les bonnes décisions.{" "}
              <span className="text-accent">À partir du mauvais problème.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[15px] text-mut sm:text-[17px]">
              Vous avez déjà construit beaucoup — souvent seul, souvent sous
              pression. Parfois, une décision résiste. Non par manque de
              solutions, mais parce que la vraie question n&apos;a pas encore été
              posée. Nous la regardons <em>avec</em> vous. Un autre angle, jamais
              un jugement.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="rounded-md bg-bord px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-bord-deep"
              >
                Parlons de votre décision →
              </a>
              <a
                href="#stories"
                className="border-b border-brass pb-1 text-[13px] font-medium text-ink"
              >
                Lire leurs histoires →
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-line shadow-lift">
            <img
              src="/photos/photo-5.webp"
              alt="Téféry, fondatrice de DULEME AND CIE, en pleine réflexion"
              className="aspect-[5/6] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2 — POURQUOI CROIRE */}
      <section id="stories" className="border-t border-line bg-paper2 py-16">
        <div className="mx-auto max-w-[1160px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Pourquoi nous faire confiance
          </p>
          <h2 className="mt-3 max-w-[20ch] font-serif text-[26px] font-semibold leading-tight sm:text-[40px]">
            Ils en parlent mieux que moi.
          </h2>
          <p className="mt-4 max-w-[56ch] text-base text-mut">
            Des dirigeants qui avaient déjà beaucoup accompli. Il leur manquait,
            un instant, un autre regard sur leur situation.
          </p>

          <Stories />

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="border-t border-line pt-4">
                <div className="font-serif text-[30px] font-semibold leading-none text-accent tabular-nums sm:text-[44px]">
                  {s.n}
                </div>
                <div className="mt-2 text-[12.5px] leading-snug text-mut">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — POURQUOI AGIR */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-line py-16"
      >
        <div
          className="pointer-events-none absolute -bottom-36 -left-24 h-[480px] w-[480px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgb(var(--glow)), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[720px] px-7">
          <div className="mb-6 h-0.5 w-11 bg-brass" />
          <p className="text-xs font-light uppercase tracking-[0.22em] text-accent">
            Parlons-en
          </p>
          <h2 className="mt-3 max-w-[20ch] font-serif text-[26px] font-semibold leading-tight sm:text-[40px]">
            Et si votre prochaine décision vous rendait un peu de liberté&nbsp;?
          </h2>
          <p className="mt-3.5 font-serif text-lg italic text-accent sm:text-xl">
            Une bonne décision, ce n&apos;est pas seulement un problème résolu.
            C&apos;est de l&apos;élan retrouvé.
          </p>
          <Contact />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
