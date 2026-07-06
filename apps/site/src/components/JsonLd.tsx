/** Injecte un bloc de données structurées Schema.org (SEO + GEO). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Données statiques et maîtrisées — pas d'entrée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
