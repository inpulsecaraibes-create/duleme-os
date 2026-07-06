import type { Config } from "tailwindcss";

// Design System DULEME — tokens partagés (Palette « Pierre & Bordeaux »)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require("@duleme/config/tailwind-preset");

const config: Config = {
  darkMode: "class",
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
