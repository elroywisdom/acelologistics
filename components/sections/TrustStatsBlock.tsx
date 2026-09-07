import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import type { TrustStatsContent } from "@/content/types";

/** The dark full-bleed break, two-thirds down every page.
 *
 * The section-layout doc lists a stats bar and a trust/safety block as
 * two separate sections — both dark, both there for pacing. Shipping both
 * would put two dark sections in the same page with only one light
 * section between them, which the same doc's layout principles rule out.
 * They are merged here instead: the reassurance headline does the
 * trust/safety job, the numbers underneath do the proof job, one dark
 * break total.
 *
 * Numbers come from `proof` in content/site.ts — every one of them is
 * counted from repo data or restated from copy already approved on Home.
 * Read the comment there before adding a stat. */
export function TrustStatsBlock({ content }: { content: TrustStatsContent }) {
  return (
    <section className="flex flex-col items-center gap-12 bg-ink px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex max-w-[760px] flex-col items-center gap-3 text-center">
        <CategoryEyebrowPill tone="onDark">{content.eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-white">{content.headline}</h2>
        <p className="text-body-base leading-[1.6] text-white/70">
          {content.subhead}
        </p>
      </div>
      <dl className="grid w-full max-w-[1100px] grid-cols-2 gap-8 lg:grid-cols-4">
        {content.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="flex flex-col items-center gap-2">
              {/* 22/28/36px, not the 40/52px this started at. That larger
                  scale was sized for short numeric values ("15+", "42",
                  "9"); once the capacity figures were removed in favour of
                  capability phrases, the longest values ("Sized to you",
                  "Pan-Nigeria") wrapped to two lines while shorter ones
                  stayed on one, leaving the row visibly ragged.
                  Measured against the widest value in `proof`
                  ("Pan-Nigeria") in its actual column width at each
                  breakpoint: 2 columns below sm (~120px at a 320px
                  viewport), 2 wider columns from sm, 4 columns from lg.
                  Every value now sits on one line at all three, so the
                  stats align. Re-measure if a longer value is added. */}
              <span className="text-[22px] leading-[1.15] text-accent sm:text-[28px] lg:text-[36px]">
                {stat.value}
              </span>
              <span className="max-w-[200px] text-[14px] leading-[1.5] text-white/70">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
