import Link from "next/link";
import { desc, getDb, isDbConfigured, client } from "@duleme/database";
import { createClient } from "./actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded border border-line bg-paper2 p-2.5 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";
const labelCls =
  "block text-[11px] font-medium uppercase tracking-wide text-mut";
const saveBtn =
  "rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep";

const TYPE_LABEL: Record<string, string> = {
  prospect: "Prospect",
  client: "Client",
};
const STATUS_STYLE: Record<string, string> = {
  nouveau: "bg-brass/15 text-brass",
  actif: "bg-ok/15 text-ok",
  en_pause: "bg-warn/15 text-warn",
  clos: "bg-mut/15 text-mut",
};

export default async function ClientsPage() {
  const rows = isDbConfigured()
    ? await getDb().select().from(client).orderBy(desc(client.createdAt))
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Relationship OS · répertoire
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-semibold">
            Clients &amp; prospects
          </h1>
        </div>
        <span className="rounded-full bg-bord/10 px-3 py-1 text-[12.5px] font-semibold text-accent">
          {rows.length} fiche{rows.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* AJOUTER */}
      <form
        action={createClient}
        className="mt-6 rounded-lg border border-dashed border-line bg-card p-5"
      >
        <p className="font-serif text-lg font-semibold">Nouvelle fiche</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="c-name">
              Nom *
            </label>
            <input id="c-name" name="name" required className={`mt-1 ${inputCls}`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="c-company">
              Entreprise
            </label>
            <input id="c-company" name="company" className={`mt-1 ${inputCls}`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="c-email">
              Email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              className={`mt-1 ${inputCls}`}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="c-phone">
              Téléphone
            </label>
            <input id="c-phone" name="phone" className={`mt-1 ${inputCls}`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="c-type">
              Type
            </label>
            <select id="c-type" name="type" className={`mt-1 ${inputCls}`}>
              <option value="prospect">Prospect</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className={saveBtn}>
              Créer la fiche
            </button>
          </div>
        </div>
      </form>

      {/* LISTE */}
      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-line bg-card p-10 text-center text-sm text-mut">
          Aucune fiche pour l&apos;instant. Convertissez une demande de RDV ou
          créez une fiche ci-dessus.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-line bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-mut">
                  <th className="px-4 py-3 font-semibold">Nom</th>
                  <th className="px-4 py-3 font-semibold">Entreprise</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-line/70 text-[13.5px] last:border-0 hover:bg-paper2"
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/clients/${c.id}`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{c.company || "—"}</td>
                    <td className="px-4 py-3 text-mut">
                      {TYPE_LABEL[c.type] ?? c.type}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          STATUS_STYLE[c.status] ?? "bg-mut/15 text-mut"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.email || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
