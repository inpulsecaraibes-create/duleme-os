import { NextResponse } from "next/server";
import { z } from "zod";
import { contactRequest, getDb, isDbConfigured } from "@duleme/database";
import { sendEmail } from "@duleme/connectors";

/** Notifie Téféry d'une nouvelle demande (via Brevo). Ne bloque jamais la requête. */
async function notifyNewRequest(d: {
  message: string;
  name: string;
  company: string;
  email: string;
  callbackRequested: boolean;
}) {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) return;
  try {
    await sendEmail({
      to: [{ email: to, name: "DULEME AND CIE" }],
      subject: `Nouvelle demande — ${d.name || d.email || "prospect"}`,
      replyTo: d.email ? { email: d.email, name: d.name || undefined } : undefined,
      htmlContent: `
        <h2>Nouvelle demande depuis le site</h2>
        <p><strong>Nom :</strong> ${esc(d.name) || "—"}<br/>
        <strong>Entreprise :</strong> ${esc(d.company) || "—"}<br/>
        <strong>Email :</strong> ${esc(d.email) || "—"}<br/>
        <strong>Rappel souhaité :</strong> ${d.callbackRequested ? "Oui" : "Non"}</p>
        <p><strong>Message :</strong></p>
        <blockquote>${esc(d.message).replace(/\n/g, "<br/>")}</blockquote>
      `,
    });
  } catch (e) {
    console.error("[contact] notification Brevo échouée (ignorée)", e);
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const payloadSchema = z.object({
  message: z.string().trim().min(1).max(5000),
  name: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(320).optional().or(z.literal("")),
  callbackRequested: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  let data: z.infer<typeof payloadSchema>;
  try {
    data = payloadSchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  const email = typeof data.email === "string" ? data.email : "";

  // Dégradé : pas de base configurée (dev) — on ne bloque pas l'expérience.
  if (!isDbConfigured()) {
    console.warn(
      "[contact] DATABASE_URL absent — demande non persistée (dev).",
    );
    await notifyNewRequest({ ...data, email });
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    await getDb()
      .insert(contactRequest)
      .values({
        message: data.message,
        name: data.name || null,
        company: data.company || null,
        email: email || null,
        callbackRequested: data.callbackRequested,
      });
    await notifyNewRequest({ ...data, email });
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e) {
    console.error("[contact] échec d'insertion", e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}
