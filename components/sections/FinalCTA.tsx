import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";

/** Figma node 60:1611. Background corrected from the Figma layer's literal
 * #0252e9 (off-token) to color-primary; CTA button corrected from #ffc700
 * to color-accent with color-ink text (dark-on-yellow rule) and from Inter
 * Bold to Cal Sans. */
export function FinalCTA() {
  return (
    <section className="flex flex-col items-center gap-6 bg-primary px-6 py-16 text-center sm:px-10 lg:px-20 lg:py-24">
      <h2 className="text-[40px] font-normal text-white">
        {finalCta.headline}
      </h2>
      <p className="max-w-[500px] text-body-lg leading-[1.6] text-white/85">
        {finalCta.subhead}
      </p>
      <Button variant="accent" href={finalCta.cta.href} className="rounded-pill px-8 py-4">
        {finalCta.cta.label}
      </Button>
    </section>
  );
}
