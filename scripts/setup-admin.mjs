import crypto from "node:crypto";
import { readFileSync, appendFileSync } from "node:fs";

const path = ".env.local";
let env = "";
try {
  env = readFileSync(path, "utf8");
} catch {
  /* fichier absent : on le complètera */
}

const has = (k) => new RegExp("^" + k + "=", "m").test(env);
const add = [];
if (!has("ADMIN_EMAIL")) add.push("ADMIN_EMAIL=inpulsecaraibes@gmail.com");
if (!has("ADMIN_PASSWORD"))
  add.push("ADMIN_PASSWORD=" + crypto.randomBytes(9).toString("base64url"));
if (!has("AUTH_SECRET"))
  add.push("AUTH_SECRET=" + crypto.randomBytes(32).toString("hex"));

if (add.length) {
  appendFileSync(path, "\n# --- Back Office (admin) ---\n" + add.join("\n") + "\n");
}

env = readFileSync(path, "utf8");
const val = (k) => (new RegExp("^" + k + "=(.*)$", "m").exec(env)?.[1] ?? "").trim();
console.log("EMAIL=" + val("ADMIN_EMAIL"));
console.log("PASSWORD=" + val("ADMIN_PASSWORD"));
