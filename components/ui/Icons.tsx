// Small generic UI glyphs (chevron, arrow, star, user) — not brand or photo
// content, so hand-authored inline SVG is appropriate here (unlike the
// social/photo assets, which come from real sourced files elsewhere).
import type { SVGProps } from "react";

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5 15.09 8.76 22 9.77l-5 4.87 1.18 6.88L12 18.27l-6.18 3.25L7 14.64l-5-4.87 6.91-1.01L12 2.5Z" />
    </svg>
  );
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" {...props}>
      <path d="M6 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 1c-2.21 0-4 1.343-4 3v.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V10c0-1.657-1.79-3-4-3Z" />
    </svg>
  );
}

// Added for the vehicle booking flow (`components/booking/BookingForm.tsx`).
export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 24.5l6 6 12-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------
// Feature icons for the solution/landing pages built after Home. Home's
// own value-prop band (`WhyAcelo`) uses text glyphs (✓ ↗ ▤ ◎) because
// that is literally what Figma node 70:211 specifies; these pages have no
// Figma source, so they use real vector icons instead of glyph
// characters — glyphs render inconsistently across platforms and are not
// reliably hidden from screen readers.
// ---------------------------------------------------------------------

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2.75 4.75 5.5v6c0 4.28 3 8.2 7.25 9.75 4.25-1.55 7.25-5.47 7.25-9.75v-6L12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9 12 2.25 2.25L15.25 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RouteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="6" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18.5" r="2.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.25 5.5H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9.5" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.75 19.25c0-3.04 2.58-5.5 5.75-5.5s5.75 2.46 5.75 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16.5 5.2a3.25 3.25 0 0 1 0 6.05M18 13.9c1.9.75 3.25 2.5 3.25 4.55" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21.25c4-4.06 6-7.32 6-9.79a6 6 0 1 0-12 0c0 2.47 2 5.73 6 9.79Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11.25" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M16.5 14.5h1.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeadsetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4.75 14v-2a7.25 7.25 0 0 1 14.5 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="2.75" y="13" width="4" height="6" rx="1.75" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17.25" y="13" width="4" height="6" rx="1.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.25 19v.75a2.5 2.5 0 0 1-2.5 2.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2.75 6.75h10.5v9.5H2.75z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.25 10h3.9l3.1 3.1v3.15h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.75" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="1.75" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="3.75" width="16" height="14.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8.5 18.25v2M15.5 18.25v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

export function BuildingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4.75 20.25V5.5a1.75 1.75 0 0 1 1.75-1.75h6.5A1.75 1.75 0 0 1 14.75 5.5v14.75" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14.75 20.25V10h3.5a1.5 1.5 0 0 1 1.5 1.5v8.75M3 20.25h18M8 7.75h3.5M8 11.5h3.5M8 15.25h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function GraduationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m12 3.75 9 4.5-9 4.5-9-4.5 9-4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M6.75 10.5v4.75c0 1.66 2.35 3 5.25 3s5.25-1.34 5.25-3V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="m15 9-1.6 4.4L9 15l1.6-4.4L15 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3.25 13.9 9.1a1.5 1.5 0 0 0 1 1L20.75 12l-5.85 1.9a1.5 1.5 0 0 0-1 1L12 20.75l-1.9-5.85a1.5 1.5 0 0 0-1-1L3.25 12l5.85-1.9a1.5 1.5 0 0 0 1-1L12 3.25Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function CarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4.25 16.5v-3.1l1.6-4.3A2 2 0 0 1 7.72 7.8h8.56a2 2 0 0 1 1.87 1.3l1.6 4.3v3.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3.5 13.4h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7.5" cy="16.5" r="1.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="16.5" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Icon lookup used by the prop-driven section components
 * (`ValuePropBand`, `SolutionCard`, `AudienceGrid`) so page content files
 * can name an icon as a plain string instead of importing components. */
export const featureIcons = {
  shield: ShieldIcon,
  route: RouteIcon,
  users: UsersIcon,
  pin: MapPinIcon,
  wallet: WalletIcon,
  headset: HeadsetIcon,
  truck: TruckIcon,
  bus: BusIcon,
  car: CarIcon,
  building: BuildingIcon,
  graduation: GraduationIcon,
  compass: CompassIcon,
  spark: SparkIcon,
  clock: ClockIcon,
  calendar: CalendarIcon,
  check: CheckCircleIcon,
} as const;

export type FeatureIconKey = keyof typeof featureIcons;
