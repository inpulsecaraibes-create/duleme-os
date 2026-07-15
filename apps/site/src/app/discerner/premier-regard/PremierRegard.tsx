"use client";

import { useEffect, useState } from "react";
import {
  CAPTURE_MESSAGE,
  CTA_BUTTON,
  CTA_HEADLINE,
  CTA_TEXT,
  END_EYEBROW,
  END_INTRO,
  INTRO_TEXT,
  INTRO_TITLE,
  METIERS,
  OPEN_QUESTION,
  PR_HEADER,
  REMUNERATION_RANGES,
  REVENUE_RANGES,
  SITUATIONS,
  situationById,
} from "@/content/premier-regard";
import { submitPremierRegard } from "./actions";

function Reveal({ k, children }: { k: string | number; children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, [k]);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-paper2 p-3.5 text-[15px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";

export function PremierRegard({ bookingBase }: { bookingBase: string }) {
  const [step, setStep] = useState(0);
  const [metier, setMetier] = useState("");
  const [autreSelected, setAutreSelected] = useState(false);
  const [autreText, setAutreText] = useState("");
  const [situationId, setSituationId] = useState("");
  const [q, setQ] = useState<string[]>(["", "", ""]);
  const [revenue, setRevenue] = useState("");
  const [remuneration, setRemuneration] = useState("");
  const [openText, setOpenText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const situation = situationById(situationId);
  const go = (n: number) => setStep(n);
  const setAnswer = (i: number, v: string) =>
    setQ((prev) => prev.map((x, j) => (j === i ? v : x)));

  // 12 étapes : 0 intro · 1 métier · 2 situation · 3 histoire · 4-6 questions · 7 CA · 8 rému · 9 verbatim · 10 coords · 11 fin
  const TOTAL = 11;
  const progress = Math.min(step / TOTAL, 1);

  async function submit() {
    if (!firstName || !email || !situation) return;
    setBusy(true);
    try {
      const res = await submitPremierRegard({
        metier,
        situation: situationId,
        q1: q[0],
        q2: q[1],
        q3: q[2],
        revenueRange: revenue,
        remunerationRange: remuneration,
        openText,
        firstName,
        lastName,
        email,
      });
      setLeadId(res.id);
    } catch {
      /* dégradable */
    } finally {
      setBusy(false);
      go(11);
    }
  }

  const ChoiceList = ({
    value,
    choices,
    onPick,
  }: {
    value: string;
    choices: string[];
    onPick: (c: string) => void;
  }) => (
    <div className="mt-8 flex flex-col gap-2.5">
      {choices.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onPick(c)}
          className={`rounded-lg border px-5 py-4 text-left text-[15px] transition-all hover:-translate-y-0.5 hover:border-bord hover:shadow-soft ${
            value === c ? "border-bord bg-bord/5 text-accent" : "border-line bg-paper"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-[660px] flex-col px-6 py-10">
      {/* progression discrète */}
      <div className="h-0.5 w-full overflow-hidden rounded bg-line/60">
        <div
          className="h-full bg-brass transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        {/* 0 — INTRO */}
        {step === 0 && (
          <Reveal k="intro">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              Le Premier Regard
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold">{INTRO_TITLE}</h1>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-relaxed text-ink/85">
              {INTRO_TEXT}
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              className="mt-8 rounded-md bg-bord px-7 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
            >
              On commence ?
            </button>
          </Reveal>
        )}

        {/* 1 — MÉTIER */}
        {step === 1 && (
          <Reveal k="metier">
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              Pour mieux situer votre réalité, dans quelle catégorie vous
              reconnaissez-vous le plus ?
            </h2>
            <div className="mt-8 flex flex-col gap-2.5">
              {METIERS.map((m) => {
                const isAutre = m.label.startsWith("Autre");
                const selected = isAutre ? autreSelected : metier === m.label;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => {
                      if (isAutre) {
                        setAutreSelected(true);
                        setMetier("");
                      } else {
                        setAutreSelected(false);
                        setMetier(m.label);
                        go(2);
                      }
                    }}
                    className={`rounded-lg border px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-bord hover:shadow-soft ${
                      selected ? "border-bord bg-bord/5" : "border-line bg-paper"
                    }`}
                  >
                    <span className="block text-[15px] font-medium text-ink">
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] italic text-mut">
                      {m.desc}
                    </span>
                  </button>
                );
              })}
            </div>
            {autreSelected && (
              <div className="mt-4">
                <input
                  value={autreText}
                  onChange={(e) => setAutreText(e.target.value)}
                  autoFocus
                  placeholder="Votre activité, en quelques mots…"
                  className={inputCls}
                />
                <button
                  type="button"
                  disabled={autreText.trim().length < 2}
                  onClick={() => {
                    setMetier(`Autre : ${autreText.trim()}`);
                    go(2);
                  }}
                  className="mt-3 rounded-md bg-bord px-6 py-3 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep disabled:opacity-50"
                >
                  Continuer
                </button>
              </div>
            )}
          </Reveal>
        )}

        {/* 2 — SITUATION */}
        {step === 2 && (
          <Reveal k="situation">
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              Aujourd'hui, qu'est-ce qui occupe le plus votre esprit ?
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SITUATIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSituationId(s.id);
                    setQ(["", "", ""]);
                    go(3);
                  }}
                  className="rounded-lg border border-line bg-paper p-4 text-left transition-all hover:-translate-y-0.5 hover:border-bord hover:shadow-soft"
                >
                  <span className="font-serif text-lg font-semibold text-ink">
                    {s.label}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-mut">
                    {s.hint}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* 3 — HISTOIRE */}
        {step === 3 && situation && (
          <Reveal k={`hist-${situation.id}`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              {situation.label}
            </p>
            <p className="mt-5 font-serif text-[22px] leading-relaxed text-ink/90 sm:text-[26px]">
              {situation.histoire}
            </p>
            <button
              type="button"
              onClick={() => go(4)}
              className="mt-8 rounded-md bg-bord px-7 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
            >
              Continuer
            </button>
          </Reveal>
        )}

        {/* 4-6 — LES 3 QUESTIONS */}
        {step >= 4 && step <= 6 && situation && (
          <Reveal k={`q-${step}`}>
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              {situation.questions[step - 4].q}
            </h2>
            <ChoiceList
              value={q[step - 4]}
              choices={situation.questions[step - 4].choices}
              onPick={(c) => {
                setAnswer(step - 4, c);
                go(step + 1);
              }}
            />
          </Reveal>
        )}

        {/* 7 — CA */}
        {step === 7 && (
          <Reveal k="ca">
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              Où en est votre chiffre d'affaires annuel ?
            </h2>
            <ChoiceList
              value={revenue}
              choices={REVENUE_RANGES}
              onPick={(c) => {
                setRevenue(c);
                go(8);
              }}
            />
          </Reveal>
        )}

        {/* 8 — RÉMUNÉRATION */}
        {step === 8 && (
          <Reveal k="rem">
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              Et vous, comment vous rémunérez-vous aujourd'hui ?
            </h2>
            <ChoiceList
              value={remuneration}
              choices={REMUNERATION_RANGES}
              onPick={(c) => {
                setRemuneration(c);
                go(9);
              }}
            />
          </Reveal>
        )}

        {/* 9 — VERBATIM */}
        {step === 9 && (
          <Reveal k="open">
            <h2 className="font-serif text-[22px] font-semibold leading-snug sm:text-[26px]">
              {OPEN_QUESTION}
            </h2>
            <textarea
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              rows={6}
              autoFocus
              placeholder="Écrivez librement, avec vos mots. C'est ce que je lirai le plus attentivement."
              className={`mt-6 resize-y ${inputCls}`}
            />
            <button
              type="button"
              disabled={openText.trim().length < 3}
              onClick={() => go(10)}
              className="mt-6 rounded-md bg-bord px-7 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep disabled:opacity-50"
            >
              Continuer
            </button>
          </Reveal>
        )}

        {/* 10 — COORDONNÉES */}
        {step === 10 && (
          <Reveal k="coords">
            <h2 className="font-serif text-2xl font-semibold sm:text-[28px]">
              Où puis-je vous adresser votre Premier Regard ?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-mut">
              {CAPTURE_MESSAGE}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                className={inputCls}
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                className={inputCls}
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email professionnel"
              className={`mt-3 ${inputCls}`}
            />
            <button
              type="button"
              disabled={busy || !firstName || !email}
              onClick={submit}
              className="mt-6 rounded-md bg-bord px-7 py-3.5 text-sm font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep disabled:opacity-50"
            >
              {busy ? "Un instant…" : "Découvrir mon Premier Regard"}
            </button>
            <p className="mt-3 text-[12px] text-mut">
              Confidentiel. Aucune prospection — un seul regard : le mien.
            </p>
          </Reveal>
        )}

        {/* 11 — FIN : PISTES + RÉSERVATION */}
        {step === 11 && situation && (
          <Reveal k="fin">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
              {END_EYEBROW}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-[30px]">
              {firstName ? `${firstName}, ` : ""}au vu de vos réponses…
            </h2>
            <p className="mt-3 text-[15px] text-mut">{END_INTRO}</p>

            <div className="mt-7 flex flex-col gap-4">
              {situation.pistes.map((p, i) => (
                <div
                  key={p.titre}
                  className="rounded-lg border border-line bg-card p-5 shadow-soft"
                >
                  <p className="font-serif text-lg font-semibold text-accent">
                    Hypothèse n°{i + 1} — {p.titre}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/85">
                    {p.hypothese}
                  </p>
                  <p className="mt-3 border-t border-line pt-3 text-[14.5px] font-medium italic text-accent">
                    {p.question}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-bord/30 bg-glow/25 p-6 text-center sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-accent sm:text-2xl">
                {CTA_HEADLINE}
              </h3>
              <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-ink/80">
                {CTA_TEXT}
              </p>
              <a
                href={`${bookingBase}${leadId ? `?id=${leadId}` : ""}`}
                className="mt-6 inline-block rounded-md bg-bord px-7 py-4 text-[15px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
              >
                🗓️ {CTA_BUTTON}
              </a>
            </div>

            <p className="mt-6 text-center text-[12px] text-mut">{PR_HEADER}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
