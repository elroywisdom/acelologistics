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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
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
