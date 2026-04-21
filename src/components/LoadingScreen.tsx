import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  // Use ref so the effect never needs to re-run when onComplete identity changes
  const completeCb = useRef(onComplete);
  completeCb.current = onComplete;

  useEffect(() => {
    const DURATION = 2600; // ms total
    const TICK = 40; // ms per tick
    const step = 100 / (DURATION / TICK);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        // Brief hold at 100%, then fade out and signal parent
        setTimeout(() => {
          setDone(true);
          setTimeout(() => completeCb.current(), 700);
        }, 350);
      }
    }, TICK);

    return () => clearInterval(timer);
  }, []); // empty deps — runs once

  return (
    <motion.div
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1a0f1f" }} // hard-coded midnight so it's never white
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(45,27,51,0.6), transparent 70%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-cursive italic text-3xl tracking-[0.2em] mb-10 relative z-10"
        style={{ color: "#f7e7ce" }}
      >
        Preparing your day
      </motion.p>

      {/* Progress bar track */}
      <div
        className="relative w-64 h-px overflow-hidden z-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, transparent, #e8a0bf, #f7e7ce)",
            boxShadow: "0 0 12px rgba(232,160,191,0.5)",
          }}
        />
      </div>

      <p
        className="mt-4 text-xs tracking-[0.3em] uppercase z-10"
        style={{ color: "rgba(245,213,224,0.35)" }}
      >
        {Math.floor(progress)}%
      </p>
    </motion.div>
  );
};
