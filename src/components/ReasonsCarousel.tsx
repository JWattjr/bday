import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { config } from "../siteConfig";
import { TiltCard } from "./TiltCard";

export const ReasonsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const AUTOPLAY_DELAY = 4000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % config.reasonsILoveYou.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + config.reasonsILoveYou.length) % config.reasonsILoveYou.length);
  };

  return (
    <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">reasons I love you</h2>
        <p className="text-rose font-cursive italic text-xl">just a few of a million...</p>
      </div>

      <div 
        className="relative w-full max-w-3xl mx-auto items-center flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <TiltCard intensity={5} className="relative w-full max-w-sm aspect-[3/4] sm:aspect-[4/5] md:aspect-[9/16] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl [perspective:1000px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
              className="absolute inset-0 w-full h-full glass-card [transform-style:preserve-3d]"
            >
              <img
                src={config.reasonsILoveYou[currentIndex].photo}
                alt={`Reason ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-4 z-20">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-midnight/30 text-white backdrop-blur-sm hover:bg-rose/50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-midnight/30 text-white backdrop-blur-sm hover:bg-rose/50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-midnight/50 z-20">
            <motion.div 
              key={`progress-${currentIndex}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? undefined : "100%" }}
              transition={{ duration: isPaused ? 0 : AUTOPLAY_DELAY / 1000, ease: "linear" }}
              className="h-full bg-rose/80"
              style={isPaused ? { width: '100%', opacity: 0.5 } : {}}
            />
          </div>
        </TiltCard>

        {/* Reason Text */}
        <div className="mt-8 text-center max-w-2xl px-4 min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <span className="text-rose font-serif text-lg">Reason #{currentIndex + 1}</span>
              <p className="text-xl md:text-2xl font-light text-blush leading-relaxed font-cursive italic">
                {config.reasonsILoveYou[currentIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
