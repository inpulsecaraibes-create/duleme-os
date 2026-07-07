import { asc, getDb, isDbConfigured, testimonial } from "@duleme/database";
import {
  createTestimonial,
  deleteTestimonial,
  togglePublished,
  updateTestimonial,
} from "./actions";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded border border-line bg-paper2 p-2.5 text-[14px] text-ink focus:border-bord focus:outline focus:outline-2 focus:outline-brass";
const labelCls = "block text-[11px] font-medium uppercase tracking-wide text-mut";
const saveBtn =
  "rounded-md bg-bord px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-bord-deep";

export default async function TemoignagesPage() {
  const rows = isDbConfigured()
    ? await getDb()
        .select()
        .from(testimonial)
        .orderBy(asc(testimonial.position), asc(testimonial.createdAt))
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
            Contenus · site
          </p>
          <h1 className="mt-1 font-serif text-[28px] font-semibold">
            Témoignages
          </h1>
          <p className="mt-1 text-sm text-mut">
            Ils s&apos;affichent sur la page d&apos;accueil du site (rubrique
            « Ils en parlent mieux que moi »).
          </p>
        </div>
        <span className="rounded-full bg-bord/10 px-3 py-1 text-[12.5px] font-semibold text-accent">
          {rows.length} témoignage{rows.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* AJOUTER */}
      <form
        action={createTestimonial}
        className="mt-6 rounded-lg border border-dashed border-line bg-card p-5"
      >
        <p className="font-serif text-lg font-semibold">Ajouter un témoignage</p>
        <div className="mt-4 grid gap-4">
          <div>
            <label className={labelCls} htmlFor="new-headline">
              Phrase forte (titre)
            </label>
            <input
              id="new-headline"
              name="headline"
              required
              placeholder="Elle a vu quelque chose que je ne voyais plus."
              className={`mt-1 ${inputCls}`}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="new-body">
              Témoignage
            </label>
            <textarea
              id="new-body"
              name="body"
              required
              rows={4}
              placeholder="Le texte du témoignage…"
              className={`mt-1 ${inputCls} resize-y`}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="new-attr">
              Signature (anonymisée)
            </label>
            <input
              id="new-attr"
              name="attribution"
              placeholder="Dirigeante de PME — témoignage anonymisé"
              className={`mt-1 ${inputCls}`}
            />
          </div>
          <div>
            <button type="submit" className={saveBtn}>
              Ajouter le témoignage
            </button>
          </div>
        </div>
      </form>

      {/* LISTE / ÉDITION */}
      <div className="mt-8 flex flex-col gap-5">
        {rows.length === 0 && (
          <p className="rounded-lg border border-dashed border-line bg-card p-8 text-center text-sm text-mut">
            Aucun témoignage pour l&apos;instant.
          </p>
        )}
        {rows.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-line bg-card p-5 shadow-card"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  t.published
                    ? "bg-ok/15 text-ok"
                    : "bg-warn/15 text-warn"
                }`}
              >
                {t.published ? "Publié" : "Masqué"}
              </span>
            </div>
            <form action={updateTestimonial} className="grid gap-3">
              <input type="hidden" name="id" value={t.id} />
              <input
                name="headline"
                defaultValue={t.headline}
                required
                className={inputCls + " font-serif font-semibold text-accent"}
              />
              <textarea
                name="body"
                defaultValue={t.body}
                required
                rows={4}
                className={inputCls + " resize-y"}
              />
              <input
                name="attribution"
                defaultValue={t.attribution}
                className={inputCls + " text-mut"}
              />
              <div className="flex flex-wrap items-center gap-2">
                <button type="submit" className={saveBtn}>
                  Enregistrer
                </button>
              </div>
            </form>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
              <form action={togglePublished}>
                <input type="hidden" name="id" value={t.id} />
                <input
                  type="hidden"
                  name="published"
                  value={String(t.published)}
                />
                <button
                  type="submit"
                  className="rounded-md border border-line px-3 py-1.5 text-[12.5px] text-mut transition-colors hover:border-bord hover:text-accent"
                >
                  {t.published ? "Masquer" : "Publier"}
                </button>
              </form>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
