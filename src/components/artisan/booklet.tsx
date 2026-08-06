import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { events } from "@/data/wedding";
import { InkRule, Motif, SectionTitle } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The ceremonies, bound as a booklet. Each spread turns like real paper. */
export function Booklet() {
  const reduced = useReducedMotion();
  const [[page, dir], setPage] = useState<[number, number]>([0, 1]);
  const go = (next: number) => {
    if (next < 0 || next >= events.length) return;
    setPage([next, next > page ? 1 : -1]);
  };
  const event = events[page]!;

  return (
    <section id="ceremonies" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "rgba(245, 228, 228, 0.45)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl">
        <SectionTitle eyebrow="The Booklet of Days" title="Five evenings, bound together" script="Ceremonies" />

        <div className="mt-14" style={{ perspective: 2000 }}>
          <div className="relative min-h-[30rem]">
            {/* the pages resting beneath the current spread */}
            <div className="absolute inset-x-3 top-2 bottom-0 bg-card/70 shadow-[0_20px_40px_-30px_oklch(0.32_0.03_55/0.6)]" aria-hidden="true" />
            <div className="absolute inset-x-1.5 top-1 bottom-0 bg-card/85" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.article
                key={event.name}
                custom={dir}
                initial={reduced ? { opacity: 0 } : { rotateY: dir * 42, opacity: 0, x: dir * 30 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { rotateY: dir * -30, opacity: 0, x: dir * -24 }}
                transition={{ duration: reduced ? 0.25 : 1.05, ease: EASE }}
                className="relative origin-left"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="deckle-edge absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-0" style={{ backgroundColor: event.tint }} aria-hidden="true" />
                <div className="grain relative grid gap-10 px-7 py-14 sm:grid-cols-[auto_1fr] sm:px-16">
                  <div className="flex flex-col items-center gap-4 sm:items-start">
                    <Motif kind={event.motif} className="h-20 w-20" style={{ color: event.ink }} />
                    <span
                      className="font-[family-name:var(--font-roman)] text-[0.62rem] tracking-[0.36em] uppercase"
                      style={{ color: event.ink }}
                    >
                      {String(page + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="script text-2xl" style={{ color: event.ink }}>
                      {event.script}
                    </p>
                    <h3 className="letterpress mt-1 text-5xl text-ink sm:text-6xl">{event.name}</h3>
                    <InkRule className="mt-4 opacity-70" width={160} />
                    <dl className="mt-7 space-y-3">
                      {[
                        ["Date", event.date],
                        ["Time", event.time],
                        ["Where", event.place],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                          <dt className="eyebrow text-[0.58rem]">{k}</dt>
                          <dd className="text-lg text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-7 max-w-md leading-loose text-ink-soft italic">{event.note}</p>
                  </div>
                </div>
                {/* page curl */}
                <div
                  className="pointer-events-none absolute right-0 bottom-0 h-16 w-16"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 50%, oklch(0.86 0.028 78) 50%, oklch(0.97 0.012 86) 100%)",
                    boxShadow: "-4px -4px 10px -4px oklch(0.32 0.03 55 / 0.4)",
                  }}
                />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 0} className="stamp px-5 py-2.5 text-[0.62rem] text-ink disabled:opacity-35">
            Previous page
          </button>
          <div className="flex items-center gap-2 px-2">
            {events.map((e, i) => (
              <button
                key={e.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to ${e.name}`}
                aria-current={i === page}
                className="h-2.5 w-2.5 rounded-full border border-brass/60 transition-colors"
                style={{ backgroundColor: i === page ? "var(--brass)" : "transparent" }}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(page + 1)} disabled={page === events.length - 1} className="stamp px-5 py-2.5 text-[0.62rem] text-ink disabled:opacity-35">
            Turn the page
          </button>
        </div>
      </div>
    </section>
  );
}
