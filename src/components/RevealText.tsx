"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({ text, className }: { text: string; className?: string }) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into words (basic manual split without premium plugins)
    const words = text.split(" ");
    textRef.current.innerHTML = "";
    
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = "0.2";
      span.style.transition = "opacity 0.1s";
      span.className = "reveal-word inline-block mr-[0.25em]";
      textRef.current?.appendChild(span);
    });

    const wordElements = textRef.current.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.to(wordElements, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
        opacity: 1,
        stagger: 0.1,
        ease: "none",
      });
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <h2 ref={textRef} className={className}>
      {text}
    </h2>
  );
}
