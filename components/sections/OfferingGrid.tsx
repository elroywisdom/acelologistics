import { SolutionCard } from "@/components/cards/SolutionCard";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import type { OfferingGridContent } from "@/content/types";

/** Offering/services card grid — section 3 of the solution-page skeleton.
 * Rotate which card carries `featured: true` per page so the grid always
 * leads with what that page is actually selling. */
export function OfferingGrid({ content }: { content: OfferingGridContent }) {
  return (
    <section className="flex flex-col items-center gap-10 bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex w-full max-w-[1272px] flex-col items-start gap-3">
        <CategoryEyebrowPill>{content.eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{content.headline}</h2>
        <p className="max-w-[760px] text-body-base text-text-muted">
          {content.subhead}
        </p>
      </div>
      <div className="grid w-full max-w-[1272px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.cards.map((card) => (
          <SolutionCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
