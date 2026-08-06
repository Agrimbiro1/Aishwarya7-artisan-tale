import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A very soft synthesised ambience — filtered air with a slow breath, closer to
 * a room tone than to music. Muted by default; the guest opts in.
 */
export function useAmbience() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (gain && ctx) gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.4);
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const AudioCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    if (!ctxRef.current) {
      const ctx = new AudioCtor();
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i += 1) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 620;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 220;
      lfo.connect(lfoGain).connect(filter.frequency);

      const drone = ctx.createOscillator();
      drone.type = "sine";
      drone.frequency.value = 146.83;
      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.012;

      const gain = ctx.createGain();
      gain.gain.value = 0.0001;

      noise.connect(filter).connect(gain);
      drone.connect(droneGain).connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      lfo.start();
      drone.start();
      ctxRef.current = ctx;
      gainRef.current = gain;
    }
    const ctx = ctxRef.current;
    void ctx.resume();
    gainRef.current?.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 2.5);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  useEffect(() => () => void ctxRef.current?.close(), []);

  return { playing, toggle };
}
