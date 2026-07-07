import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertContact } from "@duleme/connectors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ email: z.string().trim().email().max(320) });

export async function POST(req: Request) {
  let email: string;
  try {
    email = schema.parse(await req.json()).email;
  } catch {
    return NextResponse.json({ ok: false, error: "Email invalide." }, { status: 400 });
  }

  try {
    // Liste « Newsletter » optionnelle via BREVO_NEWSLETTER_LIST_ID.
    const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
    await upsertContact({
      email,
      attributes: { SOURCE: "site-faux-dilemme" },
      listIds: Number.isFinite(listId) && listId > 0 ? [listId] : undefined,
    });
    // Toujours ok côté UX (dégradable) : si Brevo est absent, l'inscription
    // est simplement ignorée sans casser l'expérience.
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[newsletter] échec Brevo", e);
    return NextResponse.json({ ok: true }); // on n'expose pas l'erreur au visiteur
  }
}
