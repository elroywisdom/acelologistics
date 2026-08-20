import { Resend } from "resend";
import {
  type BookingPayload,
  buildWhatsAppMessage,
  formatDate,
  formatTime,
} from "@/lib/booking";
import { siteUrl } from "@/lib/seo";

/** Resend — El-Roy's chosen transactional email provider (2026-08-19).
 * `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `ACELO_TEAM_EMAIL` are read
 * from the environment (see `.env.example`) rather than hardcoded, since
 * they're real account credentials. Until they're set, every function
 * here logs what it would have sent and resolves `{ sent: false }`
 * instead of throwing — the booking flow still completes (the customer
 * still gets the success modal + WhatsApp deep link) even before Resend
 * is configured, rather than a missing env var taking down bookings
 * entirely. */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Acelo Logistics <bookings@acelologistics.com>";
const TEAM_EMAIL = process.env.ACELO_TEAM_EMAIL;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

type SendResult = { sent: boolean; error?: string };

function routeSummaryHtml(booking: BookingPayload) {
  const route = [booking.pickupLocation, ...booking.stops.filter(Boolean), booking.dropoffLocation]
    .filter(Boolean)
    .join(" &rarr; ");

  const returnRow = booking.returnEnabled
    ? `<tr><td style="padding:4px 12px 4px 0;color:#718096;">Return</td><td>${formatDate(booking.returnDate ?? "")} at ${formatTime(booking.returnTime ?? "")}</td></tr>
       <tr><td style="padding:4px 12px 4px 0;color:#718096;">Vehicle lay-over</td><td>${booking.layover ? "Yes" : "No"}</td></tr>`
    : "";

  return `
    <table style="font-family: -apple-system, sans-serif; font-size:14px; color:#0f1420; border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;color:#718096;">Vehicle</td><td>${booking.vehicleCount}x ${booking.vehicleName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#718096;">Route</td><td>${route || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#718096;">Departure</td><td>${formatDate(booking.departureDate)} at ${formatTime(booking.departureTime)}</td></tr>
      ${returnRow}
    </table>
  `;
}

/** Logo header + social footer for the customer-facing email only — the
 * internal team notification is a plain operational alert and doesn't
 * need branding. Images are referenced by absolute URL (`${siteUrl}/...`)
 * rather than inlined as raw SVG/base64: `<img src>` is the one image
 * technique every major email client renders reliably, including
 * Outlook's desktop engine, which does not render inline SVG at all.
 * The PNGs themselves (`public/images/email/*.png`) are pre-rendered
 * from the real wordmark SVG and the same brand-mark social icons the
 * site footer uses (`components/ui/SocialIcons.tsx`) via `sharp`, each
 * on a `color-ink` badge so they read on any background. Because the
 * site isn't deployed yet, these URLs won't resolve until it is — that
 * only affects image *rendering* in an email client's preview; it
 * doesn't block sending. */
import fs from "fs";
import path from "path";

function getEmailImageBase64(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), "public/images/email", filename);
    const buffer = fs.readFileSync(filePath);
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error(`[email] Failed to read email asset ${filename}:`, error);
    return `${siteUrl}/images/email/${filename}`;
  }
}

const EMAIL_SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/2348103115430", icon: "social-whatsapp.png" },
  { label: "X", href: "https://x.com/acelologistics", icon: "social-x.png" },
  { label: "Instagram", href: "https://www.instagram.com/acelo_logistics/", icon: "social-instagram.png" },
  { label: "TikTok", href: "https://www.tiktok.com/@acelologistics", icon: "social-tiktok.png" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/acelo-logistics", icon: "social-linkedin.png" },
];

function emailSocialFooterHtml() {
  const icons = EMAIL_SOCIALS.map(({ label, href, icon }) => {
    const src = getEmailImageBase64(icon);
    return `
      <a href="${href}" style="display:inline-block;margin-right:12px;text-decoration:none;" aria-label="${label}">
        <img src="${src}" alt="${label}" width="28" height="28" style="display:block;border-radius:50%;border:0;" />
      </a>
    `;
  }).join("");

  return `
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #edf2f7;">
      <div style="margin-bottom:12px;">${icons}</div>
      <p style="margin:0;color:#718096;font-size:12px;">Acelo Logistics &amp; Rentals &middot; Abuja, Nigeria</p>
    </div>
  `;
}

