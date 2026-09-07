import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { churchEvents } from "@/content/church-events";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(churchEvents.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={churchEvents}
      breadcrumb={[{ name: "Church & Event Transport", path: churchEvents.meta.path }]}
    />
  );
}
