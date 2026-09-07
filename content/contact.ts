// Contact page (/resources/contact).
//
// Structure benchmarked from shuttlers.co/resources/contact-us (routed
// contact cards -> socials -> general enquiries -> FAQ), with Acelo's own
// wording throughout — the copywriting doc allows benchmarking structure
// but forbids lifting the benchmark site's copy.
//
// EVERY contact detail below is one Acelo already publishes elsewhere in
// this codebase: the WhatsApp/phone number from lib/booking.ts and the
// LocalBusiness schema, the social handles from the site footer, and
// "Abuja" from the same schema. Nothing here is invented.
//
// Both of the gaps this file used to carry are now closed: the street
// address was supplied on 2026-09-07, and operation@acelologistics.com is
// confirmed as the public contact address because Acelo publishes it in
// its own Terms of Service and Privacy Policy. Both live in
// `content/site.ts` so the footer, this page and the LocalBusiness schema
// stay in step — the NAP consistency the SEO doc asks for.

import type { FaqContent, FinalCtaContent, PageHeroContent } from "@/content/types";
import { phoneNumber, proof, whatsappUrl } from "@/content/site";
import { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";

export const meta = {
  title: "Contact Acelo Logistics, Abuja",
  description:
    "Reach Acelo HQ on WhatsApp or by phone for bookings, dispatch and fleet partnership. Abuja-based, dispatching across Nigeria, same-day confirmation.",
  path: "/resources/contact",
};

export const hero: PageHeroContent = {
  eyebrow: "Contact",
  headline: [
    { text: "Talk to " },
    { text: "Acelo HQ", highlight: true },
    { text: "." },
  ],
  subhead:
    "Bookings, quotes and live trips are all handled by the same dispatch desk — a real person who can see your booking, not a ticket queue.",
  primaryCta: { label: "Message Acelo HQ", href: whatsappUrl },
  secondaryCta: { label: "See the fleet", href: "/solutions/rental" },
  highlights: ["Same-day confirmation", "Abuja HQ, pan-Nigeria", "WhatsApp or phone"],
  image: {
    src: "/images/hero/acelo-logistics-vetted-buses-and-cars.png",
    width: 2312,
    height: 1382,
    alt: "The Acelo Logistics fleet — coaster bus, mini bus, sedans and a Hilux pickup dispatched across Nigeria.",
  },
};

export type ContactChannel = {
  icon: "headset" | "clock" | "truck";
  title: string;
  description: string;
  cta: { label: string; href: string };
  /** Shown under the CTA as the raw detail, so it can be read or copied
   * without following the link. */
  detail?: string;
};

export const channels: ContactChannel[] = [
  {
    icon: "headset",
    title: "Bookings and dispatch",
    description:
      "Send your dates, route and passenger count. Dispatch confirms the fleet, the all-in rate and your pilot — same day in most cases.",
    cta: { label: "Message on WhatsApp", href: whatsappUrl },
    detail: phoneNumber,
  },
  {
    icon: "clock",
    title: "A trip already running",
    description:
      "If a vehicle is on the road and something needs to change, call rather than message. The dispatch line is the fastest route to the pilot.",
    cta: { label: `Call ${phoneNumber}`, href: `tel:+${ACELO_WHATSAPP_NUMBER}` },
  },
  {
    icon: "truck",
    title: "Fleet partnership",
    description:
      "Own a bus, van or truck and want it on Acelo dispatch? Start with the partnership page, then message HQ with your vehicle details.",
    cta: { label: "Apply to partner", href: "/partners/fleet/apply" },
  },
];

export const coverage = {
  eyebrow: "Where we work",
  headline: "Abuja-based, dispatched nationwide",
  body: `Acelo runs from ${proof.hq}, covering the FCT — Maitama, Wuse, Garki, Mabushi, Apo, Kuje and Gwagwalada — with outstation and interstate trips dispatched from hubs across the country.`,
  stats: [
    { value: proof.hq, label: "Head office and dispatch desk" },
    { value: proof.coverage, label: "Route coverage for outstation trips" },
    { value: proof.confirmationTime, label: "Fleet, route and pilot confirmation" },
    { value: proof.vehicleClasses, label: "Vehicle classes available to book" },
  ],
};

export const faq: FaqContent = {
  headline: "Before you get in touch",
  items: [
    {
      question: "What is the fastest way to reach Acelo?",
      answer:
        "WhatsApp. It is the channel dispatch works from all day, and sending your dates, route and passenger count in the first message usually gets a quote back the same day.",
    },
    {
      question: "Is there an online booking system?",
      answer:
        "Each vehicle has a booking form on its page in the fleet, which collects your trip details and hands them to dispatch. There is no self-serve checkout — every booking is confirmed by a person.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "Dispatch works around the trips it is running, so a vehicle on the road at night has a line to call. For quotes and new bookings, a same-day response is the standard.",
    },
    {
      question: "Do you cover trips outside Abuja?",
      answer:
        "Yes. Outstation and interstate trips are dispatched from hubs across the country, and long-distance routes are planned with rest stops before departure.",
    },
    {
      question: "I want to put my vehicle on Acelo dispatch. Where do I start?",
      answer:
        "The fleet partnership page covers vehicle requirements, vetting and how rates work. Message Acelo HQ with your vehicle type, year and city and vetting can be underway the same day.",
    },
  ],
};

export const finalCta: FinalCtaContent = {
  headline: "Tell us what you are moving",
  subhead:
    "Dates, route and passenger count is all Acelo HQ needs to come back with a fleet, a rate and a pilot.",
  cta: { label: "Message Acelo HQ", href: whatsappUrl },
};
