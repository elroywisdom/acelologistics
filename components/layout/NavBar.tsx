"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, ChevronDownIcon, featureIcons } from "@/components/ui/Icons";
import { sitePages, whatsappUrl } from "@/content/site";
import { clsx } from "@/lib/clsx";

// Solution pages come from the shared registry rather than being retyped
// here, so nav, footer, cross-sell cards and the sitemap can never drift
// apart — a nav item pointing at a route that doesn't exist was a real
// bug on this site before the remaining pages were built.
const solutionPages = sitePages.filter((page) => page.group === "solutions");

// "Contact" pointed at /resources/contact while that route did not exist —
// a dead link on every page — and then at WhatsApp directly as an interim.
// The page is now built, so it points there; the page itself routes on to
// WhatsApp, the phone line or fleet partnership depending on why the
// visitor came.
// Typed rather than inferred so `external` stays available: all three
// links are internal today, and without the annotation TypeScript narrows
// the array to `{label, href}` and rejects the target/rel handling below.
const flatLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Fleet Partnership", href: "/partners/fleet" },
  // "About" removed 2026-09-07 with the /about route (now app/_about).
  { label: "Contact", href: "/resources/contact" },
];

// How long the panel stays open after the pointer leaves it. Without this
// the menu snaps shut while the user is moving diagonally from the
// "Solutions" trigger down into the panel, which makes it feel broken.
const CLOSE_DELAY_MS = 180;

