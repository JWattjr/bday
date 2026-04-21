import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../siteConfig";
import { X } from "lucide-react";
import { TiltCard } from "./TiltCard";

export const LoveLetters = () => {
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Notes for You</h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-16">
        {config.loveLetters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
          <TiltCard intensity={10}>
            <div 
              onClick={() => setActiveLetter(index)}
              className="relative w-48 h-32 bg-white/10 backdrop-blur-md rounded-md cursor-pointer group shadow-xl"
            >
              {/* Envelope Flap (Stylized) */}
              <div className="absolute top-0 left-0 w-full h-0 border-l-[96px] border-l-transparent border-r-[96px] border-r-transparent border-t-[60px] border-t-white/10 z-10"></div>
              
              {/* Wax Seal */}
              <motion.div 
                animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="absolute top-[45px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold shadow-[0_0_15px_rgba(212,168,83,0.6)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform"
              >
                <span className="text-midnight font-serif text-xs">♥</span>
              </motion.div>
            </div>
          </TiltCard>
            <span className="mt-4 font-cursive italic text-champagne/80 text-lg">{letter.label}</span>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {activeLetter !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLetter(null)}
              className="absolute inset-0 bg-midnight/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#faf6f0] text-deep-plum p-8 md:p-12 shadow-2xl z-10"
              style={{ backgroundImage: 'radial-gradient(#e5ddd0 1px, transparent 1px)', backgroundSize: '20px 20px' }} // Subtle dot texture
            >
              <button 
                onClick={() => setActiveLetter(null)}
                className="absolute top-4 right-4 text-deep-plum/50 hover:text-deep-plum transition-colors"
                aria-label="Close letter"
              >
                <X size={24} />
              </button>
              
              <div className="prose prose-lg max-w-none text-center">
                {/* @ts-ignore -- photo is optional but we check for it */}
                {config.loveLetters[activeLetter].photo && (
                  <div className="w-full max-w-sm mx-auto aspect-[3/4] mb-8 rounded-xl overflow-hidden shadow-lg border border-white/20">
                    <img 
                      //@ts-ignore
                      src={config.loveLetters[activeLetter].photo} 
                      alt="Letter attachment" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <p className="font-cursive text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
                  {config.loveLetters[activeLetter].content}
                </p>
                <div className="mt-8 text-right font-cursive text-xl text-deep-plum/80">
                  Yours,<br/>
                  <span className="font-serif text-deep-plum">- {config.name.split(' ')[0]}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
