"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  client,
  contactRequest,
  eq,
  getDb,
  message,
  mission,
  survey,
  testimonial,
} from "@duleme/database";
import { ensureClientTree, isGoogleConfigured, sendEmail } from "@duleme/connectors";

function s(fd: FormData, k: string): string {
  return String(fd.get(k) ?? "").trim();
}

/**
 * Automatisation « client créé → dossier Google Drive ».
 * Dégradable : si Google n'est pas connecté, ne fait rien (aucun appel réseau).
 */
async function provisionDrive(clientId: string, name: string) {
  if (!isGoogleConfigured()) return;
  try {
    const tree = await ensureClientTree(name);
    if (tree) {
      await getDb()
        .update(client)
        .set({ driveFolderUrl: tree.url, updatedAt: new Date() })
        .where(eq(client.id, clientId));
    }
  } catch (e) {
    console.error("[drive] création arborescence échouée (ignorée)", e);
  }
}

export async function createClient(formData: FormData) {
  const name = s(formData, "name");
  if (!name) return;
  const [created] = await getDb()
    .insert(client)
    .values({
      name,
      company: s(formData, "company") || null,
      email: s(formData, "email") || null,
      phone: s(formData, "phone") || null,
      type: s(formData, "type") || "prospect",
    })
    .returning({ id: client.id });
  if (created) await provisionDrive(created.id, name);
  revalidatePath("/clients");
}

/** Convertit une demande de RDV en fiche client (prospect). */
export async function createClientFromRequest(formData: FormData) {
  const requestId = s(formData, "requestId");
  if (!requestId) return;
  const [req] = await getDb()
    .select()
    .from(contactRequest)
    .where(eq(contactRequest.id, requestId))
    .limit(1);
  if (!req) return;
  const [created] = await getDb()
    .insert(client)
    .values({
      name: req.name || "Prospect sans nom",
      company: req.company || null,
      email: req.email || null,
      type: "prospect",
      source: req.source,
      notes: req.message ? `Demande initiale : ${req.message}` : null,
    })
    .returning({ id: client.id });
  if (created) await provisionDrive(created.id, req.name || "Prospect sans nom");
  revalidatePath("/clients");
  revalidatePath("/");
  if (created) redirect(`/clients/${created.id}`);
}

export async function updateClient(formData: FormData) {
  const id = s(formData, "id");
  const name = s(formData, "name");
  if (!id || !name) return;
  await getDb()
    .update(client)
    .set({
      name,
      company: s(formData, "company") || null,
      email: s(formData, "email") || null,
      phone: s(formData, "phone") || null,
      type: s(formData, "type") || "prospect",
      status: s(formData, "status") || "nouveau",
      driveFolderUrl: s(formData, "driveFolderUrl") || null,
      notes: s(formData, "notes") || null,
      updatedAt: new Date(),
    })
    .where(eq(client.id, id));
  revalidatePath(`/clients/${id}`);
  revalidatePath("/clients");
}

export async function deleteClient(formData: FormData) {
  const id = s(formData, "id");
  if (!id) return;
  await getDb().delete(client).where(eq(client.id, id));
  revalidatePath("/clients");
  redirect("/clients");
}

/** Téféry répond à un client → message archivé + notification email au client. */
export async function replyToClient(formData: FormData) {
  const clientId = s(formData, "clientId");
  const body = s(formData, "body");
  if (!clientId || !body) return;
  await getDb().insert(message).values({ clientId, sender: "cabinet", body });
  try {
    const [c] = await getDb()
      .select({ name: client.name, email: client.email })
      .from(client)
      .where(eq(client.id, clientId))
      .limit(1);
    if (c?.email) {
      await sendEmail({
        to: [{ email: c.email, name: c.name }],
        subject: "Vous avez un nouveau message de DULEME AND CIE",
        htmlContent: `
          <p>Bonjour ${c.name.split(" ")[0]},</p>
          <p>Vous avez reçu un message dans votre espace DULEME :</p>
          <blockquote>${body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br/>")}</blockquote>
          <p>Retrouvez notre conversation dans votre espace personnel.</p>
          <p>— Téféry, DULEME AND CIE</p>
        `,
      });
    }
  } catch (e) {
    console.error("[reply] notification client échouée (ignorée)", e);
  }
  revalidatePath(`/clients/${clientId}`);
}

/** Transforme un questionnaire répondu en témoignage (brouillon, non publié). */
export async function publishSurveyAsTestimonial(formData: FormData) {
  const surveyId = s(formData, "surveyId");
  if (!surveyId) return;
  const [row] = await getDb()
    .select()
    .from(survey)
    .where(eq(survey.id, surveyId))
    .limit(1);
  if (!row || !row.answers) return;
  let answers: { q: string; a: string }[] = [];
  try {
    answers = JSON.parse(row.answers);
  } catch {
    return;
  }
  const filled = answers.filter((x) => x.a);
  if (filled.length === 0) return;
  // La « phrase à garder » (dernière réponse) fait un bon titre ; sinon la 1re.
  const headline = filled[filled.length - 1].a;
  const body = filled
    .slice(0, Math.max(1, filled.length - 1))
    .map((x) => x.a)
    .join("\n\n");
  await getDb().insert(testimonial).values({
    headline,
    body: body || headline,
    attribution: row.attribution || undefined,
    published: false, // brouillon : Téféry relit avant publication
  });
  revalidatePath("/temoignages");
  revalidatePath(`/clients/${row.clientId}`);
}

/** Crée les 3 questionnaires de témoignage (t0 / +1 mois / +3 mois) une seule fois. */
async function ensureSurveys(clientId: string) {
  const existing = await getDb()
    .select({ id: survey.id })
    .from(survey)
    .where(eq(survey.clientId, clientId))
    .limit(1);
  if (existing.length) return;
  const now = Date.now();
  const DAY = 86_400_000;
  await getDb()
    .insert(survey)
    .values([
      { clientId, phase: "t0", dueAt: new Date(now) },
      { clientId, phase: "m1", dueAt: new Date(now + 30 * DAY) },
      { clientId, phase: "m3", dueAt: new Date(now + 90 * DAY) },
    ]);
}

/** Crée une mission rattachée à un client (depuis la fiche client). */
export async function createMission(formData: FormData) {
  const clientId = s(formData, "clientId");
  const title = s(formData, "title");
  if (!clientId || !title) return;
  // Un client qui a une mission n'est plus un simple prospect.
  await getDb()
    .update(client)
    .set({ type: "client", status: "actif", updatedAt: new Date() })
    .where(eq(client.id, clientId));
  await getDb().insert(mission).values({ clientId, title });
  await ensureSurveys(clientId);
  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/missions");
}
