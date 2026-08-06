import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import m4 from "@/assets/memory-4.jpg";
import { SectionTitle } from "./atoms";

const memories = [
  { src: m1, alt: "The couple laughing together in marigold garlands", note: "The day we told everyone.", date: "March 2025", tilt: -3 },
  { src: m2, alt: "Henna covered hands of the bride resting on ivory silk", note: "Six hours of henna, one hidden name.", date: "July 2025", tilt: 2.5 },
  { src: m3, alt: "The couple walking through a lantern lit haveli courtyard", note: "Udaipur, the evening he asked.", date: "November 2025", tilt: -1.5 },
  { src: m4, alt: "Turmeric being applied during a haldi ceremony", note: "Cousins. Turmeric. No mercy.", date: "January 2026", tilt: 3 },
];

export function Scrapbook() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : (memories[open] ?? null);

  return (
    <section id="album" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "var(--linen)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle eyebrow="Pasted in by hand" title="The memory album" script="Our scrapbook" />

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {memories.map((mem, i) => (
            <motion.button
              key={mem.note}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30, rotate: mem.tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: mem.tilt }}
              whileHover={reduced ? {} : { y: -8, rotate: 0, scale: 1.015 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: reduced ? 0.3 : 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block text-left focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <div className="deckle-edge absolute inset-0" aria-hidden="true" />
              <div className="grain relative p-4 pb-16">
                <img
                  src={mem.src}
                  alt={mem.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover shadow-[0_10px_24px_-18px_oklch(0.32_0.03_55/0.8)] sepia-[0.12] saturate-[0.9]"
                />
                {/* paper tape */}
                <span
                  className="absolute -top-3 left-8 h-7 w-24 -rotate-6"
                  aria-hidden="true"
                  style={{ background: "oklch(0.88 0.03 84 / 0.75)", boxShadow: "0 1px 3px oklch(0.32 0.03 55 / 0.2)" }}
                />
                <span
                  className="absolute -top-3 right-10 h-7 w-20 rotate-5"
                  aria-hidden="true"
                  style={{ background: "oklch(0.88 0.03 84 / 0.7)" }}
                />
                <p className="script mt-5 text-2xl text-brass transition-opacity duration-500 sm:opacity-70 sm:group-hover:opacity-100">
                  {mem.note}
                </p>
                <p className="mt-1 font-[family-name:var(--font-roman)] text-[0.6rem] tracking-[0.32em] text-ink-soft uppercase">
                  {mem.date}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center px-5"
            style={{ backgroundColor: "oklch(0.178 0.014 60 / 0.86)" }}
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
              initial={{ rotateX: reduced ? 0 : 40, opacity: 0, y: 30 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: reduced ? 0 : 25, opacity: 0 }}
              transition={{ duration: reduced ? 0.2 : 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1400 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="deckle-edge absolute inset-0" aria-hidden="true" />
              <div className="grain relative p-5">
                <img src={current.src} alt={current.alt} width={1024} height={1024} className="w-full object-cover sepia-[0.1]" />
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="script text-2xl text-brass">{current.note}</span>
                  <button type="button" onClick={() => setOpen(null)} className="stamp px-4 py-2 text-[0.6rem] text-ink">
                    Close album
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
