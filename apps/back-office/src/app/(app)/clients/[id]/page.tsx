import Link from "next/link";
import { notFound } from "next/navigation";
import {
  asc,
  desc,
  eq,
  getDb,
  isDbConfigured,
  client,
  message,
  mission,
  survey,
} from "@duleme/database";
import { createClientToken } from "@duleme/auth";
import { ConfirmSubmit } from "@/components/ConfirmSubmit";
import { CopyField } from "@/components/CopyField";
import {
  createMission,
  deleteClient,
  publishSurveyAsTestimonial,
  replyToClient,
  updateClient,
} from "../actions";

const SURVEY_LABEL: Record<string, string> = {
  t0: "Démarrage",
  m1: "1 mois",
  m3: "3 mois",
};

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

  const thread = await getDb()
    .select()
    .from(message)
    .where(eq(message.clientId, c.id))
    .orderBy(asc(message.createdAt));

  const surveys = await getDb()
    .select()
    .from(survey)
    .where(eq(survey.clientId, c.id))
    .orderBy(asc(survey.dueAt));

  const espaceBase = process.env.CLIENT_APP_URL || "http://localhost:3002";
  const espaceUrl = `${espaceBase}/espace/${createClientToken(c.id)}`;
  const fmtMsg = (d: Date) =>
    new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(d));

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

      {/* ACCÈS ESPACE CLIENT */}
      <div className="mt-6 rounded-lg border border-line bg-card p-5 shadow-card">
        <p className="font-serif text-lg font-semibold">Espace client</p>
        <p className="mt-1 text-[13px] text-mut">
          Lien personnel et privé à transmettre à {c.name.split(" ")[0]}. Il
          permet d&apos;accéder à ses rendez-vous, documents, Dossier DULEME et
          à la messagerie. Aucun mot de passe.
        </p>
        <div className="mt-3">
          <CopyField value={espaceUrl} />
        </div>
      </div>

      {/* MESSAGERIE */}
      <div className="mt-6 rounded-lg border border-line bg-card p-5 shadow-card">
        <p className="font-serif text-lg font-semibold">Messagerie</p>
        {thread.length > 0 ? (
          <div className="mt-4 flex flex-col gap-3">
            {thread.map((m) => {
              const cabinet = m.sender === "cabinet";
              return (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-lg border px-4 py-2.5 ${
                    cabinet
                      ? "self-end border-bord/30 bg-bord/5"
                      : "self-start border-line bg-paper2"
                  }`}
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-mut">
                    {cabinet ? "Téféry" : c.name.split(" ")[0]}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink">
                    {m.body}
                  </p>
                  <p className="mt-1 text-[11px] text-mut">{fmtMsg(m.createdAt)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 text-[13px] text-mut">
            Aucun message pour l&apos;instant.
          </p>
        )}
        <form action={replyToClient} className="mt-4">
          <input type="hidden" name="clientId" value={c.id} />
          <textarea
            name="body"
            required
            rows={3}
            placeholder={`Répondre à ${c.name.split(" ")[0]}…`}
            className="w-full resize-y rounded border border-line bg-paper2 p-3 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
          />
          <button
            type="submit"
            className="mt-3 rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep"
          >
            Envoyer{c.email ? "" : " (⚠ pas d'email client)"}
          </button>
        </form>
      </div>

      {/* QUESTIONNAIRES DE TÉMOIGNAGE */}
      <div className="mt-6 rounded-lg border border-line bg-card p-5 shadow-card">
        <p className="font-serif text-lg font-semibold">
          Questionnaires de témoignage
        </p>
        <p className="mt-1 text-[13px] text-mut">
          Trois temps (démarrage · 1 mois · 3 mois), créés au démarrage de la
          première mission. Les réponses avec accord peuvent devenir un
          témoignage.
        </p>
        {surveys.length === 0 ? (
          <p className="mt-3 text-[13px] text-mut">
            Aucun questionnaire — ils se créent au démarrage d&apos;une mission.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {surveys.map((sv) => {
              const answered = Boolean(sv.answeredAt);
              let ans: { q: string; a: string }[] = [];
              try {
                ans = sv.answers ? JSON.parse(sv.answers) : [];
              } catch {
                ans = [];
              }
              return (
                <div
                  key={sv.id}
                  className="rounded-lg border border-line bg-paper2 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-semibold">
                      {SURVEY_LABEL[sv.phase] ?? sv.phase}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        answered ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
                      }`}
                    >
                      {answered ? "Répondu" : "En attente"}
                    </span>
                  </div>
                  {answered ? (
                    <div className="mt-2 space-y-2">
                      {ans.map((x, i) => (
                        <div key={i}>
                          <p className="text-[12px] font-medium text-mut">
                            {x.q}
                          </p>
                          <p className="whitespace-pre-wrap text-[13.5px]">
                            {x.a || "—"}
                          </p>
                        </div>
                      ))}
                      <p className="text-[12px] text-mut">
                        Accord de publication : {sv.consentPublish ? "oui" : "non"}
                        {sv.attribution ? ` · ${sv.attribution}` : ""}
                      </p>
                      {sv.consentPublish && (
                        <form action={publishSurveyAsTestimonial}>
                          <input type="hidden" name="surveyId" value={sv.id} />
                          <button
                            type="submit"
                            className="mt-1 rounded-md border border-line px-3 py-1.5 text-[12.5px] font-medium text-accent transition-colors hover:border-bord"
                          >
                            Publier comme témoignage (brouillon)
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-[12.5px] text-mut">
                      Disponible à partir du {fmtMsg(sv.dueAt)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
