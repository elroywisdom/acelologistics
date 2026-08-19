import { clsx } from "@/lib/clsx";

/** Small pill label above a section headline, naming the category in 1-3
 * words (kickoff doc §5). Uses the tint-blue-200 fill per the token table's
 * "Category eyebrow pill fills" usage note. */
export function CategoryEyebrowPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-block rounded-pill bg-tint-blue-200 px-3 py-1 text-caption font-normal uppercase text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
