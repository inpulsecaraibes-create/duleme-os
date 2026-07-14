"use server";

import { eq, getDb, isDbConfigured, premierRegard } from "@duleme/database";
import {
  createEventWithMeet,
  isGoogleConfigured,
  listBusy,
  sendEmail,
} from "@duleme/connectors";

const SLOT_MIN = 20;
const STEP_MIN = 35; // 20 min d'échange + 15 min de battement
const BUFFER_MIN = 15; // battement autour des RDV existants
const MART_OFFSET = 4; // Martinique = UTC-4 (pas de changement d'heure)
const HORIZON_DAYS = 21;

// Fenêtres de disponibilité (heure de Martinique). 0=dim … 6=sam.
// Jamais mercredi (3), samedi (6), dimanche (0).
const WINDOWS: Record<number, [number, number][]> = {
  1: [[9, 12]], // lundi 9h-12h
  2: [[13, 15]], // mardi 13h-15h
  4: [[9, 15]], // jeudi 9h-15h
  5: [[14, 15]], // vendredi 14h-15h
};

function busyCalendars(): string[] {
  const extra = (process.env.GOOGLE_BUSY_CALENDARS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return ["primary", ...extra];
}

/** Prochains créneaux de 20 min libres, selon les fenêtres et les 2 agendas. */
export async function getSlots(): Promise<string[]> {
  if (!isGoogleConfigured()) return [];
  const now = Date.now();
  const bufferStart = now + 3 * 3600 * 1000; // au moins 3h à l'avance
  const horizonEnd = new Date(now + HORIZON_DAYS * 86400000);

  let busy: { start: string; end: string }[] = [];
  try {
    busy = await listBusy(
      new Date(bufferStart).toISOString(),
      horizonEnd.toISOString(),
      busyCalendars(),
    );
  } catch {
    busy = [];
  }
  const free = (s: Date, e: Date) =>
    !busy.some((b) => new Date(b.start) < e && s < new Date(b.end));

  const today = new Date();
  const slots: string[] = [];
  for (let d = 0; d < HORIZON_DAYS && slots.length < 12; d++) {
    const day = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + d),
    );
    const wins = WINDOWS[day.getUTCDay()];
    if (!wins) continue;
    for (const [h0, h1] of wins) {
      for (let m = h0 * 60; m + SLOT_MIN <= h1 * 60; m += STEP_MIN) {
        const s = new Date(
          Date.UTC(
            day.getUTCFullYear(),
            day.getUTCMonth(),
            day.getUTCDate(),
            Math.floor(m / 60) + MART_OFFSET,
            m % 60,
            0,
          ),
        );
        const e = new Date(s.getTime() + SLOT_MIN * 60000);
        if (s.getTime() < bufferStart) continue;
        const sBuf = new Date(s.getTime() - BUFFER_MIN * 60000);
        const eBuf = new Date(e.getTime() + BUFFER_MIN * 60000);
        if (free(sBuf, eBuf)) slots.push(s.toISOString());
        if (slots.length >= 12) break;
      }
      if (slots.length >= 12) break;
    }
  }
  return slots;
}

/** Réserve un créneau : événement Agenda + Meet (sur tes 2 agendas) + mise à jour du lead. */
export async function bookSlot(
  leadId: string | null,
  startISO: string,
  fallbackEmail?: string,
  fallbackName?: string,
): Promise<{ ok: boolean; meetLink: string | null; startISO: string; email: string }> {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + SLOT_MIN * 60000);

  let email = fallbackEmail || "";
  let name = fallbackName || "";
  let context = "";
  if (leadId && isDbConfigured()) {
    try {
      const [lead] = await getDb()
        .select()
        .from(premierRegard)
        .where(eq(premierRegard.id, leadId))
        .limit(1);
      if (lead) {
        email = lead.email || email;
        name = `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim() || name;
        context = `Situation : ${lead.situation}. « ${lead.openText ?? ""} »`;
      }
    } catch {
      /* ignore */
    }
  }

  const teferyCalendars = (process.env.GOOGLE_EXTRA_ATTENDEES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let meetLink: string | null = null;
  if (isGoogleConfigured()) {
    try {
      const ev = await createEventWithMeet({
        summary: `Échange DISCERNER™ (20 min) — ${name || email}`,
        description: `Diagnostic Premier Regard™.\n${context}`,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        attendees: [...(email ? [email] : []), ...teferyCalendars],
      });
      meetLink = ev?.meetLink ?? null;
    } catch (e) {
      console.error("[reserver] création événement échouée", e);
    }
  }

  if (leadId && isDbConfigured()) {
    try {
      await getDb()
        .update(premierRegard)
        .set({ bookedAt: start, meetLink, status: "rdv", updatedAt: new Date() })
        .where(eq(premierRegard.id, leadId));
    } catch {
      /* ignore */
    }
  }

  const when = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Martinique",
  }).format(start);
  if (email) {
    try {
      await sendEmail({
        to: [{ email, name }],
        cc: (process.env.NOTIFY_EMAIL || "")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
          .map((e) => ({ email: e })),
        subject: "Votre échange de 20 minutes avec Téféry est confirmé",
        htmlContent: `<p>Bonjour ${name.split(" ")[0] || ""},</p>
          <p>Votre échange de 20 minutes est confirmé pour le <strong>${when}</strong>.</p>
          ${meetLink ? `<p>Lien Google Meet : <a href="${meetLink}">${meetLink}</a></p>` : ""}
          <p>Vous recevrez des rappels une semaine avant, la veille, et une heure avant. À très vite,<br/>Téféry</p>`,
      });
    } catch {
      /* ignore */
    }
  }

  return { ok: true, meetLink, startISO: start.toISOString(), email };
}
