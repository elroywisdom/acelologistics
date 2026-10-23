// Typed copy/data for the Home page. Pulled verbatim from Figma node
// 70:148 (get_design_context, section by section) — see project notes for
// the token corrections applied on top of the raw Figma export.

export const heroContent = {
  headline: [
    { text: "Book vetted buses and cars for any move, ", highlight: false },
    { text: "anywhere", highlight: true },
    { text: " in Nigeria.", highlight: false },
  ],
  subhead:
    "Corporate rentals, event logistics and interstate transport — vetted vehicles and professional pilots, dispatched from hubs across the country.",
  // "Rent A Vehicle" used to jump straight to a generic WhatsApp chat with
  // no vehicle context. Every "Rent A Vehicle" CTA site-wide (this one,
  // NavBar.tsx) now points at the fleet grid instead (2026-08-19,
  // El-Roy's call) — the actual per-vehicle WhatsApp handoff happens
  // from `/fleet/[vehicleId]` after the booking form, not before it.
  primaryCta: { label: "Rent A Vehicle", href: "/#fleet" },
  secondaryCta: { label: "View Our Fleet", href: "/#fleet" },
  image: {
    src: "/images/hero/acelo-logistics-vetted-buses-and-cars.png",
    width: 2312,
    height: 1382,
    alt: "Acelo Logistics fleet — coaster bus, mini bus, sedans, and a Hilux pickup, the vetted vehicles available to rent.",
  },
};

// `src: null` marks a logo whose Figma export came through as an empty
// 1x1 pixel (a broken export, not a missing file) — see README. The strip
// skips rendering those until a real export replaces them.
export const trustLogos = [
  { name: "Frontline Homes Limited", src: null, width: 1, height: 1 },
  { name: "Avis", src: "/images/logos/avis.png", width: 131, height: 69 },
  { name: "Celebration Church", src: "/images/logos/cci.png", width: 223, height: 82 },
  { name: "COZA", src: "/images/logos/coza.png", width: 93, height: 92 },
  { name: "Takeout Media", src: "/images/logos/takeoutmedia.png", width: 165, height: 68 },
  { name: "TM Con", src: "/images/logos/tmcon.png", width: 176, height: 81 },
  { name: "Gatefield", src: "/images/logos/gatefield.png", width: 157, height: 82 },
  { name: "Realforte", src: "/images/logos/realforte.png", width: 254, height: 42 },
];

export const vehicleTypeBand = {
  headline: "Every Vehicle Type, One Vetted Fleet.",
  subhead:
    "Sedans for city runs, buses for big groups — every vehicle in the Acelo fleet is inspected, insured, and driven by a vetted Professional Pilot.",
  pills: [
    { label: "Acelo VIP", tone: "ink" as const, rotate: -12, top: "6%", left: "8%" },
    { label: "Dyna Truck", tone: "primary" as const, rotate: 8, top: "15%", right: "10%" },
    { label: "Corolla", tone: "tint" as const, rotate: 15, top: "42%", left: "3%" },
    { label: "Coaster", tone: "accent" as const, rotate: -10, top: "38%", right: "4%" },
  ],
  dock: [
    { label: "Mini Bus", tone: "tint" as const, rotate: -5 },
    { label: "Bus", tone: "ink" as const, rotate: 6 },
    { label: "Hiace", tone: "primary" as const, rotate: -3 },
    { label: "Mini Van", tone: "accent" as const, rotate: 4 },
  ],
};

export type FleetVehicle = {
  id: string;
  name: string;
  seats?: string;
  description: string;
  price: string;
  image: { src: string; width: number; height: number };
};

export const fleetVehicles: FleetVehicle[] = [
  {
    id: "coaster-standard",
    name: "Coaster Bus - Standard",
    seats: "27 Seater",
    description:
      "The roomy and comfortable buses can fit 27 passengers, providing you with an excellent group transit experience.",
    price: "₦150,000.00",
    image: { src: "/images/fleet/standard-coaster-bus.png", width: 512, height: 340 },
  },
  {
    id: "hilux",
    name: "Hilux - New Shape",
    seats: "5 Seater",
    description:
      "Tough, stylish, and dependable. The Toyota Hilux Double Cabin is perfect for site visits, rugged terrains, and premium utility.",
    price: "₦130,000.00",
    image: { src: "/images/fleet/toyota-hilux.png", width: 632, height: 400 },
  },
  {
    id: "prado",
    name: "Prado SUV",
    seats: "4 Seater",
    description:
      "Experience bold sophistication in motion — spacious SUV styling with a highly comfortable interior.",
    price: "₦160,000.00",
    image: { src: "/images/fleet/toyota-prado-white.png", width: 576, height: 344 },
  },
  {
    id: "sienna",
    name: "Mini Van",
    seats: "6 Seater",
    description:
      "Comfortable, fuel-efficient rides for city trips and small-group travel.",
    price: "₦130,000.00",
    image: { src: "/images/fleet/toyota-sienna-mini-van.png", width: 628, height: 440 },
  },
  {
    id: "coaster-new",
    name: "Coaster Bus - New Shape",
    seats: "27 Seater",
    description:
      "Modern, roomy and exceptionally comfortable. The perfect solution for corporate retreats, tours, and large group transit.",
    price: "₦350,000.00",
    image: { src: "/images/fleet/new-model-coaster-bus.png", width: 628, height: 336 },
  },
  {
    id: "hiace",
    name: "Hiace",
    seats: "16 Seater",
    description:
      "The classic Toyota Hiace model. Comfortable and highly efficient for cross-city travel and medium team transit.",
    price: "₦130,000.00",
    image: { src: "/images/fleet/toyota-hiace-bus.png", width: 2820, height: 1587 },
  },
  {
    id: "dyna-truck",
    name: "Dyna Truck",
    description:
      "Rugged, reliable, and built for heavy-duty tasks. Delivers powerful performance for logistics, haulage, and commercial transport.",
    price: "₦80,000.00",
    image: { src: "/images/fleet/toyota-dyna-truck.png", width: 740, height: 440 },
  },
  {
    id: "hino-truck",
    name: "Hino Truck",
    description:
      "Powerful, durable, and built for heavy-duty performance. The ideal choice for freight hauling, logistics, and commercial fleet operations.",
    price: "₦100,000.00",
    image: { src: "/images/fleet/hino-truck.png", width: 668, height: 416 },
  },
  {
    id: "cng-brt",
    name: "CNG BRT Bus",
    seats: "56 Seater",
    description:
      "Eco-friendly, efficient, and built for mass transit. Clean, reliable performance for urban public transportation and rapid transit corridors.",
    price: "₦250,000.00",
    image: { src: "/images/fleet/cng-brt-bus.png", width: 740, height: 420 },
  },
];

