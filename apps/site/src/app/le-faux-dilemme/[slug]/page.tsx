/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ButtonLink, Container } from "@duleme/ui";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { articleLd } from "@/lib/structured-data";
import { getArticle, publishedArticles } from "@/content/faux-dilemme";

// Les articles sont connus au build (contenu en fichier TS) : route 100 % statique.
// Un slug inconnu renvoie 404 plutôt que d'exiger une fonction serverless.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.metaDescription,
    keywords: undefined,
    alternates: { canonical: `/le-faux-dilemme/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.metaDescription,
      images: [{ url: a.image }],
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArticle(params.slug);
  if (!a || !a.published) notFound();

  return (
    <>
      <SiteHeader />
      <JsonLd data={articleLd(a)} />
      <main>
        <article>
          <Container>
            <div className="mx-auto max-w-[720px] pt-12">
              <Link
                href="/le-faux-dilemme"
                className="text-[13px] text-mut hover:text-accent"
              >
                ← Le Faux Dilemme
              </Link>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-brass">
                {a.axe}
              </p>
              <h1 className="mt-3 font-serif text-[clamp(30px,4.6vw,48px)] font-semibold leading-[1.08]">
                {a.title}
              </h1>
              <p className="mt-4 text-[13px] text-mut">
                {a.loi} · {a.readingMinutes} min de lecture · {a.publication}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span className="text-[13px] text-mut">
                  Par <strong className="text-ink">Téféry</strong>, fondatrice de
                  DULEME AND CIE
                </span>
              </div>
            </div>
          </Container>

          <Container>
            <div
              className="prose prose-lg mx-auto mt-10 max-w-[720px] pb-8 dark:prose-invert
                prose-headings:font-serif prose-headings:font-semibold prose-headings:text-ink
                prose-h2:mt-12 prose-h2:text-[26px]
                prose-h3:text-[19px]
                prose-p:leading-relaxed prose-p:text-ink/90
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink
                prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:border-l-brass prose-blockquote:bg-paper2 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-serif prose-blockquote:font-medium prose-blockquote:text-accent
                prose-hr:border-line"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.body}</ReactMarkdown>
            </div>
          </Container>
        </article>

        <section className="mt-4 bg-bord py-16 text-center text-[#f0e5da]">
          <Container>
            <p className="mx-auto max-w-[24ch] font-serif text-[clamp(22px,3vw,32px)] font-medium leading-snug">
              Une décision importante approche&nbsp;?
            </p>
            <ButtonLink href="/#contact" variant="inverse" className="mt-6">
              Parlons de votre décision →
            </ButtonLink>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
