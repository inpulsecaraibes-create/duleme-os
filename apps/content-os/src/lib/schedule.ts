/**
 * Cadence de publication du site : 2 par mois, à date fixe (le 1er et le 15,
 * à 9h UTC). Régularité = ce que le référencement et les algorithmes préfèrent.
 * `nextSlots` renvoie les prochains créneaux libres (en sautant ceux déjà pris).
 */
export function nextSlots(count: number, taken: (Date | null)[] = []): Date[] {
  const takenSet = new Set(
    taken.filter(Boolean).map((d) => new Date(d as Date).getTime()),
  );
  const now = Date.now();
  const out: Date[] = [];
  const start = new Date();
  const y = start.getUTCFullYear();
  const m = start.getUTCMonth();
  for (let i = 0; i < 120 && out.length < count; i++) {
    for (const day of [1, 15]) {
      const d = new Date(Date.UTC(y, m + i, day, 9, 0, 0));
      if (d.getTime() > now && !takenSet.has(d.getTime())) {
        out.push(d);
        if (out.length >= count) break;
      }
    }
  }
  return out;
}
