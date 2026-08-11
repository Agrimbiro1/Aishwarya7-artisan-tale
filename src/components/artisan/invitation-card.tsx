import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { couple, invitation } from "@/data/wedding";
import floral from "@/assets/floral-spray.png";
import { Reveal } from "./atoms";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  radius: number;
  wobblePhase: number;
  wobbleSpeed: number;
  glimmerPhase: number;
  glimmerSpeed: number;
  color: string;
}

function GoldDustCanvas({ stageMouse }: { stageMouse: { x: number; y: number; active: boolean } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = ["#fce498", "#e6c56c", "#c99a36", "#8e6318"];
    const count = 48;
    const particles: Particle[] = Array.from({ length: count }, () => {
      const baseVy = 0.2 + Math.random() * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: baseVy,
        baseVy,
        radius: 1.2 + Math.random() * 2.2,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        glimmerPhase: Math.random() * Math.PI * 2,
        glimmerSpeed: 0.02 + Math.random() * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)] || "#fce498",
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Upward buoyancy drift + organic noise-like wobble
        p.wobblePhase += p.wobbleSpeed;
        p.glimmerPhase += p.glimmerSpeed;
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.35;
        p.y -= p.vy;

        // Wrap around screen boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Interactive Mouse Repulsion Physics
        if (stageMouse.active) {
          const dx = p.x - stageMouse.x;
          const dy = p.y - stageMouse.y;
          const distSq = dx * dx + dy * dy;
          const repelRadius = 130;
          if (distSq < repelRadius * repelRadius && distSq > 0.1) {
            const dist = Math.sqrt(distSq);
            const force = (repelRadius - dist) / repelRadius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 1.8;
            p.vy += Math.sin(angle) * force * 1.8;
          }
        }

        // Air drag damping
        p.vx *= 0.94;
        p.vy = p.vy * 0.95 + p.baseVy * 0.05;

        // Draw glittering metallic particle with soft radial glow
        const alpha = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(p.glimmerPhase));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#fce498";
        ctx.shadowBlur = p.radius * 3;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [stageMouse]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-85" aria-hidden="true" />;
}

export interface InvitationCardProps {
  brideName?: string;
  groomName?: string;
  brideInitial?: string;
  groomInitial?: string;
  eyebrowText?: string;
  brideParents?: string;
  groomParents?: string;
  requestLine?: string;
  dateText?: string;
  timeText?: string;
  venueName?: string;
  venueCity?: string;
  blessingText?: string;
}

