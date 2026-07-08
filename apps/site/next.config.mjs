import { config } from "dotenv";

// Charge le .env.local de la racine du monorepo (une seule source de vérité).
config({ path: "../../.env.local" });

const ESPACE_URL =
  process.env.NEXT_PUBLIC_CLIENT_APP_URL || "https://duleme-client.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@duleme/ui", "@duleme/database", "@duleme/connectors"],
  async redirects() {
    // URL de marque : dulemeandcie.com/client → espace client (sur Vercel).
    return [
      { source: "/client", destination: ESPACE_URL, permanent: false },
      { source: "/espace", destination: ESPACE_URL, permanent: false },
    ];
  },
};

export default nextConfig;
