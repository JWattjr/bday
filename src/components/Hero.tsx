import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { config } from "../siteConfig";

export const Hero = ({ isUnlocked }: { isUnlocked: boolean }) => {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const nameLetters = config.name.split("");
  const subtitleWords = config.heroSubtitle.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center justify-items-center px-6 pt-20 pb-10 z-10">
      
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-rose font-cursive italic tracking-widest text-lg sm:text-2xl mb-4 h-8">
            <AnimatePresence mode="wait">
              {isUnlocked ? (
                <motion.span
                  key="unlocked-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  Happy Birthday
                </motion.span>
              ) : (
                <motion.span
                  key="locked-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  Almost there...
                </motion.span>
              )}
            </AnimatePresence>
          </h2>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-glow mb-6 leading-tight flex justify-center flex-wrap">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring", bounce: 0.5 }}
                className="animated-gradient-text drop-shadow-[0_0_25px_rgba(232,160,191,0.6)]"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <div className="text-blush/80 text-lg sm:text-xl font-light max-w-xl mx-auto leading-relaxed h-[40px] flex justify-center flex-wrap">
          {subtitleWords.map((word, index) => (
             <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.15 }}
                className="inline-block mr-2"
             >
                {word}
             </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2.5, type: "spring" }}
      >
        <CountdownTimer />
      </motion.div>

      <AnimatePresence mode="wait">
        {isUnlocked ? (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-6 overflow-hidden"
          >
            <button 
              onClick={handleScroll}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors group"
            >
              Explore Your Day
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="mt-12 flex flex-col items-center gap-3 overflow-hidden text-center"
          >
            <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-champagne/60">
              What happens after the countdown?
            </p>
            <p className="text-lg sm:text-xl font-cursive italic text-rose/90 drop-shadow-[0_0_15px_rgba(232,160,191,0.3)]">
              Stick around and find out...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
