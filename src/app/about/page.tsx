"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RevealText from "@/components/RevealText";
import SceneLighting from "@/components/SceneLighting";
import AbstractKeyboard from "@/components/models/AbstractKeyboard";
import LazyCanvas from "@/components/LazyCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    "Phase 1: Genesis",
    "Phase 2: Prototyping",
    "Phase 3: Acoustic Tuning",
    "Phase 4: The Final Form"
  ];

  useEffect(() => {
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinType: "transform",
        pinSpacing: false,
      });

      // Highlight active phase based on scroll position of right sections
      const sections = gsap.utils.toArray(".about-section");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections.forEach((section: any, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActivePhase(index);
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-black text-white relative z-10 pt-32 pb-64 overflow-x-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row relative items-start">
        
        {/* Left Pinned Column */}
        <div ref={leftColRef} className="w-full md:w-1/3 h-screen hidden md:flex flex-col justify-center sticky top-0">
          <h1 className="text-6xl font-display font-black tracking-tighter uppercase text-[var(--accent)] mb-12">
            THE STORY
          </h1>
          <div className="flex flex-col space-y-6">
            {phases.map((phase, i) => (
              <div 
                key={i} 
                className={`font-mono text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
                  activePhase === i ? "text-white scale-110 origin-left" : "text-gray-600"
                }`}
              >
                {phase}
              </div>
            ))}
          </div>
        </div>

        {/* Right Scrolling Column */}
        <div ref={rightColRef} className="w-full md:w-2/3 flex flex-col pt-[20vh]">
          
          <div className="about-section min-h-screen flex flex-col justify-center pb-32">
            <h1 className="text-4xl md:hidden font-display font-black tracking-tighter uppercase text-[var(--accent)] mb-8">
              THE STORY
            </h1>
            <RevealText 
              text="We didn't just build a keyboard. We engineered an experience that bridges the physical and digital worlds."
              className="text-4xl md:text-6xl font-display font-black leading-tight tracking-tighter mb-16"
            />
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
              <LazyCanvas camera={{ position: [0, 10, 0], fov: 45 }}>
                <SceneLighting />
                <AbstractKeyboard scale={[0.8, 0.8, 0.8]} rotation={[0, 0, 0]} floatSpeed={1} />
              </LazyCanvas>
            </div>
          </div>

          <div className="about-section min-h-screen flex flex-col justify-center pb-32">
            <RevealText 
              text="AURA is the culmination of three years of obsessive iteration, combining aerospace-grade materials with millimeter-perfect actuation."
              className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-16"
            />
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
              <LazyCanvas camera={{ position: [5, 2, 5], fov: 40 }}>
                <SceneLighting />
                <AbstractKeyboard scale={[1, 1, 1]} rotation={[Math.PI / 8, Math.PI / 4, 0]} floatSpeed={1.5} chassisColor="#222" />
              </LazyCanvas>
            </div>
          </div>

          <div className="about-section min-h-screen flex flex-col justify-center pb-32">
            <RevealText 
              text="The acoustic signature was tuned like a grand piano. We tested over 40 different dampening materials before settling on our proprietary high-density poron composite."
              className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-16"
            />
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
              <LazyCanvas camera={{ position: [0, 5, 5], fov: 35 }}>
                <SceneLighting />
                <AbstractKeyboard scale={[1, 1, 1]} rotation={[-Math.PI / 12, 0, 0]} floatSpeed={0.5} accentColor="#00ffff" />
              </LazyCanvas>
            </div>
          </div>

          <div className="about-section min-h-[70vh] flex flex-col justify-center">
            <RevealText 
              text="Every single switch is lubricated by hand and housed in a unibody aluminum chassis machined to 0.01mm tolerances. This ensures that every keystroke feels exactly the same, whether it's your first or your millionth."
              className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-16"
            />
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
              <LazyCanvas camera={{ position: [0, 2, 8], fov: 30 }}>
                <SceneLighting />
                <AbstractKeyboard scale={[1, 1, 1]} rotation={[0, -Math.PI / 6, 0]} floatSpeed={2} />
              </LazyCanvas>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
