// Shared shapes for the per-page content files. Every page built after
// Home (About, Fleet Partner, and the seven /solutions/* pages) is
// prop-driven off these types, so a page file is layout only and all copy
// lives in one reviewable `content/<page>.ts`.
//
// Home predates this and keeps its own bespoke shapes in `content/home.ts`
// — it was built section-by-section against Figma node 70:148 and its
// sections carry Figma-specific fields (pill rotations, image dimensions)
// that no other page has. Don't retrofit it onto these types.

import type { FeatureIconKey } from "@/components/ui/Icons";

export type CtaLink = {
  label: string;
  href: string;
};

/** Hero headlines are split into parts so a single phrase can be pulled
 * out in `color-accent`, the same device Home's hero uses (`heroContent`
 * in content/home.ts). Exactly one highlighted part per headline. */
export type HeadlinePart = {
  text: string;
  highlight?: boolean;
};

export type HeroImage = {
  src: string;
  width: number;
  height: number;
  /** Real, specific alt text — name the vehicle and what it is doing here
   * (kickoff doc §7), never the export filename. */
  alt: string;
};

export type PageHeroContent = {
  eyebrow: string;
  headline: HeadlinePart[];
  subhead: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  /** 2-3 short proof chips under the CTA row. Keep each under about six
   * words — these sit on one line beside the hero image, and the longer
   * form of the same point belongs in the value-prop band. */
  highlights: string[];
  /** The vehicle that represents what this page sells. Always a real,
   * cleared Acelo asset from `public/images/` (kickoff doc §7) — every
   * fleet photo is a transparent cutout, so it sits directly on the
   * primary hero fill the same way Home's collage does. */
  image: HeroImage;
};

export type ValueProp = {
  icon: FeatureIconKey;
  title: string;
  description: string;
};

export type ValuePropBandContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  props: ValueProp[];
};

export type SolutionCardContent = {
  icon: FeatureIconKey;
  title: string;
  description: string;
  href?: string;
  /** One card per grid is rendered as the solid brand-color "featured"
   * variant — rotate which one per page based on what that page sells. */
  featured?: boolean;
};

export type OfferingGridContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  cards: SolutionCardContent[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ProcessContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  steps: ProcessStep[];
};

export type Stat = {
  value: string;
  label: string;
};

export type TrustStatsContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  stats: Stat[];
};

export type FaqContent = {
  headline: string;
  items: { question: string; answer: string }[];
};

export type FinalCtaContent = {
  headline: string;
  subhead: string;
  cta: CtaLink;
};

/** JSON-LD `Service` input for a solution page (kickoff doc §9). */
export type ServiceSchema = {
  name: string;
  serviceType: string;
  description: string;
};

export type SolutionPageContent = {
  meta: { title: string; description: string; path: string };
  service: ServiceSchema;
  hero: PageHeroContent;
  /** Optional: the Rental page shows the real `FleetGrid` (actual vehicles,
   * real photos, real prices) in this slot instead of an abstract card
   * grid, so it has no `offering` block. */
  offering?: OfferingGridContent;
  valueProps: ValuePropBandContent;
  process: ProcessContent;
  trustStats: TrustStatsContent;
  faq: FaqContent;
  /** Slugs from `sitePages` in content/site.ts — 2-3 related pages, per
   * the internal-linking rule in the SEO doc. */
  crossSell: { headline: string; subhead: string; pages: string[] };
  finalCta: FinalCtaContent;
};
