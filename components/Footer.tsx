import Image from "next/image";

const socials = [
  {
    label: "instagram",
    href: "https://www.instagram.com/uwaaiclub/",
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/company/uwa-ai-club",
  },
  {
    label: "email",
    href: "mailto:uwaaiclub@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
        <div className="flex items-start gap-4">
          <Image
            src="/marv/expressions/smile-soft.png"
            alt="Marv, the UWA AI Club mascot"
            width={56}
            height={56}
            className="rounded-xl bg-surface p-1 border border-hairline"
          />
          <div>
            <p className="font-display text-sm tracking-wide">UWA AI Club</p>
            <p className="mt-1 text-sm text-moss">
              Built by students, for students.
            </p>
          </div>
        </div>
        <ul className="flex sm:justify-center gap-6 font-mono text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-moss hover:text-lime transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="sm:text-right font-mono text-xs text-moss/70 leading-relaxed">
          © 2026 UWA AI Club · Perth, WA
          <br />
          est. 2025 · human-and-agent friendly
        </p>
      </div>
    </footer>
  );
}
