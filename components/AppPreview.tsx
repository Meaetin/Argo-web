"use client";

import { useCallback, useEffect, useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { ScrollReveal } from "./ScrollReveal";
import { useTheme } from "./ThemeProvider";

const screenshots = [
  {
    label: "Content Detail — Dive deep into any saved location",
    caption: "Content Detail",
    src: "/screenshot-content-detail.png",
  },
  {
    label: "Collections — Organize locations by theme or destination",
    caption: "Collections",
    src: "/screenshot-collection.png",
  },
  {
    label: "Itinerary — Day-by-day plan with map and route optimization",
    caption: "Itinerary",
    src: "/screenshot-itinerary.png",
  },
];

function getSlideOffset(index: number, current: number, total: number) {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function getSlideStyles(offset: number): React.CSSProperties {
  if (offset === 0) {
    return {
      transform: "translateX(0) scale(1) rotateY(0deg)",
      zIndex: 30,
      opacity: 1,
      position: "relative",
      filter: "none",
    };
  }
  const direction = offset > 0 ? 1 : -1;
  const absOffset = Math.abs(offset);
  if (absOffset === 1) {
    return {
      transform: `translateX(${direction * 58}%) scale(0.82) rotateY(${-direction * 5}deg)`,
      zIndex: 20,
      opacity: 0.7,
      position: "absolute",
      inset: 0,
      filter: "blur(1px)",
    };
  }
  return {
    transform: `translateX(${direction * 70}%) scale(0.7) rotateY(${-direction * 8}deg)`,
    zIndex: 10,
    opacity: 0,
    position: "absolute",
    inset: 0,
    pointerEvents: "none" as const,
  };
}

export function AppPreview() {
  const [current, setCurrent] = useState(0);
  const { resolvedTheme } = useTheme();

  const total = screenshots.length;
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % total),
    [total]
  );

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="app-preview-section bg-[var(--background)] py-32 lg:py-48 overflow-hidden">
      <div className="app-preview-inner max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="app-preview-header flex flex-col items-center text-center gap-4 mb-16">
            <p className="app-preview-label text-xs font-extralight tracking-[0.3em] uppercase text-[var(--brand)]">
              App Preview
            </p>
            <h2 className="app-preview-title text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] max-w-xl">
              See it in action
            </h2>
            <p className="app-preview-subtitle text-base text-[var(--foreground-subtle)] max-w-lg leading-relaxed font-light whitespace-nowrap">
              A clean, focused interface designed to get out of your way and let you plan.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="app-preview-carousel relative">
            {/* 3D Carousel */}
            <div
              className="carousel-viewport select-none max-w-5xl mx-auto relative"
              style={{ perspective: "1200px" }}
            >
              {/* Click zones */}
              <div className="carousel-click-zones absolute inset-y-0 -left-[50%] -right-[50%] z-40 flex">
                <button
                  className="carousel-click-left flex-1 cursor-pointer"
                  onClick={prev}
                  aria-label="Previous slide"
                />
                <button
                  className="carousel-click-right flex-1 cursor-pointer"
                  onClick={next}
                  aria-label="Next slide"
                />
              </div>

              <div className="carousel-stage relative">
                {screenshots.map((shot, index) => {
                  const offset = getSlideOffset(index, current, total);
                  const styles = getSlideStyles(offset);

                  return (
                    <div
                      key={shot.src}
                      className={`carousel-slide transition-all duration-500 ease-out ${offset === 0 ? "relative" : "absolute inset-0"}`}
                      style={{
                        ...styles,
                        transformOrigin: "center center",
                      }}
                    >
                      <div className="carousel-slide-frame rounded-3xl border border-[var(--border)] overflow-hidden"
                        style={{ boxShadow: "0 8px 40px var(--carousel-shadow)" }}
                      >
                        <ImagePlaceholder
                          label={shot.label}
                          aspectRatio="16/10"
                          src={shot.src}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Per-slide ground shadows */}
              <div className="carousel-shadows relative h-8">
                {screenshots.map((shot, index) => {
                  const offset = getSlideOffset(index, current, total);
                  if (Math.abs(offset) > 1) return null;

                  const direction = offset > 0 ? 1 : offset < 0 ? -1 : 0;
                  const translatePct = direction === 0 ? 0 : direction * 58;
                  const shadowWidth = offset === 0 ? "45%" : "35%";
                  const shadowOpacity = offset === 0 ? 0.3 : 0.15;

                  return (
                    <div
                      key={`shadow-${shot.src}`}
                      className="carousel-shadow absolute top-0 left-1/2 transition-all duration-500 ease-out"
                      style={{
                        width: shadowWidth,
                        height: "24px",
                        transform: `translateX(calc(-50% + ${translatePct}%)) scale(${offset === 0 ? 1 : 0.82})`,
                        background: `radial-gradient(ellipse at center, rgba(${resolvedTheme === "dark" ? "0,0,0" : "45,42,38"},${shadowOpacity}) 0%, transparent 70%)`,
                        filter: "blur(6px)",
                      }}
                      aria-hidden="true"
                    />
                  );
                })}
              </div>
            </div>

            {/* Caption + dots */}
            <div className="carousel-footer flex flex-col items-center gap-3 mt-4">
              <p className="carousel-caption text-sm font-light text-[var(--foreground)] tracking-wide whitespace-nowrap">
                {screenshots[current].caption}
              </p>
              <div className="carousel-dots flex items-center gap-2">
                {screenshots.map((shot, i) => (
                  <button
                    key={shot.src}
                    onClick={() => setCurrent(i)}
                    className={`carousel-dot size-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === current
                        ? "bg-[var(--brand)] w-6"
                        : "bg-[var(--foreground-subtle)]/40"
                    }`}
                    aria-label={`Go to ${shot.caption}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
