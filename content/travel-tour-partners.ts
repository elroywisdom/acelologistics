// Travel & Tour Partners landing page (/solutions/travel-tour-partners).
// Audience tone per acelo-copywriting-style.md: partner-to-partner
// (B2B2C) — white-label reliability, interstate/outstation capability,
// coordination across multiple cities. The reader here is an operator
// whose own client is on the bus, so the promise is about protecting
// their brand, not selling a ride.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const travelTourPartners: SolutionPageContent = {
  meta: {
    // Trimmed from "Ground Transport Partner for Tour Operators" — that
    // rendered at 61 chars with the brand suffix and would truncate in
    // search results.
    title: "Transport Partner for Tour Operators",
    description:
      "White-label ground transport for Nigerian tour operators. Interstate charters, multi-city itineraries and vetted Professional Pilots under your brand.",
    path: "/solutions/travel-tour-partners",
  },
  service: {
    name: "Travel & Tour Partner Transport",
    serviceType: "White-label ground transport for tour operators",
    description:
      "Ground transport supply for travel and tour companies: interstate charters, multi-city itinerary coordination and vetted Professional Pilots operating under the partner's brand.",
  },
  hero: {
    eyebrow: "Tour Partners",
    // "Charter interstate coaches..." until 2026-09-07 — same fix as the
    // church-events headline: naming one vehicle class read as a limit on
    // what Acelo supplies.
    headline: [
      { text: "Charter an interstate fleet for your " },
      { text: "itineraries", highlight: true },
      { text: "." },
    ],
    subhead:
      "Acelo runs the ground leg so your clients meet a clean vehicle and a vetted Professional Pilot — and credit your brand, not ours.",
    primaryCta: { label: "Become a Partner", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "White-label operation",
      "Agreed partner rates",
      "Multi-city coordination",
    ],
    image: {
      src: "/images/fleet/standard-coaster-bus.png",
      width: 512,
      height: 340,
      alt:
        "An Acelo Logistics coaster bus on interstate charter for a tour operator itinerary.",
    },
  },
  offering: {
    eyebrow: "What we supply",
    headline: "The ground leg, handled",
    subhead:
      "Tour operators lose margin and reputation in the same place: transport that does not match the itinerary sold.",
    cards: [
      {
        icon: "route",
        title: "Multi-city itineraries",
        description:
          "One convoy carried across several cities on a fixed schedule, coordinated by a single dispatch desk.",
        featured: true,
      },
      {
        icon: "bus",
        title: "Interstate charters",
        description:
          "Long-distance charter in whichever vehicle class fits the group, with rest stops planned before departure.",
      },
      {
        icon: "users",
        title: "Airport & arrival transfers",
        description:
          "Arrival pickups timed to real flight times, so a delayed group is still met on landing.",
      },
      {
        icon: "compass",
        title: "Day tours & excursions",
        description:
          "Vehicles held on standby between stops, so your guide sets the pace rather than the driver.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why partner with Acelo",
    headline: "Reliability you can resell",
    subhead:
      "Everything below exists so the transport line in your package never becomes the complaint in your review.",
    props: [
      {
        icon: "shield",
        title: "White-label service",
        description:
          "Pilots operate as part of your programme, with no branding, upsell or side conversation with your client.",
      },
      {
        icon: "wallet",
        title: "Rates you can price on",
        description:
          "Partner rates are agreed per route upfront, so your package margin is fixed before you sell a seat.",
      },
      {
        icon: "pin",
        title: "Multi-city coordination",
        description:
          "One dispatch desk holds the whole itinerary, rather than a different operator in each city.",
      },
      {
        icon: "headset",
        title: "Operator support line",
        description:
          "A direct contact while a tour is running, so a change of plan is a message rather than a crisis.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How an Acelo tour partnership works",
    subhead: "Set the commercials once, then book route by route.",
    steps: [
      {
        title: "Partnership onboarding",
        description:
          "We agree coverage, vehicle classes and partner rates for the routes you sell most often.",
      },
      {
        title: "Itinerary planning",
        description:
          "Each booking is mapped against your programme timings, with units and pilots assigned per leg.",
      },
      {
        title: "Execution",
        description:
          "Dispatch runs the ground leg live, tracking every unit and absorbing delays before they hit your guide.",
      },
      {
        title: "Reporting",
        description:
          "A per-trip summary of timings and changes, so you can settle accounts and improve the next itinerary.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Partner proof",
    headline: "Your client never meets an unvetted driver",
    subhead:
      "Pilot vetting and vehicle inspection apply identically to partner-operated trips.",
    stats: [
      { value: proof.coverage, label: "Dispatch coverage for multi-city routes" },
      { value: proof.vehicleClasses, label: "Vehicle classes available per leg" },
      { value: proof.multiSite, label: "Cities and legs run from one dispatch desk" },
      { value: proof.confirmationTime, label: "Route and unit confirmation" },
    ],
  },
  faq: {
    headline: "Everything you need to know about partnering with Acelo",
    items: [
      {
        question: "How does partner pricing work?",
        answer:
          "Rates are agreed per route at onboarding rather than quoted trip by trip, so you can build a package price and hold your margin.",
      },
      {
        question: "Will your pilots interact with our clients as Acelo?",
        answer:
          "No. Partner trips are operated white-label — pilots run as part of your programme, without Acelo branding or any upsell to your client.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "Abuja and the FCT as a base, with outstation and interstate routes dispatched from hubs across the country for multi-city itineraries.",
      },
      {
        question: "Can you hold vehicles on standby during a tour?",
        answer:
          "Yes. Standby time between stops is normal on day tours and is priced into the route rate rather than charged as an extra on the day.",
      },
      {
        question: "What happens if a client group is delayed?",
        answer:
          "Dispatch adjusts the leg and tells your coordinator. Airport transfers are timed against actual flight times rather than the scheduled ones.",
      },
    ],
  },
  crossSell: {
    headline: "Other ways operators use Acelo",
    subhead: "Beyond the tour itinerary itself.",
    pages: ["/solutions/hotels", "/solutions/group-travel", "/partners/fleet"],
  },
  finalCta: {
    headline: "Let us run your ground leg",
    subhead:
      "Send Acelo HQ the routes you sell most often. We will come back with partner rates and coverage, same day.",
    cta: { label: "Become a Partner", href: whatsappUrl },
  },
};
