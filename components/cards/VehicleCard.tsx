import Image from "next/image";
import { UserIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import type { FleetVehicle } from "@/content/home";

/** Figma node 88:2072 (VehicleCard). Radius corrected from the Figma
 * layer's literal 12px to r-lg (16px) — the token table explicitly names
 * r-lg for "feature/vehicle cards", so 12px was drift, not an intentional
 * variant.
 *
 * "Rent Now" used to go straight to a generic WhatsApp link with no
 * context about which vehicle. It now opens that vehicle's own detail +
 * booking page (`app/fleet/[vehicleId]`, 2026-08-19) — the WhatsApp
 * handoff still happens, just after the booking form collects the real
 * trip details first. */
export function VehicleCard({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-white p-5 sm:w-[410px]">
      <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden rounded-md bg-tint-blue-100 p-4">
        <Image
          src={vehicle.image.src}
          alt={vehicle.name}
          fill
          sizes="(min-width: 640px) 370px, 90vw"
          className="object-contain"
        />
      </div>
      {vehicle.seats && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-tint-blue-100 px-2.5 py-1 text-caption font-normal text-primary">
          <UserIcon className="h-3 w-3" />
          {vehicle.seats}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-heading-3 font-normal text-ink">{vehicle.name}</h3>
        <p className="line-clamp-2 text-[13px] leading-[1.4] text-text-muted">
          {vehicle.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          href={`/fleet/${vehicle.id}`}
          className="px-4 py-2 text-[14px]"
        >
          Rent Now
        </Button>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-text-muted">Starting from</span>
          <span className="text-[18px] text-ink">{vehicle.price}</span>
        </div>
      </div>
    </div>
  );
}
