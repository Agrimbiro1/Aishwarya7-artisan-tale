import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import heroIllustration from "@/assets/hero-illustration.png";
import floral from "@/assets/floral-spray.png";
import { FlyingBirds } from "./flying-birds";
import { GoldenCelebrationEffect } from "./golden-celebration-effect";

export interface HeroParallaxBackdropProps {
  heroIllustrationSrc?: string;
  className?: string;
}

export function HeroParallaxBackdrop({
  heroIllustrationSrc = heroIllustration,
  className = "",
}: HeroParallaxBackdropProps) {
  const reduced = useReducedMotion();

  // Pointer position normalized [-0.5, 0.5]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth springs for 3D physics response
  const springConfig = { stiffness: 45, damping: 22 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  // Layer 1 (Far Sky/Sunrise Light) - Smallest Shift (3-5px)
  const farX = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const farY = useTransform(sy, [-0.5, 0.5], [-3, 3]);

  // Layer 2 (Midground Lake Palace) - Medium Shift (10-14px)
  const midX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const midY = useTransform(sy, [-0.5, 0.5], [-9, 9]);

  // Layer 3 (Foreground Corner Florals Bleeding) - Largest Shift (18-24px)
  const fgX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const fgY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      style={{ perspective: 1200 }}
    >
      <style>{`
        @keyframes goldenHourPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.95; }
        }
        @keyframes waterRipple {
          0% { transform: translateX(0px) scaleY(1); opacity: 0.6; }
          50% { transform: translateX(-18px) scaleY(1.04); opacity: 0.85; }
          100% { transform: translateX(0px) scaleY(1); opacity: 0.6; }
        }
        @keyframes shimmerDrift {
          0% { transform: translateX(-30%) scaleX(0.9); opacity: 0.2; }
          50% { transform: translateX(30%) scaleX(1.1); opacity: 0.65; }
          100% { transform: translateX(-30%) scaleX(0.9); opacity: 0.2; }
        }
      `}</style>

      {/* LAYER 1: Far Sky & Golden Hour Sunrise Glow (Slowest Parallax) */}
      <motion.div
        className="absolute -inset-6 pointer-events-none z-0"
        style={{
          x: farX,
          y: farY,
          background:
            "radial-gradient(ellipse 90% 75% at 50% 30%, #fdf8ee 0%, #f4ebda 55%, #e6d6c0 100%)",
        }}
      >
        {/* Golden Hour Light Radiating from Center-Top behind Palace Domes */}
        <div
          className="absolute top-[28%] left-1/2 h-[34rem] w-[34rem] rounded-full pointer-events-none blur-3xl mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 130, 0.85) 0%, rgba(245, 185, 95, 0.45) 45%, transparent 75%)",
            animation: reduced ? "none" : "goldenHourPulse 8s ease-in-out infinite",
          }}
        />

        {/* Soft Volumetric Light Beam Rays */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] opacity-35 pointer-events-none mix-blend-overlay"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 150deg, rgba(255, 230, 160, 0.5) 175deg, rgba(255, 215, 130, 0.7) 180deg, rgba(255, 230, 160, 0.5) 185deg, transparent 210deg)",
          }}
        />
      </motion.div>

      {/* LAYER 2: Midground Lake Palace & Lake Pichola Water Ripple (Medium Parallax) */}
      <motion.div
        className="absolute -inset-8 pointer-events-none z-10 overflow-hidden"
        style={{
          x: midX,
          y: midY,
        }}
      >
        {/* Main Lake Palace Illustrated Artwork */}
        <motion.img
          src={heroIllustrationSrc}
          alt=""
          className="h-full w-full object-cover object-center opacity-80"
          initial={{ scale: reduced ? 1 : 1.05, filter: "blur(4px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* LAKE PICHOLA WATER SHIMMER & RIPPLE ANIMATION LAYER */}
        <div className="absolute bottom-0 left-0 right-0 h-[48%] overflow-hidden pointer-events-none">
          {/* Subtle Water Caustic Displacement Ripple */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.25) 0px, transparent 3px, rgba(212,175,55,0.15) 6px, transparent 10px)",
              animation: reduced ? "none" : "waterRipple 6s ease-in-out infinite",
            }}
          />

          {/* Golden Specular Light Reflections Drift across Lake Surface */}
          <div
            className="absolute top-[30%] left-[10%] right-[10%] h-[35%] rounded-full blur-md opacity-50 mix-blend-color-dodge"
            style={{
              background:
                "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(255, 235, 175, 0.9) 0%, rgba(212, 175, 55, 0.4) 60%, transparent 100%)",
              animation: reduced ? "none" : "shimmerDrift 9s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[60%] left-[20%] right-[20%] h-[25%] rounded-full blur-sm opacity-40 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(255, 245, 200, 0.85) 0%, transparent 80%)",
              animation: reduced ? "none" : "shimmerDrift 12s ease-in-out infinite reverse",
            }}
          />
        </div>

        {/* Ink-Line Birds Flying Across Midground */}
        <FlyingBirds density="medium" opacity={0.6} />

        {/* Golden Celebration Cannon Burst */}
        <GoldenCelebrationEffect />

        {/* Soft Light Scrim Overlay for Legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 35%, rgba(244, 235, 218, 0.72) 0%, rgba(244, 235, 218, 0.25) 60%, rgba(244, 235, 218, 0.78) 100%)",
          }}
        />
      </motion.div>

      {/* LAYER 3: Near Foreground Corner Botanicals (Prominent, Rich & Bleeding Edges!) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
        style={{
          x: fgX,
          y: fgY,
        }}
      >
        {/* Top-Left Floral Spray — Rich Watercolor Floral Arch Bleeding Outward */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -top-12 -left-12 w-56 sm:w-[26rem] md:w-[32rem] opacity-70 sm:opacity-85 mix-blend-multiply origin-top-left"
          style={{ transform: "rotate(-4deg)" }}
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top-Right Floral Spray — Rich Watercolor Floral Arch Bleeding Outward */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -top-14 -right-12 w-56 sm:w-[26rem] md:w-[32rem] opacity-70 sm:opacity-85 mix-blend-multiply origin-top-right"
          style={{ transform: "scaleX(-1) rotate(-8deg)" }}
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Bottom-Left Floral Spray — Rich Watercolor Floral Arch Bleeding Outward */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -bottom-14 -left-12 w-60 sm:w-[28rem] md:w-[34rem] opacity-65 sm:opacity-80 mix-blend-multiply origin-bottom-left"
          style={{ transform: "rotate(-174deg)" }}
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Bottom-Right Floral Spray — Rich Watercolor Floral Arch Bleeding Outward */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -bottom-16 -right-12 w-60 sm:w-[28rem] md:w-[34rem] opacity-65 sm:opacity-80 mix-blend-multiply origin-bottom-right"
          style={{ transform: "rotate(172deg)" }}
          animate={reduced ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>
    </div>
  );
}
