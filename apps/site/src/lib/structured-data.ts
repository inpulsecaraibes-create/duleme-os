// Données structurées (Schema.org) — SEO + GEO (compréhension par les IA).

// Domaine officiel — pilotable par variable d'environnement Vercel
// (NEXT_PUBLIC_SITE_URL), sans www, sans slash final.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dulemeandcie.com";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "DULEME AND CIE",
  alternateName: "DULEME",
  description:
    "Cabinet de conseil stratégique pour dirigeants de PME. DULEME AND CIE accompagne les dirigeants sur les décisions qui engagent durablement leur entreprise.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-duleme.png`,
  slogan: "Bien diriger est l'art de décider.",
  areaServed: { "@type": "Place", name: "France" },
  founder: { "@type": "Person", name: "Téféry", jobTitle: "Fondatrice" },
  knowsAbout: [
    "décision stratégique",
    "gouvernance",
    "arbitrage",
    "stratégie d'entreprise",
    "organisation",
    "dirigeant de PME",
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "DULEME AND CIE",
  url: SITE_URL,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/le-faux-dilemme/#blog`,
  name: "Le Faux Dilemme",
  url: `${SITE_URL}/le-faux-dilemme`,
  inLanguage: "fr-FR",
  description:
    "Le média des décisions. Apprendre à repérer la fausse alternative pour décider sur le bon terrain.",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function articleLd(a: {
  slug: string;
  title: string;
  metaDescription: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.metaDescription,
    url: `${SITE_URL}/le-faux-dilemme/${a.slug}`,
    image: `${SITE_URL}${a.image}`,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Téféry" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/le-faux-dilemme/#blog` },
  };
}
