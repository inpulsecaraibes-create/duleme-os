import { NextResponse } from "next/server";
import { createClientToken } from "@duleme/auth";
import {
  and,
  client,
  eq,
  getDb,
  isDbConfigured,
  isNull,
  lte,
  survey,
} from "@duleme/database";
import { sendEmail } from "@duleme/connectors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tâche planifiée (Vercel Cron, 1×/jour) : relance par email les questionnaires
 * de témoignage arrivés à échéance et non répondus. Une seule relance par
 * questionnaire (champ `relancedAt`).
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) return NextResponse.json({ ok: true, sent: 0 });

  const origin = new URL(req.url).origin;
  const rows = await getDb()
    .select({
      id: survey.id,
      phase: survey.phase,
      clientId: survey.clientId,
      name: client.name,
      email: client.email,
    })
    .from(survey)
    .innerJoin(client, eq(survey.clientId, client.id))
    .where(
      and(
        isNull(survey.answeredAt),
        isNull(survey.relancedAt),
        lte(survey.dueAt, new Date()),
      ),
    );

  let sent = 0;
  for (const r of rows) {
    // On marque comme relancé quoi qu'il arrive (évite les boucles).
    await getDb()
      .update(survey)
      .set({ relancedAt: new Date() })
      .where(eq(survey.id, r.id));
    if (!r.email) continue;
    const link = `${origin}/espace/${createClientToken(r.clientId)}`;
    try {
      await sendEmail({
        to: [{ email: r.email, name: r.name }],
        subject: "Votre regard nous intéresse — DULEME AND CIE",
        htmlContent: `
          <p>Bonjour ${r.name.split(" ")[0]},</p>
          <p>Quelques minutes pour partager votre regard sur notre collaboration&nbsp;?
          Vos réponses nous aident à progresser — et, avec votre accord, à témoigner
          de véritables transformations.</p>
          <p><a href="${link}">Accéder à mon espace</a></p>
          <p>— Téféry, DULEME AND CIE</p>
        `,
      });
      sent++;
    } catch (e) {
      console.error("[cron/relances] envoi échoué (ignoré)", e);
    }
  }
  return NextResponse.json({ ok: true, sent });
}
