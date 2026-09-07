import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";

/** Two-card mission/vision block for the About page. Kept as a plain
 * two-up rather than folded into `ValuePropBand`: these are longer
 * statements with a label rather than icon-led benefit cards, and forcing
 * them through the benefit-card shape made both read like features. */
export function MissionVision({
  eyebrow,
  headline,
  cards,
}: {
  eyebrow: string;
  headline: string;
  cards: { label: string; body: string }[];
}) {
  return (
    <section className="flex flex-col items-center gap-10 bg-surface-alt px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex max-w-[760px] flex-col items-center gap-3 text-center">
        <CategoryEyebrowPill>{eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{headline}</h2>
      </div>
      <div className="grid w-full max-w-[1000px] grid-cols-1 gap-6 lg:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-3 rounded-lg border border-border bg-white p-8"
          >
            <h3 className="text-caption uppercase text-primary">{card.label}</h3>
            <p className="text-heading-3 font-normal leading-[1.5] text-ink">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
