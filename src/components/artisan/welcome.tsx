import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { couple, invitation } from "@/data/wedding";
import welcomePortrait from "@/assets/welcome-couple-portrait.png";
import { InkRule, Motes, Motif } from "./atoms";
import { FlyingBirds } from "./flying-birds";
import { GoldenSparkles } from "./golden-sparkles";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface WelcomeProps {
  brideName?: string;
  groomName?: string;
  dateText?: string;
  venueText?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subtextQuote?: string;
}

export function Welcome({
  brideName = couple.bride,
  groomName = couple.groom,
  dateText = "Saturday • 14.02.2027",
  venueText = `${invitation.venue} • ${couple.city}`,
  headlineLine1 = "TO LOVE, LAUGHTER &",
  headlineLine2 = "Happily Ever After",
  subtextQuote = "A beautiful beginning of our forever ♥",
}: WelcomeProps) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), { stiffness: 50, damping: 20 });
  const foilShift = useTransform(mx, [-0.5, 0.5], ["15%", "85%"]);

  const track = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="welcome"
      onPointerMove={track}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:py-24"
    >
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />
      
      {/* Established Warm Gold Light Aura behind Card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(244, 235, 218, 0) 70%)",
        }}
        aria-hidden="true"
      />



      <FlyingBirds density="low" />
      <GoldenSparkles density="medium" />
      <Motes count={14} />

      {/* Illustrated Couple Portrait Card Frame with Deckle / Torn Edge Treatment */}
      <motion.div
        className="relative w-full max-w-lg"
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        initial={{ opacity: 0, scale: 0.96, y: 28 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Organic Deckle / Torn Edge Handmade Cardstock Backdrop */}
        <div
          className="deckle-edge card-sand-texture absolute -inset-2.5 rounded-xl opacity-95"
          aria-hidden="true"
        />

        {/* Full-Bleed Masterclass Illustrated Card Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border-2 border-gold/45 shadow-[0_20px_50px_-10px_rgba(60,40,15,0.35)]">
          <img
            src={welcomePortrait}
            alt="Aanya & Vihaan Wedding Illustration"
            className="h-full w-full object-cover object-center"
          />

          {/* Golden-Hour Volumetric Light Rays & Sunset Glow behind Couple */}
          <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
            {/* 1. Pulsing Golden Hour Sunburst Glow */}
            <motion.div
              className="absolute left-1/2 top-[48%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-65 blur-2xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255, 225, 120, 0.75) 0%, rgba(212, 175, 55, 0.4) 45%, transparent 75%)",
              }}
              animate={reduced ? {} : { scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 2. Volumetric Sun Light Beam Rays Radiating Upward */}
            <div
              className="absolute left-1/2 top-[45%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-35 mix-blend-soft-light pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 250deg at 50% 50%, rgba(255, 235, 170, 0.85) 0deg, transparent 25deg, rgba(255, 215, 100, 0.75) 50deg, transparent 75deg, rgba(255, 235, 170, 0.85) 110deg, transparent 140deg, rgba(255, 215, 100, 0.75) 180deg, transparent 210deg)",
              }}
            />

            {/* 3. Soft Golden Vignette Pop around Couple Silhouettes */}
            <div
              className="absolute left-1/2 bottom-[8%] h-64 w-80 -translate-x-1/2 rounded-full opacity-45 blur-xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 50%, rgba(255, 245, 210, 0.65) 0%, rgba(212, 175, 55, 0.28) 50%, transparent 80%)",
              }}
            />
          </div>

          {/* Seamless Full-Card Soft Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5]/40 via-transparent to-[#2c1c0e]/20 pointer-events-none z-[3]" />

          {/* Inner Filigree Hairline Border */}
          <div className="pointer-events-none absolute inset-3 rounded-xl border border-gold/35" aria-hidden="true" />

          {/* OVERLAID REAL HTML TYPOGRAPHY CONTENT WITH HERO FOCAL POINT & AMPLE BREATHING ROOM */}
          <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-6 text-center sm:px-10 sm:pt-8">
            {/* 1. Subtle Top Garland Ornament */}
            <div className="flex items-center justify-center gap-2 text-brass/70 opacity-80">
              <span className="h-[1px] w-7 bg-gradient-to-r from-transparent to-brass/60" />
              <span className="text-[0.65rem]">♡</span>
              <span className="h-[1px] w-7 bg-gradient-to-l from-transparent to-brass/60" />
            </div>

            {/* 2. Mood-Setter Subdued Headline (Small & Subtle) */}
            <div className="mt-1.5 flex flex-col items-center opacity-85">
              <p className="letterpress font-[family-name:var(--font-roman)] text-[0.6rem] tracking-[0.35em] text-[#6b4715] uppercase font-semibold">
                {headlineLine1}
              </p>
              <p className="font-[family-name:var(--font-script)] text-base sm:text-lg text-[#8a5d19] font-normal tracking-wide my-0.5">
                {headlineLine2}
              </p>
            </div>

            {/* 3. HERO ELEMENT: Couple Names (Big, Bold, Dominant & Spacious Focal Point) */}
            <motion.div className="my-3.5 sm:my-4.5 flex flex-col items-center">
              <h1 className="font-[family-name:var(--font-script)] text-5xl sm:text-7xl font-normal leading-none text-[#2c1c0e] tracking-tight drop-shadow-[0_4px_16px_rgba(255,253,248,0.98)] filter drop-shadow-[0_3px_10px_rgba(60,40,15,0.4)]">
                {brideName} <span className="text-[0.6em] italic font-serif text-[#8a5d19] opacity-90">&amp;</span> {groomName}
              </h1>
            </motion.div>

            {/* 4. Delicate Dotted Divider */}
            <div className="my-1 flex items-center justify-center gap-2 text-brass/60 opacity-80">
              <span className="h-[1px] w-8 border-b border-dotted border-brass/50" />
              <span className="text-[0.6rem]">♥</span>
              <span className="h-[1px] w-8 border-b border-dotted border-brass/50" />
            </div>

            {/* 5. Single-Line Subtle Quote Line */}
            <p className="font-[family-name:var(--font-serif)] text-[0.68rem] sm:text-xs text-[#5c3e1e]/85 italic font-medium max-w-xs mt-1">
              “{subtextQuote}”
            </p>

            {/* 6. Date & Venue Details (Cleanly Spaced) */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <p className="letterpress font-[family-name:var(--font-roman)] text-[0.68rem] sm:text-xs tracking-[0.32em] text-[#2c1c0e] font-bold uppercase">
                {dateText}
              </p>
              <p className="font-[family-name:var(--font-roman)] text-[0.65rem] tracking-[0.22em] text-[#6b4715] uppercase font-semibold">
                {venueText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gentle "Turn the Page" Bottom Navigation Prompt */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[0.62rem] tracking-[0.4em] text-ink-soft/80 uppercase font-semibold">
          Turn the page ↓
        </p>
      </motion.div>
    </section>
  );
}
