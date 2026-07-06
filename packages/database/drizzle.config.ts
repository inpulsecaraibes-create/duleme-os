import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Charge le .env.local de la racine du monorepo.
config({ path: "../../.env.local" });

// Les migrations utilisent la connexion DIRECTE (port 5432 sur Supabase),
// pas le pooler. L'URL de secours permet à `generate` (hors-ligne) de tourner.
const url =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgres://user:pass@localhost:5432/duleme";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  casing: "snake_case",
  strict: true,
});
