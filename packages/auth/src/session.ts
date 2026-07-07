import crypto from "node:crypto";

/**
 * Session d'administration : jeton signé (HMAC-SHA256), sans dépendance externe.
 * Isolé ici pour pouvoir être remplacé par Supabase Auth sans toucher aux apps.
 */

export const SESSION_COOKIE = "duleme_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours (secondes)

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
    .update(payload)
    .digest("base64url");
}

export function createSession(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      sub: email,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySession(
  token: string | undefined | null,
): { sub: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (
      typeof data.exp !== "number" ||
      data.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { sub: String(data.sub) };
  } catch {
    return null;
  }
}
