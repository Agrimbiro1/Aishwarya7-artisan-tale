import { motion, useReducedMotion } from "motion/react";
import { couple, invitation } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { InkRule, Motif, Reveal } from "./atoms";

const lines: { label?: string; text: string; script?: boolean }[] = [
  { text: "Together with their families" },
  { label: "Parents of the Bride", text: invitation.brideParents },
  { label: "Parents of the Groom", text: invitation.groomParents },
  { text: "request the honour of your presence at the marriage of" },
  { text: `${couple.bride} & ${couple.groom}`, script: true },
  { label: "On", text: `${couple.date}, ${couple.year}` },
  { label: "At", text: invitation.time },
  { label: "Venue", text: `${invitation.venue}, ${couple.city}` },
];

export function InvitationCard() {
  const reduced = useReducedMotion();
  return (
    <section id="invitation" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "rgba(248, 236, 233, 0.55)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl">
        <div className="deckle-edge absolute inset-0" aria-hidden="true" />
        <div className="grain relative px-6 py-16 sm:px-20 sm:py-24">
          {[
            "-top-14 -left-14",
            "-top-14 -right-14 rotate-90",
            "-bottom-14 -left-14 -rotate-90",
            "-bottom-14 -right-14 rotate-180",
          ].map((pos, i) => (
            <motion.img
              key={pos}
              src={floral}
              alt=""
              aria-hidden="true"
              width={1024}
              height={1024}
              loading="lazy"
              className={`pointer-events-none absolute ${pos} w-40 opacity-45 mix-blend-multiply sm:w-56`}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
              whileInView={{ opacity: 0.45, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.3 : 2.6, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}

          <div className="pointer-events-none absolute inset-5 border border-gold/25" aria-hidden="true" />

          <div className="relative text-center">
            <Motif kind="mandap" className="mx-auto h-10 w-10 text-gold/70" />
            <div className="mt-10 space-y-7">
              {lines.map((line, i) => (
                <Reveal key={line.text} delay={i * 0.18} y={10}>
                  {line.label ? (
                    <p className="eyebrow mb-1 text-[0.6rem]">{line.label}</p>
                  ) : null}
                  <p
                    className={
                      line.script
                        ? "script letterpress py-2 text-5xl text-brass sm:text-6xl"
                        : "letterpress text-lg text-ink-soft sm:text-xl"
                    }
                  >
                    {line.text}
                  </p>
                </Reveal>
              ))}
            </div>

            <InkRule className="mx-auto mt-12 opacity-70" width={200} />
            <Reveal delay={1.6}>
              <p className="mx-auto mt-8 max-w-lg text-base leading-loose text-ink-soft italic">
                {invitation.blessing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
