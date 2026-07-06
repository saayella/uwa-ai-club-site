"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const FRAMES = [
  "neutral-1",
  "neutral-2",
  "neutral-3",
  "smile-soft",
  "happy-closed",
  "wave-neutral",
  "wave-eyes",
  "wave-happy",
  "smile-wave",
  "smile-wave-2",
] as const;

type Frame = (typeof FRAMES)[number];

// frame sequences — arm/eye positions differ per frame, so stepping
// through them plays like a hand-drawn animation
const WAVE: Frame[] = [
  "wave-neutral",
  "wave-eyes",
  "wave-happy",
  "smile-wave",
  "smile-wave-2",
  "smile-wave",
  "wave-happy",
];
const BLINK: Frame[] = ["smile-soft", "neutral-1"];
const GLANCE: Frame[] = ["neutral-2", "neutral-3", "neutral-2", "neutral-1"];
const DELIGHT: Frame[] = ["happy-closed", "smile-wave-2", "happy-closed"];

const THOUGHTS = [
  "human, or an agent?",
  "// gradient descending…",
  "wanna build something?",
];

export default function MarvCompanion() {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<Frame>("wave-neutral");
  const [thought, setThought] = useState<string | null>(null);
  const seqTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hovering = useRef(false);

  const stopSeq = useCallback(() => {
    if (seqTimer.current) clearInterval(seqTimer.current);
    seqTimer.current = null;
  }, []);

  const play = useCallback(
    (frames: Frame[], ms: number, loop = false, onDone?: () => void) => {
      stopSeq();
      let i = 0;
      setFrame(frames[0]);
      seqTimer.current = setInterval(() => {
        i += 1;
        if (i >= frames.length) {
          if (loop) {
            i = 0;
          } else {
            stopSeq();
            setFrame("neutral-1");
            onDone?.();
            return;
          }
        }
        setFrame(frames[i]);
      }, ms);
    },
    [stopSeq]
  );

  // cursor tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 90,
    damping: 14,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [8, -8]), {
    stiffness: 90,
    damping: 14,
  });

  useEffect(() => {
    if (reduce) {
      setFrame("smile-soft");
      return;
    }

    // entrance: two full wave cycles, then hand over to the idle loop
    play([...WAVE, ...WAVE], 220);

    // idle life: every ~2.6s a micro-animation (blink / glance / wave snippet)
    idleTimer.current = setInterval(() => {
      if (hovering.current || seqTimer.current) return;
      const roll = Math.random();
      if (roll < 0.5) play(BLINK, 170);
      else if (roll < 0.8) play(GLANCE, 240);
      else play(WAVE.slice(0, 5), 230);
    }, 2600);

    // occasional thought bubble
    let i = 0;
    const think = setInterval(() => {
      setThought(THOUGHTS[i % THOUGHTS.length]);
      i += 1;
      setTimeout(() => setThought(null), 3600);
    }, 9000);

    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stopSeq();
      if (idleTimer.current) clearInterval(idleTimer.current);
      clearInterval(think);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, play, stopSeq, mx, my]);

  return (
    <motion.div
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 700 }}
      className="relative select-none cursor-pointer"
      onPointerEnter={() => {
        if (reduce) return;
        hovering.current = true;
        play(WAVE, 200, true);
      }}
      onPointerLeave={() => {
        if (reduce) return;
        hovering.current = false;
        play(BLINK, 170);
      }}
      onClick={() => {
        if (reduce) return;
        play(DELIGHT, 200);
        setThought(THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]);
        setTimeout(() => setThought(null), 3000);
      }}
    >
      <AnimatePresence>
        {thought && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl rounded-bl-sm border border-hairline bg-surface-2 px-4 py-2 font-mono text-xs text-lime z-10"
          >
            {thought}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={reduce ? "" : "animate-[marv-bob_5s_ease-in-out_infinite]"}>
        {FRAMES.map((f, idx) => (
          <Image
            key={f}
            src={`/marv/expressions/${f}.png`}
            alt={f === frame ? "Marv, the UWA AI Club robot-cat mascot" : ""}
            width={340}
            height={340}
            priority={idx < 2}
            className={`drop-shadow-[0_0_36px_rgba(157,255,63,0.35)] ${
              f === frame ? "opacity-100" : "opacity-0"
            } ${idx === 0 ? "" : "absolute inset-0"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
