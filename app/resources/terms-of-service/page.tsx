import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { loadLegalDocument } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";

const doc = loadLegalDocument("terms-of-service");

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Terms of Service",
    description:
      "The terms governing bookings, pricing, cancellations and liability for Acelo Logistics & Rentals vehicle hire and event logistics services.",
    path: "/resources/terms-of-service",
  }),
  // Excluded from search while the source document still has unconfirmed
  // values in it. Delete this block once `content/legal/terms-of-service.md`
  // has no `[...]` blanks left.
  ...(doc.placeholders.length > 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function TermsPage() {
  return (
    <LegalPageShell
      doc={doc}
      eyebrow="Policies"
      relatedLabel="Privacy Policy"
      relatedHref="/resources/privacy-policy"
    />
  );
}
