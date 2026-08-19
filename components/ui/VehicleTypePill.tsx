import { clsx } from "@/lib/clsx";

type Tone = "ink" | "primary" | "tint" | "accent";

const toneClasses: Record<Tone, string> = {
  ink: "bg-ink text-white",
  primary: "bg-primary text-white",
  tint: "bg-tint-blue-200 text-primary",
  accent: "bg-accent text-ink",
};

/** Pill labels in the vehicle-type band. Deliberate one-off: uses Geist
 * Bold rather than the site-wide Cal Sans (kickoff doc §3 typography
 * exception) — do not reuse this font pairing anywhere else. */
export function VehicleTypePill({
  children,
  tone,
  rotate = 0,
  className,
}: {
  children: React.ReactNode;
  tone: Tone;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-pill px-6 py-3 text-[15px] font-geist-bold font-bold shadow-[0px_8px_8px_rgba(0,0,0,0.06)]",
        toneClasses[tone],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
