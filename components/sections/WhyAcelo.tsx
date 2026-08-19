import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { whyAcelo } from "@/content/home";

const iconGlyph: Record<(typeof whyAcelo.props)[number]["icon"], string> = {
  check: "✓",
  arrow: "↗",
  grid: "▤",
  target: "◎",
};

/** Figma node 70:211 ("Why Acelo"). Background corrected from the Figma
 * layer's literal #eff6ff to color-tint-blue-100 (decorative section bg).
 * Card body copy corrected from an off-token #475569 to color-text-muted;
 * card border corrected from #e2e8f0 to color-border. */
export function WhyAcelo() {
  return (
    <section className="flex flex-col items-center gap-8 bg-tint-blue-100 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <CategoryEyebrowPill>{whyAcelo.eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">
          {whyAcelo.headline}
        </h2>
        <p className="max-w-[760px] text-body-base text-text-muted">
          {whyAcelo.subhead}
        </p>
      </div>
      <div className="grid w-full max-w-[1272px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyAcelo.props.map((prop) => (
          <div
            key={prop.title}
            className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6 shadow-[0px_6px_18px_-6px_rgba(15,20,32,0.04)]"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md bg-tint-blue-100 text-[18px] text-primary"
              aria-hidden
            >
              {iconGlyph[prop.icon]}
            </div>
            <h3 className="text-heading-3 font-normal text-ink">
              {prop.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-text-muted">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
