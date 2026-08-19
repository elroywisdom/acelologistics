---
name: acelo-section-layout
description: Structure Acelo Logistics landing pages using a proven section architecture (hero, solutions grid, process, trust/safety, stats, testimonials, FAQ, cross-sell, final CTA, footer), benchmarked from studying Shuttlers.co's page patterns and mapped to Acelo's priority pages. Use when planning, wireframing, or building the Home, About, Fleet Partner, Rental, Church Event, School, Travel & Tour, Hotels, Real Estate, or Group Travel pages.
---

# Acelo Website Section Layout

A reusable page-architecture system for Acelo's website, generalized from studying how a mature African mobility platform (Shuttlers.co) sequences information across its site — every solution/service page follows the same skeleton with different content, which is what lets a small team ship many audience-specific landing pages without reinventing structure each time.

**Important distinction, verified directly against the live shuttlers.co homepage (`shuttlers.co/?locale=en`):** the homepage and the individual solution pages (Business, Daily, Rental, EventGo) are NOT the same shape. The homepage is a compact, multi-service overview; each solution page goes one level deeper on a single product. Use the **Homepage pattern** below for Acelo's Home page, and the **Solution/service sub-page skeleton** for the audience-specific landing pages (Rental, Church Event, School, Travel & Tour, Hotels, Real Estate, Group Travel, Fleet Partner).

## Homepage pattern (verified against the live shuttlers.co homepage)

Confirmed section order, top to bottom, re-checked on the live site:

1. **Header** — logo, primary nav grouped by intent (e.g. "Ride / Drive / Earn / Learn," not by internal org chart), language selector, secondary "Log in," primary "Create account/Get Started" button top-right.
2. **Hero** — one short headline + one-line subheadline with a proof number + app-download or primary CTA buttons. No supporting image needed if the headline is strong — the reference homepage hero is pure typography on white.
3. **Services overview grid** — ALL major services shown at once (not just one), typically 4 cards in a 2×2 grid: one "featured" card in a solid brand color with white text, the other three as photo cards with a white content panel anchored at the bottom. This is the homepage's only "solutions" section — it does not repeat elsewhere on the homepage.
4. **Routes/coverage CTA block** — a single full-width colored panel inviting the visitor to explore coverage/routes in more depth, one CTA button. Functions as a bridge between "here's what we offer" and "here's proof it works."
5. **Testimonials** — proof-invitation heading + a row of customer quote cards.
6. **Trust/safety dark block** — full-width dark section, bold reassurance headline, often paired with the app-download buttons inline (not a separate section) and a decorative illustration/animation.
7. **Social proof / community section** — links out to social channels with follower-style framing ("Get [Brand] news, company info...").
8. **App/web availability block** — a second, dedicated dark section: "Available on web and mobile" headline + app store badges + a device-frame product screenshot. Distinct from the trust/safety block even though both are dark — this one is purely about platform access, not reassurance.
9. **Footer** — logo + one-line company descriptor + address, four link columns (Solutions, Products/Partners, Policies, Resources), social icons, copyright line.

Notably, the **homepage itself has no stats bar, no FAQ accordion, no explicit numbered "how it works" process, and no cross-sell section** — those live on the individual solution pages instead. The homepage's job is breadth (show every service) plus light trust-building (testimonials, safety messaging, social proof); depth is deferred to each solution page.

**Acelo's Home page (already built in Figma) intentionally enriches this pattern** with a value-prop band and a stats bar pulled forward from the solution-page skeleton — a reasonable variation given Acelo has fewer, more distinct top-level services than Shuttlers and benefits from establishing scale/trust higher up. Keep this enrichment, but don't treat the full 12-section list below as mandatory for Home — that skeleton is calibrated for single-product solution pages, not the multi-service homepage.

## Solution/service sub-page skeleton (Business, Daily, Rental, EventGo — one product per page)

