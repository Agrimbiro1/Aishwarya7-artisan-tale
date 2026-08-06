import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { couple, invitation } from "@/data/wedding";
import silkTable from "@/assets/silk-table.jpg";
import boxLid from "@/assets/box-lid.png";
import floral from "@/assets/floral-spray.png";
import { Motes } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;
const LINEN = [0.4, 0, 0.2, 1] as const;

/**
 * Scene marks, in seconds, matching the storyboard:
 * 0 light   2 box   4 ribbon   6 wax   7 lid   9 slide
 * 11 unfold 13 artwork 14.4 names 15.6 details 16.6 button
 */
const MARKS = [0, 2, 4, 6, 7, 9, 11, 13, 14.4, 15.6, 16.6];

function useScene(reduced: boolean) {
  const [scene, setScene] = useState(reduced ? MARKS.length - 1 : 0);
  useEffect(() => {
    if (reduced) return;
    const timers = MARKS.map((s, i) => window.setTimeout(() => setScene(i), s * 1000));
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);
  return [scene, setScene] as const;
}

/** A wax seal that develops cracks and falls apart in a few real pieces. */
function WaxSeal({ broken }: { broken: boolean }) {
  const shards = [
    { d: "M32 32 L32 2 A30 30 0 0 1 58 18 Z", x: 26, y: -30, r: 34 },
    { d: "M32 32 L58 18 A30 30 0 0 1 44 60 Z", x: 34, y: 26, r: -22 },
    { d: "M32 32 L44 60 A30 30 0 0 1 8 54 Z", x: -6, y: 40, r: 18 },
    { d: "M32 32 L8 54 A30 30 0 0 1 32 2 Z", x: -32, y: 14, r: -30 },
  ];
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="waxFill" cx="34%" cy="30%">
          <stop offset="0%" stopColor="oklch(0.64 0.14 32)" />
          <stop offset="100%" stopColor="oklch(0.4 0.11 30)" />
        </radialGradient>
      </defs>
      {shards.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="url(#waxFill)"
          stroke="oklch(0.34 0.09 28 / 0.75)"
          strokeWidth={broken ? 0.7 : 0}
          initial={false}
          animate={
            broken
              ? { x: s.x, y: s.y, rotate: s.r, opacity: 0, scale: 0.9 }
              : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.5, ease: LINEN, delay: i * 0.12 }}
          style={{ originX: "32px", originY: "32px" }}
        />
      ))}
      <motion.text
        x="32"
        y="40"
        textAnchor="middle"
        className="script"
        fontSize="22"
        fill="oklch(0.92 0.03 86 / 0.85)"
        animate={{ opacity: broken ? 0 : 1 }}
        transition={{ duration: 0.7 }}
      >
        AV
      </motion.text>
    </svg>
  );
}

/** Watercolour + ink border that paints itself around the open invitation. */
function PaintedBorder({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 320 440"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {[
        "M20 26 C 70 12, 250 12, 300 26",
        "M300 414 C 250 428, 70 428, 20 414",
        "M18 30 C 8 120, 8 320, 18 410",
        "M302 30 C 312 120, 312 320, 302 410",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="var(--gold)"
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.85 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.15 * i }}
        />
      ))}
      {[
        { d: "M40 60 c 14 -16, 34 -10, 30 8 c -3 16, -24 18, -30 -8", x: 0 },
        { d: "M280 380 c -14 16, -34 10, -30 -8 c 3 -16, 24 -18, 30 8", x: 0 },
      ].map((p, i) => (
        <motion.path
          key={`m${i}`}
          d={p.d}
          stroke="var(--brass)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.8 + i * 0.3 }}
        />
      ))}
    </svg>
  );
}

