/**
 * Fireflies.ai — enregistrement, transcription, résumé et compte-rendu des RDV.
 * Rôle dans DULEME OS : afficher les comptes-rendus dans la fiche mission
 * après chaque rendez-vous.
 *
 * API GraphQL : https://api.fireflies.ai/graphql — en-tête `Authorization: Bearer`.
 * Dégradable : sans FIREFLIES_API_KEY, `isConfigured()` = false.
 */
import { httpJson, NotConfiguredError } from "./http";

const ENDPOINT = "https://api.fireflies.ai/graphql";

export function isFirefliesConfigured(): boolean {
  return Boolean(process.env.FIREFLIES_API_KEY);
}

function key(): string {
  const k = process.env.FIREFLIES_API_KEY;
  if (!k) throw new NotConfiguredError("fireflies");
  return k;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await httpJson<{ data?: T; errors?: { message: string }[] }>(
    "fireflies",
    ENDPOINT,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${key()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    },
  );
  if (res.errors?.length) {
    throw new Error(res.errors.map((e) => e.message).join("; "));
  }
  return res.data as T;
}

export type FirefliesTranscript = {
  id: string;
  title: string | null;
  date: number | null;
  transcript_url: string | null;
  summary: { overview: string | null; short_summary: string | null } | null;
};

/** Derniers comptes-rendus (tous RDV confondus). */
export async function listTranscripts(limit = 10): Promise<FirefliesTranscript[]> {
  if (!isFirefliesConfigured()) return [];
  const data = await gql<{ transcripts: FirefliesTranscript[] }>(
    `query ($limit: Int) {
      transcripts(limit: $limit) {
        id title date transcript_url
        summary { overview short_summary }
      }
    }`,
    { limit },
  );
  return data.transcripts ?? [];
}

/** Compte-rendu détaillé d'un RDV. */
export async function getTranscript(id: string): Promise<FirefliesTranscript | null> {
  if (!isFirefliesConfigured()) return null;
  const data = await gql<{ transcript: FirefliesTranscript }>(
    `query ($id: String!) {
      transcript(id: $id) {
        id title date transcript_url
        summary { overview short_summary }
      }
    }`,
    { id },
  );
  return data.transcript ?? null;
}

export async function firefliesHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isFirefliesConfigured()) return { ok: false, detail: "Clé absente" };
  try {
    await gql(`query { user { name } }`);
    return { ok: true, detail: "Connecté" };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Erreur" };
  }
}
