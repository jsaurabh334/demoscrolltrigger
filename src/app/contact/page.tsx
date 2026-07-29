"use client";

import { useState } from "react";
import Magnetic from "@/components/Magnetic";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import MatrixCanvas from "@/components/MatrixCanvas";
import DataCore from "@/components/models/DataCore";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [status, setStatus] = useState("AWAITING_INPUT");

  const handleFocus = () => setStatus("INPUT_ACTIVE");
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setStatus("AWAITING_INPUT");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    setTimeout(() => setStatus("TRANSMISSION_SUCCESS"), 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative z-10 pt-32 md:pt-40 pb-32 overflow-hidden">
      <MatrixCanvas />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
        
        {/* Left Column: Form */}
        <motion.div 
          className="flex-1 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase text-white mb-4 relative inline-block">
              INITIATE <span className="text-[var(--accent)]">LINK</span>
              {/* Subtle glitch overlay */}
              <span className="absolute inset-0 text-[var(--accent)] opacity-50 mix-blend-screen animate-pulse blur-[2px]" aria-hidden="true" style={{ clipPath: 'inset(40% 0 40% 0)' }}>INITIATE LINK</span>
            </h1>
            <p className="font-mono text-gray-400 tracking-widest uppercase text-sm flex items-center gap-3">
              STATUS: 
              <span className={`
                ${status === "AWAITING_INPUT" ? "text-gray-500 animate-pulse" : ""}
                ${status === "INPUT_ACTIVE" ? "text-[var(--accent)]" : ""}
                ${status === "TRANSMITTING..." ? "text-white animate-bounce" : ""}
                ${status === "TRANSMISSION_SUCCESS" ? "text-green-400" : ""}
                transition-colors duration-300 font-bold
              `}>
                {status}
              </span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            {/* Subtle grid bg inside form */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            {/* Ambient glow based on status */}
            <div className={`absolute -inset-20 opacity-20 blur-3xl rounded-full pointer-events-none transition-colors duration-1000 ${
              status === "INPUT_ACTIVE" ? "bg-[var(--accent)]" : status === "TRANSMITTING..." ? "bg-white" : status === "TRANSMISSION_SUCCESS" ? "bg-green-500" : "bg-transparent"
            }`} />

            <form className="relative z-10 flex flex-col space-y-8" onSubmit={handleSubmit}>
              
              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs tracking-widest uppercase text-gray-300 font-medium">IDENTIFIER [NAME]</label>
                <input 
                  type="text" 
                  required
                  className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none py-3 text-xl font-display transition-colors duration-300 placeholder:text-white/10 text-white"
                  placeholder="GUEST_USER"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs tracking-widest uppercase text-gray-300 font-medium">COMM CHANNEL [EMAIL]</label>
                <input 
                  type="email" 
                  required
                  className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none py-3 text-xl font-display transition-colors duration-300 placeholder:text-white/10 text-white"
                  placeholder="SIGNAL@DOMAIN.COM"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-mono text-xs tracking-widest uppercase text-gray-300 font-medium">PAYLOAD [MESSAGE]</label>
                <textarea 
                  required
                  rows={4}
                  className="bg-transparent border-b border-white/20 focus:border-[var(--accent)] outline-none py-3 text-xl font-display transition-colors duration-300 placeholder:text-white/10 resize-none text-white"
                  placeholder="ENTER SECURE TRANSMISSION..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="pt-8 flex justify-end">
                <Magnetic>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    type="submit"
                    className="bg-black text-[var(--accent)] flex items-center space-x-2 uppercase tracking-widest text-sm font-bold px-12 py-4"
                  >
                    <span>{status === "TRANSMITTING..." ? "TRANSMITTING..." : status === "TRANSMISSION_SUCCESS" ? "SUCCESS" : "EXECUTE_SEND"}</span>
                  </HoverBorderGradient>
                </Magnetic>
              </div>

            </form>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Data Core */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[500px] h-[400px] lg:h-[600px] relative pointer-events-none"
        >
          {/* Decorative frame */}
          <div className="absolute inset-0 border border-white/10 rounded-full opacity-20 scale-90" />
          <div className="absolute inset-0 border border-dashed border-[var(--accent)] rounded-full opacity-10 animate-[spin_60s_linear_infinite]" />
          
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <DataCore status={status} />
          </Canvas>
          
          {/* Status overlay on 3D */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase mb-2">Core Temp</div>
            <div className="font-display font-light text-2xl">
              {status === "INPUT_ACTIVE" ? "84.2°C" : status === "TRANSMITTING..." ? "MAX°C" : "32.4°C"}
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
