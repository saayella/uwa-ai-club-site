"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#vision", label: "vision" },
  { href: "#values", label: "values" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-void/75 backdrop-blur-md border-hairline"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between"
      >
        <Link href="#top" className="flex items-center gap-3 group">
          <span
            aria-hidden
            className="size-2.5 rounded-full bg-lime glow-lime group-hover:scale-125 transition-transform"
          />
          <span className="font-display text-[13px] tracking-[0.18em] uppercase">
            UWA AI Club
          </span>
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden sm:inline font-mono text-sm text-moss hover:text-lime transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:uwaaiclub@gmail.com?subject=Joining%20the%20UWA%20AI%20Club"
            className="font-mono text-sm rounded-full border border-lime/40 text-lime px-4 py-1.5 hover:bg-lime hover:text-void hover:glow-lime transition-all"
          >
            join →
          </a>
        </div>
      </nav>
    </header>
  );
}
