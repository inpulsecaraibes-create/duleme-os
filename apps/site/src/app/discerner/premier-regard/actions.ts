"use server";

import { getDb, isDbConfigured, premierRegard } from "@duleme/database";
import { sendEmail } from "@duleme/connectors";
import { situationById } from "@/content/premier-regard";

export type PremierRegardInput = {
  metier: string;
  situation: string;
  q1: string;
  q2: string;
  q3: string;
  revenueRange: string;
  remunerationRange: string;
  openText: string;
  firstName: string;
  lastName: string;
  email: string;
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://dulemeandcie.com";

function esc(s: string): string {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Enregistre le lead + envoie les 2 emails. Renvoie l'id pour la réservation. */
export async function submitPremierRegard(
  input: PremierRegardInput,
): Promise<{ ok: boolean; id: string | null }> {
  const s = situationById(input.situation);
  let id: string | null = null;

  if (isDbConfigured()) {
    try {
      const [row] = await getDb()
        .insert(premierRegard)
        .values({
          metier: input.metier || null,
          situation: input.situation,
          q1: input.q1 || null,
          q2: input.q2 || null,
          q3: input.q3 || null,
          revenueRange: input.revenueRange || null,
          remunerationRange: input.remunerationRange || null,
          openText: input.openText || null,
          firstName: input.firstName || null,
          lastName: input.lastName || null,
          email: input.email || null,
          emailSent: true,
        })
        .returning({ id: premierRegard.id });
      id = row?.id ?? null;
    } catch (e) {
      console.error("[premier-regard] insert échoué", e);
    }
  }

  const bookingUrl = `${SITE}/discerner/reserver${id ? `?id=${id}` : ""}`;
  const prenom = input.firstName || "";

  // 1) Email au dirigeant — ne donne PAS de pistes : il ouvre une réflexion.
  if (input.email) {
    try {
      await sendEmail({
        to: [{ email: input.email, name: `${input.firstName} ${input.lastName}`.trim() }],
        subject: "Votre Premier Regard™ — et si c'était un symptôme ?",
        htmlContent: `
          <p>Bonjour ${esc(prenom)},</p>
          <p>Merci d'avoir pris ces quelques minutes pour poser votre situation et vos mots dans mon espace de discernement.</p>
          <p>Au regard de vos réponses, il est possible que le problème que vous cherchez aujourd'hui à résoudre ne soit qu'un symptôme.</p>
          <p>Vous avez le nez dans le guidon, et c'est normal. C'est souvent lorsque l'on est pleinement engagé dans son entreprise que certaines évidences deviennent les plus difficiles à voir.</p>
          <p>Un regard extérieur, lucide et indépendant, permet parfois de distinguer ce qui relevait jusqu'ici du symptôme… et ce qui mérite réellement d'être travaillé.</p>
          <p>Si vous souhaitez poursuivre cette réflexion, je vous propose un premier échange confidentiel de 20 minutes. Nous vérifierons ensemble si la décision qui vous préoccupe aujourd'hui est bien celle qui mérite votre attention.</p>
          <p><a href="${bookingUrl}" style="display:inline-block;background:#5a1e2d;color:#f6efe6;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:600">Réserver mon échange de 20 minutes</a></p>
          <p>Prenez soin de votre trajectoire,<br/>Téféry Duleme<br/><em>Cabinet DULEME AND CIE</em></p>
        `,
      });
    } catch (e) {
      console.error("[premier-regard] email dirigeant échoué", e);
    }
  }

  // 2) Notification à Téféry (profil complet)
  const tefery = (process.env.NOTIFY_EMAIL || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((email) => ({ email, name: "DULEME AND CIE" }));
  if (tefery.length) {
    try {
      await sendEmail({
        to: tefery,
        subject: `🚨 Nouveau lead qualifié — ${input.firstName} ${input.lastName}`,
        htmlContent: `
          <h2>Profil du dirigeant</h2>
          <p><strong>Nom :</strong> ${esc(input.firstName)} ${esc(input.lastName)}<br/>
          <strong>Email :</strong> ${esc(input.email)}<br/>
          <strong>Activité :</strong> ${esc(input.metier)}</p>
          <h3>Situation & réponses</h3>
          <p><strong>Situation :</strong> ${esc(s?.label ?? input.situation)}<br/>
          ${esc(s?.questions[0].q ?? "Q1")} → <strong>${esc(input.q1)}</strong><br/>
          ${esc(s?.questions[1].q ?? "Q2")} → <strong>${esc(input.q2)}</strong><br/>
          ${esc(s?.questions[2].q ?? "Q3")} → <strong>${esc(input.q3)}</strong></p>
          <h3>Santé du système</h3>
          <p><strong>Chiffre d'affaires :</strong> ${esc(input.revenueRange)}<br/>
          <strong>Rémunération :</strong> ${esc(input.remunerationRange)}</p>
          <h3>Verbatim (le vrai problème selon lui)</h3>
          <blockquote style="border-left:3px solid #b0894c;padding-left:12px;color:#333">« ${esc(input.openText)} »</blockquote>
          <p style="color:#7d7062">Lead enregistré dans le CRM. Il est invité à réserver 20 minutes avec vous.</p>
        `,
      });
    } catch (e) {
      console.error("[premier-regard] notification Téféry échouée", e);
    }
  }

  return { ok: true, id };
}
