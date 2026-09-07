import type { Metadata } from "next";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { OfficeAddress } from "@/components/sections/OfficeAddress";
import { TrustStatsBlock } from "@/components/sections/TrustStatsBlock";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdProps,
  localBusinessJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { channels, coverage, faq, finalCta, hero, meta } from "@/content/contact";

export const metadata: Metadata = pageMetadata(meta);

/** Contact page. Carries the `LocalBusiness` schema alongside Home — the
 * SEO doc asks for it on "Home/Contact" specifically, and this is now the
 * real contact page rather than About standing in for one.
 *
 * Section rhythm: primary hero -> white channels -> ink coverage stats ->
 * surface-alt socials -> tint FAQ -> primary final CTA. No two dark or
 * coloured sections touch. */
export default function ContactPage() {
  return (
    <>
      <script {...jsonLdProps(localBusinessJsonLd())} />
      <script {...jsonLdProps(faqJsonLd(faq.items))} />
      <script
        {...jsonLdProps(breadcrumbJsonLd([{ name: "Contact", path: meta.path }]))}
      />

      <NavBar />
      <main className="flex flex-1 flex-col">
        <PageHero content={hero} />
        <ContactChannels
          eyebrow="Get in touch"
          headline="Pick the line that fits"
          subhead="Acelo has no ticket queue. Each route below reaches a person who can act on it."
          channels={channels}
        />
        <OfficeAddress />
        <TrustStatsBlock
          content={{
            eyebrow: coverage.eyebrow,
            headline: coverage.headline,
            subhead: coverage.body,
            stats: coverage.stats,
          }}
        />
        <SocialLinks />
        <FAQAccordion content={faq} />
        <FinalCTA content={finalCta} />
      </main>
      <Footer />
    </>
  );
}
