import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { couple, invitation } from "@/data/wedding";
import heroIllustration from "@/assets/hero-illustration.png";
import { Motif } from "./atoms";
import { HeroParallaxBackdrop } from "./hero-parallax-backdrop";
import { useAmbience } from "./use-ambience";

export interface InvitationOpeningProps {
  onOpen?: () => void;
  guestName?: string;
  monogram?: string;
  tagline?: string;
  eyebrowText?: string;
  brideName?: string;
  groomName?: string;
  heroIllustrationSrc?: string;
}

const EASE_OUT_CUBIC = [0.22, 1, 0.36, 1] as const;

export function Opening({
  onOpen,
  guestName = "Esteemed Guests",
  monogram = "A & V",
  tagline = "This invitation is\nexclusively for you",
  eyebrowText = "WE'RE GETTING MARRIED",
  brideName = couple.bride,
  groomName = couple.groom,
  heroIllustrationSrc = heroIllustration,
}: InvitationOpeningProps) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"sealed" | "opening" | "hero">("sealed");
  const [isLeaving, setIsLeaving] = useState(false);
  const { playing, toggle } = useAmbience();

  // Preload the hero illustration asset during Stage 1 so there is no pop-in
  useEffect(() => {
    if (heroIllustrationSrc) {
      const img = new Image();
      img.src = heroIllustrationSrc;
    }
  }, [heroIllustrationSrc]);

  // Lock body scroll while the opening animation overlay is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSealTap = () => {
    if (stage !== "sealed") return;

    // Start background audio on tap if not already playing
    if (!playing) {
      toggle();
    }

    setStage("opening");

    // Stage 2 transition lasts ~550ms before progressing smoothly into Stage 3 Hero Reveal
    window.setTimeout(() => {
      setStage("hero");
    }, reduced ? 100 : 550);
  };

  const handleEnterSite = () => {
    if (isLeaving) return;
    setIsLeaving(true);

    // Fade out overlay cleanly over 600ms, then notify parent layout that invitation is opened
    window.setTimeout(() => {
      if (onOpen) onOpen();
    }, reduced ? 100 : 600);
  };

  return (
    <motion.div
      key="opening-overlay"
      className="fixed inset-0 z-50 overflow-hidden font-sans select-none bg-fabric"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 25%, #fcf7ed 0%, #f4ebda 55%, #e8dcc6 100%)",
      }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
    >
      {/* Background Handcrafted Cotton Fabric Texture */}
      <div className="bg-fabric absolute inset-0 opacity-40 pointer-events-none" />

      {/* Sound Toggle Button (Bottom-Right Corner with Hover Pulse Ring) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        aria-label={playing ? "Pause ambient audio" : "Play ambient audio"}
        className="stamp group fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-[#f4ebda]/95 text-ink shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer"
      >
        {/* Hover Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-gold/25 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100 pointer-events-none" />
        <span className="absolute inset-0 rounded-full border border-gold/60 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />

        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 fill-current text-brass transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM3 9v6h4l5 5V4L7 9H3z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 fill-current text-ink-soft transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>

      {/* Stage 1 & Stage 2: Sealed Envelope Screen */}
      {stage !== "hero" ? (
        <div
          onClick={handleSealTap}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center px-4 z-20"
        >
          {/* Faint Envelope Fold Lines */}
          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
            animate={{ opacity: stage === "opening" ? 0 : 0.22 }}
            transition={{ duration: 0.4 }}
          >
            <g stroke="oklch(0.55 0.08 65)" strokeWidth="1" strokeDasharray="4 3" fill="none">
              {/* Top envelope flap crease V */}
              <path d="M 0 0 L 50% 56% L 100% 0" />
              {/* Side flap creases */}
              <path d="M 0 0 L 50% 56% L 0 100%" />
              <path d="M 100% 0 L 50% 56% L 100% 100%" />
            </g>
          </motion.svg>

          {/* Stage 2 Light Flash Flare */}
          {stage === "opening" ? (
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255, 252, 245, 0.95) 0%, rgba(244, 235, 218, 0) 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.55, times: [0, 0.4, 1] }}
            />
          ) : null}

          {/* Stage 1 & 2 Wax Seal Emblem */}
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center text-center"
            initial={{ scale: 1, opacity: 1 }}
            animate={
              stage === "opening"
                ? { scale: reduced ? 1 : 1.08, opacity: 0 }
                : { scale: reduced ? 1 : [1, 1.025, 1] }
            }
            transition={
              stage === "opening"
                ? { duration: 0.4, ease: EASE_OUT_CUBIC }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={{ scale: stage === "sealed" && !reduced ? 1.04 : 1 }}
            whileTap={{ scale: stage === "sealed" && !reduced ? 0.96 : 1 }}
          >
            {/* Embossed Wax Seal Disc */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute -inset-4 rounded-full blur-md opacity-40"
                style={{
                  background: "radial-gradient(circle, rgba(201, 166, 107, 0.6) 0%, transparent 70%)",
                }}
              />

              <div
                className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #e8ba6c 0%, #c9a66b 35%, #9b753b 70%, #64471c 100%)",
                  boxShadow: `
                    0 20px 40px -10px rgba(60, 42, 18, 0.45),
                    0 8px 18px -4px rgba(60, 42, 18, 0.3),
                    inset 0 3px 6px rgba(255, 246, 215, 0.7),
                    inset 0 -3px 8px rgba(45, 28, 8, 0.5)
                  `,
                  border: "1px solid rgba(255, 240, 200, 0.45)",
                }}
              >
                {/* Dashed Inner Rim */}
                <div className="h-[80%] w-[80%] rounded-full border border-dashed border-[#fff4d6]/60 flex items-center justify-center">
                  <span
                    className="font-[family-name:var(--font-script)] text-3xl sm:text-4xl tracking-wider select-none text-[#fff8ed]"
                    style={{
                      textShadow: "0 1px 3px rgba(50, 32, 10, 0.8), 0 0 12px rgba(255, 240, 200, 0.5)",
                    }}
                  >
                    {monogram}
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline Below Wax Seal */}
            <motion.div
              className="mt-6 flex flex-col items-center"
              animate={stage === "opening" ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-[family-name:var(--font-script)] text-2xl sm:text-3xl text-ink leading-tight">
                {tagline.split("\n").map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <p className="letterpress mt-3 font-[family-name:var(--font-roman)] text-[0.62rem] tracking-[0.32em] text-brass uppercase">
                Tap anywhere to open
              </p>
            </motion.div>
          </motion.div>
        </div>
      ) : null}

      {/* Stage 3: Hero Reveal Screen */}
      {stage === "hero" ? (
        <motion.div
          key="hero-reveal-screen"
          className="absolute inset-0 flex flex-col items-center justify-between overflow-y-auto px-6 py-10 z-20"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
        >
          {/* 3D Depth Living Invitation Backdrop (Far Sky, Mid Lake Palace, Bleeding Foreground Botanicals) */}
          <HeroParallaxBackdrop heroIllustrationSrc={heroIllustrationSrc} />

          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center my-auto py-8">
            {/* Soft Radial Scrim Card directly behind Typography for 3D Contrast Pop */}
            <div className="absolute inset-x-2 -inset-y-4 rounded-3xl bg-radial from-[#fffcf5]/90 via-[#f4ebda]/75 to-transparent blur-md pointer-events-none -z-10" />

            {/* 1. Open Calligraphic Personalized Guest Greeting (No Pill Container) */}
            <motion.div
              className="mb-3 flex flex-col items-center w-full max-w-lg"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_CUBIC }}
            >
              <p className="font-[family-name:var(--font-roman)] text-[0.68rem] tracking-[0.4em] text-brass uppercase font-semibold mb-1">
                Cordially Welcoming
              </p>

              <h2 className="font-[family-name:var(--font-script)] text-3xl sm:text-5xl text-[#2c1c0e] font-normal tracking-wide my-1 text-center drop-shadow-[0_2px_12px_rgba(244,235,218,0.95)] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                Dear <span className="text-[#8a5d19] font-serif italic font-medium drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">{guestName}</span>
              </h2>

              <svg viewBox="0 0 300 24" className="w-full text-brass mt-2 opacity-80" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M 10 12 Q 75 22, 150 12 Q 225 22, 290 12" strokeDasharray="3 2" opacity="0.6" />
                <circle cx="150" cy="12" r="3" fill="currentColor" />
                <circle cx="75" cy="16" r="2" fill="currentColor" opacity="0.7" />
                <circle cx="225" cy="16" r="2" fill="currentColor" opacity="0.7" />
                <path d="M 144 12 C 138 4, 132 4, 126 10" />
                <path d="M 156 12 C 162 4, 168 4, 174 10" />
              </svg>
            </motion.div>

            {/* 2. Eyebrow Text */}
            <motion.p
              className="eyebrow letterpress text-[0.68rem] tracking-[0.42em] text-brass uppercase"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT_CUBIC }}
            >
              {eyebrowText}
            </motion.p>

            {/* 3. Stacked Couple Names with Typography Pop & Opulent Calligraphy Ampersand */}
            <motion.div
              className="mt-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT_CUBIC }}
            >
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-normal text-[#2c1c0e] tracking-tight drop-shadow-[0_4px_16px_rgba(244,235,218,0.95)] filter drop-shadow-[0_2px_4px_rgba(44,28,14,0.18)]">
                {brideName}
              </h1>
              {/* Opulent Calligraphy Flourish Ampersand */}
              <span className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl text-brass italic font-serif my-0.5 drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)]">
                &amp;
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-normal text-[#2c1c0e] tracking-tight drop-shadow-[0_4px_16px_rgba(244,235,218,0.95)] filter drop-shadow-[0_2px_4px_rgba(44,28,14,0.18)]">
                {groomName}
              </h1>
            </motion.div>

            {/* 4. Numeric Date, Rajasthani Lotus Motif & Venue Details */}
            <motion.div
              className="mt-6 flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT_CUBIC }}
            >
              <p className="letterpress font-[family-name:var(--font-roman)] text-xs sm:text-sm tracking-[0.32em] text-[#2c1c0e] font-semibold uppercase">
                SATURDAY • 14.02.2027
              </p>

              {/* Decorative Rajasthani Lotus Motif Divider */}
              <div className="my-1.5 flex items-center justify-center gap-3 text-brass/80">
                <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-brass/70" />
                <Motif kind="lotus" className="h-6 w-6 text-brass transform hover:rotate-12 transition-transform duration-300" />
                <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-brass/70" />
              </div>

              <p className="font-[family-name:var(--font-roman)] text-[0.72rem] tracking-[0.22em] text-brass uppercase font-medium">
                {invitation.venue} • {couple.city}
              </p>
            </motion.div>

            {/* 5. Ultra-Premium Royal Gold Capsule CTA Plaque */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT_CUBIC }}
            >
              <style>{`
                @keyframes ctaSheenSweep {
                  0%, 70% { transform: translateX(-140%) rotate(25deg); opacity: 0; }
                  76% { opacity: 0.85; }
                  86%, 100% { transform: translateX(300%) rotate(25deg); opacity: 0; }
                }
                @keyframes goldAuraGlow {
                  0%, 100% { box-shadow: 0 12px 35px -6px rgba(212, 175, 55, 0.48), 0 4px 12px rgba(60, 40, 15, 0.2); }
                  50% { box-shadow: 0 18px 45px -4px rgba(212, 175, 55, 0.72), 0 6px 18px rgba(60, 40, 15, 0.28); }
                }
              `}</style>
              <button
                type="button"
                onClick={handleEnterSite}
                className="group relative overflow-hidden rounded-full px-12 py-5 text-xs sm:text-sm tracking-[0.36em] uppercase font-[family-name:var(--font-roman)] text-[#241508] font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-30"
                style={{
                  background: "linear-gradient(135deg, #fffdf8 0%, #fef5e0 45%, #f7eaad 85%, #faf2d2 100%)",
                  border: "1.5px solid rgba(212, 175, 55, 0.9)",
                  animation: reduced ? "none" : "goldAuraGlow 4s ease-in-out infinite",
                }}
              >
                {/* Inner Pill Gold Filigree Ring */}
                <span className="absolute inset-1.5 rounded-full border border-[#c9a66b]/60 pointer-events-none transition-colors duration-300 group-hover:border-[#d4af37]" />

                {/* 3.8s Periodic Metallic Light Sheen Sweep */}
                <span
                  className="absolute inset-y-0 -left-1/3 w-2/3 bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none"
                  style={{
                    animation: reduced ? "none" : "ctaSheenSweep 3.8s ease-in-out infinite",
                  }}
                />

                {/* Content: Gold Wax Seal Medallion + Letterpressed Royal Text + Forward Arrow */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-[#241508] font-bold">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-br from-[#d4af37] via-[#aa771c] to-[#784e10] text-[#fffcf5] text-[0.68rem] shadow-sm font-serif italic">
                    ❦
                  </span>
                  <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
                    ENTER INVITATION
                  </span>
                  <span className="text-[#b8860b] text-base font-serif transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