1. **Header** — logo, primary nav (grouped by audience/intent, not by internal org chart), language/locale if needed, secondary "Log in," primary "Get Started/Contact" button top-right.
2. **Hero** — headline + subheadline + primary CTA (+ secondary CTA), supporting visual (product screenshot, fleet photo, or dashboard mock). Keep it short — no more than headline, one subhead line, one CTA row above the fold.
3. **Solutions/Services grid** — a card grid introducing related offerings, using an alternating pattern: one "featured" card in a solid brand color with white text, paired with photo-based cards for the rest. Each card = icon/label + 1-2 sentence value line + link.
4. **Value proposition band** — 4-6 short benefit cards in a row/grid (icon + 3-5 word label + 1 sentence), e.g. "Vetted Reliability," "Pan-Nigeria Reach," "Scalable Fleet," "Real-Time Visibility."
5. **Process/"How it works"** — numbered steps (typically 3-5) shown horizontally or as a vertical timeline, walking the visitor from inquiry to delivery.
6. **Proof/stats bar** — a horizontal row of 3-4 large numbers with short labels underneath (trips completed, routes covered, organizations served, on-time %). Place on a colored or dark contrast background to visually break the page.
7. **Testimonials** — a horizontal card carousel: photo/avatar, name, role/organization, 1-2 sentence quote. Section intro is a proof-invitation heading, not a boast.
8. **Trust/safety block** — a full-width dark-background section with a bold reassurance headline and supporting illustration/photo, used once per page to create visual and emotional contrast against the mostly-white/light layout.
9. **FAQ accordion** — 4-6 collapsed questions specific to this page's audience, expand-on-click, no more than 2 sentences per answer.
10. **Cross-sell / related solutions** — 2-3 cards linking to adjacent Acelo services (e.g., Rental page links to Fleet Partner and Business pages), doubling as internal-link SEO equity distribution.
11. **Final CTA band** — dark or brand-color full-width section, restates the core offer, one large CTA button, optional secondary contact channel (WhatsApp/phone).
12. **Footer** — logo + one-line company descriptor + address, then four link columns (Solutions, Products/Partners, Policies, Resources), social icons, copyright line.

## Section anatomy details

**Hero:** Left-aligned or centered headline in the largest type on the page (see `acelo-website-designer` skill for exact scale). Subheadline is one muted-color sentence beneath, never more than ~20 words. CTA row = one filled pill button (primary action) optionally next to one outline button (secondary, e.g. "View Fleet"). Avoid crowding the hero with more than one supporting visual.

**Solutions grid card pattern:** This is the single most reusable component. Build it once as `SolutionCard` with two variants:

- _Featured variant:_ solid brand-color background, white bold title, white/light body text, white pill button "Learn More," rounded-corner container (~24px radius).
- _Photo variant:_ background photo, white content panel anchored to the bottom third of the card with title + 1-line description + arrow affordance, same rounded-corner treatment.
  Rotate which variant is "featured" per page based on which service that page is promoting.

**Process/How it works:** Keep to 3-5 numbered steps max — more than that reads as complicated, which undercuts a "seamless" brand promise. Each step = number/icon + 3-5 word title + 1 short sentence.

**Stats bar:** Never show more than 4 numbers at once. Each stat = big bold number + small label line underneath, evenly spaced in a row (stack on mobile). Numbers should be real and specific ("30,000+ people moved") not rounded to meaninglessness.

**Trust/safety dark block:** This section exists purely for pacing — it breaks up an otherwise light page and signals gravity/seriousness at a glance, even to a visitor who's only skimming. Use once per long page, ideally two-thirds down.

**FAQ:** Accordion, one open at a time, plus-icon that rotates to indicate open/closed state. Group by product/audience if the page covers more than one service.

## Page-by-page section maps for Acelo's priority pages

