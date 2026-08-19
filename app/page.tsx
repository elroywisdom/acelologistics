import type { Metadata } from "next";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustLogoStrip } from "@/components/sections/TrustLogoStrip";
import { VehicleTypeBand } from "@/components/sections/VehicleTypeBand";
import { FleetGrid } from "@/components/sections/FleetGrid";
import { WhyAcelo } from "@/components/sections/WhyAcelo";
import { Testimonial } from "@/components/sections/Testimonial";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faq } from "@/content/home";
import { faqJsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vetted Vehicle Rentals & Fleet Logistics in Abuja",
  description:
    "Book vetted buses and cars for any move, anywhere in Nigeria. Corporate rentals, event logistics and interstate transport with professional pilots.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faq.items)),
        }}
      />
      <NavBar />
      <main className="flex flex-1 flex-col">
        {/* Hero renders the page's single <h1> — no duplicate heading here,
            per the one-<h1>-per-page rule in the kickoff doc's SEO
            conventions.

            On desktop, Hero + TrustLogoStrip are budgeted to fill exactly
            one screen (min-height 100vh minus NavBar's own ~74px) so the
            trust-logo row is the last thing visible before the user's
            first scroll, on any desktop screen height — TrustLogoStrip
            keeps its natural content height and Hero (`lg:flex-1` in its
            own file) absorbs whatever's left. Desktop-only (`lg:`):
            forcing a fixed height on mobile would either clip content on
            short phones or leave a large dead gap on tall ones. */}
        <div className="lg:flex lg:min-h-[calc(100vh-74px)] lg:flex-col">
          <Hero />
          <TrustLogoStrip />
        </div>
        <VehicleTypeBand />
        <FleetGrid />
        <WhyAcelo />
        <Testimonial />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
