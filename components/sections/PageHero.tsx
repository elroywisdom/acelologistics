import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { CheckCircleIcon } from "@/components/ui/Icons";
import type { PageHeroContent } from "@/content/types";

/** Hero for every page except Home (which keeps its own `Hero`, built to
 * Figma node 70:165).
 *
 * This started as typography plus a bulleted card, on the reasoning that
 * no page outside Home had cleared photography. That was wrong: the fleet
 * photos in `public/images/fleet/` are real, cleared Acelo assets and
 * every one is a transparent cutout, so each page can lead with the
 * actual vehicle it sells rather than a checklist. Every page now names
 * one in `content/<page>.ts`.
 *
 * The soft radial behind the vehicle is `color-tint-blue-100` at low
 * opacity — the token table's stated use for that colour is "decorative
 * illustration/blob backgrounds only," which is exactly this. It lifts
 * the cutout off the flat primary fill so the vehicle does not look
 * pasted on.
 *
 * The proof points that used to fill the card are now compact chips under
 * the CTA row, so the copy survives without competing with the image.
 *
 * Renders the page's single `<h1>`. No other section on a page may use
 * one (SEO doc: exactly one H1 per page). */
export function PageHero({ content }: { content: PageHeroContent }) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[115px] lg:py-20">
        <div className="flex w-full shrink-0 flex-col items-start gap-5 lg:max-w-[560px]">
          <CategoryEyebrowPill tone="onDark">{content.eyebrow}</CategoryEyebrowPill>
          <h1 className="text-display-l font-normal text-white lg:text-display-2xl">
            {content.headline.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-accent">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h1>
          <p className="max-w-[520px] text-[15px] leading-[1.5] text-white/[0.82] lg:text-body-lg lg:leading-[1.5]">
            {content.subhead}
          </p>
          <div className="flex flex-col items-stretch gap-3 self-stretch sm:flex-row sm:items-center sm:self-auto lg:gap-4">
            <Button
              variant="accent"
              href={content.primaryCta.href}
              target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={content.primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta && (
              <Button variant="outline" onDark href={content.secondaryCta.href}>
                {content.secondaryCta.label}
              </Button>
            )}
          </div>
          <ul className="flex flex-wrap gap-2 pt-1">
            {content.highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1.5 text-[13px] text-white"
              >
                <CheckCircleIcon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex w-full min-w-0 flex-1 items-center justify-center lg:justify-end">
          {/* Decorative only — `aria-hidden`, and sized in percentages so
              it tracks the image rather than a fixed breakpoint. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tint-blue-100/20 blur-3xl"
          />
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            priority
            sizes="(min-width: 1024px) 620px, 90vw"
            className="relative h-auto w-full max-w-[520px] object-contain lg:max-w-[620px]"
          />
        </div>
      </div>
    </section>
  );
}
