import confetti from "canvas-confetti";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { couple } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { InkRule, Motes, Motif } from "./atoms";

export function Closing() {
  const reduced = useReducedMotion();
  const [tapped, setTapped] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const handleSealTap = () => {
    setTapped(true);
    setToastText("See you in Udaipur! 🌸✨");

    // Trigger golden celebration rose petal & glitter confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 85,
        origin: { y: 0.82 },
        colors: ["#d4aa3b", "#b89138", "#fce6a6", "#e87a90", "#8c6c23"],
        scalar: 1.15,
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback if confetti unavailable
    }

    setTimeout(() => {
      setTapped(false);
    }, 1200);

    setTimeout(() => {
      setToastText(null);
    }, 3800);
  };

  return (
    <footer className="relative overflow-hidden px-4 py-28 sm:px-8 sm:py-36 text-center" style={{ backgroundColor: "transparent" }}>
      {/* BACKGROUND GRAIN, FLOATING PETALS & SPARKLE DRIFT */}
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <Motes count={16} petal />

      {/* GENTLE BACKGROUND AMBIENT SPARKLE DRIFT */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#d4aa3b]/40 blur-[1px]"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative mx-auto max-w-2xl z-10"
        initial={{ opacity: 0, rotateX: reduced ? 0 : 18, y: 30 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: reduced ? 0.3 : 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
      >
        {/* DECKLE EDGE PAPER CONTAINER WITH AMBIENT DEEP GOLD SHADOW */}
        <div className="deckle-edge card-sand-texture absolute inset-0 rounded-2xl bg-[#fffdf8] border-2 border-[#b89138]/45 shadow-[0_24px_55px_-12px_rgba(184,145,56,0.28)] pointer-events-none" />

        {/* CARD SURFACE CONTENT */}
        <div className="grain relative z-10 px-6 py-12 sm:px-14 sm:py-16 rounded-2xl flex flex-col items-center">
          {/* INNER HAIRLINE GOLD FRAME & CORNER FLORAL ACCENTS */}
          <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl border border-[#b89138]/35" aria-hidden="true" />
          <img
            src={floral}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={1024}
            className="pointer-events-none absolute -bottom-12 -right-12 w-64 opacity-20 mix-blend-multiply select-none"
          />

          {/* ROYAL MARIGOLD FLOURISH HEADER */}
          <div className="mx-auto flex items-center justify-center gap-3 mb-4">
            <span className="text-xs text-[#b89138]">✦</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#b89138]" />
            <Motif kind="marigold" className="h-8 w-8 text-[#8c6c23] shrink-0" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#b89138]" />
            <span className="text-xs text-[#b89138]">✦</span>
          </div>

          {/* EMOTIONAL "THANK YOU" HEADING WITH SCRIPT PRESENCE */}
          <span className="eyebrow text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.25em] uppercase text-[#8c6c23] block mb-1">
            WITH LOVE & GRATITUDE
          </span>
          <h2 className="script text-3.5xl sm:text-4.5xl text-[#8c6c23] leading-tight my-2">
            “Thank you for being part of our story.”
          </h2>

          {/* WARM PERSONAL CLOSING MESSAGE */}
          <p className="mt-3 font-serif text-xs sm:text-sm text-[#5e4d3b] max-w-md mx-auto leading-relaxed italic">
            We cannot wait to celebrate love, laughter, and lifelong memories under the Mewar sky with you.
          </p>

          <InkRule className="mx-auto my-6 opacity-75" width={180} />

          {/* COUPLE SIGNATURE */}
          <p className="script text-3.5xl sm:text-4xl text-[#8c6c23] leading-none mb-2">
            {couple.bride} &amp; {couple.groom}
          </p>

          {/* UPGRADED DATE & LOCATION TYPOGRAPHY */}
          <p className="text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.35em] font-bold text-[#7a592c] flex items-center justify-center gap-2 mt-2">
            <span className="text-[#b89138] text-xs">✦</span>
            <span>UDAIPUR, RAJASTHAN &nbsp;•&nbsp; FEBRUARY 12–15, 2027</span>
            <span className="text-[#b89138] text-xs">✦</span>
          </p>

          {/* INTERACTIVE SATISFYING ROYAL WAX SEAL */}
          <div className="relative mt-8">
            <motion.button
              type="button"
              onClick={handleSealTap}
              whileHover={reduced ? {} : { scale: 1.1, rotate: 6 }}
              animate={tapped ? { scale: [1, 1.25, 0.95, 1.08, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.35 }}
              aria-label="Tap royal seal to celebrate"
              className="relative mx-auto grid h-15 w-15 place-items-center rounded-full cursor-pointer select-none border-2 border-[#fce6a6]/60 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b89138]"
              style={{
                background: "radial-gradient(circle at 34% 30%, #fce6a6, #b89138 65%, #8c6c23 100%)",
                boxShadow: "0 8px 22px -6px rgba(140, 108, 35, 0.5), inset 0 1.5px 2px rgba(255, 255, 255, 0.7)",
              }}
            >
              {/* GOLDEN RIPPLE EFFECT ON TAP */}
              {tapped && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-[#d4aa3b] pointer-events-none"
                />
              )}
              <span className="script text-2xl font-bold text-[#3a2b1c] drop-shadow-xs pointer-events-none">AV</span>
            </motion.button>

            {/* INTERACTIVE SATISFYING TOAST NOTE */}
            <AnimatePresence>
              {toastText && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -top-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FAF5EB] border border-[#b89138]/60 px-4 py-1.5 shadow-md z-20 pointer-events-none"
                >
                  <span className="font-serif text-xs font-bold text-[#8c6c23] tracking-wide">
                    {toastText}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
