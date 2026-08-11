import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CraftDefs } from "@/components/artisan/atoms";
import { PaperBackdrop } from "@/components/artisan/paper-backdrop";
import { Opening } from "@/components/artisan/opening";
import { Welcome } from "@/components/artisan/welcome";
import { InvitationCard } from "@/components/artisan/invitation-card";
import { OrderOfEvents } from "@/components/artisan/order-of-events";
import { Scrapbook } from "@/components/artisan/scrapbook";
import { FamilyTree } from "@/components/artisan/family-tree";
import { BlessingsWall } from "@/components/artisan/blessings-wall";
import { RsvpSection } from "@/components/artisan/rsvp-section";
import { Journal } from "@/components/artisan/journal";
import { ConciergeDesk } from "@/components/artisan/concierge-desk";
import { Closing } from "@/components/artisan/closing";
import { useAmbience } from "@/components/artisan/use-ambience";

const TITLE = "Aanya & Vihaan — A Handmade Wedding Invitation, Udaipur";
const DESCRIPTION =
  "Aanya and Vihaan invite you to their wedding in Udaipur, 12–15 February 2027. Ceremonies, travel notes and a scrapbook, bound like handmade paper.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const links = [
  ["Welcome", "welcome"],
  ["Invitation", "invitation"],
  ["Ceremonies", "ceremonies"],
  ["Album", "album"],
  ["Family", "family"],
  ["Wishes", "blessings"],
  ["RSVP", "rsvp"],
  ["Travel", "travel"],
  ["Contact", "contact"],
] as const;

function Index() {
  const [opened, setOpened] = useState(false);
  const { playing, toggle } = useAmbience();

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <CraftDefs />
      <PaperBackdrop />
      {!opened ? <Opening onOpen={() => setOpened(true)} /> : null}

      <main className="relative">
        <h1 className="sr-only">Aanya and Vihaan's wedding invitation, Udaipur, February 2027</h1>

        {opened ? (
          <nav
            aria-label="Invitation sections"
            className="sticky top-0 z-30 hidden border-b border-gold/20 backdrop-blur-[2px] md:block"
            style={{ backgroundColor: "oklch(0.968 0.014 84 / 0.82)" }}
          >
            <ul className="mx-auto flex max-w-5xl items-center justify-center gap-7 px-6 py-3">
              {links.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="font-[family-name:var(--font-roman)] text-[0.6rem] tracking-[0.3em] text-ink-soft uppercase transition-colors hover:text-brass"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <Welcome />
        <InvitationCard />
        <OrderOfEvents />
        <Scrapbook />
        <FamilyTree />
        <BlessingsWall />
        <RsvpSection />
        <Journal />
        <ConciergeDesk />
        <Closing />
      </main>

      {opened ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause ambient music" : "Play ambient music"}
          title={playing ? "Pause Music" : "Play Music"}
          className="card-sand-texture group fixed right-6 bottom-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#b89138]/60 bg-[#faf5eb]/90 text-[#8c6c23] shadow-[0_8px_24px_rgba(60,40,15,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#8c6c23] hover:bg-[#f5ebd7] active:scale-95 cursor-pointer"
        >
          {/* Inner hairline gold ring */}
          <span className="absolute inset-1 rounded-full border border-[#b89138]/30 pointer-events-none transition-colors duration-300 group-hover:border-[#8c6c23]/50" />

          {/* Soft warm aura pulse when playing */}
          {playing && (
            <span className="absolute -inset-1 rounded-full bg-[#b89138]/20 animate-ping opacity-60 pointer-events-none" />
          )}

          {playing ? (
            <div className="relative z-10 flex items-center justify-center gap-0.5">
              {/* Active Music Note Icon in rich warm brass */}
              <svg className="h-5 w-5 text-[#8c6c23] fill-current" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              {/* Mini Animated Equalizer Sound Bars */}
              <span className="flex items-end gap-[1.5px] h-3 ml-0.5">
                <span className="w-[2px] h-full bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_100ms]" />
                <span className="w-[2px] h-2/3 bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_300ms]" />
                <span className="w-[2px] h-4/5 bg-[#8c6c23] rounded-full animate-[bounce_0.8s_infinite_500ms]" />
              </span>
            </div>
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              {/* Paused Music Note Icon with Slash */}
              <svg className="h-5 w-5 text-[#8c6c23]/75 fill-current" viewBox="0 0 24 24">
                <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V14.27l5 5L20.73 21 22 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z"/>
              </svg>
            </div>
          )}
        </button>
      ) : null}
    </>
  );
}
