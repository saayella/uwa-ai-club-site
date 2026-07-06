import Reveal from "./Reveal";

const values = [
  {
    title: "Learn by building",
    body: "Workshops, project programs, hackathons. We don't just talk about AI — we ship it, then demo it at a showcase.",
  },
  {
    title: "Zero gatekeeping",
    body: "Beginner-friendly by default. Your degree doesn't matter; your curiosity does.",
  },
  {
    title: "Critically curious",
    body: "We engage seriously with where AI is going — the capabilities and the consequences. Hype not included.",
  },
  {
    title: "Industry-real",
    body: "Real problems from industry and research, real mentors, real sponsors watching the showcase.",
  },
  {
    title: "Community first",
    body: "Interdisciplinary and inclusive — from first workshop to committee. The grape drop was real.",
  },
];

export default function Values() {
  return (
    <section id="values" aria-label="Our values" className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <p className="font-mono text-sm text-moss">{"// values"}</p>
          <h2 className="mt-4 font-display font-bold text-[clamp(1.9rem,4.5vw,3.2rem)] leading-tight">
            What we <span className="text-lime text-glow">optimise</span> for
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px rounded-2xl overflow-hidden border border-hairline bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="bg-void">
              <div className="group h-full bg-surface/40 hover:bg-surface transition-colors p-7 sm:p-8">
                <p className="font-mono text-xs text-moss group-hover:text-lime transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display font-semibold text-lg">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={values.length * 0.08} className="bg-void">
            <a
              href="mailto:uwaaiclub@gmail.com?subject=Joining%20the%20UWA%20AI%20Club"
              className="group flex h-full flex-col justify-between bg-lime p-7 sm:p-8 text-void transition-shadow hover:shadow-[inset_0_0_60px_rgba(3,9,5,0.25)]"
            >
              <p className="font-mono text-xs">06</p>
              <div>
                <h3 className="mt-4 font-display font-semibold text-lg">
                  Your value here
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  The club is one year old. Help decide what it becomes —
                  join us. <span aria-hidden>→</span>
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
