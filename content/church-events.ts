// Church & Event Transport landing page (/solutions/church-events).
// Audience tone per acelo-copywriting-style.md: scale, reliability under
// pressure, stewardship of large groups. Conference/convention logistics
// is referenced as a category — no past church client is named, since the
// copywriting doc requires Acelo's approval before naming one.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const churchEvents: SolutionPageContent = {
  meta: {
    title: "Church Convention & Event Transport",
    description:
      "Transport coordination for church conventions, crusades and programmes in Abuja. Multiple pickup hubs, synchronised arrivals, live rerouting on the day.",
    path: "/solutions/church-events",
  },
  service: {
    name: "Church & Event Transport",
    serviceType: "Event and congregation transport",
    description:
      "Coordinated multi-vehicle transport for church conventions, crusades, programmes and corporate events, including hub pickup planning and event-day dispatch control.",
  },
  hero: {
    eyebrow: "Event Logistics",
    // "Book a coaster fleet..." until 2026-09-07 — El-Roy flagged that it
    // read as if coasters were the only option for church work. Acelo runs
    // every bus class plus cars for church programmes, so the headline now
    // names the service (a fleet matched to the job) rather than one
    // vehicle class.
    headline: [
      { text: "Book the right fleet for your next " },
      { text: "convention", highlight: true },
      { text: "." },
    ],
    subhead:
      "Every pickup hub, venue and route coordinated from one dispatch desk — so the programme runs to time however many locations it spans.",
    primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "Multi-hub pickup planning",
      "Every vehicle class available",
      "One dispatch contact",
    ],
    image: {
      src: "/images/fleet/cng-brt-bus.png",
      width: 740,
      height: 420,
      alt:
        "An Acelo Logistics CNG BRT bus, the largest single unit dispatched for church conventions and programmes.",
    },
  },
  offering: {
    eyebrow: "Programmes we move",
    headline: "Built for the days that cannot slip",
    subhead:
      "Church calendars are unforgiving. These are the movements Acelo is most often asked to run.",
    cards: [
      {
        icon: "bus",
        title: "Conventions & crusades",
        description:
          "Multi-day, multi-site programmes moving large numbers between lodging, venue and hub points on a fixed timetable.",
        featured: true,
      },
      {
        icon: "users",
        title: "Weekly service shuttles",
        description:
          "Standing Sunday and midweek runs on repeating routes, with the same pilots each week.",
      },
      {
        icon: "route",
        title: "Outstation programmes",
        description:
          "Interstate travel to a host church or camp ground, planned as a single convoy with rest stops built in.",
      },
      {
        icon: "spark",
        title: "Weddings & special events",
        description:
          "Guest movement between ceremony, reception and lodging, with vehicles held on standby between legs.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why Acelo",
    headline: "Scale that behaves like one vehicle",
    subhead:
      "Coordinating fifteen buses is a different job from renting fifteen buses. This is the difference.",
    props: [
      {
        icon: "route",
        title: "Hub pickup planning",
        description:
          "Pickup points are set by where your members actually live, so nobody crosses the city to catch a bus.",
      },
      {
        icon: "headset",
        title: "Zero-disruption dispatch",
        description:
          "A closed road or a late departure is absorbed by dispatch and rerouted, before it reaches your programme team.",
      },
      {
        icon: "shield",
        title: "Vetted pilots",
        description:
          "Every pilot carrying your congregation is vetted before joining the fleet, and briefed on the route ahead of the day.",
      },
      {
        icon: "check",
        title: "Post-event report",
        description:
          "You get a wrap-up of what ran, what moved and what changed — useful for planning the next one.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How Acelo runs an event fleet",
    subhead:
      "Four steps, agreed before the day so nothing is decided in a car park at 6am.",
    steps: [
      {
        title: "Consultation",
        description:
          "Share attendance estimates, venues and programme times. We size the fleet against real numbers, not a guess.",
      },
      {
        title: "Route & hub planning",
        description:
          "Pickup hubs, departure windows and unit allocation are mapped and confirmed with your team in writing.",
      },
      {
        title: "Event-day coordination",
        description:
          "Dispatch tracks every unit live, reroutes around traffic and keeps one contact line open to your coordinator.",
      },
      {
        title: "Post-event report",
        description:
          "A short summary of trips run, timings and any changes made, so the next programme starts from real data.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Under pressure",
    headline: "Every trip, vetted for your peace of mind",
    subhead:
      "Large-group movement fails in the gaps between locations. These are the commitments Acelo holds itself to on programme days.",
    stats: [
      { value: proof.multiSite, label: "Pickup hubs, venues and routes run from one dispatch desk" },
      { value: proof.fleetScale, label: "Fleet scaled to the programme, with no fixed unit cap" },
      { value: proof.confirmationTime, label: "Fleet and route confirmation" },
      { value: proof.coverage, label: "Dispatch coverage for outstation programmes" },
    ],
  },
  faq: {
    headline: "Everything you need to know about event transport",
    items: [
      {
        question: "How far ahead should we book for a convention?",
        answer:
          "A few days ahead is enough for dispatch to hold a full multi-unit set together. Single vehicles can usually still be confirmed the same day.",
      },
      {
        question: "How many people can Acelo move for one programme?",
        answer:
          "There is no fixed cap. The fleet is sized to your programme and scaled as attendance grows, and every unit is coordinated from one dispatch desk rather than booked separately. Very large programmes are run in planned waves across locations.",
      },
      {
        question: "Can members be picked up from different parts of the city?",
        answer:
          "Yes — that is the point of hub planning. Pickup points are set around where your members actually live across the FCT, and each unit is assigned to a hub.",
      },
      {
        question: "What happens if a route is blocked on the day?",
        answer:
          "Dispatch tracks every unit live and reroutes it. Your programme coordinator is told what changed, not asked to solve it.",
      },
      {
        question: "What are the deposit and payment terms?",
        answer:
          "Terms are confirmed in writing alongside your quote before any vehicle is held, and depend on fleet size and programme length.",
      },
    ],
  },
  crossSell: {
    headline: "Other movements we plan",
    subhead:
      "Event fleets share a dispatch desk with the rest of Acelo's work.",
    pages: ["/solutions/group-travel", "/solutions/rental", "/partners/fleet"],
  },
  finalCta: {
    headline: "Planning a programme?",
    subhead:
      "Send Acelo HQ your dates, venues and attendance estimate. We will size the fleet and come back with a plan the same day.",
    cta: { label: "Message Acelo HQ", href: whatsappUrl },
  },
};
