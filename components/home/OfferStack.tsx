"use client";

import { motion, MotionConfig } from "framer-motion";
import { Check, ShieldCheck, Gift, Zap, Target, Clock } from "lucide-react";

interface StackItem {
  name: string;
  value: string;
  bonus?: boolean;
}

const stack: StackItem[] = [
  { name: "All 5 core setups (S-01 → S-05) — exact entry models", value: "$4,000" },
  { name: "The 1:20 Signal Indicator", value: "$1,500" },
  { name: "Backtest vault (every setup, proven on chart)", value: "$1,000" },
  { name: "Private trading floor (your room of operators)", value: "$1,200" },
  { name: "Live trade reviews (your charts, real feedback)", value: "$1,800" },
  { name: "BONUS: 2 free foundation lessons", value: "$200", bonus: true },
  { name: "BONUS: 1:20 Risk Calculator", value: "$100", bonus: true },
];

const levers = [
  { icon: "target", title: "The dream outcome", body: "Stop grinding 1:1 trades. Hunt the asymmetric 1:20 — small defined risk, outsized targets." },
  { icon: "zap", title: "Why it's believable", body: "Every setup is backtested and shown on real charts. You see the model before you ever risk a cent." },
  { icon: "clock", title: "Speed & simplicity", body: "Five repeatable models, not 50 indicators. Plug in, mark up, execute — no screen-staring all day." },
];

export function OfferStack() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5a8]/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">The complete system</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-[-0.02em] text-white leading-[0.95]">
              Everything you get
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">inside The Method.</span>
            </h2>
          </motion.div>

          {/* Value equation levers */}
          <div className="grid gap-4 md:grid-cols-3 mb-14">
            {levers.map((l, i) => (
              <motion.div key={l.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.1 }} className="rounded-2xl bg-[#071828]/60 border border-white/[0.08] p-6">
                <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#00e5a8]/[0.12] text-[#00e5a8] mb-4">
                  {l.icon === "target" ? <Target className="h-5 w-5" /> : l.icon === "zap" ? <Zap className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{l.title}</h3>
                <p className="text-sm text-white/50 leading-snug">{l.body}</p>
              </motion.div>
            ))}
          </div>

          {/* The stack */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }} className="rounded-3xl border border-[#00e5a8]/25 bg-[#071828]/70 p-7 md:p-10 shadow-[0_0_60px_-20px_rgba(0,229,168,0.35)]">
            <ul className="flex flex-col divide-y divide-white/[0.06]">
              {stack.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-start gap-3">
                    {s.bonus ? <Gift className="h-5 w-5 shrink-0 mt-0.5 text-[#f5a623]" /> : <Check className="h-5 w-5 shrink-0 mt-0.5 text-[#00e5a8]" />}
                    <span className={"text-sm md:text-base " + (s.bonus ? "text-[#f5a623]/90 font-medium" : "text-white/80")}>{s.name}</span>
                  </span>
                  <span className="text-sm md:text-base text-white/35 line-through tabular-nums shrink-0">{s.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-6 border-t border-white/[0.10] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-white/45">Total real value</p>
                <p className="text-2xl md:text-3xl font-black text-white/40 line-through tabular-nums">$9,800</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-[#33eab8] uppercase tracking-wide">Yours today</p>
                <p className="text-4xl md:text-5xl font-black text-white tabular-nums">$5,999</p>
              </div>
            </div>

            <motion.a href="#pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} animate={{ boxShadow: ["0 8px 30px 0 rgba(245,166,35,0.25)", "0 10px 44px 0 rgba(245,166,35,0.5)", "0 8px 30px 0 rgba(245,166,35,0.25)"] }} transition={{ boxShadow: { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, scale: { type: "spring", stiffness: 400, damping: 17 } }} className="mt-7 w-full inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#f5a623] text-[#040e1c] font-bold text-base md:text-lg">
              Lock in The Method — $5,999
            </motion.a>
          </motion.div>

          {/* Risk reversal / guarantee — EDIT to your REAL terms before publishing */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-8 flex items-start gap-4 rounded-2xl border border-[#00e5a8]/20 bg-[#071828]/50 p-6">
            <ShieldCheck className="h-7 w-7 shrink-0 text-[#00e5a8]" />
            <div>
              <p className="text-base font-bold text-white mb-1">The &ldquo;See It First&rdquo; guarantee</p>
              <p className="text-sm text-white/55 leading-relaxed">
                Go through the first two setup modules. If the framework isn&apos;t clearer and more actionable than anything you&apos;ve paid for, email within 14 days and we&apos;ll refund you in full. You keep the foundation lessons. The only risk is staying where you are.
              </p>
            </div>
          </motion.div>
          <p className="text-center text-xs text-white/25 mt-5 max-w-xl mx-auto">
            Values shown are estimated standalone value, not a statement of earnings. Trading carries substantial risk; results are not typical.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default OfferStack;
