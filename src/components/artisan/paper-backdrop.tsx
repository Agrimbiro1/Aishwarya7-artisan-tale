import { useReducedMotion } from "motion/react";

/**
 * A single continuous sheet of handmade 100% cotton rag paper behind the whole site.
 * Built from layered gradients + SVG turbulence — no raster tiles, no visible seams.
 */
export function PaperBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-fabric" aria-hidden="true">
      {/* Base handcrafted sheet: warm #f4ebda ivory cardstock tone with subtle paper grain */}
      <div className="cotton-sheet absolute inset-0" />

      {/* SVG turbulence warm cotton fiber grain layer (feTurbulence + feColorMatrix warm tint) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--cotton-texture-svg)",
          backgroundSize: "300px 300px",
          mixBlendMode: "multiply",
          opacity: "calc(var(--texture-opacity, 0.04) * 1.5)",
        }}
      />

      {/* Woven linen crossed thread pattern (weft & warp threads at 2-3% opacity) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--woven-linen-pattern)",
          backgroundSize: "6px 6px, 6px 6px",
          mixBlendMode: "multiply",
          opacity: "calc(var(--texture-opacity, 0.04) * 12)",
        }}
      />

      {/* Faint paper noise grain overlay (2-3% opacity) to break up any banding */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--paper-grain-svg)",
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
          opacity: "calc(var(--texture-opacity, 0.04) * 0.75)",
        }}
      />

      {/* Cloudy pulp variation — gentle handcrafted paper marbling */}
      <div
        className="absolute -inset-[8%]"
        style={{
          backgroundImage: "var(--cotton-cloud)",
          backgroundSize: "1400px 1400px",
          mixBlendMode: "multiply",
          opacity: 0.16,
          animation: reduced ? undefined : "pulp-shift 96s ease-in-out infinite",
        }}
      />

      {/* Long cotton fibre strands, directional weaves */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--cotton-fibres)",
          backgroundSize: "900px 900px",
          mixBlendMode: "multiply",
          opacity: 0.14,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--cotton-fibres-cross)",
          backgroundSize: "760px 760px",
          mixBlendMode: "multiply",
          opacity: 0.1,
        }}
      />

      {/* Microscopic embossing — fibers catching soft light */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--cotton-emboss)",
          backgroundSize: "620px 620px",
          mixBlendMode: "soft-light",
          opacity: 0.22,
        }}
      />

      {/* Irregular pulp specks */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--cotton-specks)",
          backgroundSize: "600px 600px",
          mixBlendMode: "multiply",
          opacity: 0.07,
        }}
      />

      {/* Faint pressed-botanical watermarks */}
      <Watermarks />

      {/* Soft daylight from upper-left, drifting imperceptibly */}
      <div
        className="absolute -inset-[10%]"
        style={{
          background:
            "radial-gradient(60% 55% at 16% 10%, rgba(255, 252, 246, 0.75), rgba(255, 252, 246, 0) 62%)",
          animation: reduced ? undefined : "daylight-drift 70s ease-in-out infinite",
        }}
      />

      {/* Soft cardstock inner vignette (darkening 3-4% at edges and corners) */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--cardstock-vignette)",
        }}
      />

      {/* Ambient shadow settling into the lower-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 75% at 88% 100%, rgba(200, 168, 140, 0.25), rgba(200, 168, 140, 0) 65%)",
        }}
      />

      {/* Inner paper press boundary */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 120px rgba(175, 140, 110, 0.18), inset 0 0 22px rgba(255, 251, 245, 0.55)",
        }}
      />

      {!reduced ? <Dust /> : null}
    </div>
  );
}

function Dust() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const size = 1.5 + (i % 3) * 0.8;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${(i * 83) % 100}%`,
              width: size,
              height: size,
              background: "rgba(255, 250, 243, 0.9)",
              boxShadow: "0 0 4px rgba(226, 200, 168, 0.7)",
              opacity: 0.5,
              ["--dx" as string]: `${((i % 5) - 2) * 60}px`,
              animation: `drift ${52 + (i % 6) * 9}s linear ${i * 4}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Pressed flowers and deckle impressions, 5–8% opacity. */
function Watermarks() {
  const marks = [
    { top: "8%", left: "6%", size: 260, rotate: -14 },
    { top: "42%", left: "78%", size: 320, rotate: 22 },
    { top: "72%", left: "14%", size: 220, rotate: 8 },
    { top: "24%", left: "48%", size: 180, rotate: -32 },
  ];
  return (
    <div className="absolute inset-0">
      {marks.map((m, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          className="absolute text-[#d9b8b4]"
          style={{
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            opacity: 0.07,
            transform: `rotate(${m.rotate}deg)`,
            mixBlendMode: "multiply",
          }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round">
            <path d="M50 92 C50 62 50 40 50 12" />
            {[0, 1, 2, 3, 4].map((k) => (
              <g key={k}>
                <path d={`M50 ${74 - k * 13} C36 ${70 - k * 13} 28 ${62 - k * 13} 26 ${52 - k * 13}`} />
                <path d={`M50 ${74 - k * 13} C42 ${64 - k * 13} 34 ${58 - k * 13} 26 ${52 - k * 13}`} />
                <path d={`M50 ${68 - k * 13} C64 ${64 - k * 13} 72 ${56 - k * 13} 74 ${46 - k * 13}`} />
                <path d={`M50 ${68 - k * 13} C58 ${58 - k * 13} 66 ${52 - k * 13} 74 ${46 - k * 13}`} />
              </g>
            ))}
            <circle cx="50" cy="10" r="4.5" />
          </g>
        </svg>
      ))}
    </div>
  );
}
