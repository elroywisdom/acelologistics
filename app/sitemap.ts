import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Only "/" exists so far (Home is the only page built this pass — see
// kickoff doc §12: build Home, verify the pattern, then repeat for the
// other 9 priority pages). Add each route here as it's built.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
