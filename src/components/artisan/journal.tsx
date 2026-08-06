import { travel } from "@/data/wedding";
import map from "@/assets/hand-map.jpg";
import { Reveal, SectionTitle } from "./atoms";

export function Journal() {
  return (
    <section id="travel" className="relative overflow-hidden px-5 py-28" style={{ backgroundColor: "var(--champagne)" }}>
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle eyebrow="Carried in a coat pocket" title="Travel & stay" script="The journal" />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="relative">
              <div className="deckle-edge absolute inset-0" aria-hidden="true" />
              <div className="grain relative p-5">
                <img
                  src={map}
                  alt="Hand illustrated map of Udaipur showing the wedding venues, havelis and lake"
                  loading="lazy"
                  width={1536}
                  height={1024}
                  className="w-full object-cover"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="script text-2xl text-brass">Mewar, in ink</p>
                  <span className="stamp px-3 py-1.5 text-[0.55rem] text-ink">Fold here</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="deckle-edge absolute inset-0" aria-hidden="true" />
            <div className="grain relative divide-y divide-border/70 px-7 py-8 sm:px-10">
              {travel.map((entry, i) => (
                <Reveal key={entry.label} delay={i * 0.08}>
                  <div className="py-5">
                    <p className="eyebrow text-[0.58rem]">{entry.label}</p>
                    <p className="mt-2 leading-loose text-ink-soft">{entry.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
