"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";
import SceneLighting from "./SceneLighting";
import * as THREE from "three";
import FeatureOverlay from "./FeatureOverlay";
import AbstractKeyboard from "./models/AbstractKeyboard";
import LazyCanvas from "./LazyCanvas";

gsap.registerPlugin(ScrollTrigger);



// Camera controller connected to ScrollTrigger
function ScrollCameraController({ containerRef, innerRef }: { containerRef: React.RefObject<HTMLDivElement | null>, innerRef: React.RefObject<HTMLDivElement | null> }) {
  const { camera } = useThree();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial camera position
    camera.position.set(0, 10, 5);
    camera.lookAt(0, 0, 0);

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.1,
          pin: innerRef.current,
          pinSpacing: false,
        },
      });

      // Fly around the keyboard
      tlRef.current
        .to(camera.position, {
          z: 2,
          y: 2,
          x: 4,
          ease: "power2.inOut",
        })
        .to(camera.position, {
          x: -4,
          z: 1,
          y: 1,
          ease: "power2.inOut",
        })
        .to(camera.position, {
          x: 0,
          y: 8,
          z: 0.1,
          ease: "power2.inOut",
        });

      // Recalculate ScrollTrigger positions for all sections below this one
      // since this pin was added asynchronously after the 100ms delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);

    }, [containerRef, innerRef]);

    return () => ctx.revert();
  }, [camera, containerRef]);

  // Force camera to keep looking at center during animation
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function KeyboardSequence3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Slight delay to prevent massive lag spike on mount
    setTimeout(() => setIsReady(true), 100);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black w-full z-10">
      <div ref={innerRef} className="relative h-screen w-full overflow-hidden sticky top-0">
        {/* 3D Scene */}
        <div className="absolute inset-0 w-full h-full z-0">
          {isReady && (
            <LazyCanvas gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
              <SceneLighting />
              
              <AbstractKeyboard />
              <ScrollCameraController containerRef={containerRef} innerRef={innerRef} />
            </LazyCanvas>
          )}
        </div>

        {/* Foreground UI overlays */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          <FeatureOverlay sequenceRef={containerRef} />
        </div>
      </div>
    </section>
  );
}
