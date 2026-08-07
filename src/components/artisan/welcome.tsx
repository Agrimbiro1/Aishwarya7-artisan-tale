import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { couple } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { InkRule, Motes, Motif } from "./atoms";
import { FlyingBirds } from "./flying-birds";
import { GoldenSparkles } from "./golden-sparkles";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Welcome() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 60, damping: 20 });
  const foilShift = useTransform(mx, [-0.5, 0.5], ["12%", "88%"]);

  const track = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="welcome"
      onPointerMove={track}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24"
      style={{
        background:
          "radial-gradient(130% 100% at 50% 0%, rgba(255, 247, 245, 0.55), rgba(245, 228, 228, 0.4))",
      }}
    >
      <div className="grain absolute inset-0" aria-hidden="true" />
      <FlyingBirds density="low" />
      <GoldenSparkles density="medium" />
      <Motes count={10} />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -top-16 -left-24 w-[26rem] opacity-35 mix-blend-multiply sm:-left-10"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-28 -bottom-20 w-[30rem] rotate-180 opacity-30 mix-blend-multiply"
      />

      <motion.div
        className="relative w-full max-w-2xl"
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: EASE }}
      >
        <div className="deckle-edge absolute inset-0" aria-hidden="true" />
        <div className="grain relative px-7 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-4 border border-gold/25" aria-hidden="true" />
          <Motif kind="marigold" className="mx-auto h-9 w-9 text-gold/70" />
          <p className="eyebrow mt-6">Welcome to our wedding celebration</p>

          <motion.h1
            className="script mt-6 text-6xl leading-[1.05] sm:text-8xl"
            style={{
              backgroundImage: "var(--foil)",
              backgroundSize: "260% 100%",
              backgroundPositionX: reduced ? "50%" : foilShift,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {couple.bride} <span className="text-[0.5em]">&</span> {couple.groom}
          </motion.h1>

          <InkRule className="mx-auto mt-7 opacity-80" width={260} />

          <p className="mt-6 font-[family-name:var(--font-roman)] text-sm tracking-[0.3em] text-ink-soft uppercase">
            {couple.date}
          </p>
          <p className="mt-1 font-[family-name:var(--font-roman)] text-xs tracking-[0.3em] text-brass uppercase">
            {couple.city}
          </p>

          <p className="mx-auto mt-9 max-w-md text-lg leading-relaxed text-ink-soft italic">
            “{couple.quote}”
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[0.62rem] tracking-[0.4em] text-ink-soft/70 uppercase">Turn the page</p>
      </motion.div>
    </section>
  );
}
