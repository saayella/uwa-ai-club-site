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
      className="noise relative overflow-hidden min-h-svh flex items-center pt-16"
    >
      <NeuralCanvas />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(157,255,63,0.07),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-20 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative mx-auto w-full max-w-md max-lg:order-last"
        >
          <div className="relative rounded-3xl border border-hairline bg-surface/60 backdrop-blur-sm p-10 flex justify-center">
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(157,255,63,0.12),transparent_65%)]"
            />
            <MarvCompanion />
            <p className="absolute bottom-4 right-6 font-mono text-xs text-moss/70">
              marv.sys — online
            </p>
          </div>
        </motion.div>

        <div>
          <motion.p {...rise(0.05)} className="font-mono text-sm text-moss">
            {"// uwa ai club — est. 2025 · perth, wa"}
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-6 font-display font-bold leading-[1.08] text-[clamp(2.2rem,4.6vw,4.1rem)]"
          >
            Welcome to
            <br />
            UWA <span className="text-lime text-glow">AI</span> Club
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-7 max-w-xl text-lg text-cream/80 leading-relaxed"
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
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm"
          >
            {stats.map(([n, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="text-lime text-lg">{n}</dd>
                <dd className="text-moss">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-moss/60"
      >
        scroll ↓
      </div>
    </section>
  );
}
