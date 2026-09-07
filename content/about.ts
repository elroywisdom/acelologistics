// NOTE: the /about route is currently TAKEN DOWN — see the header comment
// in app/_about/page.tsx for what was unwired and how to restore it. This
// file is kept so the copy is not lost.
//
// About page copy. Follows the About section map in acelo-section-layout.md:
// hero -> company story -> mission/vision -> the six brand pillars ->
// proof -> final CTA. No FAQ (the doc explicitly says About does not need
// one) and no team/leadership grid — that section needs real, cleared
// headshots of real people, and inventing them would break the kickoff
// doc's asset rule (§7) far more seriously than omitting the section
// does. Add it when photos exist.

import type {
  FinalCtaContent,
  PageHeroContent,
  TrustStatsContent,
  ValuePropBandContent,
} from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const meta = {
  // Deliberately does not contain "Acelo": the root layout's title
  // template already appends " | Acelo Logistics", and "About Acelo
  // Logistics, Abuja | Acelo Logistics" put the brand in twice.
  title: "Our Story: Abuja Fleet & Logistics",
  description:
    "Acelo Logistics moves people and cargo across Nigeria from its Abuja base — vetted vehicles, Professional Pilots and same-day fleet confirmation.",
  path: "/about",
};

export const hero: PageHeroContent = {
  eyebrow: "Our Story",
  headline: [
    { text: "From Abuja bus hire to " },
    { text: "pan-Nigeria", highlight: true },
    { text: " logistics." },
  ],
  subhead:
    "Acelo Logistics & Rentals started as a straightforward Abuja bus-hire operation. It runs today as a dispatch-led mobility company moving corporate teams, congregations, students and cargo across the country.",
  primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
  secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
  highlights: [
    "Abuja HQ, pan-Nigeria dispatch",
    "9 vehicle classes",
    "Vetted pilots, inspected vehicles",
  ],
  image: {
    src: "/images/hero/acelo-logistics-vetted-buses-and-cars.png",
    width: 2312,
    height: 1382,
    alt:
      "The Acelo Logistics fleet — coaster bus, mini bus, sedans and a Hilux pickup dispatched across Nigeria.",
  },
};

export const story = {
  eyebrow: "How we got here",
  headline: "Built on the unglamorous part of logistics",
  paragraphs: [
    "Acelo began by doing one thing for Abuja: putting a clean, road-worthy bus and a driver you could rely on in front of a customer who needed one that week. That is a small promise, and it is the one most operators break.",
    "Keeping it turned out to be an operations problem rather than a vehicle problem. Routes need planning before the day, not on it. Pilots need vetting before they carry a congregation. A convoy of fifteen units needs someone watching every one of them at once, ready to reroute around a closed road in Wuse before a single passenger notices.",
    "So that is what Acelo built: a dispatch desk with a fleet attached, rather than a garage with a phone number. The same discipline now runs corporate rentals, school terms, church conventions, estate launches and cargo haulage — city runs across Maitama, Garki, Mabushi and Apo, and outstation trips well beyond the FCT.",
  ],
  tagline: "Accelerating Africa's Logistics. Seamless. Swift. Sure.",
};

export const missionVision = {
  eyebrow: "What drives us",
  headline: "Mission and vision",
  cards: [
    {
      label: "Mission",
      body: "To move people and goods across Africa with precision — making reliable, professionally operated transport the default rather than the exception.",
    },
    {
      label: "Vision",
      body: "To be the mobility partner African organizations plan around: a fleet that scales with the job and a dispatch desk that absorbs the disruption instead of passing it on.",
    },
  ],
};

export const pillars: ValuePropBandContent = {
  eyebrow: "Brand pillars",
  headline: "Six things we will not trade away",
  subhead:
    "These are the values every route, contract and partnership at Acelo is measured against.",
  props: [
    {
      icon: "spark",
      title: "Speed",
      description:
        "Requests are answered and fleets confirmed the same day. Momentum is part of the service, not a bonus.",
    },
    {
      icon: "route",
      title: "Efficiency",
      description:
        "Routes, hubs and unit counts are planned before the day so you pay for movement, not idle time.",
    },
    {
      icon: "shield",
      title: "Reliability",
      description:
        "Vetted pilots and inspected vehicles, every trip. The bus that was promised is the bus that arrives.",
    },
    {
      icon: "headset",
      title: "Customer-centricity",
      description:
        "One dispatch contact who knows your booking, reachable on WhatsApp or by phone while the trip is running.",
    },
    {
      icon: "compass",
      title: "Innovation",
      description:
        "Live tracking, structured booking and coordinated multi-unit dispatch, applied to a market that mostly still runs on guesswork.",
    },
    {
      icon: "pin",
      title: "African focus",
      description:
        "Built in Abuja for Nigerian roads, Nigerian timelines and the way organizations here actually plan and pay.",
    },
  ],
};

export const trustStats: TrustStatsContent = {
  eyebrow: "Acelo in numbers",
  headline: "Scale you can plan around",
  subhead:
    "Figures drawn from the fleet and service commitments Acelo operates against today.",
  stats: [
    { value: proof.multiSite, label: "Hubs, venues and routes run from one dispatch desk" },
    { value: proof.vehicleClasses, label: "Vehicle classes, sedan through heavy-duty truck" },
    { value: proof.fleetScale, label: "Fleet scaled to the job, with no fixed cap" },
    { value: proof.confirmationTime, label: "Fleet, route and pilots confirmed" },
  ],
};

export const crossSell = {
  headline: "Where Acelo works hardest",
  subhead:
    "The same dispatch desk, pointed at whichever kind of movement your organization runs.",
  pages: ["/solutions/rental", "/solutions/church-events", "/partners/fleet"],
};

export const finalCta: FinalCtaContent = {
  headline: "Let us move it for you",
  subhead:
    "Tell Acelo HQ what you are moving and when. Fleet, route and pilots come back confirmed the same day.",
  cta: { label: "Message Acelo HQ", href: whatsappUrl },
};
