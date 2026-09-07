// Site-wide data shared across every page: the page registry that drives
// nav, footer, cross-sell and the sitemap, plus the small set of proof
// numbers that are safe to publish.

import type { FeatureIconKey } from "@/components/ui/Icons";
import { fleetVehicles } from "@/content/home";
import { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";

export const whatsappUrl = `https://wa.me/${ACELO_WHATSAPP_NUMBER}`;
export const phoneNumber = "+234 810 311 5430";

/** Confirmed 2026-09-07: this is the contact address Acelo publishes in
 * its own Terms of Service and Privacy Policy (content/legal/). Distinct
 * from `RESEND_FROM_EMAIL`, which is a send-from address for transactional
 * mail, not an inbox anyone reads. */
export const contactEmail = "operation@acelologistics.com";

/** Acelo's registered office (supplied by El-Roy, 2026-09-07).
 *
 * Single source of truth on purpose. The SEO doc's local-SEO section
 * requires NAP consistency — Name, Address, Phone identical across the
 * site footer, the LocalBusiness schema, the Google Business Profile and
 * any directory listing. Three copies of an address in three files is how
 * that silently drifts, so the footer, the contact page and
 * `localBusinessJsonLd()` in lib/seo.ts all read from here.
 *
 * Keep `full` and the structured parts in agreement if either changes,
 * and update the Google Business Profile to match. */
export const address = {
  street: "Zone 5, Novare Mall, Wuse",
  locality: "Abuja",
  postalCode: "904101",
  region: "Federal Capital Territory",
  country: "NG",
  full: "Zone 5, Novare Mall, Wuse, Abuja 904101, Federal Capital Territory",
} as const;

/** Google Maps deep link for the office. Uses the public Maps URL scheme,
 * which needs no API key — unlike the Places integration in lib/places.ts,
 * this costs nothing and works today. */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address.full,
)}`;

/** Every real route on the site, in IA order (kickoff doc §9 / the SEO
 * doc's URL architecture). One source of truth so nav links, footer
 * columns, cross-sell cards and `app/sitemap.ts` can never drift apart —
 * dead nav links pointing at unbuilt pages were a real bug here before. */
export type SitePage = {
  slug: string;
  /** Short label for nav/footer. */
  label: string;
  /** One-line description used on cross-sell cards and the nav mega-menu. */
  blurb: string;
  /** Rendered in the nav mega-menu's icon chip. */
  icon: FeatureIconKey;
  group: "solutions" | "partners" | "company";
};

export const sitePages: SitePage[] = [
  {
    slug: "/solutions/rental",
    icon: "car",
    label: "Vehicle Rental",
    blurb:
      "Hire a sedan, SUV, Hiace or Coaster by the day, the week or the month, pilot included.",
    group: "solutions",
  },
  {
    slug: "/solutions/church-events",
    icon: "spark",
    label: "Church & Event Transport",
    blurb:
      "Multi-unit convention logistics with hub pickups and live rerouting on the day.",
    group: "solutions",
  },
  {
    slug: "/solutions/schools",
    icon: "graduation",
    label: "School Transport",
    blurb:
      "Term-contract school runs on fixed routes, with vetted pilots and daily tracking.",
    group: "solutions",
  },
  {
    slug: "/solutions/group-travel",
    icon: "users",
    label: "Group Travel",
    blurb:
      "One point of contact for retreats, weddings and interstate group movement.",
    group: "solutions",
  },
  {
    slug: "/solutions/travel-tour-partners",
    icon: "compass",
    label: "Travel & Tour Partners",
    blurb:
      "White-label ground transport for tour operators running multi-city itineraries.",
    group: "solutions",
  },
  {
    slug: "/solutions/hotels",
    icon: "building",
    label: "Hotel & Guest Transfers",
    blurb:
      "Airport pickups and executive guest transfers that reflect well on your property.",
    group: "solutions",
  },
  {
    slug: "/solutions/real-estate",
    icon: "pin",
    label: "Real Estate Logistics",
    blurb:
      "Site-inspection convoys and launch-day surge capacity for estates and developers.",
    group: "solutions",
  },
  {
    slug: "/partners/fleet",
    icon: "wallet",
    label: "Fleet Partnership",
    blurb:
      "Put your vehicle on Acelo dispatch and earn on vetted, coordinated trips.",
    group: "partners",
  },
  {
    slug: "/resources/contact",
    icon: "headset",
    label: "Contact",
    blurb:
      "Reach Acelo HQ on WhatsApp or by phone for bookings, live trips and partnership.",
    group: "company",
  },
];

export function pageBySlug(slug: string): SitePage {
  const page = sitePages.find((p) => p.slug === slug);
  if (!page) {
    // A typo'd slug in a cross-sell list would otherwise render a card
    // linking to a 404 — fail loudly at build time instead, since every
    // page here is statically rendered.
    throw new Error(`Unknown site page slug: ${slug}`);
  }
  return page;
}

/** ------------------------------------------------------------------
 * Publishable proof points.
 *
 * Every value below is either counted directly from data already in this
 * repo or restated from copy Acelo has already approved on Home —
 * nothing here is estimated. That constraint is deliberate: the
 * copywriting doc requires proof points to be "real and specific," and
 * an invented stat on a logistics site is a liability, not a conversion
 * aid.
 *
 * `vehicleClasses`   — counted from `fleetVehicles`.
 * `entryRate`        — the lowest `price` in `fleetVehicles`.
 * `confirmationTime` — Home's FAQ and final CTA both promise same-day
 *                      confirmation.
 * `coverage` / `hq`  — the LocalBusiness schema in lib/seo.ts.
 * `multiSite`        — a capability, not a count: hubs, venues and routes
 *                      run from one dispatch desk.
 * `fleetScale`       — states explicitly that fleet size is set by the
 *                      job rather than by a published ceiling.
 *
 * REMOVED, DO NOT RE-ADD: a "15+ units coordinated simultaneously" figure
 * and a "42 seats in the largest unit" figure. Acelo has run church
 * programmes bigger than both (El-Roy, 2026-09-07), so publishing them
 * advertised a ceiling the company had already cleared — a stat that
 * loses work rather than winning it. Capacity is now expressed as
 * coordination capability (`multiSite`, `fleetScale`), which is both
 * true and non-limiting. Per-vehicle seat counts still live on the fleet
 * cards in content/home.ts, where they are product specs rather than a
 * claim about how much Acelo can move.
 *
 * TO ADD A NEW STAT: get the real figure from Acelo first (trips
 * completed, organizations served, on-time percentage). Do not
 * approximate one to fill a layout — drop the fourth stat instead. And
 * do not publish an upper bound on scale.
 * ------------------------------------------------------------------ */
export const proof = {
  vehicleClasses: String(fleetVehicles.length),
  entryRate: "₦80,000",
  confirmationTime: "Same-day",
  coverage: "Pan-Nigeria",
  hq: "Abuja",
  multiSite: "Multi-site",
  fleetScale: "Sized to you",
} as const;

/** Abuja areas named in body copy as a local-authority signal (both
 * strategy docs call for this). Real FCT locations only. */
export const abujaAreas = [
  "Maitama",
  "Wuse",
  "Garki",
  "Mabushi",
  "Apo",
  "Gwagwalada",
  "Kuje",
];
