import Link from "next/link";
import {
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";

/** Social channels, as cards rather than the footer's icon row — on a
 * contact page these are a real route to Acelo, not a footer afterthought.
 *
 * Handles are the same ones already published in the site footer and in
 * the LocalBusiness `sameAs` list in lib/seo.ts. Keep all three in sync:
 * `sameAs` is how search engines tie these profiles to the business. */
const socials = [
  {
    label: "WhatsApp",
    handle: "Acelo HQ dispatch",
    href: "https://wa.me/2348103115430",
    Icon: WhatsAppIcon,
  },
  {
    label: "Instagram",
    handle: "@acelo_logistics",
    href: "https://www.instagram.com/acelo_logistics/",
    Icon: InstagramIcon,
  },
  {
    label: "X",
    handle: "@acelologistics",
    href: "https://x.com/acelologistics",
    Icon: XIcon,
  },
  {
    label: "TikTok",
    handle: "@acelologistics",
    href: "https://www.tiktok.com/@acelologistics",
    Icon: TikTokIcon,
  },
  {
    label: "LinkedIn",
    handle: "Acelo Logistics",
    href: "https://www.linkedin.com/company/acelo-logistics",
    Icon: LinkedInIcon,
  },
];

export function SocialLinks() {
  return (
    <section className="flex flex-col items-center gap-10 bg-surface-alt px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="flex w-full max-w-[1272px] flex-col items-start gap-3">
        <CategoryEyebrowPill>Socials</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">Follow the fleet</h2>
        <p className="max-w-[760px] text-body-base text-text-muted">
          Route updates, new units joining the fleet, and the occasional look
          at what a convention morning actually looks like.
        </p>
      </div>
      <ul className="grid w-full max-w-[1272px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {socials.map(({ label, handle, href, Icon }) => (
          <li key={label}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target flex h-full items-center gap-3 rounded-lg border border-border bg-white p-4 transition-colors hover:border-primary"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-tint-blue-100 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] text-ink">{label}</span>
                <span className="truncate text-[13px] text-text-muted">{handle}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
