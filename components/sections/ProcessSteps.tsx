import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import type { ProcessContent } from "@/content/types";

/** Numbered "How it works" section — 3-5 steps, capped by the
 * section-layout doc because a longer list undercuts a "Seamless. Swift.
 * Sure." brand promise.
 *
 * The connecting rule between steps is `aria-hidden` decoration and is
 * drawn only from `lg` up, where the steps actually sit in a row; on
 * mobile they stack and the numbers alone carry the sequence. It lives on
 * a wrapper rather than inside the `<ol>` — an `<ol>` may only contain
 * `<li>` children, and a stray `<div>` there is invalid markup that some
 * assistive tech reports as a broken list. The numbers are real text (not
 * CSS counters) so screen readers announce the order. */
export function ProcessSteps({ content }: { content: ProcessContent }) {
  const columns = content.steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="flex flex-col items-center gap-12 bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex max-w-[760px] flex-col items-center gap-3 text-center">
        <CategoryEyebrowPill>{content.eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{content.headline}</h2>
        <p className="text-body-base text-text-muted">{content.subhead}</p>
      </div>

      <div className="relative w-full max-w-[1272px]">
        <div
          aria-hidden
          className="absolute left-6 right-6 top-6 hidden h-px bg-border lg:block"
        />
        <ol className={`relative grid grid-cols-1 gap-8 sm:grid-cols-2 ${columns} lg:gap-6`}>
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-primary text-[18px] text-white">
                {index + 1}
              </span>
              <h3 className="text-heading-3 font-normal text-ink">{step.title}</h3>
              <p className="text-[15px] leading-[1.6] text-text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
