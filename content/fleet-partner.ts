// Fleet Partner page (/partners/fleet).
// This is the site's one supply-side page — every other page sells a
// service to a customer, this one recruits vehicle owners. Audience tone
// per acelo-copywriting-style.md: owner-to-owner about income and asset
// protection, "vetted network", predictable payouts, confident rather
// than salesy. No earnings figure appears anywhere below: Acelo has not
// published one, and an invented "earn X per month" number is exactly
// the hype the doc rules out.

import type { SolutionPageContent } from "@/content/types";
import { proof } from "@/content/site";

export const fleetPartner: SolutionPageContent = {
  meta: {
    title: "Become a Vehicle & Fleet Partner",
    description:
      "Put your bus, van or truck on Acelo dispatch. Vetted trips, agreed rates per trip and a coordinated network — without chasing your own bookings.",
    path: "/partners/fleet",
  },
  service: {
    name: "Fleet Partnership",
    serviceType: "Vehicle owner and fleet partnership programme",
    description:
      "A partnership programme for vehicle owners and fleet operators in Nigeria, placing vetted vehicles on Acelo's dispatch network at agreed per-trip rates.",
  },
  hero: {
    eyebrow: "Fleet Partnership",
    headline: [
      { text: "Put your vehicle on " },
      { text: "Acelo dispatch", highlight: true },
      { text: "." },
    ],
    subhead:
      "You own the asset. Acelo brings the vetted trips, the coordination and the customers, so your vehicle spends less of the month parked.",
    // Was a blank WhatsApp chat, which left dispatch pulling ten
    // structured fields out of the applicant one question at a time.
    primaryCta: { label: "Apply to become a Partner", href: "/partners/fleet/apply" },
    // Was "About Acelo" -> /about, taken down 2026-09-07. Contact is the
    // right substitute: a vehicle owner weighing this up wants to talk to
    // someone, not read a company history.
    secondaryCta: { label: "Talk to the fleet team", href: "/resources/contact" },
    highlights: [
      "Agreed rate per trip",
      "Corporate and contract work",
      "Vetting before dispatch",
    ],
    // Was the Hino truck. Wrong signal for this page twice over: it is a
    // tipper, so it reads as construction haulage rather than logistics,
    // and it narrows a supply-side pitch to one vehicle class when the
    // offering grid directly below says Acelo dispatches buses, coasters,
    // Hiace, mini vans, executive cars, SUVs AND trucks. The fleet collage
    // shows six of those classes at once, which is the actual promise:
    // whatever you own, there is work for it.
    image: {
      src: "/images/hero/acelo-logistics-vetted-buses-and-cars.png",
      width: 2312,
      height: 1382,
      alt:
        "The range of vehicles Acelo dispatches — BRT and coaster buses, a Hiace, sedans and a Hilux pickup.",
    },
  },
  offering: {
    eyebrow: "Who partners with us",
    headline: "Vehicles the network needs",
    subhead:
      "Acelo dispatches across every class in its fleet. If you own one of these and keep it road-worthy, there is work for it.",
    cards: [
      {
        icon: "bus",
        title: "Buses & coasters",
        description:
          "The units in highest demand — church programmes, school terms and corporate group movement all run on them.",
        featured: true,
      },
      {
        icon: "users",
        title: "Hiace & mini vans",
        description:
          "Mid-size passenger work: team transport, guest transfers and small-group city runs.",
      },
      {
        icon: "building",
        title: "Executive cars & SUVs",
        description:
          "Sedans, Prados and Hilux units for corporate rentals, hotel guests and site visits.",
      },
      {
        icon: "truck",
        title: "Trucks & haulage",
        description:
          "Dyna and Hino class vehicles for cargo, freight and commercial logistics contracts.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why partner with Acelo",
    headline: "Why become a Fleet Partner with Acelo",
    subhead:
      "The hard part of owning a commercial vehicle is not the vehicle. It is finding work that pays reliably and does not wreck the asset.",
    props: [
      {
        icon: "wallet",
        title: "Agreed rate per trip",
        description:
          "Every dispatch comes with the rate confirmed in advance, so you know what a trip pays before you accept it.",
      },
      {
        icon: "route",
        title: "Trips that come to you",
        description:
          "Acelo brings corporate, school, church and event contracts to the network. You stop competing for walk-up hires.",
      },
      {
        icon: "shield",
        title: "A vetted network",
        description:
          "Every partner and pilot is vetted before joining. That standard is what lets Acelo win the contracts your vehicle then runs.",
      },
      {
        icon: "headset",
        title: "Coordination and support",
        description:
          "Dispatch handles routing, customer contact and disruption, so you are running a vehicle rather than an operations desk.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How Acelo Fleet Partnership works",
    subhead: "Four steps from first message to first dispatched trip.",
    steps: [
      {
        title: "Apply",
        description:
          "Message Acelo HQ with your vehicle type, year, condition and the city you operate from.",
      },
      {
        title: "Vetting",
        description:
          "The vehicle is inspected and your papers and driver details are checked — the same standard applied to Acelo's own units.",
      },
      {
        title: "Onboarding",
        description:
          "Rates, coverage and dispatch terms are agreed in writing, and your vehicle is added to the network.",
      },
      {
        title: "Start earning",
        description:
          "Trips are dispatched to you with the rate and route confirmed upfront, and payouts follow the agreed schedule.",
      },
    ],
  },
  trustStats: {
    eyebrow: "The network",
    headline: "A fleet that wins the work your vehicle runs",
    subhead:
      "Partner units are dispatched into the same coordinated operation as Acelo's own — same vetting, same standards, same contracts.",
    stats: [
      { value: proof.vehicleClasses, label: "Vehicle classes dispatched across the network" },
      { value: proof.multiSite, label: "Hubs, venues and routes run from one dispatch desk" },
      { value: proof.coverage, label: "Route coverage available to partners" },
      { value: proof.confirmationTime, label: "Trip and rate confirmation" },
    ],
  },
  faq: {
    headline: "Everything you need to know about fleet partnership",
    items: [
      {
        question: "What vehicles does Acelo accept?",
        answer:
          "Buses and coasters, Hiace and mini vans, executive cars and SUVs, and Dyna or Hino class trucks — provided the vehicle is road-worthy, insured and passes inspection.",
      },
      {
        question: "How much can I earn?",
        answer:
          "Earnings depend on your vehicle class, availability and the contracts it is dispatched into, so Acelo quotes a rate per trip rather than a monthly figure. Message Acelo HQ with your vehicle details for real numbers on your class.",
      },
      {
        question: "Who provides the driver?",
        answer:
          "Either arrangement works. You can operate with your own driver, who is vetted as part of onboarding, or have Acelo assign a vetted Professional Pilot.",
      },
      {
        question: "Who covers fuel and maintenance?",
        answer:
          "Running costs sit with the vehicle owner and are factored into the per-trip rate agreed at onboarding, so the rate you accept already accounts for them.",
      },
      {
        question: "How are payouts handled?",
        answer:
          "On the schedule agreed at onboarding, against trips completed at the confirmed rate. Terms are put in writing before your vehicle takes its first dispatch.",
      },
      {
        question: "Which areas can partners operate in?",
        answer:
          "Abuja and the FCT primarily, with outstation and interstate dispatch available depending on your vehicle class and availability.",
      },
    ],
  },
  crossSell: {
    headline: "The work your vehicle would run",
    subhead:
      "These are the contracts Acelo dispatches into. Partner units run alongside Acelo's own on all of them.",
    pages: ["/solutions/church-events", "/solutions/schools", "/solutions/rental"],
  },
  finalCta: {
    headline: "Ready to put your vehicle to work?",
    subhead:
      "Message Acelo HQ with your vehicle type and city. Vetting and rates can be underway the same day.",
    cta: { label: "Apply to become a Partner", href: "/partners/fleet/apply" },
  },
};
