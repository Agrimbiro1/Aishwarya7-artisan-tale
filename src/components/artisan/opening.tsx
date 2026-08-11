import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { couple, invitation } from "@/data/wedding";
import heroIllustration from "@/assets/hero-illustration.png";
import floral from "@/assets/floral-spray.png";
import wreath from "@/assets/wreath-ring.png";
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
      {/* Background Handcrafted Sand-Grain & Fabric Texture */}
      <div className="bg-fabric absolute inset-0 opacity-40 pointer-events-none" />
      <div className="grain absolute inset-0 opacity-80 pointer-events-none" aria-hidden="true" />
      <div className="card-sand-texture absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />

      {/* SUBTLE ROYAL RADIAL VIGNETTE OVERLAY (WARM DARK CORNERS FOR REALISTIC SPOTLIGHT DEPTH) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-75 mix-blend-multiply select-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 45%, transparent 35%, rgba(95, 65, 25, 0.22) 70%, rgba(60, 38, 12, 0.45) 100%)",
        }}
      />

      {/* FADED FLORAL WATERMARK SPRIGS IN ALL FOUR CORNERS */}
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 w-72 sm:w-96 opacity-[0.22] mix-blend-multiply select-none"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-72 sm:w-96 opacity-[0.22] mix-blend-multiply select-none transform scale-x-[-1]"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 w-72 sm:w-96 opacity-[0.22] mix-blend-multiply select-none transform scale-y-[-1]"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-12 w-72 sm:w-96 opacity-[0.22] mix-blend-multiply select-none transform scale-x-[-1] scale-y-[-1]"
      />

      {/* SUBTLE CENTRAL WREATH WATERMARK BEHIND WAX SEAL */}
      <img
        src={wreath}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] sm:w-[44rem] opacity-[0.09] mix-blend-multiply select-none"
      />

      {/* Sound Toggle Music Button (Bottom-Right Corner) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause Music" : "Play Music"}
        className="card-sand-texture group fixed bottom-6 right-6 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#b89138]/60 bg-[#faf5eb]/90 text-[#8c6c23] shadow-[0_8px_24px_rgba(60,40,15,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#8c6c23] hover:bg-[#f5ebd7] active:scale-95 cursor-pointer"
      >
        {/* Inner hairline gold ring */}
        <span className="absolute inset-1 rounded-full border border-[#b89138]/30 pointer-events-none transition-colors duration-300 group-hover:border-[#8c6c23]/50" />

        {/* Soft warm aura pulse when playing */}
        {playing && (
          <span className="absolute -inset-1 rounded-full bg-[#b89138]/20 animate-ping opacity-60 pointer-events-none" />
        )}

        {playing ? (
          <div className="relative z-10 flex items-center justify-center gap-0.5">
            {/* Active Music Note Icon in rich warm brass */}
            <svg className="h-5 w-5 text-[#8c6c23] fill-current" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            {/* Mini Animated Equalizer Sound Bars */}
            <span className="flex items-end gap-[1.5px] h-3 ml-0.5">
              <span className="w-[2px] h-full bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_100ms]" />
              <span className="w-[2px] h-2/3 bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_300ms]" />
              <span className="w-[2px] h-4/5 bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_500ms]" />
            </span>
          </div>
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            {/* Paused Music Note Icon with Slash */}
            <svg className="h-5 w-5 text-[#8c6c23]/75 fill-current" viewBox="0 0 24 24">
              <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V14.27l5 5L20.73 21 22 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z"/>
            </svg>
          </div>
        )}
      </button>

      {/* LOW-DENSITY AMBIENT GOLDEN SPARKLES SHIMMER */}
      {!reduced && stage !== "hero" && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
          {[
            { top: "18%", left: "15%", delay: 0, duration: 3.5, size: "h-2 w-2" },
            { top: "28%", left: "80%", delay: 1.2, duration: 4.2, size: "h-2.5 w-2.5" },
            { top: "72%", left: "22%", delay: 0.7, duration: 3.8, size: "h-2 w-2" },
            { top: "68%", left: "75%", delay: 2.0, duration: 4.5, size: "h-3 w-3" },
            { top: "42%", left: "10%", delay: 1.5, duration: 3.2, size: "h-1.5 w-1.5" },
            { top: "82%", left: "48%", delay: 0.4, duration: 4.0, size: "h-2.5 w-2.5" },
            { top: "15%", left: "62%", delay: 2.3, duration: 3.6, size: "h-2 w-2" },
          ].map((sparkle, idx) => (
            <motion.div
              key={`opening-sparkle-${idx}`}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.6, 1.3, 0.6],
                y: [-8, -22, -8],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
              style={{ top: sparkle.top, left: sparkle.left }}
              className={`absolute rounded-full bg-gradient-to-tr from-[#ffe699] via-[#d4af37] to-[#fffdf8] shadow-[0_0_10px_rgba(212,175,55,0.85)] ${sparkle.size}`}
            />
          ))}
        </div>
      )}

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
                : { scale: reduced ? 1 : [1, 1.035, 1], y: reduced ? 0 : [0, -3, 0] }
            }
            transition={
              stage === "opening"
                ? { duration: 0.4, ease: EASE_OUT_CUBIC }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={{ scale: stage === "sealed" && !reduced ? 1.05 : 1 }}
            whileTap={{ scale: stage === "sealed" && !reduced ? 0.95 : 1 }}
          >
            {/* 3D Royal Embossed Wax Seal Disc */}
            <div className="relative flex items-center justify-center">
              {/* Deep Ambient Wax Glow Shadow */}
              <div
                className="absolute -inset-6 rounded-full blur-xl opacity-60 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(184, 145, 56, 0.65) 0%, rgba(120, 78, 16, 0.3) 50%, transparent 75%)",
                }}
              />

              {/* 3D Organic Sculpted Wax Seal Medallion */}
              <div
                className="card-sand-texture relative h-32 w-32 sm:h-36 sm:w-36 flex items-center justify-center transition-all duration-300 overflow-hidden"
                style={{
                  borderRadius: "50% 48% 52% 49% / 49% 52% 48% 51%", // Organic melted wax stamp perimeter
                  background:
                    "radial-gradient(circle at 32% 28%, #f7d488 0%, #e0b05b 22%, #b88a38 52%, #855b1b 80%, #4a300a 100%)",
                  boxShadow: `
                    0 26px 55px -10px rgba(45, 28, 8, 0.65),
                    0 14px 28px -4px rgba(45, 28, 8, 0.45),
                    inset 0 4px 8px rgba(255, 248, 220, 0.85),
                    inset 0 -5px 12px rgba(35, 20, 5, 0.75),
                    inset 4px 4px 10px rgba(255, 242, 190, 0.5)
                  `,
                  border: "1.5px solid rgba(255, 242, 190, 0.6)",
                }}
              >
                {/* Micro Sand Grain Wax Texture Overlay */}
                <div className="grain absolute inset-0 opacity-70 pointer-events-none" aria-hidden="true" />

                {/* Metallic Sheen Sweep */}
                {!reduced && (
                  <motion.div
                    animate={{ x: ["-130%", "230%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.0, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                  />
                )}

                {/* Top-Left Specular Light Highlight Curve */}
                <div
                  className="pointer-events-none absolute top-1.5 left-2.5 w-16 h-8 rounded-full blur-[1px] transform -rotate-45"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 245, 210, 0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Concentric Debossed Inner Wax Ridge (Stamped Bevel Rim) */}
                <div
                  className="relative h-[82%] w-[82%] rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    boxShadow: `
                      inset 0 3px 6px rgba(40, 24, 6, 0.7),
                      inset 0 -2px 5px rgba(255, 245, 210, 0.4),
                      0 2px 4px rgba(255, 248, 220, 0.4)
                    `,
                    background: "radial-gradient(circle at 35% 30%, #e0b05b 0%, #a87e2f 65%, #664312 100%)",
                    border: "1.5px dashed rgba(255, 245, 210, 0.75)",
                  }}
                >
                  {/* Embossed Monogram Script Text with Deep 3D Letterpress Shadow */}
                  <span
                    className="font-[family-name:var(--font-script)] text-3.5xl sm:text-4.5xl tracking-wider select-none text-[#fffbf2] filter drop-shadow-md"
                    style={{
                      textShadow: `
                        1px 2px 4px rgba(35, 20, 5, 0.95),
                        -1px -1px 2px rgba(255, 248, 220, 0.7),
                        0 0 14px rgba(255, 240, 190, 0.6)
                      `,
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

              {/* ENHANCED PULSING 'TAP ANYWHERE TO OPEN' CALL TO ACTION */}
              <motion.p
                animate={reduced ? {} : { opacity: [0.65, 1, 0.65], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="letterpress mt-4 flex items-center justify-center gap-2 font-[family-name:var(--font-roman)] text-[0.68rem] sm:text-xs tracking-[0.35em] text-[#8c6c23] uppercase font-bold drop-shadow-xs"
              >
                <span className="text-[#b89138] text-[0.55rem]">✦</span>
                <span>Tap anywhere to open</span>
                <span className="text-[#b89138] text-[0.55rem]">✦</span>
              </motion.p>
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
