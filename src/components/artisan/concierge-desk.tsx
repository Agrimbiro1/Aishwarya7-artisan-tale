import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import { contacts } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { Motif, SectionTitle } from "./atoms";

// LINE-ART ICON MAPPER FOR CONTACT METHODS WITH IDLE MICRO-ANIMATIONS
const contactIconMap: Record<
  string,
  {
    component: (props: { className?: string }) => React.ReactNode;
    animate: Record<string, any>;
    transition: Record<string, any>;
  }
> = {
  phone: {
    component: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    animate: { rotate: [-5, 5, -5] },
    transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
  },
  chat: {
    component: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.5 12h.01M12 12h.01M14.5 12h.01" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    animate: { scale: [1, 1.08, 1] },
    transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
  },
  envelope: {
    component: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 6-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    animate: { y: [0, -2.5, 0] },
    transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
  },
  calendar: {
    component: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    animate: { rotate: [-4, 4, -4] },
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

export function ConciergeDesk() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      {/* BACKGROUND GRAIN & FLORAL WATERCOLOR ACCENT */}
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-16 -left-20 w-80 opacity-25 mix-blend-multiply select-none"
      />

      <div className="relative mx-auto max-w-3xl z-10">
        {/* NON-REDUNDANT SUBTITLE IN SECTION TITLE */}
        <SectionTitle eyebrow="Write to us" title="Concierge Desk" script="Reach out anytime" />

        {/* ENTRANCE CONTAINER WITH SOFT DIFFUSED 3D DROP SHADOW */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 group relative"
        >
          {/* DECKLE EDGE PAPER CARD BASE WITH ENHANCED 3D DEPTH SHADOW */}
          <div className="deckle-edge card-sand-texture absolute inset-0 rounded-2xl bg-[#fffdf8] border-2 border-[#b89138]/45 shadow-[0_24px_55px_-12px_rgba(184,145,56,0.28)] pointer-events-none transition-all duration-500 group-hover:shadow-[0_32px_70px_-10px_rgba(184,145,56,0.38)]" />

          {/* CARD SURFACE CONTENT */}
          <div className="grain relative z-10 p-6 sm:p-12 rounded-2xl flex flex-col text-center">
            {/* HEADER: HAND-DRAWN ROYAL BRASS BELL ICON WITH SUBTLE SWAY */}
            <div className="mx-auto mb-3 flex items-center justify-center">
              <motion.div
                animate={reduced ? {} : { rotate: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
                className="h-14 w-14 rounded-full bg-[#faf3e8] border-2 border-[#b89138]/60 shadow-md flex items-center justify-center text-[#8c6c23]"
              >
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 overflow-visible">
                  {/* Royal Bell Finial */}
                  <path d="M16 3v3" strokeLinecap="round" />
                  <circle cx="16" cy="3" r="1.5" fill="#d4aa3b" stroke="#8c6c23" strokeWidth="0.8" />
                  {/* Bell Body */}
                  <path
                    d="M 9 20 C 9 12, 23 12, 23 20 C 24.5 20, 26 21.5, 26 23 L 6 23 C 6 21.5, 7.5 20, 9 20 Z"
                    fill="#fce6a6"
                    fillOpacity="0.6"
                    stroke="#8c6c23"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Clapper */}
                  <circle cx="16" cy="25" r="2" fill="#8c6c23" />
                  {/* Sound Wave Accent */}
                  <path d="M4 17 Q2 19 4 21" stroke="#b89138" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M28 17 Q30 19 28 21" stroke="#b89138" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </div>

            {/* HEADER HEADING & SUBTEXT */}
            <h3 className="script text-3.5xl sm:text-4xl text-[#8c6c23] leading-none mb-2">
              At Your Service
            </h3>
            <p className="text-xs sm:text-sm text-[#5e4d3b] max-w-md mx-auto leading-relaxed font-serif">
              Reach us anytime — for a room, a ride from the airport, or simply a friendly voice to talk to.
            </p>

            {/* PROMINENT ROYAL DIVIDER WITH MARIGOLD MONOGRAM & DUAL LOTUS BULLETS */}
            <div className="flex items-center justify-center gap-3 my-7 max-w-sm mx-auto">
              <span className="text-[0.65rem] text-[#b89138]">✦</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b89138]/60 to-[#b89138]" />
              <Motif kind="marigold" className="h-5 w-5 text-[#b89138] shrink-0" />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#b89138] via-[#b89138]/60 to-transparent" />
              <span className="text-[0.65rem] text-[#b89138]">✦</span>
            </div>

            {/* CONTACT METHOD GRID (2x2 ON DESKTOP/TABLET, 1-COLUMN ON MOBILE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-1 text-left">
              {contacts.map((contact, idx) => {
                const iconKey = contact.icon ?? "phone";
                const iconConfig = contactIconMap[iconKey] ?? contactIconMap["phone"]!;
                const IconComponent = iconConfig.component;
                const isLink = Boolean(contact.href);

                const CardWrapper = isLink ? motion.a : motion.div;
                const linkProps = isLink
                  ? {
                      href: contact.href!,
                      target: contact.href?.startsWith("https") ? "_blank" : undefined,
                      rel: contact.href?.startsWith("https") ? "noopener noreferrer" : undefined,
                    }
                  : {};

                return (
                  <CardWrapper
                    key={contact.label}
                    {...linkProps}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : idx * 0.08 }}
                    whileHover={isLink && !reduced ? { y: -3, scale: 1.018 } : {}}
                    whileTap={isLink && !reduced ? { scale: 0.97 } : {}}
                    className={`group/cell grain card-sand-texture relative flex items-center gap-3.5 p-4 sm:p-4.5 rounded-xl border-2 overflow-hidden backdrop-blur-xs transition-all duration-300 min-h-[76px] bg-[#faf5eb]/95 border-[#b89138]/35 hover:border-[#b89138]/80 hover:bg-[#fffdf9] shadow-2xs hover:shadow-md ${
                      isLink ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b89138]" : ""
                    }`}
                  >
                    {/* HANDCRAFTED HERITAGE WATERMARK MOTIF IN BOTTOM-RIGHT CORNER */}
                    <div className="absolute -right-2 -bottom-2 opacity-[0.06] pointer-events-none z-0">
                      <Motif kind={idx % 2 === 0 ? "lotus" : "marigold"} className="h-14 w-14 text-[#b89138]" />
                    </div>

                    {/* ICON CONTAINER WITH IDLE MICRO-ANIMATION & SMOOTH HOVER BOUNCE */}
                    <div className="relative z-10 h-10.5 w-10.5 sm:h-11.5 sm:w-11.5 rounded-full border border-[#b89138]/50 bg-[#fffdf8] flex items-center justify-center text-[#8c6c23] shadow-2xs group-hover/cell:border-[#b89138] group-hover/cell:bg-[#8c6c23] group-hover/cell:text-[#fffdf9] transition-all duration-300 shrink-0">
                      <motion.div
                        animate={reduced ? {} : iconConfig.animate}
                        transition={reduced ? {} : iconConfig.transition}
                        whileHover={isLink && !reduced ? { scale: 1.18, rotate: 6 } : {}}
                      >
                        <IconComponent className="h-5 w-5 stroke-[1.7]" />
                      </motion.div>
                    </div>

                    {/* TEXT CONTENT: LABEL & HIGH-CONTRAST LEGIBLE VALUE */}
                    <div className="relative z-10 flex-1 min-w-0">
                      <span className="eyebrow text-[0.6rem] sm:text-[0.62rem] font-bold tracking-[0.2em] uppercase text-[#8c6c23] block leading-none mb-1">
                        {contact.label}
                      </span>
                      <span className="font-serif text-xs sm:text-[0.88rem] font-bold text-[#3a2b1c] tracking-normal block truncate group-hover/cell:text-[#8c6c23] transition-colors duration-200">
                        {contact.value}
                      </span>
                    </div>

                    {/* REPLACED GENERIC ARROW WITH ARTISAN LOTUS GEM BULLET */}
                    {isLink && (
                      <span className="relative z-10 text-[0.65rem] text-[#b89138]/70 group-hover/cell:text-[#8c6c23] group-hover/cell:scale-125 transition-all duration-200 shrink-0">
                        ✦
                      </span>
                    )}
                  </CardWrapper>
                );
              })}
            </div>

            {/* ELEVATED FOOTER SIGNATURE WITH DATE & LOTUS GEM STAMP */}
            <div className="mt-9 pt-5 flex flex-col items-center justify-center gap-1.5 border-t border-[#b89138]/25">
              <p className="script text-3xl sm:text-3.5xl text-[#8c6c23] leading-none">
                Aanya & Vihaan
              </p>
              <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] font-bold text-[#7a592c] flex items-center justify-center gap-2 mt-1">
                <span className="text-[#b89138]">✦</span>
                <span>UDAIPUR • FEBRUARY 12–15, 2027</span>
                <span className="text-[#b89138]">✦</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
