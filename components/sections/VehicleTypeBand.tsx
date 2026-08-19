import { VehicleTypePill } from "@/components/ui/VehicleTypePill";
import { vehicleTypeBand } from "@/content/home";

/** Figma node 60:1885 ("car-rental-hero-v2"). Background corrected from the
 * Figma layer's literal #eff6ff (off-token) to color-tint-blue-100 — this
 * is a decorative band background, exactly the tint-100 use case in the
 * token table. Heading color corrected from an off-token navy (#0d296a,
 * not present anywhere in the token set) to color-primary. Body copy font
 * corrected from Geist Regular to Cal Sans — the Geist-Bold exception in
 * the kickoff doc covers pill labels only, not body text. */
export function VehicleTypeBand() {
  return (
    <section className="relative overflow-hidden bg-tint-blue-100 px-6 py-16 sm:px-10 lg:px-16">
      {/* decorative grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-between py-20 opacity-40"
      >
        <div className="h-px w-full bg-border" />
        <div className="h-px w-full bg-border" />
        <div className="h-px w-full bg-border" />
      </div>

      <div className="relative mx-auto flex max-w-[1272px] flex-col items-center">
        {/* Decorative pills are wrapped so visibility (hidden/block) lives
            on the wrapper, not stacked onto the same element as the
            component's own `inline-flex` base class — those are both
            unprefixed display utilities of equal specificity, so which one
            "wins" depends on Tailwind's internal stylesheet order rather
            than className source order, and silently failed to hide on
            mobile until this was split out. */}
        <div className="absolute left-[4%] top-0 hidden sm:block">
          <VehicleTypePill
            tone={vehicleTypeBand.pills[0].tone}
            rotate={vehicleTypeBand.pills[0].rotate}
          >
            {vehicleTypeBand.pills[0].label}
          </VehicleTypePill>
        </div>
        <div className="absolute right-[6%] top-2 hidden sm:block">
          <VehicleTypePill
            tone={vehicleTypeBand.pills[1].tone}
            rotate={vehicleTypeBand.pills[1].rotate}
          >
            {vehicleTypeBand.pills[1].label}
          </VehicleTypePill>
        </div>
        <div className="absolute left-0 top-[38%] hidden lg:block">
          <VehicleTypePill
            tone={vehicleTypeBand.pills[2].tone}
            rotate={vehicleTypeBand.pills[2].rotate}
          >
            {vehicleTypeBand.pills[2].label}
          </VehicleTypePill>
        </div>
        <div className="absolute right-0 top-[34%] hidden lg:block">
          <VehicleTypePill
            tone={vehicleTypeBand.pills[3].tone}
            rotate={vehicleTypeBand.pills[3].rotate}
          >
            {vehicleTypeBand.pills[3].label}
          </VehicleTypePill>
        </div>

        <div className="flex max-w-[780px] flex-col items-center gap-4 text-center">
          <h2 className="text-display-l font-normal text-primary">
            {vehicleTypeBand.headline}
          </h2>
          <p className="max-w-[640px] text-body-base text-text-muted">
            {vehicleTypeBand.subhead}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Figma's mobile Home frame (node 116:277/281) wraps all 8
              pills — the 4 desktop-only floating corner accents
              (`pills`, hidden above) plus the 4 always-visible dock pills
              — into this one flowing group, in that exact order, instead
              of just dropping the 4 corner pills on small screens. Folded
              in here below `sm` so mobile keeps all 8 vehicle types
              instead of losing 4 of them along with their absolute
              positioning. */}
          {vehicleTypeBand.pills.map((pill) => (
            <VehicleTypePill
              key={pill.label}
              tone={pill.tone}
              rotate={pill.rotate}
              className="sm:hidden"
            >
              {pill.label}
            </VehicleTypePill>
          ))}
          {vehicleTypeBand.dock.map((pill) => (
            <VehicleTypePill key={pill.label} tone={pill.tone} rotate={pill.rotate}>
              {pill.label}
            </VehicleTypePill>
          ))}
        </div>
      </div>
    </section>
  );
}
