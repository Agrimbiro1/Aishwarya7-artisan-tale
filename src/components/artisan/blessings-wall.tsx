import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import floral from "@/assets/floral-spray.png";
import { Motif, SectionTitle } from "./atoms";
import { useGuestIdentity } from "./use-guest-identity";

export interface BlessingItem {
  id: string;
  name: string;
  blessing: string;
  tintIndex: number;
  rotation: number;
}

// TODO: wire up persistent storage / API backend for production (currently persisted in localStorage)
const STORAGE_KEY = "artisan_tale_blessings_v1";

const INITIAL_BLESSINGS: BlessingItem[] = [
  {
    id: "b-1",
    name: "Dadi Maa & Baba",
    blessing: "May Lord Shrinathji shower his eternal grace upon Aanya and Vihaan. Endless love and warmest blessings from us for a beautiful new beginning.",
    tintIndex: 0, // Blush
    rotation: -2.5,
  },
  {
    id: "b-2",
    name: "Kabir & Meera",
    blessing: "So thrilled to celebrate under the Mewar sky! Wishing you a lifetime of adventures, endless laughter, and boundless joy together.",
    tintIndex: 1, // Sage
    rotation: 1.8,
  },
  {
    id: "b-3",
    name: "Chachi Ji & Chacha Ji",
    blessing: "May your union be blessed with prosperity, wisdom, and everlasting harmony. Looking forward to all the vibrant festivities in Udaipur!",
    tintIndex: 2, // Gold
    rotation: -1.2,
  },
  {
    id: "b-4",
    name: "Rohan & Simran",
    blessing: "To the dream couple! Can't wait for the Sangeet night and all the celebrations. Wishing you both all the love in the world.",
    tintIndex: 3, // Cream
    rotation: 2.2,
  },
  {
    id: "b-5",
    name: "Buaji & Phupaji",
    blessing: "Sada Suhaagan Raho! May your home always be filled with warmth, deep mutual respect, and unconditional love.",
    tintIndex: 0, // Blush
    rotation: -2.0,
  },
  {
    id: "b-6",
    name: "Ananya & Arjun",
    blessing: "Sending you both the tightest hugs and warmest wishes! Counting down the days until we gather at Jagat Niwas Haveli.",
    tintIndex: 1, // Sage
    rotation: 1.5,
  },
  {
    id: "b-7",
    name: "Vikram Uncle & Family",
    blessing: "Heartiest congratulations to both families. May your shared journey be paved with sweetness, strength, and joy.",
    tintIndex: 2, // Gold
    rotation: -1.8,
  },
  {
    id: "b-8",
    name: "Pooja & Sameer",
    blessing: "Aanya & Vihaan, you two make love look so effortless! Wishing you a magical wedding celebration in Rajasthan.",
    tintIndex: 3, // Cream
    rotation: 2.7,
  },
];

const TINT_CLASSES = [
  "bg-[#fff9f6] border-[#f2d8cf]/60", // Pale Blush
  "bg-[#f7f9f5] border-[#d8e2d4]/60", // Pale Sage
  "bg-[#fffdf2] border-[#f2e6bf]/60", // Pale Gold
  "bg-[#fffdf8] border-[#ebdcc4]/60", // Pale Cream
];

const MAX_CHAR_LIMIT = 300;
const INITIAL_PREVIEW_COUNT = 6;

