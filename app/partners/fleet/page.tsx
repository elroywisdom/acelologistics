import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { fleetPartner } from "@/content/fleet-partner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(fleetPartner.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={fleetPartner}
      breadcrumb={[{ name: "Fleet Partnership", path: fleetPartner.meta.path }]}
    />
  );
}
