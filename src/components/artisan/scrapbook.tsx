import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import m5 from "@/assets/memory-5.jpg";
import m6 from "@/assets/memory-6.jpg";
import m7 from "@/assets/memory-7.jpg";
import { SectionTitle } from "./atoms";

const memories = [
  {
    src: m1,
    alt: "Couple twirling together in golden beige lehenga in front of ancient carved stone temple",
    note: "Under ancient carved stone, our forever dance began.",
    date: "MARCH 2025",
    rotation: -3.5,
    offsetX: "sm:-translate-x-8",
    width: "sm:w-[92%]",
    tapeLeft: "-rotate-6",
    tapeRight: "rotate-8",
  },
  {
    src: m2,
    alt: "Couple holding hands on wooden pavilion stairs in maroon silk lehenga and ivory mundu",
    note: "Quiet laughter on heritage wooden stairs.",
    date: "MAY 2025",
    rotation: 3.2,
    offsetX: "sm:translate-x-10",
    width: "sm:w-[94%]",
    tapeLeft: "rotate-8",
    tapeRight: "-rotate-5",
  },
  {
    src: m3,
    alt: "Couple standing in warm autumn field, bride holding white sneakers and groom with flower bouquet",
    note: "Flowers in hand, shoes off, forever by your side.",
    date: "AUGUST 2025",
    rotation: -2.8,
    offsetX: "sm:-translate-x-10",
    width: "sm:w-[90%]",
    tapeLeft: "-rotate-8",
    tapeRight: "rotate-6",
  },
  {
    src: m6,
    alt: "Bride in sun hat sitting on black bench under white arch with groom leaning against wall",
    note: "Sunlit arches, quiet moments, and waiting for you.",
    date: "OCTOBER 2025",
    rotation: 3.6,
    offsetX: "sm:translate-x-6",
    width: "sm:w-[92%]",
    tapeLeft: "rotate-7",
    tapeRight: "-rotate-6",
  },
  {
    src: m4,
    alt: "Couple walking hand-in-hand along a sunny golden pathway with flowers",
    note: "Golden sunlight, warm breeze, and holding your hand.",
    date: "NOVEMBER 2025",
    rotation: -3.8,
    offsetX: "sm:-translate-x-8",
    width: "sm:w-[93%]",
    tapeLeft: "-rotate-6",
    tapeRight: "rotate-7",
  },
  {
    src: m7,
    alt: "Couple sitting together in golden grass meadow, groom kissing bride on the cheek",
    note: "Golden fields, soft kisses, and timeless warmth.",
    date: "DECEMBER 2025",
    rotation: 3.0,
    offsetX: "sm:translate-x-8",
    width: "sm:w-[94%]",
    tapeLeft: "rotate-6",
    tapeRight: "-rotate-5",
  },
  {
    src: m5,
    alt: "Couple dancing and twirling under lush green trees in ivory outfits",
    note: "Spinning under green leaves, lost in love.",
    date: "JANUARY 2026",
    rotation: -3.2,
    offsetX: "sm:-translate-x-6",
    width: "sm:w-[91%]",
    tapeLeft: "-rotate-7",
    tapeRight: "rotate-5",
  },
];

