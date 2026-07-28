"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Fade in the progress bar after the hero section
      gsap.fromTo(containerRef.current, 
        { opacity: 0, x: 20 }, 
        { 
          opacity: 1, 
          x: 0, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: "body",
            start: "top -100px",
            end: "top -300px",
            scrub: true,
          }
        }
      );

      // Animate the progress bar height based on total scroll
      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-1/2 right-6 md:right-12 -translate-y-1/2 h-[40vh] w-1 z-[9997] hidden md:flex flex-col items-center justify-between pointer-events-none"
    >
      <div className="text-[10px] text-gray-500 font-mono rotate-90 -translate-y-12">BEGIN</div>
      
      {/* Background track */}
      <div className="w-[1px] h-full bg-white/10 relative">
        {/* Progress fill */}
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-white origin-top shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ height: "0%" }}
        />
      </div>

      <div className="text-[10px] text-gray-500 font-mono rotate-90 translate-y-10">END</div>
    </div>
  );
}
