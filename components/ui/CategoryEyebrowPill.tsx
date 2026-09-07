import { clsx } from "@/lib/clsx";

/** Small pill label above a section headline, naming the category in 1-3
 * words (kickoff doc §5). The default fill is tint-blue-200 per the token
 * table's "Category eyebrow pill fills" usage note.
 *
 * `tone` exists instead of letting call sites pass `bg-*`/`text-*` through
 * `className`. Overriding this way looked like it worked — the dark-section
 * pills did render white — but only because Tailwind happened to emit
 * `text-white` after `text-primary` in its utilities layer. Both are
 * unprefixed utilities of equal specificity, so the winner is decided by
 * Tailwind's internal stylesheet order, not by className source order,
 * and it can flip on a Tailwind upgrade or a change in which utilities the
 * project uses. That is the same failure already hit and documented in
 * `VehicleTypeBand.tsx` and `NavBar.tsx`; a variant prop emits one class
 * per property instead of two that race. */
export function CategoryEyebrowPill({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  /** "light" sits on white/tinted sections, "onDark" on ink or primary. */
  tone?: "light" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-block rounded-pill px-3 py-1 text-caption font-normal uppercase",
        tone === "onDark" ? "bg-white/15 text-white" : "bg-tint-blue-200 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
