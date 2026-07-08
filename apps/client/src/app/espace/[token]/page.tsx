import { notFound } from "next/navigation";
import { verifyClientToken } from "@duleme/auth";
import {
  asc,
  client,
  desc,
  eq,
  getDb,
  isDbConfigured,
  message,
  mission,
} from "@duleme/database";
import { MessageForm } from "./MessageForm";

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

  const requested = missions.flatMap((m) => lines(m.documentsRequested));
  const received = missions.flatMap((m) => lines(m.documentsReceived));
  const dossierUrl = missions.find((m) => m.dossierUrl)?.dossierUrl ?? null;

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
        {requested.length === 0 && received.length === 0 ? (
          <p className="text-[14px] text-mut">
            Aucun document demandé pour l&apos;instant. Vous serez prévenu·e
            lorsque nous en aurons besoin.
          </p>
        ) : (
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
                {received.length === 0 && (
                  <li className="text-[13px] text-mut">— Rien pour l&apos;instant</li>
                )}
                {received.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded border border-line bg-paper2 px-3 py-2 text-[13.5px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <p className="mt-4 text-[12.5px] italic text-mut">
          Le dépôt de documents en ligne arrive prochainement. En attendant, vous
          pouvez nous les transmettre par email.
        </p>
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
