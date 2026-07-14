import { NextResponse } from "next/server";
import { and, eq, getDb, gt, isDbConfigured, premierRegard } from "@duleme/database";
import { sendEmail } from "@duleme/connectors";
import { reminderContent, scheduleVeilleAnd1h } from "@/lib/reminders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Rappels de RDV. Exécuté 1×/jour (Vercel Cron).
 *  - J-7 : envoyé immédiatement quand le RDV est à ~7 jours.
 *  - Veille + 1h : programmés via Brevo dès que le RDV entre dans la fenêtre 72h.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) return NextResponse.json({ ok: true, done: 0 });

  const now = Date.now();
  const rows = await getDb()
    .select()
    .from(premierRegard)
    .where(and(eq(premierRegard.status, "rdv"), gt(premierRegard.bookedAt, new Date())));

  let done = 0;
  for (const r of rows) {
    if (!r.bookedAt || !r.email) continue;
    const bookedAt = new Date(r.bookedAt);
    const h = (bookedAt.getTime() - now) / 3600000;
    const tags = new Set((r.reminders || "").split(",").filter(Boolean));
    const firstName = r.firstName || "";

    // J-7 (fenêtre 6-7 jours)
    if (!tags.has("j7") && h <= 168 && h >= 144) {
      const { subject, html } = reminderContent("j7", firstName, bookedAt, r.meetLink);
      try {
        await sendEmail({ to: [{ email: r.email, name: firstName }], subject, htmlContent: html });
        tags.add("j7");
        done++;
      } catch (e) {
        console.error("[cron/reminders] J-7 échoué", e);
      }
    }

    // Veille + 1h : programmés dès l'entrée dans les 72h
    if (!tags.has("scheduled") && h <= 72) {
      await scheduleVeilleAnd1h(r.email, firstName, bookedAt, r.meetLink);
      tags.add("scheduled");
      done++;
    }

    if ((r.reminders || "") !== [...tags].join(",")) {
      try {
        await getDb()
          .update(premierRegard)
          .set({ reminders: [...tags].join(","), updatedAt: new Date() })
          .where(eq(premierRegard.id, r.id));
      } catch {
        /* ignore */
      }
    }
  }
  return NextResponse.json({ ok: true, done });
}
