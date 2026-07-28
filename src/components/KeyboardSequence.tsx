"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureOverlay from "./FeatureOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 240;
const currentFrame = (index: number) =>
  `/video-frames/frame-${index.toString().padStart(3, "0")}.jpg`;

export default function KeyboardSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all 240 images for flawless scrubbing
  useEffect(() => {
    // 1. Load the first few frames synchronously to unblock initial render
    const INITIAL_FRAMES = 10;
    let initialLoaded = 0;
    
    for (let i = 1; i <= INITIAL_FRAMES; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        initialLoaded++;
        setLoadingProgress(Math.floor((initialLoaded / FRAME_COUNT) * 100));
        if (initialLoaded === INITIAL_FRAMES) {
          setImagesLoaded(true);
          
          // 2. Load the rest asynchronously in the background
          for (let j = INITIAL_FRAMES + 1; j <= FRAME_COUNT; j++) {
            const bgImg = new Image();
            bgImg.src = currentFrame(j);
            bgImg.onload = () => {
              setLoadingProgress(prev => Math.min(Math.floor(prev + (100 / FRAME_COUNT)), 100));
            };
            imagesRef.current[j - 1] = bgImg;
          }
        }
      };
      imagesRef.current[i - 1] = img;
    }
  }, []);

  // GSAP Animation and Canvas Drawing
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Handle responsive sizing
    const renderCanvas = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      context.scale(scale, scale);
      render(sequence.frame);
    };

    const sequence = { frame: 0 };

    const render = (index: number) => {
      const imageIndex = Math.min(Math.max(Math.round(index), 0), FRAME_COUNT - 1);
      const img = imagesRef.current[imageIndex];
      
      if (!img) return;

      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio); // Cover the screen
      
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    window.addEventListener("resize", renderCanvas);
    renderCanvas();

    const ctx = gsap.context(() => {
      // Pin the sequence container and animate the frame
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Huge scroll distance for 240 frames
        pin: true,
        scrub: 0.1, // Near instant scrub for true video feel
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1],
          duration: { min: 0.2, max: 0.8 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        animation: gsap.to(sequence, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          onUpdate: () => render(sequence.frame),
        }),
      });
      
      // CRITICAL FIX FOR OVERLAPPING LAYOUTS:
      // Since we dynamically add +=500% pin spacing AFTER images load, 
      // the components below this (TechnicalBreakdown, HorizontalShowcase) 
      // will have completely wrong trigger markers unless we force a refresh!
      requestAnimationFrame(() => ScrollTrigger.refresh());
      
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", renderCanvas);
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="sequence-container relative h-screen bg-transparent pointer-events-none">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-accent z-50 bg-black">
            <span className="animate-pulse tracking-widest text-sm uppercase mb-4 font-mono">
              Buffering Experience...
            </span>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono mt-2 text-gray-500">{loadingProgress}%</span>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: "100%", 
            height: "100%",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 20px 50px rgba(0,0,0,.7)) drop-shadow(0 0 30px rgba(216,216,63,.15))"
          }}
        />
        
        {imagesLoaded && <FeatureOverlay sequenceRef={containerRef} />}
      </div>
    </section>
  );
}
