import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { pageBySlug } from "@/content/site";

/** Related-solutions cards. Beyond helping a reader who landed on the
 * wrong page, this is the internal-linking mechanism the SEO doc asks
 * for: every solution page links to 2-3 siblings so link equity spreads
 * across the site instead of pooling on Home, and Fleet Partnership is
 * cross-linked from every solution page since it is the one supply-side
 * conversion goal among demand-side pages.
 *
 * Cards are built from `sitePages` slugs rather than free-typed hrefs, so
 * a link can never point at a route that does not exist — `pageBySlug`
 * throws at build time on a bad slug. */
export function CrossSell({
  headline,
  subhead,
  pages,
}: {
  headline: string;
  subhead: string;
  pages: string[];
}) {
  return (
    <section className="flex flex-col items-center gap-10 bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex w-full max-w-[1272px] flex-col items-start gap-3">
        <CategoryEyebrowPill>Related</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{headline}</h2>
        <p className="max-w-[760px] text-body-base text-text-muted">{subhead}</p>
      </div>
      <div className="grid w-full max-w-[1272px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((slug) => {
          const page = pageBySlug(slug);
          return (
            <Link
              key={page.slug}
              href={page.slug}
              // Card fill is white, not surface-alt. `color-text-muted` on
              // surface-alt measures 3.81:1, below WCAG AA for body text, and
              // worse than the 4.02:1 the same text already gets on white
              // site-wide. Shipping a new pairing that is worse than the
              // existing baseline is not acceptable; the baseline itself
              // (a token-level issue affecting Home too) is flagged
              // separately for Acelo to decide on.
              className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6 transition-colors hover:border-primary"
            >
              <h3 className="text-heading-3 font-normal text-ink">{page.label}</h3>
              <p className="text-[15px] leading-[1.6] text-text-muted">{page.blurb}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[14px] text-primary">
                Explore
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
