import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { loadLegalDocument } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";

const doc = loadLegalDocument("privacy-policy");

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description:
      "How Acelo Logistics & Rentals collects, uses and protects personal data under the Nigeria Data Protection Act 2023, and the rights you have over it.",
    path: "/resources/privacy-policy",
  }),
  // See the note in the Terms route: dropped once the source document has
  // no `[...]` blanks left.
  ...(doc.placeholders.length > 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      doc={doc}
      eyebrow="Policies"
      relatedLabel="Terms of Service"
      relatedHref="/resources/terms-of-service"
    />
  );
}
