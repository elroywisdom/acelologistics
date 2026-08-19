import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { heroContent } from "@/content/home";

/** Figma node 70:165. Dropped the section's `overflow-hidden` — nothing
 * here needs clipping, and combined with the display font's tight 1.05
 * line-height and negative letter-spacing it was clipping descenders
 * (e.g. the "y" in "anywhere") in Chrome/Safari, which compute the glyph
 * bounding box more strictly than Firefox does.
 *
 * Text column is `shrink-0` and the image is `flex-1 min-w-0`: neither
 * had an explicit flex-basis before, so the browser had to auto-resolve
 * how much space each got from its own "automatic minimum size" — a
 * calculation replaced elements (the `<img>`) and text content resolve
 * differently, and it got worse once the hero image's aspect ratio got
 * wider in a later export, giving the row less slack to divide. Chrome
 * and Firefox didn't agree on the split, so the headline wrapped onto a
 * different number of lines per browser. Fixing the text column's width
 * and letting only the image flex removes the ambiguity: the headline
 * now wraps identically everywhere, and the image is what absorbs
 * whatever space is actually left.
 *
 * `lg:flex-1` (no min-height of its own) lets the page group Hero with
 * TrustLogoStrip and budget both against one screen height together —
 * see `page.tsx`. Vertical padding is `clamp(1.5rem, 6vh, 73px)` rather
 * than a flat 73px so it eases off on shorter desktop windows instead of
 * forcing a fixed floor — without that, a ~900px-tall browser window
 * couldn't fit Hero + TrustLogoStrip in one screen no matter how the
 * height budget below is written, since 73px of padding alone was a
 * third of the deficit. */
export function Hero() {
  return (
    <section className="relative flex bg-primary lg:flex-1 lg:items-center">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-6 px-6 py-10 sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-[115px] lg:py-[clamp(1.5rem,6vh,73px)]">
        <div className="flex max-w-[584px] shrink-0 flex-col items-start gap-4 lg:gap-6">
          {/* Figma's mobile Home frame (node 116:243/116:253) sets this
              headline at 36px (= text-display-l) instead of desktop's 52px
              (text-display-2xl) — at the mobile column's ~342px width,
              52px wraps into an oversized, cramped block. Responsive size
              instead of one fixed scale for both. */}
          <h1 className="text-display-l font-normal text-white lg:text-display-2xl">
            {heroContent.headline.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-accent">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h1>
          {/* Figma's mobile frame also ups this from the desktop subhead's
              white/70 to white/82 (node 116:254) — applied at both
              breakpoints rather than just mobile, since white/70 on
              bg-primary is one of the two known WCAG AA contrast failures
              flagged in the project doc (3.84:1, needs 4.5:1); white/82
              doesn't fully clear AA either but is a real, design-sourced
              improvement rather than a mobile-only inconsistency. */}
          <p className="max-w-[431px] text-[15px] leading-[1.4] text-white/[0.82] lg:text-body-lg lg:leading-[1.3]">
            {heroContent.subhead}
          </p>
          {/* Figma's mobile CTA row stacks the two buttons vertically
              (node 116:255 — both at x:0, different y) instead of desktop's
              side-by-side row; at 342px, two buttons plus a gap were forced
              to about half-width each, which is fine for these short
              labels but doesn't match the design, so stacked below `lg`. */}
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-4">
            <Button variant="accent" href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Button>
            <Button variant="outline" onDark href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Button>
          </div>
          <HeroCarousel />
        </div>
        <Image
          src={heroContent.image.src}
          alt={heroContent.image.alt}
          width={heroContent.image.width}
          height={heroContent.image.height}
          priority
          className="hidden min-w-0 flex-1 max-w-[829px] lg:block"
        />
      </div>
    </section>
  );
}
