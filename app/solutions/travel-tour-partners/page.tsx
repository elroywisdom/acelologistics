import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { travelTourPartners } from "@/content/travel-tour-partners";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(travelTourPartners.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={travelTourPartners}
      breadcrumb={[{ name: "Travel & Tour Partners", path: travelTourPartners.meta.path }]}
    />
  );
}
