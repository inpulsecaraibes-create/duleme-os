import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";
import { publishedArticles } from "@/content/faux-dilemme";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles: MetadataRoute.Sitemap = publishedArticles.map((a) => ({
    url: `${SITE_URL}/le-faux-dilemme/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...articles,
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/le-faux-dilemme`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/a-propos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
