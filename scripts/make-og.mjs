import sharp from "sharp";

// Image Open Graph (1200x630) — bandeau de marque DULEME (bordeaux + emblème + signature).
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4e1b29"/>
      <stop offset="0.6" stop-color="#3d1420"/>
      <stop offset="1" stop-color="#2c0f18"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#7a2f3a" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#7a2f3a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- emblème -->
  <g transform="translate(96,150)">
    <path d="M0 12 H140 V34 Q140 100 70 100 Q0 100 0 34 Z" fill="#b0894c"/>
    <g fill="none" stroke="#3d1420" stroke-width="4.4" stroke-linecap="round">
      <path d="M8 34 Q41 24 70 34 Q99 44 132 34"/>
      <path d="M11 52 Q44 42 70 52 Q96 62 129 52"/>
      <path d="M18 70 Q46 61 70 70 Q94 79 122 70"/>
      <path d="M70 34 V92"/>
    </g>
  </g>

  <text x="264" y="222" fill="#f2e6dd" font-family="Georgia, 'Times New Roman', serif" font-size="34" letter-spacing="7">DULEME AND CIE</text>

  <text x="96" y="360" fill="#f4ecdf" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="600">Bien diriger est</text>
  <text x="96" y="446" fill="#f4ecdf" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="600">l'art de décider.</text>

  <text x="96" y="536" fill="#d8a98f" font-family="Arial, sans-serif" font-size="24" letter-spacing="5">CABINET DE LA DÉCISION STRATÉGIQUE</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile("apps/site/public/og.jpg");
console.log("og.jpg généré (1200x630).");
