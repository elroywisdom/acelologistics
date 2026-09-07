import Link from "next/link";
import { address } from "@/content/site";
import {
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

// Rebuilt 2026-08-19 against the acelo-seo-strategist skill's planned URL
// IA and the acelo-section-layout skill's mandated footer shape ("Solutions,
// Products/Partners, Policies, Resources" — the previous "Company" column
// was never one of those four).
//
// Updated again once the remaining nine pages were built: every solution
// link below that used to be an inactive placeholder (`href: null`) now
// points at its real route. What is left inactive is genuinely unbuilt —
// the two policy pages, which need legal copy Acelo has to supply, not
// markup.
//
// Every link traces to one of three things, and is commented when it
// isn't the first:
//   1. a real, built page in the IA;
//   2. a real, already-built anchor on Home or a solution page, used as
//      an explicit interim target for a service line with no page yet;
//   3. a reasonable /resources/ extension for the Policies column, which
//      the SEO skill's IA list doesn't cover at all — flagged in the
//      project doc as a gap between the two skills to reconcile later.
// Removed entirely: "Careers", "Blog", "Safety", "Partner Portal", a
// duplicate "Help Centre" (same target as "FAQs"), and "NDPR Policy" /
// "Cookie Policy" (duplicate targets of "Privacy Policy", no real cookie
// tracking or standalone NDPR page exists anywhere in the site to back
// them) — none of these were ever part of the planned IA or backed by
// real Acelo content. "Bus Branding & Advertising" (a real service line
// per the brand brief) was also dropped rather than pointed somewhere
// wrong — no page represents it even loosely, so there's no honest
// target for it yet.
//
// "Cargo & Logistics" was removed on El-Roy's instruction (2026-09-07).
// It had no page of its own and pointed at the rental page's fleet grid
// as an interim target, on the grounds that the grid carries the Dyna and
// Hino truck classes. Every other link in this column goes to a real page
// about that service; this one sent a reader looking for haulage to a
// vehicle-hire grid. If cargo becomes a page, add it back pointing at the
// page — not at an anchor that only half answers the question.
const columns = [
  {
    heading: "Solutions",
    links: [
      { label: "Vehicle Rental", href: "/solutions/rental", active: true },
      { label: "Church & Event Transport", href: "/solutions/church-events", active: true },
      { label: "School Transport", href: "/solutions/schools", active: true },
      { label: "Group Travel", href: "/solutions/group-travel", active: true },
    ],
  },
  {
    // Displayed as "Partners", not "Products/Partners". This is the same
    // column the section-layout doc calls "Products/Partners" — the
    // grouping is unchanged, only the visible label. "PRODUCTS/PARTNERS"
    // uppercase renders as a single 143px unbreakable token (no break
    // opportunity at the slash) inside a 116px grid column at a 320px
    // viewport, which pushed the whole document 3px wide and gave every
    // page on the site a horizontal scrollbar on a small phone.
    // "Partners" also describes the four links beneath it more accurately.
    heading: "Partners",
    links: [
      { label: "Fleet Partnership", href: "/partners/fleet", active: true },
      { label: "Travel & Tour Partners", href: "/solutions/travel-tour-partners", active: true },
      { label: "Hotels", href: "/solutions/hotels", active: true },
      { label: "Real Estate", href: "/solutions/real-estate", active: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQs", href: "/#faq", active: true },
      { label: "Contact", href: "/resources/contact", active: true },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Privacy Policy", href: "/resources/privacy-policy", active: true },
      { label: "Terms of Service", href: "/resources/terms-of-service", active: true },
    ],
  },
];

const socials = [
  { label: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/2348103115430" },
  { label: "X", Icon: XIcon, href: "https://x.com/acelologistics" },
  { label: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/acelo_logistics/" },
  { label: "TikTok", Icon: TikTokIcon, href: "https://www.tiktok.com/@acelologistics" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://www.linkedin.com/company/acelo-logistics" },
];

/** Figma node 60:1739. Background corrected from the Figma layer's literal
 * #070a21 (off-token) to color-ink-deep (#080b12) — the token table names
 * ink-deep explicitly for "Footer, deepest dark background". */
export function Footer() {
  return (
    <footer className="bg-ink-deep px-6 pt-16 pb-10 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between">
          <div className="col-span-2 flex max-w-[280px] flex-col gap-5 sm:col-span-3 lg:col-span-1">
            <span className="text-[20px] font-bold text-white">
              Acelo Logistics
            </span>
            <p className="text-[14px] leading-[1.4] text-white/60">
              Corporate rentals, event logistics and interstate transport —
              vetted vehicles and professional pilots, dispatched from hubs
              across the country.
            </p>
            {/* The section-layout doc specifies "logo + one-line company
                descriptor + address" for this column, and the address was
                missing. It reads from `content/site.ts` alongside the
                contact page and the LocalBusiness schema — the SEO doc's
                local-SEO section needs all three identical. */}
            <address className="not-italic text-[14px] leading-[1.6] text-white/60">
              {address.street}
              <br />
              {address.locality} {address.postalCode}, {address.region}
            </address>
          </div>
          {/* Column width is `w-full lg:w-[120px]`, not a flat `w-[120px]`.
              Below `lg` these columns sit in a 2-up grid; two fixed 120px
              columns plus the 40px gap need 280px, but a 320px viewport
              only leaves 272px inside the footer's px-6 padding, so the
              footer pushed the whole document 3px wide and every page on
              the site scrolled sideways on a small phone. The fixed width
              still applies at `lg`, where the columns are laid out as a
              flex row rather than a grid. */}
          {columns.map((col) => (
            <div key={col.heading} className="flex w-full flex-col gap-4 text-[14px] lg:w-[120px]">
              <span className="font-bold uppercase text-white">
                {col.heading}
              </span>
              {col.links.map((link) =>
                link.active && link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="cursor-default select-none text-white/40"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-white/10" />
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/50">
            © Acelo Logistics &amp; Rentals {new Date().getFullYear()} · RC
            9293990
          </p>
          <div className="flex gap-4">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target flex h-5 w-5 items-center justify-center text-white/70 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
