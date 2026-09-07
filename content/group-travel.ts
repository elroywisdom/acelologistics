// Group Travel landing page (/solutions/group-travel).
// Audience tone per acelo-copywriting-style.md: large-group coordination,
// cost efficiency per seat, a single point of contact for complex
// itineraries.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const groupTravel: SolutionPageContent = {
  meta: {
    title: "Group Travel & Large Group Bus Hire",
    description:
      "Move 20 to 600 people on one plan. Multi-unit convoys for retreats, weddings and interstate group travel, with one dispatch contact throughout.",
    path: "/solutions/group-travel",
  },
  service: {
    name: "Group Travel",
    serviceType: "Large group transport and multi-vehicle charter",
    description:
      "Multi-vehicle group travel for corporate retreats, weddings, association trips and interstate movement, coordinated as a single convoy with one dispatch contact.",
  },
  hero: {
    eyebrow: "Group Travel",
    headline: [
      { text: "Book a convoy for your next " },
      { text: "group trip", highlight: true },
      { text: "." },
    ],
    subhead:
      "One itinerary, one contact and one invoice — however many vehicles the group needs, and however many cities the trip crosses.",
    primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "One contact, one invoice",
      "Mixed vehicle classes",
      "Interstate and outstation",
    ],
    image: {
      src: "/images/fleet/new-model-coaster-bus.png",
      width: 628,
      height: 336,
      alt:
        "An Acelo Logistics new-model coaster bus, dispatched in convoy for large group travel.",
    },
  },
  offering: {
    eyebrow: "Trips we move",
    headline: "When the group is bigger than one bus",
    subhead:
      "Group travel goes wrong in the gaps between vehicles. These are the trips Acelo plans as one movement.",
    cards: [
      {
        icon: "users",
        title: "Corporate retreats",
        description:
          "Whole teams moved to an offsite venue and back, with vehicles held on standby for the duration.",
        featured: true,
      },
      {
        icon: "spark",
        title: "Weddings & family events",
        description:
          "Guest movement between ceremony, reception and lodging, timed around a programme rather than a clock.",
      },
      {
        icon: "route",
        title: "Interstate group travel",
        description:
          "Long-distance convoys with planned rest stops, tracked end to end from departure to arrival.",
      },
      {
        icon: "compass",
        title: "Association & club trips",
        description:
          "Alumni sets, cooperatives and member groups travelling together on a shared itinerary and a shared bill.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why Acelo",
    headline: "One plan instead of five phone numbers",
    subhead:
      "Hiring five buses from five operators is five chances for the day to fall apart. This is the alternative.",
    props: [
      {
        icon: "headset",
        title: "Single point of contact",
        description:
          "One dispatch contact owns the whole convoy, so nobody in your group is chasing individual drivers.",
      },
      {
        icon: "wallet",
        title: "Efficient per seat",
        description:
          "Vehicle classes are mixed to match your actual headcount, so you are not paying for empty seats.",
      },
      {
        icon: "route",
        title: "Convoy coordination",
        description:
          "Departures, rest stops and arrivals are synchronised across every unit rather than left to each driver.",
      },
      {
        icon: "pin",
        title: "Tracked end to end",
        description:
          "Every unit is tracked live, so an organiser always knows where the back of the convoy is.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How Acelo plans a group movement",
    subhead: "Four steps from headcount to debrief.",
    steps: [
      {
        title: "Intake",
        description:
          "Share group size, itinerary and timings. We size the convoy and mix vehicle classes to your real headcount.",
      },
      {
        title: "Fleet assignment",
        description:
          "Units, pilots and departure windows are allocated and confirmed in writing, with the full rate agreed upfront.",
      },
      {
        title: "Travel day",
        description:
          "Dispatch coordinates every unit live, keeps the convoy synchronised and handles reroutes without involving you.",
      },
      {
        title: "Debrief",
        description:
          "A short wrap-up of timings and any changes, so the next trip for the same group starts from real numbers.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Group scale",
    headline: "Sized for the whole group, not the average one",
    subhead:
      "Convoy size is set by your headcount and route, and every unit in it is inspected and pilot-vetted.",
    stats: [
      { value: proof.multiSite, label: "Pickups, stops and arrivals run from one dispatch desk" },
      { value: proof.fleetScale, label: "Convoy scaled to your headcount, with no fixed cap" },
      { value: proof.vehicleClasses, label: "Vehicle classes to mix and match" },
      { value: proof.confirmationTime, label: "Convoy plan confirmation" },
    ],
  },
  faq: {
    headline: "Everything you need to know about group travel",
    items: [
      {
        question: "What is the largest group Acelo can move?",
        answer:
          "There is no fixed cap. The convoy is sized to your headcount and coordinated from one dispatch desk; very large movements are run in planned waves rather than one oversized convoy.",
      },
      {
        question: "Can we mix vehicle types in one booking?",
        answer:
          "Yes, and it usually costs less. Mixing a coaster with a Hiace and a mini van often matches a headcount more efficiently than adding another large bus.",
      },
      {
        question: "Do you cover interstate and outstation travel?",
        answer:
          "Yes. Long-distance convoys are dispatched from hubs across the country, with rest stops planned into the itinerary before departure.",
      },
      {
        question: "How is a group trip priced?",
        answer:
          "Per vehicle, based on class, distance and duration, with fuel and pilots included. You get one combined quote for the convoy rather than a bill per bus.",
      },
      {
        question: "How far ahead should we book?",
        answer:
          "A few days ahead for a multi-unit convoy so dispatch can hold the full set together. Smaller groups can often still be confirmed the same day.",
      },
    ],
  },
  crossSell: {
    headline: "Other movements we coordinate",
    subhead: "Different audiences, the same convoy discipline.",
    pages: ["/solutions/church-events", "/solutions/travel-tour-partners", "/partners/fleet"],
  },
  finalCta: {
    headline: "Travelling as a group?",
    subhead:
      "Send Acelo HQ your headcount, route and dates. We will size the convoy and quote it as one plan, the same day.",
    cta: { label: "Message Acelo HQ", href: whatsappUrl },
  },
};
