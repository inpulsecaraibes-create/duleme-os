import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
