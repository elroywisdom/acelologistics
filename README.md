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

Nine of the 10 priority pages are live, plus a contact page and a partner application form. About is built but currently taken down (see below):

| Route | Page |
|---|---|
| `/` | Home |
| `/partners/fleet` | Fleet Partner |
| `/solutions/rental` | Rental |
| `/solutions/church-events` | Church Event |
| `/solutions/schools` | School |
| `/solutions/group-travel` | Group Travel |
| `/solutions/travel-tour-partners` | Travel & Tour |
| `/solutions/hotels` | Hotels |
| `/solutions/real-estate` | Real Estate |
| `/resources/contact` | Contact |

Plus `/fleet/[vehicleId]` (9 vehicle detail + booking pages) — see
"Booking flow" below.

Home is verified against Figma section-by-section per the kickoff doc §12
workflow. **The other nine are not, because there is nothing to verify
against:** node `70:148` ("acelo-home") is the only page frame in the
Figma file, confirmed by querying it directly. They were built instead
from the three strategy docs in this repo — `acelo-section-layout.md` for
structure, `acelo-copywriting-style.md` for copy, `acelo-seo-strategist.md`
for metadata, URLs and internal linking — on the same tokens and
components as Home. If those pages ever get designed in Figma, reconcile
the code against the frames rather than the reverse.

### How the pages are put together

Eight of the nine share one skeleton, `components/layout/SolutionPageLayout.tsx`
(the solution/service sub-page skeleton from the section-layout doc), so
they stay one system rather than eight near-copies. About has its own
composition in `app/about/page.tsx` because its section map differs
(story and mission replace the offerings grid, no FAQ).

### Navigation

`NavBar.tsx` renders a full-bleed mega-menu for Solutions, not a dropdown.
Seven items in a single 320px column ran ~780px tall and covered the H1 on
every page. The panel is now attached to the header at full viewport
width, two item columns (three at `xl`, where a "Not sure which fits?"
CTA card joins them), with an icon chip per item so the list is scannable
by shape. It opens on hover *and* click, closes on Escape (returning focus
to the trigger), outside click, focus leaving the panel, or a route
change, and marks the current page with `aria-current`.

Icon chips are all `tint-blue`/`primary` rather than the per-item pastel
colours this pattern usually uses — the token rules restrict the
supporting palette to campaign/photography contexts and forbid off-token
colour in core UI, and that exact mistake was already made and corrected
once on this project.

All copy and page data live in `content/<page>.ts`, typed against
`content/types.ts`; the page files are layout only. `content/site.ts`
holds the single page registry that drives nav links, footer columns,
cross-sell cards and `app/sitemap.ts` — add a route there and all four
pick it up, which is what stops the dead-nav-link problem this site had
before from coming back.

### Numbers on these pages

Every value in `content/site.ts`'s `proof` object is counted from data
already in this repo or restated from copy already approved on Home —
none is estimated. That constraint is deliberate: the copywriting doc
requires real, specific proof points, and an invented stat on a logistics
site is a liability. **Read the comment above `proof` before adding a
stat.** Get the real figure from Acelo (trips completed, organizations
served, on-time percentage) rather than approximating one to fill a
layout.

**Do not publish an upper bound on scale.** A "15+ units coordinated
simultaneously" stat and a "42 seats in the largest unit" stat were
removed on 2026-09-07: Acelo has run church programmes larger than both,
so the figures advertised a ceiling the company had already cleared — a
stat that loses work rather than winning it. Capacity is now stated as
coordination capability instead (`multiSite`, `fleetScale`), which is
both true and non-limiting. Per-vehicle seat counts still appear on the
fleet cards in `content/home.ts`, where they are product specs a customer
needs ("which bus fits my group?") rather than a claim about how much
Acelo can move.

For the same reason, hero headlines name a *service*, not a vehicle
class. "Book a coaster fleet for your next convention" and "Charter
interstate coaches" were both rewritten — Acelo runs every bus class plus
cars on church and tour work, and naming one class read as a limit.

