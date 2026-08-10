import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, AnimatePresence } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import mapImg from "@/assets/hand-map.jpg";

// KEY MAP LOCATION PINS & PATH DATA
export interface MapLocationPin {
  id: string;
  label: string;
  x: number; // percentage X on map canvas (0 - 100)
  y: number; // percentage Y on map canvas (0 - 100)
  badge: string;
  intro: string;
  body: string;
}

export const MAP_LOCATIONS: MapLocationPin[] = [
  {
    id: "accommodation",
    label: "Jagat Niwas Haveli (Venue)",
    x: 48,
    y: 42,
    badge: "✦ VENUE • MALHOTRA–RATHORE",
    intro: "Ah, Khamma Ghani! Welcome to the royal Jagat Niwas Haveli on the serene shores of Lake Pichola.",
    body: "Lakeside Haveli with private rooms, heritage courtyards, and rooftop dining for all wedding guests.",
  },
  {
    id: "air",
    label: "Maharana Pratap Airport (UDR)",
    x: 82,
    y: 22,
    badge: "📍 22 KM • UDR AIRPORT",
    intro: "The iron birds land at Dabok! A scenic 22 km carriage ride through the Mewar hills awaits you.",
    body: "Udaipur Airport (UDR) connects daily to Delhi, Mumbai, Jaipur, and Bengaluru. Hourly wedding shuttles are arranged.",
  },
  {
    id: "rail",
    label: "Udaipur City Railway Station",
    x: 28,
    y: 72,
    badge: "🚆 5 KM • CITY JN",
    intro: "The Mewar Express arrives at dawn! Just 5 km from our haveli gates along the lake road.",
    body: "Direct trains available from Delhi (Mewar Exp), Mumbai (BDTS UDR Exp), and Ahmedabad. Pre-booked cabs available at platform 1.",
  },
  {
    id: "concierge",
    label: "24/7 Hospitality Desk",
    x: 52,
    y: 78,
    badge: "✦ SERVICE • 24/7 HELPLINE",
    intro: "Hukum, our royal attendants are at your service day & night for any assistance!",
    body: "24/7 Concierge Desk located in the Haveli Main Lobby. Assistance with luggage, local tours, and emergency medical support.",
  },
];

