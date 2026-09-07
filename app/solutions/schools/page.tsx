import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/layout/SolutionPageLayout";
import { schools } from "@/content/schools";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(schools.meta);

/** Breadcrumb is Home -> this page, with no intermediate "Solutions"
 * crumb: there is no /solutions index route, and a breadcrumb item that
 * points at a URL which does not exist is worse than a shorter trail. */
export default function Page() {
  return (
    <SolutionPageLayout
      content={schools}
      breadcrumb={[{ name: "School Transport", path: schools.meta.path }]}
    />
  );
}
