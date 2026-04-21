import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const InteractiveEffects = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  // Mouse sparkle trail
  useEffect(() => {
    let sparkleId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.85) {
        const id = sparkleId++;
        setSparkles((prev) => [...prev, { id, x: e.clientX, y: e.clientY }].slice(-20));
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Click hearts
  useEffect(() => {
    let heartId = 0;
    const handleClick = (e: MouseEvent) => {
      const id = heartId++;
      setHearts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1500);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">

      {/* Ambient cursor spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232,160,191,0.07), transparent 40%)`,
        }}
      />

      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={`s-${s.id}`}
            initial={{ opacity: 0.8, scale: 0, x: s.x - 4, y: s.y - 4 }}
            animate={{ opacity: 0, scale: 1.5, y: s.y - 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#d4a853]"
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={`h-${h.id}`}
            initial={{ opacity: 1, scale: 0.5, x: h.x - 12, y: h.y - 12 }}
            animate={{ opacity: 0, scale: 1.5, y: h.y - 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed text-rose drop-shadow-[0_0_10px_rgba(232,160,191,0.8)] text-2xl"
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
