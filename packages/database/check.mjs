// Vérification rapide de la base (lecture seule). À lancer avec :
//   node --env-file=../../.env.local check.mjs
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const [{ n }] = await sql`select count(*)::int as n from contact_request`;
console.log(`contact_request : ${n} ligne(s)`);
const rows = await sql`
  select email, company, callback_requested, created_at
  from contact_request
  order by created_at desc
  limit 3`;
console.table(rows);
await sql.end();