### About page — taken down, not deleted

`/about` was taken down on 2026-09-07 ("not needed for now") and 404s. The
page is preserved at `app/_about/page.tsx` — the underscore is Next.js's
private-folder convention, which excludes the folder from routing while
leaving the code intact. `content/about.ts`, `StoryBlock.tsx` and
`MissionVision.tsx` were kept for the same reason.

To restore: rename the folder back to `about` and re-add the four
references removed with it. The full list is in the header comment of
`app/_about/page.tsx`.

### Policy pages (`/resources/terms-of-service`, `/resources/privacy-policy`)

Source lives in `content/legal/*.md` and is rendered at build time by
`lib/markdown.ts` — a deliberately small parser covering the four
constructs these documents use (headings, paragraphs, `- ` bullets,
`**bold**`). It **throws on anything it does not support** rather than
dropping it, because silently losing a clause from a legal page is the
failure that actually matters. To update a policy, edit the markdown; no
code change needed.

**Both pages are currently drafts.** The documents arrived with unfilled
blanks, and eight remain:

| Document | Still to confirm |
|---|---|
| Terms | Effective date · when the 20% balance falls due · overtime % · cancellation window (×2) · court jurisdiction |
| Privacy | Effective date · record retention period · job-application retention period |

Any `[...]` blank renders as a highlighted chip, each page shows a "Draft
— not yet in force" banner, and both are `noindex` and excluded from the
sitemap. All of that is driven off `doc.placeholders`, so **filling the
blanks in the markdown clears the banner, the highlighting, the noindex
and the sitemap exclusion automatically** — no code to remember to change.

The registered address and RC number placeholder was filled: the address
Acelo supplied on 2026-09-07, and RC 9293990, which Acelo already
publishes in its own site footer.

### Address and NAP consistency

The office address lives in one place, `address` in `content/site.ts`, and
is read by the footer, the contact page and `localBusinessJsonLd()`. That
is deliberate: the SEO doc requires Name/Address/Phone to be identical
across the site, the Google Business Profile and any directory listing,
and three hand-copied addresses is how that drifts. **If the address
changes, change it there and update the Google Business Profile to match.**

### Hero imagery

Every page leads with the real vehicle it sells, on the primary fill, with
a `tint-blue-100` radial behind it (the token table's stated use for that
colour is decorative blob backgrounds, which is exactly this). These
started as bulleted cards on the reasoning that no page outside Home had
cleared photography — that was wrong. The fleet photos in
`public/images/fleet/` are cleared assets and every one is a transparent
cutout, so they sit on the hero the same way Home's collage does. The
proof points that filled the card are now compact chips under the CTA row.

**Which image goes on which page** follows one rule: a page selling the
whole fleet gets the collage, a page selling one use case gets that use
case's vehicle.

| Page | Image |
|---|---|
| About, Contact, Rental, Fleet Partner | Fleet collage (six classes at once) |
| Church & Event | CNG BRT bus (largest unit) |
| Schools | Toyota Hiace |
| Group Travel | New-model coaster |
| Travel & Tour | Standard coaster |
| Hotels | Toyota Sienna |
| Real Estate | Toyota Hilux |

Fleet Partner briefly used the Hino truck and should not again: it is a
tipper, so it reads as construction haulage rather than logistics, and it
narrows a supply-side pitch to one class when the page's own offering grid
covers buses, coasters, Hiace, mini vans, executive cars, SUVs and trucks.

**Two caveats on these images:**

1. **`toyota-prado-white.png` carries a "Gulliver" dealer plate** — a
   Japanese used-car retailer. It is small enough to miss on a 370px fleet
   card but not something to enlarge to 560px on a hero, so the Hotels
   page (which its executive framing suits best) uses the Sienna instead.
   Swap it back once there is an executive-car photo without another
   company's branding in it.
2. **Most fleet photos are ~512-740px wide**, which is fine at fleet-card
   size but soft on a retina screen at hero size. Re-export from Figma at
   a higher scale to sharpen them. Only the hero collage (2312px) and the
   Hiace (2820px) are large enough today.

