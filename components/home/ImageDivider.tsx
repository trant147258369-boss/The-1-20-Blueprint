"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageDividerProps {
  src: string;
  alt: string;
}

export function ImageDivider({ src, alt }: ImageDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref} className="relative w-full bg-[#040e1c] overflow-hidden" style={{ height: "200px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        {/* No text sits on these strips — they're meant to be seen, so a slow ken-burns drift keeps them alive */}
        <motion.img
          src={src}
          alt={alt}
          style={{ y, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, display: "block", willChange: "transform" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#040e1c] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#040e1c] to-transparent pointer-events-none" />
    </div>
  );
}

export default ImageDivider;
