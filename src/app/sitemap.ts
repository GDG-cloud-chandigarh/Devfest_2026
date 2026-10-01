import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Add routes here as the site grows. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
