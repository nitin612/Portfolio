"use client";

import { useEffect, useState, useRef } from "react";

/**
 * DiaBrowserAurora
 * ─────────────────
 * Recreates the exact Dia Browser footer scroll effect:
 * 1. Appears when scrolling in/near the footer.
 * 2. Expands the bottom height and reveals vibrant gradient colors while scrolling.
 * 3. Smoothly collapses height AND fades back to white 1 second after scrolling stops.
 * 4. Zero empty white space remains when scrolling is inactive.
 */
export function DiaBrowserAurora() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerEffect = () => {
      // Check if user is near bottom of page (within last 300px of scroll height)
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight - scrollPosition <= 400 || (containerRef.current && containerRef.current.getBoundingClientRect().top <= window.innerHeight + 100)) {
        setIsRevealed(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Collapse height and hide colors 1 second after scrolling stops
        timerRef.current = setTimeout(() => {
          setIsRevealed(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", triggerEffect, { passive: true });
    window.addEventListener("wheel", triggerEffect, { passive: true });
    window.addEventListener("touchmove", triggerEffect, { passive: true });

    return () => {
      window.removeEventListener("scroll", triggerEffect);
      window.removeEventListener("wheel", triggerEffect);
      window.removeEventListener("touchmove", triggerEffect);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        height: isRevealed ? "clamp(300px, 42vw, 540px)" : "0px",
        opacity: isRevealed ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isRevealed
            ? "translate-y-0 scale-100"
            : "translate-y-6 scale-95"
        }`}
        style={{
          willChange: "transform, opacity",
        }}
      >
        {/* ── Base Gradient: Blue -> Gold -> Orange -> Pink ── */}
        <div
          className="absolute inset-0 aurora-dia-anim"
          style={{
            background: `linear-gradient(
              to top,
              #2A5CA5 0%,
              #4482C2 12%,
              #6EB2DD 22%,
              #F2C215 38%,
              #FF8500 52%,
              #FF3E00 62%,
              #FF0D70 75%,
              #FF0066 88%,
              transparent 100%
            )`,
          }}
        />

        {/* ── Hot-pink radial horizon peaks ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 42% 85% at  4%  -8%, #FF0066 0%, transparent 58%),
              radial-gradient(ellipse 32% 65% at 22%  -3%, #FF2B77 0%, transparent 52%),
              radial-gradient(ellipse 38% 80% at 40% -10%, #FF0066 0%, transparent 58%),
              radial-gradient(ellipse 30% 62% at 58%  -4%, #FF2B77 0%, transparent 52%),
              radial-gradient(ellipse 40% 82% at 77%  -8%, #FF0066 0%, transparent 58%),
              radial-gradient(ellipse 34% 68% at 96%  -5%, #FF2B77 0%, transparent 54%)
            `,
          }}
        />

        {/* ── Vivid Orange Fill ── */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.9,
            background: `
              radial-gradient(ellipse 110% 56% at 50% 52%, #FF7700 0%, transparent 62%),
              radial-gradient(ellipse  80% 46% at 18% 58%, #FF8E00 0%, transparent 55%),
              radial-gradient(ellipse  80% 46% at 82% 58%, #FF8E00 0%, transparent 55%)
            `,
          }}
        />

        {/* ── Golden Yellow Mid-Band ── */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.85,
            background: `
              radial-gradient(ellipse 135% 40% at 50% 70%, #F5C215 0%, transparent 58%),
              radial-gradient(ellipse  90% 34% at 12% 74%, #F8CC25 0%, transparent 54%),
              radial-gradient(ellipse  90% 34% at 88% 74%, #F8CC25 0%, transparent 54%)
            `,
          }}
        />

        {/* ── Steel Blue Base ── */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.92,
            background: `
              radial-gradient(ellipse 160% 46% at 50% 114%, #386CB2 0%, transparent 52%),
              radial-gradient(ellipse 100% 36% at 18% 110%, #2A5CA5 0%, transparent 48%),
              radial-gradient(ellipse 100% 36% at 82% 110%, #2A5CA5 0%, transparent 48%)
            `,
          }}
        />

        {/* ── White Top Fade (Soft edge into footer) ── */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: "32%",
            background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
