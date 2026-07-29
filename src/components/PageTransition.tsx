"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ScrollProgress from "./ScrollProgress";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <ScrollProgress />
      {children}
    </div>
  );
}
