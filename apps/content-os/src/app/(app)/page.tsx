import { asc, contentPiece, desc, eq, getDb, isDbConfigured } from "@duleme/database";
import { aiProviderLabel, isAiConfigured } from "@duleme/connectors";
import {
  addManual,
  deletePiece,
  generateFromTheme,
  validateSelected,
} from "./actions";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // la génération IA peut prendre ~30 s

const CHANNEL: Record<string, { label: string; cls: string }> = {
  site: { label: "Article site", cls: "bg-bord/10 text-accent" },
  linkedin: { label: "LinkedIn", cls: "bg-brass/15 text-brass" },
  instagram: { label: "Instagram", cls: "bg-accent/10 text-accent" },
  newsletter: { label: "Newsletter", cls: "bg-ok/15 text-ok" },
};

const inputCls =
  "w-full rounded border border-line bg-paper2 p-2.5 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";

function fmt(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(d));
}

export default async function ContentPage() {
  const all = isDbConfigured()
    ? await getDb().select().from(contentPiece).orderBy(desc(contentPiece.createdAt))
    : [];
  const drafts = all.filter((p) => p.status === "draft");
  const social = all.filter((p) => p.status === "validated");
  const scheduled = all
    .filter((p) => p.status === "scheduled")
    .sort((a, b) => (a.scheduledFor! > b.scheduledFor! ? 1 : -1));
  const aiOn = isAiConfigured();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-[28px] font-semibold">Atelier de contenu</h1>
        <p className="mt-1 max-w-[70ch] text-sm text-mut">
          Une idée → un article, un post LinkedIn et un post Instagram. Tu valides
          ce que tu veux (même une dizaine d&apos;un coup) ; les articles se
          <strong> programment tout seuls, 2 par mois</strong> (le 1er et le 15).
        </p>
      </div>

      {/* Générer */}
      <section className="rounded-lg border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <p className="font-serif text-lg font-semibold">Nouvelle idée</p>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              aiOn ? "bg-ok/15 text-ok" : "bg-warn/15 text-warn"
            }`}
          >
            {aiOn ? aiProviderLabel() : "IA à connecter"}
          </span>
        </div>

        {aiOn ? (
          <form action={generateFromTheme} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              name="theme"
              required
              placeholder="Ex. « Pourquoi vouloir recruter cache souvent une autre décision »"
              className={inputCls}
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-bord px-5 py-2.5 text-[13px] font-semibold text-[#f6efe6] transition-colors hover:bg-bord-deep"
            >
              Générer les 3 contenus
            </button>
          </form>
        ) : (
          <p className="mt-3 rounded border border-dashed border-line bg-paper2 p-3 text-[13px] text-mut">
            Connecte une clé IA (Anthropic ou OpenAI) pour la génération
            automatique. En attendant, tu peux ajouter un contenu à la main
            ci-dessous.
          </p>
        )}

        {/* Ajout manuel */}
        <details className="mt-4">
          <summary className="cursor-pointer text-[12.5px] text-mut hover:text-accent">
            Ajouter un contenu à la main
          </summary>
          <form action={addManual} className="mt-3 grid gap-2 sm:grid-cols-[160px_1fr]">
            <select name="channel" className={inputCls}>
              <option value="site">Article site</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="newsletter">Newsletter</option>
            </select>
            <input name="title" placeholder="Titre (optionnel)" className={inputCls} />
            <input type="hidden" name="theme" value="Ajout manuel" />
            <textarea
              name="body"
              required
              rows={3}
              placeholder="Le contenu…"
              className={`${inputCls} sm:col-span-2`}
            />
            <button
              type="submit"
              className="justify-self-start rounded-md border border-line px-4 py-2 text-[13px] font-medium text-accent hover:border-bord sm:col-span-2"
            >
              Ajouter
            </button>
          </form>
        </details>
      </section>

      {/* À valider */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">À valider</h2>
          <form id="valform" action={validateSelected}>
            <button
              type="submit"
              disabled={drafts.length === 0}
              className="rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep disabled:opacity-50"
            >
              Valider la sélection
            </button>
          </form>
        </div>

        {drafts.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line bg-card p-8 text-center text-sm text-mut">
            Aucun brouillon. Génère une idée ci-dessus.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {drafts.map((p) => (
              <form
                action={deletePiece}
                key={p.id}
                className="flex items-start gap-3 rounded-lg border border-line bg-card p-4 shadow-card"
              >
                <input type="hidden" name="id" value={p.id} />
                <input
                  type="checkbox"
                  name="ids"
                  value={p.id}
                  form="valform"
                  defaultChecked
                  className="mt-1 h-4 w-4 shrink-0 accent-bord"
                  aria-label="Sélectionner"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      CHANNEL[p.channel]?.cls ?? "bg-mut/15 text-mut"
                    }`}
                  >
                    {CHANNEL[p.channel]?.label ?? p.channel}
                  </span>
                  {p.title && (
                    <p className="mt-1.5 font-serif font-semibold text-accent">
                      {p.title}
                    </p>
                  )}
                  <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink/85 line-clamp-6">
                    {p.body}
                  </p>
                  {p.visualBrief && (
                    <p className="mt-2 text-[12px] italic text-mut">
                      🎨 Visuel : {p.visualBrief}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded border border-line px-2.5 py-1 text-[12px] text-mut transition-colors hover:border-alert hover:text-alert"
                >
                  Supprimer
                </button>
              </form>
            ))}
          </div>
        )}
      </section>

      {/* Prêts à publier — réseaux */}
      {social.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold">
            Prêts à publier — réseaux
          </h2>
          <p className="mt-1 text-[13px] text-mut">
            Validés. À copier-coller sur LinkedIn / Instagram (avec le brief
            visuel).
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {social.map((p) => (
              <div key={p.id} className="rounded-lg border border-line bg-card p-4 shadow-card">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    CHANNEL[p.channel]?.cls ?? "bg-mut/15 text-mut"
                  }`}
                >
                  {CHANNEL[p.channel]?.label ?? p.channel}
                </span>
                <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-relaxed">
                  {p.body}
                </p>
                {p.visualBrief && (
                  <p className="mt-2 text-[12px] italic text-mut">🎨 {p.visualBrief}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Programmés — site */}
      <section>
        <h2 className="font-serif text-xl font-semibold">Programmés — site</h2>
        <p className="mt-1 text-[13px] text-mut">
          Articles à paraître automatiquement sur le site, 2 par mois.
        </p>
        {scheduled.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-line bg-card p-6 text-center text-sm text-mut">
            Rien de programmé pour l&apos;instant.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {scheduled.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-card p-4 shadow-card"
              >
                <div className="min-w-0">
                  <p className="truncate font-serif font-semibold">{p.title}</p>
                  <p className="text-[12px] text-mut">{p.theme}</p>
                </div>
                <span className="shrink-0 rounded-full bg-brass/15 px-3 py-1 text-[12px] font-semibold text-brass">
                  {fmt(p.scheduledFor)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
