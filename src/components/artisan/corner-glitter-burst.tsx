import confetti from "canvas-confetti";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

export interface CornerGlitterBurstProps {
  className?: string;
}

const GOLD_PALETTE = ["#D4AF37", "#F3E5AB", "#C9A66B", "#E6B8A2", "#FFFDF5", "#AA771C"];

export function CornerGlitterBurst({ className = "" }: CornerGlitterBurstProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Fire golden glitter bursts from all 4 corners when the hero screen mounts
    const fireCornerBursts = () => {
      const isMobile = window.innerWidth <= 480;
      const count = isMobile ? 35 : 65;

      // 1. Top-Left Corner Burst (aimed down-right)
      confetti({
        particleCount: count,
        angle: 45,
        spread: 55,
        origin: { x: 0, y: 0 },
        colors: GOLD_PALETTE,
        shapes: ["circle", "star"],
        scalar: isMobile ? 0.8 : 1.1,
        ticks: 220,
        gravity: 0.85,
        drift: 0.2,
      });

      // 2. Top-Right Corner Burst (aimed down-left)
      confetti({
        particleCount: count,
        angle: 135,
        spread: 55,
        origin: { x: 1, y: 0 },
        colors: GOLD_PALETTE,
        shapes: ["circle", "star"],
        scalar: isMobile ? 0.8 : 1.1,
        ticks: 220,
        gravity: 0.85,
        drift: -0.2,
      });

      // 3. Bottom-Left Corner Burst (aimed up-right)
      confetti({
        particleCount: count,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.95 },
        colors: GOLD_PALETTE,
        shapes: ["circle", "star"],
        scalar: isMobile ? 0.8 : 1.15,
        ticks: 240,
        gravity: 0.7,
        drift: 0.15,
      });

      // 4. Bottom-Right Corner Burst (aimed up-left)
      confetti({
        particleCount: count,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.95 },
        colors: GOLD_PALETTE,
        shapes: ["circle", "star"],
        scalar: isMobile ? 0.8 : 1.15,
        ticks: 240,
        gravity: 0.7,
        drift: -0.15,
      });
    };

    // Initial burst on mount
    const timer1 = window.setTimeout(fireCornerBursts, 150);

    // Secondary celebratory follow-up sparkle burst after 400ms
    const timer2 = window.setTimeout(() => {
      const isMobile = window.innerWidth <= 480;
      const count = isMobile ? 20 : 40;

      confetti({
        particleCount: count,
        angle: 45,
        spread: 45,
        origin: { x: 0.05, y: 0.1 },
        colors: GOLD_PALETTE,
        shapes: ["star"],
        scalar: 0.9,
        ticks: 180,
      });

      confetti({
        particleCount: count,
        angle: 135,
        spread: 45,
        origin: { x: 0.95, y: 0.1 },
        colors: GOLD_PALETTE,
        shapes: ["star"],
        scalar: 0.9,
        ticks: 180,
      });
    }, 450);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 6 }}
      aria-hidden="true"
    >
      {/* Corner Sparkle Glow Highlights */}
      <div
        className="absolute top-0 left-0 h-40 w-40 opacity-50 blur-xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-40 w-40 opacity-50 blur-xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-40 w-40 opacity-50 blur-xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 100%, rgba(212, 175, 55, 0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-40 w-40 opacity-50 blur-xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 100%, rgba(212, 175, 55, 0.5) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
