import { motion } from "framer-motion";
import { config } from "../siteConfig";

export const MemoryTimeline = () => {
  return (
    <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Story So Far</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto"></div>
      </div>

      <div className="relative space-y-20 md:space-y-28">
        {/* Timeline line — left on mobile, center on desktop */}
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose/50 via-gold/30 to-transparent md:-translate-x-1/2"></div>

        {config.memories.map((memory, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className="relative">
              {/* Timeline marker */}
              <div className="absolute left-[24px] md:left-1/2 w-3 h-3 bg-rose rounded-full shadow-[0_0_15px_rgba(232,160,191,0.8)] -translate-x-[5px] md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10"></div>

              {/* Desktop layout: two-column grid */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                {/* Left column */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  className={isEven ? "pr-8" : "pr-8 order-2"}
                >
                  {isEven ? (
                    <div className="glass-card p-8 text-right">
                      <span className="text-gold font-cursive italic text-lg tracking-wider mb-2 block">{memory.date}</span>
                      <h3 className="text-2xl font-serif text-white mb-3">{memory.title}</h3>
                      <p className="text-blush/80 leading-relaxed font-light">{memory.text}</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-xl glass-card p-2">
                      <img src={memory.photo} alt={memory.title} className="w-full aspect-[4/3] object-cover rounded-lg" />
                    </div>
                  )}
                </motion.div>

                {/* Right column */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15, type: "spring", bounce: 0.3 }}
                  className={isEven ? "pl-8" : "pl-8 order-1"}
                >
                  {isEven ? (
                    <div className="overflow-hidden rounded-xl glass-card p-2">
                      <img src={memory.photo} alt={memory.title} className="w-full aspect-[4/3] object-cover rounded-lg" />
                    </div>
                  ) : (
                    <div className="glass-card p-8 text-left">
                      <span className="text-gold font-cursive italic text-lg tracking-wider mb-2 block">{memory.date}</span>
                      <h3 className="text-2xl font-serif text-white mb-3">{memory.title}</h3>
                      <p className="text-blush/80 leading-relaxed font-light">{memory.text}</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Mobile layout: stacked */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="md:hidden pl-16"
              >
                <div className="glass-card p-6 space-y-4">
                  <span className="text-gold font-cursive italic text-lg tracking-wider block">{memory.date}</span>
                  <h3 className="text-xl font-serif text-white">{memory.title}</h3>
                  <div className="overflow-hidden rounded-lg">
                    <img src={memory.photo} alt={memory.title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <p className="text-blush/80 leading-relaxed font-light text-sm">{memory.text}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