/** Sticky top navigation. Figma node 60:1579 — logo mark is the real
 * exported wordmark SVG (fill="white", drawn to sit on this dark navbar).
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
 * blend reads correctly.
 *
 * SOLUTIONS MENU. This was a 320px single-column dropdown floating over
 * the hero. With seven solution pages in it, that panel ran ~780px tall,
 * covered the H1, and read as a right-click context menu rather than
 * navigation. It is now a full-bleed mega-menu attached to the header:
 *
 * - Full viewport width, anchored to the header (which is `sticky`, and
 *   therefore already a positioned ancestor, so `absolute` resolves
 *   against it). Reads as the header expanding rather than as a floating
 *   overlay.
 * - Two columns of items, which roughly halves the height and keeps the
 *   whole menu inside the first screen.
 * - An icon chip per item, so the list is scannable by shape instead of
 *   by reading seven headings.
 * - A third column carrying the "not sure which fits" CTA, reusing the
 *   pattern already on Home's fleet banner.
 *
 * Opens on hover with a close delay (see CLOSE_DELAY_MS) AND on click, so
 * it works for pointer, touch and keyboard. Icon chips are all
 * tint-blue/primary rather than the per-item pastel colours a menu like
 * this often uses: the token rules cap the supporting palette at
 * campaign/photography contexts and explicitly forbid off-token colour in
 * core UI, and that exact mistake was already made and corrected once on
 * this project (the vehicle-type pill band). */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Whether the panel currently open was opened by hover rather than by a
  // click or key press. Without this, a mouse user gets nothing: hover
  // opens the panel, then their click on the trigger toggles it straight
  // back shut, so the menu appears not to work at all.
  const openedByHover = useRef(false);
  const pathname = usePathname();

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setSolutionsOpen(false);
    }, CLOSE_DELAY_MS);
  }, [cancelClose]);

  /** Click on the trigger. If hover already opened the panel, the first
   * click commits it open instead of closing it; a second click then
   * closes it. Keyboard and touch users never set `openedByHover`, so for
   * them this stays a plain toggle. */
  const onTriggerClick = useCallback(() => {
    setSolutionsOpen((open) => {
      if (open && openedByHover.current) {
        openedByHover.current = false;
        return true;
      }
      openedByHover.current = false;
      return !open;
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus whenever the route changes. Next's client navigation
  // keeps this component mounted, so without this a menu opened before a
  // browser back/forward would stay open over the page the user landed
  // on. (Link clicks inside the menus already close them directly; this
  // covers navigation that doesn't go through those handlers.)
  //
  // Written as a render-phase adjustment rather than an effect on
  // `pathname`. React's `set-state-in-effect` lint rule rejects the
  // effect form — it schedules a second render pass and briefly paints
  // the open menu on the new route — and this is the pattern React
  // documents for deriving state from a changed prop: set during render,
  // which React restarts immediately without committing the stale UI.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setSolutionsOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => () => cancelClose(), [cancelClose]);

  // A menu that only closes via its own trigger is a trap: clicking
  // elsewhere leaves it hanging over the content, and keyboard users have
  // no way out. `focusin` handles the keyboard case — tabbing past the
  // last link closes the panel instead of leaving it open behind the
  // user's focus. All three listeners are only attached while it is open.
  useEffect(() => {
    if (!solutionsOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!solutionsRef.current?.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!solutionsRef.current?.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [solutionsOpen]);

  const solutionsActive = pathname.startsWith("/solutions");
  const isActive = (href: string) => pathname === href;

  // Shared link treatment for the top-level bar. `text-accent` marks the
  // section you are on — the nav previously gave no indication at all,
  // which on a ten-page site is a real orientation problem.
  const topLinkClasses = (active: boolean) =>
    clsx(
      "tap-target relative flex items-center gap-1 rounded-sm outline-none transition-colors",
      "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
      active ? "text-accent" : "text-white hover:text-accent",
    );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-border transition-colors",
        scrolled ? "bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80" : "bg-ink",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3.5 lg:px-[120px]">
        <Link
          href="/"
          className="flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <Image
            src="/images/logos/acelo-logistics-wordmark.svg"
            alt="Acelo Logistics"
            width={60}
            height={26}
            priority
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-[13px] md:flex">
          <div
            ref={solutionsRef}
            onMouseEnter={() => {
              cancelClose();
              setSolutionsOpen((open) => {
                if (!open) openedByHover.current = true;
                return true;
              });
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              aria-controls="solutions-menu"
              onClick={onTriggerClick}
              className={topLinkClasses(solutionsActive || solutionsOpen)}
            >
              Solutions
              <ChevronDownIcon
                className={clsx("h-4 w-4 transition-transform", solutionsOpen && "rotate-180")}
              />
            </button>

            {solutionsOpen && (
              <div
                id="solutions-menu"
                className="mega-menu-in absolute left-0 right-0 top-full z-50 border-b border-border bg-white shadow-[0px_24px_48px_-24px_rgba(15,20,32,0.35)]"
              >
                {/* Two item columns from the moment the desktop nav
                    appears (`md`), not from `lg`. A single column at
                    768-1023px ran the panel 777px tall — the same
                    over-height problem this menu was rebuilt to fix, just
                    at tablet width. The CTA card only becomes a third
                    column at `xl`; below that a fixed 300px card squeezed
                    the item columns to ~202px and made every blurb wrap,
                    so it spans the full width underneath instead. */}
                <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-6 px-6 py-8 lg:px-[120px] xl:grid-cols-[1fr_1fr_320px] xl:gap-10">
                  {/* 7 items split 4 + 3 across two columns. As one column
                      the panel ran taller than the viewport. */}
                  {[solutionPages.slice(0, 4), solutionPages.slice(4)].map((column, i) => (
                    <ul key={i} className="flex flex-col gap-1">
                      {column.map((page) => {
                        const Icon = featureIcons[page.icon];
                        const active = isActive(page.slug);
                        return (
                          <li key={page.slug}>
                            <Link
                              href={page.slug}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setSolutionsOpen(false)}
                              className={clsx(
                                "group flex items-start gap-3 rounded-md p-3 outline-none transition-colors",
                                "focus-visible:ring-2 focus-visible:ring-primary",
                                active ? "bg-tint-blue-100" : "hover:bg-surface-alt",
                              )}
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-tint-blue-100 text-primary transition-colors group-hover:bg-tint-blue-200">
                                <Icon className="h-5 w-5" aria-hidden />
                              </span>
                              <span className="flex flex-col gap-0.5">
                                <span className="text-[15px] text-ink">{page.label}</span>
                                <span className="text-[13px] leading-[1.45] text-text-muted">
                                  {page.blurb}
                                </span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}

                  {/* Same "not sure which fits?" pattern as Home's fleet
                      banner, so the menu ends in the site's one primary
                      channel rather than trailing off. */}
                  <div className="col-span-2 flex flex-col justify-between gap-4 rounded-lg bg-ink p-6 sm:flex-row sm:items-center xl:col-span-1 xl:flex-col xl:items-start">
                    <div className="flex max-w-[520px] flex-col gap-2">
                      <p className="text-heading-3 font-normal text-white">
                        Not sure which fits?
                      </p>
                      <p className="text-[13px] leading-[1.5] text-white/70">
                        Tell Acelo HQ what you are moving and when. Fleet, route
                        and pilots come back confirmed the same day.
                      </p>
                    </div>
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSolutionsOpen(false)}
                      className="tap-target inline-flex shrink-0 items-center gap-2 self-start rounded-pill bg-accent px-4 py-2.5 text-[13px] text-text outline-none transition-colors hover:bg-[#e6c100] focus-visible:ring-2 focus-visible:ring-white sm:self-center xl:self-start"
                    >
                      Message Acelo HQ
                      <ArrowRightIcon className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {flatLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={topLinkClasses(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Figma's mobile Home frame (node 116:243/131:189) shows only
              the logo + hamburger in the collapsed bar — no CTA button —
              and Home's own Hero has its own "Rent A Vehicle" button
              immediately below, in the same first screen. Hidden below
              `md` to match; still reachable from the mobile menu below.

              Visibility lives on this wrapper, not stacked onto the Button
              itself — Button's base classes already include `inline-flex`
              unconditionally, and pairing `hidden` directly with
              `inline-flex` on one element is the exact bug already hit and
              fixed in VehicleTypeBand.tsx: both are unprefixed display
              utilities of equal specificity, so which one wins depends on
              Tailwind's internal stylesheet order, not className source
              order.

              Target is the Rental page rather than Home's `#fleet` anchor:
              from any page other than Home, "/#fleet" meant navigating
              away to a different page's section, and Rental now carries
              the same fleet grid with its own booking links. */}
          <div className="hidden md:block">
            <Button variant="accent" href="/solutions/rental#fleet" className="px-4 py-2 text-[12px]">
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
          aria-label="Main"
          className="flex max-h-[calc(100vh-74px)] flex-col gap-1 overflow-y-auto border-t border-border px-6 py-4 text-[15px] text-white md:hidden"
        >
          {/* Solutions are listed flat rather than behind a second
              disclosure — a nested accordion inside an already-disclosed
              menu is two taps to reach any page, and the list is only
              seven items. Icons carry over from the desktop menu so the
              two read as the same navigation. */}
          <span className="px-2 pt-1 text-caption uppercase text-white/50">Solutions</span>
          {solutionPages.map((page) => {
            const Icon = featureIcons[page.icon];
            const active = isActive(page.slug);
            return (
              <Link
                key={page.slug}
                href={page.slug}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "tap-target flex items-center gap-3 rounded-md px-2",
                  active ? "text-accent" : "hover:bg-white/5 hover:text-accent",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {page.label}
              </Link>
            );
          })}
          <span className="px-2 pt-3 text-caption uppercase text-white/50">Company</span>
          {flatLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "tap-target flex items-center rounded-md px-2",
                isActive(link.href) ? "text-accent" : "hover:bg-white/5 hover:text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="accent"
            href="/solutions/rental#fleet"
            onClick={() => setMenuOpen(false)}
            className="mt-3 w-full justify-center px-4 py-2.5 text-[13px]"
          >
            Rent A Vehicle
          </Button>
        </nav>
      )}
    </header>
  );
}
