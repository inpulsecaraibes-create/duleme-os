import sharp from "sharp";
import path from "node:path";

const SRC = "Photos";
const OUT = "apps/site/public/photos";

// Portrait éditorial pour Le Faux Dilemme (tenue lin claire, tablette).
const input = path.join(SRC, "Téféry 07 2025 (3).png");
const base = "tefery-media";

await sharp(input)
  .rotate()
  .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(path.join(OUT, `${base}.webp`));

const meta = await sharp(input).metadata();
console.log(`${base}.webp  <-  ${input}  (${meta.width}x${meta.height})`);