export function Opening({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [scene, setScene] = useScene(!!reduced);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const at = (i: number) => scene >= i;

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onOpen, reduced ? 150 : 1400);
  };

  const skip = () => setScene(MARKS.length - 1);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="keepsake"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
          style={{ backgroundColor: "oklch(0.09 0.01 60)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {/* Scene 1 — the tabletop emerges out of the dark as light enters */}
          <motion.img
            src={silkTable}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.12, filter: "brightness(0.15) blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
            transition={{ duration: 5, ease: LINEN }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, oklch(0.98 0.07 88 / 0.42), transparent 46%), radial-gradient(90% 70% at 50% 55%, transparent 30%, oklch(0.08 0.01 60 / 0.72))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, ease: LINEN }}
            aria-hidden="true"
          />
          <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <Motes count={18} />

          <div className="relative w-full max-w-md" style={{ perspective: 1600 }}>
            {/* Scene 6/7 — the invitation slides out and unfolds panel by panel */}
            <motion.div
              className="relative mx-auto w-[88%] origin-bottom"
              initial={{ y: 90, opacity: 0, rotateX: 26, scale: 0.94 }}
              animate={
                at(6)
                  ? { y: -34, opacity: 1, rotateX: 0, rotate: -0.6, scale: 1 }
                  : at(5)
                    ? { y: 18, opacity: 1, rotateX: 14, rotate: -1.4, scale: 0.97 }
                    : { y: 90, opacity: 0, rotateX: 26, scale: 0.94 }
              }
              transition={{ duration: 2.4, ease: LINEN }}
              style={{ transformPerspective: 1400, transformStyle: "preserve-3d" }}
            >
              {/* fold shadow while the panels open */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.2 0.02 60 / 0.5), transparent 22%, transparent 78%, oklch(0.2 0.02 60 / 0.5))",
                }}
                animate={{ opacity: at(7) ? 0 : 1 }}
                transition={{ duration: 2, ease: LINEN }}
                aria-hidden="true"
              />
              <motion.div
                className="relative"
                initial={{ scaleX: 0.42 }}
                animate={{ scaleX: at(6) ? 1 : 0.42 }}
                transition={{ duration: 2.2, ease: LINEN }}
              >
                <div className="deckle-edge absolute inset-0" aria-hidden="true" />
                <img
                  src={floral}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={1024}
                  className="pointer-events-none absolute -top-10 -left-10 w-40 opacity-0 mix-blend-multiply"
                  style={{ opacity: at(7) ? 0.4 : 0, transition: "opacity 2.4s ease" }}
                />
                <PaintedBorder on={at(7)} />

                <div className="grain relative px-8 py-12 text-center">
                  {/* Scene 9 — the names are written, not faded */}
                  <motion.h2
                    className="script foil-text text-5xl leading-[1.15] sm:text-6xl"
                    initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(3px)" }}
                    animate={
                      at(8)
                        ? { clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }
                        : { clipPath: "inset(0 100% 0 0)" }
                    }
                    transition={{ duration: 3.2, ease: "easeInOut" }}
                  >
                    {couple.bride}
                    <span className="block text-3xl text-brass/70">&</span>
                    {couple.groom}
                  </motion.h2>

                  {/* Scene 10 — details letterpress in, line by line */}
                  {[
                    "We joyfully invite you",
                    couple.date,
                    invitation.venue,
                    invitation.time,
                  ].map((line, i) => (
                    <motion.p
                      key={line}
                      className={
                        i === 0
                          ? "letterpress mt-6 font-[family-name:var(--font-roman)] text-[0.7rem] tracking-[0.34em] text-ink-soft uppercase"
                          : "letterpress mt-2 font-[family-name:var(--font-roman)] text-[0.66rem] tracking-[0.24em] text-ink-soft/85 uppercase"
                      }
                      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                      animate={at(9) ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                      transition={{ duration: 1.6, ease: LINEN, delay: i * 0.5 }}
                    >
                      {line}
                    </motion.p>
                  ))}

                  {/* Scene 11 — an embossed part of the paper, not a button */}
                  <motion.button
                    type="button"
                    onClick={finish}
                    className="stamp group mt-9 px-7 py-3 text-[0.7rem] text-ink transition-[transform,box-shadow] duration-500 hover:-translate-y-[3px] hover:shadow-[0_18px_30px_-18px_oklch(0_0_0/0.6)]"
                    initial={{ opacity: 0 }}
                    animate={at(10) ? { opacity: 1 } : {}}
                    transition={{ duration: 1.6, ease: LINEN }}
                  >
                    <span className="foil-text">Open Invitation</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Scenes 2–5 — the box, its ribbon, its seal and its lid */}
            <div className="relative -mt-10">
              <motion.div
                className="relative"
                initial={{ y: 120, opacity: 0, scale: 0.92 }}
                animate={at(1) ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 2.6, ease: LINEN }}
              >
                {/* open box interior, revealed as the lid lifts */}
                <div
                  className="h-44 rounded-[3px] border border-brass/40 shadow-[0_40px_70px_-34px_oklch(0_0_0/0.85)]"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.5 0.05 32), oklch(0.3 0.04 30))",
                  }}
                />
                {/* the lid itself */}
                <motion.img
                  src={boxLid}
                  alt=""
                  aria-hidden="true"
                  width={1024}
                  height={768}
                  className="absolute inset-x-0 top-0 h-44 w-full origin-bottom object-cover"
                  style={{ transformPerspective: 1200 }}
                  animate={
                    at(4)
                      ? { rotateX: -104, y: -8, opacity: 0.9 }
                      : { rotateX: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 2.4, ease: LINEN }}
                />
                {/* light spilling into the open box */}
                <motion.div
                  className="pointer-events-none absolute inset-x-6 top-2 h-24"
                  style={{
                    background:
                      "radial-gradient(60% 100% at 50% 0%, oklch(0.98 0.08 88 / 0.6), transparent 70%)",
                  }}
                  animate={{ opacity: at(4) ? 1 : 0 }}
                  transition={{ duration: 2, ease: LINEN }}
                  aria-hidden="true"
                />

                {/* raw silk ribbon, loosening and falling */}
                <motion.div
                  className="absolute top-0 bottom-0 left-1/2 w-9 -translate-x-1/2 origin-top"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.7 0.06 24 / 0.5), oklch(0.82 0.06 26 / 0.9), oklch(0.66 0.06 22 / 0.55))",
                    boxShadow: "0 2px 10px -4px oklch(0 0 0 / 0.6)",
                  }}
                  animate={
                    at(2)
                      ? { scaleY: 0.15, y: 60, rotate: 5, opacity: 0, skewX: 6 }
                      : { scaleY: 1, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 2.6, ease: LINEN }}
                  aria-hidden="true"
                />
                {/* gold thread */}
                <motion.div
                  className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
                  style={{ background: "var(--gold)", opacity: 0.7 }}
                  animate={at(2) ? { opacity: 0, y: 50 } : {}}
                  transition={{ duration: 2.2, ease: LINEN }}
                  aria-hidden="true"
                />
                {/* wax seal */}
                <motion.div
                  className="absolute top-8 left-1/2 h-16 w-16 -translate-x-1/2"
                  animate={at(4) ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.4 }}
                >
                  <WaxSeal broken={at(3)} />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {!at(10) ? (
            <motion.button
              type="button"
              onClick={skip}
              className="absolute right-6 bottom-6 font-[family-name:var(--font-roman)] text-[0.58rem] tracking-[0.35em] text-champagne/55 uppercase transition-colors hover:text-champagne"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.2 }}
            >
              Skip
            </motion.button>
          ) : null}
        </motion.div>
      ) : null}

      {/* Scene 11 — the paper expands until it becomes the page */}
      {leaving && !reduced ? (
        <motion.div
          key="into"
          className="pointer-events-none fixed inset-0 z-50"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 45%, oklch(0.975 0.014 86), oklch(0.925 0.026 80))",
          }}
          initial={{ opacity: 0, scale: 0.6, borderRadius: 24 }}
          animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: LINEN }}
        />
      ) : null}
    </AnimatePresence>
  );
}
