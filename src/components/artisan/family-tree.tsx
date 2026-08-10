import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import brideFamilyPic from "@/assets/bride-family.jpg";
import groomFamilyPic from "@/assets/groom-family.jpg";
import m3 from "@/assets/memory-3.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";
import m7 from "@/assets/memory-7.jpg";
import { Motif, SectionTitle } from "./atoms";

export interface FamilyMember {
  name: string;
  relation: string;
  monogram: string;
  photo?: string;
  quote?: string;
}

export interface FamilyData {
  side: "bride" | "groom";
  title: string;
  accentColor: string;
  badgeBg: string;
  cardWash: string;
  cardShadow: string;
  btnStyle: string;
  locketBg: string;
  rotation: string;
  parents: {
    names: string;
    relation: string;
    photo: string;
    quote: string;
  };
  members: FamilyMember[];
}

// STRUCTURED FAMILY DATA PER SIDE
export const brideFamilyData: FamilyData = {
  side: "bride",
  title: "The Bride's Family",
  accentColor: "text-[#a85a48]",
  badgeBg: "bg-[#fcf2ef]/90 border-[#e8bfa0]/60",
  cardWash: "bg-gradient-to-b from-[#fffdfa] via-[#fcf2ef]/95 to-[#f9e5e0]/90 border-[#e8bfa0]/80",
  cardShadow: "shadow-[0_24px_55px_-12px_rgba(168,90,72,0.18),0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_32px_70px_-10px_rgba(168,90,72,0.28)]",
  btnStyle: "border-[#a85a48]/60 text-[#a85a48] hover:bg-[#a85a48] hover:text-[#fffdf9]",
  locketBg: "bg-[#faf0ec] border-[#e8bfa0]/40 text-[#a85a48]",
  rotation: "-rotate-[1.8deg]",
  parents: {
    names: "Rajeev & Sudha Malhotra",
    relation: "PARENTS OF THE BRIDE",
    photo: brideFamilyPic,
    quote: "Guiding with love, wisdom, and timeless warmth through every step of life.",
  },
  members: [
    {
      name: "Dadi Kamla Devi",
      relation: "GRANDMOTHER",
      monogram: "KD",
      photo: m3,
      quote: "The eternal blessing at the root of our family tree.",
    },
    {
      name: "Ishaan Malhotra",
      relation: "BROTHER OF THE BRIDE",
      monogram: "IM",
      photo: m5,
      quote: "Partner in laughter, forever protector and friend.",
    },
    {
      name: "Kabir & Naina",
      relation: "THE LITTLE ONES",
      monogram: "K&N",
      photo: m7,
      quote: "Bringing endless joy, giggles, and innocent light.",
    },
  ],
};

export const groomFamilyData: FamilyData = {
  side: "groom",
  title: "The Groom's Family",
  accentColor: "text-[#586b46]",
  badgeBg: "bg-[#f2f5ec]/90 border-[#c0d0b0]/60",
  cardWash: "bg-gradient-to-b from-[#fffdfa] via-[#f2f5ec]/95 to-[#e6ece0]/90 border-[#c0d0b0]/80",
  cardShadow: "shadow-[0_24px_55px_-12px_rgba(88,107,70,0.18),0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_32px_70px_-10px_rgba(88,107,70,0.28)]",
  btnStyle: "border-[#586b46]/60 text-[#586b46] hover:bg-[#586b46] hover:text-[#fffdf9]",
  locketBg: "bg-[#f2f6ee] border-[#c0d0b0]/40 text-[#586b46]",
  rotation: "rotate-[1.8deg]",
  parents: {
    names: "Anand & Meera Rathore",
    relation: "PARENTS OF THE GROOM",
    photo: groomFamilyPic,
    quote: "Pillars of strength, grace, and unwavering ancestral devotion.",
  },
  members: [
    {
      name: "Dadi Kamla Devi",
      relation: "GRANDMOTHER",
      monogram: "KD",
      photo: m3,
      quote: "The eternal blessing at the root of our family tree.",
    },
    {
      name: "Riya Rathore",
      relation: "SISTER OF THE GROOM",
      monogram: "RR",
      photo: m6,
      quote: "Keeper of childhood secrets and joyful celebrations.",
    },
    {
      name: "Kabir & Naina",
      relation: "THE LITTLE ONES",
      monogram: "K&N",
      photo: m7,
      quote: "Bringing endless joy, giggles, and innocent light.",
    },
  ],
};

