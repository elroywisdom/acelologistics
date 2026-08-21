"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

const HERO_SLIDES = [
  {
    name: "Toyota Hilux",
    subtitle: "5 Seater Rugged Utility",
    src: "/images/fleet/toyota-hilux.png",
    alt: "Toyota Hilux New Shape",
    width: 632,
    height: 400,
    fit: "object-contain" as const,
  },
  {
    name: "Coaster Bus",
    subtitle: "27 Seater Executive Shuttle",
    src: "/images/fleet/standard-coaster-bus.png",
    alt: "Standard Coaster Bus",
    width: 512,
    height: 340,
    fit: "object-contain" as const,
  },
  {
    name: "Prado SUV",
    subtitle: "4 Seater Executive SUV",
    src: "/images/fleet/toyota-prado-white.png",
    alt: "Toyota Prado SUV",
    width: 576,
    height: 344,
    fit: "object-contain" as const,
  },
  {
    name: "Toyota Hiace",
    subtitle: "16 Seater Group Transit",
    src: "/images/fleet/toyota-hiace-bus.png",
    alt: "Toyota Hiace Bus",
    width: 2820,
    height: 1587,
    fit: "object-contain" as const,
  },
  {
    name: "Sienna Mini Van",
    subtitle: "6 Seater Comfort Shuttle",
    src: "/images/fleet/toyota-sienna-mini-van.png",
    alt: "Toyota Sienna Mini Van",
    width: 628,
    height: 440,
    fit: "object-contain" as const,
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  function handlePrev() {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      className="relative mt-2 h-[200px] w-full shrink-0 overflow-hidden rounded-[14px] border border-white/20 bg-white/10 shadow-lg lg:hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Slide Image */}
      <div className="relative h-full w-full p-4">
        <Image
          key={currentSlide.src}
          src={currentSlide.src}
          alt={currentSlide.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className={`p-2 transition-all duration-300 ${currentSlide.fit}`}
        />
      </div>

      {/* Slide Info Badge */}
      <div className="absolute top-3 left-3 flex flex-col gap-0.5 rounded-lg bg-ink/75 px-3 py-1.5 backdrop-blur-md">
        <span className="text-[12px] font-semibold text-white">
          {currentSlide.name}
        </span>
        <span className="text-[10px] text-white/80">
          {currentSlide.subtitle}
        </span>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 backdrop-blur-md">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`!h-1.5 !min-h-0 transition-all ${
              idx === currentIndex
                ? "!w-4 rounded-full bg-accent"
                : "!w-1.5 rounded-full bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous vehicle"
        className="tap-target absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white shadow-md transition-all hover:bg-ink hover:scale-105 active:scale-95 backdrop-blur-md"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next vehicle"
        className="tap-target absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white shadow-md transition-all hover:bg-ink hover:scale-105 active:scale-95 backdrop-blur-md"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
