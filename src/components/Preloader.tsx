"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      start += step;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400); // Small pause at 100%
      } else {
        setProgress(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-auto"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Tech lines */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              className="text-[var(--accent)] text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress}<span className="text-[10vw] md:text-[8vw] text-white/50">%</span>
            </motion.div>
            
            <div className="mt-8 flex items-center space-x-4">
              <div className="text-white/50 font-mono text-xs uppercase tracking-[0.3em]">
                Initializing Aura
              </div>
              <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[var(--accent)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
