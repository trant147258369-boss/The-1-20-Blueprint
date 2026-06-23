"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

interface EyebrowProps {
  children: string;
  icon?: LucideIcon;
  urgent?: boolean;
  className?: string;
}

export function Eyebrow({ children, icon: Icon, urgent = false, className }: EyebrowProps) {
  const lineToColor = urgent ? "to-[#f5a623]/70" : "to-[#00e5a8]/70";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn("flex items-center justify-center gap-3 mb-4", className)}
    >
      <span className={cn("h-px w-6 sm:w-8 bg-gradient-to-r from-transparent", lineToColor)} />
      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] whitespace-nowrap">
        {Icon && <Icon className={cn("h-3.5 w-3.5 shrink-0", urgent ? "text-[#f5a623]" : "text-[#33eab8]")} />}
        {urgent ? (
          <motion.span
            className="text-[#f5a623]"
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {children}
          </motion.span>
        ) : (
          <span className="bg-gradient-to-r from-[#33eab8] to-[#00b386] bg-clip-text text-transparent">
            {children}
          </span>
        )}
      </span>
      <span className={cn("h-px w-6 sm:w-8 bg-gradient-to-l from-transparent", lineToColor)} />
    </motion.div>
  );
}

export default Eyebrow;
