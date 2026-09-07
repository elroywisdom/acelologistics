// Real Estate landing page (/solutions/real-estate).
// Audience tone per acelo-copywriting-style.md: recurring site-inspection
// logistics, estate-launch event transport, dependable multi-stop
// routing. No past client is named — the two real-estate logos on the
// trust strip are shown site-wide under their existing "trusted by"
// framing, which is the approved use.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const realEstate: SolutionPageContent = {
  meta: {
    title: "Site Inspection & Estate Launch Transport",
    description:
      "Move prospects to site and back on schedule. Recurring inspection convoys and launch-day surge capacity for Abuja developers and estate agents.",
    path: "/solutions/real-estate",
  },
  service: {
    name: "Real Estate Logistics",
    serviceType: "Site inspection and property launch transport",
    description:
      "Recurring site-inspection transport and estate launch-day fleets for property developers and agents, including multi-stop routing and surge capacity.",
  },
  hero: {
    eyebrow: "Real Estate",
    headline: [
      { text: "Book a convoy for your next " },
      { text: "site inspection", highlight: true },
      { text: "." },
    ],
    subhead:
      "Prospects who arrive late, hot and unimpressed do not buy land. Acelo runs the inspection convoy so your sales team can sell on it.",
    primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "Recurring weekend runs",
      "Launch-day surge capacity",
      "Multi-stop city pickups",
    ],
    image: {
      src: "/images/fleet/toyota-hilux.png",
      width: 632,
      height: 400,
      alt:
        "An Acelo Logistics Toyota Hilux, used on estate site-inspection runs and unsurfaced access roads.",
    },
  },
  offering: {
    eyebrow: "What we move",
    headline: "Transport that is part of the sale",
    subhead:
      "For a developer, the drive to site is not logistics overhead — it is thirty minutes alone with a prospect.",
    cards: [
      {
        icon: "building",
        title: "Site inspection runs",
        description:
          "Recurring weekend and midweek convoys from a city pickup point to site and back, on a fixed schedule.",
        featured: true,
      },
      {
        icon: "spark",
        title: "Estate launch days",
        description:
          "Surge fleets for launch and open-day events, sized to your expected turnout and held on standby on site.",
      },
      {
        icon: "route",
        title: "Multi-stop pickups",
        description:
          "Several pickup points across the city consolidated into one departure, so prospects do not cross town first.",
      },
      {
        icon: "users",
        title: "Agent & broker runs",
        description:
          "Smaller executive vehicles for agents taking individual clients to site outside the group schedule.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why developers choose Acelo",
    headline: "Comfortable, on time, on brand",
    subhead:
      "Every point below exists to keep the transport out of the conversation, so the land is what gets discussed.",
    props: [
      {
        icon: "clock",
        title: "Departures that hold",
        description:
          "Fixed departure windows with vehicles in position early, so a full convoy is not waiting on one late unit.",
      },
      {
        icon: "route",
        title: "Multi-stop routing",
        description:
          "Pickup points planned around where prospects actually are, consolidated into a single arrival at site.",
      },
      {
        icon: "shield",
        title: "Presentable fleet",
        description:
          "Inspected, air-conditioned vehicles and vetted Professional Pilots — the drive should support the pitch, not undercut it.",
      },
      {
        icon: "wallet",
        title: "Recurring rates",
        description:
          "Standing weekend runs are priced as an ongoing arrangement rather than requoted every Friday.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How an Acelo inspection contract runs",
    subhead: "Agreed once, then it repeats without a weekly negotiation.",
    steps: [
      {
        title: "Contract",
        description:
          "We agree frequency, vehicle classes and recurring rates against your inspection calendar and typical turnout.",
      },
      {
        title: "Route planning",
        description:
          "Pickup points, departure windows and site access are mapped and confirmed with your sales team in writing.",
      },
      {
        title: "Ongoing service",
        description:
          "The run operates on schedule each cycle with tracked units and a named dispatch contact for your team.",
      },
      {
        title: "Launch-day surge",
        description:
          "For open days and launches, the standing fleet is scaled up for the event and returned to normal after.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Site logistics",
    headline: "Capacity that scales with the launch",
    subhead:
      "A standing weekend run and a launch-day surge are handled by the same dispatch desk and the same vetted fleet.",
    stats: [
      { value: proof.fleetScale, label: "Launch-day fleet scaled to turnout, with no fixed cap" },
      { value: proof.multiSite, label: "City pickup points and site access run as one route" },
      { value: proof.vehicleClasses, label: "Vehicle classes, executive through coaster" },
      { value: proof.confirmationTime, label: "Fleet and route confirmation" },
    ],
  },
  faq: {
    headline: "Everything you need to know about site-inspection transport",
    items: [
      {
        question: "Can you run the same inspection route every weekend?",
        answer:
          "Yes. Recurring runs are the standard arrangement — the route, departure window and rate are fixed once rather than requoted each week.",
      },
      {
        question: "What happens on a launch day with a bigger turnout?",
        answer:
          "The standing fleet is scaled up to match your expected turnout, with every unit dispatched from the same desk, then returned to the normal schedule afterwards.",
      },
      {
        question: "Can prospects be picked up from more than one location?",
        answer:
          "Yes. Multiple pickup points across the FCT are consolidated into one planned departure so the group arrives at site together.",
      },
      {
        question: "Do you cover sites outside the city?",
        answer:
          "Yes — sites out toward Kuje, Gwagwalada and beyond the FCT are routine, and access routes are checked before the first run.",
      },
      {
        question: "How are these arrangements priced?",
        answer:
          "Per vehicle per run for recurring contracts, with fuel and pilots included, and a separate agreed rate for launch-day surge capacity.",
      },
    ],
  },
  crossSell: {
    headline: "Other logistics developers ask for",
    subhead: "Site visits are rarely the only movement a project needs.",
    pages: ["/solutions/group-travel", "/solutions/rental", "/partners/fleet"],
  },
  finalCta: {
    headline: "Get prospects to site",
    subhead:
      "Send Acelo HQ your inspection schedule and typical turnout. We will map the route and quote the run the same day.",
    cta: { label: "Message Acelo HQ", href: whatsappUrl },
  },
};
