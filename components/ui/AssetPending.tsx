import { clsx } from "@/lib/clsx";

/**
 * Stand-in for a real photography/logo asset that isn't available yet.
 * Every Home page image now comes from El-Roy's real Figma exports (see
 * README "Image assets") except one — this component covers Frontline
 * Homes Limited's trust logo, whose export came through empty (1x1px)
 * and whose re-export turned out to be a mislabeled duplicate of the
 * Realforte logo rather than Frontline's actual mark.
 *
 * This is intentionally NOT a fake stock photo — per the kickoff doc's
 * hard rule, real cleared assets only, never a placeholder passed off as
 * final. This is a clearly labeled gap, sized to the real layout, ready to
 * be swapped for a `next/image` pointed at the real exported file.
 */
export function AssetPending({
  label,
  title,
  className,
  aspectClassName = "aspect-[4/3]",
}: {
  label: string;
  /** Longer detail shown as a native hover tooltip and used for the
   * accessible name, when `label` itself is kept short for tight layouts
   * (e.g. a marquee item that just needs to show a company name). */
  title?: string;
  className?: string;
  aspectClassName?: string;
}) {
  return (
    <div
      role="img"
      aria-label={title ?? label}
      title={title}
      className={clsx(
        "flex items-center justify-center rounded-md border border-dashed border-border bg-tint-blue-100 p-4 text-center text-caption text-text-muted",
        aspectClassName,
        className,
      )}
    >
      <span>{label}</span>
    </div>
  );
}