export function InvitationCard({
  brideName = couple.bride,
  groomName = couple.groom,
  brideInitial = "A",
  groomInitial = "V",
  eyebrowText = "TOGETHER WITH THEIR FAMILIES",
  brideParents = invitation.brideParents,
  groomParents = invitation.groomParents,
  requestLine = "request the honour of your presence at the marriage of",
  dateText = "SATURDAY • 14.02.2027",
  timeText = invitation.time,
  venueName = invitation.venue,
  venueCity = couple.city,
  blessingText = invitation.blessing,
}: InvitationCardProps) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [stageMouse, setStageMouse] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Normalized coordinates [-0.5 to +0.5] relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy 600gsm cotton cardstock physics with momentum, gentle lag, overshoot & organic spring settling
  const springConfig = { damping: 13, stiffness: 110, mass: 0.75 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Dynamic Specular Light Beam Sweep offsets for realistic metallic foil sheen
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-160, 160]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-160, 160]), springConfig);

  // 1. Mobile Gyroscope Physical Phone Tilt (deviceorientation API)
  useEffect(() => {
    if (reduced) return;

    let baselineBeta: number | null = null;
    let baselineGamma: number | null = null;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      // Lock initial holding angle as neutral reference point
      if (baselineBeta === null) baselineBeta = e.beta;
      if (baselineGamma === null) baselineGamma = e.gamma;

      // Calculate tilt deltas from neutral position
      const deltaGamma = e.gamma - baselineGamma;
      const deltaBeta = e.beta - baselineBeta;

      // Clamp normalized values [-0.5 to +0.5] for phone tilt
      const normX = Math.max(-0.5, Math.min(0.5, deltaGamma / 28));
      const normY = Math.max(-0.5, Math.min(0.5, deltaBeta / 28));

      mouseX.set(normX);
      mouseY.set(normY);
      setIsHovered(true);
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, [mouseX, mouseY, reduced]);

  // 2. Mouse & Pointer Tracking for Desktop & Touch Drag
  const updateCardPosition = (clientX: number, clientY: number) => {
    if (!cardRef.current || reduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    mouseX.set(Math.max(-0.5, Math.min(0.5, x)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, y)));
    setIsHovered(true);
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStageMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateCardPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      updateCardPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="invitation"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
      onMouseMove={handleStageMouseMove}
      onMouseLeave={() => setStageMouse((prev) => ({ ...prev, active: false }))}
    >
      <div className="grain absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Floating Gold Dust Canvas with Particle Physics & Mouse Repulsion */}
      {!reduced && <GoldDustCanvas stageMouse={stageMouse} />}

      {/* Warm Ambient Gold Light Glow behind Card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(244, 235, 218, 0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Hanging 3D Botanical Floral Garlands & Arches */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {/* Top-Left Hanging Floral Arch Garland */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -top-6 -left-8 w-56 sm:w-[26rem] md:w-[30rem] opacity-80 sm:opacity-90 mix-blend-multiply origin-top-left filter drop-shadow-[0_8px_16px_rgba(60,40,15,0.25)]"
          animate={reduced ? {} : { rotate: [-2.5, 2, -2.5], scale: [1, 1.025, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top-Right Hanging Floral Arch Garland */}
        <motion.img
          src={floral}
          alt=""
          className="absolute -top-8 -right-8 w-56 sm:w-[26rem] md:w-[30rem] opacity-80 sm:opacity-90 mix-blend-multiply origin-top-right filter drop-shadow-[0_8px_16px_rgba(60,40,15,0.25)]"
          style={{ transform: "scaleX(-1)" }}
          animate={reduced ? {} : { rotate: [2.5, -2, 2.5], scale: [1, 1.025, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* 3D Stage Container with Perspective for Real "Hold In Hand" Tactile Feel */}
      <div className="relative mx-auto max-w-xl [perspective:1200px]">
        {/* Main Invitation Card Container with Gravity Drop Spring Entrance & Interactive 3D Physics Tilt */}
        <motion.div
          ref={cardRef}
          className="relative max-w-xl transition-shadow duration-300 [transform-style:preserve-3d] filter drop-shadow-[0_25px_50px_rgba(45,28,10,0.3)] hover:drop-shadow-[0_35px_70px_rgba(45,28,10,0.42)] cursor-grab active:cursor-grabbing touch-pan-y"
          initial={reduced ? { opacity: 0 } : { y: -80, opacity: 0, scale: 0.96 }}
          whileInView={reduced ? { opacity: 1 } : { y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduced
              ? { duration: 0.4 }
              : {
                  type: "spring",
                  damping: 14,
                  stiffness: 120,
                  mass: 0.9,
                }
          }
          style={{
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
          }}
          onPointerMove={handlePointerMove}
          onPointerDown={(e) => updateCardPosition(e.clientX, e.clientY)}
          onPointerUp={handlePointerLeave}
          onPointerCancel={handlePointerLeave}
          onPointerLeave={handlePointerLeave}
          onTouchStart={(e) => {
            if (e.touches[0]) updateCardPosition(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* Organic Deckle / Torn Edge Handmade Paper Backdrop Sheet */}
          <div
            className="deckle-edge card-sand-texture absolute -inset-1 rounded-xl bg-[#fffdf7] opacity-98 shadow-[0_30px_70px_-15px_rgba(40,22,8,0.35),0_12px_28px_rgba(40,22,8,0.2)]"
            aria-hidden="true"
          />

          <div className="grain relative bg-fabric bg-[#fffdf8] px-5 py-10 text-center sm:px-12 sm:py-14 rounded-lg shadow-[inset_0_0_40px_rgba(180,140,80,0.1)] overflow-hidden">
            {/* Specular Light Beam Sheen Overlay (Sweeps diagonally catching gold foil as user moves/tilts) */}
            <motion.div
              className="pointer-events-none absolute -inset-40 z-30 opacity-0 transition-opacity duration-300 ease-out"
              style={{
                opacity: isHovered ? 0.85 : 0.4,
                x: sheenX,
                y: sheenY,
                background:
                  "linear-gradient(115deg, transparent 20%, rgba(255, 245, 200, 0.08) 38%, rgba(255, 255, 255, 0.55) 48%, rgba(255, 235, 170, 0.75) 52%, rgba(255, 215, 120, 0.18) 62%, transparent 80%)",
                mixBlendMode: "overlay",
              }}
              aria-hidden="true"
            />

          {/* Bespoke Handcrafted Artisan Wax Seal Tag with Physical Drop & Impact Compression Stamp Animation */}
          <div className="pointer-events-none absolute top-4 right-4 z-30">
            {/* Impact Pressure Wave Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#e8c878]"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: [0.8, 2.1], opacity: [0.85, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.75, ease: "easeOut" }}
            />

            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#8c2d19] via-[#6d1f0e] to-[#471206] text-[#fffdf7] shadow-[0_6px_20px_rgba(60,15,5,0.5)] border-2 border-[#e8c878]/90"
              initial={reduced ? { opacity: 0 } : { y: -70, scaleX: 2.2, scaleY: 2.2, opacity: 0, rotate: -35 }}
              whileInView={
                reduced
                  ? { opacity: 1 }
                  : {
                      y: [-70, 0, 0, 0, 0],
                      scaleX: [2.2, 1.28, 0.84, 1.06, 1],
                      scaleY: [2.2, 0.72, 1.18, 0.94, 1],
                      rotate: [-35, -5, -15, -12, -12],
                      opacity: [0, 1, 1, 1, 1],
                    }
              }
              viewport={{ once: true }}
              transition={
                reduced
                  ? { duration: 0.4 }
                  : {
                      duration: 0.85,
                      delay: 0.45,
                      times: [0, 0.55, 0.7, 0.88, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              title="Handcrafted Artisan Edition"
            >
              <span className="font-[family-name:var(--font-serif)] text-xs font-bold text-[#fce8b8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                🪷
              </span>
            </motion.div>
          </div>

          {/* Fuller & Denser Lush Vector Botanical Corner Sprigs */}
          {[
            { id: "tl", pos: "top-1 left-1 sm:top-2 sm:left-2", transform: "" },
            { id: "tr", pos: "top-1 right-1 sm:top-2 sm:right-2", transform: "scale-x-[-1]" },
            { id: "bl", pos: "bottom-1 left-1 sm:bottom-2 sm:left-2", transform: "scale-y-[-1]" },
            { id: "br", pos: "bottom-1 right-1 sm:bottom-2 sm:right-2", transform: "scale-x-[-1] scale-y-[-1]" },
          ].map((corner, i) => (
            <motion.div
              key={corner.id}
              className={`pointer-events-none absolute ${corner.pos} z-10 w-24 h-24 sm:w-36 sm:h-36 opacity-95 ${corner.transform}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.95, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.3 : 1.5, delay: i * 0.15, ease: EASE }}
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id={`cornerLeafGrad-${corner.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B79D6F" />
                    <stop offset="100%" stopColor="#8C7148" />
                  </linearGradient>
                  <linearGradient id={`cornerBlushGrad-${corner.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8B9A8" />
                    <stop offset="100%" stopColor="#D89685" />
                  </linearGradient>
                </defs>
                {/* Main & Secondary Curved Botanical Stems */}
                <path
                  d="M 12 12 Q 38 38 110 110"
                  stroke={`url(#cornerLeafGrad-${corner.id})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d="M 25 10 Q 55 40 95 70"
                  stroke={`url(#cornerLeafGrad-${corner.id})`}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Lush Gold Leaves */}
                <ellipse cx="28" cy="20" rx="4.0" ry="9.0" transform="rotate(35 28 20)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="20" cy="28" rx="4.0" ry="9.0" transform="rotate(-55 20 28)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="50" cy="42" rx="4.5" ry="10.5" transform="rotate(40 50 42)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="42" cy="50" rx="4.5" ry="10.5" transform="rotate(-50 42 50)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="75" cy="65" rx="4.2" ry="9.5" transform="rotate(45 75 65)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="65" cy="75" rx="4.2" ry="9.5" transform="rotate(-45 65 75)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="98" cy="88" rx="3.8" ry="8.5" transform="rotate(50 98 88)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />
                <ellipse cx="88" cy="98" rx="3.8" ry="8.5" transform="rotate(-40 88 98)" fill={`url(#cornerLeafGrad-${corner.id})`} opacity="0.95" />

                {/* Rich Blush Floral Clusters */}
                <circle cx="32" cy="32" r="4.5" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.95" />
                <circle cx="26" cy="37" r="3.8" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="37" cy="26" r="3.8" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="32" cy="32" r="2.2" fill="#C9A66B" />

                <circle cx="58" cy="58" r="5.2" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.95" />
                <circle cx="51" cy="64" r="4.2" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="64" cy="51" r="4.2" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="58" cy="58" r="2.5" fill="#C9A66B" />

                <circle cx="85" cy="85" r="4.5" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.95" />
                <circle cx="79" cy="90" r="3.8" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="90" cy="79" r="3.8" fill={`url(#cornerBlushGrad-${corner.id})`} opacity="0.9" />
                <circle cx="85" cy="85" r="2.2" fill="#C9A66B" />
              </svg>
            </motion.div>
          ))}

          {/* Double Hairline Engraved Gold Border Frame with Diagonal Foil Gradient */}
          <div className="pointer-events-none absolute inset-3 rounded-lg border border-[#c49b32]/50 shadow-[0_0_15px_rgba(212,175,55,0.22)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-[15px] rounded-md border border-[#e8c878]/35" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* 1. "Together with their families" */}
            <Reveal delay={0.05} y={8} className="mb-[18px]">
              <p className="eyebrow letterpress text-[0.62rem] sm:text-xs tracking-[0.38em] text-[#6b4715] font-medium uppercase leading-none">
                {eyebrowText}
              </p>
            </Reveal>

            {/* 2. [Wreath monogram SVG with Staggered Organic Draw-In & Suspended Jewelry Idle Float] */}
            <Reveal delay={0.15} y={10} className="mb-[8px]">
              <motion.div
                animate={reduced ? {} : { y: [-4, 4, -4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 220 220"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto block h-[155px] w-[155px] sm:h-[175px] sm:w-[175px]"
                >
                  <defs>
                    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B79D6F" />
                      <stop offset="100%" stopColor="#8C7148" />
                    </linearGradient>
                    <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8B9A8" />
                      <stop offset="100%" stopColor="#D89685" />
                    </linearGradient>
                  </defs>
                  {/* 26 Leaves with Staggered Hand-Drawn Entrance */}
                  {[
                    { cx: "61.8", cy: "178.8", rx: "2.1", ry: "5.0", r: "225.0" },
                    { cx: "50.2", cy: "154.5", rx: "2.4", ry: "5.8", r: "223.3" },
                    { cx: "29.1", cy: "136.8", rx: "2.8", ry: "6.7", r: "261.7" },
                    { cx: "34.2", cy: "110.0", rx: "3.1", ry: "7.5", r: "260.0" },
                    { cx: "28.0", cy: "82.8", rx: "3.5", ry: "8.3", r: "298.3" },
                    { cx: "48.2", cy: "64.0", rx: "3.9", ry: "9.2", r: "296.7" },
                    { cx: "59.8", cy: "38.2", rx: "4.2", ry: "10.0", r: "335.0" },
                    { cx: "87.6", cy: "35.1", rx: "3.8", ry: "9.2", r: "333.3" },
                    { cx: "112.6", cy: "21.2", rx: "3.5", ry: "8.3", r: "371.7" },
                    { cx: "137.2", cy: "35.4", rx: "3.1", ry: "7.5", r: "370.0" },
                    { cx: "165.8", cy: "39.4", rx: "2.8", ry: "6.7", r: "408.3" },
                    { cx: "177.3", cy: "65.7", rx: "2.5", ry: "5.8", r: "406.7" },
                    { cx: "198.1", cy: "86.4", rx: "2.1", ry: "5.0", r: "445.0" },
                    { cx: "61.8", cy: "41.2", rx: "2.1", ry: "5.0", r: "155.0" },
                    { cx: "50.2", cy: "65.5", rx: "2.4", ry: "5.8", r: "116.7" },
                    { cx: "29.1", cy: "83.2", rx: "2.8", ry: "6.7", r: "118.3" },
                    { cx: "34.2", cy: "110.0", rx: "3.1", ry: "7.5", r: "80.0" },
                    { cx: "28.0", cy: "137.2", rx: "3.5", ry: "8.3", r: "81.7" },
                    { cx: "48.2", cy: "156.0", rx: "3.9", ry: "9.2", r: "43.3" },
                    { cx: "59.8", cy: "181.8", rx: "4.2", ry: "10.0", r: "45.0" },
                    { cx: "87.6", cy: "184.9", rx: "3.8", ry: "9.2", r: "6.7" },
                    { cx: "112.6", cy: "198.8", rx: "3.5", ry: "8.3", r: "8.3" },
                    { cx: "137.2", cy: "184.6", rx: "3.1", ry: "7.5", r: "-30.0" },
                    { cx: "165.8", cy: "180.6", rx: "2.8", ry: "6.7", r: "-28.3" },
                    { cx: "177.3", cy: "154.3", rx: "2.5", ry: "5.8", r: "-66.7" },
                    { cx: "198.1", cy: "133.6", rx: "2.1", ry: "5.0", r: "-65.0" },
                  ].map((leaf, idx) => (
                    <motion.ellipse
                      key={idx}
                      cx={leaf.cx}
                      cy={leaf.cy}
                      rx={leaf.rx}
                      ry={leaf.ry}
                      transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`}
                      fill="url(#leafGrad)"
                      opacity="0.92"
                      initial={{ opacity: 0, scale: 0.2 }}
                      whileInView={{ opacity: 0.92, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduced ? 0.2 : 0.5,
                        delay: reduced ? 0 : 0.15 + idx * 0.025,
                        ease: EASE,
                      }}
                    />
                  ))}

                  {/* Blush Flower Accent Clusters */}
                  {[
                    { cx: "39.9", cy: "102.0", r: "3.9" },
                    { cx: "35.5", cy: "108.0", r: "3.9" },
                    { cx: "28.5", cy: "105.7", r: "3.9" },
                    { cx: "28.5", cy: "98.3", r: "3.9" },
                    { cx: "35.5", cy: "96.0", r: "3.9" },
                    { cx: "192.7", cy: "102.0", r: "3.9" },
                    { cx: "188.4", cy: "108.0", r: "3.9" },
                    { cx: "181.3", cy: "105.7", r: "3.9" },
                    { cx: "181.3", cy: "98.3", r: "3.9" },
                    { cx: "188.4", cy: "96.0", r: "3.9" },
                    { cx: "117.2", cy: "26.0", r: "4.4" },
                    { cx: "112.2", cy: "32.8", r: "4.4" },
                    { cx: "104.2", cy: "30.2", r: "4.4" },
                    { cx: "104.2", cy: "21.8", r: "4.4" },
                    { cx: "112.2", cy: "19.2", r: "4.4" },
                  ].map((flower, idx) => (
                    <motion.circle
                      key={idx}
                      cx={flower.cx}
                      cy={flower.cy}
                      r={flower.r}
                      fill="url(#blushGrad)"
                      opacity="0.9"
                      initial={{ opacity: 0, scale: 0.3 }}
                      whileInView={{ opacity: 0.9, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: reduced ? 0.2 : 0.4,
                        delay: reduced ? 0 : 0.65 + idx * 0.02,
                        ease: EASE,
                      }}
                    />
                  ))}

                  {/* Flower Gold Centers */}
                  <circle cx="33.6" cy="102.0" r="2.8" fill="#C9A66B" />
                  <circle cx="186.4" cy="102.0" r="2.8" fill="#C9A66B" />
                  <circle cx="110.0" cy="26.0" r="3.2" fill="#C9A66B" />

                  <text x="84.0" y="116.0" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fill="#8C7148">
                    {brideInitial}
                  </text>
                  <text x="110.0" y="116.0" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#C9A66B" fontStyle="italic">
                    &amp;
                  </text>
                  <text x="136.0" y="116.0" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fill="#8C7148">
                    {groomInitial}
                  </text>
                </svg>
              </motion.div>
            </Reveal>

            {/* 3. Streamlined Unified Parents Block */}
            <Reveal delay={0.25} y={6} className="mb-3">
              <p className="eyebrow text-[0.56rem] sm:text-[0.62rem] tracking-[0.32em] text-[#b89138] font-bold uppercase mb-1">
                PARENTS OF THE BRIDE &amp; GROOM
              </p>
              <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[#3a2b1c] font-normal leading-snug">
                {brideParents} &nbsp;•&nbsp; {groomParents}
              </p>
            </Reveal>

            {/* 4. Request Line flanked by delicate gold hairline rules */}
            <Reveal delay={0.35} y={6} className="mb-3 flex flex-col items-center">
              <div className="mb-1.5 flex items-center justify-center gap-2.5 text-[#b89138]/70">
                <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#b89138]/60" />
                <span className="text-[0.5rem] text-[#b89138]">✦</span>
                <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#b89138]/60" />
              </div>

              <p className="font-[family-name:var(--font-serif)] text-xs sm:text-sm italic text-[#6b4715] font-normal leading-none">
                {requestLine}
              </p>
            </Reveal>

            {/* 5. HERO TIER: Solid High-Contrast Gold Foil Couple Names (Zero disappearing act, perfectly legible) */}
            <Reveal delay={0.45} y={8} className="relative mb-3 w-full flex flex-col items-center overflow-visible">
              <div className="relative z-10 flex flex-col items-center justify-center px-2 overflow-visible w-full">
                <h2 className="font-[family-name:var(--font-script)] foil-text text-4xl xs:text-5xl sm:text-6xl font-normal leading-[1.35] tracking-wide py-1 px-2 sm:px-4 overflow-visible whitespace-nowrap filter drop-shadow-[0_2px_4px_rgba(70,45,15,0.4)]">
                  {brideName} <span className="text-[0.65em] italic font-serif text-[#b89138] px-1 sm:px-2">&amp;</span> {groomName}
                </h2>

                {/* Compact Calligraphy Swash Underline */}
                <svg width="200" height="16" viewBox="0 0 200 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-0.5 w-40 sm:w-48 opacity-90">
                  <defs>
                    <linearGradient id="swashGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#997530" stopOpacity="0.2" />
                      <stop offset="25%" stopColor="#e6c875" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#fff5cd" stopOpacity="1" />
                      <stop offset="75%" stopColor="#e6c875" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#997530" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 8 Q 50 2 100 8 T 190 8" stroke="url(#swashGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="100" cy="8" r="2.4" fill="#c59b27" />
                </svg>
              </div>
            </Reveal>

            {/* 6. Unified Consolidated Event & Venue Details Block */}
            <Reveal delay={0.55} y={6} className="mt-1 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[#b89138] text-[0.6rem] sm:text-[0.65rem] tracking-[0.32em] font-bold uppercase mb-1">
                <span>{dateText}</span>
                <span className="opacity-60">•</span>
                <span>{timeText}</span>
              </div>

              <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm font-medium text-[#2c1c0e] uppercase tracking-wider leading-snug">
                {venueName}, {venueCity}
              </p>
            </Reveal>

            {/* 7. Closing Bottom Bookend Accent Motif */}
            <Reveal delay={0.65} y={6} className="mt-4">
              <div className="flex items-center justify-center gap-2 text-[#8a5d19]/70">
                <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#8a5d19]/60" />
                <span className="text-[0.65rem] text-[#8a5d19]">❖</span>
                <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#8a5d19]/60" />
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
}
