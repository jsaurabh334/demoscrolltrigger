"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import Magnetic from "./Magnetic";
import SceneLighting from "./SceneLighting";
import AbstractKeyboard from "./models/AbstractKeyboard";
import LazyCanvas from "./LazyCanvas";

export default function FinalReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageRef.current,
        { 
          y: 100, 
          scale: 0.9,
          opacity: 0,
          filter: "blur(20px)"
        },
        { 
          y: 0, 
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "power3.out" 
        }
      );

      tl.fromTo(
        textRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pb-32 z-20">
      
      {/* Sparkles Background Removed */}

      {/* Cinematic Glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Video Final Frame */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32 flex flex-col items-center border-t border-white/10">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10">
          <div ref={imageRef} className="absolute inset-0 w-full h-full z-10">
            <LazyCanvas camera={{ position: [0, 2, 6], fov: 40 }}>
              <SceneLighting />
              <AbstractKeyboard scale={[0.8, 0.8, 0.8]} rotation={[0, -Math.PI / 8, 0]} floatSpeed={1} floatIntensity={0.2} />
            </LazyCanvas>
          </div>
        </div>
      </div>

      {/* Text & CTAs */}
      <div ref={textRef} className="relative z-20 text-center px-4 flex flex-col items-center mt-8">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-6 text-white drop-shadow-lg">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-white">Pinnacle</span>
        </h2>
        <p className="text-gray-400 font-light text-xl md:text-2xl max-w-3xl mx-auto mb-12">
          Experience the uncompromising vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Magnetic>
            <button className="px-12 py-5 bg-transparent border border-[var(--accent)]/50 text-white font-semibold rounded-full hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-colors duration-300 uppercase tracking-widest text-sm backdrop-blur-md">
              Watch Full Film
            </button>
          </Magnetic>
          <Magnetic>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2 uppercase tracking-widest text-sm font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span>Pre-Order Now</span>
            </HoverBorderGradient>
          </Magnetic>
        </div>
      </div>
      
    </section>
  );
}
