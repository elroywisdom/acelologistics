import Link from "next/link";
import { ArrowRightIcon, MapPinIcon, HeadsetIcon } from "@/components/ui/Icons";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { address, contactEmail, directionsUrl, phoneNumber, whatsappUrl } from "@/content/site";
import { ACELO_WHATSAPP_NUMBER } from "@/lib/booking";

/** Office address block for the contact page.
 *
 * Rendered as a real `<address>` element with an hCard-ish structure
 * rather than a styled paragraph — it is the canonical Name/Address/Phone
 * on the site, and the SEO doc's local-SEO section leans on it being
 * consistent and machine-readable. The values come from `content/site.ts`
 * so this, the footer and the LocalBusiness schema can never disagree.
 *
 * "Get directions" is a public Google Maps URL, which needs no API key —
 * worth noting given the Places integration in lib/places.ts is still
 * blocked on a billing account. */
export function OfficeAddress() {
  return (
    <section className="flex flex-col items-center gap-10 bg-surface-alt px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="flex w-full max-w-[1272px] flex-col items-start gap-3">
        <CategoryEyebrowPill>Head office</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">Come and see us</h2>
        <p className="max-w-[760px] text-body-base text-text-muted">
          Acelo dispatch runs out of Wuse, in the middle of the FCT. Drop in,
          or call ahead if you are coming to inspect a vehicle.
        </p>
      </div>

      <div className="grid w-full max-w-[1272px] grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-tint-blue-100 text-primary">
            <MapPinIcon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="text-heading-3 font-normal text-ink">Acelo Logistics &amp; Rentals</h3>
          <address className="not-italic text-[15px] leading-[1.7] text-text-muted">
            <span className="block">{address.street}</span>
            <span className="block">
              {address.locality} {address.postalCode}
            </span>
            <span className="block">{address.region}, Nigeria</span>
          </address>
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target mt-auto inline-flex items-center gap-2 pt-2 text-[14px] text-primary hover:text-primary-hover"
          >
            Get directions
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-tint-blue-100 text-primary">
            <HeadsetIcon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="text-heading-3 font-normal text-ink">Dispatch line</h3>
          <p className="text-[15px] leading-[1.6] text-text-muted">
            The fastest route to a person who can see your booking. Call it if
            a trip is already running; message it for anything else.
          </p>
          <div className="flex flex-col gap-1">
            <Link
              href={`tel:+${ACELO_WHATSAPP_NUMBER}`}
              className="tap-target inline-flex w-fit items-center text-[15px] text-ink hover:text-primary"
            >
              {phoneNumber}
            </Link>
            <Link
              href={`mailto:${contactEmail}`}
              className="tap-target inline-flex w-fit items-center text-[15px] text-ink hover:text-primary"
            >
              {contactEmail}
            </Link>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex w-fit items-center gap-2 pt-1 text-[14px] text-primary hover:text-primary-hover"
            >
              Message on WhatsApp
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
