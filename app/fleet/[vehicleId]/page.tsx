import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/booking/BookingForm";
import { UserIcon } from "@/components/ui/Icons";
import { fleetVehicles } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

/** Vehicle detail + booking page — reachable from every "Rent Now" button
 * (`VehicleCard.tsx`). Not in the original Figma file; built from the
 * Shuttlers reference page El-Roy shared on 2026-08-19
 * (shuttlers.co/solutions/rental/10) — breadcrumb, image + thumbnail
 * gallery, vehicle info, and the Rental Details/User Details booking
 * panel on the right, re-themed to Acelo's own tokens.
 *
 * Only one photo exists per vehicle today (`fleetVehicles[].image`), so
 * the gallery renders a single "selected" thumbnail rather than the
 * reference's 5-photo strip — ready to show more the moment additional
 * angles exist, nothing else needs to change. */

export function generateStaticParams() {
  return fleetVehicles.map((vehicle) => ({ vehicleId: vehicle.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}): Promise<Metadata> {
  const { vehicleId } = await params;
  const vehicle = fleetVehicles.find((v) => v.id === vehicleId);
  if (!vehicle) return {};

  return pageMetadata({
    title: `${vehicle.name} Rental in Abuja`,
    description: vehicle.description,
    path: `/fleet/${vehicle.id}`,
  });
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}) {
  const { vehicleId } = await params;
  const vehicle = fleetVehicles.find((v) => v.id === vehicleId);
  if (!vehicle) notFound();

  return (
    <>
      <NavBar />
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 py-10 sm:px-10 lg:px-[60px] lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
            <Link href="/#fleet" className="text-text-muted hover:text-primary">
              Fleet
            </Link>
            <span className="text-text-muted" aria-hidden>
              /
            </span>
            <span className="rounded-pill bg-tint-blue-100 px-3 py-1 font-normal text-primary">
              {vehicle.name}
            </span>
          </nav>

          <div className="flex flex-col gap-2">
            <h1 className="text-display-l font-normal text-ink">{vehicle.name}</h1>
            <p className="text-[15px] text-text-muted">{vehicle.seats} vehicle category</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface-alt p-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md sm:aspect-[16/10]">
                  <Image
                    src={vehicle.image.src}
                    alt={vehicle.name}
                    fill
                    sizes="(min-width: 1024px) 780px, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 border-success bg-white">
                    <Image
                      src={vehicle.image.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-heading-2 font-normal text-ink">Vehicle Information</h2>
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-text-muted">Starting from</span>
                  <span className="text-heading-1 font-normal text-success">{vehicle.price}</span>
                </div>
                <p className="max-w-[640px] text-[15px] leading-[1.6] text-text-muted">
                  {vehicle.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-heading-2 font-normal text-ink">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-[14px] text-ink">
                    <UserIcon className="h-4 w-4 text-text-muted" />
                    {vehicle.seats}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-[100px]">
              <BookingForm vehicle={vehicle} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
