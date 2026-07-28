"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const features = [
  {
    title: "CINEMATIC VISION",
    description: "Every frame crafted for absolute perfection.",
    position: "top-1/4 left-[10%]",
  },
  {
    title: "FLUID MOTION",
    description: "Tied directly to your interaction.",
    position: "bottom-1/3 right-[10%]",
  },
  {
    title: "UNCOMPROMISED",
    description: "Quality that speaks for itself.",
    position: "top-1/3 right-[15%]",
  },
  {
    title: "MASTERPIECE",
    description: "Experience the ultimate standard.",
    position: "bottom-1/4 left-[15%]",
  },
];

export default function FeatureOverlay({ sequenceRef }: { sequenceRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && sequenceRef.current) {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".feature-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sequenceRef.current,
            start: "top top",
            end: "+=500%",
            scrub: true,
          },
        });

        items.forEach((item, index) => {
          const startTime = index * 0.25;
          const stayTime = startTime + 0.15;

          gsap.set(item, { opacity: 0, y: 30, filter: "blur(10px)" });

          tl.to(
            item,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.1,
            },
            startTime
          )
          .to(
            item,
            {
              opacity: 0,
              y: -30,
              filter: "blur(10px)",
              duration: 0.1,
            },
            stayTime
          );
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isReady, sequenceRef]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`feature-item absolute ${feature.position} max-w-sm p-8 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl`}
        >
          <div className="text-xs text-gray-400 tracking-widest font-mono mb-3 uppercase font-bold">
            0{idx + 1}
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tighter mb-2 uppercase text-[var(--accent)] drop-shadow-md">
            {feature.title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base font-light">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
