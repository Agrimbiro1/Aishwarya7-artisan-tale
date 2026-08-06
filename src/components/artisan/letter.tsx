import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { contacts } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { InkRule, SectionTitle } from "./atoms";

export function Letter() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "var(--linen)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <img src={floral} alt="" aria-hidden="true" loading="lazy" width={1024} height={1024} className="pointer-events-none absolute -bottom-16 -left-20 w-80 opacity-25 mix-blend-multiply" />

      <div className="relative mx-auto max-w-2xl">
        <SectionTitle eyebrow="Write to us" title="A letter, sealed" script="Do say hello" />

        <div className="mt-14" style={{ perspective: 1600 }}>
          <div className="relative">
            {/* envelope flap */}
            <motion.div
              className="absolute inset-x-0 top-0 z-20 h-28 origin-top"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, oklch(0.9 0.028 80), oklch(0.83 0.03 76))",
                transformStyle: "preserve-3d",
              }}
              animate={{ rotateX: open && !reduced ? -172 : 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            <div className="deckle-edge absolute inset-0" aria-hidden="true" />

            <div className="grain relative px-7 py-16 sm:px-14">
              <motion.div
                animate={{ opacity: open ? 1 : 0.25, y: open ? 0 : 18 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: open ? 0.35 : 0 }}
              >
                <p className="script text-3xl text-brass">Dear friend,</p>
                <p className="mt-4 leading-loose text-ink-soft">
                  If you need anything at all — a room, a ride from the airport, or simply someone
                  to talk to about what to wear — please reach us here.
                </p>
                <InkRule className="mt-6 opacity-70" width={180} />

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {contacts.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        tabIndex={open ? 0 : -1}
                        className="stamp block px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                      >
                        <span className="block text-[0.58rem] text-brass">{c.label}</span>
                        <span className="mt-1 block font-[family-name:var(--font-body)] text-base tracking-normal text-ink normal-case">
                          {c.value}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="script mt-10 text-right text-3xl text-ink/80">Aanya & Vihaan</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button type="button" onClick={() => setOpen((v) => !v)} className="stamp px-7 py-3 text-[0.65rem] text-ink" aria-expanded={open}>
              {open ? "Seal the envelope" : "Break the seal"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
