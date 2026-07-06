import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "Photos";
const OUT = "apps/site/public/photos";
mkdirSync(OUT, { recursive: true });

// Nouvelles photos « Téféry (NN).jpg » (T majuscule) — hors set téféry(1-5) déjà traité.
const files = readdirSync(SRC).filter(
  (f) => /\(\d+\)\.jpg$/i.test(f) && f[0] === "T",
);

for (const f of files) {
  const num = f.match(/\((\d+)\)/)[1];
  await sharp(path.join(SRC, f))
    .rotate()
    .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `portrait-${num}.webp`));
  console.log(`portrait-${num}.webp`);
}
console.log(`${files.length} portraits optimisés.`);
