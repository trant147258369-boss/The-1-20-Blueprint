"use client";

import { motion, MotionConfig } from "framer-motion";
import { Play, Calculator, Lock } from "lucide-react";

const freeItems = [
  { icon: "play", title: "How Smart Money Actually Moves", desc: "The liquidity logic behind every institutional move." },
  { icon: "play", title: "Where Most Traders Get Trapped", desc: "The exact spots retail gets hunted — and how to flip it." },
  { icon: "calc", title: "1:20 Risk Calculator", desc: "Size every trade to your asymmetric target in seconds." },
];

export function Free() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="free" className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">Start free</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white leading-[1.05]">
              Two foundation lessons.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">Zero cost.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {freeItems.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.1 }} whileHover={{ y: -6 }} className="relative flex flex-col rounded-3xl p-7 bg-[#071828]/70 border border-[#00e5a8]/20">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#00e5a8]/[0.12] text-[#00e5a8] mb-5">
                  {f.icon === "calc" ? <Calculator className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </span>
                <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full bg-[#00e5a8]/[0.12] text-[#33eab8] text-xs font-bold mb-3">FREE</span>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#071828]/50 px-6 py-5">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Lock className="h-5 w-5 text-[#f5a623] shrink-0" />
              <p className="text-sm md:text-base text-white/70">
                The free lessons show you the <span className="text-white font-semibold">map</span>. The 5 paid setups give you the <span className="text-[#33eab8] font-semibold">entries</span>.
              </p>
            </div>
            <motion.a href="#pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="shrink-0 inline-flex items-center px-5 py-3 rounded-xl bg-[#f5a623] text-[#040e1c] font-bold text-sm">
              Unlock the 5 setups
            </motion.a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Free;
