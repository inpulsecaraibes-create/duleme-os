/**
 * Brevo — emails transactionnels, notifications, rappels, newsletter.
 * Rôle dans DULEME OS : prévenir le client (document ajouté/demandé, RDV),
 * alerter Téféry (nouveau message, nouvelle demande), gérer la newsletter.
 *
 * API REST : https://api.brevo.com/v3  — en-tête `api-key`.
 * Dégradable : sans BREVO_API_KEY, `isConfigured()` = false et les envois
 * sont ignorés (log) au lieu de casser le parcours.
 */
import { httpJson, NotConfiguredError } from "./http";

const BASE = "https://api.brevo.com/v3";

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

function key(): string {
  const k = process.env.BREVO_API_KEY;
  if (!k) throw new NotConfiguredError("brevo");
  return k;
}

function defaultSender(): { name: string; email: string } {
  return {
    name: process.env.BREVO_SENDER_NAME || "DULEME AND CIE",
    email: process.env.BREVO_SENDER_EMAIL || "contact@dulemeandcie.com",
  };
}

export type EmailInput = {
  to: { email: string; name?: string }[];
  cc?: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
  sender?: { name: string; email: string };
};

/** Envoie un email transactionnel. No-op si Brevo n'est pas configuré. */
export async function sendEmail(input: EmailInput): Promise<{ sent: boolean; messageId?: string }> {
  if (!isBrevoConfigured()) {
    console.warn("[brevo] non configuré — email ignoré:", input.subject);
    return { sent: false };
  }
  const res = await httpJson<{ messageId?: string }>("brevo", `${BASE}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": key(),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: input.sender ?? defaultSender(),
      to: input.to,
      cc: input.cc,
      subject: input.subject,
      htmlContent: input.htmlContent,
      replyTo: input.replyTo,
    }),
  });
  return { sent: true, messageId: res.messageId };
}

/** Ajoute / met à jour un contact (newsletter). No-op si non configuré. */
export async function upsertContact(input: {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
}): Promise<{ ok: boolean }> {
  if (!isBrevoConfigured()) {
    console.warn("[brevo] non configuré — contact ignoré:", input.email);
    return { ok: false };
  }
  await httpJson("brevo", `${BASE}/contacts`, {
    method: "POST",
    headers: {
      "api-key": key(),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      attributes: input.attributes,
      listIds: input.listIds,
      updateEnabled: true,
    }),
  });
  return { ok: true };
}

/** Vérifie la validité de la clé (utilisé par la page Connecteurs). */
export async function brevoHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isBrevoConfigured()) return { ok: false, detail: "Clé absente" };
  try {
    const acc = await httpJson<{ email?: string; companyName?: string }>(
      "brevo",
      `${BASE}/account`,
      { headers: { "api-key": key(), accept: "application/json" } },
    );
    return { ok: true, detail: acc.email ? `Compte ${acc.email}` : "Connecté" };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Erreur" };
  }
}
