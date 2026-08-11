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
export function DarbaanCharacter({
  isWalking,
  isBowing,
  idleAnimationIndex,
  direction = 1,
  className = "h-20 w-16 sm:h-24 sm:w-20",
}: {
  isWalking: boolean;
  isBowing: boolean;
  idleAnimationIndex: number;
  direction?: number; // 1 for right, -1 for left
  className?: string;
}) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-end pointer-events-auto cursor-pointer"
      style={{ transformOrigin: "bottom center" }}
      animate={
        isBowing
          ? { rotate: [0, 14, 0], y: [0, 3, 0] }
          : isWalking
          ? { y: [0, -6, 0] }
          : idleAnimationIndex === 0
          ? { y: [0, -3, 0] }
          : idleAnimationIndex === 1
          ? { rotate: [0, -3, 0] }
          : { scaleY: [1, 1.04, 1] }
      }
      transition={
        isBowing
          ? { duration: 0.55, ease: "easeOut" }
          : isWalking
          ? { repeat: Infinity, duration: 0.25, ease: "easeInOut" }
          : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
      }
    >
      <div style={{ transform: `scaleX(${direction})` }}>
        <svg viewBox="0 0 70 95" className={`${className} drop-shadow-[0_8px_16px_rgba(60,40,15,0.3)] overflow-visible`}>
          <defs>
            <linearGradient id="darbaanPagdiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e64a19" />
              <stop offset="50%" stopColor="#d94e2b" />
              <stop offset="100%" stopColor="#b71c1c" />
            </linearGradient>
            <linearGradient id="darbaanSherwaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e69d2d" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="darbaanSpearGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fce6a6" />
              <stop offset="50%" stopColor="#d4aa3b" />
              <stop offset="100%" stopColor="#8c6c23" />
            </linearGradient>
          </defs>

          {/* GROUND SHADOW ELLIPSE */}
          <ellipse cx="35" cy="88" rx="20" ry="4" fill="#3a2512" opacity="0.22" />

          {/* ROYAL STAFF / SPEAR */}
          <motion.g
            animate={isWalking ? { rotate: [-6, 6, -6] } : idleAnimationIndex === 1 ? { rotate: [-8, 4, -8] } : {}}
            transition={{ repeat: Infinity, duration: isWalking ? 0.25 : 2 }}
            style={{ transformOrigin: "14px 75px" }}
          >
            {/* Spear Pole */}
            <line x1="12" y1="6" x2="12" y2="88" stroke="url(#darbaanSpearGold)" strokeWidth="3" strokeLinecap="round" />
            {/* Gold Spear Finial Tip */}
            <polygon points="12,1 17,9 12,16 7,9" fill="#d4aa3b" stroke="#8c6c23" strokeWidth="1" />
            <polygon points="12,3 15,9 12,14 9,9" fill="#fff5cc" />
            <circle cx="12" cy="21" r="3" fill="#c0392b" stroke="#8c6c23" strokeWidth="0.8" />
            {/* Decorative Tassel Cord */}
            <path d="M 12 24 C 8 28 6 34 8 40 M 12 24 C 16 28 18 34 16 40" stroke="#c0392b" strokeWidth="1.2" fill="none" />
            <circle cx="8" cy="40" r="1.5" fill="#d4aa3b" />
            <circle cx="16" cy="40" r="1.5" fill="#d4aa3b" />
          </motion.g>

          {/* DARBAAN BODY: LEGS & MOJRI SHOES */}
          <g>
            {/* Legs */}
            <motion.path
              d="M 28 64 L 26 84 M 42 64 L 44 84"
              stroke="#5e4718"
              strokeWidth="4"
              strokeLinecap="round"
              animate={isWalking ? { d: ["M 23 64 L 30 84 M 45 64 L 38 84", "M 30 64 L 23 84 M 38 64 L 45 84"] } : {}}
              transition={{ repeat: Infinity, duration: 0.25 }}
            />
            {/* Curved Royal Mojri Shoes with Embroidered Toe Curls */}
            <path d="M 22 84 Q 16 84 18 81 C 20 79 24 82 28 84 Z" fill="#8c6c23" stroke="#5e4718" strokeWidth="1" />
            <path d="M 40 84 Q 46 84 44 81 C 42 79 38 82 34 84 Z" fill="#8c6c23" stroke="#5e4718" strokeWidth="1" />
            <path d="M 17 82 Q 13 80 16 78" stroke="#d4aa3b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 45 82 Q 49 80 46 78" stroke="#d4aa3b" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Royal Sherwani Coat (Saffron Amber with Embroidered Gold Trims) */}
            <path d="M 22 36 C 22 33, 48 33, 48 36 L 51 66 C 51 69, 19 69, 19 66 Z" fill="url(#darbaanSherwaniGrad)" stroke="#8c6c23" strokeWidth="1.8" />
            {/* Embroidered Gold Border Hem */}
            <path d="M 19 64 C 25 67, 45 67, 51 64" stroke="#d4aa3b" strokeWidth="2" fill="none" />
            {/* Gold Button Angrakha Sash Overlap */}
            <path d="M 36 36 Q 30 52 24 66" stroke="#b89138" strokeWidth="2.5" fill="none" />
            <circle cx="34" cy="43" r="1.5" fill="#fffdf8" stroke="#8c6c23" strokeWidth="0.8" />
            <circle cx="31" cy="50" r="1.5" fill="#fffdf8" stroke="#8c6c23" strokeWidth="0.8" />
            <circle cx="28" cy="57" r="1.5" fill="#fffdf8" stroke="#8c6c23" strokeWidth="0.8" />

            {/* Royal Waist Patka / Sash */}
            <path d="M 21 53 Q 35 57 49 53 L 48 57 Q 35 61 22 57 Z" fill="#c0392b" stroke="#8c6c23" strokeWidth="1" />
            <path d="M 38 56 L 41 68 L 36 68 Z" fill="#c0392b" stroke="#8c6c23" strokeWidth="1" />
            <line x1="36" y1="68" x2="41" y2="68" stroke="#d4aa3b" strokeWidth="2" strokeDasharray="1 1" />

            {/* Arms & Hands */}
            <path d="M 22 38 Q 12 48 12 60" stroke="#e69d2d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 48 38 Q 56 48 48 58" stroke="#e69d2d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="60" r="2.5" fill="#f5d6aa" />
            <circle cx="48" cy="58" r="2.5" fill="#f5d6aa" />
          </g>

          {/* HEAD & ROYAL MULTI-LAYERED TURBAN (PAGDI) */}
          <g>
            {/* Neck */}
            <rect x="31" y="30" width="8" height="6" fill="#f5d6aa" stroke="#8c6c23" strokeWidth="0.8" />

            {/* Face */}
            <ellipse cx="35" cy="24" rx="8.5" ry="9.5" fill="#f5d6aa" stroke="#8c6c23" strokeWidth="1.2" />

            {/* Royal Red Tilak / Bindi Mark */}
            <path d="M 35 17 L 36.5 20 L 35 21 L 33.5 20 Z" fill="#c0392b" />

            {/* Expressive Royal Eyes */}
            <circle cx="31.5" cy="22" r="1.2" fill="#2c1c0e" />
            <circle cx="38.5" cy="22" r="1.2" fill="#2c1c0e" />

            {/* PROMINENT ROYAL RAJASTHANI HANDLEBAR MUSTACHE */}
            <motion.path
              d="M 27 28 Q 35 31 43 28 Q 47 24 45 22 Q 41 27 35 27 Q 29 27 25 22 Q 23 24 27 28 Z"
              fill="#2c1c0e"
              stroke="#1a1008"
              strokeWidth="0.5"
              animate={idleAnimationIndex === 2 ? { rotate: [-4, 4, -4] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ transformOrigin: "35px 27px" }}
            />

            {/* RICH MULTI-LAYERED PAGDI (ROYAL SAFFRON & CRIMSON TURBAN) */}
            <path d="M 23 22 C 22 9, 48 9, 47 22 C 47 22, 35 15, 23 22 Z" fill="url(#darbaanPagdiGrad)" stroke="#8c6c23" strokeWidth="1.5" />
            {/* Turban Swirl Band Lines */}
            <path d="M 24 20 Q 35 12 46 20" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
            <path d="M 26 17 Q 35 10 44 17" stroke="#ffd54f" strokeWidth="1.8" fill="none" />
            <path d="M 28 14 Q 35 8 42 14" stroke="#c0392b" strokeWidth="1.5" fill="none" />

            {/* Royal Gold Kalgi / Feather Brocade Ornament */}
            <path d="M 35 11 Q 35 2 39 0" stroke="#d4aa3b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="39" cy="0" r="2.5" fill="#d4aa3b" stroke="#8c6c23" strokeWidth="0.8" />
            <circle cx="39" cy="0" r="1" fill="#c0392b" />
          </g>
        </svg>
      </div>

      {/* FOOTSTEP DUST PARTICLES WHILE WALKING */}
      {isWalking && (
        <motion.div
          initial={{ opacity: 0.8, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.6, y: 8 }}
          transition={{ repeat: Infinity, duration: 0.25 }}
          className="absolute -bottom-1 h-2.5 w-6 rounded-full bg-[#b89138]/40 blur-[1px]"
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
