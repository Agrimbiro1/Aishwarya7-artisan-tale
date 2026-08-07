import confetti from "canvas-confetti";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

export interface GoldenCelebrationEffectProps {
  className?: string;
}

// Kirkiri Golden Glitter Dust Palette: Pure Gold, Champagne Sparkle, Metallic Brass, Ivory Light
const KIRKIRI_GLITTER_COLORS = [
  "#FFD700", // Pure Gold
  "#F7E396", // Champagne Shimmer
  "#D4AF37", // Metallic Gold
  "#FFF9E5", // Diamond Ivory Sparkle
  "#C5A059", // Warm Antique Gold
  "#E8C374", // Soft Gold Flake
];

export function GoldenCelebrationEffect({ className = "" }: GoldenCelebrationEffectProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Helper: Fire fine golden Kirkiri glitter streams simultaneously from all 4 corners
    const fireContinuousFourCorners = () => {
      const isMobile = window.innerWidth <= 480;
      const count = isMobile ? 8 : 16;

      // 1. Top-Left Corner Kirkiri Stream (aimed down-right)
      confetti({
        particleCount: count,
        angle: 45,
        spread: 45,
        origin: { x: 0, y: 0 },
        colors: KIRKIRI_GLITTER_COLORS,
        shapes: ["circle", "square"], // Fine glitter dust specks, NO stars
        scalar: isMobile ? 0.6 : 0.75,
        ticks: 190,
        gravity: 0.7,
        drift: 0.1,
      });

      // 2. Top-Right Corner Kirkiri Stream (aimed down-left)
      confetti({
        particleCount: count,
        angle: 135,
        spread: 45,
        origin: { x: 1, y: 0 },
        colors: KIRKIRI_GLITTER_COLORS,
        shapes: ["circle", "square"],
        scalar: isMobile ? 0.6 : 0.75,
        ticks: 190,
        gravity: 0.7,
        drift: -0.1,
      });

      // 3. Bottom-Left Corner Kirkiri Stream (aimed up-right)
      confetti({
        particleCount: count,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.98 },
        colors: KIRKIRI_GLITTER_COLORS,
        shapes: ["circle", "square"],
        scalar: isMobile ? 0.65 : 0.8,
        ticks: 210,
        gravity: 0.65,
        drift: 0.12,
      });

      // 4. Bottom-Right Corner Kirkiri Stream (aimed up-left)
      confetti({
        particleCount: count,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.98 },
        colors: KIRKIRI_GLITTER_COLORS,
        shapes: ["circle", "square"],
        scalar: isMobile ? 0.65 : 0.8,
        ticks: 210,
        gravity: 0.65,
        drift: -0.12,
      });
    };

    // 1. Initial burst on mount
    const timer = window.setTimeout(fireContinuousFourCorners, 150);

    // 2. CONTINUOUS UNINTERRUPTED STREAM FROM ALL 4 CORNERS
    // Fires every 380ms continuously until the guest enters the next page
    const interval = window.setInterval(fireContinuousFourCorners, 380);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 6 }}
      aria-hidden="true"
    >
      {/* Soft Radial Kirkiri Corner Glow Highlights */}
      <div
        className="absolute top-0 left-0 h-48 w-48 opacity-50 blur-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.65) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-48 w-48 opacity-50 blur-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(255, 215, 0, 0.65) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-48 w-48 opacity-50 blur-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 100%, rgba(255, 215, 0, 0.65) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-48 w-48 opacity-50 blur-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.65) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
