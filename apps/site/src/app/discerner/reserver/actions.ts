"use server";

import { eq, getDb, isDbConfigured, premierRegard } from "@duleme/database";
import {
  createEventWithMeet,
  isGoogleConfigured,
  listBusy,
  sendEmail,
} from "@duleme/connectors";

const SLOT_MIN = 20;
const HOURS_UTC = [13, 14, 15, 16]; // ~14-17h Paris / ~9-12h Martinique
const HORIZON_DAYS = 14;

/** Prochains créneaux de 20 min libres sur l'agenda (UTC ISO). */
export async function getSlots(): Promise<string[]> {
  if (!isGoogleConfigured()) return [];
  const now = Date.now();
  const bufferStart = now + 3 * 3600 * 1000; // au moins 3h à l'avance
  const horizonEnd = new Date(now + HORIZON_DAYS * 86400000);
  let busy: { start: string; end: string }[] = [];
  try {
    busy = await listBusy(new Date(bufferStart).toISOString(), horizonEnd.toISOString());
  } catch {
    busy = [];
  }
  const free = (s: Date, e: Date) =>
    !busy.some((b) => new Date(b.start) < e && s < new Date(b.end));

  const slots: string[] = [];
  for (let d = 0; d < HORIZON_DAYS && slots.length < 9; d++) {
    const day = new Date(now + d * 86400000);
    const dow = day.getUTCDay();
    if (dow === 0 || dow === 6) continue; // week-end
    for (const h of HOURS_UTC) {
      const s = new Date(
        Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), h, 0, 0),
      );
      const e = new Date(s.getTime() + SLOT_MIN * 60000);
      if (s.getTime() < bufferStart) continue;
      if (free(s, e)) slots.push(s.toISOString());
      if (slots.length >= 9) break;
    }
  }
  return slots;
}

/** Réserve un créneau : crée l'événement Agenda + Meet et met à jour le lead. */
export async function bookSlot(
  leadId: string | null,
  startISO: string,
  fallbackEmail?: string,
  fallbackName?: string,
): Promise<{ ok: boolean; meetLink: string | null; startISO: string }> {
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

  let meetLink: string | null = null;
  if (isGoogleConfigured()) {
    try {
      const ev = await createEventWithMeet({
        summary: `Échange DISCERNER™ (20 min) — ${name || email}`,
        description: `Diagnostic Premier Regard™.\n${context}`,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        attendees: email ? [email] : [],
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

  // Confirmation (Brevo) — en plus de l'invitation Google.
  const when = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
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
          <p>Votre échange de 20 minutes est confirmé pour le <strong>${when}</strong> (heure de Paris).</p>
          ${meetLink ? `<p>Lien Google Meet : <a href="${meetLink}">${meetLink}</a></p>` : ""}
          <p>Vous recevez aussi l'invitation dans votre agenda. À très vite,<br/>Téféry</p>`,
      });
    } catch {
      /* ignore */
    }
  }

  return { ok: true, meetLink, startISO: start.toISOString() };
}
