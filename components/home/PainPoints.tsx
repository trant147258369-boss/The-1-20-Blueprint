"use client";

import { motion, MotionConfig } from "framer-motion";
import { Eyebrow } from "./Eyebrow";

const points = [
  "Waking up to a trade idea, then watching the market move before you can commit because the edge wasn’t clear.",
  "Feeling like every setup is guesswork once the chart starts to wobble — and then you doubt the plan.",
  "Getting trapped in noise, chasing the next signal, and missing the calm, structured trade opportunity beneath it.",
];

export function PainPoints() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full bg-[#020814] py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,229,168,0.12),transparent_25%),radial-gradient(circle_at_100%_30%,rgba(245,166,35,0.08),transparent_22%)] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeInOut", staggerChildren: 0.14 }}
            className="text-center mb-14"
          >
            <Eyebrow>Sound familiar?</Eyebrow>
            <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.02em] text-white leading-[1.05]">
              If you’re trading by feel, you’re probably carrying more noise than conviction.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.15 }} className="mt-5 text-lg md:text-xl text-white/55 max-w-3xl mx-auto leading-relaxed">
              The difference between a premium trader and an overwhelmed one is not more indicators — it’s a plan that feels dependable even when the market moves.
            </motion.p>
          </motion.div>

          <ul className="grid gap-4">
            {points.map((point, index) => (
              <motion.li key={point} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.18 + index * 0.08 }} className="rounded-3xl border border-white/[0.08] bg-[#071828]/70 p-6 md:p-8 shadow-[0_20px_80px_-60px_rgba(0,229,168,0.35)]">
                <p className="text-base md:text-lg text-white/75 leading-relaxed">
                  {point}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}

export default PainPoints;
