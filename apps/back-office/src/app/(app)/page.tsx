import {
  contactRequest,
  desc,
  getDb,
  isDbConfigured,
} from "@duleme/database";
import { createClientFromRequest } from "./clients/actions";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function DashboardPage() {
  const configured = isDbConfigured();
  const rows = configured
    ? await getDb()
        .select()
        .from(contactRequest)
        .orderBy(desc(contactRequest.createdAt))
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Relationship OS · entrées
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-semibold">
            Demandes de rendez-vous
          </h1>
        </div>
        <span className="rounded-full bg-bord/10 px-3 py-1 text-[12.5px] font-semibold text-accent">
          {rows.length} demande{rows.length > 1 ? "s" : ""}
        </span>
      </div>

      {!configured ? (
        <p className="mt-8 rounded-lg border border-line bg-card p-6 text-sm text-mut">
          Base de données non configurée (DATABASE_URL manquant).
        </p>
      ) : rows.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-line bg-card p-10 text-center">
          <p className="font-serif text-lg">Aucune demande pour l&apos;instant.</p>
          <p className="mt-2 text-sm text-mut">
            Les demandes envoyées depuis le formulaire du site apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-mut">
                  <th className="px-4 py-3 font-semibold">Reçu le</th>
                  <th className="px-4 py-3 font-semibold">Nom</th>
                  <th className="px-4 py-3 font-semibold">Entreprise</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Rappel</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-line/70 align-top text-[13.5px] last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-mut">
                      {formatDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.name || "—"}</td>
                    <td className="px-4 py-3">{r.company || "—"}</td>
                    <td className="px-4 py-3">
                      {r.email ? (
                        <a
                          href={`mailto:${r.email}`}
                          className="text-accent underline-offset-2 hover:underline"
                        >
                          {r.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="max-w-[360px] px-4 py-3 text-mut">
                      {r.message}
                    </td>
                    <td className="px-4 py-3">
                      {r.callbackRequested ? (
                        <span className="rounded-full bg-ok/15 px-2 py-0.5 text-[11px] font-semibold text-ok">
                          Oui
                        </span>
                      ) : (
                        <span className="text-mut">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <form action={createClientFromRequest}>
                        <input type="hidden" name="requestId" value={r.id} />
                        <button
                          type="submit"
                          className="rounded-md border border-line px-3 py-1.5 text-[12px] font-medium text-accent transition-colors hover:border-bord"
                        >
                          → Créer le client
                        </button>
                      </form>
                    </td>
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
