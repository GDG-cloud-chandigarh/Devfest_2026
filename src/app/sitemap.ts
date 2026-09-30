import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** One page today; add routes here as the site grows. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
