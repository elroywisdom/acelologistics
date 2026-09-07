import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import type { FinalCtaContent } from "@/content/types";

/** Figma node 60:1611. Background corrected from the Figma layer's literal
 * #0252e9 (off-token) to color-primary; CTA button corrected from #ffc700
 * to color-accent with color-ink text (dark-on-yellow rule) and from Inter
 * Bold to Cal Sans.
 *
 * `content` is optional so Home keeps rendering exactly what Figma
 * specifies with no call-site change; every page built after Home passes
 * its own band. */
export function FinalCTA({ content = finalCta }: { content?: FinalCtaContent }) {
  return (
    <section className="flex flex-col items-center gap-6 bg-primary px-6 py-16 text-center sm:px-10 lg:px-20 lg:py-24">
      <h2 className="text-[40px] font-normal text-white">
        {content.headline}
      </h2>
      <p className="max-w-[500px] text-body-lg leading-[1.6] text-white/85">
        {content.subhead}
      </p>
      <Button variant="accent" href={content.cta.href}
        target={content.cta.href.startsWith("http") ? "_blank" : undefined}
        rel={content.cta.href.startsWith("http") ? "noopener noreferrer" : undefined} className="rounded-pill px-8 py-4">
        {content.cta.label}
      </Button>
    </section>
  );
}
