import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { groupTravel } from "@/content/group-travel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(groupTravel.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={groupTravel}
      breadcrumb={[{ name: "Group Travel", path: groupTravel.meta.path }]}
    />
  );
}
