---
name: acelo-seo-strategist
description: Plan on-page SEO, metadata, URL architecture, local SEO, and internal linking for Acelo Logistics' website, benchmarked from studying Shuttlers.co's information architecture and adapted for Abuja/Nigeria logistics search intent. Use when writing page titles/meta descriptions, planning URL slugs, structuring headings, doing keyword research, or planning internal links between Acelo's service and landing pages.
---

# Acelo SEO Strategist

An on-page SEO system for Acelo's website, generalized from studying how a mature African mobility platform structures its solution pages for search — a flat, intent-based URL structure, one clear page per audience/service, and heavy cross-linking between related offers. Re-grounded in Acelo's actual services and Abuja/Nigeria market.

## URL / information architecture

Use a flat, intent-based structure rather than deep nesting — mirrors how mobility platforms group pages by audience/solution rather than by internal department:

```
/                                → Home
/about                           → About
/solutions/rental                → Rental landing page
/solutions/church-events          → Church Event landing page
/solutions/schools                → School landing page
/solutions/travel-tour-partners  → Travel & Tour company landing page
/solutions/hotels                 → Hotels landing page
/solutions/real-estate            → Real Estate landing page
/solutions/group-travel           → Group Travel landing page
/partners/fleet                   → Vehicle/Fleet Partner page
/resources/faq
/resources/contact
```

Keep slugs short, lowercase, hyphenated, and keyword-bearing (`/solutions/church-events` beats `/solutions/church`). Every solution page should be reachable within one click from the homepage nav and from at least one other solution page's cross-sell section (see `acelo-section-layout` skill).

## Title tag formula

`[Primary Benefit/Keyword] | Acelo Logistics` — keep under ~60 characters so it doesn't truncate in search results.

Examples:

- Home: `Bus & Vehicle Hire in Abuja | Acelo Logistics`
- Rental: `Executive Car & Bus Rental in Abuja | Acelo Logistics`
- Church Event: `Church Convention & Event Transport | Acelo Logistics`
- School: `School Bus Hire & Term Contracts, Abuja | Acelo Logistics`
- Fleet Partner: `Become a Vehicle/Fleet Partner | Acelo Logistics`

## Meta description formula

`[Who it's for] + [core benefit] + [proof point or CTA], under ~155 characters.`

Example: "Reliable coaster, Hiace and Sienna hire for churches, schools and corporates across Abuja. Vetted pilots, transparent pricing. Get a free quote today."

Write a unique meta description per page — never duplicate across landing pages, since each targets a different audience and search intent.

## Heading hierarchy rules

- Exactly **one H1 per page** — it should contain the primary keyword phrase naturally (e.g., "Church Event Transportation in Abuja," not just "Welcome").
- **H2 per major section** (Solutions grid intro, Why Choose Acelo, How It Works, FAQ, etc.) — these should read naturally as section titles (see `acelo-copywriting-style` for heading formulas) while still carrying secondary keywords where natural.
- **H3 for sub-items** inside a section (individual benefit cards, individual FAQ questions).
- Never skip levels (no H1 → H3 without an H2) and never use heading tags purely for visual size — that's what CSS is for.

## Keyword map by page (primary / secondary — Abuja/Nigeria intent)

| Page          | Primary keyword theme                                     | Secondary keywords                                  |
| ------------- | --------------------------------------------------------- | --------------------------------------------------- |
| Home          | bus/vehicle hire Abuja, logistics company Abuja           | executive car hire, transport company Nigeria       |
| Rental        | car rental Abuja, coaster bus hire                        | Sienna hire, Hiace rental, daily/weekly bus rental  |
| Church Event  | church event transportation, convention bus hire          | large group transport Abuja, multi-bus coordination |
| School        | school bus hire Abuja, school transport contract          | student transportation, term bus contract           |
| Travel & Tour | tour operator transport partner, interstate bus charter   | outstation trips, tour bus hire Nigeria             |
| Hotels        | hotel airport transfer Abuja, guest shuttle service       | executive airport pickup, hotel transport partner   |
| Real Estate   | estate logistics, site inspection transport               | property launch transport, real estate shuttle      |
| Group Travel  | group travel bus hire, large group transport Abuja        | corporate retreat transport, multi-unit fleet hire  |
| Fleet Partner | become a vehicle partner Nigeria, fleet partnership Abuja | earn with your car, vehicle owner income            |

Do keyword research to validate real search volume for these themes before finalizing (tools: Google Keyword Planner, Ubersuggest, or Google's autosuggest/People Also Ask for "[service] + Abuja").

## Local SEO signals

- **NAP consistency:** Name, Address, Phone must match exactly across the website footer, Google Business Profile, and any directory listings.
- **Landmark mentions:** name real Abuja neighborhoods/landmarks in body copy where genuinely relevant (Mabushi, Garki, Apo, Maitama, Kuje, Wuse, Gwagwalada) — this is both a trust signal for readers and a long-tail local-search signal.
- **Google Business Profile:** keep categories, service area, and photos current; encourage reviews from real corporate/church/school clients.
- **LocalBusiness schema** (JSON-LD) on the homepage and contact page with `name`, `address`, `telephone`, `areaServed`, `priceRange`.
- **Service schema** on each solution page describing that specific offering.
- **FAQPage schema** on pages with an FAQ accordion — this can win rich-result FAQ snippets directly in search.

## Internal linking strategy

- Every solution page cross-links to 2-3 related solution pages (the "related solutions" section from `acelo-section-layout`) — this both helps users and distributes link equity across the site instead of concentrating it all on the homepage.
- The Fleet Partner page should be linked from every solution page's footer/cross-sell, since it's a distinct conversion goal (supply-side) from the audience-facing pages (demand-side).
- Blog/content pieces (if Acelo builds a blog, mirroring the resource hub pattern common in this space) should link back into the relevant solution page using descriptive anchor text ("school bus hire" linking to `/solutions/schools`), not generic "click here."

## Content/blog strategy (optional growth channel)

If Acelo adds a blog, prioritize topics that map directly to the keyword themes above and to genuine buyer questions: "How much does bus rental cost in Abuja," "Questions to ask before hiring a church event bus," "What to look for in a school transport partner." Each post should link to the matching solution page with a clear CTA.

## Technical/on-page checklist

- [ ] Unique title tag + meta description per page, both within length limits
- [ ] One H1 containing the page's primary keyword phrase
- [ ] Descriptive, keyword-bearing alt text on all meaningful images (not filenames like "IMG_0234")
- [ ] Clean, hyphenated, lowercase URL slugs matching the IA above
- [ ] Mobile-first, fast-loading pages (compress hero images/video; lazy-load below-the-fold media)
- [ ] LocalBusiness schema on Home/Contact; Service schema per solution page; FAQPage schema where an FAQ exists
- [ ] Every page reachable within 1-2 clicks from Home; every solution page cross-linked to 2-3 related pages
- [ ] NAP consistent across site footer, Google Business Profile, and directories
