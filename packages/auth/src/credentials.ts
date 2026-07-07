import crypto from "node:crypto";

/** Comparaison à temps constant (évite les attaques temporelles). */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/**
 * Vérifie les identifiants administrateur (unique admin pour l'instant : Téféry).
 * Les valeurs vivent dans les variables d'environnement, jamais dans le code.
 */
export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminEmail || !adminPassword) return false;
  return (
    safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    safeEqual(password, adminPassword)
  );
}
