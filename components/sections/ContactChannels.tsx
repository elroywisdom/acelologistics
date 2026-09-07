import Link from "next/link";
import { ArrowRightIcon, featureIcons } from "@/components/ui/Icons";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import type { ContactChannel } from "@/content/contact";

/** Routed contact cards — "which of these are you?" rather than one
 * catch-all form. Acelo has no ticketing system and no monitored public
 * inbox, so every route here ends at WhatsApp, the phone line, or a page,
 * which is what actually gets answered.
 *
 * `tel:` and `https:` links are given the right target/rel; internal
 * routes are plain `Link`s. */
export function ContactChannels({
  eyebrow,
  headline,
  subhead,
  channels,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  channels: ContactChannel[];
}) {
  return (
    <section className="flex flex-col items-center gap-10 bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="flex w-full max-w-[1272px] flex-col items-start gap-3">
        <CategoryEyebrowPill>{eyebrow}</CategoryEyebrowPill>
        <h2 className="text-display-l font-normal text-ink">{headline}</h2>
        <p className="max-w-[760px] text-body-base text-text-muted">{subhead}</p>
      </div>
      <div className="grid w-full max-w-[1272px] grid-cols-1 gap-6 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = featureIcons[channel.icon];
          const external = channel.cta.href.startsWith("http");
          return (
            <div
              key={channel.title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-tint-blue-100 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-heading-3 font-normal text-ink">{channel.title}</h3>
              <p className="text-[15px] leading-[1.6] text-text-muted">
                {channel.description}
              </p>
              <Link
                href={channel.cta.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="tap-target mt-auto inline-flex items-center gap-2 pt-2 text-[14px] text-primary hover:text-primary-hover"
              >
                {channel.cta.label}
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
              {channel.detail && (
                <span className="text-[13px] text-text-muted">{channel.detail}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
