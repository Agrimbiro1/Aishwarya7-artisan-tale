import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CraftDefs } from "@/components/artisan/atoms";
import { Opening } from "@/components/artisan/opening";
import { Welcome } from "@/components/artisan/welcome";
import { InvitationCard } from "@/components/artisan/invitation-card";
import { Booklet } from "@/components/artisan/booklet";
import { Scrapbook } from "@/components/artisan/scrapbook";
import { FamilyTree } from "@/components/artisan/family-tree";
import { Journal } from "@/components/artisan/journal";
import { Letter } from "@/components/artisan/letter";
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
        <Booklet />
        <Scrapbook />
        <FamilyTree />
        <Journal />
        <Letter />
        <Closing />
      </main>

      {opened ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="stamp fixed right-5 bottom-5 z-40 px-4 py-2.5 text-[0.55rem] text-ink"
        >
          {playing ? "Pause ambience" : "Play ambience"}
        </button>
      ) : null}
    </>
  );
}
