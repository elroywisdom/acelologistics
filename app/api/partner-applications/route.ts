import { NextResponse } from "next/server";
import {
  AVAILABILITY_OPTIONS,
  DRIVER_ARRANGEMENTS,
  PAPER_STATUSES,
  VEHICLE_CLASSES,
  VEHICLE_CONDITIONS,
  buildPartnerWhatsAppLink,
  type PartnerApplication,
} from "@/lib/partner-application";
import { sendPartnerApplicantEmail, sendPartnerTeamEmail } from "@/lib/email";

/** POST /api/partner-applications — the fleet partner equivalent of
 * `/api/bookings`, and deliberately the same shape: validate, build a
 * WhatsApp deep link, email the applicant and Acelo's team, persist
 * nothing. See the header comment in `lib/partner-application.ts` for why
 * there is no store yet and what to change when there is one.
 *
 * Every select field is validated against its allow-list rather than
 * accepted as free text. These values are interpolated into two HTML
 * emails, so an unchecked string is an HTML-injection vector into Acelo's
 * own inbox; constraining them to the known options removes that for
 * everything except the genuinely free-text fields, which are escaped
 * below. */

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Free-text fields still reach an HTML email, so escape them here rather
 * than trusting the template. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

  const requiredStrings: Array<[string, unknown]> = [
    ["makeModel", data.makeModel],
    ["year", data.year],
    ["city", data.city],
    ["firstName", data.firstName],
    ["lastName", data.lastName],
    ["email", data.email],
    ["phone", data.phone],
  ];
  const missing = requiredStrings.filter(([, v]) => !isNonEmptyString(v)).map(([k]) => k);
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const choices: Array<[string, unknown, readonly string[]]> = [
    ["vehicleClass", data.vehicleClass, VEHICLE_CLASSES],
    ["condition", data.condition, VEHICLE_CONDITIONS],
    ["papers", data.papers, PAPER_STATUSES],
    ["driverArrangement", data.driverArrangement, DRIVER_ARRANGEMENTS],
    ["availability", data.availability, AVAILABILITY_OPTIONS],
  ];
  const invalid = choices.filter(
    ([, v, allowed]) => typeof v !== "string" || !allowed.includes(v as string),
  );
  if (invalid.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Invalid value for: ${invalid.map(([k]) => k).join(", ")}` },
      { status: 400 },
    );
  }

  const emailValue = (data.email as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const countRaw = Number(data.vehicleCount);
  const vehicleCount = Number.isFinite(countRaw) && countRaw > 0 ? Math.floor(countRaw) : 1;

  const application: PartnerApplication = {
    vehicleClass: data.vehicleClass as string,
    makeModel: escapeHtml((data.makeModel as string).trim()),
    year: escapeHtml((data.year as string).trim()),
    vehicleCount,
    condition: data.condition as string,
    papers: data.papers as string,
    driverArrangement: data.driverArrangement as string,
    availability: data.availability as string,
    city: escapeHtml((data.city as string).trim()),
    firstName: escapeHtml((data.firstName as string).trim()),
    lastName: escapeHtml((data.lastName as string).trim()),
    email: emailValue,
    phone: escapeHtml((data.phone as string).trim()),
    notes: isNonEmptyString(data.notes) ? escapeHtml((data.notes as string).trim()) : "",
  };

  const whatsappLink = buildPartnerWhatsAppLink(application);

  // Both sends are best-effort and run concurrently: a failure in one
  // must not hide a success in the other, and neither failing should fail
  // the application, because the WhatsApp link below always gives the
  // applicant a route to a human.
  const [applicantEmail, teamEmail] = await Promise.all([
    sendPartnerApplicantEmail(application, whatsappLink),
    sendPartnerTeamEmail(application, whatsappLink),
  ]);

  return NextResponse.json({
    ok: true,
    whatsappLink,
    applicantEmailSent: applicantEmail.sent,
    teamEmailSent: teamEmail.sent,
  });
}
