import { NextResponse } from "next/server";
import { fleetVehicles } from "@/content/home";
import { buildWhatsAppLink, type BookingPayload } from "@/lib/booking";
import { sendCustomerConfirmationEmail, sendTeamNotificationEmail } from "@/lib/email";

/** POST /api/bookings — the server side of the "Hybrid Booking Funnel"
 * from the project kickoff brief: no SQL database, no persistence layer.
 * Each submission is validated, turned into a WhatsApp deep link, and
 * (when Resend is configured — see `.env.example`) emailed to both the
 * customer and Acelo's internal team inbox in the same request. Nothing
 * is stored server-side; the WhatsApp link + the two emails ARE the
 * record of the booking, matching what El-Roy asked for on 2026-08-19. */

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  const vehicle = fleetVehicles.find((v) => v.id === data.vehicleId);
  if (!vehicle) {
    return NextResponse.json({ ok: false, error: "Unknown vehicle." }, { status: 400 });
  }

  const requiredStrings: Array<[string, unknown]> = [
    ["pickupLocation", data.pickupLocation],
    ["dropoffLocation", data.dropoffLocation],
    ["departureDate", data.departureDate],
    ["departureTime", data.departureTime],
    ["firstName", data.firstName],
    ["lastName", data.lastName],
    ["email", data.email],
    ["phone", data.phone],
  ];
  const missing = requiredStrings.filter(([, value]) => !isNonEmptyString(value)).map(([key]) => key);
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const emailValue = data.email as string;
  const simpleEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!simpleEmailPattern.test(emailValue)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const vehicleCountRaw = Number(data.vehicleCount);
  const vehicleCount = Number.isFinite(vehicleCountRaw) && vehicleCountRaw > 0 ? Math.floor(vehicleCountRaw) : 1;

  const returnEnabled = Boolean(data.returnEnabled);

  const booking: BookingPayload = {
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    pickupLocation: (data.pickupLocation as string).trim(),
    stops: Array.isArray(data.stops)
      ? (data.stops as unknown[]).filter(isNonEmptyString).map((s) => s.trim())
      : [],
    dropoffLocation: (data.dropoffLocation as string).trim(),
    departureDate: (data.departureDate as string).trim(),
    departureTime: (data.departureTime as string).trim(),
    returnEnabled,
    returnDate: returnEnabled && isNonEmptyString(data.returnDate) ? (data.returnDate as string).trim() : null,
    returnTime: returnEnabled && isNonEmptyString(data.returnTime) ? (data.returnTime as string).trim() : null,
    layover: returnEnabled ? Boolean(data.layover) : false,
    vehicleCount,
    firstName: (data.firstName as string).trim(),
    lastName: (data.lastName as string).trim(),
    email: emailValue.trim(),
    phone: (data.phone as string).trim(),
  };

  const whatsappLink = buildWhatsAppLink(booking);

  // Fire both emails concurrently — neither blocks the other, and a
  // failure in one (e.g. team inbox misconfigured) shouldn't hide a
  // success in the other. Both are best-effort: the response below is
  // still `ok: true` as long as the booking itself was valid, since the
  // WhatsApp link is always returned as a fallback regardless of email
  // delivery.
  const [customerEmail, teamEmail] = await Promise.all([
    sendCustomerConfirmationEmail(booking, whatsappLink),
    sendTeamNotificationEmail(booking, whatsappLink),
  ]);

  return NextResponse.json({
    ok: true,
    whatsappLink,
    customerEmailSent: customerEmail.sent,
    teamEmailSent: teamEmail.sent,
  });
}
