import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export interface GoldenSparklesProps {
  density?: "low" | "medium" | "high";
  className?: string;
}

interface SparkleParticle {
  id: number;
  leftPercent: number;
  topPercent: number;
  sizePx: number;
  glowPx: number;
  durationSec: number;
  delaySec: number;
  twinkleDurationSec: number;
  swayPx: number;
  isBloom: boolean;
}

export function GoldenSparkles({ density = "medium", className = "" }: GoldenSparklesProps) {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    if (reduced) return;

    const isMobile = window.innerWidth <= 480;
    const baseCount = density === "low" ? 8 : density === "high" ? 22 : 14;
    const totalCount = isMobile ? Math.floor(baseCount * 0.6) : baseCount;

    const generated: SparkleParticle[] = Array.from({ length: totalCount }).map((_, i) => {
      const isBloom = i < 5; // First 5 particles bloom in as hero text cascades
      const sizePx = 2 + Math.random() * 4; // 2px - 6px
      const glowPx = 6 + Math.random() * 8; // 6px - 14px glow

      return {
        id: i,
        leftPercent: 6 + Math.random() * 88,
        topPercent: 12 + Math.random() * 76,
        sizePx,
        glowPx,
        durationSec: 7 + Math.random() * 5,
        delaySec: isBloom ? Math.random() * 0.4 : Math.random() * 4,
        twinkleDurationSec: 2.2 + Math.random() * 2.2,
        swayPx: (Math.random() - 0.5) * 16,
        isBloom,
      };
    });

    setParticles(generated);
  }, [density, reduced]);

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sparkleDrift {
          0% {
            transform: translate3d(0, 0px, 0) scale(0.9);
          }
          50% {
            transform: translate3d(var(--sparkle-sway, 6px), -24px, 0) scale(1.1);
          }
          100% {
            transform: translate3d(0, -48px, 0) scale(0.95);
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            opacity: 0.18;
          }
          50% {
            opacity: 0.85;
          }
        }

        @keyframes sparkleBloom {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          40% {
            opacity: 0.95;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.leftPercent}%`,
            top: `${p.topPercent}%`,
            width: `${p.sizePx}px`,
            height: `${p.sizePx}px`,
            background: "radial-gradient(circle, #fff7e6 0%, #e8c688 60%, #c9a66b 100%)",
            boxShadow: `0 0 ${p.glowPx}px ${Math.floor(p.glowPx / 2.5)}px rgba(229, 195, 132, 0.65), 0 0 ${p.glowPx * 1.5}px rgba(201, 166, 107, 0.35)`,
            animationName: p.isBloom ? "sparkleBloom, sparkleDrift" : "sparkleTwinkle, sparkleDrift",
            animationDuration: p.isBloom
              ? `1.8s, ${p.durationSec}s`
              : `${p.twinkleDurationSec}s, ${p.durationSec}s`,
            animationTimingFunction: "ease-in-out, ease-in-out",
            animationIterationCount: p.isBloom ? "1, infinite" : "infinite, infinite",
            animationDelay: `${p.delaySec}s, ${p.delaySec}s`,
            ["--sparkle-sway" as string]: `${p.swayPx}px`,
          }}
        />
      ))}
    </div>
  );
}
