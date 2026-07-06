/**
 * Design System DULEME — tokens partagés (Palette « Pierre & Bordeaux »).
 * Source de vérité des couleurs, typographies, rayons et ombres du produit.
 * Consommé par les apps via `presets: [require('@duleme/config/tailwind-preset')]`.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        paper: "#f2ede4",
        paper2: "#f8f4ec",
        ink: "#241d18",
        mut: "#7d7062",
        line: "#e0d9cc",
        bord: {
          DEFAULT: "#5a1e2d",
          deep: "#3d1420",
        },
        brass: "#b0894c",
        glow: "#f6e3c8",
        // couleurs sémantiques (distinctes de l'accent)
        ok: "#3f7d5a",
        warn: "#a9803f",
        alert: "#a4402f",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        lg: "16px",
      },
      boxShadow: {
        soft: "0 24px 50px -34px rgba(90,30,45,.25)",
        card: "0 16px 34px -30px rgba(90,30,45,.4)",
        lift: "0 30px 60px -34px rgba(90,30,45,.35)",
      },
      letterSpacing: {
        wordmark: "0.2em",
      },
      maxWidth: {
        prose: "66ch",
      },
    },
  },
};
