"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { faq } from "@/content/home";

/** Figma node 88:2263. Headline/row typography corrected from Inter
 * (ExtraBold/SemiBold) to Cal Sans; text colors corrected from an
 * off-token #090f30 to color-ink; section background corrected from the
 * Figma layer's literal #eff6ff to color-tint-blue-100. Rows are real
 * accordions (not static, per FAQPage schema needing real Q&A content —
 * see lib/seo.ts). */
export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="flex flex-col items-center gap-14 bg-tint-blue-100 px-6 py-16 sm:px-10 lg:px-20 lg:py-24"
    >
      <h2 className="text-display-l font-normal text-ink">{faq.headline}</h2>
      <div className="flex w-full max-w-[760px] flex-col gap-3">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-lg bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="tap-target flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] font-normal text-ink"
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-text-muted transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p
                  id={`faq-answer-${index}`}
                  className="px-5 pb-5 text-[14px] leading-[1.6] text-text-muted"
                >
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
