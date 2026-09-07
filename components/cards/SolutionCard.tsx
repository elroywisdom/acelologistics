import Link from "next/link";
import { ArrowRightIcon, featureIcons } from "@/components/ui/Icons";
import type { SolutionCardContent } from "@/content/types";

/** The offering-grid card from the section-layout doc, in its two
 * variants: one solid brand-color "featured" card per grid, the rest
 * white. The doc's third (photo-background) variant is deliberately not
 * built — no page outside Home has cleared photography, and the kickoff
 * doc forbids stock stand-ins (§7). Add it when real per-service photos
 * exist; nothing else about the grid has to change.
 *
 * Renders as a `<Link>` when `href` is set and a plain `<div>` otherwise,
 * so a card describing an offering that has no page of its own does not
 * present a dead click target. */
export function SolutionCard({ card }: { card: SolutionCardContent }) {
  const Icon = featureIcons[card.icon];
  const featured = card.featured ?? false;

  const body = (
    <>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-md ${
          featured ? "bg-white/15 text-white" : "bg-tint-blue-100 text-primary"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3
        className={`text-heading-3 font-normal ${featured ? "text-white" : "text-ink"}`}
      >
        {card.title}
      </h3>
      <p
        className={`text-[15px] leading-[1.6] ${
          featured ? "text-white/85" : "text-text-muted"
        }`}
      >
        {card.description}
      </p>
      {card.href && (
        <span
          className={`mt-auto inline-flex items-center gap-2 pt-2 text-[14px] ${
            featured ? "text-accent" : "text-primary"
          }`}
        >
          Learn more
          <ArrowRightIcon className="h-4 w-4" aria-hidden />
        </span>
      )}
    </>
  );

  const shell = `flex h-full flex-col gap-3 rounded-lg p-6 transition-colors ${
    featured
      ? "bg-primary hover:bg-primary-hover"
      : "border border-border bg-white hover:border-primary"
  }`;

  if (card.href) {
    return (
      <Link href={card.href} className={shell}>
        {body}
      </Link>
    );
  }

  return <div className={shell}>{body}</div>;
}