Beyond the Prado, these are clean manufacturer catalogue shots rather than
photographs of Acelo's own vehicles. Real photos of the actual fleet would
be a genuine upgrade wherever they can be taken.

### What is deliberately not built

- **Team/leadership grid on About.** The section map calls for one; it
  needs real cleared headshots of real people, and the kickoff doc (§7)
  rules out placeholder imagery. Drop it between `MissionVision` and
  `ValuePropBand` when photos exist.
- **Photo-background variant of `SolutionCard`.** No page outside Home
  has cleared photography. The featured/plain variants ship; add the
  photo variant when real per-service photos exist.
- **Audience-specific testimonials.** Michella Ezima (TM Global) is the
  only cleared testimonial that exists, so it is reused across pages.
  Writing quotes from fictional school administrators or hotel managers
  would be fabricating customer statements. Collect real ones and they
  drop straight into `components/sections/Testimonial.tsx`.
- **`/resources/faq`.** In the SEO doc's IA but not in the priority list.
  Each page carries its own audience-specific FAQ instead.
- **`/resources/faq`.** Each page carries its own audience-specific FAQ
  instead of one blended list.

### Known contrast issue (needs an Acelo decision)

`color-text-muted` (`#718096`) is the site's default secondary text
colour and does not clear WCAG AA (4.5:1) for body text on any of its
backgrounds:

| Pairing | Ratio |
|---|---|
| on white | 4.02:1 |
| on `color-surface-alt` | 3.81:1 |
| on `color-tint-blue-100` | 3.52:1 |

This predates the new pages — Home uses it throughout — so the token
itself was left alone rather than changed unilaterally against a
Figma-verified page. The new pages avoid making it *worse*: the
value-prop band's section subhead uses `color-text` on the tinted fill
instead of muted, and cross-sell cards use a white fill rather than
surface-alt. Fixing it properly means darkening `--color-text-muted` in
`app/globals.css`. `#616c80` is the smallest change that clears 4.5:1 on
all three backgrounds (5.30:1 on white, 5.02:1 on surface-alt, 4.64:1 on
tint-blue-100). That changes Home too, so it is Acelo's call, not a
unilateral edit to a Figma-verified page.

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

## Fleet partner applications (`/partners/fleet/apply`)

The Fleet Partner CTAs used to open a blank WhatsApp chat, which left
dispatch pulling ten structured fields out of an applicant one question at
a time. They now go to a two-step form — vehicle first, owner second,
because the vehicle step is what decides whether there is an application
at all and asking a stranger for their phone number before they know they
qualify loses them.

Architecture is deliberately identical to the booking flow: the form posts
to `app/api/partner-applications/route.ts`, which validates, builds a
WhatsApp deep link (`lib/partner-application.ts`), and emails both the
applicant and Acelo's team via Resend. `lib/email.ts` gained two templates
and reuses everything else it already had. **Nothing is persisted** —
same "no SQL database" constraint as bookings.

Two decisions worth knowing:

- **No document uploads.** Vehicle papers, insurance and driver's licence
  are requested during vetting on WhatsApp, where a person is already in
  the conversation and photographing a document is normal. Collecting
  files here would mean object storage or attachment buffering for a step
  a human reviews anyway.
- **Every select field is validated against an allow-list**, not accepted
  as free text, and the free-text fields are HTML-escaped. These values
  are interpolated into two HTML emails, so unchecked strings would be an
  injection vector into Acelo's own inbox.

**Email is not a pipeline, and this flow will outgrow it.** An inbox has
no stages, no owner and no status; a bounced notification loses an
application silently. That is fine for bookings, which close the same day,
but partner applications run through apply → inspect → onboard over weeks.
Once Acelo is carrying more than a handful of open applicants, add a
store. `PartnerApplication` is a flat serialisable shape precisely so that
is a small change: write the object in the API route alongside the two
sends. A Google Sheet via a service account is free and needs no billing
card; Airtable or Notion give real stages.

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
