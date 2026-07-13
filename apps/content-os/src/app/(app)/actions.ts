"use server";

import { revalidatePath } from "next/cache";
import { and, contentPiece, eq, getDb, inArray, isNotNull } from "@duleme/database";
import { generateText, isAiConfigured } from "@duleme/connectors";
import { nextSlots } from "@/lib/schedule";

function s(fd: FormData, k: string): string {
  return String(fd.get(k) ?? "").trim();
}

const SYSTEM = `Tu es la plume de DULEME AND CIE, cabinet de la décision stratégique dirigé par Téféry.
Voix : sobre, premium, exigeante, jamais commerciale. Idée-signature : « le vrai problème n'est pas toujours celui qu'on croit ».
Mots d'un dirigeant, aucun jargon de consultant. Français impeccable.`;

/** Génère, à partir d'un thème, un article (site) + une version LinkedIn + une version Instagram. */
export async function generateFromTheme(formData: FormData) {
  const theme = s(formData, "theme");
  if (!theme || !isAiConfigured()) return;

  const prompt = `Thème : « ${theme} ».
Produis QUATRE blocs, séparés EXACTEMENT par ces marqueurs sur leur propre ligne :

===ARTICLE===
Un article pour le média « Le Faux Dilemme™ ». Première ligne = titre précédé de « # ». Puis le corps en markdown (250-450 mots).
===LINKEDIN===
Un post LinkedIn (accroche forte, 120-200 mots, 1 idée, ton posé, pas de hashtags à outrance : 3 max).
===INSTAGRAM===
Une légende Instagram (plus incarnée, 80-150 mots, sobre).
===VISUEL===
Un brief visuel en 2 phrases pour Canva (ambiance, éléments, palette « pierre & bordeaux »).`;

  let out = "";
  try {
    out = await generateText({ system: SYSTEM, prompt, maxTokens: 2000 });
  } catch {
    return;
  }

  const grab = (marker: string, next?: string) => {
    const start = out.indexOf(`===${marker}===`);
    if (start === -1) return "";
    const from = start + marker.length + 6;
    const end = next ? out.indexOf(`===${next}===`, from) : out.length;
    return out.slice(from, end === -1 ? out.length : end).trim();
  };

  const articleRaw = grab("ARTICLE", "LINKEDIN");
  const linkedin = grab("LINKEDIN", "INSTAGRAM");
  const instagram = grab("INSTAGRAM", "VISUEL");
  const visuel = grab("VISUEL");

  const firstLine = articleRaw.split("\n")[0] || "";
  const title = firstLine.replace(/^#+\s*/, "").trim() || theme;
  const body = articleRaw.replace(firstLine, "").trim();

  const rows = [
    { theme, channel: "site", title, body, visualBrief: null },
    { theme, channel: "linkedin", title: null, body: linkedin, visualBrief: visuel || null },
    { theme, channel: "instagram", title: null, body: instagram, visualBrief: visuel || null },
  ].filter((r) => r.body);

  if (rows.length) await getDb().insert(contentPiece).values(rows);
  revalidatePath("/");
}

/** Ajout manuel d'un brouillon (utile sans IA). */
export async function addManual(formData: FormData) {
  const theme = s(formData, "theme") || "Idée";
  const channel = s(formData, "channel") || "site";
  const title = s(formData, "title") || null;
  const body = s(formData, "body");
  if (!body) return;
  await getDb().insert(contentPiece).values({ theme, channel, title, body });
  revalidatePath("/");
}

/** Valide un lot : les articles SITE sont programmés (2/mois), le reste passe « prêt ». */
export async function validateSelected(formData: FormData) {
  const ids = formData.getAll("ids").map(String).filter(Boolean);
  if (ids.length === 0) return;

  const selected = await getDb()
    .select()
    .from(contentPiece)
    .where(inArray(contentPiece.id, ids));

  // Créneaux déjà occupés (articles site programmés).
  const taken = (
    await getDb()
      .select({ d: contentPiece.scheduledFor })
      .from(contentPiece)
      .where(
        and(eq(contentPiece.channel, "site"), isNotNull(contentPiece.scheduledFor)),
      )
  ).map((r) => r.d);

  const sitePieces = selected.filter((p) => p.channel === "site");
  const slots = nextSlots(sitePieces.length, taken);

  let i = 0;
  for (const p of selected) {
    if (p.channel === "site") {
      await getDb()
        .update(contentPiece)
        .set({ status: "scheduled", scheduledFor: slots[i++], updatedAt: new Date() })
        .where(eq(contentPiece.id, p.id));
    } else {
      await getDb()
        .update(contentPiece)
        .set({ status: "validated", updatedAt: new Date() })
        .where(eq(contentPiece.id, p.id));
    }
  }
  revalidatePath("/");
}

export async function deletePiece(formData: FormData) {
  const id = s(formData, "id");
  if (!id) return;
  await getDb().delete(contentPiece).where(eq(contentPiece.id, id));
  revalidatePath("/");
}
