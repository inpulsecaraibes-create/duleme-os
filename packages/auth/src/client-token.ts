import crypto from "node:crypto";

/**
 * Jeton d'accès à l'espace client : lien privé stable, signé (HMAC-SHA256).
 * Pas de mot de passe — Téféry envoie au client son lien personnel.
 * Le jeton n'expire pas (lien durable) mais reste infalsifiable sans AUTH_SECRET.
 */

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error("AUTH_SECRET manquant ou trop court (min. 16 caractères).");
  }
  return s;
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", secret())
    .update(`client:${payload}`)
    .digest("base64url");
}

export function createClientToken(clientId: string): string {
  const payload = Buffer.from(clientId).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyClientToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return Buffer.from(payload, "base64url").toString();
  } catch {
    return null;
  }
}
