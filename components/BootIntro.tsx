"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINES = [
  "$ ./marv --wake",
  "init marv.sys ............ ok",
  "loading vision ........... ok",
  "calibrating values ....... ok",
  "human, or an agent? ...... [both welcome]",
];

const LINE_DELAY = 260;

export default function BootIntro() {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (
      sessionStorage.getItem("marv-booted") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(false);
      return;
    }

    const timers = LINES.map((_, i) =>
      setTimeout(() => setShown(i + 1), 120 + i * LINE_DELAY)
    );
    const done = setTimeout(dismiss, 120 + LINES.length * LINE_DELAY + 500);

    window.addEventListener("keydown", dismiss);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", dismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    sessionStorage.setItem("marv-booted", "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading UWA AI Club"
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          onClick={dismiss}
          className="fixed inset-0 z-50 bg-void flex items-center justify-center cursor-pointer"
        >
          <div className="w-[min(90vw,480px)] font-mono text-sm sm:text-[15px] leading-loose">
            {LINES.slice(0, shown).map((line, i) => (
              <p
                key={line}
                className={
                  i === 0
                    ? "text-lime"
                    : line.includes("welcome")
                      ? "text-gold"
                      : "text-cream/80"
                }
              >
                {line}
              </p>
            ))}
            {shown > 0 && shown < LINES.length && (
              <p className="caret text-lime" aria-hidden />
            )}
            <p className="mt-6 text-xs text-moss/50">
              click anywhere to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
