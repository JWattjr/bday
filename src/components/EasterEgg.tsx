import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECRET = "jbaby";

const HEARTS = ["♥", "💛", "✨", "🌹", "💫", "🎀", "🌸", "💕"];

export const EasterEgg = () => {
  const [active, setActive] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; emoji: string }[]>([]);

  // Keyboard listener
  useEffect(() => {
    let typed = "";
    const handleKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) {
        setActive(true);
        typed = "";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Spawn floating hearts when active
  useEffect(() => {
    if (!active) return;
    let id = 0;
    const spawn = setInterval(() => {
      const newHeart = {
        id: id++,
        x: Math.random() * 90 + 5, // 5% to 95% vw
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      };
      setFloatingHearts((prev) => [...prev, newHeart].slice(-30));
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3500);
    }, 180);
    return () => clearInterval(spawn);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setActive(false)}
          className="fixed inset-0 z-[600] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{ background: "rgba(26, 15, 31, 0.96)" }}
        >
          {/* Floating hearts background */}
          {floatingHearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{ y: "100vh", opacity: 1, scale: 0.5 }}
              animate={{ y: "-15vh", opacity: 0, scale: 1.4 }}
              transition={{ duration: 3.2, ease: "easeOut" }}
              className="fixed text-3xl pointer-events-none"
              style={{ left: `${h.x}vw` }}
            >
              {h.emoji}
            </motion.span>
          ))}

          {/* Central message */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
            className="text-center px-8 max-w-md relative z-10"
          >
            <div className="text-6xl mb-6">💛</div>
            <h2
              className="text-4xl sm:text-5xl font-cursive italic mb-6"
              style={{ color: "#f7e7ce", textShadow: "0 0 30px rgba(232,160,191,0.6)" }}
            >
              You found me
            </h2>
            <p
              className="text-lg font-sans leading-relaxed mb-8"
              style={{ color: "rgba(245,213,224,0.85)" }}
            >
              You weren't supposed to find this, but since you did — it just proves you pay attention to everything. That's one of the reasons I love you.
            </p>
            <p style={{ color: "rgba(212,168,83,0.6)" }} className="text-sm tracking-widest uppercase font-sans">
              Tap anywhere to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
