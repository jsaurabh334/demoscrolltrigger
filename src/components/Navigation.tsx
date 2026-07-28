"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import Magnetic from "./Magnetic";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Entrance animation
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        scrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/5" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="nav-item text-white font-black tracking-[0.2em] text-xl cursor-pointer hover:text-[var(--accent)] transition-colors">
          AURA
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-12 text-xs font-bold tracking-widest text-gray-400">
          {[
            { name: "STORE", path: "/store" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" }
          ].map((item) => (
            <Magnetic key={item.name}>
              <Link 
                href={item.path} 
                className="nav-item hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* MENU */}
        <div className="nav-item text-xs font-bold tracking-widest text-white cursor-pointer flex items-center space-x-2 group">
          <span className="group-hover:text-[var(--accent)] transition-colors">MENU</span>
          <div className="flex flex-col space-y-1">
            <span className="w-4 h-[2px] bg-white group-hover:bg-[var(--accent)] transition-colors"></span>
            <span className="w-4 h-[2px] bg-white group-hover:bg-[var(--accent)] transition-colors"></span>
          </div>
        </div>

      </div>
    </nav>
  );
}
