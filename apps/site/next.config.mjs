import { config } from "dotenv";

// Charge le .env.local de la racine du monorepo (une seule source de vérité).
config({ path: "../../.env.local" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@duleme/ui", "@duleme/database", "@duleme/connectors"],
};

export default nextConfig;
