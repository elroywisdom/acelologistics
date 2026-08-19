import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { testimonial } from "@/content/home";

/** Figma node 88:2298 ("Feature 9"). Quote/name typography corrected from
 * Inter (Medium/ExtraBold/Light) to Cal Sans — hierarchy comes from size
 * and color per the token table, not a second typeface. Card bg corrected
 * from an off-token #f0f6ff to color-tint-blue-100; outer border corrected
 * from #eceff3 to color-border.
 *
 * Figma shows prev/next arrows on this card, but `content/home.ts` only
 * has a single `testimonial` object today, not a list to cycle through —
 * wiring an onClick with nothing to page to would just be a fake
 * affordance. Disabled + dimmed until there's a second testimonial to
 * cycle to; swap in real pagination the moment `testimonial` becomes
 * `testimonials: [...]`. */
export function Testimonial() {
  return (
    <section className="flex flex-col items-center gap-10 border-y border-border bg-ink px-6 py-16 sm:px-10 lg:px-[58px] lg:py-20">
      <h2 className="text-heading-1 font-normal text-white">
        {testimonial.headline}
      </h2>
      <div className="flex w-full max-w-[1284px] flex-col items-stretch gap-6 lg:flex-row lg:items-center">
        <div className="flex h-auto flex-1 flex-col justify-between gap-10 rounded-[32px] bg-tint-blue-100 p-8 lg:h-[512px] lg:max-w-[751px] lg:p-12">
          <p className="text-[28px] leading-[1.3] tracking-[-0.25px] text-ink lg:text-[34px]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1 text-ink">
              <span className="text-[20px] font-normal">
                {testimonial.name}
              </span>
              <span className="text-[16px] text-text-muted">
                {testimonial.role}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                disabled
                aria-label="Previous testimonial"
                aria-disabled="true"
                className="tap-target flex h-[60px] w-[60px] items-center justify-center rounded-pill bg-white text-ink shadow-[0px_4px_4px_0px_#e0edff] opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                disabled
                aria-label="Next testimonial"
                aria-disabled="true"
                className="tap-target flex h-[60px] w-[60px] items-center justify-center rounded-pill bg-white text-ink shadow-[0px_4px_4px_0px_#e0edff] opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative aspect-[509/512] flex-1 overflow-hidden rounded-[32px] lg:h-[512px] lg:max-w-[509px]">
          <Image
            src={testimonial.photo.src}
            alt={`${testimonial.name}, ${testimonial.role}`}
            fill
            sizes="(min-width: 1024px) 509px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
