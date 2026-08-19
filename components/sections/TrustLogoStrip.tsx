import Image from "next/image";
import { AssetPending } from "@/components/ui/AssetPending";
import { StarIcon } from "@/components/ui/Icons";
import { trustLogos } from "@/content/home";

/** Figma node 88:2339. Background corrected from the Figma layer's literal
 * #eff6ff (off-token) to color-surface-alt — the JSX itself already named
 * the intended variable `--color-surface-alt`, just with a stale fallback
 * hex, so this is a straightforward token-name fix.
 *
 * Logos are a mix of transparent wordmarks (COZA, Takeout Media, TM Con,
 * Gatefield) and solid brand badges (Avis' red box, Celebration Church's
 * black box). A blanket `grayscale` filter turned those two badges into
 * flat gray blocks that read as broken UI chips next to the light
 * wordmarks, so this only dims with opacity and lets real brand color
 * show through — consistent treatment across both logo styles.
 *
 * Renders as a continuous marquee (single line, auto-scrolling) rather
 * than the wrapping grid this started as — El-Roy's call, standard
 * "trusted by" treatment. The track is the logo list rendered twice back
 * to back and animated to `translateX(-50%)`, so the loop seam is
 * invisible; pauses on hover so a logo can actually be read. The
 * scrolling copy is `aria-hidden` and a plain `<ul>` of names carries the
 * real content for screen readers, since an infinitely-scrolling row of
 * images is not a usable list for assistive tech.
 *
 * `lg:py-[clamp(...)]`/`lg:gap-[clamp(...)]`: this section sits directly
 * below Hero in the one-screen height budget set in `page.tsx` (Hero +
 * this section ≈ 100vh on desktop), so its own padding needs to ease off
 * on shorter windows the same way Hero's does, or it just shifts the
 * overflow here instead of fixing it. */
export function TrustLogoStrip() {
  const track = [...trustLogos, ...trustLogos];

  return (
    <section className="flex flex-col items-center gap-[clamp(1rem,3vh,32px)] overflow-hidden bg-surface-alt px-6 py-[clamp(1.5rem,4vh,48px)] sm:px-10 lg:px-[100px]">
      <div className="flex gap-1 text-accent" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-6 w-6" />
        ))}
      </div>
      <p className="text-center text-caption uppercase tracking-[2px] text-text-muted">
        Trusted by Leading Organizations &amp; Partners Across Nigeria
      </p>
      <ul className="sr-only">
        {trustLogos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
      <div className="marquee-mask relative w-full max-w-[1100px] overflow-hidden">
        <div
          aria-hidden="true"
          className="animate-marquee flex w-max items-center gap-16"
        >
          {track.map((logo, i) =>
            logo.src ? (
              <Image
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className="h-11 w-auto shrink-0 object-contain opacity-70 transition hover:opacity-100"
              />
            ) : (
              // Figma export for this logo came through as an empty 1x1 pixel
              // (a broken export, not a missing file) — see README.
              <AssetPending
                key={`${logo.name}-${i}`}
                label={logo.name}
                title={`${logo.name} — export was empty, re-export needed`}
                aspectClassName="aspect-[3/1]"
                className="h-11 w-32 shrink-0 border-none bg-transparent p-0 text-[11px]"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
