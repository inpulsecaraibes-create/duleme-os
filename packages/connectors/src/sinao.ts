/**
 * Sinao — devis, factures, paiements (aucune facturation interne à DULEME OS).
 * Rôle dans DULEME OS : afficher les devis/factures dans la fiche client et
 * l'espace client, en lecture seule.
 *
 * API REST : base https://api.sinao.app/v1 — authentification par en-tête
 * `Api-Key: <clé>`. La clé est rattachée à une entreprise (« application »),
 * dont l'identifiant `SINAO_APP_ID` doit préfixer les routes : /apps/{appId}/…
 * Dégradable : sans SINAO_API_KEY + SINAO_APP_ID, `isConfigured()` = false.
 */
import { httpJson, NotConfiguredError } from "./http";

function base(): string {
  return process.env.SINAO_API_BASE || "https://api.sinao.app/v1";
}

export function isSinaoConfigured(): boolean {
  return Boolean(process.env.SINAO_API_KEY && process.env.SINAO_APP_ID);
}

function key(): string {
  const k = process.env.SINAO_API_KEY;
  if (!k) throw new NotConfiguredError("sinao");
  return k;
}

function appId(): string {
  const a = process.env.SINAO_APP_ID;
  if (!a) throw new NotConfiguredError("sinao");
  return a;
}

/** Requête générique authentifiée par Api-Key (GET par défaut). */
export async function sinaoRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  return httpJson<T>("sinao", `${base()}${path}`, {
    ...init,
    headers: {
      "Api-Key": key(),
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

function unwrap(data: unknown): SinaoDocument[] {
  if (Array.isArray(data)) return data as SinaoDocument[];
  if (data && typeof data === "object" && Array.isArray((data as any).data)) {
    return (data as any).data as SinaoDocument[];
  }
  return [];
}

export async function listInvoices(): Promise<SinaoDocument[]> {
  if (!isSinaoConfigured()) return [];
  return unwrap(await sinaoRequest(`/apps/${appId()}/invoices`));
}

export async function listQuotes(): Promise<SinaoDocument[]> {
  if (!isSinaoConfigured()) return [];
  return unwrap(await sinaoRequest(`/apps/${appId()}/quotes`));
}

export async function sinaoHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!process.env.SINAO_API_KEY) return { ok: false, detail: "Clé absente" };
  if (!process.env.SINAO_APP_ID)
    return { ok: false, detail: "SINAO_APP_ID manquant (identifiant entreprise)" };
  try {
    await sinaoRequest(`/apps/${appId()}`);
    return { ok: true, detail: `Entreprise #${appId()} connectée` };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Erreur" };
  }
}
