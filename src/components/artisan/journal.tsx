import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { travel } from "@/data/wedding";
import { Motif, Reveal, SectionTitle } from "./atoms";
import { TravelMap } from "./travel-map";

// METADATA ENRICHMENT FOR TRAVEL CATEGORIES: ICONS, STRUCTURED BADGES, TINTED COLOR WASHES & IDLE ANIMATIONS
const travelCategoryConfig: Record<
  string,
  {
    icon: (props: { className?: string }) => React.ReactNode;
    badge?: string | string[];
    bgClass: string;
    borderClass: string;
    iconBgClass: string;
    iconTextClass: string;
    shadowClass: string;
    iconMotion?: Record<string, any>;
  }
> = {
  Accommodation: {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2M9 18h2M13 18h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "✦ VENUE • MALHOTRA–RATHORE",
    bgClass: "bg-[#faf5eb]/95", // Warm Gold
    borderClass: "border-[#b89138]/40 hover:border-[#b89138]/70",
    iconBgClass: "bg-[#f4e8d0] group-hover:bg-[#8c6c23]",
    iconTextClass: "text-[#8c6c23] group-hover:text-[#fffdf9]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(184,145,56,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(184,145,56,0.28)]",
    iconMotion: { animate: { scale: [1, 1.05, 1] }, transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
  },
  "By Air": {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "📍 22 KM • UDR",
    bgClass: "bg-[#f0f6fa]/95", // Sky Blue Muted
    borderClass: "border-[#4a80a8]/35 hover:border-[#35658a]/65",
    iconBgClass: "bg-[#e1edf5] group-hover:bg-[#2b587a]",
    iconTextClass: "text-[#2b587a] group-hover:text-[#ffffff]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(74,128,168,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(74,128,168,0.28)]",
    iconMotion: { animate: { y: [0, -3.5, 0], rotate: [0, 3, 0] }, transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
  },
  "By Rail": {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="4" y="3" width="16" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 11h16M9 19l-3 3M15 19l3 3M9 15h.01M15 15h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "🚆 5 KM • CITY JN",
    bgClass: "bg-[#f2f6f1]/95", // Soft Sage Olive
    borderClass: "border-[#5c7a56]/35 hover:border-[#3d5937]/65",
    iconBgClass: "bg-[#e2ebd0] group-hover:bg-[#3d5937]",
    iconTextClass: "text-[#3d5937] group-hover:text-[#ffffff]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(92,122,86,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(92,122,86,0.28)]",
    iconMotion: { animate: { x: [-1.2, 1.2, -1.2] }, transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } },
  },
  "Dress Code": {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2l4 4-2 3h5l-1 12H6L5 9h5l-2-3 4-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: "✦ CODE • TRADITIONAL",
    bgClass: "bg-[#fdf2f4]/95", // Vintage Rose
    borderClass: "border-[#c4687d]/35 hover:border-[#a8445a]/65",
    iconBgClass: "bg-[#fae1e6] group-hover:bg-[#a8445a]",
    iconTextClass: "text-[#a8445a] group-hover:text-[#ffffff]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(196,104,125,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(196,104,125,0.28)]",
    iconMotion: { animate: { rotate: [-2, 2, -2] }, transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" } },
  },
  Weather: {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: ["☀️ 26°C DAY", "🌙 11°C NIGHT"],
    bgClass: "bg-[#fff6ef]/95", // Warm Sun Peach
    borderClass: "border-[#e07a48]/35 hover:border-[#c25a27]/65",
    iconBgClass: "bg-[#fde7d8] group-hover:bg-[#c25a27]",
    iconTextClass: "text-[#c25a27] group-hover:text-[#ffffff]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(224,122,72,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(224,122,72,0.28)]",
    iconMotion: { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 18, ease: "linear" } },
  },
  "Concierge & Help": {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    badge: "✦ SERVICE • 24/7 HELPLINE",
    bgClass: "bg-[#fdf8eb]/95", // Regal Amber
    borderClass: "border-[#b8860b]/40 hover:border-[#8b6508]/70",
    iconBgClass: "bg-[#f9eccb] group-hover:bg-[#8b6508]",
    iconTextClass: "text-[#8b6508] group-hover:text-[#ffffff]",
    shadowClass: "shadow-[0_14px_32px_-8px_rgba(184,134,11,0.16)] hover:shadow-[0_22px_44px_-6px_rgba(184,134,11,0.28)]",
    iconMotion: { animate: { scale: [1, 1.06, 1] }, transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } },
  },
};