// DARBAAN (RAJASTHANI GATEKEEPER) SVG ILLUSTRATED CHARACTER COMPONENT
function DarbaanCharacter({
  isWalking,
  isBowing,
  idleAnimationIndex,
  direction = 1,
}: {
  isWalking: boolean;
  isBowing: boolean;
  idleAnimationIndex: number;
  direction?: number; // 1 for right, -1 for left
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-end pointer-events-auto cursor-pointer"
      style={{ transformOrigin: "bottom center" }}
      animate={
        isBowing
          ? { rotate: [0, 12, 0], y: [0, 2, 0] }
          : isWalking
          ? { y: [0, -5, 0] }
          : idleAnimationIndex === 0
          ? { y: [0, -2.5, 0] }
          : idleAnimationIndex === 1
          ? { rotate: [0, -2, 0] }
          : { scaleY: [1, 1.03, 1] }
      }
      transition={
        isBowing
          ? { duration: 0.5, ease: "easeOut" }
          : isWalking
          ? { repeat: Infinity, duration: 0.25, ease: "easeInOut" }
          : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
      }
    >
      <div style={{ transform: `scaleX(${direction})` }}>
        <svg viewBox="0 0 60 80" className="h-14 w-11 drop-shadow-md overflow-visible">
          {/* ROYAL STAFF / SPEAR */}
          <motion.g
            animate={isWalking ? { rotate: [-6, 6, -6] } : idleAnimationIndex === 1 ? { rotate: [-8, 4, -8] } : {}}
            transition={{ repeat: Infinity, duration: isWalking ? 0.25 : 2 }}
            style={{ transformOrigin: "12px 65px" }}
          >
            <line x1="8" y1="5" x2="8" y2="75" stroke="#b89138" strokeWidth="2.5" strokeLinecap="round" />
            {/* Gold Spear Finial */}
            <polygon points="8,1 12,8 8,14 4,8" fill="#8c6c23" stroke="#b89138" strokeWidth="0.8" />
            <circle cx="8" cy="18" r="2.5" fill="#d4aa3b" />
          </motion.g>

          {/* DARBAAN BODY: SHERWANI COAT & LEGS */}
          <g>
            {/* Legs */}
            <motion.path
              d="M 24 55 L 22 72 M 32 55 L 34 72"
              stroke="#5e4718"
              strokeWidth="3.5"
              strokeLinecap="round"
              animate={isWalking ? { d: ["M 20 55 L 26 72 M 34 55 L 28 72", "M 26 55 L 20 72 M 28 55 L 34 72"] } : {}}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
            {/* Curved Shoes (Juttis) */}
            <path d="M 18 72 Q 14 72 16 70 M 34 72 Q 38 72 36 70" stroke="#8c6c23" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Royal Sherwani Coat (Saffron & Gold) */}
            <path d="M 18 32 C 18 30, 38 30, 38 32 L 40 56 C 40 58, 16 58, 16 56 Z" fill="#e69d2d" stroke="#8c6c23" strokeWidth="1.5" />
            {/* Gold Button Sash / Angrakha overlap */}
            <path d="M 28 32 Q 24 45 20 56" stroke="#b89138" strokeWidth="2" fill="none" />
            <circle cx="27" cy="38" r="1.2" fill="#fffdf8" />
            <circle cx="25" cy="44" r="1.2" fill="#fffdf8" />
            <circle cx="23" cy="50" r="1.2" fill="#fffdf8" />

            {/* Arms & Hands */}
            <path d="M 18 34 Q 10 42 10 52" stroke="#e69d2d" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 38 34 Q 44 42 38 50" stroke="#e69d2d" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>

          {/* HEAD & ROYAL PAGDI (TURBAN) */}
          <g>
            {/* Face */}
            <ellipse cx="28" cy="22" rx="7" ry="8" fill="#f5d6aa" stroke="#8c6c23" strokeWidth="1" />

            {/* Royal Handlebar Mustache */}
            <motion.path
              d="M 22 25 Q 28 27 34 25 Q 37 22 35 20 Q 32 24 28 24 Q 24 24 21 20 Q 19 22 22 25 Z"
              fill="#3a2b1c"
              animate={idleAnimationIndex === 2 ? { rotate: [-4, 4, -4] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ transformOrigin: "28px 24px" }}
            />

            {/* Royal Pagdi (Saffron Red Turban) */}
            <path d="M 19 20 C 18 10, 38 10, 37 20 C 37 20, 28 14, 19 20 Z" fill="#d94e2b" stroke="#8c6c23" strokeWidth="1.2" />
            <path d="M 20 18 Q 28 12 36 18" stroke="#f59e0b" strokeWidth="2" fill="none" />
            {/* Turban Kalgi / Feather Ornament */}
            <path d="M 28 12 Q 28 4 31 2" stroke="#b89138" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="31" cy="2" r="1.8" fill="#d4aa3b" />
          </g>
        </svg>
      </div>

      {/* FOOTSTEP DUST PARTICLES WHILE WALKING */}
      {isWalking && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.6, y: 6 }}
          transition={{ repeat: Infinity, duration: 0.25 }}
          className="absolute -bottom-1 h-2 w-4 rounded-full bg-[#b89138]/40 blur-[1px]"
        />
      )}
    </motion.div>
  );
}