const tapePatterns = [
  {
    // Soft Gold Striped Washi Pattern
    leftBg: "repeating-linear-gradient(135deg, rgba(230, 200, 140, 0.88), rgba(230, 200, 140, 0.88) 7px, rgba(248, 230, 185, 0.92) 7px, rgba(248, 230, 185, 0.92) 14px)",
    rightBg: "repeating-linear-gradient(-45deg, rgba(225, 190, 130, 0.88), rgba(225, 190, 130, 0.88) 7px, rgba(245, 220, 170, 0.92) 7px, rgba(245, 220, 170, 0.92) 14px)",
  },
  {
    // Blush Rose & Gold Lattice Washi Pattern
    leftBg: "repeating-linear-gradient(45deg, rgba(238, 198, 178, 0.88), rgba(238, 198, 178, 0.88) 8px, rgba(248, 224, 208, 0.92) 8px, rgba(248, 224, 208, 0.92) 16px)",
    rightBg: "repeating-linear-gradient(135deg, rgba(232, 188, 168, 0.88), rgba(232, 188, 168, 0.88) 8px, rgba(245, 215, 195, 0.92) 8px, rgba(245, 215, 195, 0.92) 16px)",
  },
  {
    // Warm Cream Vintage Linen Washi Pattern
    leftBg: "repeating-linear-gradient(90deg, rgba(246, 236, 208, 0.92), rgba(246, 236, 208, 0.92) 5px, rgba(236, 220, 186, 0.88) 5px, rgba(236, 220, 186, 0.88) 10px)",
    rightBg: "repeating-linear-gradient(0deg, rgba(242, 228, 196, 0.92), rgba(242, 228, 196, 0.92) 5px, rgba(232, 212, 174, 0.88) 5px, rgba(232, 212, 174, 0.88) 10px)",
  },
  {
    // Rich Golden Marigold Washi Pattern
    leftBg: "repeating-linear-gradient(135deg, rgba(228, 186, 122, 0.9), rgba(228, 186, 122, 0.9) 6px, rgba(244, 212, 152, 0.94) 6px, rgba(244, 212, 152, 0.94) 12px)",
    rightBg: "repeating-linear-gradient(45deg, rgba(222, 176, 112, 0.9), rgba(222, 176, 112, 0.9) 6px, rgba(238, 202, 142, 0.94) 6px, rgba(238, 202, 142, 0.94) 12px)",
  },
];

