"use client";

import { useState } from "react";
import { bookSlot } from "./actions";

export function Reserver({
  slots,
  leadId,
  configured,
}: {
  slots: string[];
  leadId: string | null;
  configured: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    when: string;
    startISO: string;
    email: string;
  } | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const fmtDay = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(
      new Date(iso),
    );
  const fmtTime = (iso: string) =>
    new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  // regroupe par jour
  const byDay = new Map<string, string[]>();
  for (const s of slots) {
    const d = fmtDay(s);
    byDay.set(d, [...(byDay.get(d) ?? []), s]);
  }

  async function pick(iso: string) {
    if (!leadId && !email) return;
    setBusy(true);
    try {
      const res = await bookSlot(leadId, iso, email || undefined, name || undefined);
      setConfirmed({
        when: new Intl.DateTimeFormat("fr-FR", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date(res.startISO)),
        startISO: res.startISO,
        email: res.email,
      });
    } finally {
      setBusy(false);
    }
  }

  if (confirmed) {
    const start = new Date(confirmed.startISO);
    const end = new Date(start.getTime() + 20 * 60000);
    const g = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Échange DISCERNER™ (20 min) — Téféry",
    )}&dates=${g(start)}/${g(end)}&details=${encodeURIComponent(
      "Votre échange de 20 minutes avec Téféry Duleme.",
    )}`;
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <div className="mx-auto h-0.5 w-11 bg-brass" />
        <h1 className="mt-6 font-serif text-[30px] font-semibold text-accent">
          C'est confirmé.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink/80">
          Votre échange est réservé pour le <strong>{confirmed.when}</strong>. Vous
          recevrez dans quelques instants un e-mail de confirmation contenant toutes
          les informations nécessaires.
        </p>
        <div className="mt-5">
          <a
            href={gcalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-md border border-line px-5 py-2.5 text-[13px] font-medium text-accent transition-colors hover:border-bord"
          >
            Ajouter à mon agenda
          </a>
        </div>

        <p className="mt-10 text-[15px] text-mut">
          D'ici là, vous pouvez poursuivre la réflexion en découvrant les ressources
          publiées par Téféry.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          {subscribed ? (
            <p className="text-[14px] text-ok">
              Merci — vous recevrez les réflexions de Téféry.
            </p>
          ) : (
            <button
              type="button"
              onClick={async () => {
                try {
                  await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ email: confirmed.email }),
                  });
                } catch {
                  /* dégradable */
                }
                setSubscribed(true);
              }}
              className="rounded-md bg-bord px-6 py-3 text-[14px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
            >
              Recevoir les réflexions de Téféry
            </button>
          )}
          <a
            href="https://dulemeandcie.com"
            className="text-[13.5px] text-mut underline-offset-2 transition-colors hover:text-accent"
          >
            Découvrir DULEME AND CIE →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[620px] px-6 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
        Échange confidentiel · 20 minutes
      </p>
      <h1 className="mt-3 font-serif text-[28px] font-semibold sm:text-[34px]">
        Choisissez votre créneau
      </h1>
      <p className="mt-3 text-[15px] text-mut">
        Un premier échange confidentiel, de vive voix, avec Téféry. Nous verrons
        ensemble si le sujet qui vous préoccupe mérite d'être approfondi — et si
        DISCERNER™ est la bonne étape pour vous.
      </p>

      {!leadId && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="rounded-lg border border-line bg-paper2 p-3 text-[15px]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="rounded-lg border border-line bg-paper2 p-3 text-[15px]"
          />
        </div>
      )}

      {!configured || slots.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-line bg-card p-6 text-[14px] text-mut">
          {configured
            ? "Aucun créneau disponible pour l'instant. Écrivez-nous à "
            : "La réservation en ligne arrive très bientôt. En attendant, écrivez-nous à "}
          <a href="mailto:dulemeandcie@hotmail.com" className="text-accent underline">
            dulemeandcie@hotmail.com
          </a>
          .
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {[...byDay.entries()].map(([day, isos]) => (
            <div key={day}>
              <p className="text-[13px] font-semibold capitalize text-ink">{day}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {isos.map((iso) => (
                  <button
                    key={iso}
                    type="button"
                    disabled={busy || (!leadId && !email)}
                    onClick={() => pick(iso)}
                    className="rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] font-medium transition-colors hover:border-bord hover:text-accent disabled:opacity-50"
                  >
                    {fmtTime(iso)}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[12px] text-mut">Horaires affichés dans votre fuseau.</p>
        </div>
      )}
    </div>
  );
}