export function TravelMap({ onSelectPin }: { onSelectPin?: (pinId: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // PARALLAX MOTION VALUES (OPTIMIZED FOR 60FPS)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const bgY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const midX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const midY = useSpring(mouseY, { stiffness: 100, damping: 22 });
  const foreX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const foreY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const bgXTransform = useTransform(bgX, (v) => `${v * -4}px`);
  const bgYTransform = useTransform(bgY, (v) => `${v * -4}px`);
  const midXTransform = useTransform(midX, (v) => `${v * 8}px`);
  const midYTransform = useTransform(midY, (v) => `${v * 8}px`);
  const foreXTransform = useTransform(foreX, (v) => `${v * 14}px`);
  const foreYTransform = useTransform(foreY, (v) => `${v * 14}px`);

  // DARBAAN CHARACTER STATE MACHINE
  const [currentPinIndex, setCurrentPinIndex] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [isBowing, setIsBowing] = useState(false);
  const [idleAnimationIndex, setIdleAnimationIndex] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [direction, setDirection] = useState(1);

  // AUTO-GUIDED TOUR CONTROLLER STATE
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStopIndex, setTourStopIndex] = useState(0);

  // IDLE MICRO-ANIMATION RANDOMIZER
  useEffect(() => {
    if (isWalking || isBowing) return;
    const interval = setInterval(() => {
      setIdleAnimationIndex((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, [isWalking, isBowing]);

  // OPTIMIZED MOUSE MOVE PARALLAX (PAUSED DURING WALK FOR ZERO LAG)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || isWalking || isTourActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const offsetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    if (reduced) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // NAVIGATE DARBAAN TO TARGET PIN (HARDWARE ACCELERATED & SMOOTH)
  const navigateToPin = (targetIndex: number) => {
    if (targetIndex === currentPinIndex && showSpeechBubble) return;

    // Reset mouse parallax during walking for zero stutter
    mouseX.set(0);
    mouseY.set(0);

    const currentPin: MapLocationPin = MAP_LOCATIONS[currentPinIndex] ?? MAP_LOCATIONS[0]!;
    const targetPin: MapLocationPin = MAP_LOCATIONS[targetIndex] ?? MAP_LOCATIONS[0]!;

    // Determine direction (walking left or right)
    setDirection(targetPin.x >= currentPin.x ? 1 : -1);
    setShowSpeechBubble(false);

    if (reduced) {
      setCurrentPinIndex(targetIndex);
      setShowSpeechBubble(true);
      if (onSelectPin) onSelectPin(targetPin.id);
      return;
    }

    setIsWalking(true);

    // Smooth walking duration
    setTimeout(() => {
      setIsWalking(false);
      setCurrentPinIndex(targetIndex);
      setIsBowing(true);

      setTimeout(() => {
        setIsBowing(false);
        setShowSpeechBubble(true);
        if (onSelectPin) onSelectPin(targetPin.id);
      }, 450);
    }, 900);
  };

  // START / CONTINUE AUTO-GUIDED TOUR
  const startAutoTour = () => {
    setIsTourActive(true);
    setTourStopIndex(0);
    navigateToPin(0);
  };

  const advanceTour = () => {
    if (tourStopIndex < MAP_LOCATIONS.length - 1) {
      const nextIndex = tourStopIndex + 1;
      setTourStopIndex(nextIndex);
      navigateToPin(nextIndex);
    } else {
      endTour();
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setTourStopIndex(0);
  };

  const activePin: MapLocationPin = MAP_LOCATIONS[currentPinIndex] ?? MAP_LOCATIONS[0]!;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl p-3 sm:p-4.5 bg-[#fffdf8] border-2 border-[#b89138]/45 shadow-[0_20px_45px_-10px_rgba(184,145,56,0.22)] transition-all duration-500 hover:shadow-[0_28px_60px_-8px_rgba(184,145,56,0.32)] select-none"
    >
      {/* 2.5D PARALLAX CANVAS CONTAINER */}
      <div className="relative overflow-hidden rounded-xl bg-[#faf3e8] border border-[#b89138]/30 h-[24rem] sm:h-[30rem] lg:h-[34rem] w-full">
        
        {/* PARALLAX LAYER 1: BACKGROUND (SKY & LAKE WASH) */}
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-b from-[#fcefdc] via-[#f7e4c8] to-[#e4d2b5] transform-gpu will-change-transform"
          style={
            reduced
              ? {}
              : {
                  translateX: bgXTransform,
                  translateY: bgYTransform,
                }
          }
        />

        {/* PARALLAX LAYER 2: MIDGROUND (HAND-ILLUSTRATED MAP IMAGE & LANDMARKS) */}
        <motion.div
          className="absolute inset-0 z-10 transform-gpu will-change-transform"
          style={
            reduced
              ? {}
              : {
                  translateX: midXTransform,
                  translateY: midYTransform,
                }
          }
        >
          <img
            src={mapImg}
            alt="Hand illustrated map of Udaipur showing the wedding venues, havelis and lake"
            loading="eager"
            width={1536}
            height={1024}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103 opacity-90 mix-blend-multiply"
          />
        </motion.div>

        {/* ANIMATED VINTAGE COMPASS ROSE BADGE */}
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-3 left-3 h-10 w-10 rounded-full bg-[#fffdf8]/90 backdrop-blur-md border border-[#b89138]/60 p-1.5 shadow-md flex items-center justify-center text-[#8c6c23] z-30 pointer-events-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
            <circle cx="12" cy="12" r="9" strokeDasharray="1 2" />
            <polygon points="12 3 14.5 9.5 21 12 14.5 14.5 12 21 9.5 14.5 3 12 9.5 9.5 12 3" fill="#b89138" fillOpacity="0.25" />
            <polygon points="12 3 13.5 10 21 12 12 12" fill="#8c6c23" />
            <polygon points="12 21 10.5 14 3 12 12 12" fill="#b89138" />
          </svg>
        </motion.div>

        {/* PARALLAX LAYER 3: FOREGROUND (ILLUSTRATED ROAD PATHS & DESTINATION PINS) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none transform-gpu will-change-transform"
          style={
            reduced
              ? {}
              : {
                  translateX: foreXTransform,
                  translateY: foreYTransform,
                }
          }
        >
          {/* SVG ROAD PATH LINES BETWEEN PINS */}
          <svg className="h-full w-full absolute inset-0 pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b89138" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8c6c23" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Connecting paths */}
            <path d="M 48% 42% Q 65% 30% 82% 22%" stroke="url(#roadGrad)" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            <path d="M 82% 22% Q 55% 48% 28% 72%" stroke="url(#roadGrad)" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            <path d="M 28% 72% Q 40% 76% 52% 78%" stroke="url(#roadGrad)" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
          </svg>

          {/* MAP DESTINATION PIN MARKERS */}
          {MAP_LOCATIONS.map((pin, idx) => {
            const isActive = idx === currentPinIndex;
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => navigateToPin(idx)}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer focus:outline-none z-30"
                aria-label={`Guide Darbaan to ${pin.label}`}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.2, 1] } : { scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: isActive ? 1.5 : 3 }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full border shadow-md backdrop-blur-sm transition-all duration-300 ${
                    isActive
                      ? "bg-[#8c6c23] text-[#fffdf9] border-[#fce6a6] ring-2 ring-[#b89138]/60 shadow-lg"
                      : "bg-[#fffdf8]/92 text-[#5e4718] border-[#b89138]/50 hover:bg-[#8c6c23] hover:text-[#fffdf9]"
                  }`}
                >
                  <span className="text-[0.65rem]">✦</span>
                  <span className="text-[0.58rem] sm:text-[0.62rem] font-bold tracking-wider uppercase whitespace-nowrap">
                    {pin.id === "accommodation" ? "Haveli Venue" : pin.id === "air" ? "Airport" : pin.id === "rail" ? "Station" : "Concierge"}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </motion.div>

        {/* PARALLAX LAYER 4: DARBAAN GATEKEEPER CHARACTER */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <motion.div
            className="absolute pointer-events-auto transform-gpu will-change-transform"
            animate={{ left: `${activePin.x}%`, top: `${activePin.y}%` }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ transform: "translate(-50%, -85%)" }}
          >
            <DarbaanCharacter
              isWalking={isWalking}
              isBowing={isBowing}
              idleAnimationIndex={idleAnimationIndex}
              direction={direction}
            />
          </motion.div>
        </div>

        {/* DOCKED UNCLIPPED DARBAAN GUIDE CALLOUT CARD (ANCHORED AT BOTTOM OF MAP, 100% UNCLIPPED & READABLE) */}
        <AnimatePresence>
          {showSpeechBubble && !isWalking && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-40 p-3 sm:p-4 rounded-xl bg-[#fffdf8]/98 backdrop-blur-md border-2 border-[#b89138]/60 shadow-2xl pointer-events-auto"
              aria-live="polite"
            >
              {/* TOP HEADER BAR */}
              <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#b89138]/25">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">👑</span>
                  <span className="script text-xl text-[#8c6c23] leading-none">Darbaan's Guide</span>
                  <span className="stamp ml-1.5 px-2 py-0.5 text-[0.56rem] font-bold tracking-wider uppercase text-[#5e4718] bg-[#f7eedc] border border-[#b89138]/40 rounded-full">
                    {activePin.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isTourActive && (
                    <span className="text-[0.58rem] font-bold uppercase tracking-wider text-[#8c6c23]">
                      Stop {tourStopIndex + 1} / {MAP_LOCATIONS.length}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSpeechBubble(false)}
                    className="text-xs font-bold text-[#7a592c]/70 hover:text-[#3a2b1c] px-1.5 py-0.5 rounded-full hover:bg-[#b89138]/10 focus:outline-none transition-colors cursor-pointer"
                    aria-label="Close guide message"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* CHARACTER QUOTE & BODY INFO */}
              <p className="text-[0.72rem] sm:text-xs italic text-[#8c6c23] mb-1 font-serif leading-snug">
                "{activePin.intro}"
              </p>
              <p className="text-[0.68rem] sm:text-[0.78rem] text-[#5e4d3b] leading-relaxed">
                {activePin.body}
              </p>

              {/* AUTO TOUR NEXT CONTROLLER INSIDE DOCKED CARD */}
              {isTourActive && (
                <div className="mt-2.5 pt-2 border-t border-[#b89138]/30 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {MAP_LOCATIONS.map((loc, i) => (
                      <span
                        key={loc.id}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === tourStopIndex ? "w-5 bg-[#8c6c23]" : "w-1.5 bg-[#b89138]/30"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={advanceTour}
                      className="px-3 py-1 rounded-full bg-[#8c6c23] text-[#fffdf9] text-[0.6rem] font-bold uppercase tracking-wider hover:bg-[#6e5318] shadow-2xs transition-colors cursor-pointer"
                    >
                      {tourStopIndex < MAP_LOCATIONS.length - 1 ? "Next Stop ➔" : "Finish Tour ✦"}
                    </button>
                    <button
                      type="button"
                      onClick={endTour}
                      className="px-2 py-1 text-[0.58rem] uppercase font-bold text-[#7a592c] hover:underline cursor-pointer"
                    >
                      End Tour
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAP OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/25 via-transparent to-transparent pointer-events-none z-20" />
      </div>

      {/* MAP FOOTER: CAPTION & INTERACTIVE TOUR MAP BUTTON */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 relative z-30">
        <div>
          <p className="script text-2.5xl text-[#8c6c23] leading-none">Mewar, in ink</p>
          <p className="text-[0.62rem] uppercase tracking-widest text-[#7a592c]/80 mt-1">
            2.5D Living Diorama Map • Tap any pin to guide Darbaan
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isTourActive && (
            <span className="stamp px-3 py-1 text-[0.58rem] tracking-wider uppercase font-bold text-[#5e4718] bg-[#f7eedc] border border-[#b89138]/40 rounded-full shadow-2xs">
              Stop {tourStopIndex + 1} / {MAP_LOCATIONS.length} ✦
            </span>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-[1.5px] rounded-full bg-gradient-to-r from-[#b89138] via-[#fce6a6] via-[#d4aa3b] to-[#8c671e] shadow-xs hover:shadow-md transition-shadow duration-300"
          >
            <button
              type="button"
              onClick={isTourActive ? endTour : startAutoTour}
              className="px-4 py-1.5 rounded-full bg-[#fffdf8] text-[0.62rem] tracking-[0.25em] font-bold uppercase text-[#8c6c23] hover:bg-[#8c6c23] hover:text-[#fffdf9] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isTourActive ? "END TOUR ✕" : "TOUR MAP ✦"}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
