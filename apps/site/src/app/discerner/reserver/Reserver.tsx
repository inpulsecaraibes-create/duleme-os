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
  const [confirmed, setConfirmed] = useState<{ when: string; meet: string | null } | null>(
    null,
  );
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
        meet: res.meetLink,
      });
    } finally {
      setBusy(false);
    }
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
        <div className="mx-auto h-0.5 w-11 bg-brass" />
        <h1 className="mt-6 font-serif text-[28px] font-semibold text-accent">
          C'est confirmé.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink/80">
          Votre échange de 20 minutes avec Téféry est réservé pour le{" "}
          <strong>{confirmed.when}</strong>. Vous recevez l'invitation par email et
          dans votre agenda.
        </p>
        {confirmed.meet && (
          <a
            href={confirmed.meet}
            className="mt-6 inline-block rounded-md border border-line px-5 py-2.5 text-[13px] font-medium text-accent hover:border-bord"
          >
            Lien Google Meet ↗
          </a>
        )}
        <p className="mt-8 font-serif text-lg italic text-mut">À très vite. — Téféry</p>
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
        20 minutes, de vive voix, avec Téféry. Nous ferons le tri entre vos symptômes
        et votre vrai problème racine.
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
