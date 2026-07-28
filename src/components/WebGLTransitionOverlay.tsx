"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * CSS-based page transition overlay.
 * Replaces the previous R3F Canvas-based approach to eliminate
 * a permanent WebGL context from the global layout.
 */
export default function WebGLTransitionOverlay() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      setIsTransitioning(true);
      setPhase("in");

      // Phase 1: Cover screen
      const inTimer = setTimeout(() => {
        setPhase("out");

        // Phase 2: Reveal screen
        const outTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 600);

        return () => clearTimeout(outTimer);
      }, 500);

      return () => clearTimeout(inTimer);
    }
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #000000 0%, #0a0a0a 40%, #d8d83f 100%)",
          opacity: phase === "in" ? 1 : 0,
          transition: phase === "in" ? "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
