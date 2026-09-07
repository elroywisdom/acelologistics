import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { featureIcons } from "@/components/ui/Icons";
import type { ValuePropBandContent } from "@/content/types";

/** The 4-6 benefit-card band from the section-layout doc — the layout is
 * lifted from Home's `WhyAcelo` (Figma node 70:211), including the token
 * corrections made there (background #eff6ff -> color-tint-blue-100, card
 * body #475569 -> color-text-muted, card border #e2e8f0 -> color-border).
 *
 * `WhyAcelo` is deliberately NOT refactored into a wrapper around this.
 * Figma specifies its icon chips as literal glyph characters (checkmark,
 * arrow, grid, target) and Home was verified section-by-section against
 * that frame; this component uses real vector icons instead, which is the
 * right call for pages with no Figma source but would be an unreviewed
 * deviation on Home. Two small implementations beat silently redesigning
 * a verified page. */
export function ValuePropBand({ content }: { content: ValuePropBandContent }) {
  // 4 props sit on one desktop row; 5-6 read better on a 3-column grid
  // than as a cramped 6-across strip.
  const columns = content.props.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="flex flex-col items-center gap-8 bg-tint-blue-100 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <CategoryEyebrowPill>{content.eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{content.headline}</h2>
        {/* `color-text`, not `color-text-muted`. Muted body text on the
            tint-blue-100 section fill measures 3.52:1 — the worst pairing
            on the site, and well under WCAG AA. Home's `WhyAcelo` has the
            same pairing (it predates this component and is verified
            against Figma, so it is flagged for Acelo rather than changed
            here), but there is no reason to copy it onto eight new
            pages. On white card fills below, muted is kept. */}
        <p className="max-w-[760px] text-body-base text-text">
          {content.subhead}
        </p>
      </div>
      <div className={`grid w-full max-w-[1272px] grid-cols-1 gap-6 sm:grid-cols-2 ${columns}`}>
        {content.props.map((prop) => {
          const Icon = featureIcons[prop.icon];
          return (
            <div
              key={prop.title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6 shadow-[0px_6px_18px_-6px_rgba(15,20,32,0.04)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-tint-blue-100 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-heading-3 font-normal text-ink">{prop.title}</h3>
              <p className="text-[15px] leading-[1.6] text-text-muted">
                {prop.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
