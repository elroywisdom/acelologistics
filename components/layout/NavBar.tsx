"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

const navLinks = [
  // Was "/#solutions" — that anchor never existed anywhere in the
  // codebase (confirmed via grep), so this link was dead on every page.
  // Per the original acelo-section-layout skill, Home's own fleet/
  // solutions grid *is* the site's "services" section (there's no
  // separate standalone Services page in the original IA) — so this now
  // points at the real, existing `id="fleet"` section on Home, same
  // target every other "view what we offer" CTA on the site already
  // uses (2026-08-19, El-Roy's call — a standalone /services page was
  // proposed and then retracted in favor of this).
  { label: "Services", href: "/#fleet" },
  // Was two separate items — "Fleet" and "Partnership" — both pointing
  // at the identical /partners/fleet URL (a real page in the SEO skill's
  // planned IA, not yet built). Merged into one clearly-labeled item
  // instead of two differently-worded links landing on the same place
  // (2026-08-19 nav/footer IA audit).
  { label: "Fleet Partnership", href: "/partners/fleet" },
  { label: "Contact", href: "/resources/contact" },
];

/** Sticky top navigation. Figma node 60:1579 — logo mark is the real
 * exported wordmark SVG (fill="white", drawn to sit on this dark navbar).
 * Nav links + CTA are on-token. The Figma frame only specifies the desktop
 * state, so the mobile menu disclosure below is this build's own addition
 * — without it, nav links would be completely unreachable below md.
 *
 * Figma's own fill on this node is solid `#0f1420` (= `color-ink`); the
 * component's Figma annotation separately calls for "translucent blur
 * background in code" once it's sticky on scroll. Both only line up if
 * the translucent/blur treatment is scroll-triggered rather than
 * permanent: at rest, `position: sticky` hasn't overlapped anything yet
 * (nothing is scrolled up behind it), so a permanently-translucent navbar
 * blends `ink` against the plain white page background instead of any
 * real content — composites to a washed-out `rgb(63,67,77)`, nowhere near
 * `#0f1420`. Once scrolled, Hero's blue slides up behind it and the same
 * blend reads correctly. Tracking `scrolled` and switching between solid
 * `bg-ink` (matches Figma exactly at rest) and the translucent/blur
 * variant (matches the annotation once there's something to blur) fixes
 * that without giving up the frosted-glass effect once it's warranted. */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-border transition-colors",
        scrolled ? "bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80" : "bg-ink",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3.5 lg:px-[120px]">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logos/acelo-logistics-wordmark.svg"
            alt="Acelo Logistics"
            width={60}
            height={26}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-5 text-[13px] text-white md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="tap-target flex items-center hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* Figma's mobile Home frame (node 116:243/131:189) shows only
              the logo + hamburger in the collapsed bar — no CTA button —
              and Home's own Hero has its own "Rent A Vehicle" button
              immediately below, in the same first screen. Hidden below
              `md` to match; still reachable from the mobile menu below so
              it's not lost on pages that don't repeat the CTA as high up
              as Home does.

              Visibility lives on this wrapper, not stacked onto the Button
              itself — Button's own base classes already include
              `inline-flex` unconditionally, and pairing `hidden` directly
              with `inline-flex` on one element is the exact bug already
              hit and fixed in VehicleTypeBand.tsx: both are unprefixed
              display utilities of equal specificity, so which one wins
              depends on Tailwind's internal stylesheet order, not
              className source order — `hidden` silently lost there too. */}
          <div className="hidden md:block">
            <Button variant="accent" href="/#fleet" className="px-4 py-2 text-[12px]">
              Rent A Vehicle
            </Button>
          </div>
          <button
            type="button"
            className="tap-target flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-white ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          className="flex flex-col gap-1 border-t border-border px-6 py-4 text-[15px] text-white md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="tap-target flex items-center rounded-md px-2 hover:bg-white/5 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="accent"
            href="/#fleet"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full justify-center px-4 py-2.5 text-[13px]"
          >
            Rent A Vehicle
          </Button>
        </nav>
      )}
    </header>
  );
}
