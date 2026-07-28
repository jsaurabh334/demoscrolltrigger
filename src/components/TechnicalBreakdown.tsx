"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SceneLighting from "./SceneLighting";
import AbstractKeyboard from "./models/AbstractKeyboard";
import LazyCanvas from "./LazyCanvas";

export default function TechnicalBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".callout-line",
        { strokeDasharray: 200, strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 1, ease: "power2.out", stagger: 0.1 }
      );
      
      tl.fromTo(
        ".callout-text",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 flex items-center justify-center bg-black overflow-hidden border-y border-white/10 z-20">
      
      {/* Subtle glowing grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center z-10">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-center mb-16 relative z-10 text-white">
          Absolute <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Precision</span>
        </h2>
        
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 w-full h-full z-10">
            <LazyCanvas camera={{ position: [0, 8, 2], fov: 40 }}>
              <SceneLighting />
              <AbstractKeyboard scale={[1, 1, 1]} floatSpeed={1} floatIntensity={0.2} rotation={[0, Math.PI / 4, 0]} />
            </LazyCanvas>
          </div>

          {/* Callout 1 */}
          <div className="absolute top-[30%] left-[10%] md:left-[20%] z-20">
            <svg width="100" height="50" className="absolute top-1/2 left-full -translate-y-1/2 overflow-visible hidden md:block">
              <path d="M 0,25 L 80,25 L 120,50" fill="none" stroke="currentColor" strokeWidth="1" className="text-white callout-line" />
              <circle cx="120" cy="50" r="4" fill="currentColor" className="text-white callout-text opacity-0" />
            </svg>
            <div className="callout-text text-right md:text-left md:-translate-x-full pr-4 md:pr-0">
              <h3 className="text-gray-400 font-mono text-xs mb-1 uppercase tracking-wider font-bold">01. Details</h3>
              <p className="text-white font-black uppercase tracking-wide">Micro-Engineered</p>
            </div>
          </div>

          {/* Callout 2 */}
          <div className="absolute bottom-[25%] left-[5%] md:left-[15%] z-20">
            <svg width="150" height="80" className="absolute top-0 left-full overflow-visible hidden md:block">
              <path d="M 0,0 L 100,0 L 140,-40" fill="none" stroke="currentColor" strokeWidth="1" className="text-white callout-line" />
              <circle cx="140" cy="-40" r="4" fill="currentColor" className="text-white callout-text opacity-0" />
            </svg>
            <div className="callout-text text-right md:text-left md:-translate-x-full pr-4 md:pr-0">
              <h3 className="text-gray-400 font-mono text-xs mb-1 uppercase tracking-wider font-bold">02. Design</h3>
              <p className="text-white font-black uppercase tracking-wide">Flawless Integration</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