/** Generates the branded HTML confirmation email for the customer. */
export function customerConfirmationEmailHtml(booking: BookingPayload, whatsappLink: string) {
  const logoSrc = getEmailImageBase64("acelo-logo-email.png");
  const route = [booking.pickupLocation, ...booking.stops.filter(Boolean), booking.dropoffLocation]
    .filter(Boolean)
    .join(" &rarr; ");

  const returnRows = booking.returnEnabled
    ? `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#718096;font-size:13px;width:110px;vertical-align:top;">Return</td>
        <td style="padding:8px 0;color:#0f1420;font-size:14px;font-weight:600;vertical-align:top;">${formatDate(booking.returnDate ?? "")} at ${formatTime(booking.returnTime ?? "")}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px 8px 0;color:#718096;font-size:13px;width:110px;vertical-align:top;">Layover</td>
        <td style="padding:8px 0;color:#0f1420;font-size:14px;font-weight:600;vertical-align:top;">${booking.layover ? "Yes" : "No"}</td>
      </tr>
    `
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background-color:#1a56db;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#1a56db;">
          <!-- Top Royal Blue Header with Logo -->
          <tr>
            <td align="center" style="padding:36px 20px 28px 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">
                <tr>
                  <td align="left">
                    <img src="${logoSrc}" alt="Acelo Logistics" width="140" style="display:block;border:0;outline:none;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Light Background Body Container -->
          <tr>
            <td align="center" style="background-color:#f0f4f9;padding:32px 20px 48px 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:520px;">
                <tr>
                  <td style="background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:32px 28px;box-shadow:0 4px 12px rgba(0,0,0,0.04);">
                    <h2 style="color:#0f1420;font-size:20px;font-weight:700;margin:0 0 14px 0;">
                      We've Received Your Rental Request
                    </h2>
                    <p style="color:#4a5568;font-size:15px;line-height:1.6;margin:0 0 20px 0;">
                      Dear <strong>${booking.firstName}</strong>,<br /><br />
                      Thank you for requesting a rental with Acelo Logistics. We are processing your request, and our dispatch team will reach out on WhatsApp shortly to confirm your fleet, route, and pilot.
                    </p>

                    <!-- Booking Summary Box -->
                    <div style="background-color:#f8fafc;border-radius:12px;border:1px solid #edf2f7;padding:18px 20px;margin-bottom:24px;">
                      <h3 style="color:#0f1420;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px 0;">
                        Trip Details
                      </h3>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:8px 12px 8px 0;color:#718096;font-size:13px;width:110px;vertical-align:top;">Vehicle</td>
                          <td style="padding:8px 0;color:#0f1420;font-size:14px;font-weight:600;vertical-align:top;">${booking.vehicleCount}x ${booking.vehicleName}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 12px 8px 0;color:#718096;font-size:13px;width:110px;vertical-align:top;">Route</td>
                          <td style="padding:8px 0;color:#0f1420;font-size:14px;font-weight:600;vertical-align:top;">${route || "Not specified"}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 12px 8px 0;color:#718096;font-size:13px;width:110px;vertical-align:top;">Departure</td>
                          <td style="padding:8px 0;color:#0f1420;font-size:14px;font-weight:600;vertical-align:top;">${formatDate(booking.departureDate)} at ${formatTime(booking.departureTime)}</td>
                        </tr>
                        ${returnRows}
                      </table>
                    </div>

                    <p style="color:#4a5568;font-size:14px;margin:0 0 14px 0;">
                      Want to speed things up? Message our team directly:
                    </p>

                    <!-- WhatsApp CTA Button -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="background-color:#25d366;border-radius:10px;box-shadow:0 4px 10px rgba(37,211,102,0.25);">
                          <a href="${whatsappLink}" target="_blank" style="display:block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;text-align:center;">
                            Message Acelo HQ on WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin-top:24px;color:#718096;font-size:13px;line-height:1.5;margin-bottom:0;">
                      Warm regards,<br />
                      <strong style="color:#0f1420;">Acelo Logistics Team</strong>
                    </p>

                    <!-- Social Media Footer -->
                    ${emailSocialFooterHtml()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/** Sends the customer-facing confirmation email via Resend. */
export async function sendCustomerConfirmationEmail(
  booking: BookingPayload,
  whatsappLink: string,
): Promise<SendResult> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping customer confirmation email.", {
      to: booking.email,
    });
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: "We've received your rental request",
      html: customerConfirmationEmailHtml(booking, whatsappLink),
    });
    return { sent: true };
  } catch (error) {
    console.error("[email] Failed to send customer confirmation email:", error);
    return { sent: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/** Generates the branded HTML email for Acelo's internal team notifications. */
export function teamNotificationEmailHtml(booking: BookingPayload, whatsappLink: string) {
  const route = [booking.pickupLocation, ...booking.stops.filter(Boolean), booking.dropoffLocation]
    .filter(Boolean)
    .join(" &rarr; ");

  const returnRows = booking.returnEnabled
    ? `
      <tr>
        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
          RETURN
        </td>
        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
          ${formatDate(booking.returnDate ?? "")} at ${formatTime(booking.returnTime ?? "")}
        </td>
      </tr>
      <tr>
        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
          LAYOVER
        </td>
        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
          ${booking.layover ? "Yes" : "No"}
        </td>
      </tr>
    `
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 0; background-color: #1a56db; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a56db;">
          <!-- Top Royal Blue Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 32px 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px;">
                <tr>
                  <td>
                    <!-- Bell Icon in White Circle -->
                    <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="48" height="48" align="center" style="background-color: #ffffff; border-radius: 50%; width: 48px; height: 48px; text-align: center; line-height: 48px;">
                          <span style="font-size: 22px; line-height: 48px;">🔔</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.5px;">
                      New Rental Request Received
                    </h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.5; margin: 0;">
                      A new vehicle rental request has been submitted on the website. Please review the details below.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Light Background Body Container -->
          <tr>
            <td align="center" style="background-color: #f0f4f9; padding: 32px 20px 48px 20px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px;">
                <!-- Request Overview Card -->
                <tr>
                  <td style="background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 28px 28px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);">
                    <h2 style="color: #0f1420; font-size: 18px; font-weight: 700; margin: 0 0 18px 0;">
                      Request Overview
                    </h2>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 14px;">
                      <!-- CLIENT -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; width: 110px; vertical-align: top;">
                          CLIENT
                        </td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
                          ${booking.firstName} ${booking.lastName}
                        </td>
                      </tr>

                      <!-- CONTACT -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                          CONTACT
                        </td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
                          ${booking.phone} &middot; ${booking.email}
                        </td>
                      </tr>

                      <!-- VEHICLE -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                          VEHICLE
                        </td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
                          ${booking.vehicleCount}x ${booking.vehicleName}
                        </td>
                      </tr>

                      <!-- ROUTE -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                          ROUTE
                        </td>
                        <td style="padding: 14px 0; border-bottom: 1px solid #edf2f7; color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top; line-height: 1.4;">
                          ${route || "Not specified"}
                        </td>
                      </tr>

                      <!-- DEPARTURE -->
                      <tr>
                        <td style="padding: 14px 0; ${booking.returnEnabled ? 'border-bottom: 1px solid #edf2f7;' : ''} color: #718096; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                          DEPARTURE
                        </td>
                        <td style="padding: 14px 0; ${booking.returnEnabled ? 'border-bottom: 1px solid #edf2f7;' : ''} color: #0f1420; font-size: 15px; font-weight: 700; vertical-align: top;">
                          ${formatDate(booking.departureDate)} at ${formatTime(booking.departureTime)}
                        </td>
                      </tr>

                      ${returnRows}
                    </table>
                  </td>
                </tr>

                <!-- Follow Up Yellow Button -->
                <tr>
                  <td style="padding-top: 24px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="background-color: #ffd600; border-radius: 12px; box-shadow: 0 4px 12px rgba(255, 214, 0, 0.35);">
                          <a href="${whatsappLink}" target="_blank" style="display: block; padding: 16px 24px; color: #0f1420; text-decoration: none; font-size: 16px; font-weight: 700; text-align: center;">
                            📞 &nbsp; Follow Up
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer Note -->
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <p style="color: #718096; font-size: 13px; font-weight: 600; margin: 0; text-align: center;">
                      Please confirm availability with the client before confirming.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/** Sends the real-time notification email to the Acelo team inbox. */
export async function sendTeamNotificationEmail(
  booking: BookingPayload,
  whatsappLink: string,
): Promise<SendResult> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping team notification email.", {
      booking,
    });
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  if (!TEAM_EMAIL) {
    console.warn("[email] ACELO_TEAM_EMAIL not set — skipping team notification email.");
    return { sent: false, error: "ACELO_TEAM_EMAIL not configured" };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TEAM_EMAIL,
      subject: `New rental request — ${booking.vehicleCount}x ${booking.vehicleName}`,
      html: teamNotificationEmailHtml(booking, whatsappLink),
    });
    return { sent: true };
  } catch (error) {
    console.error("[email] Failed to send team notification email:", error);
    return { sent: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

