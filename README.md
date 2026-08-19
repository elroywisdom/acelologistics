# Acelo Logistics — Website

Next.js (App Router) + TypeScript + Tailwind CSS v4. Built from the Figma
file `IXHZLViiIEGL3mQAux6pyR`, following `acelo-claude-code-project-kickoff.md`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Status

Home page (`/`) is built and verified against Figma section-by-section —
see the kickoff doc §12 workflow. The other 9 priority pages (About, Fleet
Partner, Rental, Church Event, School, Travel & Tour, Hotels, Real Estate,
Group Travel) have not been started yet. A vehicle detail + booking page
(`/fleet/[vehicleId]`) has been added outside that page list — see
"Booking flow" below.

## Booking flow (`/fleet/[vehicleId]`)

Every "Rent Now" button (`VehicleCard.tsx`) now opens a per-vehicle
detail + booking page instead of going straight to a generic WhatsApp
link. Not from Figma — built 2026-08-19 from the Shuttlers reference
El-Roy shared (shuttlers.co/solutions/rental/10), re-themed to Acelo's
tokens, and wired to the "Hybrid Booking Funnel" already specified in
the project kickoff brief: **no SQL database.** A 2-step form (Rental
Details → User Details, `components/booking/BookingForm.tsx`) posts to
`app/api/bookings/route.ts`, which does two things and stores nothing
server-side:

1. Builds a structured WhatsApp `wa.me` deep-link message (`lib/booking.ts`,
   the exact blueprint format from the kickoff brief) — shown to the
   customer in the success modal as "Message Acelo HQ on WhatsApp."
2. Emails a confirmation to the customer **and** an internal notification
   to Acelo's team inbox (`lib/email.ts`, via Resend) — the notification
   email is the zero-budget replacement for automated WhatsApp
   follow-up (El-Roy confirmed on 2026-08-19 there's no budget for
   WhatsApp Business API access, which real automated follow-up needs).
   Whoever owns booking follow-up works that inbox the way they'd work
   a WhatsApp queue.

### Email setup (Resend)

Nothing above needs Resend to *work* — without it, the booking still
completes (the WhatsApp deep link in the success modal still functions;
`lib/email.ts` just logs a warning and skips the send) — but no real
email goes out until this is configured:

1. Create a Resend account at resend.com and verify a sending domain
   (Resend rejects sends from unverified domains — this is the part
   that takes actual DNS access, not just an account signup).
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`,
   `RESEND_FROM_EMAIL` (must be on the verified domain), and
   `ACELO_TEAM_EMAIL` (where booking notifications land).
3. Restart `npm run dev` — env vars are only read at server start.

If El-Roy's own Resend setup doc turns out to specify a different
pattern than the above (different env var names, a shared account
already in use elsewhere, etc.), reconcile `lib/email.ts` /
`.env.example` against that doc rather than the reverse.

## Image assets

The cloud sandbox this was built in has no network route to Figma's asset
CDN, so real images couldn't be pulled automatically. El-Roy exported them
by hand from Figma (Export → PNG at 2x) and dropped them into
`public/images/...`, and they're now wired in via `next/image` throughout
— hero collage, all fleet vehicle photos, the testimonial photo, and the
real nav wordmark SVG. Realforte's logo followed the same path and is
now live too.

**One logo export is still outstanding — `frontline.png`.** The original
export was a 1x1 transparent pixel (empty export, not a missing file);
the re-export that followed (`frontline 1.png`) turned out to be a
byte-for-byte duplicate of the Realforte logo file, not Frontline Homes
Limited's actual logo, so it wasn't wired in — showing Realforte's mark
mislabeled as Frontline would be worse than the placeholder. The
trust-logo strip (`TrustLogoStrip.tsx`) still falls back to a labeled
placeholder for just this one via `src: null` in `content/home.ts`.
Re-export Frontline Homes Limited's actual logo layer (Export → PNG at
2x — double check it's the right layer selected before exporting) and
drop it in at `public/images/logos/frontline.png`; once it's a real,
correct file, add back `src: "/images/logos/frontline.png"` (and the
matching width/height) in `content/home.ts` and the placeholder goes
away automatically.

Everything else — colors, type scale, spacing, copy, layout, social/UI
icons, structure, and now every real photo/logo except Frontline's — is
either pulled directly from Figma, hand-exported by El-Roy, or built
from real open-license icon sources.

## Token corrections applied

Several colors/fonts in the raw Figma export didn't match the design token
table in the kickoff doc (drift from hand-set hex values, consistent with
the off-token issues already documented in this project's history). These
were corrected in code rather than copied verbatim — see comments at the
top of each affected component (`VehicleTypeBand`, `TrustLogoStrip`,
`WhyAcelo`, `Testimonial`, `FAQAccordion`, `FinalCTA`, `Footer`,
`VehicleCard`) for the specific before/after values.

## Deploy

Vercel, per the kickoff doc's assumed deploy target (not yet configured).
