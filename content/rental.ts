// Vehicle Rental landing page (/solutions/rental).
// Section map from acelo-section-layout.md's Rental entry. The
// "fleet showcase" slot is filled by the real `FleetGrid` component
// rather than an abstract offering grid — actual vehicles, real photos
// and real starting prices already exist for this page, and each card
// links through to that vehicle's booking form.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const rental: SolutionPageContent = {
  meta: {
    title: "Executive Car & Bus Rental in Abuja",
    description:
      "Hire a sedan, SUV, Hiace or Coaster in Abuja with a vetted Professional Pilot. Nine vehicle classes, transparent rates, fleet confirmed the same day.",
    path: "/solutions/rental",
  },
  service: {
    name: "Vehicle Rental",
    serviceType: "Vehicle rental with driver",
    description:
      "Daily, weekly and monthly rental of sedans, SUVs, mini vans, Hiace and Coaster buses and heavy-duty trucks across Abuja and Nigeria, each with a vetted Professional Pilot.",
  },
  hero: {
    eyebrow: "Rentals",
    headline: [
      { text: "Rent a vehicle for " },
      { text: "any occasion", highlight: true },
      { text: " with Acelo." },
    ],
    subhead: `${proof.vehicleClasses} vehicle classes, from executive sedans to full-size coaster and BRT buses — every one inspected, insured and driven by a vetted Professional Pilot.`,
    primaryCta: { label: "Rent a Vehicle", href: "#fleet" },
    secondaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    highlights: [
      "From ₦80,000 per vehicle",
      "Fuel and pilot included",
      "Day, week or month",
    ],
    image: {
      src: "/images/hero/acelo-logistics-vetted-buses-and-cars.png",
      width: 2312,
      height: 1382,
      alt:
        "The Acelo Logistics rental fleet — coaster bus, mini bus, sedans and a Hilux pickup available to hire.",
    },
  },
  valueProps: {
    eyebrow: "Why rent with Acelo",
    headline: "A rental you do not have to manage",
    subhead:
      "The vehicle is the easy part. What you are actually hiring is the dispatch desk behind it.",
    props: [
      {
        icon: "shield",
        title: "Vetted pilots",
        description:
          "Every Professional Pilot is vetted before joining the fleet and knows the route before your pickup time.",
      },
      {
        icon: "wallet",
        title: "One quoted rate",
        description:
          "Fuel, pilot and standard mileage are priced in upfront. The rate confirmed on WhatsApp is the rate you pay.",
      },
      {
        icon: "calendar",
        title: "Flexible terms",
        description:
          "Book a single day, a full week or a standing monthly arrangement, and add units as the job grows.",
      },
      {
        icon: "headset",
        title: "Live dispatch",
        description:
          "A real contact stays with your booking while it runs, rerouting around traffic and closures before they reach you.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "Three steps from request to pickup",
    subhead:
      "No self-serve checkout and no waiting on a callback that never comes.",
    steps: [
      {
        title: "Pick your vehicle",
        description:
          "Choose the class that fits your group and load, then send us your route, dates and passenger count.",
      },
      {
        title: "Get it confirmed",
        description:
          "Dispatch confirms availability, the all-in rate and your assigned pilot, same day in most cases.",
      },
      {
        title: "Ride",
        description:
          "Your pilot arrives at the agreed pickup point, and dispatch stays reachable for the length of the hire.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Rental proof",
    headline: "Every trip, vetted before it starts",
    subhead:
      "Vehicle inspections, pilot vetting and live tracking are standing procedure on every rental, not an upgrade.",
    stats: [
      { value: proof.vehicleClasses, label: "Vehicle classes available to hire" },
      { value: proof.coverage, label: "Reach for outstation and interstate hires" },
      { value: proof.entryRate, label: "Starting rate per vehicle" },
      { value: proof.confirmationTime, label: "Fleet and pilot confirmation" },
    ],
  },
  faq: {
    headline: "Everything you need to know about Acelo rentals",
    items: [
      {
        question: "How much does it cost to rent a vehicle in Abuja?",
        answer: `Rates start at ${proof.entryRate} per vehicle and vary by class, duration and distance. The quote you get back covers fuel, the Professional Pilot and standard mileage, so there is nothing added on the day.`,
      },
      {
        question: "Is a driver included, or can I drive the vehicle myself?",
        answer:
          "Every Acelo rental comes with a vetted Professional Pilot. Self-drive is not offered — the pilot is a core part of the safety and insurance arrangement on each vehicle.",
      },
      {
        question: "Do you require a deposit to hold a booking?",
        answer:
          "Deposit terms depend on the vehicle class and the length of the hire, and are confirmed in writing with your quote before anything is held. Nothing is charged before you agree the rate.",
      },
      {
        question: "Can I rent for a full week or month rather than a day?",
        answer:
          "Yes. Weekly and monthly arrangements are common for corporate teams and project sites, and longer terms are priced per vehicle rather than per day.",
      },
      {
        question: "Which areas do you cover for pickup?",
        answer:
          "Anywhere across the FCT — Maitama, Wuse, Garki, Mabushi, Apo, Kuje and Gwagwalada included — plus outstation and interstate runs dispatched from hubs across the country.",
      },
      {
        question: "How quickly can a vehicle be ready?",
        answer:
          "Most single-vehicle hires can be confirmed the same day. Multi-unit bookings are best raised a few days ahead so dispatch can hold the full set together.",
      },
    ],
  },
  crossSell: {
    headline: "Renting for something specific?",
    subhead:
      "These pages go deeper on the jobs Acelo is asked to move most often.",
    pages: ["/solutions/group-travel", "/solutions/church-events", "/partners/fleet"],
  },
  finalCta: {
    headline: "Ready to move?",
    subhead:
      "Send Acelo HQ your dates, route and passenger count. Your vehicle, rate and pilot come back confirmed the same day.",
    cta: { label: "Rent a Vehicle", href: "#fleet" },
  },
};
