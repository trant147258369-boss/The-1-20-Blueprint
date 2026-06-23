"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import { useRef } from "react";
import { Eyebrow } from "./Eyebrow";

export function FinancialBg() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        {/* Atmospheric dark financial background image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1920&q=80&auto=format&fit=crop"
            alt="Financial data and trading charts"
            style={{ y: bgY, width: "100%", height: "120%", objectFit: "cover", opacity: 0.2, display: "block", willChange: "transform" }}
          />
        </motion.div>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040e1c] via-[#040e1c]/55 to-[#040e1c] pointer-events-none -z-10" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <Eyebrow icon={Award}>Institutional Grade</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white leading-tight mb-6">
              Trade like the professionals.
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Our framework is built on the same principles used by institutional traders. Structure. Liquidity. Flow. Edge.
            </p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default FinancialBg;
