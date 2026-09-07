import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { realEstate } from "@/content/real-estate";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(realEstate.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={realEstate}
      breadcrumb={[{ name: "Real Estate Logistics", path: realEstate.meta.path }]}
    />
  );
}
