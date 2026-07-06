/**
 * Design System DULEME — tokens partagés (Palette « Pierre & Bordeaux »).
 * Les couleurs sont exposées en variables CSS (triplets RGB) pour permettre
 * le dark mode et la modulation d'opacité (`bg-paper/85`). Valeurs définies
 * dans les apps via `:root` (clair) et `.dark` (sombre).
 */
const c = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: c("--paper"),
        paper2: c("--paper2"),
        card: c("--card"),
        ink: c("--ink"),
        mut: c("--mut"),
        line: c("--line"),
        bord: {
          DEFAULT: c("--bord"),
          deep: c("--bord-deep"),
        },
        brass: c("--brass"),
        glow: c("--glow"),
        accent: c("--accent"),
        // sémantiques (distinctes de l'accent de marque)
        ok: c("--ok"),
        warn: c("--warn"),
        alert: c("--alert"),
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
        eyebrow: "0.22em",
        wordmark: "0.2em",
      },
      maxWidth: {
        prose: "66ch",
      },
    },
  },
};
