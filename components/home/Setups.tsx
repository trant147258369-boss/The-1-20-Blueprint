"use client";

import { motion, MotionConfig } from "framer-motion";
import { Lock } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

interface Setup {
  code: string;
  name: string;
  type: string;
  badge: string;
  color: string;
  wide?: boolean;
  crown?: boolean;
}

const setups: Setup[] = [
  { code: "S-01", name: "The Phantom Sweep", type: "Liquidity Sweep Reversal", badge: "Highest Frequency", color: "#00e5a8" },
  { code: "S-02", name: "The Dark Pool Block", type: "Institutional Order Block", badge: "Most Reliable", color: "#a78bfa" },
  { code: "S-03", name: "The Structure Assassin", type: "Break of Structure Entry", badge: "Trend Rider", color: "#f5a623" },
  { code: "S-04", name: "The Void Collapse", type: "Fair Value Gap Fill", badge: "Surgical Entry", color: "#EF4444" },
  { code: "S-05", name: "The Sovereign Close", type: "Premium / Discount Zone Reversal", badge: "Crown Jewel · 1:20 Core", color: "#00e5a8", wide: true, crown: true },
];

export function Setups() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="setups" className="relative w-full bg-[#040e1c] py-[5.5rem] px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5a8]/[0.03] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-16"
          >
            <Eyebrow>The core arsenal</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white leading-[0.95]">
              Five setups.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">One asymmetric edge.</span>
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/45 max-w-2xl mx-auto">
              Each setup is a precise, repeatable entry model. All five unlock inside the member dashboard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {setups.map((s, i) => (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className={
                  "group relative flex flex-col rounded-3xl p-7 bg-[#071828]/70 border overflow-hidden " +
                  (s.wide ? "lg:col-span-2 " : "") +
                  (s.crown ? "border-[#00e5a8]/35" : "border-white/[0.08]")
                }
              >
                {/* accent glow per setup */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 transition-opacity group-hover:opacity-40"
                  style={{ background: s.color }}
                />
                {/* top accent bar */}
                <div className="absolute top-0 left-0 h-1 w-full" style={{ background: s.color, opacity: 0.85 }} />

                <div className="relative flex items-center justify-between mb-5">
                  <span
                    className="text-base font-black tracking-widest tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.code}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.10] text-sm font-semibold uppercase tracking-wide text-white/55">
                    <Lock className="h-3 w-3" /> Paid
                  </span>
                </div>

                <h3 className="relative text-2xl md:text-3xl font-bold text-white mb-1.5">{s.name}</h3>
                <p className="relative text-base text-white/45 mb-5">{s.type}</p>

                <span
                  className="relative inline-flex self-start items-center px-3 py-1 rounded-full text-sm font-semibold mt-auto"
                  style={{ color: s.color, backgroundColor: `${s.color}1a`, border: `1px solid ${s.color}40` }}
                >
                  {s.crown ? "👑 " : ""}{s.badge}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Setups;
