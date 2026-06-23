"use client";

import { motion, MotionConfig } from "framer-motion";

function RRRow({
  label,
  riskW,
  rewardW,
  reward,
  tone,
}: {
  label: string;
  riskW: string;
  rewardW: string;
  reward: string;
  tone: "muted" | "jade";
}) {
  const rewardColor = tone === "jade" ? "#00e5a8" : "rgba(255,255,255,0.25)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-[#071828]/60 border border-white/[0.08] p-6 md:p-7"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-semibold text-white/70">{label}</span>
        <span className="text-base font-bold" style={{ color: tone === "jade" ? "#33eab8" : "rgba(255,255,255,0.4)" }}>
          {reward}
        </span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="w-16 text-sm uppercase tracking-wide text-white/35">Risk</span>
          <div className="flex-1 h-3 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div className="h-full rounded-full bg-[#EF4444]/70" initial={{ width: 0 }} whileInView={{ width: riskW }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-16 text-sm uppercase tracking-wide text-white/35">Reward</span>
          <div className="flex-1 h-3 rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: rewardColor }} initial={{ width: 0 }} whileInView={{ width: rewardW }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.35 }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Callout() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full bg-[#040e1c] py-[5.5rem] px-4 md:px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">Why most traders bleed</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white leading-[1.05]">
              It&apos;s not your direction.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">It&apos;s your risk-to-reward.</span>
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              You can be right half the time and still lose — if every win is small and every loss is big. The 1:20 framework flips the math: tiny, defined risk hunting outsized, asymmetric targets.
            </p>
          </motion.div>

          <div className="grid gap-5 max-w-3xl mx-auto">
            <RRRow label="Typical trade" riskW="48%" rewardW="44%" reward="≈ 1R" tone="muted" />
            <RRRow label="A 1:20 setup" riskW="6%" rewardW="100%" reward="target up to 20R" tone="jade" />
          </div>
          <p className="text-center text-sm text-white/30 mt-8 max-w-xl mx-auto">
            R = risk-to-reward ratio, a target — not a profit promise. Not every trade reaches target; trading carries substantial risk.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Callout;
