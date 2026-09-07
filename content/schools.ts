// School Transport landing page (/solutions/schools).
// Audience tone per acelo-copywriting-style.md: safety protocols,
// consistency across a term, vetted drivers, parent peace-of-mind —
// slightly warmer than the corporate pages, still professional.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const schools: SolutionPageContent = {
  meta: {
    title: "School Bus Hire & Term Contracts, Abuja",
    description:
      "Term-contract school transport in Abuja: fixed routes, the same vetted Professional Pilot each morning, live tracking for administrators and parents.",
    path: "/solutions/schools",
  },
  service: {
    name: "School Transport",
    serviceType: "School bus hire and term transport contracts",
    description:
      "Termly school transport contracts covering fixed morning and afternoon routes, excursions and inter-school travel, operated with vetted Professional Pilots and tracked vehicles.",
  },
  hero: {
    eyebrow: "School Transport",
    headline: [
      { text: "Book a term school run that " },
      { text: "shows up", highlight: true },
      { text: " daily." },
    ],
    subhead:
      "Fixed routes, the same vetted Professional Pilot every morning, and live tracking your administrators and parents can both rely on.",
    primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "Termly contracts, fixed rates",
      "Vetted pilots per route",
      "Live vehicle tracking",
    ],
    image: {
      src: "/images/fleet/toyota-hiace-bus.png",
      width: 2820,
      height: 1587,
      alt:
        "An Acelo Logistics Toyota Hiace bus of the kind used on daily school run contracts in Abuja.",
    },
  },
  offering: {
    eyebrow: "What we run",
    headline: "Transport for the whole school calendar",
    subhead:
      "A term is more than the morning run. Acelo covers the movements schools actually have to arrange.",
    cards: [
      {
        icon: "graduation",
        title: "Daily route contracts",
        description:
          "Fixed morning and afternoon routes for the length of the term, with assigned pilots and consistent pickup times.",
        featured: true,
      },
      {
        icon: "compass",
        title: "Excursions & field trips",
        description:
          "One-off day trips with the right seat count, arranged inside your existing contract rather than as a new negotiation.",
      },
      {
        icon: "users",
        title: "Fixtures & inter-school travel",
        description:
          "Sports fixtures, debates and competitions, including travel to schools outside the FCT.",
      },
      {
        icon: "bus",
        title: "Staff & event shuttles",
        description:
          "Speech days, parent evenings and staff training runs, moved on the same vetted fleet.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why schools choose Acelo",
    headline: "Consistency is the whole product",
    subhead:
      "Parents notice an unfamiliar driver immediately. Everything below exists so they never have to.",
    props: [
      {
        icon: "shield",
        title: "Vetted pilots",
        description:
          "Every pilot is vetted before joining the fleet and assigned to a route rather than rotated at random.",
      },
      {
        icon: "pin",
        title: "Live tracking",
        description:
          "Administrators can see where a bus is, so a question from a parent gets an answer instead of a callback.",
      },
      {
        icon: "calendar",
        title: "Term contracts",
        description:
          "Rates and routes are fixed for the term, which makes school transport a budget line rather than a monthly negotiation.",
      },
      {
        icon: "headset",
        title: "One point of contact",
        description:
          "A named dispatch contact who knows your routes, reachable while the run is happening.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How an Acelo school contract starts",
    subhead: "Set up once before the term, then it simply runs.",
    steps: [
      {
        title: "Enrolment & contract",
        description:
          "We map student pickup areas against your school run times and agree a rate for the full term in writing.",
      },
      {
        title: "Route assignment",
        description:
          "Each route is assigned a vehicle and a named pilot, then walked before the first day of term.",
      },
      {
        title: "Daily operation",
        description:
          "Morning and afternoon runs operate on the fixed schedule, tracked live, with dispatch covering absences.",
      },
      {
        title: "Term renewal",
        description:
          "A short review at term end covers timing, capacity and route changes before the next term is confirmed.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Safety first",
    headline: "Vetted before it ever carries a student",
    subhead:
      "Pilot vetting and vehicle inspection are standing procedure on every unit in the fleet, school routes included.",
    stats: [
      { value: proof.vehicleClasses, label: "Vehicle classes, sized to your route" },
      { value: proof.multiSite, label: "Routes and pickup points run from one dispatch desk" },
      { value: proof.confirmationTime, label: "Route and pilot confirmation" },
      { value: proof.coverage, label: "Coverage for outstation fixtures" },
    ],
  },
  faq: {
    headline: "Everything you need to know about school transport",
    items: [
      {
        question: "How is a term contract priced?",
        answer:
          "Per route for the full term, based on distance, vehicle class and the number of daily runs — not per trip. The rate is fixed in writing before the term starts.",
      },
      {
        question: "Are fuel and the driver included in the rate?",
        answer:
          "Yes. Fuel, the Professional Pilot and standard mileage are priced into the contract rate, so there is no separate running-cost conversation mid-term.",
      },
      {
        question: "How are drivers vetted?",
        answer:
          "Every pilot is vetted before joining the Acelo fleet and is assigned to a specific school route rather than rotated, so students and parents see the same person each day.",
      },
      {
        question: "Can parents or administrators see where the bus is?",
        answer:
          "Vehicles are tracked live and dispatch can confirm a bus's position on request, so the school can answer a parent directly.",
      },
      {
        question: "What happens if a driver is unavailable?",
        answer:
          "Dispatch covers the route with another vetted pilot from the fleet and tells the school before the run, rather than after a bus fails to arrive.",
      },
      {
        question: "Can you handle excursions outside Abuja?",
        answer:
          "Yes — outstation and interstate trips are dispatched from hubs across the country and can be arranged under your existing term contract.",
      },
    ],
  },
  crossSell: {
    headline: "Other ways schools work with Acelo",
    subhead:
      "Term routes are one part of what the dispatch desk covers.",
    pages: ["/solutions/group-travel", "/solutions/rental", "/partners/fleet"],
  },
  finalCta: {
    headline: "Planning next term?",
    subhead:
      "Send Acelo HQ your routes and student numbers. We will map the fleet and come back with term pricing the same day.",
    cta: { label: "Message Acelo HQ", href: whatsappUrl },
  },
};
