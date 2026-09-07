import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { LegalDocumentView } from "@/components/legal/LegalDocument";
import type { LegalDocument } from "@/lib/markdown";

/** Shared shell for the two policy pages. Deliberately plain — no hero
 * image, no CTA band, no cross-sell. These pages exist to be read and
 * cited, and the marketing furniture used everywhere else on the site
 * would work against that.
 *
 * `body text` uses `color-text` rather than `color-text-muted`: muted
 * fails WCAG AA on white (4.02:1, see the contrast note in the README),
 * which is not acceptable for a document someone may need to read
 * closely. */
export function LegalPageShell({
  doc,
  eyebrow,
  relatedLabel,
  relatedHref,
}: {
  doc: LegalDocument;
  eyebrow: string;
  relatedLabel: string;
  relatedHref: string;
}) {
  const unresolved = doc.placeholders.length;

  return (
    <>
      <NavBar />
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-8 px-6 py-12 sm:px-10 lg:py-16">
          <div className="flex flex-col gap-3">
            <CategoryEyebrowPill>{eyebrow}</CategoryEyebrowPill>
            <h1 className="text-display-l font-normal text-ink">{doc.title}</h1>
          </div>

          {unresolved > 0 && (
            // Shown while the source document still has blanks. Remove by
            // filling them in `content/legal/*.md` — this disappears on its
            // own once `doc.placeholders` is empty, and the route's
            // `noindex` should be dropped at the same time.
            <div
              role="note"
              className="rounded-md border border-warning/40 bg-warning/10 px-4 py-3 text-[14px] leading-[1.6] text-ink"
            >
              <strong className="font-normal">Draft &mdash; not yet in force.</strong>{" "}
              {unresolved} value{unresolved === 1 ? "" : "s"} in this document
              {unresolved === 1 ? " is" : " are"} still to be confirmed, highlighted
              below. This page is excluded from search engines until they are.
            </div>
          )}

          <LegalDocumentView doc={doc} />

          <div className="flex flex-wrap gap-4 border-t border-border pt-6 text-[14px]">
            <Link href={relatedHref} className="text-primary hover:text-primary-hover">
              {relatedLabel}
            </Link>
            <Link href="/resources/contact" className="text-primary hover:text-primary-hover">
              Contact Acelo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
