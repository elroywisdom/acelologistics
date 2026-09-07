import type { MetadataRoute } from "next";
import { sitePages } from "@/content/site";
import { fleetVehicles } from "@/content/home";
import { loadLegalDocument } from "@/lib/markdown";
import { siteUrl } from "@/lib/seo";

/** Built from the same `sitePages` registry that drives nav, footer and
 * cross-sell links, plus one entry per vehicle detail page — so a new
 * route added to the registry is in the sitemap automatically instead of
 * being remembered here separately.
 *
 * Priorities: Home 1.0, the solution/partner/about pages 0.8 (they are
 * the actual search landing pages), vehicle detail pages 0.6 (useful, but
 * long-tail and near-duplicate in structure). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sitePages.map((page) => ({
      url: `${siteUrl}${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // The policy pages are `noindex` while their source documents still
    // have unconfirmed values in them, so they stay out of the sitemap
    // until then. Both drop in automatically once the blanks are filled.
    ...["terms-of-service", "privacy-policy"]
      .filter((slug) => loadLegalDocument(slug).placeholders.length === 0)
      .map((slug) => ({
        url: `${siteUrl}/resources/${slug}`,
        lastModified,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      })),
    {
      // Not in `sitePages`: that registry drives nav and cross-sell links,
      // and the apply form belongs in neither — it is reached from the
      // partner page, not browsed to.
      url: `${siteUrl}/partners/fleet/apply`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    ...fleetVehicles.map((vehicle) => ({
      url: `${siteUrl}/fleet/${vehicle.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
