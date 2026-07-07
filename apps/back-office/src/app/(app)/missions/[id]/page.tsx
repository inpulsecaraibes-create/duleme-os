import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, getDb, isDbConfigured, client, mission } from "@duleme/database";
import { ConfirmSubmit } from "@/components/ConfirmSubmit";
import { deleteMission, updateMission } from "../actions";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded border border-line bg-paper2 p-2.5 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";
const labelCls =
  "block text-[11px] font-medium uppercase tracking-wide text-mut";
const saveBtn =
  "rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep";

function toDateInput(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

/** Bloc « à venir via connecteur » — rend visible un champ de la vision
 *  pas encore branché sur son outil source (Agenda / Drive / Fireflies). */
function Pending({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-paper2 p-4">
      <p className="text-[13px] font-semibold text-ink">{title}</p>
      <p className="mt-1 text-[12px] text-mut">{note}</p>
    </div>
  );
}

export default async function MissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isDbConfigured()) notFound();
  const [m] = await getDb()
    .select()
    .from(mission)
    .where(eq(mission.id, params.id))
    .limit(1);
  if (!m) notFound();
  const [c] = await getDb()
    .select()
    .from(client)
    .where(eq(client.id, m.clientId))
    .limit(1);

  return (
    <div>
      <Link
        href="/missions"
        className="text-[12.5px] text-mut transition-colors hover:text-accent"
      >
        ← Missions
      </Link>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-[28px] font-semibold">{m.title}</h1>
          {c ? (
            <Link
              href={`/clients/${c.id}`}
              className="text-[13px] text-accent underline-offset-2 hover:underline"
            >
              {c.name}
              {c.company ? ` · ${c.company}` : ""}
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ÉDITION */}
        <form
          action={updateMission}
          className="rounded-lg border border-line bg-card p-5 shadow-card"
        >
          <input type="hidden" name="id" value={m.id} />
          <div className="grid gap-4">
            <div>
              <label className={labelCls}>Intitulé *</label>
              <input
                name="title"
                required
                defaultValue={m.title}
                className={`mt-1 ${inputCls}`}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Statut</label>
                <select
                  name="status"
                  defaultValue={m.status}
                  className={`mt-1 ${inputCls}`}
                >
                  <option value="cadrage">Cadrage</option>
                  <option value="en_cours">En cours</option>
                  <option value="livraison">Livraison</option>
                  <option value="archivee">Archivée</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Début</label>
                <input
                  name="startDate"
                  type="date"
                  defaultValue={toDateInput(m.startDate)}
                  className={`mt-1 ${inputCls}`}
                />
              </div>
              <div>
                <label className={labelCls}>Échéance</label>
                <input
                  name="dueDate"
                  type="date"
                  defaultValue={toDateInput(m.dueDate)}
                  className={`mt-1 ${inputCls}`}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Documents demandés</label>
                <textarea
                  name="documentsRequested"
                  rows={4}
                  defaultValue={m.documentsRequested ?? ""}
                  placeholder="Un document par ligne…"
                  className={`mt-1 ${inputCls} resize-y`}
                />
              </div>
              <div>
                <label className={labelCls}>Documents reçus</label>
                <textarea
                  name="documentsReceived"
                  rows={4}
                  defaultValue={m.documentsReceived ?? ""}
                  className={`mt-1 ${inputCls} resize-y`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Livrables</label>
              <textarea
                name="deliverables"
                rows={2}
                defaultValue={m.deliverables ?? ""}
                className={`mt-1 ${inputCls} resize-y`}
              />
            </div>
            <div>
              <label className={labelCls}>Notes internes</label>
              <textarea
                name="internalNotes"
                rows={3}
                defaultValue={m.internalNotes ?? ""}
                className={`mt-1 ${inputCls} resize-y`}
              />
            </div>
            <div>
              <label className={labelCls}>
                Dossier DULEME™ — lien Google Drive (02 Dossier DULEME)
              </label>
              <input
                name="dossierUrl"
                defaultValue={m.dossierUrl ?? ""}
                placeholder="https://drive.google.com/…"
                className={`mt-1 ${inputCls}`}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button type="submit" className={saveBtn}>
              Enregistrer
            </button>
            <form action={deleteMission}>
              <input type="hidden" name="id" value={m.id} />
              <input type="hidden" name="clientId" value={m.clientId} />
              <ConfirmSubmit message="Supprimer cette mission ?">
                Supprimer
              </ConfirmSubmit>
            </form>
          </div>
        </form>

        {/* CONNECTEURS (à brancher) */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Sources externes
          </p>
          {m.dossierUrl ? (
            <a
              href={m.dossierUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line bg-card p-4 text-[13px] font-semibold text-accent shadow-card transition-colors hover:border-bord"
            >
              Ouvrir le Dossier DULEME™ ↗
            </a>
          ) : null}
          <Pending
            title="Rendez-vous"
            note="Se synchronisera avec Google Agenda + Meet à la mise en place du connecteur."
          />
          <Pending
            title="Comptes-rendus"
            note="Transcriptions et résumés Fireflies apparaîtront ici après chaque RDV."
          />
          <Pending
            title="Historique"
            note="Journal automatique des événements de la mission (à venir)."
          />
        </div>
      </div>
    </div>
  );
}
