"use client";

import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full h-[60vh] bg-[#050505] text-white flex flex-col justify-end p-8 z-0">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--accent)] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end pb-8 border-b border-white/10 mb-8">
        <h2 className="text-[12vw] md:text-[8vw] font-display font-black leading-none tracking-tighter text-white">
          AURA
        </h2>
        
        <div className="flex flex-col space-y-4 text-right">
          <Magnetic>
            <a href="#" className="text-xl md:text-3xl font-light hover:text-[var(--accent)] transition-colors duration-300">
              hello@aura.design
            </a>
          </Magnetic>
          <div className="flex space-x-6 justify-end text-sm text-gray-500 uppercase tracking-widest font-mono">
            <Magnetic><a href="#" className="hover:text-white transition-colors">Instagram</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-white transition-colors">Twitter</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-white transition-colors">Awwwards</a></Magnetic>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-xs text-gray-600 font-mono uppercase tracking-widest">
        <span>© 2026 AURA TECHNOLOGIES</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
