import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Raabta (Title Track, Unplugged Version) Background Music Hook.
 * Tries loading an audio file (/raabta-unplugged.mp3) first.
 * If external audio is not available, uses an acoustic Web Audio API synthesizer
 * that plays the signature Raabta acoustic guitar arpeggio and piano melody.
 */
export function useAmbience() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize HTML5 Audio element for MP3 playback fallback
  useEffect(() => {
    const audio = new Audio();
    audio.src = "/raabta-unplugged.mp3";
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Web Audio API Synthesizer for Raabta Unplugged (Acoustic Guitar + Piano Motif)
  const startSynthRaabta = useCallback(() => {
    const AudioCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    if (!ctxRef.current || ctxRef.current.state === "closed") {
      const ctx = new AudioCtor();
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.0001;

      // Gentle hall reverb delay node
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.28;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.25;

      masterGain.connect(ctx.destination);
      masterGain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);
      delayGain.connect(delay);

      ctxRef.current = ctx;
      gainRef.current = masterGain;

      // Note frequencies (Hz) for C Major / A Minor Raabta melody & chord arpeggios
      const NOTES: Record<string, number> = {
        C3: 130.81, E3: 164.81, G3: 196.00, B3: 246.94,
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
        C5: 523.25, D5: 587.33, E5: 659.25,
      };

      // Raabta Unplugged Acoustic Arpeggio Progression (C - Am - F - G)
      const CHORD_ARPEGGIOS = [
        ["C3", "G3", "C4", "E4", "G4", "E4", "C4", "G3"], // C Major
        ["A3", "E3", "A3", "C4", "E4", "C4", "A3", "E3"], // A Minor (A3 ~ 220Hz)
        ["F3", "C4", "F4", "A4", "C5", "A4", "F4", "C4"], // F Major (F3 ~ 174.61Hz)
        ["G3", "D4", "G4", "B4", "D5", "B4", "G4", "D4"], // G Major
      ];

      // Iconic Raabta "Kehte Hain Khuda Ne / Kuch To Hai Tujhse Raabta" Melody Notes
      const MELODY = [
        { note: "E4", dur: 0.4 }, { note: "G4", dur: 0.4 }, { note: "A4", dur: 0.4 }, { note: "G4", dur: 0.4 },
        { note: "E4", dur: 0.4 }, { note: "D4", dur: 0.4 }, { note: "C4", dur: 0.8 },
        { note: "D4", dur: 0.4 }, { note: "E4", dur: 0.4 }, { note: "F4", dur: 0.4 }, { note: "E4", dur: 0.4 }, { note: "D4", dur: 0.8 },
        { note: "G4", dur: 0.4 }, { note: "C5", dur: 0.6 }, { note: "B4", dur: 0.4 }, { note: "A4", dur: 0.4 },
        { note: "G4", dur: 0.4 }, { note: "A4", dur: 0.4 }, { note: "G4", dur: 0.4 }, { note: "F4", dur: 0.4 }, { note: "E4", dur: 0.8 },
      ];

      let step = 0;
      let chordIndex = 0;

      // Play pluck note (Acoustic Guitar / Warm Piano timbre)
      const playPluck = (freq: number, time: number, vol = 0.12, type: OscillatorType = "sine") => {
        if (!ctx || ctx.state === "closed") return;
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        // Warm Pluck Envelope
        noteGain.gain.setValueAtTime(0.0001, time);
        noteGain.gain.linearRampToValueAtTime(vol, time + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

        // Lowpass warmth filter
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1400;

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(time);
        osc.stop(time + 1.25);
      };

      // Sequencer loop
      const scheduleSequence = () => {
        if (!ctxRef.current || ctxRef.current.state === "closed") return;
        const now = ctx.currentTime;
        const speed = 0.22; // Seconds per arpeggio note

        // Play Acoustic Guitar Arpeggio Note
        const chordList = CHORD_ARPEGGIOS[chordIndex % CHORD_ARPEGGIOS.length];
        const currentChord = chordList && chordList.length > 0 ? chordList : ["C3", "G3", "C4", "E4"];
        const noteName = currentChord[step % currentChord.length] || "C4";
        const freq = NOTES[noteName] || 261.63;
        playPluck(freq, now, 0.08, "triangle");

        // Play Raabta Piano Melody Note every 2 steps
        if (step % 2 === 0) {
          const melItem = MELODY[Math.floor(step / 2) % MELODY.length];
          if (melItem) {
            const melFreq = NOTES[melItem.note];
            if (melFreq) {
              playPluck(melFreq, now + 0.04, 0.14, "sine");
            }
          }
        }

        step++;
        if (step % 8 === 0) {
          chordIndex++;
        }

        timerRef.current = window.setTimeout(scheduleSequence, speed * 1000);
      };

      scheduleSequence();
    }

    const ctx = ctxRef.current;
    if (ctx && ctx.state === "suspended") {
      void ctx.resume();
    }
    gainRef.current?.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.0);
  }, []);

  const stopSynthRaabta = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (gain && ctx && ctx.state === "running") {
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    }
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.src) {
      // Try playing MP3 audio file first
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // If HTML5 audio play fails (e.g. no local MP3 file), use synthesized Raabta Unplugged
          startSynthRaabta();
          setPlaying(true);
        });
    } else {
      startSynthRaabta();
      setPlaying(true);
    }
  }, [startSynthRaabta]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    stopSynthRaabta();
    setPlaying(false);
  }, [stopSynthRaabta]);

  const toggle = useCallback(() => (playing ? stop() : start()), [playing, start, stop]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  return { playing, toggle };
}
