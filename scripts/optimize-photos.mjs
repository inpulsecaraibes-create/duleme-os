import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = "Photos";
const OUT = "apps/site/public/photos";
mkdirSync(OUT, { recursive: true });

// Sources fournies par Téféry (JPG). On produit des versions web légères.
const files = [
  "téféry (1).jpg",
  "téféry (2).jpg",
  "téféry (3).jpg",
  "téféry (4).jpg",
  "téféry (5).jpg",
];

for (let i = 0; i < files.length; i++) {
  const input = path.join(SRC, files[i]);
  const base = `photo-${i + 1}`;
  await sharp(input)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(OUT, `${base}.webp`));
  await sharp(input)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT, `${base}.jpg`));
  const meta = await sharp(input).metadata();
  console.log(`${base}  <-  ${files[i]}  (${meta.width}x${meta.height})`);
}
console.log("Optimisation terminée.");
