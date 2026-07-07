/**
 * Petit utilitaire HTTP partagé par les connecteurs.
 * Volontairement minimal : `fetch` natif (Node 20+), timeout, et erreur typée.
 */

export class ConnectorError extends Error {
  constructor(
    public connector: string,
    message: string,
    public status?: number,
    public body?: unknown,
  ) {
    super(`[${connector}] ${message}`);
    this.name = "ConnectorError";
  }
}

/** Levée quand on appelle un connecteur dont les clés ne sont pas configurées. */
export class NotConfiguredError extends ConnectorError {
  constructor(connector: string) {
    super(connector, "connecteur non configuré (clés absentes)");
    this.name = "NotConfiguredError";
  }
}

export async function httpJson<T = unknown>(
  connector: string,
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<T> {
  const { timeoutMs = 15000, ...rest } = init;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...rest, signal: ctrl.signal });
    const text = await res.text();
    const data = text ? safeParse(text) : null;
    if (!res.ok) {
      throw new ConnectorError(
        connector,
        `HTTP ${res.status} sur ${new URL(url).pathname}`,
        res.status,
        data ?? text,
      );
    }
    return data as T;
  } catch (err) {
    if (err instanceof ConnectorError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    throw new ConnectorError(connector, msg);
  } finally {
    clearTimeout(timer);
  }
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
