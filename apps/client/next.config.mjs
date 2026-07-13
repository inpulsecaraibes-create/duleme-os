import { config } from "dotenv";

// Charge le .env.local de la racine du monorepo.
config({ path: "../../.env.local" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@duleme/ui",
    "@duleme/database",
    "@duleme/auth",
    "@duleme/connectors",
  ],
  experimental: {
    // Permet le dépôt de documents (PDF, etc.) jusqu'à 15 Mo.
    serverActions: { bodySizeLimit: "15mb" },
  },
};

export default nextConfig;
