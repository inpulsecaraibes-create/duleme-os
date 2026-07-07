"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { client, contactRequest, eq, getDb, mission } from "@duleme/database";
import { ensureClientTree, isGoogleConfigured } from "@duleme/connectors";

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
  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/missions");
}
