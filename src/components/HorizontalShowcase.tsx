"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import SceneLighting from "./SceneLighting";
import AbstractKeyboard from "./models/AbstractKeyboard";
import LazyCanvas from "./LazyCanvas";

const cards = [
  {
    number: "01",
    title: "VISION",
    description: "Every frame captured with unparalleled clarity.",
    rotation: [0, 0, 0] as [number, number, number]
  },
  {
    number: "02",
    title: "MOTION",
    description: "Seamless transitions tied to your interaction.",
    rotation: [Math.PI / 4, Math.PI / 6, 0] as [number, number, number]
  },
  {
    number: "03",
    title: "DEPTH",
    description: "Experience the product in true 3D space.",
    rotation: [-Math.PI / 6, -Math.PI / 4, Math.PI / 12] as [number, number, number]
  },
  {
    number: "04",
    title: "MASTERY",
    description: "The ultimate standard in digital presentation.",
    rotation: [0, Math.PI, 0] as [number, number, number]
  }
];

export default function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const totalWidth = wrapper.scrollWidth - window.innerWidth;
      
      gsap.to(wrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      const images = gsap.utils.toArray<HTMLElement>(".showcase-img");
      images.forEach((img) => {
        gsap.to(img, {
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden flex items-center border-b border-white/10 z-20">
      
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase text-white opacity-50">
          Cinematic Showcase
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-[70vh] items-center px-[10vw]">
        {cards.map((card, idx) => (
          <div key={idx} className="flex-shrink-0 w-[90vw] md:w-[60vw] h-full flex flex-col md:flex-row items-center mr-16 md:mr-32 relative group">
            
            {/* Number Background */}
            <div className="absolute -top-10 -left-10 text-[15rem] md:text-[20rem] font-black text-white/5 z-0 font-mono select-none pointer-events-none">
              {card.number}
            </div>

            {/* Aceternity 3D Card */}
            <div className="w-full md:w-3/5 h-1/2 md:h-full relative z-10 flex items-center justify-center">
              <CardContainer className="w-full h-full p-0">
                <CardBody className="w-full h-full relative group/card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full h-full showcase-img relative bg-black/50">
                      <LazyCanvas camera={{ position: [0, 5, 10], fov: 35 }}>
                        <SceneLighting />
                        <AbstractKeyboard scale={[0.8, 0.8, 0.8]} rotation={card.rotation} floatIntensity={1} floatSpeed={1.5} />
                      </LazyCanvas>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col justify-center px-4 md:px-12 z-10">
              <div className="text-gray-500 font-mono text-sm tracking-widest mb-4 font-bold">
                SCENE // {card.number}
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 text-white group-hover:text-gray-300 transition-colors duration-500">
                {card.title}
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
