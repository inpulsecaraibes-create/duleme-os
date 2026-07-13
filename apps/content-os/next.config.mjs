import { config } from "dotenv";

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
};

export default nextConfig;
