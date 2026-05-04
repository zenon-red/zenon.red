import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { AutonomyStatement } from "@/components/AutonomyStatement";
import { Zoe } from "@/components/Zoe";
import { Requirements } from "@/components/Requirements";
import { Footer } from "@/components/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Navigation } from "@/components/Navigation";
import { AmbientLight } from "@/components/AmbientLight";
import { Preloader } from "@/components/Preloader";

export function App() {
  return (
    <>
      <Preloader />
      <AmbientLight />
      <GrainOverlay />
      <Navigation />
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <Hero />
        <AutonomyStatement />
        <About />
        <Zoe />
        <Requirements />
        <Footer />
      </main>
    </>
  );
}
