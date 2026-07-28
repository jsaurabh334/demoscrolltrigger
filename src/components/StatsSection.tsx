"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray(".stat-number");
      const labels = gsap.utils.toArray(".stat-label");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the Marquee
      gsap.to(".marquee-container", {
        x: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      tl.fromTo(
        numbers,
        { opacity: 0, y: 100, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" }
      ).fromTo(
        labels,
        { opacity: 0, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.2 },
        "-=1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-[#050505] text-center relative perspective-1000 border-b border-white/10 overflow-hidden z-20">
      
      {/* Subtle glowing grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Infinite Parallax Marquee to fill empty black space */}
      <div className="marquee-container absolute top-1/2 -translate-y-1/2 left-0 w-full flex whitespace-nowrap opacity-5 pointer-events-none -rotate-2 select-none z-0">
        <h2 className="text-[15rem] md:text-[25rem] font-display font-black uppercase tracking-tighter text-white mr-8">
          ENGINEERED FOR PERFECTION // UNCOMPROMISING VISION // 
        </h2>
        <h2 className="text-[15rem] md:text-[25rem] font-display font-black uppercase tracking-tighter text-white">
          ENGINEERED FOR PERFECTION // UNCOMPROMISING VISION //
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
        
        <div className="flex flex-col items-center justify-center">
          <h3 className="stat-number font-mono text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 transform-gpu">
            100<span className="text-gray-500 text-5xl md:text-7xl">%</span>
          </h3>
          <p className="stat-label text-gray-500 font-bold tracking-widest uppercase">Perfection</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="stat-number font-mono text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 transform-gpu">
            24<span className="text-gray-500 text-5xl md:text-7xl">FPS</span>
          </h3>
          <p className="stat-label text-gray-500 font-bold tracking-widest uppercase">Cinematic Render</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h3 className="stat-number font-mono text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 transform-gpu">
            240<span className="text-gray-500 text-5xl md:text-7xl">F</span>
          </h3>
          <p className="stat-label text-gray-500 font-bold tracking-widest uppercase text-sm max-w-[200px]">Frames of Control</p>
        </div>

      </div>
    </section>
  );
}
