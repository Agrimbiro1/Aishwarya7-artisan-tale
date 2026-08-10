import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { family } from "@/data/wedding";
import tree from "@/assets/watercolor-tree.png";
import { SectionTitle } from "./atoms";

const defaultPerson = { name: "", relation: "", note: "" };

// Categorize family members into explicit generational tiers with non-null guarantees
const grandmother = family.find((f) => f.relation.includes("Grandmother")) ?? family[2] ?? defaultPerson;
const brideParents = family.find((f) => f.relation.includes("Parents of the Bride")) ?? family[0] ?? defaultPerson;
const groomParents = family.find((f) => f.relation.includes("Parents of the Groom")) ?? family[1] ?? defaultPerson;
const brideSibling = family.find((f) => f.relation.includes("Brother of the Bride")) ?? family[3] ?? defaultPerson;
const groomSibling = family.find((f) => f.relation.includes("Sister of the Groom")) ?? family[4] ?? defaultPerson;
const littleOnes = family.find((f) => f.relation.includes("Little Ones")) ?? family[5] ?? defaultPerson;

type FamilySide = "bride" | "groom" | "matriarch" | "center";

// Helper to determine color-coding side, custom label color & monogram initial
const getFamilyMetadata = (relation: string, name: string) => {
  if (relation.includes("Grandmother")) {
    return { side: "matriarch" as FamilySide, monogram: "KD", labelColor: "text-[#9e7828]" };
  }
  if (relation.includes("Bride")) {
    const monogram = name.includes("Rajeev") ? "RM" : "IM";
    return { side: "bride" as FamilySide, monogram, labelColor: "text-[#a85a48]" };
  }
  if (relation.includes("Groom")) {
    const monogram = name.includes("Anand") ? "AR" : "RR";
    return { side: "groom" as FamilySide, monogram, labelColor: "text-[#586b46]" };
  }
  return { side: "center" as FamilySide, monogram: "K&N", labelColor: "text-[#8c6c23]" };
};

