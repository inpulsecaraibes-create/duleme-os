"use server";

import { revalidatePath } from "next/cache";
import { verifyClientToken } from "@duleme/auth";
import { and, client, eq, getDb, message, survey } from "@duleme/database";
import { sendEmail, uploadClientDocument, isGoogleConfigured } from "@duleme/connectors";
import { SURVEY_QUESTIONS, isSurveyPhase } from "./surveys";

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

/** Dépôt d'un document par le client → Google Drive + notification. */
export async function uploadDocument(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  const clientId = verifyClientToken(token);
  if (!clientId || !isGoogleConfigured()) return;
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const [c] = await getDb()
    .select({ name: client.name })
    .from(client)
    .where(eq(client.id, clientId))
    .limit(1);
  if (!c) return;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const res = await uploadClientDocument(
    c.name,
    file.name,
    file.type || "application/octet-stream",
    bytes,
  );
  if (!res) return;

  // Notifie Téféry (dégradable).
  try {
    const recipients = (process.env.NOTIFY_EMAIL || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (recipients.length) {
      await sendEmail({
        to: recipients.map((email) => ({ email, name: "DULEME AND CIE" })),
        subject: `Document transmis — ${c.name}`,
        htmlContent: `<p><strong>${escapeHtml(c.name)}</strong> a déposé un document : <strong>${escapeHtml(file.name)}</strong>.</p>${res.webViewLink ? `<p><a href="${res.webViewLink}">Ouvrir dans Drive</a></p>` : ""}`,
      });
    }
  } catch (e) {
    console.error("[upload] notification échouée (ignorée)", e);
  }
  revalidatePath(`/espace/${token}`);
}

export async function submitSurvey(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const surveyId = String(formData.get("surveyId") ?? "");
  const phase = String(formData.get("phase") ?? "");
  const clientId = verifyClientToken(token);
  if (!clientId || !surveyId || !isSurveyPhase(phase)) return;

  // Le questionnaire doit appartenir à ce client et ne pas être déjà répondu.
  const [row] = await getDb()
    .select()
    .from(survey)
    .where(and(eq(survey.id, surveyId), eq(survey.clientId, clientId)))
    .limit(1);
  if (!row || row.answeredAt) return;

  const questions = SURVEY_QUESTIONS[phase];
  const answers = questions.map((q, i) => ({
    q,
    a: String(formData.get(`a${i}`) ?? "").trim(),
  }));
  if (answers.every((x) => !x.a)) return; // rien rempli

  const consentPublish = formData.get("consent") === "on";
  const attribution = String(formData.get("attribution") ?? "").trim() || null;

  await getDb()
    .update(survey)
    .set({
      answers: JSON.stringify(answers),
      answeredAt: new Date(),
      consentPublish,
      attribution,
    })
    .where(eq(survey.id, surveyId));

  // Notifie Téféry (Brevo). Dégradable.
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
      const body = answers
        .map((x) => `<p><strong>${escapeHtml(x.q)}</strong><br/>${escapeHtml(x.a).replace(/\n/g, "<br/>")}</p>`)
        .join("");
      await sendEmail({
        to: recipients.map((email) => ({ email, name: "DULEME AND CIE" })),
        subject: `Questionnaire (${phase}) répondu — ${c.name}`,
        htmlContent: `<h2>Réponses de ${escapeHtml(c.name)}</h2>${body}<p>Accord de publication : ${consentPublish ? "OUI" : "non"}</p>`,
      });
    }
  } catch (e) {
    console.error("[survey] notification échouée (ignorée)", e);
  }

  revalidatePath(`/espace/${token}`);
}
