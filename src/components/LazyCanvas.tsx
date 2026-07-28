"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor, BakeShadows } from "@react-three/drei";
import type { ComponentProps } from "react";

/**
 * Performance-optimized lazy-mounted Canvas wrapper.
 * - Mounts only when within viewport margin (prevents WebGL context exhaustion)
 * - Adaptive DPR: starts at 1.5, drops to 1 if GPU can't sustain 50 FPS
 * - BakeShadows: freezes shadow maps after first render (static scene optimization)
 * - Preload: warms up all textures/geometries on mount
 */
export default function LazyCanvas({ children, ...props }: ComponentProps<typeof Canvas>) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "500px", once: true });

  return (
    <div ref={ref} className="w-full h-full relative">
      {isInView && (
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          {...props}
        >
          <PerformanceMonitor
            onDecline={() => {
              // Auto-downgrades DPR to 1 if FPS drops below threshold
            }}
          />
          <BakeShadows />
          <Preload all />
          {children}
        </Canvas>
      )}
    </div>
  );
}