// DRESS CODE INTERACTIVE COLOR SWATCHES PALETTE
const dressCodeSwatches = [
  { name: "Haldi Yellow", color: "#f59e0b" },
  { name: "Mehendi Green", color: "#15803d" },
  { name: "Sangeet Jewel Blue", color: "#1e40af" },
  { name: "Vivaah Ivory & Gold", color: "#b89138" },
  { name: "Reception Wine Velvet", color: "#881337" },
];

export function Journal() {
  const [activeSwatch, setActiveSwatch] = useState<string | null>(null);
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const pinCategoryMap: Record<string, string> = {
    accommodation: "Accommodation",
    air: "By Air",
    rail: "By Rail",
    concierge: "Concierge & Help",
  };

  // PREPARE 6 BALANCED GRID CARDS (3 ROWS X 2 COLUMNS)
  const displayCategories = [
    ...travel.filter((entry) => !["Getting Around", "Nearby", "In Case of Anything"].includes(entry.label)),
    {
      label: "Concierge & Help",
      body: "Our 24/7 hospitality desk & airport shuttle team are available throughout your stay for any special requests.",
    },
  ];

  return (
    <section id="travel" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[#b89138]/10 blur-3xl -z-10" />

      <div className="relative mx-auto max-w-6xl z-10">
        {/* SECTION TITLE HEADER */}
        <SectionTitle eyebrow="Carried in a coat pocket" title="Travel & stay" script="The journal" />

        {/* BALANCED 2-COLUMN LAYOUT: HERO ILLUSTRATED MAP (LEFT) & 2-COLUMN CATEGORY CARD GRID (RIGHT) */}
        <div className="mt-14 sm:mt-20 grid gap-10 lg:grid-cols-12 items-start">
          {/* HERO MAP COLUMN WITH 2.5D PARALLAX DIORAMA & DARBAAN GATEKEEPER GUIDE (5 COLUMNS ON DESKTOP) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <TravelMap onSelectPin={(pinId) => setActivePinId(pinId)} />
            </Reveal>
          </div>

          {/* TRAVEL & STAY CATEGORIES: PERFECT BALANCED 6-CARD GRID (3 ROWS X 2 COLUMNS) */}
          <div className="lg:col-span-7">
            <div className="grid gap-4.5 sm:grid-cols-2">
              {displayCategories.map((entry, i) => {
                const isSelected = activePinId && pinCategoryMap[activePinId] === entry.label;
                const config: {
                  icon: (props: { className?: string }) => React.ReactNode;
                  badge?: string | string[];
                  bgClass: string;
                  borderClass: string;
                  iconBgClass: string;
                  iconTextClass: string;
                  shadowClass: string;
                  iconMotion?: Record<string, any>;
                } = travelCategoryConfig[entry.label] ?? {
                  icon: ({ className }: { className?: string }) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  ),
                  bgClass: "bg-[#fffdf8]/95",
                  borderClass: "border-[#b89138]/30",
                  iconBgClass: "bg-[#fcf8ef]",
                  iconTextClass: "text-[#8c6c23]",
                  shadowClass: "shadow-[0_12px_28px_-6px_rgba(184,145,56,0.12)]",
                };
                const IconComponent = config.icon;
                const badges: string[] = Array.isArray(config.badge)
                  ? config.badge
                  : config.badge
                  ? [config.badge]
                  : [];

                return (
                  <motion.div
                    key={entry.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -3, scale: 1.015 }}
                    className={`group relative card-sand-texture flex flex-col justify-between h-full rounded-xl p-5 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-[#b89138] border-[#8c6c23] shadow-xl scale-[1.02] bg-[#fffdf8]"
                        : `${config.bgClass} ${config.borderClass} ${config.shadowClass}`
                    }`}
                  >
                    {/* SUBTLE CORNER WATERMARK MOTIF FOR HERITAGE ILLUSTRATED CHARACTER */}
                    <div className="absolute right-1 bottom-1 opacity-[0.07] pointer-events-none z-0">
                      <Motif kind={i % 2 === 0 ? "lotus" : "marigold"} className="h-16 w-16 text-[#b89138]" />
                    </div>

                    {/* CARD CONTENT CONTAINER */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        {/* CARD HEADER: ICON WITH IDLE MICRO-ANIMATION & STRUCTURED BADGES */}
                        <div className="flex items-start justify-between gap-2.5 mb-3">
                          {/* LINE-ART CATEGORY ICON WITH IDLE MICRO-ANIMATION */}
                          <div className={`h-9 w-9 rounded-full border border-[#b89138]/40 flex items-center justify-center transition-all duration-300 shadow-2xs ${config.iconBgClass} ${config.iconTextClass}`}>
                            <motion.div {...(config.iconMotion ?? {})}>
                              <IconComponent className="h-4.5 w-4.5 stroke-[1.6]" />
                            </motion.div>
                          </div>

                          {/* STRUCTURED BADGES (DISTINGUISHING STAT VS LABEL TYPES) */}
                          <div className="flex flex-wrap items-center justify-end gap-1.5">
                            {badges.map((b: string) => {
                              const isStat = b.startsWith("📍") || b.startsWith("🚆") || b.startsWith("☀️") || b.startsWith("🌙");
                              return (
                                <span
                                  key={b}
                                  className={`px-2.5 py-1 rounded-full font-bold text-[0.58rem] sm:text-[0.62rem] tracking-wider uppercase shadow-2xs transition-colors duration-300 ${
                                    isStat
                                      ? "bg-[#f7eedc]/95 border border-[#b89138]/50 text-[#5e4718]"
                                      : "bg-[#fffdf8]/90 border border-[#b89138]/35 text-[#8c6c23]"
                                  }`}
                                >
                                  {b}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* ORNAMENTAL MARIGOLD DIVIDER */}
                        <div className="flex items-center gap-2 my-2.5">
                          <Motif kind="marigold" className="h-3.5 w-3.5 text-[#b89138]" />
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#b89138]/50 to-transparent" />
                        </div>

                        {/* CATEGORY TITLE */}
                        <h4 className="eyebrow text-xs sm:text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#3a2b1c] mb-2">
                          {entry.label}
                        </h4>

                        {/* CATEGORY BODY TEXT */}
                        <p className="text-xs sm:text-[0.82rem] leading-relaxed text-[#5e4d3b]">
                          {entry.body}
                        </p>
                      </div>

                      {/* DRESS CODE EXCLUSIVE: HANDCRAFTED INTERACTIVE WEDDING COLOR SWATCHES */}
                      {entry.label === "Dress Code" && (
                        <div className="mt-3.5 pt-3 border-t border-[#b89138]/20 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#8c6c23]">
                              Palette Swatches:
                            </span>
                            {activeSwatch && (
                              <motion.span
                                initial={{ opacity: 0, x: 5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[0.62rem] font-bold text-[#8c6c23] bg-[#fffdf8] px-2.5 py-0.5 rounded-full border border-[#b89138]/40 shadow-2xs"
                              >
                                {activeSwatch}
                              </motion.span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {dressCodeSwatches.map((swatch) => (
                              <button
                                key={swatch.name}
                                type="button"
                                onMouseEnter={() => setActiveSwatch(swatch.name)}
                                onMouseLeave={() => setActiveSwatch(null)}
                                onClick={() => setActiveSwatch(activeSwatch === swatch.name ? null : swatch.name)}
                                className={`group/swatch relative h-5 w-5 rounded-full border border-[#b89138]/60 shadow-2xs transition-all duration-300 hover:scale-125 focus:outline-none cursor-pointer ${
                                  activeSwatch === swatch.name ? "scale-125 ring-2 ring-[#b89138] ring-offset-1" : ""
                                }`}
                                style={{ backgroundColor: swatch.color }}
                                aria-label={swatch.name}
                              >
                                {/* TOOLTIP POPUP */}
                                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#3a2b1c] px-2 py-1 text-[0.55rem] font-bold text-[#fffdf9] opacity-0 shadow-md transition-opacity duration-200 group-hover/swatch:opacity-100 z-30">
                                  {swatch.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
