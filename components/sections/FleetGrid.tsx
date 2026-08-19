import { VehicleCard } from "@/components/cards/VehicleCard";
import { Button } from "@/components/ui/Button";
import { CategoryEyebrowPill } from "@/components/ui/CategoryEyebrowPill";
import { fleetBanner, fleetVehicles } from "@/content/home";

/** Figma node 88:2063 ("vehicle-fleet-page"). */
export function FleetGrid() {
  return (
    <section id="fleet" className="flex flex-col gap-10 bg-white px-6 py-16 sm:px-10 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex max-w-[800px] flex-col items-start gap-3">
          <CategoryEyebrowPill>Fleet</CategoryEyebrowPill>
          <h2 className="text-display-l font-normal text-ink">
            Acelo vehicle fleet
          </h2>
          <p className="text-[15px] leading-[1.5] text-text-muted">
            Explore our diverse fleet of well-maintained vehicles, carefully
            selected to meet your needs. Whether you&rsquo;re looking for a
            Coaster Bus, a Prado SUV, a Hilux, a Mini Bus, or a heavy-duty
            Truck, we have the perfect option for every journey.
          </p>
        </div>
        <Button href="https://wa.me/2348103115430" target="_blank" className="shrink-0 px-6 py-3 text-[15px]">
          Talk to Dispatch
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-center gap-6 lg:justify-start">
        {fleetVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-4 rounded-lg bg-ink px-6 py-6 sm:flex-row sm:items-center sm:px-10 sm:py-8">
        <div className="flex flex-col gap-2">
          <p className="text-heading-2 font-normal text-white">
            {fleetBanner.title}
          </p>
          <p className="text-[14px] text-text-muted">{fleetBanner.subtitle}</p>
        </div>
        <Button variant="accent" href={fleetBanner.cta.href} className="shrink-0">
          {fleetBanner.cta.label}
        </Button>
      </div>
    </section>
  );
}
