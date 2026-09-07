import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { PartnerApplicationForm } from "@/components/partners/PartnerApplicationForm";
import { featureIcons } from "@/components/ui/Icons";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { breadcrumbJsonLd, jsonLdProps, pageMetadata } from "@/lib/seo";
import { fleetPartner } from "@/content/fleet-partner";

export const metadata: Metadata = pageMetadata({
  title: "Apply to Become a Fleet Partner",
  description:
    "Apply to put your bus, van, car or truck on Acelo dispatch. Tell us the vehicle class, year and condition and vetting can start the same day.",
  path: "/partners/fleet/apply",
});

/** The application form itself, on its own route rather than bolted to
 * the bottom of `/partners/fleet`.
 *
 * Two reasons for the split. The partner page's job is to convince, and
 * it already runs ten sections; dropping a fourteen-field form into it
 * would bury the pitch under admin. And a dedicated URL is linkable —
 * dispatch can send it straight to someone who asked about partnering on
 * WhatsApp, without making them scroll a marketing page first.
 *
 * The page reuses the partner page's own process steps as a sidebar, so
 * an applicant can see what happens after they submit while they are
 * filling it in. */
export default function PartnerApplyPage() {
  return (
    <>
      <script
        {...jsonLdProps(
          breadcrumbJsonLd([
            { name: "Fleet Partnership", path: "/partners/fleet" },
            { name: "Apply", path: "/partners/fleet/apply" },
          ]),
        )}
      />
      <NavBar />
      <main className="flex flex-1 flex-col bg-surface-alt">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-6 py-12 sm:px-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
            <Link href="/partners/fleet" className="text-text-muted hover:text-primary">
              Fleet Partnership
            </Link>
            <span className="text-text-muted" aria-hidden>
              /
            </span>
            <span className="rounded-pill bg-tint-blue-100 px-3 py-1 text-primary">
              Apply
            </span>
          </nav>

          <div className="flex flex-col gap-3">
            <CategoryEyebrowPill>Fleet Partnership</CategoryEyebrowPill>
            <h1 className="text-display-l font-normal text-ink">
              Apply to join the Acelo fleet
            </h1>
            <p className="max-w-[640px] text-body-base leading-[1.6] text-text-muted">
              Two steps, about two minutes. Tell us what you own and how it is
              set up, and the fleet team will come back to you about vetting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <PartnerApplicationForm />

            <aside className="flex flex-col gap-6 rounded-lg border border-border bg-white p-6 lg:sticky lg:top-[100px]">
              <h2 className="text-heading-3 font-normal text-ink">
                {fleetPartner.process.headline}
              </h2>
              <ol className="flex flex-col gap-5">
                {fleetPartner.process.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-primary text-[14px] text-white">
                      {index + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[15px] text-ink">{step.title}</span>
                      <span className="text-[13px] leading-[1.5] text-text-muted">
                        {step.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col gap-2 border-t border-border pt-5">
                {fleetPartner.valueProps.props.slice(0, 3).map((prop) => {
                  const Icon = featureIcons[prop.icon];
                  return (
                    <span key={prop.title} className="flex items-center gap-2 text-[13px] text-text-muted">
                      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {prop.title}
                    </span>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
