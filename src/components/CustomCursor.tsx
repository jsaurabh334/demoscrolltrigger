"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash on mobile

  useEffect(() => {
    // Check if it's a touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use GSAP quickTo for highly performant tracking
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" || 
        target.tagName.toLowerCase() === "a" || 
        target.closest("button") || 
        target.closest("a") || 
        target.classList.contains("magnetic-target")
      ) {
        gsap.to(follower, {
          scale: 1.8,
          borderColor: "var(--accent)",
          backgroundColor: "rgba(216, 216, 63, 0.05)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const onMouseOut = () => {
      gsap.to(follower, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    document.body.style.cursor = 'none';
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("resize", checkTouch);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Tiny center dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      {/* Thin circular outline */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border-[1px] border-white/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors hidden md:block flex items-center justify-center backdrop-blur-[2px]"
      >
        <span ref={labelRef} className="opacity-0 text-[8px] font-bold tracking-widest text-accent uppercase absolute"></span>
      </div>
    </>
  );
}
