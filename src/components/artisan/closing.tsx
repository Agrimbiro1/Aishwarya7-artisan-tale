import { motion, useReducedMotion } from "motion/react";
import { couple } from "@/data/wedding";
import { InkRule, Motes, Motif } from "./atoms";

export function Closing() {
  const reduced = useReducedMotion();
  return (
    <footer
      className="relative overflow-hidden px-5 py-32 text-center"
    >
      <div className="grain absolute inset-0" aria-hidden="true" />
      <Motes count={8} petal />

      <motion.div
        className="relative mx-auto max-w-xl origin-bottom"
        initial={{ opacity: 0, rotateX: reduced ? 0 : 22, y: 30 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: reduced ? 0.3 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
      >
        <div className="deckle-edge absolute inset-0" aria-hidden="true" />
        <div className="grain relative px-8 py-16">
          <div className="pointer-events-none absolute inset-4 border border-gold/30" aria-hidden="true" />
          <Motif kind="vine" className="mx-auto h-10 w-10 text-gold/70" />
          <p className="mt-8 text-xl leading-loose text-ink-soft">
            Thank you for being part of our story.
          </p>
          <InkRule className="mx-auto mt-6 opacity-70" width={170} />
          <p className="script mt-8 text-4xl text-ink/85">
            {couple.bride} &amp; {couple.groom}
          </p>
          <p className="mt-6 font-[family-name:var(--font-roman)] text-[0.58rem] tracking-[0.36em] text-ink-soft/80 uppercase">
            {couple.city} · February 2027
          </p>

          {/* the wax seal returns */}
          <div
            className="mx-auto mt-10 grid h-14 w-14 place-items-center rounded-full"
            style={{
              background: "radial-gradient(circle at 34% 30%, oklch(0.64 0.12 32), oklch(0.44 0.1 30))",
              boxShadow: "0 6px 14px -8px oklch(0.32 0.03 55 / 0.9)",
            }}
            aria-hidden="true"
          >
            <span className="script text-xl text-champagne/90">AV</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
