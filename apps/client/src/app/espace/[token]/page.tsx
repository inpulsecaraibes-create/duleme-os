import { notFound } from "next/navigation";
import { verifyClientToken } from "@duleme/auth";
import {
  and,
  asc,
  client,
  desc,
  eq,
  getDb,
  isDbConfigured,
  isNull,
  lte,
  message,
  mission,
  survey,
} from "@duleme/database";
import { isGoogleConfigured, listClientDocuments } from "@duleme/connectors";
import { MessageForm } from "./MessageForm";
import { DocumentUpload } from "./DocumentUpload";
import { submitSurvey } from "./actions";
import { SURVEY_META, SURVEY_QUESTIONS, isSurveyPhase } from "./surveys";

export const dynamic = "force-dynamic";

function lines(v: string | null): string[] {
  return (v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-lg border border-line bg-card p-6 shadow-card sm:p-7">
      <h2 className="font-serif text-lg font-semibold text-accent sm:text-xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function EspacePage({
  params,
}: {
  params: { token: string };
}) {
  const clientId = verifyClientToken(params.token);
  if (!clientId || !isDbConfigured()) notFound();

  const [c] = await getDb()
    .select()
    .from(client)
    .where(eq(client.id, clientId))
    .limit(1);
  if (!c) notFound();

  const missions = await getDb()
    .select()
    .from(mission)
    .where(eq(mission.clientId, clientId))
    .orderBy(desc(mission.createdAt));

  const thread = await getDb()
    .select()
    .from(message)
    .where(eq(message.clientId, clientId))
    .orderBy(asc(message.createdAt));

  const dueSurveys = await getDb()
    .select()
    .from(survey)
    .where(
      and(
        eq(survey.clientId, clientId),
        isNull(survey.answeredAt),
        lte(survey.dueAt, new Date()),
      ),
    )
    .orderBy(asc(survey.dueAt));
  const activeSurvey =
    dueSurveys.find((s) => isSurveyPhase(s.phase)) ?? null;

  const requested = missions.flatMap((m) => lines(m.documentsRequested));
  const received = missions.flatMap((m) => lines(m.documentsReceived));
  const dossierUrl = missions.find((m) => m.dossierUrl)?.dossierUrl ?? null;

  const driveDocs = isGoogleConfigured()
    ? await listClientDocuments(c.name).catch(() => [])
    : [];

  const fmt = (d: Date) =>
    new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(d));

  return (
    <main className="mx-auto max-w-[760px] px-6 py-12">
      <header className="border-b border-line pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
          Espace client · DULEME AND CIE
        </p>
        <h1 className="mt-2 font-serif text-[26px] font-semibold sm:text-[32px]">
          Bonjour {c.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-[14px] text-mut">
          Votre espace privé pour suivre notre collaboration.
        </p>
      </header>

      {/* Questionnaire de témoignage (si dû) */}
      {activeSurvey && isSurveyPhase(activeSurvey.phase) && (
        <section className="mt-6 rounded-lg border border-brass/40 bg-glow/25 p-6 shadow-card sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Votre regard
          </p>
          <h2 className="mt-1 font-serif text-lg font-semibold text-accent sm:text-xl">
            {SURVEY_META[activeSurvey.phase].title}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-mut">
            {SURVEY_META[activeSurvey.phase].intro}
          </p>
          <form action={submitSurvey} className="mt-5 flex flex-col gap-4">
            <input type="hidden" name="token" value={params.token} />
            <input type="hidden" name="surveyId" value={activeSurvey.id} />
            <input type="hidden" name="phase" value={activeSurvey.phase} />
            {SURVEY_QUESTIONS[activeSurvey.phase].map((q, i) => (
              <div key={i}>
                <label className="block text-[14px] font-medium text-ink">
                  {q}
                </label>
                <textarea
                  name={`a${i}`}
                  rows={3}
                  className="mt-1.5 w-full resize-y rounded border border-line bg-paper2 p-3 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
                />
              </div>
            ))}
            <label className="flex items-start gap-2 text-[13px] text-mut">
              <input
                type="checkbox"
                name="consent"
                className="mt-0.5 h-4 w-4 accent-bord"
              />
              J&apos;autorise DULEME AND CIE à publier mon témoignage, de façon
              anonymisée.
            </label>
            <input
              name="attribution"
              placeholder="Comment vous présenter ? (ex. Dirigeante de PME)"
              className="w-full rounded border border-line bg-paper2 p-2.5 text-[13.5px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass"
            />
            <button
              type="submit"
              className="self-start rounded-md bg-bord px-5 py-2.5 text-[13px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
            >
              Envoyer mes réponses
            </button>
          </form>
        </section>
      )}

      {/* Rendez-vous */}
      <Section title="Mes rendez-vous">
        <p className="text-[14px] leading-relaxed text-mut">
          Vos prochains rendez-vous apparaîtront ici — date, heure, lieu, lien
          Google Meet et ajout à votre agenda. Nous les organisons ensemble lors
          de nos premiers échanges.
        </p>
      </Section>

      {/* Documents */}
      <Section title="Mes documents">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-mut">
              À transmettre
            </p>
            <ul className="mt-2 space-y-2">
              {requested.length === 0 && (
                <li className="text-[13px] text-mut">— Rien pour l&apos;instant</li>
              )}
              {requested.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded border border-line bg-paper2 px-3 py-2 text-[13.5px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-warn" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-mut">
              Transmis
            </p>
            <ul className="mt-2 space-y-2">
              {received.length === 0 && driveDocs.length === 0 && (
                <li className="text-[13px] text-mut">— Rien pour l&apos;instant</li>
              )}
              {driveDocs.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-2 rounded border border-line bg-paper2 px-3 py-2 text-[13.5px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" />
                  {f.webViewLink ? (
                    <a
                      href={f.webViewLink}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate text-accent underline-offset-2 hover:underline"
                    >
                      {f.name}
                    </a>
                  ) : (
                    <span className="truncate">{f.name}</span>
                  )}
                </li>
              ))}
              {received.map((d, i) => (
                <li
                  key={`r${i}`}
                  className="flex items-center gap-2 rounded border border-line bg-paper2 px-3 py-2 text-[13.5px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dépôt de document */}
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[13.5px] font-medium text-ink">
            Déposer un document
          </p>
          {isGoogleConfigured() ? (
            <>
              <p className="mt-0.5 text-[12.5px] text-mut">
                Il est enregistré en sécurité et nous sommes prévenus aussitôt.
              </p>
              <DocumentUpload token={params.token} />
            </>
          ) : (
            <p className="mt-1 text-[12.5px] italic text-mut">
              Le dépôt en ligne sera bientôt disponible. En attendant, transmettez
              vos documents par email.
            </p>
          )}
        </div>
      </Section>

      {/* Dossier DULEME */}
      <Section title="Mon Dossier DULEME™">
        {dossierUrl ? (
          <a
            href={dossierUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-bord px-5 py-2.5 text-[13px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
          >
            Consulter mon Dossier DULEME™ ↗
          </a>
        ) : (
          <p className="text-[14px] leading-relaxed text-mut">
            Votre Dossier DULEME™ est en cours de préparation. C&apos;est le
            livrable central de notre travail — vous pourrez le consulter, le
            télécharger et suivre ses versions ici même.
          </p>
        )}
      </Section>

      {/* Messages */}
      <Section title="Messages">
        {thread.length > 0 && (
          <div className="mb-5 flex flex-col gap-3">
            {thread.map((m) => {
              const mine = m.sender === "client";
              return (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded-lg border px-4 py-3 ${
                    mine
                      ? "self-end border-bord/30 bg-bord/5"
                      : "self-start border-line bg-paper2"
                  }`}
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-mut">
                    {mine ? "Vous" : "Téféry"}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed text-ink">
                    {m.body}
                  </p>
                  <p className="mt-1.5 text-[11px] text-mut">{fmt(m.createdAt)}</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="text-[13.5px] text-mut">
          Une question, une précision&nbsp;? Écrivez-nous — Téféry vous répond
          personnellement.
        </p>
        <MessageForm token={params.token} />
      </Section>

      <footer className="mt-10 text-center text-[11.5px] text-mut">
        © {new Date().getFullYear()} DULEME AND CIE — Espace confidentiel
      </footer>
    </main>
  );
}
