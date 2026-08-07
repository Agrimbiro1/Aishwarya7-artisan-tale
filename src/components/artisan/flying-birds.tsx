import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface FlyingBirdsProps {
  density?: "low" | "medium" | "high";
  opacity?: number;
  className?: string;
}

interface BirdActiveState {
  id: number;
  variant: 0 | 1 | 2;
  scale: number;
  opacity: number;
  duration: number;
  topPercent: number;
  direction: "left-to-right" | "right-to-left";
  controlY: number; // Curve height offset
  delayMs: number;
}

// Thin ink-line SVG silhouettes matching the handcrafted wedding illustration
// Variant 0: Classic gull M-wing up -> W-wing down
// Variant 1: Narrow swift wing
// Variant 2: Wide soaring wing
const BIRD_VARIANTS = [
  {
    // Variant 0: Swallow / Gull
    up: "M 1 12 C 10 -4, 20 -6, 30 2 C 40 -6, 50 -4, 59 12 C 48 3, 39 4, 30 8 C 21 4, 12 3, 1 12 Z",
    down: "M 1 2 C 10 8, 20 10, 30 4 C 40 10, 50 8, 59 2 C 48 4, 39 4, 30 3 C 21 4, 12 4, 1 2 Z",
    viewBox: "0 0 60 16",
    width: 32,
    height: 12,
  },
  {
    // Variant 1: Swift
    up: "M 1 10 C 8 -5, 16 -7, 24 1 C 32 -7, 40 -5, 47 10 C 38 2, 31 3, 24 6 C 17 3, 10 2, 1 10 Z",
    down: "M 1 1 C 8 6, 16 8, 24 3 C 32 8, 40 6, 47 1 C 38 3, 31 3, 24 2 C 17 3, 10 3, 1 1 Z",
    viewBox: "0 0 48 14",
    width: 26,
    height: 10,
  },
  {
    // Variant 2: Soaring Dove
    up: "M 1 14 C 12 -6, 24 -8, 36 2 C 48 -8, 60 -6, 71 14 C 58 4, 46 5, 36 10 C 26 5, 14 4, 1 14 Z",
    down: "M 1 3 C 12 10, 24 12, 36 5 C 48 12, 60 10, 71 3 C 58 5, 46 5, 36 4 C 26 5, 14 5, 1 3 Z",
    viewBox: "0 0 72 18",
    width: 38,
    height: 14,
  },
];

export function FlyingBirds({ density = "medium", className = "" }: FlyingBirdsProps) {
  const reduced = useReducedMotion();
  const [birds, setBirds] = useState<BirdActiveState[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const isMobile = window.innerWidth <= 480;
    const baseCount = density === "low" ? 1 : density === "high" ? 4 : 2;
    const initialFlockCount = isMobile ? 1 : baseCount;

    // Initial flourish: 2-3 birds within the first 4 seconds
    const initialBirds: BirdActiveState[] = Array.from({ length: initialFlockCount }).map((_, i) => ({
      id: ++idCounter.current,
      variant: (i % 3) as 0 | 1 | 2,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.5 + Math.random() * 0.35,
      duration: 7 + Math.random() * 6,
      topPercent: 18 + Math.random() * 32,
      direction: Math.random() > 0.4 ? "left-to-right" : "right-to-left",
      controlY: (Math.random() - 0.5) * 60,
      delayMs: i * 1400 + Math.random() * 800,
    }));

    setBirds(initialBirds);

    // Ambient loop: spawn 1 bird every 9-16 seconds
    const interval = window.setInterval(() => {
      setBirds((prev) => {
        // Keep max 2 active birds on desktop, 1 on mobile
        if (prev.length >= (isMobile ? 1 : 2)) return prev;

        const newBird: BirdActiveState = {
          id: ++idCounter.current,
          variant: Math.floor(Math.random() * 3) as 0 | 1 | 2,
          scale: 0.45 + Math.random() * 0.55,
          opacity: 0.45 + Math.random() * 0.4,
          duration: 8 + Math.random() * 7,
          topPercent: 15 + Math.random() * 35,
          direction: Math.random() > 0.5 ? "left-to-right" : "right-to-left",
          controlY: (Math.random() - 0.5) * 70,
          delayMs: 0,
        };

        return [...prev, newBird];
      });
    }, 11000);

    return () => window.clearInterval(interval);
  }, [density, reduced]);

  const handleAnimationEnd = (id: number) => {
    setBirds((prev) => prev.filter((b) => b.id !== id));
  };

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 4 }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes birdFlap {
          0%, 48% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes birdFlapDown {
          0%, 48% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
        @keyframes birdWobble {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {birds.map((bird) => {
        const variant = BIRD_VARIANTS[bird.variant] || BIRD_VARIANTS[0]!;
        const { width, height, viewBox, up, down } = variant;
        const isLtr = bird.direction === "left-to-right";

        return (
          <div
            key={bird.id}
            onAnimationEnd={() => handleAnimationEnd(bird.id)}
            className="absolute left-0 top-0 origin-center"
            style={{
              top: `${bird.topPercent}%`,
              opacity: bird.opacity,
              transform: `scale(${bird.scale}) ${isLtr ? "" : "scaleX(-1)"}`,
              animationName: isLtr ? "flyLeftToRight" : "flyRightToLeft",
              animationDuration: `${bird.duration}s`,
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              animationDelay: `${bird.delayMs}ms`,
              animationFillMode: "both",
              ["--curve-y" as string]: `${bird.controlY}px`,
            }}
          >
            {/* Vertical Sine-wave wobble for natural flight sway */}
            <div
              style={{
                animation: "birdWobble 1.8s ease-in-out infinite",
              }}
            >
              <svg
                width={width}
                height={height}
                viewBox={viewBox}
                className="relative overflow-visible"
              >
                {/* Wings Up Frame */}
                <path
                  d={up}
                  fill="oklch(0.38 0.05 55)"
                  stroke="oklch(0.32 0.05 55)"
                  strokeWidth="0.8"
                  style={{
                    animation: "birdFlap 0.14s steps(1) infinite",
                  }}
                />
                {/* Wings Down Frame */}
                <path
                  d={down}
                  fill="oklch(0.38 0.05 55)"
                  stroke="oklch(0.32 0.05 55)"
                  strokeWidth="0.8"
                  style={{
                    animation: "birdFlapDown 0.14s steps(1) infinite",
                  }}
                />
              </svg>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes flyLeftToRight {
          0% {
            transform: translate3d(-10vw, 0px, 0) scale(var(--bird-scale, 1));
          }
          50% {
            transform: translate3d(45vw, var(--curve-y, -30px), 0) scale(var(--bird-scale, 1));
          }
          100% {
            transform: translate3d(110vw, -10px, 0) scale(var(--bird-scale, 1));
          }
        }

        @keyframes flyRightToLeft {
          0% {
            transform: translate3d(110vw, 0px, 0) scaleX(-1) scale(var(--bird-scale, 1));
          }
          50% {
            transform: translate3d(55vw, var(--curve-y, -30px), 0) scaleX(-1) scale(var(--bird-scale, 1));
          }
          100% {
            transform: translate3d(-10vw, -10px, 0) scaleX(-1) scale(var(--bird-scale, 1));
          }
        }
      `}</style>
    </div>
  );
}
