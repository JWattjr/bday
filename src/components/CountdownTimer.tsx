import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../siteConfig";
import confetti from "canvas-confetti";

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const target = new Date(config.birthdayDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Trigger confetti once when all values hit zero
  useEffect(() => {
    const { days, hours, minutes, seconds } = timeLeft;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0 && !fired) {
      setFired(true);
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const ticker = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(ticker);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [timeLeft, fired]);

  return (
    <div className="flex gap-4 justify-center mt-12 mb-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="glass-card w-16 h-20 sm:w-20 sm:h-24 flex text-3xl sm:text-4xl font-serif text-white box-glow relative overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                {value.toString().padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-0"></div>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-champagne/70 mt-3">{label}</span>
        </div>
      ))}
    </div>
  );
};
