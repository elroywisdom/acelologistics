import { clsx } from "@/lib/clsx";

type Tone = "accent" | "primary";

/** Highlights a word, phrase, or stat inline within a sentence rather than
 * pulling it into a separate stat card (kickoff doc §5). */
export function InlineHighlightChip({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "rounded-sm px-1.5 py-0.5",
        tone === "accent" ? "bg-accent text-text" : "bg-tint-blue-200 text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
