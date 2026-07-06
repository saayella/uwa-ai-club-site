"use client";

import { motion, useReducedMotion } from "motion/react";
import NeuralCanvas from "./NeuralCanvas";
import MarvCompanion from "./MarvCompanion";

const stats = [
  ["100+", "members"],
  ["380+", "on discord"],
  ["80+", "project applicants"],
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] as const },
  });

  return (
    <section
      id="top"
      className="noise relative overflow-hidden"
    >
      <NeuralCanvas />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(157,255,63,0.07),transparent_55%)]"
      />

      <div className="relative w-full px-5 sm:px-10 lg:px-0 min-h-svh flex flex-col lg:block">
        {/* Marv — anchored to the viewport's bottom-left, spanning the hero height */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          className="max-lg:mx-auto max-lg:w-[min(88vw,460px)] lg:absolute lg:bottom-0 lg:left-[2vw] lg:w-[min(48vw,94svh)] max-lg:order-last"
        >
          <div
            aria-hidden
            className="absolute inset-x-[-15%] bottom-[-12%] h-[80%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(157,255,63,0.2),transparent_70%)] blur-2xl"
          />
          <MarvCompanion />
        </motion.div>

        <div className="relative z-10 lg:ml-[48vw] lg:mr-[6vw] lg:min-h-svh flex flex-col justify-center pt-32 pb-6 lg:py-28">
          <motion.p {...rise(0.05)} className="font-mono text-sm text-moss">
            {"// uwa ai club — est. 2025 · perth, wa"}
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-6 font-display font-bold leading-[1.06] text-[clamp(2.4rem,4.3vw,4.2rem)]"
          >
            Welcome to
            <br />
            UWA <span className="text-lime text-glow">AI</span> Club
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-8 max-w-2xl text-lg sm:text-xl text-cream/80 leading-relaxed"
          >
            The newest club at UWA, here to{" "}
            <span className="text-lime">educate</span>. We build an inclusive,
            interdisciplinary community where students develop practical AI
            skills and collaborate on real-world problems.
          </motion.p>

          <motion.div {...rise(0.45)} className="mt-9 flex flex-wrap gap-4">
            <a
              href="mailto:uwaaiclub@gmail.com?subject=Joining%20the%20UWA%20AI%20Club"
              className="rounded-full bg-lime text-void font-medium px-7 py-3 hover:shadow-[0_0_32px_6px_rgba(157,255,63,0.45)] transition-shadow"
            >
              Join the club
            </a>
            <a
              href="#vision"
              className="rounded-full border border-hairline px-7 py-3 text-cream/85 hover:border-lime/50 hover:text-lime transition-colors"
            >
              Our vision ↓
            </a>
          </motion.div>

          <motion.dl
            {...rise(0.6)}
            className="mt-14 flex flex-wrap gap-x-12 gap-y-4 font-mono text-base"
          >
            {stats.map(([n, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="text-lime text-2xl">{n}</dd>
                <dd className="text-moss">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-moss/60 max-lg:hidden"
      >
        scroll ↓
      </div>
    </section>
  );
}
