import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Particles = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sky background image with parallax */}
      <motion.div
        className="absolute inset-x-0 top-[-15%] h-[130%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/photos/sky-bg.jpg')", y }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-midnight/60" />

      {/* Subtle gradient vignette at top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-transparent to-midnight/90" />

      {/* Floating petals */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-rose/30 rounded-full blur-[2px]"
          style={{
            width: p.size,
            height: p.size * 1.5,
            left: `${p.x}vw`,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-10vh",
            x: ["0px", "40px", "-40px", "0px"],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0.8, 0],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            opacity: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
