"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Spotlight } from "./ui/spotlight";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const beyondRef = useRef<HTMLHeadingElement>(null);
  const ordinaryRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // 1. Entrance Timeline
      const tl = gsap.timeline({ 
      defaults: { ease: "expo.out", duration: 1.2 },
      delay: 0.1 // Preloader bypassed, start almost immediately
    });

      tl.fromTo(containerRef.current, { backgroundColor: "#000" }, { backgroundColor: "transparent", duration: 0.15 }, 0.0)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
        .fromTo(beyondRef.current, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.3)
        .fromTo(ordinaryRef.current, { opacity: 0, y: -50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.65)
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.0);

      // 2. Looping Scroll Arrow Animation
      gsap.fromTo(
        scrollArrowRef.current,
        { opacity: 0.4, y: 0 },
        { opacity: 1, y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" }
      );

      // 3. ScrollTrigger to fade out elements when scrolling
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500", // Fades out as the keyboard sequence begins
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="absolute top-0 left-0 w-full h-screen pointer-events-none z-30">
      
      {/* Background layer (z-0, sits safely BEHIND the 3D keyboard canvas) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center pt-[15vh]">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Subtle radial atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-[-1]" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(216,216,63,0.06), transparent 45%), #030303' }} />
        
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-6 uppercase tracking-[0.4em] text-[10px] md:text-xs text-[var(--accent)] font-bold">
          Aura Vision
        </div>
        
        {/* BEYOND (Behind Keyboard) */}
        <h1 ref={beyondRef} className="text-[clamp(5rem,10vw,12rem)] font-display font-black tracking-tighter uppercase text-white leading-none drop-shadow-2xl opacity-0">
          Beyond
        </h1>
      </div>
      
      {/* Foreground layer (z-20, sits safely IN FRONT of the 3D keyboard canvas) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[10vh]">
        
        {/* ORDINARY (In front of Keyboard) */}
        <h1 ref={ordinaryRef} className="text-[clamp(5rem,10vw,12rem)] font-display font-black tracking-tighter uppercase text-white leading-none drop-shadow-2xl opacity-0">
          Ordinary
        </h1>
        
        {/* Subtitle */}
        <p ref={subtitleRef} className="mt-8 px-4 text-center text-[rgba(255,255,255,0.65)] font-light max-w-[550px] leading-[1.6] opacity-0 text-sm md:text-base">
          ENGINEERED FOR THE EXTRAORDINARY. Immerse yourself in the next generation of digital experiences.
        </p>
        
        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="mt-12 flex flex-col items-center opacity-0">
          <div ref={scrollArrowRef} className="text-white text-lg font-light mb-2">↓</div>
          <span className="text-[10px] uppercase tracking-widest text-[rgba(255,255,255,0.6)] font-mono">
            Scroll to Explore
          </span>
        </div>
      </div>

    </section>
  );
}
