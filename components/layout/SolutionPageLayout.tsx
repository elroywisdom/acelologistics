import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { OfferingGrid } from "@/components/sections/OfferingGrid";
import { FleetGrid } from "@/components/sections/FleetGrid";
import { ValuePropBand } from "@/components/sections/ValuePropBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStatsBlock } from "@/components/sections/TrustStatsBlock";
import { TrustLogoStrip } from "@/components/sections/TrustLogoStrip";
import { Testimonial } from "@/components/sections/Testimonial";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CrossSell } from "@/components/sections/CrossSell";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { breadcrumbJsonLd, faqJsonLd, jsonLdProps, serviceJsonLd } from "@/lib/seo";
import type { SolutionPageContent } from "@/content/types";

/** The solution/service sub-page skeleton from acelo-section-layout.md,
 * built once and shared by all eight non-Home content pages so they stay
 * one system rather than eight near-copies.
 *
 * Section order and the light/dark rhythm are deliberate. The doc's rule
 * is that two colored or dark sections never sit back to back, so the
 * sequence runs primary -> white -> tint -> white -> ink -> surface-alt
 * -> ink -> tint -> white -> primary. The trust-logo strip between the
 * stats block and the testimonial is load-bearing, not decoration: drop
 * it and two dark sections collide.
 *
 * `offering` is optional — the Rental page substitutes the real
 * `FleetGrid` (actual vehicles, real photos and prices, each card linking
 * to that vehicle's booking form) for an abstract card grid.
 *
 * The testimonial is Home's real, named client quote (Michella Ezima, TM
 * Global) reused as-is. It is the only cleared testimonial that exists;
 * repeating a genuine one across landing pages is normal practice, and
 * the alternative — writing audience-specific quotes for schools, hotels
 * and churches — would be fabricating customer statements. Collect real
 * per-audience quotes and this is where they go. */
export function SolutionPageLayout({
  content,
  breadcrumb,
}: {
  content: SolutionPageContent;
  /** Intermediate crumbs between Home and this page, e.g. Solutions. */
  breadcrumb: { name: string; path: string }[];
}) {
  return (
    <>
      <script
        {...jsonLdProps(
          serviceJsonLd({ ...content.service, path: content.meta.path }),
        )}
      />
      <script {...jsonLdProps(faqJsonLd(content.faq.items))} />
      <script {...jsonLdProps(breadcrumbJsonLd(breadcrumb))} />

      <NavBar />
      <main className="flex flex-1 flex-col">
        <PageHero content={content.hero} />
        {content.offering ? (
          <OfferingGrid content={content.offering} />
        ) : (
          <FleetGrid />
        )}
        <ValuePropBand content={content.valueProps} />
        <ProcessSteps content={content.process} />
        <TrustStatsBlock content={content.trustStats} />
        <TrustLogoStrip />
        <Testimonial />
        <FAQAccordion content={content.faq} />
        <CrossSell
          headline={content.crossSell.headline}
          subhead={content.crossSell.subhead}
          pages={content.crossSell.pages}
        />
        <FinalCTA content={content.finalCta} />
      </main>
      <Footer />
    </>
  );
}
