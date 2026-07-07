import Link from "next/link";
import { desc, eq, getDb, isDbConfigured, client, mission } from "@duleme/database";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  cadrage: "bg-brass/15 text-brass",
  en_cours: "bg-ok/15 text-ok",
  livraison: "bg-accent/15 text-accent",
  archivee: "bg-mut/15 text-mut",
};
const STATUS_LABEL: Record<string, string> = {
  cadrage: "Cadrage",
  en_cours: "En cours",
  livraison: "Livraison",
  archivee: "Archivée",
};

export default async function MissionsPage() {
  const rows = isDbConfigured()
    ? await getDb()
        .select({
          id: mission.id,
          title: mission.title,
          status: mission.status,
          clientId: client.id,
          clientName: client.name,
          company: client.company,
        })
        .from(mission)
        .innerJoin(client, eq(mission.clientId, client.id))
        .orderBy(desc(mission.createdAt))
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Delivery OS · missions
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-semibold">Missions</h1>
        </div>
        <span className="rounded-full bg-bord/10 px-3 py-1 text-[12.5px] font-semibold text-accent">
          {rows.length} mission{rows.length > 1 ? "s" : ""}
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-line bg-card p-10 text-center text-sm text-mut">
          Aucune mission. Créez-en une depuis la fiche d&apos;un client.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {rows.map((m) => (
            <Link
              key={m.id}
              href={`/missions/${m.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-card p-4 shadow-card transition-colors hover:border-bord"
            >
              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-[12.5px] text-mut">
                  {m.clientName}
                  {m.company ? ` · ${m.company}` : ""}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  STATUS_STYLE[m.status] ?? "bg-mut/15 text-mut"
                }`}
              >
                {STATUS_LABEL[m.status] ?? m.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
