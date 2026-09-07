// ---------------------------------------------------------------------
// TAKEN DOWN 2026-09-07 on El-Roy's instruction ("not needed for now"),
// NOT deleted. The folder is prefixed with an underscore, which is
// Next.js's documented private-folder convention: `_about` and everything
// under it is excluded from routing, so /about now 404s while the page
// itself is preserved intact.
//
// TO RESTORE: rename this folder back to `about`, then re-add the four
// references removed with it —
//   * the `/about` entry in `sitePages` (content/site.ts), which drives
//     nav, footer, cross-sell and the sitemap;
//   * the "About" link in components/layout/NavBar.tsx;
//   * the "About Us" link in components/layout/Footer.tsx;
//   * the hero secondary CTA in content/fleet-partner.ts, which pointed
//     here and now points at the contact page.
//
// content/about.ts and the two sections only this page uses
// (components/sections/StoryBlock.tsx, MissionVision.tsx) were left in
// place for the same reason.
// ---------------------------------------------------------------------

import type { Metadata } from "next";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { MissionVision } from "@/components/sections/MissionVision";
import { ValuePropBand } from "@/components/sections/ValuePropBand";
import { TrustStatsBlock } from "@/components/sections/TrustStatsBlock";
import { TrustLogoStrip } from "@/components/sections/TrustLogoStrip";
import { Testimonial } from "@/components/sections/Testimonial";
import { CrossSell } from "@/components/sections/CrossSell";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  breadcrumbJsonLd,
  jsonLdProps,
  localBusinessJsonLd,
  pageMetadata,
} from "@/lib/seo";
import {
  crossSell,
  finalCta,
  hero,
  meta,
  missionVision,
  pillars,
  story,
  trustStats,
} from "@/content/about";

export const metadata: Metadata = pageMetadata(meta);

/** About follows its own section map (acelo-section-layout.md), not the
 * solution-page skeleton: story and mission replace the offerings grid,
 * and there is deliberately no FAQ or process section.
 *
 * The team/leadership grid the doc calls for is not built. It needs real
 * cleared headshots of real people; the kickoff doc (§7) rules out stock
 * or placeholder imagery, and inventing colleagues would be worse than
 * an absent section. Drop it in between `MissionVision` and
 * `ValuePropBand` once photos exist.
 *
 * Carries the `LocalBusiness` schema alongside Home — the SEO doc asks
 * for it on Home and the contact-style page, and About is currently the
 * closest thing the site has to the latter. */
export default function AboutPage() {
  return (
    <>
      <script {...jsonLdProps(localBusinessJsonLd())} />
      <script
        {...jsonLdProps(breadcrumbJsonLd([{ name: "About", path: meta.path }]))}
      />

      <NavBar />
      <main className="flex flex-1 flex-col">
        <PageHero content={hero} />
        <StoryBlock
          eyebrow={story.eyebrow}
          headline={story.headline}
          paragraphs={story.paragraphs}
          tagline={story.tagline}
        />
        <MissionVision
          eyebrow={missionVision.eyebrow}
          headline={missionVision.headline}
          cards={missionVision.cards}
        />
        <ValuePropBand content={pillars} />
        <TrustStatsBlock content={trustStats} />
        <TrustLogoStrip />
        <Testimonial />
        <CrossSell
          headline={crossSell.headline}
          subhead={crossSell.subhead}
          pages={crossSell.pages}
        />
        <FinalCTA content={finalCta} />
      </main>
      <Footer />
    </>
  );
}
