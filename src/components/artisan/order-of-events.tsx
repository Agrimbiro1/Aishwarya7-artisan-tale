import { useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { events } from "@/data/wedding";
import { SectionTitle } from "./atoms";
import haldiImg from "@/assets/event-haldi.png";
import mehendiImg from "@/assets/event-mehendi.png";
import sangeetImg from "@/assets/event-sangeet.png";
import vivaahImg from "@/assets/event-vivaah.png";
import receptionImg from "@/assets/event-reception.png";

const EASE = [0.22, 1, 0.36, 1] as const;

// 1. Haldi Watercolor Icon: Turmeric Bowl, Marigolds & Steam Wisps
function HaldiIcon({ reduced }: { reduced?: boolean | null | undefined }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block">
      <defs>
        <radialGradient id="haldiBowlGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde078" />
          <stop offset="65%" stopColor="#e5a823" />
          <stop offset="100%" stopColor="#b37c10" />
        </radialGradient>
        <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c86d4b" />
          <stop offset="100%" stopColor="#7a3419" />
        </linearGradient>
        <radialGradient id="haldiGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe680" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffe680" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground Soft Watercolor Shadow */}
      <ellipse cx="65" cy="112" rx="42" ry="8" fill="#4a321a" opacity="0.15" />
      <circle cx="65" cy="72" r="48" fill="url(#haldiGlow)" />

      {/* Terracotta Bowl Base */}
      <path d="M 30 68 Q 65 110 100 68 Z" fill="url(#terracottaGrad)" stroke="#4a321a" strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="65" cy="68" rx="35" ry="10" fill="#a85232" stroke="#4a321a" strokeWidth="2" />

      {/* Mounded Turmeric Paste */}
      <path d="M 35 67 Q 65 38 95 67 Z" fill="url(#haldiBowlGrad)" stroke="#4a321a" strokeWidth="1.8" />
      <path d="M 45 64 Q 65 46 85 64 Z" fill="#fff1a8" opacity="0.5" />

      {/* Marigold Petals Accent */}
      <circle cx="42" cy="66" r="6" fill="#f39c12" stroke="#4a321a" strokeWidth="1.2" />
      <circle cx="42" cy="66" r="3" fill="#e67e22" />
      <circle cx="88" cy="67" r="6" fill="#f39c12" stroke="#4a321a" strokeWidth="1.2" />
      <circle cx="88" cy="67" r="3" fill="#e67e22" />

      {/* Fresh Marigold Flower Laying Beside Bowl */}
      <g transform="translate(98, 88) scale(0.95)">
        <circle cx="0" cy="0" r="10" fill="#f39c12" stroke="#4a321a" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="6" fill="#e67e22" />
        <circle cx="0" cy="0" r="2.5" fill="#d35400" />
      </g>

      {/* Turmeric Smudge Marks */}
      <ellipse cx="28" cy="98" rx="7" ry="3.5" fill="#f1c40f" opacity="0.65" transform="rotate(-15 28 98)" />
      <ellipse cx="40" cy="104" rx="5" ry="2.5" fill="#f39c12" opacity="0.55" transform="rotate(10 40 104)" />

      {/* IDLE ANIMATION: Soft Rising Steam / Aroma Wisps */}
      <motion.path
        d="M 55 42 Q 50 30 58 20 T 52 8"
        stroke="#e8b938"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={reduced ? {} : { opacity: [0.2, 0.85, 0.2], y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 72 45 Q 78 33 70 23 T 76 10"
        stroke="#f39c12"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        animate={reduced ? {} : { opacity: [0.15, 0.75, 0.15], y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </svg>
  );
}

// 2. Mehendi Watercolor Icon: Decorated Henna Palm, Mandala & Foil Cone
function MehendiIcon({ reduced }: { reduced?: boolean | null | undefined }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block">
      <defs>
        <linearGradient id="palmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf0df" />
          <stop offset="100%" stopColor="#edd8b4" />
        </linearGradient>
        <linearGradient id="hennaConeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7a9a60" />
          <stop offset="60%" stopColor="#486835" />
          <stop offset="100%" stopColor="#2a421d" />
        </linearGradient>
        <linearGradient id="foilTipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4aa3b" />
          <stop offset="50%" stopColor="#fff2a8" />
          <stop offset="100%" stopColor="#aa7d1a" />
        </linearGradient>
        <radialGradient id="hennaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#92b875" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#92b875" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft Ground Shadow & Sage Backdrop Glow */}
      <ellipse cx="65" cy="112" rx="46" ry="8" fill="#2a421d" opacity="0.16" />
      <circle cx="65" cy="62" r="48" fill="url(#hennaGlow)" />

      {/* Decorated Henna Palm Hand Silhouette */}
      <g transform="translate(18, 18) scale(0.85)">
        <path
          d="M 35 105 C 32 85 28 65 32 45 C 34 35 42 35 45 45 C 47 30 55 30 58 45 C 60 28 68 28 71 45 C 73 35 80 38 80 50 C 82 65 85 85 75 105 Z"
          fill="url(#palmGrad)"
          stroke="#4a341e"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Intricate Henna Lotus & Circular Mandala on Palm */}
        <circle cx="55" cy="72" r="14" fill="none" stroke="#486835" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="55" cy="72" r="9" fill="#587a42" opacity="0.8" />
        <circle cx="55" cy="72" r="4" fill="#2a421d" />

        {/* Dots around Mandala */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={55 + 14 * Math.cos((angle * Math.PI) / 180)}
            cy={72 + 14 * Math.sin((angle * Math.PI) / 180)}
            r="2.2"
            fill="#3a5229"
          />
        ))}

        {/* Henna Ring Bands on Fingers */}
        <path d="M 33 52 L 44 54 M 46 48 L 57 50 M 59 47 L 70 49 M 72 55 L 80 57" stroke="#486835" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Trailing Paisley Mehndi Swirl Pattern with Sway Animation */}
      <motion.g
        animate={reduced ? {} : { rotate: [-3, 3, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "65px 65px" }}
      >
        <path
          d="M 28 85 C 16 65 26 40 45 46 C 58 52 52 72 40 76 C 30 79 33 92 46 96"
          stroke="#3a2512"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="42" cy="56" r="3" fill="#587a42" />
        <circle cx="32" cy="62" r="2.2" fill="#587a42" />
      </motion.g>

      {/* Henna Cone Body resting diagonally */}
      <g transform="rotate(-38 78 68)">
        <path d="M 52 38 L 88 33 L 74 98 Z" fill="url(#hennaConeGrad)" stroke="#2a421d" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 56 47 L 85 43 L 82 53 L 59 56 Z" fill="url(#foilTipGrad)" stroke="#3a2512" strokeWidth="1.2" />
        <path d="M 74 98 L 75 106 L 72 104 Z" fill="#2a3d1d" stroke="#1d2d14" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 3. Sangeet Watercolor Icon: Dhol Drum, String Lights & Flickering Diya
function SangeetIcon({ reduced }: { reduced?: boolean | null | undefined }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block">
      <defs>
        <linearGradient id="dholBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b86b3a" />
          <stop offset="50%" stopColor="#8a441d" />
          <stop offset="100%" stopColor="#57240a" />
        </linearGradient>
        <linearGradient id="dholRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4aa3b" />
          <stop offset="50%" stopColor="#fff2a8" />
          <stop offset="100%" stopColor="#997520" />
        </linearGradient>
        <radialGradient id="diyaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb84d" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffb84d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="65" cy="112" rx="46" ry="8" fill="#3a1c0b" opacity="0.18" />

      {/* Festive String Lights Arch */}
      <path d="M 18 35 Q 65 15 112 35" stroke="#d4aa3b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.7" />
      {[{ x: 30, y: 31 }, { x: 50, y: 25 }, { x: 80, y: 25 }, { x: 100, y: 31 }].map((bulb, i) => (
        <circle key={i} cx={bulb.x} cy={bulb.y} r="3.5" fill="#ffe066" stroke="#b8860b" strokeWidth="1" />
      ))}

      {/* Dhol Barrel Body */}
      <g transform="rotate(-10 65 65)">
        <ellipse cx="65" cy="62" rx="36" ry="24" fill="url(#dholBodyGrad)" stroke="#3a1c0b" strokeWidth="2.2" />
        {/* Leather End Caps */}
        <ellipse cx="31" cy="62" rx="7" ry="23.5" fill="#f4e4bc" stroke="#3a1c0b" strokeWidth="2" />
        <ellipse cx="99" cy="62" rx="7" ry="23.5" fill="#f4e4bc" stroke="#3a1c0b" strokeWidth="2" />
        {/* Metallic Hoops & Woven Lacing */}
        <path d="M 31 39 L 99 39 M 31 85 L 99 85" stroke="url(#dholRimGrad)" strokeWidth="2" />
        <path d="M 31 42 L 65 85 L 99 42 M 31 82 L 65 39 L 99 82" stroke="#d4aa3b" strokeWidth="1.3" opacity="0.85" />
      </g>

      {/* Clay Diya Lamp in Foreground */}
      <g transform="translate(88, 86)">
        <circle cx="0" cy="0" r="18" fill="url(#diyaGlow)" />
        <path d="M -12 4 Q 0 16 12 4 C 15 -2 8 -6 0 -4 C -8 -6 -15 -2 -12 4 Z" fill="#a85232" stroke="#3a1c0b" strokeWidth="1.8" />
        {/* IDLE ANIMATION: Flickering Diya Flame */}
        <motion.polygon
          points="0,-5 -4,-15 0,-24 4,-15"
          fill="#ffb84d"
          stroke="#e67e22"
          strokeWidth="1"
          animate={reduced ? {} : { scale: [1, 1.15, 0.92, 1.08, 1], opacity: [0.85, 1, 0.78, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="0" cy="-10" r="2.5" fill="#fff5cc" />
      </g>
    </svg>
  );
}

// 4. Vivaah Watercolor Icon: Royal Haveli Mandap & Sacred Fire
function VivaahIcon({ reduced }: { reduced?: boolean | null | undefined }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block">
      <defs>
        <linearGradient id="mandapGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6c265" />
          <stop offset="50%" stopColor="#b88e28" />
          <stop offset="100%" stopColor="#7a5a12" />
        </linearGradient>
        <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffaa33" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffaa33" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base Shadow */}
      <ellipse cx="65" cy="112" rx="48" ry="8" fill="#3a2810" opacity="0.18" />

      {/* Sacred Fire Aura */}
      <motion.circle
        cx="65"
        cy="88"
        r="22"
        fill="url(#fireGlow)"
        animate={reduced ? {} : { scale: [0.9, 1.12, 0.9], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Royal Mandap Pillars */}
      <path d="M 28 45 L 28 98 M 42 45 L 42 98 M 88 45 L 88 98 M 102 45 L 102 98" stroke="url(#mandapGold)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 25 98 L 105 98 M 22 102 L 108 102" stroke="#7a5a12" strokeWidth="2.5" strokeLinecap="round" />

      {/* Mandap Floral Canopy & Arch Roof */}
      <path d="M 20 48 Q 65 20 110 48 Z" fill="#d85232" stroke="#4a2e10" strokeWidth="2" />
      <path d="M 24 45 Q 65 24 106 45" stroke="url(#mandapGold)" strokeWidth="3" fill="none" />

      {/* Marigold Festoon Hanging Garlands */}
      <path d="M 28 48 Q 45 58 65 48 Q 85 58 102 48" stroke="#f39c12" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />

      {/* Central Sacred Havan Kund (Fire Pit) */}
      <path d="M 50 92 L 54 82 L 76 82 L 80 92 Z" fill="#8c4827" stroke="#3a2810" strokeWidth="1.8" />

      {/* Sacred Fire Flame */}
      <motion.path
        d="M 65 82 Q 58 72 65 62 Q 72 72 65 82 Z"
        fill="#ff9900"
        stroke="#e65c00"
        strokeWidth="1"
        animate={reduced ? {} : { scaleY: [1, 1.15, 0.95, 1], opacity: [0.85, 1, 0.8, 0.85] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="65" cy="74" r="3" fill="#ffeeaa" />
    </svg>
  );
}

// 5. Reception Watercolor Icon: Royal Haveli Gateway, Chhatri Dome & Hanging Gold Lanterns
function ReceptionIcon({ reduced }: { reduced?: boolean | null | undefined }) {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto block">
      <defs>
        <linearGradient id="receptionGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e096" />
          <stop offset="50%" stopColor="#d4aa3b" />
          <stop offset="100%" stopColor="#8a6614" />
        </linearGradient>
        <linearGradient id="haveliDome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c86d4b" />
          <stop offset="100%" stopColor="#7a3419" />
        </linearGradient>
        <radialGradient id="receptionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe699" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffe699" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base Shadow & Ambient Royal Glow */}
      <ellipse cx="65" cy="112" rx="46" ry="8" fill="#3a2b1a" opacity="0.16" />
      <circle cx="65" cy="62" r="48" fill="url(#receptionGlow)" />

      {/* Grand Royal Haveli Archway */}
      <path d="M 28 102 L 28 60 Q 65 22 102 60 L 102 102 Z" fill="#fffcf5" stroke="url(#receptionGold)" strokeWidth="2.5" />
      <path d="M 35 102 L 35 65 Q 65 32 95 65 L 95 102 Z" fill="none" stroke="#7a3419" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Royal Chhatri Dome Roof Peak */}
      <path d="M 45 32 Q 65 10 85 32 Z" fill="url(#haveliDome)" stroke="#52200c" strokeWidth="1.8" />
      <path d="M 65 10 L 65 3 S 63 0 65 0 S 67 0 65 3 Z" stroke="url(#receptionGold)" strokeWidth="2" fill="#d4aa3b" />

      {/* Hanging Ornate Gold Lantern 1 (Left) */}
      <g transform="translate(42, 54)">
        <line x1="0" y1="-12" x2="0" y2="0" stroke="#8a6614" strokeWidth="1.2" />
        <path d="M -6 0 L 6 0 L 4 14 L -4 14 Z" fill="#ffe066" stroke="#8a6614" strokeWidth="1.2" />
        <circle cx="0" cy="7" r="4" fill="#fff5cc" />
      </g>

      {/* Hanging Ornate Gold Lantern 2 (Right) */}
      <g transform="translate(88, 54)">
        <line x1="0" y1="-12" x2="0" y2="0" stroke="#8a6614" strokeWidth="1.2" />
        <path d="M -6 0 L 6 0 L 4 14 L -4 14 Z" fill="#ffe066" stroke="#8a6614" strokeWidth="1.2" />
        <circle cx="0" cy="7" r="4" fill="#fff5cc" />
      </g>

      {/* Central Royal Crest / Star Motif */}
      <circle cx="65" cy="55" r="8" fill="#d4aa3b" stroke="#7a3419" strokeWidth="1.2" />
      <circle cx="65" cy="55" r="4" fill="#fff8db" />

      {/* Rose Petals & Marigold Festoon at Base */}
      <path d="M 24 102 Q 65 110 106 102" stroke="#d4aa3b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="45" cy="104" r="3.5" fill="#e89898" />
      <circle cx="65" cy="105" r="4" fill="#f39c12" />
      <circle cx="85" cy="104" r="3.5" fill="#e89898" />

      {/* IDLE ANIMATION: Royal Sparkle Glint above Dome */}
      <motion.g
        transform="translate(65, 20)"
        animate={reduced ? {} : { scale: [0, 1.35, 0], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 0 -8 L 2.5 -2.5 L 8 0 L 2.5 2.5 L 0 8 L -2.5 2.5 L -8 0 L -2.5 -2.5 Z" fill="#fffdf0" stroke="#d4aa3b" strokeWidth="0.8" />
      </motion.g>
    </svg>
  );
}

// Event Circular Watercolor Couple Illustration Component (Reference Matched)
function EventCoupleIllustration({ motif, reduced }: { motif: string; reduced?: boolean | null | undefined }) {
  let imgSrc = haldiImg;

  switch (motif) {
    case "marigold":
      imgSrc = haldiImg;
      break;
    case "leaf":
      imgSrc = mehendiImg;
      break;
    case "sitar":
      imgSrc = sangeetImg;
      break;
    case "mandap":
      imgSrc = vivaahImg;
      break;
    case "coupe":
      imgSrc = receptionImg;
      break;
  }

  return (
    <motion.div
      whileHover={reduced ? {} : { scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative group mx-auto block"
    >
      {/* Outer Double Ornate Metallic Gold Frame */}
      <div className="relative h-44 w-44 sm:h-56 sm:w-56 rounded-full p-1.5 bg-gradient-to-b from-[#e6c265] via-[#b88e28] to-[#7a5a12] shadow-[0_10px_32px_rgba(184,145,56,0.25)] transition-shadow duration-300 group-hover:shadow-[0_14px_40px_rgba(184,145,56,0.38)]">
        {/* Inner Ring Spacer */}
        <div className="h-full w-full rounded-full p-1 bg-[#fffdf8] border-2 border-[#fffdf8] overflow-hidden relative flex items-center justify-center">
          <img
            src={imgSrc}
            alt="Event Couple Watercolor Artwork"
            className="h-full w-full object-cover object-center rounded-full transform group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* Inner Gold Vignette Border */}
          <div className="absolute inset-0 rounded-full border-4 border-[#b89138]/25 pointer-events-none" />
        </div>

        {/* Floating Corner Star Ornament */}
        <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-[#fffdf8] border border-[#b89138] flex items-center justify-center shadow-md">
          <span className="text-xs text-[#b89138]">✦</span>
        </div>
      </div>
    </motion.div>
  );
}

// Icon Resolver Component
function EventWatercolorIcon({ motif, reduced }: { motif: string; reduced?: boolean | null | undefined }) {
  return <EventCoupleIllustration motif={motif} reduced={reduced} />;
}

// Side Botanical Vine Margin Border Component
function SideBotanicalVine({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-16 bottom-16 w-8 sm:w-16 z-0 opacity-40 ${
        side === "left" ? "left-1 sm:left-4" : "right-1 sm:right-4 scale-x-[-1]"
      }`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 50 1200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`vineGrad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b89138" stopOpacity="0.15" />
            <stop offset="15%" stopColor="#b89138" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8c6c23" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#b89138" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b89138" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Central Thin Stem Line */}
        <path
          d="M 25 0 C 12 150, 38 300, 25 450 C 12 600, 38 750, 25 900 C 12 1050, 38 1150, 25 1200"
          stroke={`url(#vineGrad-${side})`}
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />

        {/* Repeating Leaf & Marigold Flower tendrils */}
        {[70, 200, 340, 480, 620, 760, 900, 1040].map((y, i) => (
          <g key={i} transform={`translate(25, ${y})`}>
            {/* Leaves */}
            <path d="M 0 0 Q -18 -12 -22 5 Q -10 12 0 0 Z" fill="#b89138" opacity="0.6" />
            <path d="M 0 0 Q 18 -12 22 5 Q 10 12 0 0 Z" fill="#b89138" opacity="0.6" />
            {/* Small Marigold Bud */}
            <circle cx={i % 2 === 0 ? "-23" : "23"} cy="6" r="3.2" fill="#f39c12" opacity="0.8" />
            <circle cx={i % 2 === 0 ? "-23" : "23"} cy="6" r="1.6" fill="#e67e22" opacity="0.9" />
            {/* Curling Spiral Tendril */}
            <path
              d={i % 2 === 0 ? "M 0 0 C -12 10 -20 18 -15 24" : "M 0 0 C 12 10 20 18 15 24"}
              stroke="#b89138"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Single Continuous Dotted Garland Thread SVG Overlay Component with Scroll-Linked Progress
function ContinuousGarlandThread({
  reduced,
  progress,
}: {
  reduced?: boolean | null | undefined;
  progress: any;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-28 bottom-20 z-0 overflow-visible block">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 1000 1600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="threadGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e6c265" />
            <stop offset="25%" stopColor="#b88e28" />
            <stop offset="50%" stopColor="#d4aa3b" />
            <stop offset="75%" stopColor="#b88e28" />
            <stop offset="100%" stopColor="#e6c265" />
          </linearGradient>
          <marker id="garland-bottom-star" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <circle cx="5" cy="5" r="4" fill="#b88e28" />
          </marker>
        </defs>

        {/* Base Faded Dashed Ribbon Path */}
        <path
          d="M 500 10 
             C 500 80, 230 110, 230 220 
             C 230 380, 770 410, 770 540 
             C 770 700, 230 730, 230 860 
             C 230 1020, 770 1050, 770 1180 
             C 770 1340, 230 1370, 230 1500 
             C 230 1570, 500 1580, 500 1600"
          stroke="url(#threadGoldGrad)"
          strokeWidth="3"
          strokeDasharray="14 8"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Scroll-Linked Active Illuminated Golden Thread Path */}
        <motion.path
          d="M 500 10 
             C 500 80, 230 110, 230 220 
             C 230 380, 770 410, 770 540 
             C 770 700, 230 730, 230 860 
             C 230 1020, 770 1050, 770 1180 
             C 770 1340, 230 1370, 230 1500 
             C 230 1570, 500 1580, 500 1600"
          stroke="url(#threadGoldGrad)"
          strokeWidth="4"
          strokeDasharray="14 8"
          strokeLinecap="round"
          markerEnd="url(#garland-bottom-star)"
          style={{ pathLength: progress }}
        />

        {/* Strung Gold Beads & Flowers attached to the thread */}
        {[
          { x: 360, y: 110 },
          { x: 500, y: 380 },
          { x: 640, y: 440 },
          { x: 500, y: 700 },
          { x: 360, y: 760 },
          { x: 500, y: 1020 },
          { x: 640, y: 1080 },
          { x: 500, y: 1340 },
          { x: 360, y: 1400 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="3.5" fill="#b89138" opacity="0.85" />
            <circle cx={pt.x} cy={pt.y} r="1.5" fill="#fff5cc" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Helper for Event Mood Color-Wash Radial Glows
function getEventGlowColor(motif: string): string {
  switch (motif) {
    case "marigold":
      return "rgba(253, 224, 120, 0.45)"; // Warm turmeric yellow
    case "leaf":
      return "rgba(146, 184, 117, 0.40)"; // Fresh sage green
    case "sitar":
      return "rgba(230, 126, 34, 0.35)"; // Festive terracotta amber
    case "mandap":
      return "rgba(216, 82, 50, 0.35)"; // Royal Haveli crimson
    case "coupe":
      return "rgba(245, 216, 152, 0.45)"; // Rose champagne gold
    default:
      return "rgba(212, 175, 55, 0.35)";
  }
}

export function OrderOfEvents() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check if user is currently inside ceremonies section
  const isSectionInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  // Scroll-linked progress tracking for thread drawing & progress indicator
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 85%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);
  const progressText = useTransform(progressPercent, (v) => `${Math.round(v)}%`);

  return (
    <section
      id="ceremonies"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Floating Viewport Progress Pill - Follows user smoothly on screen while scrolling ceremonies */}
      <AnimatePresence>
        {isSectionInView && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#fffdf8]/90 backdrop-blur-xl border border-[#b89138]/60 shadow-[0_8px_30px_rgba(184,145,56,0.25)] text-[0.65rem] sm:text-xs font-semibold tracking-widest text-[#b88e28] uppercase">
              <span className="h-2 w-2 rounded-full bg-[#b89138] animate-pulse" />
              <span>TIMELINE PROGRESS</span>
              <span className="text-[#b89138]/60">•</span>
              <motion.span className="font-mono text-[#7a592c] font-bold">
                {progressText}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Botanical Vine Margin Borders */}
      <SideBotanicalVine side="left" />
      <SideBotanicalVine side="right" />

      {/* Background Soft Warm Light Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(244, 235, 218, 0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl z-10">
        {/* 1. Header Section */}
        <div className="text-center mb-16 sm:mb-24">
          {/* Centered Top Leaf Sprig Ornament */}
          <div className="flex justify-center mb-3 text-[#b89138] opacity-85">
            <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 24 16 Q 16 10 4 12 Q 14 4 24 16 Z" fill="#b89138" opacity="0.85" />
              <path d="M 24 16 Q 32 10 44 12 Q 34 4 24 16 Z" fill="#b89138" opacity="0.85" />
              <path d="M 24 17 L 24 4" stroke="#8c6c23" strokeWidth="1.5" />
            </svg>
          </div>

          <SectionTitle
            eyebrow="FIVE DAYS OF CELEBRATION"
            title="Order of Events"
            script="The Itinerary"
          />
        </div>

        {/* 2. Events Winding Journey Sequence with Single Continuous Thread */}
        <div className="relative">
          {/* Unbroken Single Continuous Garland Thread Overlay */}
          <ContinuousGarlandThread reduced={reduced} progress={smoothProgress} />

          {events.map((event, idx) => {
            const isEven = idx % 2 === 0; // Day 1, 3, 5 = Left aligned; Day 2, 4 = Right aligned
            const dayNum = idx + 1;

            return (
              <div key={event.name} className="relative mb-24 sm:mb-32 last:mb-0">
                {/* Event-Specific Mood Color-Wash Radial Glow */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 sm:h-96 sm:w-96 rounded-full blur-3xl -z-10 opacity-70"
                  style={{
                    background: `radial-gradient(circle, ${getEventGlowColor(event.motif)} 0%, rgba(244, 235, 218, 0) 70%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Event Unit Container in True Alternating Offsets */}
                <motion.div
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: idx * 0.08, ease: EASE }}
                  className={`relative w-full sm:w-[50%] md:w-[46%] ${
                    isEven ? "mr-auto text-center sm:text-left sm:pl-2" : "ml-auto text-center sm:text-right sm:pr-2"
                  }`}
                >
                  {/* Large Ghost Numeral Watermark ("01", "02", "03", "04", "05") */}
                  <div
                    className={`pointer-events-none absolute -top-10 sm:-top-14 -z-10 select-none font-[family-name:var(--font-roman)] text-[7rem] sm:text-[11rem] font-bold tracking-tighter text-[#b89138] opacity-25 leading-none ${
                      isEven ? "left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0" : "left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0"
                    }`}
                    style={{
                      WebkitTextStroke: "1.5px rgba(184, 145, 56, 0.45)",
                      textShadow: "0 4px 20px rgba(184, 145, 56, 0.15)",
                    }}
                    aria-hidden="true"
                  >
                    {String(dayNum).padStart(2, "0")}
                  </div>

                  {/* Hanging Garland Ring Bail Clasp Attachment */}
                  <div className={`flex flex-col items-center mb-1.5 ${isEven ? "sm:items-start sm:pl-12" : "sm:items-end sm:pr-12"}`}>
                    <div className="flex flex-col items-center">
                      {/* Golden Ring Bail attached to continuous thread */}
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-[#b89138] bg-[#fffdf8] shadow-sm flex items-center justify-center">
                        <div className="h-1 w-1 rounded-full bg-[#b89138]" />
                      </div>
                      {/* Golden Hanging Cord */}
                      <div className="h-2.5 w-[1.5px] bg-gradient-to-b from-[#b89138] to-[#8c6c23]" />
                    </div>
                  </div>

                  {/* Floating Watercolor Icon suspended like a locket ornament */}
                  <div className={`mb-4 flex ${isEven ? "justify-center sm:justify-start" : "justify-center sm:justify-end"}`}>
                    <EventWatercolorIcon motif={event.motif} reduced={reduced} />
                  </div>

                  {/* Text Details Block (Directly on Paper Backdrop) */}
                  <div>
                    {/* DAY [N] Label */}
                    <p className="eyebrow text-[0.62rem] sm:text-xs tracking-[0.38em] text-[#b89138] font-bold uppercase mb-1">
                      DAY {dayNum} &nbsp;•&nbsp; {event.date}
                    </p>

                    {/* Event Script & Name */}
                    <h3 className="font-[family-name:var(--font-script)] foil-text text-3.5xl sm:text-4.5xl font-normal leading-tight py-0.5">
                      {event.name}
                    </h3>

                    {/* Tagline Subtitle Card with Flourish Ornaments */}
                    <div className={`flex items-center gap-2 mb-3.5 ${isEven ? "justify-center sm:justify-start" : "justify-center sm:justify-end"}`}>
                      <span className="inline-block h-[1px] w-5 sm:w-8 bg-gradient-to-r from-transparent to-[#b89138]/70" />
                      <p className="font-[family-name:var(--font-serif)] text-xs sm:text-sm italic text-[#8c6c23] font-medium tracking-wide">
                        "{event.script}"
                      </p>
                      <span className="inline-block h-[1px] w-5 sm:w-8 bg-gradient-to-l from-transparent to-[#b89138]/70" />
                    </div>

                    {/* Refined Time & Venue Pill with Thin Gold Outline & Line-Art Icons */}
                    <div
                      className={`inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fffdf8]/90 border border-[#b89138]/45 text-xs sm:text-sm font-medium text-[#3a2b1c] shadow-[0_2px_12px_rgba(184,145,56,0.08)] mb-3.5 ${
                        isEven ? "sm:justify-start" : "sm:justify-end"
                      }`}
                    >
                      {/* Line-Art Clock Icon & Time */}
                      <div className="flex items-center gap-1.5 text-[#3a2b1c]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#b89138]">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M 12 7 L 12 12 L 15.5 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <span>{event.time}</span>
                      </div>

                      <span className="text-[#b89138]/70">•</span>

                      {/* Line-Art Location Pin Icon & Venue */}
                      <div className="flex items-center gap-1.5 font-semibold text-[#2c1c0e]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#b89138]">
                          <path d="M 12 21 C 12 21 17 14.5 17 10 A 5 5 0 0 0 7 10 C 7 14.5 12 21 12 21 Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
                          <circle cx="12" cy="10" r="2" fill="currentColor" />
                        </svg>
                        <span>{event.place}</span>
                      </div>
                    </div>

                    {/* Evocative Description */}
                    <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[#4a3a28] italic leading-relaxed max-w-md mx-auto sm:mx-0">
                      {event.note}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* 3. Footer Bookend Ornament */}
        <div className="mt-20 sm:mt-28 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 text-[#b89138]/80 mb-2">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#b89138]/60" />
            <span className="text-xs text-[#b89138]">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#b89138]/60" />
          </div>
          <p className="font-[family-name:var(--font-serif)] text-xs sm:text-sm italic text-[#7a592c]">
            We look forward to celebrating every moment with you
          </p>
        </div>
      </div>
    </section>
  );
}

// Alias export to seamlessly replace Booklet component
export { OrderOfEvents as Booklet };
