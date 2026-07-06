import { NextResponse } from "next/server";
import { z } from "zod";
import { contactRequest, getDb, isDbConfigured } from "@duleme/database";

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

  // Dégradé : pas de base configurée (dev) — on ne bloque pas l'expérience.
  if (!isDbConfigured()) {
    console.warn(
      "[contact] DATABASE_URL absent — demande non persistée (dev).",
    );
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    await getDb()
      .insert(contactRequest)
      .values({
        message: data.message,
        name: data.name || null,
        company: data.company || null,
        email: data.email || null,
        callbackRequested: data.callbackRequested,
      });
    return NextResponse.json({ ok: true, persisted: true });
  } catch (e) {
    console.error("[contact] échec d'insertion", e);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}
