import Hero from "@/components/Hero";
import KeyboardSequence3D from "@/components/KeyboardSequence3D";
import TechnicalBreakdown from "@/components/TechnicalBreakdown";
import StatsSection from "@/components/StatsSection";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import FinalReveal from "@/components/FinalReveal";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-white">
      <Hero />
      <KeyboardSequence3D />
      <TechnicalBreakdown />
      <StatsSection />
      <HorizontalShowcase />
      <FinalReveal />
    </main>
  );
}