export function Scrapbook() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : (memories[open] ?? null);

  return (
    <section id="album" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: "transparent" }}>
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl z-10">
        {/* 1. Header Section with Flourish Framing & "Our Moments" Script */}
        <div className="text-center mb-16 sm:mb-24">
          {/* Centered Golden Botanical Leaf Sprig Ornament */}
          <div className="flex justify-center mb-3 text-[#b89138] opacity-90">
            <svg width="54" height="20" viewBox="0 0 54 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 27 18 Q 18 12 4 14 Q 16 5 27 18 Z" fill="#b89138" opacity="0.85" />
              <path d="M 27 18 Q 36 12 50 14 Q 38 5 27 18 Z" fill="#b89138" opacity="0.85" />
              <path d="M 27 19 L 27 4" stroke="#8c6c23" strokeWidth="1.6" />
              <circle cx="27" cy="3" r="2" fill="#b89138" />
            </svg>
          </div>

          {/* Script Heading: "Our Moments" */}
          <h2 className="font-[family-name:var(--font-script)] foil-text text-4.5xl sm:text-5.5xl font-normal leading-tight mb-2">
            Our Moments
          </h2>

          <SectionTitle eyebrow="Pasted in by hand" title="The Memory Album" script="Our Scrapbook" />

          {/* Ornamental Divider Flourish Rule */}
          <div className="flex items-center justify-center gap-3 mt-6 text-[#b89138]">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#b89138]/70" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#b89138]/70" />
          </div>
        </div>

        {/* 2. Organic Scrapbook Photo Album Layout with Generous Breathing Room */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {memories.map((mem, i) => {
            const currentTape = tapePatterns[i % tapePatterns.length];
            const leftBg = currentTape?.leftBg ?? "linear-gradient(90deg, rgba(230, 215, 184, 0.85), rgba(245, 235, 210, 0.85))";
            const rightBg = currentTape?.rightBg ?? "linear-gradient(90deg, rgba(230, 215, 184, 0.85), rgba(245, 235, 210, 0.85))";

            return (
              <motion.button
                key={mem.note}
                type="button"
                onClick={() => setOpen(i)}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 45, rotate: mem.rotation * 1.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: mem.rotation }}
                whileHover={reduced ? {} : { y: -12, rotate: 0, scale: 1.025, zIndex: 40 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: reduced ? 0.3 : 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative block text-left focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none w-full ${mem.width} ${mem.offsetX} mb-16 sm:mb-24 last:mb-0`}
                style={{ zIndex: 10 + i }}
              >
                {/* Handcrafted Polaroid Card Container */}
                <div className="relative card-sand-texture bg-[#fffdf9] p-4 sm:p-6 pb-16 sm:pb-20 rounded-sm shadow-[0_16px_45px_rgba(60,45,30,0.22),0_4px_14px_rgba(0,0,0,0.06)] border border-[#e8dcb8]/80 transition-shadow duration-500 group-hover:shadow-[0_28px_65px_rgba(60,45,30,0.35)]">
                  {/* Warm-Toned Patterned Washi Tape Strip Left */}
                  <span
                    className={`absolute -top-3.5 left-8 sm:left-12 h-7 w-24 sm:w-28 ${mem.tapeLeft} z-20 pointer-events-none backdrop-blur-[2px]`}
                    aria-hidden="true"
                    style={{
                      background: leftBg,
                      boxShadow: "0 3px 8px rgba(74, 58, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                      borderLeft: "2px dashed rgba(184, 145, 56, 0.5)",
                      borderRight: "2px dashed rgba(184, 145, 56, 0.5)",
                    }}
                  />

                  {/* Warm-Toned Patterned Washi Tape Strip Right */}
                  <span
                    className={`absolute -top-3.5 right-8 sm:right-12 h-7 w-20 sm:w-24 ${mem.tapeRight} z-20 pointer-events-none backdrop-blur-[2px]`}
                    aria-hidden="true"
                    style={{
                      background: rightBg,
                      boxShadow: "0 3px 8px rgba(74, 58, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                      borderLeft: "2px dashed rgba(184, 145, 56, 0.5)",
                      borderRight: "2px dashed rgba(184, 145, 56, 0.5)",
                    }}
                  />

                  {/* Photo Frame Container with Warm Vintage Storybook Color-Grade Filter */}
                  <div className="relative overflow-hidden aspect-[4/3] w-full rounded-xs shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] bg-[#2a1c10]">
                    <img
                      src={mem.src}
                      alt={mem.alt}
                      loading="lazy"
                      className="w-full h-full object-cover sepia-[0.22] contrast-[1.06] saturate-[0.92] brightness-[0.97] group-hover:scale-104 transition-transform duration-700 ease-out"
                    />

                    {/* Storybook Vintage Vignette & Warm Glow Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xs mix-blend-multiply opacity-60"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(255,255,255,0) 55%, rgba(110, 75, 38, 0.35) 100%)",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xs mix-blend-soft-light opacity-35"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(244, 235, 218, 0) 60%, rgba(139, 90, 43, 0.25) 100%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>

                {/* Handwritten Cursive Caption & Elevated Gold Serif Date */}
                <div className="mt-5 sm:mt-6 px-1">
                  <div className="flex items-start gap-2.5">
                    {/* Handwritten Journal Entry Accent Icon */}
                    <span className="text-[#b89138] text-xs sm:text-sm mt-1 select-none opacity-85">✦</span>
                    <div>
                      <p className="font-[family-name:var(--font-script)] text-2.5xl sm:text-3.5xl text-[#4a341b] leading-tight transition-colors duration-300 group-hover:text-[#b88e28]">
                        {mem.note}
                      </p>

                      {/* Elevated Gold Letter-Spaced Serif Date */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="h-[1px] w-5 sm:w-8 bg-gradient-to-r from-[#b89138]/70 to-transparent" />
                        <p className="font-[family-name:var(--font-serif)] text-[0.68rem] sm:text-xs tracking-[0.32em] text-[#b89138] italic font-semibold uppercase">
                          {mem.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center px-5"
            style={{ backgroundColor: "rgba(25, 18, 12, 0.88)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <motion.figure
              className="relative w-full max-w-3xl"
              initial={{ rotateX: reduced ? 0 : 35, opacity: 0, y: 30 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: reduced ? 0 : 25, opacity: 0 }}
              transition={{ duration: reduced ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1400 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative card-sand-texture bg-[#fffdf9] p-6 sm:p-8 rounded-sm shadow-2xl border border-[#e8dcb8]">
                <img src={current.src} alt={current.alt} width={1024} height={1024} className="w-full object-cover sepia-[0.08]" />
                <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-[family-name:var(--font-script)] text-3xl sm:text-4xl text-[#5c4021]">{current.note}</p>
                    <p className="font-[family-name:var(--font-roman)] text-xs tracking-[0.3em] text-[#997a52] uppercase mt-1 font-bold">{current.date}</p>
                  </div>
                  <button type="button" onClick={() => setOpen(null)} className="stamp px-4 py-2 text-xs text-ink uppercase tracking-widest">
                    Close Album
                  </button>
                </figcaption>
              </div>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