export function FamilyTree() {
  const reduced = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="family" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />

      {/* Main Watercolor Tree Illustration (Enriched Visibility & Radial Warmth) */}
      <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto w-full max-w-5xl flex justify-center opacity-45 mix-blend-multiply">
        <img
          src={tree}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1536}
          height={1024}
          className="w-[min(68rem,100%)] object-contain"
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-40 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-[#b89138]/12 blur-3xl -z-10" />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <SectionTitle eyebrow="Two families, one root" title="The Family Tree" script="Those who made us" />
        </div>

        {/* Generational Tree Structure Container */}
        <div className="relative flex flex-col items-center">
          {/* Animated Connecting Branch SVG Network (Desktop & Tablet) */}
          <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" fill="none">
            <defs>
              <linearGradient id="treeBranchGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b89138" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#8c6c23" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b89138" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Trunk -> Tier 1 (Grandmother Card Top Center) */}
            <motion.path
              d="M 500, -10 L 500, 15"
              stroke="url(#treeBranchGold)"
              strokeWidth="2.5"
              strokeDasharray="8 5"
              initial={{ pathLength: reduced ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.8, ease: "easeOut" }}
            />

            {/* Tier 1 -> Tier 2 Branch Split (Symmetric Curves Directly to Parents' Card Tops) */}
            <motion.path
              d="M 500, 195 C 500, 235 250, 235 250, 275"
              stroke="url(#treeBranchGold)"
              strokeWidth="2.5"
              strokeDasharray="8 5"
              initial={{ pathLength: reduced ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 1.2, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M 500, 195 C 500, 235 750, 235 750, 275"
              stroke="url(#treeBranchGold)"
              strokeWidth="2.5"
              strokeDasharray="8 5"
              initial={{ pathLength: reduced ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 1.2, delay: 0.3, ease: "easeOut" }}
            />

            {/* Tier 2 -> Tier 3 Cascading Sub-Branches (Rendered when Expanded) */}
            {isExpanded && (
              <>
                {/* Bride's Parents -> Ishaan (Brother Card Top Center) */}
                <motion.path
                  d="M 250, 460 C 250, 515 166, 520 166, 565"
                  stroke="url(#treeBranchGold)"
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
                {/* Center Trunk -> Kabir & Naina (Little Ones Card Top Center) */}
                <motion.path
                  d="M 500, 235 L 500, 565"
                  stroke="url(#treeBranchGold)"
                  strokeWidth="2"
                  strokeDasharray="8 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, delay: 0.2, ease: "easeOut" }}
                />
                {/* Groom's Parents -> Riya (Sister Card Top Center) */}
                <motion.path
                  d="M 750, 460 C 750, 515 833, 520 833, 565"
                  stroke="url(#treeBranchGold)"
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              </>
            )}
          </svg>

          {/* Mobile Vertical Central Branch Guide */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#b89138]/70 pointer-events-none z-0" />

          {/* TIER 1: GRANDMOTHER / MATRIARCH (Top Crown Elder) */}
          <div className="relative z-10 w-full max-w-md mb-12 sm:mb-16">
            <FamilyCard person={grandmother} />
          </div>

          {/* TIER 2: THE PARENTS (Symmetric Color-Coded Side-by-Side Boughs) */}
          <div className="relative z-10 w-full grid gap-8 sm:gap-12 md:grid-cols-2 max-w-4xl mb-8">
            {/* Left Card: Parents of the Bride (Soft Blush Rose Tint) */}
            <FamilyCard person={brideParents} />
            {/* Right Card: Parents of the Groom (Soft Sage / Deep Gold Tint) */}
            <FamilyCard person={groomParents} />
          </div>

          {/* EXPANDABLE TIER 3: SIBLINGS & THE LITTLE ONES */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full mt-6 mb-8"
              >
                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                  <FamilyCard person={brideSibling} />
                  <FamilyCard person={littleOnes} />
                  <FamilyCard person={groomSibling} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ELEGANT VIEW FAMILY DETAILS GOLD PILL BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-6 relative z-20 px-8 py-3.5 rounded-full border border-[#b89138]/70 bg-[#fffdf8]/95 backdrop-blur-md text-[0.68rem] sm:text-xs tracking-[0.28em] font-bold text-[#8c6c23] uppercase shadow-[0_4px_16px_rgba(74,58,40,0.08)] hover:bg-[#b89138] hover:text-[#fffdf9] hover:border-[#b89138] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
          >
            <span>{isExpanded ? "Hide Family Details" : "View Family Details"}</span>
            <span className="text-base leading-none transition-transform duration-300">
              {isExpanded ? "↑" : "↓"}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

{/* Reusable Color-Coded Deckle-Edge Family Member Card Component */}
function FamilyCard({
  person,
}: {
  person: typeof family[number];
}) {
  const reduced = useReducedMotion();
  const { side, monogram, labelColor } = getFamilyMetadata(person.relation, person.name);

  // Dynamic styling based on Bride vs Groom side vs Matriarch vs Center
  const cardStyle =
    side === "bride"
      ? "bg-gradient-to-b from-[#fffdfa] to-[#fcf2ef]/95 border-[#e8bfa0]/75 shadow-[0_12px_36px_rgba(168,90,72,0.11)] group-hover:border-[#a85a48]/70 group-hover:shadow-[0_20px_50px_rgba(168,90,72,0.22)]"
      : side === "groom"
      ? "bg-gradient-to-b from-[#fffdfa] to-[#f2f5ec]/95 border-[#c0d0b0]/75 shadow-[0_12px_36px_rgba(88,107,70,0.11)] group-hover:border-[#586b46]/70 group-hover:shadow-[0_20px_50px_rgba(88,107,70,0.22)]"
      : side === "matriarch"
      ? "bg-gradient-to-b from-[#fffdf8] to-[#faf3e2]/95 border-[#b89138]/80 shadow-[0_16px_44px_rgba(184,145,56,0.18)] group-hover:border-[#b89138] group-hover:shadow-[0_20px_50px_rgba(184,145,56,0.28)]"
      : "bg-gradient-to-b from-[#fffdfa] to-[#faf5e8]/95 border-[#e0d2ad]/75 shadow-[0_12px_36px_rgba(74,58,40,0.1)] group-hover:border-[#b89138]/60 group-hover:shadow-[0_20px_50px_rgba(184,145,56,0.2)]";

  const innerFrameStyle =
    side === "bride"
      ? "border-[#d99b88]/35 group-hover:border-[#a85a48]/55"
      : side === "groom"
      ? "border-[#95a882]/35 group-hover:border-[#586b46]/55"
      : side === "matriarch"
      ? "border-[#b89138]/40 group-hover:border-[#b89138]/70"
      : "border-[#d0b875]/35 group-hover:border-[#b89138]/50";

  const locketOuterStyle =
    side === "bride"
      ? "border-[#d99b88] bg-gradient-to-b from-[#fffdfa] to-[#f7e6e0]"
      : side === "groom"
      ? "border-[#95a882] bg-gradient-to-b from-[#fffdfa] to-[#e8efe0]"
      : side === "matriarch"
      ? "border-[#b89138] bg-gradient-to-b from-[#fffdf8] to-[#f5ebd6]"
      : "border-[#d0b875] bg-gradient-to-b from-[#fffdfa] to-[#faf1dc]";

  const locketInnerStyle =
    side === "bride"
      ? "bg-[#faf0ec] border-[#e8bfa0]/40 text-[#a85a48]"
      : side === "groom"
      ? "bg-[#f2f6ee] border-[#c0d0b0]/40 text-[#586b46]"
      : side === "matriarch"
      ? "bg-[#f7f0df] border-[#b89138]/40 text-[#9e7828]"
      : "bg-[#faf4e6] border-[#d0b875]/40 text-[#8c6c23]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: reduced ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? {} : { y: -6, scale: 1.02 }}
      className="group relative flex flex-col h-full w-full"
    >
      {/* Organic Branch Growth Junction (Leaf & Bud Sprout at Card Top Edge) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <svg
          viewBox="0 0 36 20"
          className={`w-8 h-4 overflow-visible ${
            side === "bride" ? "text-[#a85a48]" : side === "groom" ? "text-[#586b46]" : "text-[#b89138]"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          {/* Left Leaf */}
          <path d="M 18 18 C 12 12, 4 12, 2 5 C 9 5, 15 10, 18 18 Z" fill="currentColor" fillOpacity="0.22" />
          {/* Right Leaf */}
          <path d="M 18 18 C 24 12, 32 12, 34 5 C 27 5, 21 10, 18 18 Z" fill="currentColor" fillOpacity="0.22" />
          {/* Central Bud Sprout */}
          <circle cx="18" cy="4" r="2.2" fill="currentColor" />
        </svg>
      </div>

      {/* Card Outer Container with Fibrous Torn-Paper Deckle Edge Filter */}
      <div className="relative h-full w-full">
        {/* Authentic Deckle Edge Filtered Base Paper */}
        <div className="deckle-edge absolute inset-0 rounded-2xl bg-[#fffdf9] shadow-[0_12px_36px_rgba(74,58,40,0.12)] pointer-events-none" aria-hidden="true" />

        {/* Card Content Surface with Tactile Grain & Custom Side Tint */}
        <div
          className={`grain relative backdrop-blur-md px-6 py-7 sm:px-8 sm:py-9 rounded-2xl border flex flex-col items-center text-center h-full transition-all duration-500 ${cardStyle}`}
        >
          {/* Inner Gold / Rose / Sage Corner Frame */}
          <div className={`pointer-events-none absolute inset-3 rounded-xl border transition-colors duration-500 ${innerFrameStyle}`} />

          {/* Handcrafted Gold Monogram Locket Avatar */}
          <div className="relative mb-3.5 flex items-center justify-center transition-transform duration-500 group-hover:scale-108">
            <div
              className={`rounded-full border-2 p-1 shadow-md ${locketOuterStyle} ${
                side === "matriarch" ? "w-16 h-16 sm:w-18 sm:h-18" : "w-14 h-14 sm:w-16 sm:h-16"
              }`}
            >
              <div
                className={`w-full h-full rounded-full border flex items-center justify-center font-[family-name:var(--font-serif)] font-bold tracking-wider shadow-inner ${locketInnerStyle} ${
                  side === "matriarch" ? "text-base sm:text-lg" : "text-sm sm:text-base"
                }`}
              >
                {monogram}
              </div>
            </div>
            <div
              className={`pointer-events-none absolute -inset-1 rounded-full border ${
                side === "bride" ? "border-[#d99b88]/30" : side === "groom" ? "border-[#95a882]/30" : "border-[#b89138]/25"
              }`}
            />
          </div>

          {/* Family Member Name */}
          <h3
            className={`font-[family-name:var(--font-serif)] font-medium leading-snug text-[#3a2b1c] ${
              side === "matriarch" ? "text-3xl sm:text-3.5xl text-[#2c1e10]" : "text-2xl sm:text-3xl"
            }`}
          >
            {person.name}
          </h3>

          {/* Differentiated Relation Label Badge */}
          <p className={`eyebrow font-bold text-[0.62rem] sm:text-xs uppercase mt-1.5 ${labelColor}`}>
            {person.relation}
          </p>

          {/* Personal Note */}
          <p className="font-[family-name:var(--font-script)] text-xl sm:text-2xl text-[#7a592c] italic mt-3.5 leading-relaxed">
            "{person.note}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
