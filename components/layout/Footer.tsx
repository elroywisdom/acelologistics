import Link from "next/link";
import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

// Rebuilt 2026-08-19 against the acelo-seo-strategist skill's planned URL
// IA and the acelo-section-layout skill's mandated footer shape ("Solutions,
// Products/Partners, Policies, Resources" — the previous "Company" column
// was never one of those four). Every link below traces to one of three
// things, and is commented when it isn't the first:
//   1. a real page in the planned IA (built or not — the site isn't
//      deployed yet, so linking ahead to a planned-but-unbuilt route is
//      the intended incremental-build pattern, not a bug);
//   2. a real, already-built anchor on Home, used as an explicit interim
//      target for a real Acelo service line that has no planned page yet;
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
// wrong — unlike Cargo & Logistics, Home has no section that represents
// it even loosely, so there's no honest interim target for it yet.
const columns = [
  {
    heading: "Solutions",
    links: [
      { label: "Passenger Transport", href: "/#fleet", active: true },
      { label: "Church & Event Transport", href: null, active: false },
      { label: "School Transport", href: null, active: false },
      { label: "Group Travel", href: null, active: false },
      { label: "Cargo & Logistics", href: "/#fleet", active: true },
    ],
  },
  {
    heading: "Products/Partners",
    links: [
      { label: "Fleet Partnership", href: "https://wa.me/2348103115430", active: true },
      { label: "Travel & Tour Partners", href: null, active: false },
      { label: "Hotels", href: null, active: false },
      { label: "Real Estate", href: null, active: false },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "About Us", href: null, active: false },
      { label: "FAQs", href: "/#faq", active: true },
      { label: "Contact", href: "https://wa.me/2348103115430", active: true },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Privacy Policy", href: null, active: false },
      { label: "Terms of Service", href: null, active: false },
    ],
  },
];

const socials = [
  { label: "WhatsApp", Icon: WhatsAppIcon, href: "https://wa.me/2348103115430" },
  { label: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/acelo_logistics/" },
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
          </div>
          {columns.map((col) => (
            <div key={col.heading} className="flex w-[120px] flex-col gap-4 text-[14px]">
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
