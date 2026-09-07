// Hotels landing page (/solutions/hotels).
// Audience tone per acelo-copywriting-style.md: guest-experience
// continuity — airport transfers, executive comfort, on-brand punctuality
// that reflects well on the hotel. The buyer is a GM or front-office
// manager whose own guest satisfaction score is on the line.

import type { SolutionPageContent } from "@/content/types";
import { proof, whatsappUrl } from "@/content/site";

export const hotels: SolutionPageContent = {
  meta: {
    title: "Hotel Airport Transfers & Guest Shuttles",
    description:
      "Executive airport transfers and guest shuttles for Abuja hotels. Vetted Professional Pilots, flight-timed pickups and vehicles that match your property.",
    path: "/solutions/hotels",
  },
  service: {
    name: "Hotel & Guest Transfers",
    serviceType: "Hotel guest transport and airport transfers",
    description:
      "Airport transfers, executive guest transport and event shuttles for hotels and serviced apartments, operated with vetted Professional Pilots and inspected vehicles.",
  },
  hero: {
    eyebrow: "Hospitality",
    headline: [
      { text: "Book airport transfers your guests will " },
      { text: "remember", highlight: true },
      { text: "." },
    ],
    subhead:
      "The ride from Nnamdi Azikiwe International is the first thing your guest experiences and the last thing they do before checkout. Acelo makes sure both go well.",
    primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
    secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
    highlights: [
      "Flight-timed pickups",
      "Billed to the property",
      "Executive vehicles",
    ],
    // Was the Prado, which suits this page's executive framing better —
    // but that photo carries a "Gulliver" dealer plate (a Japanese used-car
    // retailer). Small enough to miss on a 370px fleet card; not something
    // to enlarge to 560px on an Acelo hero. Swap back the moment there is
    // an executive-car photo without another company's branding on it.
    image: {
      src: "/images/fleet/toyota-sienna-mini-van.png",
      width: 628,
      height: 440,
      alt:
        "An Acelo Logistics Toyota Sienna, used for hotel guest transfers and airport pickups.",
    },
  },
  offering: {
    eyebrow: "What we cover",
    headline: "Every movement a guest makes",
    subhead:
      "Hotels are judged on the parts of a stay that happen outside the building too.",
    cards: [
      {
        icon: "compass",
        title: "Airport transfers",
        description:
          "Arrival and departure runs timed to actual flight status, with the pilot waiting before the guest lands.",
        featured: true,
      },
      {
        icon: "building",
        title: "Executive guest transport",
        description:
          "Sedans and SUVs for business guests moving to meetings across the city on their own schedule.",
      },
      {
        icon: "users",
        title: "Conference & event shuttles",
        description:
          "Multi-unit shuttles between your property and an event venue, running on a loop for the duration.",
      },
      {
        icon: "route",
        title: "Excursions & city runs",
        description:
          "Day trips and city tours arranged through your concierge, on vehicles that match the room rate.",
      },
    ],
  },
  valueProps: {
    eyebrow: "Why hotels choose Acelo",
    headline: "Punctuality that reflects on you",
    subhead:
      "A late or shabby transfer becomes a review of your hotel, not of the transport company. That is the problem being solved here.",
    props: [
      {
        icon: "clock",
        title: "Flight-timed pickups",
        description:
          "Arrival runs are set against live flight times, so a delayed guest is still met rather than left waiting.",
      },
      {
        icon: "shield",
        title: "Presentation standards",
        description:
          "Inspected vehicles and vetted Professional Pilots, briefed to represent your property rather than ours.",
      },
      {
        icon: "wallet",
        title: "Account billing",
        description:
          "Standing arrangements are billed to the property on agreed rates instead of settled by guests at the kerb.",
      },
      {
        icon: "headset",
        title: "Front-desk line",
        description:
          "A direct dispatch contact your front office can reach while a guest is waiting, not a general enquiry inbox.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    headline: "How a hotel account runs",
    subhead: "Set it up once, then your front desk simply books.",
    steps: [
      {
        title: "Onboarding",
        description:
          "We agree vehicle classes, service standards and account rates against the guest profile your property serves.",
      },
      {
        title: "Booking flow",
        description:
          "Your front office sends the guest name, flight and time to one dispatch contact — nothing else is needed.",
      },
      {
        title: "Guest pickup",
        description:
          "The pilot is in position ahead of the guest, tracked live, with the front desk notified on pickup.",
      },
      {
        title: "Reporting",
        description:
          "A periodic summary of transfers, timings and spend for the account, ready for your finance team.",
      },
    ],
  },
  trustStats: {
    eyebrow: "Guest standards",
    headline: "Vetted, inspected, and on time",
    subhead:
      "The same vetting and inspection routine that covers corporate contracts covers every guest transfer.",
    stats: [
      { value: proof.vehicleClasses, label: "Vehicle classes, sedan through coaster" },
      { value: proof.confirmationTime, label: "Account and transfer confirmation" },
      { value: proof.hq, label: "Base city, with FCT-wide coverage" },
      { value: proof.coverage, label: "Reach for guest outstation trips" },
    ],
  },
  faq: {
    headline: "Everything you need to know about hotel transfers",
    items: [
      {
        question: "Can transfers be billed to the property rather than the guest?",
        answer:
          "Yes. Account billing on agreed rates is the standard arrangement, so your guest never settles a fare at the kerb.",
      },
      {
        question: "What happens when a guest's flight is delayed?",
        answer:
          "Pickups are set against live flight times rather than the scheduled arrival, and dispatch adjusts the run without your front office having to rebook.",
      },
      {
        question: "Which vehicles are used for VIP guests?",
        answer:
          "Executive sedans and SUVs, including the Prado, for individual guests, with Hiace and coaster units available for groups and conference shuttles.",
      },
      {
        question: "Can you run a shuttle loop for a conference?",
        answer:
          "Yes — multi-unit shuttles running on a loop between your property and a venue are coordinated as one dispatch, for the length of the event.",
      },
      {
        question: "How quickly can an account be set up?",
        answer:
          "Rates and service standards can usually be agreed the same day, and your front office can book from the moment the account is confirmed.",
      },
    ],
  },
  crossSell: {
    headline: "Other ways properties use Acelo",
    subhead: "Guest movement is rarely the only transport a property arranges.",
    pages: ["/solutions/travel-tour-partners", "/solutions/rental", "/partners/fleet"],
  },
  finalCta: {
    headline: "Give your guests a better arrival",
    subhead:
      "Send Acelo HQ your typical transfer volume and guest profile. We will come back with account rates the same day.",
    cta: { label: "Message Acelo HQ", href: whatsappUrl },
  },
};
