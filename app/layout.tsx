import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UWA AI Club — Learn by Building",
  description:
    "UWA's student community for artificial intelligence. Workshops, projects, hackathons — building practical AI skills through creativity, collaboration, and learning by doing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-lime focus:text-void focus:px-4 focus:py-2 focus:rounded-full font-mono text-sm"
        >
          skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