export const fleetBanner = {
  title: "Not Sure Which Vehicle Fits?",
  subtitle: "Message Acelo HQ and we'll help you pick the right fit.",
  cta: { label: "Message Acelo HQ", href: "https://wa.me/2348103115430" },
};

export const whyAcelo = {
  eyebrow: "Why Acelo",
  headline: "Why organizations choose Acelo",
  subhead:
    "Built for teams that need reliability, visibility, and scale — without the operational overhead.",
  props: [
    {
      icon: "check" as const,
      title: "Vetted Reliability",
      description:
        "Every vehicle and professional pilot is vetted for safety and comfort.",
    },
    {
      icon: "arrow" as const,
      title: "Pan-Nigeria Reach",
      description:
        "City-wide coordination and long-distance outstation trips, covered.",
    },
    {
      icon: "grid" as const,
      title: "Scalable Fleet",
      // Was "Up to 15+ units coordinated simultaneously for large-scale
      // events." Removed 2026-09-07 on El-Roy's instruction: Acelo has run
      // church programmes larger than that, so publishing the figure
      // advertised a ceiling the company had already cleared. This is the
      // one string on Home changed away from Figma node 70:211 — the
      // frame's own copy is now out of date, not the code.
      description:
        "Multi-unit convoys coordinated as one dispatch, scaled to the size of the event.",
    },
    {
      icon: "target" as const,
      title: "Real-Time Visibility",
      description:
        "Live tracking and a dispatch team that manages disruptions before they reach you.",
    },
  ],
};

export const testimonial = {
  eyebrow: "Testimonials",
  headline: "Hear it from the people who move with us",
  quote:
    "We've used Acelo over and over again and they keep to time, with excellent services every single trip.",
  name: "Michella Ezima",
  role: "Senior Brand Manager at TM Global",
  photo: {
    src: "/images/testimonials/michella-ezima.png",
    width: 1018,
    height: 1024,
  },
};

export const faq = {
  headline: "Frequently Asked Questions",
  items: [
    {
      question: "How do I book a vehicle for my event or trip?",
      answer:
        "Message Acelo HQ on WhatsApp with your dates, pickup location, and passenger count. Our dispatch team confirms your fleet, route, and pilot the same day — there's no self-serve checkout, every booking is coordinated directly with a human.",
    },
    {
      question: "What types of vehicles does Acelo have in its fleet?",
      answer:
        "Sedans, SUVs, mini buses, coaster buses, Hiace buses, mini vans, and heavy-duty trucks — every vehicle is inspected, insured, and driven by a vetted Professional Pilot.",
    },
    {
      question: "Are there any hidden fees beyond the quoted price?",
      answer:
        "No. The rate confirmed on WhatsApp is the rate you pay — fuel, driver, and standard mileage are factored in upfront so there are no surprises on the day.",
    },
    {
      question: "How does Acelo ensure passenger safety on every trip?",
      answer:
        "Every pilot is vetted before joining the fleet, every vehicle is inspected on a routine schedule, and live tracking lets our dispatch team step in the moment a trip needs support.",
    },
    {
      question: "Can I book vehicles for interstate or outstation travel?",
      answer:
        "Yes — Acelo covers city-wide coordination as well as long-distance outstation and interstate trips, dispatched from hubs across the country.",
    },
    {
      question: "What is the minimum booking lead time required?",
      answer:
        "For most trips, same-day confirmation is possible once you message Acelo HQ. Larger multi-vehicle events (weddings, conferences, school trips) are best booked a few days ahead so we can coordinate the full fleet.",
    },
  ],
};

export const finalCta = {
  headline: "Ready to move?",
  subhead:
    "Message Acelo HQ and we'll have your fleet, route, and pilots confirmed the same day.",
  cta: { label: "Get Started Now", href: "https://wa.me/2348103115430" },
};
