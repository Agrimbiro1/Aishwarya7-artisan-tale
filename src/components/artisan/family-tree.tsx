import { motion, useReducedMotion } from "motion/react";
import { family } from "@/data/wedding";
import tree from "@/assets/watercolor-tree.png";
import { Motif, SectionTitle } from "./atoms";

export function FamilyTree() {
  const reduced = useReducedMotion();
  return (
    <section id="family" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <img
        src={tree}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1536}
        height={1024}
        className="pointer-events-none absolute inset-x-0 top-24 mx-auto w-[min(70rem,110%)] opacity-20 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle eyebrow="Two families, one root" title="The family tree" script="Those who made us" />

        {/* branches drawing themselves */}
        <svg viewBox="0 0 800 120" className="mx-auto mt-10 w-full max-w-3xl" fill="none" aria-hidden="true">
          <motion.path
            d="M400 0 C 400 50, 200 46, 120 116 M400 0 C 400 60, 600 46, 680 116 M400 0 L400 116"
            stroke="var(--brass)"
            strokeWidth="1"
            strokeOpacity="0.55"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 3, ease: "easeInOut" }}
          />
        </svg>

        <ul className="-mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {family.map((person, i) => (
            <motion.li
              key={person.name}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: reduced ? 0.3 : 1.3, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="deckle-edge absolute inset-0" aria-hidden="true" />
              <div className="grain relative px-6 py-8 text-center">
                <div className="pointer-events-none absolute inset-3 border border-gold/25" aria-hidden="true" />
                <Motif kind={i % 2 ? "leaf" : "marigold"} className="mx-auto h-10 w-10 text-sage/70" />
                <h3 className="letterpress mt-4 text-2xl leading-snug text-ink">{person.name}</h3>
                <p className="eyebrow mt-2 text-[0.58rem]">{person.relation}</p>
                <p className="script mt-4 max-h-0 overflow-hidden text-xl text-brass/90 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100 motion-reduce:max-h-24 motion-reduce:opacity-100">
                  {person.note}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
