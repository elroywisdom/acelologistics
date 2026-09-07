import type { Metadata } from "next";

export const siteUrl = "https://acelologistics.com";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Acelo Logistics",
      locale: "en_NG",
      type: "website",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Acelo Logistics",
    description:
      "Corporate rentals, event logistics and interstate transport — vetted vehicles and professional pilots, dispatched from hubs across Nigeria.",
    url: siteUrl,
    telephone: "+2348103115430",
    email: "operation@acelologistics.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zone 5, Novare Mall, Wuse",
      addressLocality: "Abuja",
      postalCode: "904101",
      addressRegion: "Federal Capital Territory",
      addressCountry: "NG",
    },
    areaServed: "NG",
    sameAs: [
      "https://wa.me/2348103115430",
      "https://x.com/acelologistics",
      "https://www.instagram.com/acelo_logistics/",
      "https://www.tiktok.com/@acelologistics",
      "https://www.linkedin.com/company/acelo-logistics",
    ],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** `Service` schema for a solution page (kickoff doc §9: "Service schema
 * per solution page"). `provider` points back at the same LocalBusiness
 * identity used on Home so search engines resolve the two to one
 * organization rather than treating each page as a separate business. */
export function serviceJsonLd({
  name,
  serviceType,
  description,
  path,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${siteUrl}${path}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Acelo Logistics",
      url: siteUrl,
      telephone: "+2348103115430",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zone 5, Novare Mall, Wuse",
        addressLocality: "Abuja",
        postalCode: "904101",
        addressRegion: "Federal Capital Territory",
        addressCountry: "NG",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
  };
}

/** Breadcrumb trail for a nested route. Home is always the first crumb;
 * pass the intermediate levels and the page itself. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path}`,
      }),
    ),
  };
}

/** Convenience for the repeated `<script type="application/ld+json">`
 * blocks. Returns the props object rather than a component so pages keep
 * rendering the script tag inline where it is easy to see. */
export function jsonLdProps(schema: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  };
}
