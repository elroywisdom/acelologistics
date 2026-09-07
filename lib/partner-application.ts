// Shared types + formatting for the fleet partner application flow
// (`app/partners/fleet/apply`, `components/partners/PartnerApplicationForm.tsx`,
// `app/api/partner-applications/route.ts`).
//
// Deliberately mirrors `lib/booking.ts`: one source of truth so the
// WhatsApp message, the applicant's confirmation email and the internal
// notification all describe the same application the same way.
//
// WHY A FORM RATHER THAN THE WHATSAPP LINK IT REPLACED. The Fleet Partner
// CTAs used to open a blank WhatsApp chat, which left dispatch extracting
// ten structured fields one question at a time. A booking is transactional
// and closes the same day; a partnership application is a lead that runs
// through apply -> inspect -> onboard -> dispatch over weeks, and it needs
// the vehicle's class, age, condition and paperwork state up front to be
// triaged at all.
//
// NO DOCUMENT UPLOADS, BY DESIGN. Vehicle papers, insurance certificates
// and driver's licences are requested during vetting over WhatsApp, where
// the applicant is already in a conversation with a person and where
// photographing a document is a normal thing to do. Collecting files here
// would mean either object storage or buffering attachments server-side,
// for a step that a human has to review anyway.
//
// NOTHING IS PERSISTED. Same "no SQL database" constraint as bookings
// (project kickoff brief): the two emails and the WhatsApp link are the
// record. That is a real limitation for this flow in a way it is not for
// bookings — an inbox has no stages, no owner and no status, so once
// Acelo is carrying more than a handful of open applicants at once, this
// should gain a store. `PartnerApplication` below is a flat, serialisable
// shape precisely so that adding one is a small change: write the object
// in the API route alongside the two sends.

export const VEHICLE_CLASSES = [
  "Coaster bus",
  "BRT / mass transit bus",
  "Hiace bus",
  "Mini van",
  "Executive car / sedan",
  "SUV",
  "Pickup / Hilux",
  "Truck (Dyna, Hino or similar)",
] as const;

export const VEHICLE_CONDITIONS = [
  "Excellent — road-ready today",
  "Good — minor servicing due",
  "Needs work before dispatch",
] as const;

export const PAPER_STATUSES = [
  "Full papers and valid insurance",
  "Papers complete, insurance expired",
  "Papers incomplete",
] as const;

export const DRIVER_ARRANGEMENTS = [
  "I have my own driver",
  "I need Acelo to assign a Professional Pilot",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Full-time",
  "Weekdays only",
  "Weekends only",
  "On-call / occasional",
] as const;

export type PartnerApplication = {
  vehicleClass: string;
  makeModel: string;
  year: string;
  vehicleCount: number;
  condition: string;
  papers: string;
  driverArrangement: string;
  availability: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // includes +234 prefix
  notes: string;
};

/** Acelo HQ's WhatsApp line. Imported from `lib/booking.ts` rather than
 * redeclared so the number can never drift between the two flows. */
export { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";
import { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";

/** Structured message for the WhatsApp deep link, written from the
 * applicant's point of view to Acelo HQ — same blueprint as the booking
 * message so both arrive in dispatch's inbox looking like one system. */
export function buildPartnerWhatsAppMessage(application: PartnerApplication) {
  const lines = [
    "Hello Acelo Logistics,",
    "",
    "I would like to apply to join the Acelo Fleet Partner network.",
    "",
    "🚍 *VEHICLE DETAILS*",
    "-----------------------------------",
    `• *Class:* ${application.vehicleCount}x ${application.vehicleClass}`,
    `• *Make/Model:* ${application.makeModel}`,
    `• *Year:* ${application.year}`,
    `• *Condition:* ${application.condition}`,
    `• *Papers:* ${application.papers}`,
    `• *Driver:* ${application.driverArrangement}`,
    `• *Availability:* ${application.availability}`,
    `• *Based in:* ${application.city}`,
    "",
    "👤 *OWNER DETAILS*",
    "-----------------------------------",
    `• *Name:* ${application.firstName} ${application.lastName}`.trim(),
    `• *Contact:* ${application.phone} | ${application.email}`,
  ];

  if (application.notes) {
    lines.push("", `📝 *Notes:* ${application.notes}`);
  }

  lines.push(
    "-----------------------------------",
    "",
    "Please let me know the next step for vetting. Thank you!",
  );

  return lines.join("\n");
}

export function buildPartnerWhatsAppLink(application: PartnerApplication) {
  const text = encodeURIComponent(buildPartnerWhatsAppMessage(application));
  return `https://wa.me/${ACELO_WHATSAPP_NUMBER}?text=${text}`;
}
