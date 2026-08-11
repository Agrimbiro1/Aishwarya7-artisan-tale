import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Hidden SVG filters used for deckled paper edges. */
export function CraftDefs() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter id="deckleEdge">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.05" numOctaves={3} seed={9} result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="sandGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={3}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.55
                    0 0 0 0 0.47
                    0 0 0 0 0.35
                    0 0 0 0.12 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

/** A sheet of handmade paper with torn edges, grain and letterpress depth. */
export function Paper({
  children,
  className = "",
  tint,
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="deckle-edge card-sand-texture absolute inset-0" aria-hidden="true" />
      {tint ? (
        <div className="absolute inset-0" style={{ backgroundColor: tint }} aria-hidden="true" />
      ) : null}
      <div className="grain relative z-10">{children}</div>
    </div>
  );
}

/** Slow, hand-drawn reveal used across the whole invitation. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: reduced ? 0.3 : 1.5, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** An ink rule that draws itself, like a nib crossing the page. */
export function InkRule({ className = "", width = 220 }: { className?: string; width?: number }) {
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox={`0 0 ${width} 14`}
      width={width}
      height={14}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <motion.path
        d={`M2 8 C ${width * 0.25} 2, ${width * 0.4} 12, ${width * 0.5} 7 C ${width * 0.62} 2, ${width * 0.78} 12, ${width - 2} 6`}
        stroke="var(--brass)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: 0.9 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 2.2, ease: "easeInOut" }}
      />
      <circle cx={width / 2} cy="7" r="1.6" fill="var(--gold)" />
    </svg>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  script,
}: {
  eyebrow: string;
  title: string;
  script?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.12}>
        <h2 className="letterpress mt-4 text-4xl leading-tight text-ink sm:text-5xl">{title}</h2>
      </Reveal>
      {script ? (
        <Reveal delay={0.2}>
          <p className="script mt-2 text-2xl text-brass/80">{script}</p>
        </Reveal>
      ) : null}
      <InkRule className="mt-5 opacity-80" />
    </div>
  );
}

/** Occasional dust motes and petals — restrained on purpose. */
export function Motes({ count = 14, petal = false }: { count?: number; petal?: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = petal ? 7 + (i % 4) * 3 : 2 + (i % 3);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${(i * 97) % 100}%`,
              width: size,
              height: petal ? size * 0.62 : size,
              background: petal ? "var(--rose)" : "var(--gold)",
              opacity: petal ? 0.4 : 0.5,
              borderRadius: petal ? "60% 20% 60% 20%" : "999px",
              ["--dx" as string]: `${((i % 5) - 2) * 45}px`,
              animation: `drift ${26 + (i % 7) * 6}s linear ${i * 2.4}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Small hand-inked botanical motifs. */
export function Motif({
  kind,
  className = "",
  style,
}: {
  kind: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const paths: Record<string, ReactNode> = {
    marigold: (
      <>
        <circle cx="32" cy="32" r="9" />
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={i} cx="32" cy="15" rx="4.4" ry="8" transform={`rotate(${i * 36} 32 32)`} />
        ))}
      </>
    ),
    leaf: (
      <>
        <path d="M32 56 C 32 34, 20 20, 10 12 C 24 14, 34 26, 32 56" />
        <path d="M32 56 C 32 30, 44 18, 56 12 C 44 18, 34 32, 32 56" />
        <path d="M32 56 L32 30" />
      </>
    ),
    sitar: (
      <>
        <circle cx="20" cy="44" r="13" />
        <path d="M27 34 L52 10" />
        <path d="M31 38 L56 14" />
        <circle cx="54" cy="10" r="3" />
      </>
    ),
    mandap: (
      <>
        <path d="M8 54 L8 26 M56 54 L56 26" />
        <path d="M4 26 C 20 10, 44 10, 60 26" />
        <path d="M32 10 L32 4" />
        <path d="M18 54 L46 54" />
      </>
    ),
    coupe: (
      <>
        <path d="M18 14 L46 14 L36 32 L28 32 Z" />
        <path d="M32 32 L32 50 M22 52 L42 52" />
      </>
    ),
    vine: (
      <>
        <path d="M4 60 C 22 48, 26 26, 60 4" />
        <path d="M22 44 C 18 34, 24 30, 30 32" />
        <path d="M38 26 C 36 16, 42 12, 48 14" />
      </>
    ),
    lotus: (
      <>
        <path d="M32 12 C 24 24, 24 40, 32 52 C 40 40, 40 24, 32 12 Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M32 52 C 14 44, 8 28, 14 18 C 24 28, 28 42, 32 52 Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M32 52 C 50 44, 56 28, 50 18 C 40 28, 36 42, 32 52 Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 48 C 24 56, 40 56, 52 48" strokeWidth="1.2" />
      </>
    ),
    diya: (
      <>
        <path d="M32 8 C 30 18, 24 24, 32 30 C 40 24, 34 18, 32 8 Z" fill="currentColor" fillOpacity="0.3" />
        <path d="M10 32 C 10 50, 54 50, 54 32 C 42 38, 22 38, 10 32 Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M16 46 C 24 54, 40 54, 48 46" strokeWidth="1.2" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      {paths[kind] ?? paths['vine']}
    </svg>
  );
}

/** Corner ornament of hand-drawn gold vines. */
export function CornerVine({ className = "" }: { className?: string }) {
  return (
    <Motif kind="vine" className={`h-16 w-16 text-gold/60 ${className}`} />
  );
}