**Home** (follows the **Homepage pattern** above, enriched — this is what's built in Figma) — Header → Hero (company-level, not one service) → Solutions grid (all major services: Passenger Transport, Cargo/Logistics, Bus Branding, Fleet Partnership) → Value prop band (added enrichment) → Stats bar (added enrichment) → Testimonials → Trust/safety block → Final CTA band → Footer. Deliberately skips a homepage-level FAQ, process/how-it-works, and cross-sell section — those stay on the individual solution pages, matching the verified reference site's actual homepage (which also omits them).

**About** — Header → Hero (mission-led headline) → Company story/origin (replaces the solutions grid — narrative block: from Abuja Bus Hire to Acelo Logistics) → Mission/Vision/Values (3-column or stacked cards using the 6 core brand pillars: Speed, Efficiency, Reliability, Customer-Centricity, Innovation, African Focus) → Team/leadership showcase (photo grid + name + title) → Stats bar (scale proof) → Final CTA → Footer. No FAQ needed here.

**Vehicle/Fleet Partner** — Header → Hero ("Why become a Fleet Partner with Acelo") → Benefits band (Assured Revenue, Fixed Cost per Trip, Vetted Network, Support/Technology) → Process ("How the Fleet Partnership works": Apply → Vetting → Onboarding → Start Earning) → Stats bar (fleet size / units managed simultaneously) → Testimonials (existing partners, if available) → FAQ (partner-specific: payout terms, vehicle requirements, coverage areas) → Final CTA ("Become a Partner") → Footer.

**Rental landing page** — Header → Hero ("Rent a Vehicle for Any Occasion") → Fleet showcase (Sienna/Hiace/Coaster/BRT cards with seat capacity + use case) → Value prop band (flexible booking, professional pilots, inclusive pricing) → Who benefits (audience icon row: Businesses, Individuals, Event Planners, Travel Agencies) → Process (Request → Confirm → Ride) → Testimonials → FAQ (pricing, deposit, coverage) → Final CTA → Footer.

**Church Event Landing Page** — Header → Hero (scale + reliability framing, e.g. large-crowd logistics) → Value prop band (multi-unit coordination, hub pickups, emergency rerouting protocol, professional pilots) → Process (Consultation → Route/Hub Planning → Event-day Coordination → Post-event Report) → Stats bar (units managed simultaneously, attendees moved) → Testimonials/case-study style proof block → FAQ (booking lead time, capacity limits, deposit terms) → Final CTA (WhatsApp/phone-forward CTA) → Footer.

**School Landing Page** — Header → Hero (safety + consistency framing) → Value prop band (vetted drivers, term contracts, real-time tracking, parent peace-of-mind) → Process (Enrollment/Contract → Route Assignment → Daily Operation → Term Renewal) → Stats bar → Testimonials (school administrators) → FAQ (term pricing models, fuel/driver arrangements, safety vetting) → Final CTA → Footer.

**Travel and Tour Company Landing Page** — Header → Hero (B2B2C partner framing) → Value prop band (interstate/outstation capability, white-label reliability, multi-city coordination) → Process (Partnership Onboarding → Itinerary Planning → Execution → Reporting) → Stats bar → Testimonials (tour operator partners) → FAQ (partnership terms, coverage area, pricing model) → Final CTA ("Become a Partner"/"Get a Quote") → Footer.

**Hotels Landing Page** — Header → Hero (guest-experience continuity framing) → Value prop band (airport transfers, executive comfort, on-brand punctuality) → Process (Onboarding → Booking Integration → Guest Pickup Flow → Reporting) → Stats bar → Testimonials (hotel partners) → FAQ → Final CTA → Footer.

**Real Estate Landing Page** — Header → Hero (site-inspection/estate-launch framing) → Value prop band (recurring logistics support, multi-stop routing, event-day capacity) → Process (Contract → Route Planning → Ongoing Service → Launch-Day Surge Support) → Stats bar (case example scale, without naming clients unless approved) → Testimonials → FAQ → Final CTA → Footer.

**Group Travel Landing Page** — Header → Hero (large-group coordination framing) → Value prop band (cost efficiency per seat, single point of contact, multi-unit dispatch) → Process (Group Size + Itinerary Intake → Fleet Assignment → Travel Day → Debrief) → Stats bar → Testimonials → FAQ → Final CTA → Footer.

## Layout principles that apply everywhere

- **One primary CTA per page**, repeated at hero + mid-page + final band — never introduce a second competing primary action.
- **Alternate light and dark/colored sections** to create visual rhythm and mark section boundaries without needing hard divider lines.
- **Never stack more than 2 text-heavy sections in a row** — break up copy blocks with a stat bar, image, or card grid between them.
- **Mobile-first stacking:** every horizontal row (stats, benefit cards, process steps) must degrade to a single vertical column on mobile without losing meaning.
- **Consistent card radius and spacing** across all card types (see `acelo-website-designer` skill for exact tokens) so pages feel like one system even when built independently.
