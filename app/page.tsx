import BootIntro from "@/components/BootIntro";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Values from "@/components/Values";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <BootIntro />
      <Hero />
      <Vision />
      <Values />
    </main>
  );
}
