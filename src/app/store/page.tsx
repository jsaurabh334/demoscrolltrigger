"use client";

import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import SceneLighting from "@/components/SceneLighting";
import AbstractKeyboard from "@/components/models/AbstractKeyboard";
import LazyCanvas from "@/components/LazyCanvas";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const products = [
  { id: 1, name: "AURA CORE // OBSIDIAN", price: "$249", chassis: "#050505", accent: "#ffffff" },
  { id: 2, name: "AURA CORE // TITANIUM", price: "$279", chassis: "#aaaaaa", accent: "#00ffff" },
  { id: 3, name: "AURA CORE // CYBER", price: "$299", chassis: "#111111", accent: "#d8d83f" },
];

export default function StorePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white relative z-10 pt-40 pb-32 overflow-x-hidden">
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-8 border-b border-white/10">
                <h2 className="font-display font-black text-2xl uppercase tracking-tighter">TERMINAL // CART</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-white transition-colors font-mono text-sm uppercase">Close [X]</button>
              </div>
              <div className="flex-1 p-8 flex items-center justify-center text-center">
                <p className="font-mono text-gray-500 uppercase tracking-widest text-sm">
                  Cart is currently empty.
                  <br /><br />
                  Awaiting payload transmission...
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase text-[var(--accent)]">
            THE STORE
          </h1>
          <p className="text-sm font-mono tracking-widest text-gray-500 uppercase pb-2">
            Pre-order Phase 1
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col cursor-pointer perspective-1000">
              <TiltCard className="relative w-full aspect-square bg-white/5 rounded-2xl overflow-hidden mb-6 border border-white/5 group-hover:border-[var(--accent)]/50 transition-colors duration-500">
                <div className="absolute inset-0 w-full h-full scale-110 group-hover:scale-100 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" style={{ transform: "translateZ(30px)" }}>
                    <LazyCanvas camera={{ position: [0, 8, 4], fov: 40 }}>
                      <SceneLighting />
                      <AbstractKeyboard 
                        scale={[0.8, 0.8, 0.8]} 
                        rotation={[0, Math.PI / 4, 0]} 
                        chassisColor={product.chassis} 
                        accentColor={product.accent} 
                      />
                    </LazyCanvas>
                </div>
                {/* Hover overlay badge */}
                <div 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm"
                  style={{ transform: "translateZ(60px)" }}
                  onClick={() => setCartOpen(true)}
                >
                  <Magnetic>
                    <div className="px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-[0_0_30px_rgba(216,216,63,0.4)] scale-90 group-hover:scale-100 transition-transform duration-500">
                      Pre-Order
                    </div>
                  </Magnetic>
                </div>
              </TiltCard>
              
              <div className="flex justify-between items-start px-2">
                <h3 className="font-display font-bold text-lg tracking-tight uppercase group-hover:text-[var(--accent)] transition-colors">
                  {product.name}
                </h3>
                <span className="font-mono text-gray-400 text-sm">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
