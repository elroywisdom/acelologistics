import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";

/** Narrative section for the About page. It takes the slot the solutions
 * grid occupies on every other page (per the About entry in
 * acelo-section-layout.md), because the thing an About page has to
 * establish is a story, not a card grid of offerings.
 *
 * The tagline is set apart in accent-adjacent treatment rather than
 * inside the prose — it is Acelo's actual tagline, and burying it in a
 * paragraph wastes it. */
export function StoryBlock({
  eyebrow,
  headline,
  paragraphs,
  tagline,
}: {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  tagline: string;
}) {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1272px] flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="flex shrink-0 flex-col items-start gap-3 lg:w-[380px]">
          <CategoryEyebrowPill>{eyebrow}</CategoryEyebrowPill>
          <h2 className="text-display-l font-normal text-ink">{headline}</h2>
          <p className="rounded-md border-l-4 border-accent bg-surface-alt px-4 py-3 text-[15px] leading-[1.5] text-ink">
            {tagline}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-body-base leading-[1.7] text-text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
