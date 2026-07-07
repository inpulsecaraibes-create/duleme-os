/**
 * Sinao — devis, factures, paiements (aucune facturation interne à DULEME OS).
 * Rôle dans DULEME OS : afficher les devis/factures dans la fiche client et
 * dans l'espace client, en lecture seule.
 *
 * API REST authentifiée par clé (en-tête Bearer). Base configurable via
 * SINAO_API_BASE. Dégradable : sans SINAO_API_KEY, `isConfigured()` = false.
 *
 * ⚠️ Les chemins exacts (`/invoices`, `/quotes`) sont à confirmer avec la
 * documentation Sinao au moment du branchement — le client est volontairement
 * générique (`request`) pour s'adapter sans réécriture.
 */
import { httpJson, NotConfiguredError } from "./http";

function base(): string {
  return process.env.SINAO_API_BASE || "https://api.sinao.app/v1";
}

export function isSinaoConfigured(): boolean {
  return Boolean(process.env.SINAO_API_KEY);
}

function key(): string {
  const k = process.env.SINAO_API_KEY;
  if (!k) throw new NotConfiguredError("sinao");
  return k;
}

/** Requête générique authentifiée (GET par défaut). */
export async function sinaoRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  return httpJson<T>("sinao", `${base()}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${key()}`,
      accept: "application/json",
      ...(init.headers ?? {}),
    },
  });
}

export type SinaoDocument = {
  id: string | number;
  number?: string;
  status?: string;
  total?: number;
  currency?: string;
  clientName?: string;
  date?: string;
  pdfUrl?: string;
};

export async function listInvoices(): Promise<SinaoDocument[]> {
  if (!isSinaoConfigured()) return [];
  // TODO(brancher): ajuster le chemin selon la doc Sinao.
  const data = await sinaoRequest<{ data?: SinaoDocument[] } | SinaoDocument[]>("/invoices");
  return Array.isArray(data) ? data : (data.data ?? []);
}

export async function listQuotes(): Promise<SinaoDocument[]> {
  if (!isSinaoConfigured()) return [];
  const data = await sinaoRequest<{ data?: SinaoDocument[] } | SinaoDocument[]>("/quotes");
  return Array.isArray(data) ? data : (data.data ?? []);
}

export async function sinaoHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isSinaoConfigured()) return { ok: false, detail: "Clé absente" };
  // On ne connaît pas encore l'endpoint « /me » exact ; présence de clé = prêt.
  return { ok: true, detail: "Clé présente — endpoints à valider au branchement" };
}
