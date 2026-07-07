"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, getDb, mission } from "@duleme/database";

function s(fd: FormData, k: string): string {
  return String(fd.get(k) ?? "").trim();
}
function d(fd: FormData, k: string): Date | null {
  const v = s(fd, k);
  return v ? new Date(v) : null;
}

export async function updateMission(formData: FormData) {
  const id = s(formData, "id");
  const title = s(formData, "title");
  if (!id || !title) return;
  await getDb()
    .update(mission)
    .set({
      title,
      status: s(formData, "status") || "cadrage",
      documentsRequested: s(formData, "documentsRequested") || null,
      documentsReceived: s(formData, "documentsReceived") || null,
      deliverables: s(formData, "deliverables") || null,
      internalNotes: s(formData, "internalNotes") || null,
      dossierUrl: s(formData, "dossierUrl") || null,
      startDate: d(formData, "startDate"),
      dueDate: d(formData, "dueDate"),
      updatedAt: new Date(),
    })
    .where(eq(mission.id, id));
  revalidatePath(`/missions/${id}`);
  revalidatePath("/missions");
}

export async function deleteMission(formData: FormData) {
  const id = s(formData, "id");
  const clientId = s(formData, "clientId");
  if (!id) return;
  await getDb().delete(mission).where(eq(mission.id, id));
  revalidatePath("/missions");
  if (clientId) redirect(`/clients/${clientId}`);
  redirect("/missions");
}
