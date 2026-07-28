"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function ParallaxImage({ src, alt, speed = 0.5 }: { src: string; alt: string; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover scale-[1.3] origin-top"
      />
    </div>
  );
}
