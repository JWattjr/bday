import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { config } from "../siteConfig";

export const PhotoShowcase = () => {
  const [cards, setCards] = useState(() => {
    const combined = [
      { id: "hero", src: config.photos[0] || "/photos/hero.jpeg", caption: "My favorite view" },
      ...config.memories.map((m, i) => ({ id: `mem-${i}`, src: m.photo, caption: m.date })),
      ...config.reasonsILoveYou.slice(0, 2).map((r, i) => ({ id: `rea-${i}`, src: r.photo, caption: "Love" })),
    ];
    return combined.slice(0, 6).reverse();
  });

  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, id: string) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
      setLeaveX(info.offset.x > 0 ? 600 : -600);
      setLeaveY(info.offset.y > 0 ? 300 : -300);
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  if (cards.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20 px-6 relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-cursive italic text-champagne"
        >
          All moments explored. ✨ More to make.
        </motion.p>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h3 className="font-cursive italic text-3xl text-champagne mb-2">Moments</h3>
        <p className="text-xs tracking-widest uppercase text-blush/50">Swipe the photos away</p>
      </motion.div>

      <div className="relative w-64 h-[22rem] sm:w-80 sm:h-[28rem]">
        {/* Glow behind the stack */}
        <div className="absolute -inset-10 bg-gradient-to-r from-rose to-gold opacity-20 blur-3xl rounded-[2rem] pointer-events-none" />

        <AnimatePresence>
          {cards.map((card, index) => {
            const isTop = index === cards.length - 1;
            const stackOffset = cards.length - 1 - index;
            // Deterministic tilt per card using its id length
            const tilt = (card.id.charCodeAt(card.id.length - 1) % 9) - 4;

            return (
              <motion.div
                key={card.id}
                drag={isTop}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.9}
                onDragEnd={(e, info) => handleDragEnd(e as any, info, card.id)}
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{
                  scale: isTop ? 1 : 1 - stackOffset * 0.04,
                  opacity: 1,
                  y: stackOffset * 10,
                  rotate: isTop ? 0 : tilt,
                  zIndex: index,
                }}
                exit={{
                  x: leaveX,
                  y: leaveY,
                  opacity: 0,
                  rotate: leaveX > 0 ? 30 : -30,
                  transition: { duration: 0.35 },
                }}
                whileDrag={{ scale: 1.04, rotate: 2, cursor: "grabbing", zIndex: 99 }}
                className={`absolute inset-0 bg-white p-3 pb-14 shadow-2xl rounded-sm select-none ${
                  isTop ? "cursor-grab" : "pointer-events-none"
                }`}
              >
                <div className="w-full h-full overflow-hidden bg-neutral-100">
                  <img
                    src={card.src}
                    alt="Memory"
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center px-2">
                  <span className="font-cursive italic text-xl text-neutral-500">
                    {card.caption}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
