"use server";

import { revalidatePath } from "next/cache";
import { verifyClientToken } from "@duleme/auth";
import { client, eq, getDb, message } from "@duleme/database";
import { sendEmail } from "@duleme/connectors";

export async function sendClientMessage(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const clientId = verifyClientToken(token);
  if (!clientId || !body) return;

  await getDb().insert(message).values({ clientId, sender: "client", body });

  // Notifie Téféry (Brevo). Dégradable : n'empêche jamais l'envoi du message.
  try {
    const [c] = await getDb()
      .select({ name: client.name, company: client.company })
      .from(client)
      .where(eq(client.id, clientId))
      .limit(1);
    const recipients = (process.env.NOTIFY_EMAIL || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length && c) {
      await sendEmail({
        to: recipients.map((email) => ({ email, name: "DULEME AND CIE" })),
        subject: `Message client — ${c.name}${c.company ? ` (${c.company})` : ""}`,
        htmlContent: `
          <h2>Nouveau message dans l'espace client</h2>
          <p><strong>${escapeHtml(c.name)}</strong> vous a écrit :</p>
          <blockquote>${escapeHtml(body).replace(/\n/g, "<br/>")}</blockquote>
          <p>Répondez depuis le back-office DULEME OS.</p>
        `,
      });
    }
  } catch (e) {
    console.error("[espace] notification message échouée (ignorée)", e);
  }

  revalidatePath(`/espace/${token}`);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