// Basic XSS helper
function sanitize(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function BlessingsWall() {
  const reduced = useReducedMotion();
  const guestName = useGuestIdentity(); // Automatically resolves guest name from URL ?guest=... or session

  const [blessings, setBlessings] = useState<BlessingItem[]>(INITIAL_BLESSINGS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [blessingInput, setBlessingInput] = useState("");
  const [btnPulse, setBtnPulse] = useState(false);
  const [shake, setShake] = useState(false);
  const [blessingError, setBlessingError] = useState(false);
  const [justSubmittedId, setJustSubmittedId] = useState<string | null>(null);

  // Load persisted blessings on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as BlessingItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlessings(parsed);
        }
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  // Save to localStorage whenever blessings change
  const saveBlessings = (updated: BlessingItem[]) => {
    setBlessings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or disabled
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedBlessing = blessingInput.trim();

    if (!trimmedBlessing || trimmedBlessing.length > MAX_CHAR_LIMIT) {
      setBlessingError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setBlessingError(false);

    // Button pulse feedback
    setBtnPulse(true);
    setTimeout(() => setBtnPulse(false), 200);

    const newId = `b-custom-${Date.now()}`;
    const newBlessingItem: BlessingItem = {
      id: newId,
      name: sanitize(guestName), // Uses resolved guest name automatically
      blessing: sanitize(trimmedBlessing),
      tintIndex: Math.floor(Math.random() * 4),
      rotation: (Math.random() * 5 - 2.5), // -2.5 to +2.5 deg
    };

    const updatedList = [newBlessingItem, ...blessings];
    saveBlessings(updatedList);
    setJustSubmittedId(newId);

    // Reset input
    setBlessingInput("");
    setBlessingError(false);
  };

  // Lock body scroll when modal dialogue is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const previewBlessings = blessings.slice(0, INITIAL_PREVIEW_COUNT);

  return (
    <section id="blessings" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-36" style={{ backgroundColor: "transparent" }}>
      {/* BACKGROUND GRAIN & FLORAL WATERCOLOR ACCENT */}
      <div className="grain absolute inset-0 opacity-75" aria-hidden="true" />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -top-20 -left-20 w-80 opacity-20 mix-blend-multiply select-none"
      />

      <div className="relative mx-auto max-w-5xl z-10">
        {/* SECTION HEADER */}
        <SectionTitle
          eyebrow="Blessings Wall"
          title="Leave Your Wishes"
          script="A Legacy of Love"
        />

        {/* POST-A-BLESSING FORM CARD */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 max-w-2xl mx-auto group relative"
        >
          {/* DECKLE PAPER FORM CONTAINER */}
          <div className="deckle-edge card-sand-texture absolute inset-0 rounded-2xl bg-[#fffdf8] border-2 border-[#b89138]/45 shadow-[0_28px_70px_-14px_rgba(60,40,15,0.28),0_12px_28px_rgba(184,145,56,0.18)] pointer-events-none transition-all duration-500 group-hover:shadow-[0_36px_85px_-12px_rgba(60,40,15,0.35)]" />

          <form
            onSubmit={handleSubmit}
            className={`grain relative z-10 p-8 sm:p-12 rounded-2xl flex flex-col gap-5 text-left transition-transform ${
              shake ? "animate-[shake_0.4s_ease-in-out]" : ""
            }`}
          >
            {/* INNER HAIRLINE GOLD FRAME */}
            <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl border border-[#b89138]/30" aria-hidden="true" />

            {/* READ-ONLY GUEST IDENTITY BADGE */}
            <div className="flex items-center gap-2.5 relative z-10 mb-1">
              <span className="eyebrow text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#8c6c23]">
                ✦ POSTING AS:
              </span>
              <span className="script text-2.5xl sm:text-3.5xl text-[#5e4718] font-normal leading-none filter drop-shadow-2xs">
                {guestName}
              </span>
            </div>

            {/* BLESSING TEXTAREA WITH LIVE CHARACTER COUNTER */}
            <div className="relative flex flex-col gap-2 z-10">
              <textarea
                id="guest-blessing"
                rows={4}
                value={blessingInput}
                onChange={(e) => {
                  setBlessingInput(e.target.value);
                  if (blessingError) setBlessingError(false);
                }}
                placeholder="Share a blessing or warm wish for Aanya & Vihaan..."
                className={`w-full rounded-xl bg-[#fffdf8]/90 border-2 ${
                  blessingError || blessingInput.length > MAX_CHAR_LIMIT
                    ? "border-[#c0392b] ring-1 ring-[#c0392b]/30"
                    : "border-[#b89138]/40 focus:border-[#8c6c23] focus:ring-1 focus:ring-[#8c6c23]/30"
                } p-4 sm:p-5 font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#2c1c0e] leading-relaxed placeholder-[#a08b73] resize-none outline-none transition-all duration-200 shadow-inner`}
              />

              {/* LIVE CHARACTER COUNTER */}
              <div className="flex justify-end px-1">
                <span
                  className={`text-xs font-serif font-medium tracking-wide ${
                    blessingInput.length > MAX_CHAR_LIMIT ? "text-[#c0392b] font-bold" : "text-[#8c6c23]/80"
                  }`}
                >
                  {blessingInput.length} / {MAX_CHAR_LIMIT}
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON WITH SVG PAPER PLANE SEND ICON & SHEEN EFFECT */}
            <div className="flex justify-center mt-2 z-10">
              <motion.button
                type="submit"
                animate={btnPulse ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                whileHover={reduced ? {} : { scale: 1.04 }}
                whileTap={reduced ? {} : { scale: 0.96 }}
                className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#fff5cc] via-[#f7d070] to-[#e6b840] text-[#5c4a2e] font-[family-name:var(--font-serif)] font-medium text-base sm:text-lg tracking-[0.15em] uppercase shadow-[0_10px_28px_rgba(184,145,56,0.32)] hover:shadow-[0_14px_36px_rgba(184,145,56,0.45)] border-2 border-[#b89138] cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden"
              >
                {/* Continuous Foil Light Sheen Streak */}
                {!reduced && (
                  <motion.div
                    animate={{ x: ["-130%", "230%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg]"
                  />
                )}

                <span>Post Blessing</span>
                {/* PAPER PLANE SEND ICON */}
                <svg className="w-4 h-4 text-[#8c6c23] fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* SCRAPBOOK MASONRY PREVIEW WALL OF WISHES */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 md:gap-14">
            <AnimatePresence mode="popLayout">
              {previewBlessings.map((item, index) => {
                const tintStyle = TINT_CLASSES[item.tintIndex % TINT_CLASSES.length];
                const isNewlyAdded = item.id === justSubmittedId;
                const verticalOffsetClass =
                  index % 3 === 1 ? "md:mt-6" : index % 3 === 2 ? "md:mt-12" : "md:mt-0";

                return (
                  <motion.div
                    key={item.id}
                    layout={!reduced}
                    initial={
                      reduced
                        ? { opacity: 1 }
                        : isNewlyAdded
                        ? { opacity: 0, y: -30, scale: 0.88 }
                        : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={
                      isNewlyAdded
                        ? { type: "spring", stiffness: 350, damping: 22 }
                        : { duration: 0.45 }
                    }
                    style={{ transform: reduced ? "none" : `rotate(${item.rotation}deg)` }}
                    className={`group relative flex ${verticalOffsetClass}`}
                  >
                    {/* DECKLE EDGE BACKGROUND CONTAINER (ISOLATED FROM TEXT SO SVG DISPLACEMENT NEVER TOUCHES PARAGRAPH) */}
                    <div
                      className={`deckle-edge card-sand-texture absolute inset-0 rounded-2xl border ${tintStyle} shadow-[0_16px_36px_rgba(60,40,15,0.15)] group-hover:shadow-[0_22px_48px_rgba(60,40,15,0.24)] pointer-events-none transition-all duration-300`}
                    />

                    {/* WISH NOTE CONTENT (ISOLATED TEXT LAYER WITH ZERO SVG FILTER DISTORTION) */}
                    <div className="relative z-10 w-full p-7 sm:p-8 rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] flex flex-col justify-between">
                      {/* MINI GOLD WAX SEAL DOT AT TOP CENTER */}
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-gradient-to-br from-[#fce6a6] via-[#d4aa3b] to-[#8c6c23] border border-[#b89138] shadow-sm z-20 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <span className="text-[0.45rem] text-[#3a2512] font-bold select-none">✦</span>
                      </div>

                      {/* BOTTOM CORNER FLORAL MARIGOLD FILIGREE ACCENTS */}
                      <div className="pointer-events-none absolute bottom-3 left-3.5 text-[#b89138]/45 select-none">
                        <Motif kind="marigold" className="h-4.5 w-4.5" />
                      </div>
                      <div className="pointer-events-none absolute bottom-3 right-3.5 text-[#b89138]/45 select-none">
                        <Motif kind="marigold" className="h-4.5 w-4.5" />
                      </div>

                      {/* BLESSING TEXT BODY - PARALLEL HORIZONTAL WRAPPED LINES WITH 100% CRISP LEGIBILITY */}
                      <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#2c1c0e] font-normal leading-[1.7] italic mb-8 relative z-10 px-1 transform-none">
                        "{item.blessing}"
                      </p>

                      {/* SIGNATURE FOOTER LINE */}
                      <div className="pt-3.5 border-t border-[#b89138]/30 flex items-center justify-between relative z-10">
                        <span className="eyebrow text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#8c6c23] flex items-center gap-1.5">
                          <span className="text-[#b89138]">✦</span>
                          <span>{item.name}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* "SEE MORE WISHES" BUTTON -> OPENS INTERNALLY SCROLLABLE DIALOGUE BOX MODAL */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-9 py-3.5 rounded-full border-2 border-[#b89138]/70 bg-[#faf5eb] text-[#8c6c23] hover:bg-[#8c6c23] hover:text-[#fffdf8] hover:border-[#8c6c23] font-[family-name:var(--font-serif)] text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-md flex items-center gap-2.5 group/btn"
            >
              <span>See More Wishes</span>
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
            </button>

            <span className="text-xs font-serif text-[#a08b73] tracking-wide mt-1">
              Showing {previewBlessings.length} of {blessings.length} blessings • Tap to view all
            </span>
          </div>
        </div>
      </div>

      {/* INTERNALLY SCROLLABLE DIALOGUE BOX MODAL FOR ALL WISHES */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2c1c0e]/65 backdrop-blur-md">
            {/* BACKDROP DISMISS CLICK */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 pointer-events-auto"
            />

            {/* MODAL DIALOGUE CONTAINER */}
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="deckle-edge card-sand-texture relative max-w-4xl w-full max-h-[85vh] bg-[#fffdf8] border-2 border-[#b89138]/50 rounded-2xl p-6 sm:p-10 shadow-[0_36px_90px_-15px_rgba(40,25,10,0.5)] flex flex-col z-10 overflow-hidden"
            >
              {/* INNER HAIRLINE GOLD FRAME */}
              <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl border border-[#b89138]/30" aria-hidden="true" />

              {/* MODAL HEADER */}
              <div className="relative z-10 flex items-center justify-between pb-5 border-b border-[#b89138]/30">
                <div className="flex flex-col text-left">
                  <h3 className="script text-3.5xl sm:text-4.5xl text-[#8c6c23] leading-tight">
                    All Blessings &amp; Wishes
                  </h3>
                  <span className="eyebrow text-xs tracking-[0.25em] text-[#6b4715] font-bold uppercase mt-1">
                    ✦ A Legacy of Love • Jagat Niwas Haveli ✦
                  </span>
                </div>

                {/* CLOSE DIALOGUE BUTTON */}
                <button
                  type="button"
                  title="Close Dialogue"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 w-10 rounded-full border-2 border-[#b89138]/50 bg-[#faf5eb] text-[#8c6c23] hover:bg-[#8c6c23] hover:text-[#fffdf8] hover:border-[#8c6c23] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm z-30 shrink-0 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {/* INTERNALLY SCROLLABLE DIALOGUE BODY CONTAINING ALL WISHES */}
              <div className="grain relative z-10 mt-6 pr-2 sm:pr-4 overflow-y-auto flex-1 max-h-[60vh] scrollbar-thin scrollbar-thumb-[#b89138]/40 hover:scrollbar-thumb-[#8c6c23]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-4 pt-2">
                  {blessings.map((item) => {
                    const tintStyle = TINT_CLASSES[item.tintIndex % TINT_CLASSES.length];
                    return (
                      <div
                        key={`modal-${item.id}`}
                        style={{ transform: reduced ? "none" : `rotate(${item.rotation * 0.6}deg)` }}
                        className="group relative flex"
                      >
                        {/* DECKLE EDGE BACKDROP LAYER */}
                        <div
                          className={`deckle-edge card-sand-texture absolute inset-0 rounded-2xl border ${tintStyle} shadow-[0_12px_28px_rgba(60,40,15,0.12)] pointer-events-none transition-shadow duration-300 group-hover:shadow-[0_18px_36px_rgba(60,40,15,0.2)]`}
                        />

                        {/* INDIVIDUAL DECKLE WISH NOTE CONTENT INSIDE DIALOGUE BOX */}
                        <div className="relative z-10 w-full p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01]">
                          {/* MINI GOLD WAX SEAL DOT AT TOP CENTER */}
                          <div
                            className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-gradient-to-br from-[#fce6a6] via-[#d4aa3b] to-[#8c6c23] border border-[#b89138] shadow-sm z-20 flex items-center justify-center pointer-events-none"
                            aria-hidden="true"
                          >
                            <span className="text-[0.4rem] text-[#3a2512] font-bold select-none">✦</span>
                          </div>

                          {/* BOTTOM CORNER FLORAL MARIGOLD FILIGREE ACCENTS */}
                          <div className="pointer-events-none absolute bottom-2.5 left-3 text-[#b89138]/40 select-none">
                            <Motif kind="marigold" className="h-4 w-4" />
                          </div>
                          <div className="pointer-events-none absolute bottom-2.5 right-3 text-[#b89138]/40 select-none">
                            <Motif kind="marigold" className="h-4 w-4" />
                          </div>

                          {/* BLESSING TEXT BODY */}
                          <p className="font-[family-name:var(--font-serif)] text-base sm:text-lg text-[#2c1c0e] font-normal leading-[1.65] italic mb-6 relative z-10 px-1 transform-none">
                            "{item.blessing}"
                          </p>

                          {/* SIGNATURE FOOTER LINE */}
                          <div className="pt-3 border-t border-[#b89138]/30 flex items-center justify-between relative z-10">
                            <span className="eyebrow text-xs font-bold tracking-[0.25em] uppercase text-[#8c6c23] flex items-center gap-1.5">
                              <span className="text-[#b89138]">✦</span>
                              <span>{item.name}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="relative z-10 pt-4 mt-4 border-t border-[#b89138]/25 flex items-center justify-between text-xs font-serif text-[#6b4715]">
                <span>Total {blessings.length} blessings received</span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="eyebrow font-bold tracking-widest text-[#8c6c23] uppercase hover:underline cursor-pointer"
                >
                  Close Box ✕
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
