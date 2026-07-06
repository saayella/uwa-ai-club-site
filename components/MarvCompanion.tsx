"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

// expression stills, bottom-flush and eye-aligned. Life comes from smooth
// interpolated transforms (breathe/sway/bounce); frames only crossfade
// between near-identical poses so swaps read as blinks, not jumps.
const FRAMES = [
  "neutral-1",
  "neutral-2",
  "neutral-3",
  "smile-soft",
  "happy-closed",
  "wave-happy",
  "smile-wave-2",
] as const;

type Frame = (typeof FRAMES)[number];

const THOUGHTS = [
  "human, or an agent?",
  "// gradient descending…",
  "wanna build something?",
];

export default function MarvCompanion() {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<Frame>("wave-happy");
  const [thought, setThought] = useState<string | null>(null);
  const [bounceKey, setBounceKey] = useState(0);
  const hovering = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waveTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // cursor sway — springs interpolate at 60fps, origin pinned to his base
  const mx = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-7, 7]), {
    stiffness: 55,
    damping: 13,
  });
  const x = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 55,
    damping: 15,
  });

  useEffect(() => {
    if (reduce) {
      setFrame("smile-soft");
      return;
    }

    // entrance: hold the wave, then settle
    const settle = setTimeout(() => setFrame("neutral-1"), 1800);

    // idle: a blink or a sideways glance every few seconds, crossfaded
    const idle = setInterval(() => {
      if (hovering.current) return;
      const roll = Math.random();
      const next: Frame =
        roll < 0.6 ? "smile-soft" : roll < 0.8 ? "neutral-2" : "neutral-3";
      setFrame(next);
      settleTimer.current = setTimeout(
        () => {
          if (!hovering.current) setFrame("neutral-1");
        },
        next === "smile-soft" ? 320 : 1000
      );
    }, 3800);

    let i = 0;
    const think = setInterval(() => {
      setThought(THOUGHTS[i % THOUGHTS.length]);
      i += 1;
      setTimeout(() => setThought(null), 3600);
    }, 9500);

    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      clearTimeout(settle);
      clearInterval(idle);
      clearInterval(think);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      if (waveTimer.current) clearInterval(waveTimer.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, mx]);

  return (
    <motion.div
      style={reduce ? undefined : { rotateY, x, transformPerspective: 800 }}
      className="relative select-none cursor-pointer origin-bottom"
      onPointerEnter={() => {
        if (reduce) return;
        hovering.current = true;
        // gentle two-pose wave, slow crossfades — reads as waving, not cuts
        setFrame("wave-happy");
        waveTimer.current = setInterval(() => {
          setFrame((f) => (f === "wave-happy" ? "smile-wave-2" : "wave-happy"));
        }, 650);
      }}
      onPointerLeave={() => {
        if (reduce) return;
        hovering.current = false;
        if (waveTimer.current) clearInterval(waveTimer.current);
        waveTimer.current = null;
        setFrame("neutral-1");
      }}
      onClick={() => {
        if (reduce) return;
        setFrame("happy-closed");
        setBounceKey((k) => k + 1);
        setThought(THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]);
        setTimeout(() => setThought(null), 3000);
        settleTimer.current = setTimeout(() => {
          if (!hovering.current) setFrame("neutral-1");
        }, 1400);
      }}
    >
      <AnimatePresence>
        {thought && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="absolute -top-10 left-[58%] whitespace-nowrap rounded-2xl rounded-bl-sm border border-hairline bg-surface-2 px-4 py-2 font-mono text-xs text-lime z-10"
          >
            {thought}
          </motion.div>
        )}
      </AnimatePresence>

      {/* squash-and-stretch bounce on click; breathing loop underneath */}
      <motion.div
        key={bounceKey}
        animate={
          reduce || bounceKey === 0
            ? undefined
            : { scaleY: [1, 0.94, 1.04, 1], scaleX: [1, 1.04, 0.98, 1] }
        }
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="origin-bottom"
      >
        <div
          className={`origin-bottom ${
            reduce ? "" : "animate-[marv-breathe_4.5s_ease-in-out_infinite]"
          }`}
        >
          {FRAMES.map((f, idx) => (
            <Image
              key={f}
              src={`/marv/expressions/${f}.png`}
              alt={f === frame ? "Marv, the UWA AI Club robot-cat mascot" : ""}
              width={482}
              height={400}
              priority={idx < 2}
              className={`w-full h-auto drop-shadow-[0_0_44px_rgba(157,255,63,0.3)] transition-opacity duration-300 ease-in-out ${
                f === frame ? "opacity-100" : "opacity-0"
              } ${idx === 0 ? "" : "absolute inset-0"}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
