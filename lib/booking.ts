// Shared types + formatting for the vehicle booking flow
// (`app/fleet/[vehicleId]`, `components/booking/BookingForm.tsx`,
// `app/api/bookings/route.ts`). One source of truth so the WhatsApp
// message, the confirmation email, and the internal notification email
// all describe the exact same booking the same way.

export type BookingPayload = {
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  stops: string[];
  dropoffLocation: string;
  departureDate: string; // yyyy-mm-dd
  departureTime: string; // HH:mm
  returnEnabled: boolean;
  returnDate: string | null;
  returnTime: string | null;
  layover: boolean;
  vehicleCount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // includes +234 prefix
};

function formatDate(value: string) {
  if (!value) return "Not specified";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(value: string) {
  if (!value) return "Not specified";
  const [hoursStr, minutesStr] = value.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${twelveHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/** Acelo HQ's WhatsApp line — same number used site-wide for the
 * "Rent A Vehicle" CTA (`NavBar.tsx`, `Button` calls) and in
 * `lib/seo.ts`'s LocalBusiness JSON-LD. Kept here too so the booking
 * deep link doesn't silently drift from the rest of the site if this
 * number ever changes. */
export const ACELO_WHATSAPP_NUMBER = "2348103115430";

/** Builds the structured message for WhatsApp deep links. Formatted
 * professionally from the customer's point of view to Acelo Logistics HQ. */
export function buildWhatsAppMessage(booking: BookingPayload) {
  const route = [booking.pickupLocation, ...booking.stops.filter(Boolean), booking.dropoffLocation]
    .filter(Boolean)
    .join(" → ");

  const lines = [
    "Hello Acelo Logistics,",
    "",
    "I would like to request a vehicle reservation with the following details:",
    "",
    "📋 *RESERVATION DETAILS*",
    "-----------------------------------",
    `• *Client Name:* ${booking.firstName} ${booking.lastName}`.trim(),
    `• *Contact:* ${booking.phone} | ${booking.email}`,
    `• *Vehicle:* ${booking.vehicleCount}x ${booking.vehicleName}`,
    `• *Departure:* ${formatDate(booking.departureDate)} at ${formatTime(booking.departureTime)}`,
  ];

  if (booking.returnEnabled) {
    lines.push(
      `• *Return:* ${formatDate(booking.returnDate ?? "")} at ${formatTime(booking.returnTime ?? "")}`,
      `• *Vehicle Lay-over:* ${booking.layover ? "Yes" : "No"}`,
    );
  }

  lines.push(
    `• *Route:* ${route || "Not specified"}`,
    "-----------------------------------",
    "",
    "Please confirm vehicle availability and next steps. Thank you!",
  );

  return lines.join("\n");
}

export function buildWhatsAppLink(booking: BookingPayload) {
  const text = encodeURIComponent(buildWhatsAppMessage(booking));
  return `https://wa.me/${ACELO_WHATSAPP_NUMBER}?text=${text}`;
}

export { formatDate, formatTime };

