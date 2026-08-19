# Acelo Logistics Website — Claude Code Project Kickoff

Paste this as the first message in a fresh Claude Code session, in a new empty project folder. It's self-contained: everything settled about Acelo's brand, design system, and site structure across prior design work is captured here, so this is a fresh **codebase**, not a fresh set of decisions.

---

## 0. Do this before writing any code

This project failed once already in a different coding agent because that agent had no real connection to the Figma file — it only saw a flat link preview, so it embedded screenshots as images and guessed at fonts. **Do not repeat that.** Before building anything:

1. Confirm Figma MCP access is connected in this Claude Code session (check `claude mcp list`, or add it if missing — Figma's Dev Mode MCP server, or the community Figma MCP server, whichever this environment has available). If it's not connected, stop and get it connected first — don't proceed by working from a screenshot.
2. Once connected, verify you can call a design-context/metadata tool against the Figma file below and get back real node data (exact hex colors, font names/sizes, x/y/width/height) — not just a picture.
3. **Hard rule for the whole project:** every section is built as real markup (JSX + Tailwind), using real font loading and real design tokens. The only images used are actual photography/logos exported from Figma (see §7) — never a flattened screenshot standing in for a layout, headline, or card.

**Figma file:** `https://www.figma.com/design/IXHZLViiIEGL3mQAux6pyR/Acelo` (file key `IXHZLViiIEGL3mQAux6pyR`). The corrected, current Home page is node `70:148` ("acelo-home", Website Design page).

---

## 1. Project overview

**Acelo Logistics** — premium tech-enabled mobility/logistics company, Abuja, Nigeria. Tagline: "Accelerating Africa's Logistics. Seamless. Swift. Sure." Real booking flow is WhatsApp/phone-based, not self-serve checkout.

**Priority pages, in build order:** Home → About → Vehicle/Fleet Partner → Rental → Church Event → School → Travel & Tour → Hotels → Real Estate → Group Travel.

**Workflow:** Home's Figma frame is finished and corrected (see §8) — build it first, verified section-by-section against Figma. Every later page follows the same discipline: pull real data from Figma before writing a section, don't approximate from a picture.

---

## 2. Tech stack

- **Next.js**, latest stable, App Router, TypeScript.
- **Tailwind CSS**, latest, configured with the tokens in §3 as theme values — not Tailwind's defaults.
- **next/font/local** for Cal Sans (see §4 — font files must be sourced before typography will look right).
- **next/image** for all imagery, no raw `<img>`.
- ESLint + Prettier, Next defaults.
- Deploy target: Vercel, unless told otherwise.

```bash
npx create-next-app@latest acelo-website --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*"
```

---

## 3. Design tokens (final — pulled from Figma, corrected)

### Colors

| Token | Hex | Usage |
|---|---|---|
| `color-primary` | `#1a56db` | Buttons, links, active states — AND legitimate as a full-bleed section background for 1-2 bold sections per page (not just small accents) |
| `color-primary-hover` | `#1544b0` | Hover/pressed |
| `color-accent` | `#ffd600` | Restrained: a stat number, a small badge, or a rounded highlight chip behind a single headline word — never a large fill, never full-headline recolor |
| `color-tint-blue-100` | `#eaf0fe` | Decorative illustration/blob backgrounds only — never behind body text |
| `color-tint-blue-200` | `#d3e1fd` | Category eyebrow pill fills, light card backgrounds |
| `color-ink` | `#0f1420` | Dark section backgrounds |
| `color-ink-deep` | `#080b12` | Footer, deepest dark background |
| `color-text` | `#1a202c` | Default body text |
| `color-text-muted` | `#718096` | Subheadlines, captions, secondary text |
| `color-surface-alt` | `#f7f9fc` | Alternating light-gray section background |
| `color-border` | `#dde3ec` | Card borders, dividers |
| `color-success` / `color-warning` / `color-error` | `#16a34a` / `#f97316` / `#dc2626` | Form states only |
| `color-whatsapp` | `#25d366` | WhatsApp-channel CTAs exclusively |

**Color usage rules:**
1. `color-primary` must appear on every page. Full-bleed primary sections are capped at 1-2 per page, never stacked back-to-back with another colored/dark section.
2. `color-accent` yellow: 1-2 moments per page, dark text on yellow always, never white-on-yellow.
3. Dark sections use `color-ink`/`color-ink-deep`, never a tinted blue.
4. Pastel tints are decorative/badge fills only, never a body-copy surface.
5. A supporting palette (coral `#e8543d`, violet `#6c4fd9`, green `#1fae6b`, sand `#e4c99a`) exists for campaign/photography contexts only — never core UI. If a Figma layer uses a color outside this whole token set, treat it as a bug to flag, not a value to copy — this exact mistake happened once already (an earlier draft used off-token teal/orange/magenta pills before being corrected to the token palette).

### Typography

**Cal Sans**, single weight, headings and body — hierarchy from size/spacing/color, not font-weight variety. **Exception:** pill/badge labels in the vehicle-type band use "Geist Bold" specifically — a deliberate one-off, keep it there only.

| Style | Size/Line-height | Letter-spacing | Use |
|---|---|---|---|
| Display 2XL | 52px/1.05 | -1.5 | Hero headline |
| Display L | 36px/1.15 | 0 | Large section headline |
| Heading 1 | 30px/1.2 | 0 | Section headline |
| Heading 2 | 24px/1.25 | 0 | Subsection headline |
| Heading 3 | 20px/1.3 | 0 | Card title |
| Body Large | 18px/1.6 | 0 | Intro/subheadline |
| Body Base | 16px/1.6 | 0 | Default copy |
| Caption | 12px/1.4 | 0.08em | Eyebrow labels, small UI text |

### Spacing / Radius / Layout

- Spacing: 4px base — Tailwind's default numeric scale already matches, use it directly, no arbitrary values.
- Radius: `r-sm` 6px (inputs, tags, highlight chip) · `r-md` 10px (standard cards) · `r-lg` 16px (feature/vehicle cards) · `r-pill` 999px (buttons, pills).
- Canvas reference: **1400px** desktop, content in a **1200px max-width container** (100px side padding at full width).

---

## 4. Font setup

Cal Sans isn't a Google Font — self-host it. Get the `.woff2` files, place in `public/fonts/` (or `app/fonts/`), load via `next/font/local`, expose as a CSS variable, wire into Tailwind's `fontFamily`. **Verify by looking at a rendered page in the browser, not just the code** — a missing font file silently falls back to a system font and everything will look "off" even though the code looks correct. This exact failure happened on the first build attempt.

---

## 5. Copywriting rules (apply to every page's copy, new or ported)

- **Rule Zero — concrete beats vague.** Every hero headline names an actual product/action + a payoff. Never ship an abstract brand-statement headline like "Africa's logistics, accelerated." as a page hero (fine only as a supporting line on a brand-level About page).
- **Default headline pattern:** `[Get/Rent/Book] a [named product/service] for [specific occasion] with Acelo.` — e.g. "Rent a Vehicle for Any Occasion with Acelo."
- **Inline stat highlighting:** drop a specific number into a body sentence as a highlighted phrase rather than always pulling it into a separate stat card.
- **Category eyebrow pill:** small pill label above a section headline, naming the category in 1-3 words.
- **CTA rule:** primary CTA is always WhatsApp/phone-channel ("Message Acelo HQ on WhatsApp"), never "Book Now"/"Proceed" as if a self-serve checkout exists.
- **Never lift wording from the competitive benchmark site (Shuttlers.co).** Structural/layout patterns can be benchmarked; headline and CTA copy must be original Acelo wording. This was caught and fixed once already in the Home page — check any new page's copy against this before shipping.

---

## 6. Section-layout patterns

**Homepage pattern** (`/` only): Nav → Hero → Solutions/offering grid (all services at once) → Value-prop band → Stats/trust proof → Testimonials → Trust/Safety dark block → Final CTA → Footer.

**Solution/service sub-page skeleton** (every other priority page): Nav → Hero → Offering grid → Value-prop band → Process ("How it works") → Stats or audience-fit grid → Testimonials → Trust/Safety block → FAQ → Cross-sell (2-3 related pages) → Final CTA → Footer.

Exactly one primary CTA per page, repeated at hero + final band. Alternate light/white and dark/colored sections — never stack two colored/dark sections back to back.

---

## 7. Image & asset handling

- Every image used in a Figma frame is a **real, cleared asset** (real fleet photography, real partner logos, real client testimonial photos) — not stock placeholders. Export originals directly from Figma (select the layer → Export → PNG/JPG at 2x for photos), never hotlink Figma's temporary CDN URLs, never approximate an image by screenshotting a composed section.
- Store under `public/images/<category>/<descriptive-name>.<ext>` (e.g. `public/images/hero/acelo-logistics-vetted-buses-and-cars.jpg`, `public/images/testimonials/michella-ezima.jpg`, `public/images/logos/frontline-homes.png`).
- Every image needs real, specific `alt` text (name + context, e.g. "Michella Ezima, Senior Brand Manager at TM Global") — not the raw export filename, not empty.
- Render everything through `next/image` with explicit dimensions or a sized container — no layout shift.

---

## 8. Home page — current state (build this first)

Home is fully designed and corrected in Figma (node `70:148`). A complete section-by-section developer handoff spec already exists for it — exact geometry, tokens, content, and component mapping pulled from the live file, including the two corrections made after review: the vehicle-type pill band now uses only token colors (was off-brand teal/orange/magenta/black), and its headline/CTA-banner copy was rewritten to original Acelo wording (was too close to the benchmark site's phrasing). The hero image is a single flattened photo collage (not multiple layered images), and the testimonial section uses a named, real photo (Michella Ezima, TM Global).

Pull `get_design_context` on node `70:148` fresh at the start of this session (don't rely on any cached description) and build section-by-section: Nav → Hero → Trust logo strip → Vehicle-type pill band → Fleet grid + CTA banner → Why Acelo → Testimonial → FAQ → Final CTA → Footer. Screenshot each section against Figma as you go before moving to the next.

---

## 9. SEO conventions

- `generateMetadata` per route, unique title/description, no leaked defaults.
- Title: `[Primary Benefit/Keyword] | Acelo Logistics`, <60 chars. Description: who it's for + benefit + proof/CTA, <155 chars.
- One `<h1>` per page, primary keyword phrase, no skipped heading levels.
- URL structure: `/`, `/about`, `/partners/fleet`, `/solutions/rental`, `/solutions/church-events`, `/solutions/schools`, `/solutions/travel-tour-partners`, `/solutions/hotels`, `/solutions/real-estate`, `/solutions/group-travel`, `/resources/faq`, `/resources/contact`.
- `LocalBusiness` JSON-LD on Home/Contact, `Service` schema per solution page, `FAQPage` schema wherever an FAQ exists.
- Cross-link every solution page to 2-3 related pages; link Fleet Partner from every solution page's footer/cross-sell.

---

## 10. Accessibility baseline

- Contrast-check every color pairing before shipping — `color-accent` needs particular care (pair with dark text, never white).
- 44×44px minimum touch targets on mobile.
- All multi-column layouts degrade to a single column on mobile — build mobile-first.
- Never convey state by color alone — pair with icon or text label.
- Real, specific alt text on every image (see §7).

---

## 11. Folder structure

```
app/
  layout.tsx
  page.tsx                    — Home
  about/page.tsx
  partners/fleet/page.tsx
  solutions/{rental,church-events,schools,travel-tour-partners,hotels,real-estate,group-travel}/page.tsx
  resources/{faq,contact}/page.tsx
  sitemap.ts
  robots.ts

components/
  ui/          — Button, CategoryEyebrowPill, InlineHighlightChip, VehicleTypePill
  layout/      — NavBar, Footer, Container, TrustLogoStrip
  cards/       — SolutionCard, VehicleCard, TestimonialCard, StatCard
  sections/    — Hero, OfferingGrid, ValuePropBand, ProcessSteps, StatsBar,
                 TestimonialCarousel, TrustSafetyBlock, FAQAccordion, CrossSell, FinalCTA

content/
  home.ts, about.ts, rental.ts, ...   — typed per-page copy/data

lib/
  seo.ts       — metadata + JSON-LD helpers
  constants.ts

public/
  fonts/
  images/{hero,fleet,testimonials,logos}/
```

---

## 12. First task

1. Scaffold the project (§2), confirm Figma MCP access works (§0).
2. Set up tokens (§3) in `tailwind.config.ts`/`globals.css`, confirm Cal Sans renders (§4).
3. Build the shared primitives and layout shell (§11) before touching any page content.
4. Build Home (§8) section-by-section, verified against Figma at each step.
5. Report back before moving to About — confirm the pattern is working before repeating it across the other 8 pages.
