import Link from "next/link";
import { notFound } from "next/navigation";
import {
  desc,
  eq,
  getDb,
  isDbConfigured,
  client,
  mission,
} from "@duleme/database";
import { ConfirmSubmit } from "@/components/ConfirmSubmit";
import {
  createMission,
  deleteClient,
  updateClient,
} from "../actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded border border-line bg-paper2 p-2.5 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";
const labelCls =
  "block text-[11px] font-medium uppercase tracking-wide text-mut";
const saveBtn =
  "rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep";

const MISSION_STATUS: Record<string, string> = {
  cadrage: "bg-brass/15 text-brass",
  en_cours: "bg-ok/15 text-ok",
  livraison: "bg-accent/15 text-accent",
  archivee: "bg-mut/15 text-mut",
};

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isDbConfigured()) notFound();
  const [c] = await getDb()
    .select()
    .from(client)
    .where(eq(client.id, params.id))
    .limit(1);
  if (!c) notFound();

  const missions = await getDb()
    .select()
    .from(mission)
    .where(eq(mission.clientId, c.id))
    .orderBy(desc(mission.createdAt));

  return (
    <div>
      <Link
        href="/clients"
        className="text-[12.5px] text-mut transition-colors hover:text-accent"
      >
        ← Clients &amp; prospects
      </Link>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-[28px] font-semibold">{c.name}</h1>
        {c.driveFolderUrl ? (
          <a
            href={c.driveFolderUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-3 py-1.5 text-[12.5px] text-accent transition-colors hover:border-bord"
          >
            Ouvrir le dossier Drive ↗
          </a>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* FICHE */}
        <form
          action={updateClient}
          className="rounded-lg border border-line bg-card p-5 shadow-card"
        >
          <input type="hidden" name="id" value={c.id} />
          <p className="font-serif text-lg font-semibold">Fiche</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Nom *</label>
              <input
                name="name"
                required
                defaultValue={c.name}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div>
              <label className={labelCls}>Entreprise</label>
              <input
                name="company"
                defaultValue={c.company ?? ""}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                name="email"
                type="email"
                defaultValue={c.email ?? ""}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div>
              <label className={labelCls}>Téléphone</label>
              <input
                name="phone"
                defaultValue={c.phone ?? ""}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select
                name="type"
                defaultValue={c.type}
                className={`mt-1 ${inputCls}`}
              >
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Statut</label>
              <select
                name="status"
                defaultValue={c.status}
                className={`mt-1 ${inputCls}`}
              >
                <option value="nouveau">Nouveau</option>
                <option value="actif">Actif</option>
                <option value="en_pause">En pause</option>
                <option value="clos">Clos</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>
                Dossier Google Drive (URL) — source officielle des documents
              </label>
              <input
                name="driveFolderUrl"
                defaultValue={c.driveFolderUrl ?? ""}
                placeholder="https://drive.google.com/…"
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Notes internes</label>
              <textarea
                name="notes"
                rows={3}
                defaultValue={c.notes ?? ""}
                className={`mt-1 ${inputCls} resize-y`}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button type="submit" className={saveBtn}>
              Enregistrer
            </button>
            <form action={deleteClient}>
              <input type="hidden" name="id" value={c.id} />
              <ConfirmSubmit message="Supprimer cette fiche et toutes ses missions ?">
                Supprimer
              </ConfirmSubmit>
            </form>
          </div>
        </form>

        {/* MISSIONS */}
        <div>
          <form
            action={createMission}
            className="rounded-lg border border-dashed border-line bg-card p-5"
          >
            <input type="hidden" name="clientId" value={c.id} />
            <p className="font-serif text-lg font-semibold">Nouvelle mission</p>
            <div className="mt-3">
              <input
                name="title"
                required
                placeholder="Ex. Cadrage stratégique — trimestre 3"
                className={inputCls}
              />
            </div>
            <button type="submit" className={`mt-3 ${saveBtn}`}>
              Créer la mission
            </button>
          </form>

          <div className="mt-5 flex flex-col gap-3">
            {missions.length === 0 ? (
              <p className="rounded-lg border border-line bg-card p-5 text-center text-[13px] text-mut">
                Aucune mission pour ce client.
              </p>
            ) : (
              missions.map((m) => (
                <Link
                  key={m.id}
                  href={`/missions/${m.id}`}
                  className="flex items-center justify-between rounded-lg border border-line bg-card p-4 shadow-card transition-colors hover:border-bord"
                >
                  <span className="font-medium">{m.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      MISSION_STATUS[m.status] ?? "bg-mut/15 text-mut"
                    }`}
                  >
                    {m.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
