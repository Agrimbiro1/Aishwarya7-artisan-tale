import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { couple } from "@/data/wedding";
import { Motes, Motif } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scene one: a keepsake box in low light. The ribbon unties, the wax seal
 * cracks, and the invitation slides out and unfolds panel by panel.
 */
export function Opening({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? 4 : 0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const marks = [1200, 2600, 4200, 5600];
    const timers = marks.map((ms, i) => window.setTimeout(() => setStage(i + 1), ms));
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const open = () => {
    setLeaving(true);
    window.setTimeout(onOpen, reduced ? 200 : 1500);
  };

  return (
    <AnimatePresence>
      {!leaving || reduced ? (
        <motion.div
          key="keepsake"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
          style={{ backgroundColor: "var(--night)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          {/* unfolding linen cloth */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, oklch(0.55 0.03 74 / 0.5), transparent 62%)",
            }}
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 3.4, ease: EASE }}
            aria-hidden="true"
          />
          <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <Motes count={16} />

          <motion.div
            className="relative w-full max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
          >
            {/* the invitation sliding out of the box */}
            <motion.div
              className="relative mx-auto w-[86%] origin-bottom"
              initial={{ y: 70, opacity: 0, rotateX: reduced ? 0 : 34 }}
              animate={
                stage >= 3
                  ? { y: -18, opacity: 1, rotateX: 0 }
                  : { y: 70, opacity: 0, rotateX: reduced ? 0 : 34 }
              }
              transition={{ duration: 2.2, ease: EASE }}
              style={{ transformPerspective: 1200 }}
            >
              <div className="deckle-edge absolute inset-0" aria-hidden="true" />
              <div className="grain relative px-8 py-12 text-center">
                <Motif kind="vine" className="mx-auto h-8 w-8 text-gold/70" />
                <p className="eyebrow mt-5">Together with their families</p>
                <motion.h1
                  className="script foil-text mt-4 text-5xl leading-[1.15] sm:text-6xl"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={stage >= 4 ? { opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 2.6, ease: EASE }}
                >
                  {couple.bride}
                  <span className="block text-3xl text-brass/70">&</span>
                  {couple.groom}
                </motion.h1>
                <p className="mt-5 font-[family-name:var(--font-roman)] text-[0.7rem] tracking-[0.34em] text-ink-soft uppercase">
                  {couple.city}
                </p>
                <motion.button
                  type="button"
                  onClick={open}
                  className="stamp mt-8 px-7 py-3 text-[0.7rem] text-ink"
                  initial={{ opacity: 0 }}
                  animate={stage >= 4 ? { opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.6 }}
                >
                  Open Invitation
                </motion.button>
              </div>
            </motion.div>

            {/* the box, its ribbon and its wax seal */}
            <div className="relative -mt-6">
              <div
                className="h-40 rounded-[2px] border border-brass/40 shadow-[0_30px_60px_-30px_oklch(0_0_0/0.8)]"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.86 0.028 78), oklch(0.72 0.03 72))",
                }}
              />
              <div className="grain absolute inset-0" aria-hidden="true" />
              {/* cotton ribbon */}
              <motion.div
                className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2"
                style={{ background: "oklch(0.75 0.05 24 / 0.75)" }}
                initial={{ scaleY: 1, opacity: 1 }}
                animate={stage >= 2 ? { scaleY: 0, opacity: 0, y: 30 } : {}}
                transition={{ duration: 1.8, ease: EASE }}
                aria-hidden="true"
              />
              {/* wax seal */}
              <motion.div
                className="absolute top-6 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 34% 30%, oklch(0.62 0.13 32), oklch(0.42 0.11 30))",
                  boxShadow: "0 6px 14px -6px oklch(0 0 0 / 0.7)",
                }}
                animate={
                  stage >= 2
                    ? { rotate: -18, y: 46, opacity: 0, scale: 0.85 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 1.6, ease: EASE }}
                aria-hidden="true"
              >
                <span className="script text-2xl text-champagne/90">AV</span>
              </motion.div>
            </div>

            <p className="mt-10 text-center text-xs tracking-[0.3em] text-champagne/45 uppercase">
              {stage >= 4 ? "Handmade in Udaipur" : "Unfolding…"}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
