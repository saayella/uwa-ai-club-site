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

type Mood = "wave" | "idle" | "blink" | "happy" | "curious";

const FRAMES: Record<Mood, string> = {
  wave: "/marv/expressions/wave-happy.png",
  idle: "/marv/expressions/neutral-1.png",
  blink: "/marv/expressions/smile-soft.png",
  happy: "/marv/expressions/happy-closed.png",
  curious: "/marv/expressions/neutral-3.png",
};

const THOUGHTS = [
  "human, or an agent?",
  "// gradient descending…",
  "wanna build something?",
];

export default function MarvCompanion() {
  const reduce = useReducedMotion();
  const [mood, setMood] = useState<Mood>("wave");
  const [thought, setThought] = useState<string | null>(null);
  const holdRef = useRef(false);

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
      setMood("blink");
      return;
    }

    // entrance wave, then settle into the idle/blink loop
    const settle = setTimeout(() => setMood("idle"), 2200);

    const blinker = setInterval(() => {
      if (holdRef.current) return;
      setMood("blink");
      setTimeout(() => {
        if (!holdRef.current) setMood("idle");
      }, 480);
    }, 3800);

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
      clearTimeout(settle);
      clearInterval(blinker);
      clearInterval(think);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, mx, my]);

  // react to what's on screen: happy near CTAs, curious in the vision chapter
  useEffect(() => {
    if (reduce) return;
    const vision = document.getElementById("vision");
    if (!vision) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        holdRef.current = entry.isIntersecting;
        setMood(entry.isIntersecting ? "curious" : "idle");
      },
      { threshold: 0.15 }
    );
    io.observe(vision);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <motion.div
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 700 }}
      className="relative select-none"
      onPointerEnter={() => {
        if (reduce) return;
        holdRef.current = true;
        setMood("happy");
      }}
      onPointerLeave={() => {
        holdRef.current = false;
        if (!reduce) setMood("idle");
      }}
    >
      <AnimatePresence>
        {thought && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl rounded-bl-sm border border-hairline bg-surface-2 px-4 py-2 font-mono text-xs text-lime"
          >
            {thought}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={reduce ? "" : "animate-[marv-bob_5s_ease-in-out_infinite]"}>
        {(Object.keys(FRAMES) as Mood[]).map((m) => (
          <Image
            key={m}
            src={FRAMES[m]}
            alt={m === mood ? "Marv, the UWA AI Club robot-cat mascot" : ""}
            width={340}
            height={340}
            priority={m === "wave"}
            className={`drop-shadow-[0_0_36px_rgba(157,255,63,0.35)] transition-opacity duration-150 ${
              m === mood ? "opacity-100" : "opacity-0"
            } ${m === "wave" ? "" : "absolute inset-0"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
