import sharp from "sharp";

// Emblème DULEME (seul) → favicon carré premium (emblème bordeaux sur crème).
const EMBLEM = "Logo/Logo DULEME AND CIE.png";
const SIZE = 512;
const PAPER = { r: 242, g: 237, b: 228, alpha: 1 };

const emblem = await sharp(EMBLEM)
  .resize({ width: 372, withoutEnlargement: true })
  .png()
  .toBuffer();
const meta = await sharp(emblem).metadata();
const top = Math.round((SIZE - (meta.height ?? 0)) / 2);
const left = Math.round((SIZE - (meta.width ?? 0)) / 2);

const targets = [
  "apps/site/src/app/icon.png",
  "apps/back-office/src/app/icon.png",
];

for (const out of targets) {
  await sharp({
    create: { width: SIZE, height: SIZE, channels: 4, background: PAPER },
  })
    .composite([{ input: emblem, top, left }])
    .png()
    .toFile(out);
  console.log("favicon → " + out);
}
