"use server";

import { revalidatePath } from "next/cache";
import { eq, getDb, testimonial } from "@duleme/database";

const FALLBACK_ATTR = "Dirigeant·e de PME — témoignage anonymisé";

export async function createTestimonial(formData: FormData) {
  const headline = String(formData.get("headline") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const attribution =
    String(formData.get("attribution") ?? "").trim() || FALLBACK_ATTR;
  if (!headline || !body) return;
  await getDb().insert(testimonial).values({ headline, body, attribution });
  revalidatePath("/temoignages");
}

export async function updateTestimonial(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const headline = String(formData.get("headline") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const attribution =
    String(formData.get("attribution") ?? "").trim() || FALLBACK_ATTR;
  if (!id || !headline || !body) return;
  await getDb()
    .update(testimonial)
    .set({ headline, body, attribution, updatedAt: new Date() })
    .where(eq(testimonial.id, id));
  revalidatePath("/temoignages");
}

export async function togglePublished(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  if (!id) return;
  await getDb()
    .update(testimonial)
    .set({ published: !published, updatedAt: new Date() })
    .where(eq(testimonial.id, id));
  revalidatePath("/temoignages");
}

export async function deleteTestimonial(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await getDb().delete(testimonial).where(eq(testimonial.id, id));
  revalidatePath("/temoignages");
}