export function FamilySection() {
  return (
    <section id="family" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full bg-[#b89138]/10 blur-3xl -z-10" />

      <div className="relative mx-auto max-w-6xl z-10">
        {/* PART 1: SECTION HEADER */}
        <div className="text-center mb-14 sm:mb-20">
          <SectionTitle eyebrow="TOGETHER WITH THEIR FAMILIES" title="The Royal Court" script="Those who raised us" />
        </div>

        {/* PART 2: TWO MAIN FAMILY CARDS WITH ASYMMETRIC HANDCRAFTED OFFSETS & LIFTED DEPTH SHADOWS */}
        <div className="grid gap-10 md:grid-cols-2 lg:gap-14 items-start">
          {/* BRIDE'S FAMILY CARD (SLIGHT LEFT TILT & TOP OFFSET) */}
          <div className="md:-translate-y-2">
            <FamilySummaryCard data={brideFamilyData} staggerDelay={0} cardTilt="-rotate-[1.5deg]" />
          </div>

          {/* GROOM'S FAMILY CARD (SLIGHT RIGHT TILT & BOTTOM OFFSET) */}
          <div className="md:translate-y-4">
            <FamilySummaryCard data={groomFamilyData} staggerDelay={0.15} cardTilt="rotate-[1.5deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}

{/* Export Aliases for Compatibility */}
export { FamilySection as FamilyCourt, FamilySection as FamilyTree };

{/* COMPONENT FOR SINGLE FAMILY CARD (SUMMARY VIEW & CAROUSEL DETAIL VIEW) */}
function FamilySummaryCard({
  data,
  staggerDelay = 0,
  cardTilt = "",
}: {
  data: FamilyData;
  staggerDelay?: number;
  cardTilt?: string;
}) {
  const reduced = useReducedMotion();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.members.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.members.length) % data.members.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0.3 : 0.75, delay: reduced ? 0 : staggerDelay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col w-full h-full transition-transform duration-500 ${reduced ? "" : cardTilt}`}
    >
      {/* Outer Card Deckle Edge Filtered Container with Lifted Diffused Shadow & Cotton Sheet Texture */}
      <div className={`relative w-full h-full rounded-2xl ${data.cardShadow} transition-shadow duration-500`}>
        {/* Authentic Deckle Edge Filter Base */}
        <div
          className={`deckle-edge absolute inset-0 rounded-2xl ${data.cardWash} pointer-events-none transition-all duration-500`}
          aria-hidden="true"
        />

        {/* Card Content Surface with Tactile Grain Noise & Woven Linen Texture */}
        <div className="grain relative z-10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-transparent flex flex-col h-full bg-[radial-gradient(#b89138_0.75px,transparent_0.75px)] [background-size:16px_16px] [background-opacity:0.04]">
          {/* Inner Corner Frame Accent */}
          <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#b89138]/20 transition-colors duration-500 group-hover:border-[#b89138]/45" />

          {/* ANIMATEPRESENCE TOGGLE BETWEEN SUMMARY VIEW & SWIPEABLE CAROUSEL */}
          <AnimatePresence mode="wait">
            {!isCarouselOpen ? (
              /* SUMMARY CARD VIEW */
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full"
              >
                {/* 1. POLAROID-STYLE "DEVELOPING PHOTO" ENTRANCE ANIMATION & VINTAGE JHAROKHA ARCHED FRAME */}
                <div className="relative w-full mb-5 transition-transform duration-500 group-hover:scale-[1.02]">
                  {/* Embossed Royal Gold Wax-Seal Medallion Corner Clasp */}
                  <div
                    className={`absolute z-30 pointer-events-none ${
                      data.side === "bride" ? "-top-3.5 -right-3" : "-top-3.5 -left-3"
                    }`}
                  >
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#fce6a6] via-[#b89138] to-[#6e5015] shadow-[0_6px_16px_rgba(110,80,21,0.45)] border-2 border-[#fff8e6] flex items-center justify-center text-[#fffdf8] transition-transform duration-500 group-hover:scale-110">
                      {/* Inner Embossed Ring & Motif */}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#fce6a6]/50 bg-black/10 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-serif font-bold tracking-tighter drop-shadow-xs">
                          {data.side === "bride" ? "✦" : "⚜"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Thick Vintage Paper Matting & Arched Top Outline */}
                  <div className="relative rounded-t-[3.2rem] sm:rounded-t-[4rem] rounded-b-2xl p-2.5 sm:p-3 bg-[#fffdf8] shadow-md border-2 border-[#b89138]/45 overflow-hidden">
                    {/* Arched Photo Mask Container with Developing Blur-to-Sharp Polaroid Animation */}
                    <div className="relative w-full overflow-hidden rounded-t-[2.6rem] sm:rounded-t-[3.3rem] rounded-b-xl bg-[#faf3e8]">
                      <motion.img
                        initial={reduced ? {} : { filter: "blur(10px) brightness(1.15)", opacity: 0.3, scale: 0.97 }}
                        whileInView={reduced ? {} : { filter: "blur(0px) brightness(0.98)", opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: staggerDelay + 0.1 }}
                        src={data.parents.photo}
                        alt={data.parents.names}
                        loading="eager"
                        className="w-full h-72 sm:h-80 object-cover object-top sepia-[0.18] contrast-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Top Arch Gold Sprout Emblem */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="h-6 w-6 rounded-full border border-[#b89138] bg-[#fffdf8] shadow-xs flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-[#b89138]" />
                    </div>
                  </div>
                </div>

                {/* 2. STAGGERED TEXT CONTENT (NAMES, RELATION, ELEVATED QUOTE & BUTTON) */}
                <motion.div
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: staggerDelay + 0.3 }}
                  className="flex flex-col flex-1"
                >
                  {/* ORNAMENTAL MARIGOLD DIVIDER */}
                  <div className="flex items-center justify-center gap-3.5 my-3.5">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#b89138]/60 to-[#b89138]/80" />
                    <Motif kind="marigold" className="h-4 w-4 text-[#b89138]" />
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#b89138]/60 to-[#b89138]/80" />
                  </div>

                  {/* NAMES & RELATION */}
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h3 className="font-[family-name:var(--font-serif)] text-2.5xl sm:text-3xl font-medium leading-snug text-[#3a2b1c]">
                      {data.parents.names}
                    </h3>

                    {/* RELATION LABEL */}
                    <p className={`eyebrow font-bold text-[0.65rem] sm:text-xs uppercase mt-1.5 ${data.accentColor}`}>
                      {data.parents.relation}
                    </p>

                    {/* SHORT ITALIC QUOTE WITH WATERMARK QUOTATION MARKS */}
                    <div className="relative mt-3.5 px-4 pt-1 pb-2">
                      <span className="font-[family-name:var(--font-serif)] text-5xl leading-none text-[#b89138]/25 absolute -top-3 left-2 select-none pointer-events-none">
                        “
                      </span>
                      <p className="font-[family-name:var(--font-script)] text-xl sm:text-2xl text-[#7a592c] italic leading-relaxed relative z-10">
                        {data.parents.quote}
                      </p>
                      <span className="font-[family-name:var(--font-serif)] text-5xl leading-none text-[#b89138]/25 absolute -bottom-4 right-2 select-none pointer-events-none">
                        ”
                      </span>
                      <div className="h-[1px] w-16 mx-auto mt-2.5 bg-gradient-to-r from-transparent via-[#b89138]/40 to-transparent" />
                    </div>
                  </div>

                  {/* ULTRA-PREMIUM ROYAL GOLD FOIL GRADIENT PILL BUTTON WITH TACTILE COLOR WASH & LOTUS GEM BADGE */}
                  <div className="mt-8 flex justify-center pt-2">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="group/btn p-[2px] rounded-full bg-gradient-to-r from-[#b89138] via-[#fce6a6] via-[#d4aa3b] to-[#8c671e] shadow-[0_6px_22px_rgba(184,145,56,0.24)] hover:shadow-[0_10px_30px_rgba(184,145,56,0.4)] transition-all duration-300"
                    >
                      <button
                        onClick={() => {
                          setIsCarouselOpen(true);
                          setActiveIndex(0);
                        }}
                        className={`relative overflow-hidden px-7 py-3.5 rounded-full bg-[#fffdf8] text-[0.65rem] sm:text-xs tracking-[0.28em] font-bold uppercase transition-all duration-500 flex items-center gap-2.5 cursor-pointer shadow-inner ${
                          data.side === "bride"
                            ? "text-[#a85a48] hover:bg-gradient-to-r hover:from-[#a85a48] hover:to-[#8c4232] hover:text-[#fffdf9]"
                            : "text-[#586b46] hover:bg-gradient-to-r hover:from-[#586b46] hover:to-[#425233] hover:text-[#fffdf9]"
                        }`}
                      >
                        <span className="relative z-10">View {data.side === "bride" ? "Bride's" : "Groom's"} Family Details</span>
                        <span className="relative z-10 flex items-center gap-1.5">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#b89138]/15 border border-[#b89138]/40 text-[#8c6c23] group-hover/btn:border-white/50 group-hover/btn:text-white group-hover/btn:bg-white/20 text-[0.6rem] transition-all">✦</span>
                          <span className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        </span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* PART 3: SWIPEABLE CAROUSEL DETAIL VIEW */
              <motion.div
                key="carousel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full min-h-[26rem] justify-between relative"
              >
                {/* BACK / COLLAPSE BUTTON AT TOP */}
                <div className="flex items-center justify-between border-b border-[#b89138]/20 pb-3 mb-4 z-20">
                  <span className={`eyebrow text-xs font-bold uppercase ${data.accentColor}`}>
                    {data.title}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCarouselOpen(false)}
                    className="p-[1.5px] rounded-full bg-gradient-to-r from-[#b89138] via-[#d4aa3b] to-[#8c671e] shadow-2xs cursor-pointer"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-[#fffdf8] text-[0.65rem] tracking-wider uppercase font-bold text-[#8c6c23] hover:bg-[#8c6c23] hover:text-white transition-all flex items-center gap-1.5">
                      <span>← Back</span>
                    </span>
                  </motion.button>
                </div>

                {/* SWIPEABLE CAROUSEL SLIDE STAGE */}
                <div className="relative w-full overflow-hidden flex-1 flex items-center justify-center my-2">
                  {/* DESKTOP PREV / NEXT ARROWS */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    aria-label="Previous family member"
                    className="hidden sm:flex absolute left-0 z-30 w-9 h-9 rounded-full border-2 border-[#b89138]/60 bg-[#fffdf8] text-[#8c6c23] items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#b89138] hover:to-[#8c671e] hover:text-white transition-all cursor-pointer"
                  >
                    ‹
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    aria-label="Next family member"
                    className="hidden sm:flex absolute right-0 z-30 w-9 h-9 rounded-full border-2 border-[#b89138]/60 bg-[#fffdf8] text-[#8c6c23] items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#b89138] hover:to-[#8c671e] hover:text-white transition-all cursor-pointer"
                  >
                    ›
                  </motion.button>

                  {/* CAROUSEL SLIDE CONTAINER WITH DRAG SWIPE */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) handleNext();
                      if (info.offset.x > 40) handlePrev();
                    }}
                    className="w-full flex items-center justify-center px-4 cursor-grab active:cursor-grabbing"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.94, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.94, x: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="flex flex-col items-center text-center w-full max-w-sm"
                      >
                        {/* 1. CIRCULAR PORTRAIT PHOTO OR MONOGRAM FALLBACK */}
                        <div className="relative mb-4 flex items-center justify-center">
                          <div className="rounded-full border-2 border-[#b89138] p-1 bg-gradient-to-b from-[#fffdf8] to-[#f5ebd6] shadow-md w-24 h-24 sm:w-28 sm:h-28">
                            {data.members[activeIndex]?.photo ? (
                              <img
                                src={data.members[activeIndex].photo}
                                alt={data.members[activeIndex].name}
                                className="w-full h-full rounded-full object-cover sepia-[0.2] contrast-[1.05]"
                              />
                            ) : (
                              <div className={`w-full h-full rounded-full border flex items-center justify-center font-[family-name:var(--font-serif)] font-bold tracking-wider shadow-inner text-base sm:text-lg ${data.locketBg}`}>
                                {data.members[activeIndex]?.monogram}
                              </div>
                            )}
                          </div>
                          {/* Active Ring Glow Ring */}
                          <div className="pointer-events-none absolute -inset-1.5 rounded-full border border-[#b89138]/40 animate-pulse" />
                        </div>

                        {/* 2. MEMBER NAME */}
                        <h4 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl font-medium text-[#3a2b1c]">
                          {data.members[activeIndex]?.name}
                        </h4>

                        {/* 3. RELATION TO BRIDE/GROOM */}
                        <p className={`eyebrow font-bold text-[0.62rem] sm:text-xs uppercase mt-1.5 ${data.accentColor}`}>
                          {data.members[activeIndex]?.relation}
                        </p>

                        {/* 4. SHORT ITALIC QUOTE */}
                        {data.members[activeIndex]?.quote ? (
                          <p className="font-[family-name:var(--font-script)] text-xl sm:text-2xl text-[#7a592c] italic mt-3 leading-relaxed">
                            "{data.members[activeIndex].quote}"
                          </p>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* DOT PAGINATION INDICATORS BENEATH CAROUSEL */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#b89138]/15 z-20">
                  {data.members.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Jump to ${m.name}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 bg-[#b89138] shadow-2xs"
                          : "w-2.5 bg-[#b89138]/35 hover:bg-[#b89138]/60"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
