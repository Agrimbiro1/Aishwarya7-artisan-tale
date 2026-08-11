import confetti from "canvas-confetti";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import floral from "@/assets/floral-spray.png";
import { Motif, SectionTitle } from "./atoms";
import { DarbaanCharacter } from "./travel-map";

export function RsvpSection() {
  const reduced = useReducedMotion();
  const [accepted, setAccepted] = useState(false);
  const [btnPulse, setBtnPulse] = useState(false);

  // DARBAAN SCENE ANIMATION STATES
  const [isWalking, setIsWalking] = useState(false);
  const [isBowing, setIsBowing] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);

  const handleAccept = () => {
    if (accepted) return;

    // TODO: log RSVP acceptance to backend / analytics if endpoint exists

    // Step 1: Button scale pulse
    setBtnPulse(true);
    setTimeout(() => setBtnPulse(false), 200);

    // Step 2: Golden sparkle celebration burst
    try {
      confetti({
        particleCount: 65,
        spread: 90,
        origin: { y: 0.72 },
        colors: ["#d4aa3b", "#b89138", "#fce6a6", "#e87a90", "#8c6c23"],
        scalar: 1.2,
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }

    setAccepted(true);

    if (reduced) {
      setIsBowing(true);
      setShowSpeech(true);
      setTimeout(() => setIsBowing(false), 600);
      return;
    }

    // Step 3: Gatekeeper walk entrance -> bow -> speech bubble
    setIsWalking(true);
    setTimeout(() => {
      setIsWalking(false);
      setIsBowing(true);
      setTimeout(() => {
        setIsBowing(false);
        setShowSpeech(true);
      }, 600);
    }, 1100);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      {/* BACKGROUND GRAIN & FLORAL WATERCOLOR ACCENT */}
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-16 -right-20 w-80 opacity-25 mix-blend-multiply select-none"
      />

      <div className="relative mx-auto max-w-2xl z-10">
        {/* SECTION HEADER */}
        <SectionTitle
          eyebrow="Will You Join Us?"
          title="RSVP"
          script="A Royal Invitation"
        />

        {/* RSVP CARD CONTAINER WITH SPACIOUS BREATHING ROOM */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20 group relative"
        >
          {/* DECKLE EDGE PAPER CARD BASE WITH ENHANCED 3D LIFTED DIFFUSED SHADOW & SAND TEXTURE */}
          <div className="deckle-edge card-sand-texture absolute inset-0 rounded-2xl bg-[#fffdf8] border-2 border-[#b89138]/45 shadow-[0_36px_90px_-16px_rgba(60,40,15,0.35),0_16px_36px_rgba(184,145,56,0.25)] pointer-events-none transition-all duration-500 group-hover:shadow-[0_45px_100px_-14px_rgba(60,40,15,0.42)]" />

          {/* CARD SURFACE CONTENT */}
          <div className="grain relative z-10 p-10 sm:p-16 rounded-2xl flex flex-col items-center text-center overflow-hidden">
            {/* ORGANIC FILIGREE INNER FRAME WITH BOTANICAL CORNER FLOURISHES */}
            <div className="pointer-events-none absolute inset-3.5 sm:inset-5 rounded-xl border border-[#b89138]/35" aria-hidden="true" />
            <div className="pointer-events-none absolute top-3 sm:top-4.5 left-3.5 sm:left-5 text-[#b89138]/70 text-sm select-none">✦</div>
            <div className="pointer-events-none absolute top-3 sm:top-4.5 right-3.5 sm:right-5 text-[#b89138]/70 text-sm select-none">✦</div>
            <div className="pointer-events-none absolute bottom-3 sm:bottom-4.5 left-3.5 sm:left-5 text-[#b89138]/70 text-sm select-none">✦</div>
            <div className="pointer-events-none absolute bottom-3 sm:bottom-4.5 right-3.5 sm:right-5 text-[#b89138]/70 text-sm select-none">✦</div>

            {/* TOP CONTEXT LINE TO VISUALLY CONNECT HEADER TO CARD */}
            <p className="eyebrow text-[0.62rem] sm:text-xs font-bold tracking-[0.32em] uppercase text-[#8c6c23] mb-3">
              ✦ WITH JOYFUL HEARTS &amp; OUR WARMEST INVITATION ✦
            </p>

            {/* TOP-CENTER REVISED REGAL MARIGOLD & DUAL FLOURISH ORNAMENT */}
            <div className="mx-auto mb-6 flex items-center justify-center gap-4 text-[#b89138]">
              <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-r from-transparent via-[#b89138] to-[#b89138]" />
              <Motif kind="marigold" className="h-11 w-11 sm:h-13 sm:w-13 text-[#8c6c23] filter drop-shadow-sm shrink-0" />
              <span className="h-[1px] w-14 sm:w-20 bg-gradient-to-l from-transparent via-[#b89138] to-[#b89138]" />
            </div>

            {/* QUOTE SPOTLIGHT WITH SUBTLE 12% GOLD WATERMARK QUOTATION MARKS */}
            <div className="relative mb-10 sm:mb-12 max-w-lg mx-auto">
              {/* Decorative Subtle Background Quotation Mark Watermark */}
              <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 font-[family-name:var(--font-serif)] text-7xl sm:text-8xl text-[#b89138] opacity-[0.12] select-none font-light">
                “
              </div>

              {/* Refined Intimate Thin-Italic Serif Quote Typography with Warm Brown Color & Generous Line-Height */}
              <p className="font-[family-name:var(--font-serif)] text-lg sm:text-xl md:text-2xl text-[#3a2f22] font-normal leading-[1.75] italic tracking-wide relative z-10 px-4">
                "We can't wait to celebrate love, laughter, and timeless memories under the Mewar sky with you."
              </p>
            </div>

            {/* CROSSFADE BETWEEN JOYFUL ACCEPT BUTTON & DARBAAN THANK-YOU SCENE */}
            <AnimatePresence mode="wait">
              {!accepted ? (
                /* SINGLE INTERACTIVE BUTTON VIEW WITH DARBAAN IN WAITING / ANTICIPATION POSE & FOIL SHEEN STREAK */
                <motion.div
                  key="accept-button-view"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-6 my-4 relative w-full"
                >
                  {/* RADIANT GOLD FOIL BUTTON WITH CONTINUOUS SHEEN STREAK & MEDIUM-WEIGHT WARM BROWN SERIF TYPOGRAPHY */}
                  <motion.button
                    type="button"
                    onClick={handleAccept}
                    animate={btnPulse ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    whileHover={reduced ? {} : { scale: 1.04 }}
                    whileTap={reduced ? {} : { scale: 0.96 }}
                    className="px-11 py-4.5 rounded-full bg-gradient-to-r from-[#fff5cc] via-[#f7d070] to-[#e6b840] text-[#5c4a2e] font-[family-name:var(--font-serif)] font-medium text-base sm:text-lg tracking-[0.15em] uppercase shadow-[0_12px_32px_rgba(184,145,56,0.35)] hover:shadow-[0_16px_42px_rgba(184,145,56,0.48)] border-2 border-[#b89138] cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 relative z-10 overflow-hidden"
                  >
                    {/* Continuous Foil Light Sheen Streak */}
                    {!reduced && (
                      <motion.div
                        animate={{ x: ["-130%", "230%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg]"
                      />
                    )}

                    <span>Joyfully Accept</span>
                    <span className="text-sm text-[#8c6c23]">✦</span>
                  </motion.button>

                  {/* WAITING DARBAAN GATEKEEPER PEEKING AT BOTTOM CORNER FOR ANTICIPATION */}
                  <div className="flex items-end justify-center gap-3 mt-2">
                    <DarbaanCharacter
                      isWalking={false}
                      isBowing={false}
                      idleAnimationIndex={0}
                      direction={1}
                      className="h-16 w-13 sm:h-20 sm:w-16 opacity-90"
                    />
                    <span className="text-[0.62rem] eyebrow tracking-[0.16em] font-bold text-[#8c6c23] bg-[#faf5eb] px-3 py-1 rounded-full border border-[#b89138]/40 shadow-2xs mb-2">
                      Darbaan awaits your response ✦
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* DARBAAN GATEKEEPER THANK-YOU SCENE WITH ARRIVAL GLOW & DECKLE SPEECH BUBBLE */
                <motion.div
                  key="darbaan-thankyou-scene"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center text-center my-4 w-full relative z-10"
                >
                  {/* GATEKEEPER CHARACTER WITH ENTRANCE WALK, ROYAL BOW & ARRIVAL GLOW */}
                  <motion.div
                    initial={reduced ? { x: 0 } : { x: -110 }}
                    animate={{ x: 0 }}
                    transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
                    className="relative flex flex-col items-center justify-end mb-6"
                  >
                    {/* Pulsing Warm Gold Radial Arrival Glow behind Darbaan */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: [0.45, 0.85, 0.5], scale: [0.95, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                      className="absolute -bottom-2 h-20 w-36 rounded-full bg-[#fce6a6]/70 blur-xl pointer-events-none -z-10"
                    />

                    <DarbaanCharacter
                      isWalking={isWalking}
                      isBowing={isBowing}
                      idleAnimationIndex={0}
                      direction={1}
                      className="h-28 w-22 sm:h-36 sm:w-28"
                    />
                  </motion.div>

                  {/* DECKLE-EDGE FLOATING SPEECH BUBBLE WITH WARM DIALOGUE */}
                  <AnimatePresence>
                    {showSpeech && (
                      <motion.div
                        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative max-w-md w-full rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_16px_40px_-8px_rgba(60,45,25,0.28)]"
                      >
                        {/* Authentic Deckle Paper Backdrop for Speech Bubble */}
                        <div className="deckle-edge card-sand-texture absolute inset-0 rounded-2xl bg-[#fffdf8] border-2 border-[#b89138]/50 pointer-events-none" />

                        {/* Speech Bubble Tail */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-[#b89138]/50 z-10" />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[13px] border-b-[#fffdf8] z-20" />

                        {/* Subtle Reset Icon Button in Corner */}
                        <button
                          type="button"
                          title="Reset RSVP"
                          onClick={() => {
                            setAccepted(false);
                            setShowSpeech(false);
                            setIsWalking(false);
                            setIsBowing(false);
                          }}
                          className="absolute top-3.5 right-3.5 h-7 w-7 rounded-full border border-[#b89138]/40 bg-[#faf5eb] text-[#8c6c23] hover:bg-[#8c6c23] hover:text-[#fffdf8] hover:border-[#8c6c23] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-2xs z-30 opacity-60 hover:opacity-100"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6" />
                            <path d="M21.5 8A10 10 0 0 0 3.95 6.06L2.5 7.5M2.5 16a10 10 0 0 0 17.55 1.94l1.45-1.44" />
                          </svg>
                        </button>

                        {/* Content Container */}
                        <div className="relative z-20 flex flex-col items-center">
                          {/* Dialogue Headline */}
                          <h4 className="script text-3xl sm:text-4xl text-[#8c6c23] leading-snug mb-2">
                            "Khamma Ghani! 🌸"
                          </h4>

                          {/* Dialogue Body */}
                          <p className="font-serif text-base sm:text-lg text-[#3a2b1c] font-medium leading-relaxed">
                            Wonderful! The Haveli's gates are open for you. We shall see you under the Mewar sky.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ELEVATED ROYAL SIGNATURE & DATE FOOTER STAMP */}
            <div className="mt-14 pt-7 flex flex-col items-center justify-center gap-2.5 border-t border-[#b89138]/35 w-full max-w-md">
              <p className="script foil-text text-4xl sm:text-5.5xl text-[#8c6c23] leading-none py-1 filter drop-shadow-[0_2px_8px_rgba(184,145,56,0.2)]">
                Aanya &amp; Vihaan
              </p>
              <div className="flex items-center justify-center gap-2.5 text-[#5e4718]">
                <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#b89138]" />
                <span className="eyebrow text-xs sm:text-sm font-bold tracking-[0.45em] uppercase text-[#5e4718] flex items-center gap-2">
                  UDAIPUR <span className="text-[#c0392b] text-sm font-normal filter drop-shadow-2xs">♥</span> FEBRUARY 2027
                </span>
                <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#b89138]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
