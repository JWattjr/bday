import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { config } from "../siteConfig";
import confetti from "canvas-confetti";
import DecryptedText from "./reactbits/DecryptedText";

export const SurpriseReveal = () => {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    
    // Confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e8a0bf', '#d4a853', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e8a0bf', '#d4a853', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="py-32 px-6 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
          <DecryptedText
            text="One Last Thing..."
            animateOn="view"
            speed={60}
            maxIterations={20}
            sequential={true}
            revealDirection="center"
            characters="♥★✦✧❤♡⋆"
            className="text-white"
            encryptedClassName="text-rose/40"
          />
        </h2>
      </div>

      <div className="relative w-full max-w-lg mx-auto flex items-center justify-center min-h-[400px]">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="box"
              onClick={handleReveal}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              exit={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="absolute inset-0 m-auto flex flex-col items-center justify-center glass-card w-56 h-56 md:w-64 md:h-64 rounded-full mx-auto box-glow cursor-pointer hover:bg-white/10 transition-colors group z-20"
            >
              <Gift size={56} className="text-gold mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12" strokeWidth={1} />
              <span className="text-champagne font-cursive italic text-xl md:text-2xl">Tap to open</span>
            </motion.button>
          ) : (
            <motion.div
              key="reveal"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="relative z-10 glass-card w-full p-8 md:p-10 text-center flex flex-col items-center shadow-[0_0_50px_rgba(212,168,83,0.2)] bg-gradient-to-b from-white/10 to-transparent"
            >
              {config.surprise.photo && (
                <div className="w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden mb-8 border border-white/20 p-2 bg-white/5 shadow-2xl">
                  <img src={config.surprise.photo} alt="Surprise" className="w-full h-full object-cover rounded-lg" />
                </div>
              )}
              <p className="text-champagne text-xl md:text-2xl leading-relaxed font-cursive">
                <DecryptedText
                  text={config.surprise.content}
                  animateOn="view"
                  speed={40}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  characters="♥♡✦⋆★·"
                  className="text-champagne"
                  encryptedClassName="text-gold/30"
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
