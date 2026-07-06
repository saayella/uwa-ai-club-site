"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "./Reveal";

const VISION =
  "To be a student-driven pipeline of AI talent, contributing to a university ecosystem where students confidently shape the future of artificial intelligence as thoughtful practitioners, researchers, and innovators within Australia and beyond.";

const MISSION =
  "To build an inclusive, interdisciplinary community where students develop practical artificial intelligence skills, engage critically with emerging technologies, and collaborate on real-world problems relevant to industry and research.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export default function Vision() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const winthropOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 0.22]);

  const words = VISION.split(" ");

  return (
    <section id="vision" aria-label="Our vision">
      {/* scroll-driven chapter: tall track, pinned viewport */}
      <div ref={trackRef} className={reduce ? "" : "relative h-[260vh]"}>
        <div
          className={`${
            reduce ? "" : "sticky top-0 h-svh"
          } relative flex items-center overflow-hidden`}
        >
          {/* Winthrop Hall line-art — "a university ecosystem" */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { opacity: winthropOpacity }}
            className={`absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none select-none ${
              reduce ? "opacity-20" : ""
            }`}
          >
            <Image
              src="/uwa-winthrop.png"
              alt=""
              width={806}
              height={691}
              className="h-[70svh] w-auto max-w-none mix-blend-screen opacity-90 translate-x-[12%]"
            />
          </motion.div>

          <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-24 w-full">
            <div className="flex items-center gap-4">
              <p className="font-mono text-sm text-moss">{"// vision"}</p>
              <span className="h-px flex-1 bg-cream/10" aria-hidden />
              <Image
                src="/marv/expressions/neutral-3.png"
                alt=""
                aria-hidden
                width={76}
                height={76}
                className="opacity-90 shrink-0"
              />
            </div>
            <p className="mt-10 font-display font-medium leading-[1.35] text-[clamp(1.4rem,3.4vw,2.6rem)] text-balance">
              {reduce
                ? VISION
                : words.map((w, i) => (
                    <Word
                      key={i}
                      progress={scrollYProgress}
                      range={[i / words.length, (i + 1) / words.length]}
                    >
                      {w}
                    </Word>
                  ))}
            </p>
          </div>
        </div>
      </div>

      {/* mission — terminal card */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-28 -mt-6">
        <Reveal>
          <div className="rounded-2xl border border-hairline bg-surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f56]" aria-hidden />
              <span className="size-2.5 rounded-full bg-gold" aria-hidden />
              <span className="size-2.5 rounded-full bg-lime" aria-hidden />
              <p className="ml-3 font-mono text-xs text-moss">
                mission.txt — uwa-ai-club
              </p>
            </div>
            <div className="px-5 sm:px-8 py-7 font-mono text-sm sm:text-[15px] leading-relaxed">
              <p className="text-moss">$ cat mission.txt</p>
              <p className="mt-3 text-cream/90">{MISSION}</p>
              <p className="mt-3 text-lime caret" aria-hidden>
                $
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
