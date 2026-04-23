import { useState, useEffect } from "react";
import { config } from "./siteConfig";
import Particles from "./components/Particles";
import { InteractiveEffects } from "./components/InteractiveEffects";
import { Hero } from "./components/Hero";
import { PhotoShowcase } from "./components/PhotoShowcase";
import { MemoryTimeline } from "./components/MemoryTimeline";
import { ReasonsCarousel } from "./components/ReasonsCarousel";
import { LoveLetters } from "./components/LoveLetters";
import { SurpriseReveal } from "./components/SurpriseReveal";
import { Footer } from "./components/Footer";
import { AudioPlayer } from "./components/AudioPlayer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { EasterEgg } from "./components/EasterEgg";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const target = new Date(config.birthdayDate).getTime();
    const checkUnlock = () => setIsUnlocked(new Date().getTime() >= target);
    
    checkUnlock();
    const interval = setInterval(checkUnlock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Apply song theme class to <html> so body background + all CSS vars cascade
  useEffect(() => {
    const html = document.documentElement;
    ["theme-0","theme-1","theme-2","theme-3","theme-4","theme-5"].forEach(c => html.classList.remove(c));
    html.classList.add(`theme-${trackIndex}`);
  }, [trackIndex]);

  const Divider = () => (
    <div className="w-full flex justify-center opacity-60">
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold to-transparent" />
    </div>
  );

  return (
    <div className="relative min-h-screen font-sans text-blush overflow-x-hidden">
      <ScrollProgressBar />
      <EasterEgg />

      {/* Loading screen sits on top until done */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <InteractiveEffects />
      <Particles />
      <AudioPlayer trackIndex={trackIndex} setTrackIndex={setTrackIndex} />

      <main className="relative z-10 w-full mx-auto overflow-x-hidden flex flex-col gap-16 md:gap-24 pb-10">
        <Hero isUnlocked={isUnlocked} />
        
        {isUnlocked && (
          <>
            <Divider />
            <PhotoShowcase />
            <Divider />
            <MemoryTimeline />
            <Divider />
            <ReasonsCarousel />
            <Divider />
            <LoveLetters />
            <Divider />
            <SurpriseReveal />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
