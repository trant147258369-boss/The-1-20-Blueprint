"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

type Size = "lg" | "md" | "sm";

interface PrimaryCTAProps {
  children: ReactNode;
  href?: string;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  lg: "px-11 py-5 text-xl md:text-2xl gap-2.5",
  md: "px-10 py-5 text-lg md:text-xl gap-2.5",
  sm: "px-8 py-4 text-base md:text-lg gap-2",
};

const arrowSize: Record<Size, string> = {
  lg: "h-5 w-5",
  md: "h-5 w-5",
  sm: "h-4 w-4",
};

// Single box-shadow string per frame: outer amber glow + inset top highlight
// (light catching the top edge) + inset bottom shadow (gives it depth/curvature).
// All three live in ONE box-shadow value because Framer Motion writes directly
// to the inline style — a separate Tailwind `ring`/`shadow` class would just
// get clobbered by the animated inline style instead of compositing with it.
const REST_SHADOW = "0 14px 40px -8px rgba(245,166,35,0.35), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 5px rgba(0,0,0,0.22)";
const PEAK_SHADOW = "0 20px 60px -10px rgba(245,166,35,0.55), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 5px rgba(0,0,0,0.22)";
const HOVER_SHADOW = "0 24px 70px -8px rgba(245,166,35,0.75), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 5px rgba(0,0,0,0.22)";

export function PrimaryCTA({
  children,
  href = "https://t.me/ThomasLauren1",
  size = "md",
  fullWidth = false,
  className,
}: PrimaryCTAProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.03, boxShadow: HOVER_SHADOW },
      }}
      animate={{ boxShadow: [REST_SHADOW, PEAK_SHADOW, REST_SHADOW] }}
      transition={{
        boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 380, damping: 18 },
      }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl font-black tracking-wide text-[#040e1c] overflow-hidden",
        "bg-gradient-to-br from-[#ffdb8a] via-[#f5a623] to-[#c2780f]",
        "border border-[#fff6e0]/25",
        sizeClasses[size],
        fullWidth ? "w-full" : "w-full sm:w-auto",
        className
      )}
    >
      {/* Slow diagonal shimmer, ~4.5s cycle (1.3s sweep + 3.2s rest) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
        initial={{ x: "-150%" }}
        animate={{ x: ["-150%", "350%"] }}
        transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        <motion.span variants={{ rest: { x: 0 }, hover: { x: 6 } }} className="inline-flex">
          <ArrowRight className={arrowSize[size]} />
        </motion.span>
      </span>
    </motion.a>
  );
}

export default PrimaryCTA;
