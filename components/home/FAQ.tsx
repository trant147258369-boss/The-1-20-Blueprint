"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs: Array<{ q: string; a: string }> = [
  { q: "I'm completely new to trading — will this work for me?", a: "Yes. Start with the two free foundation lessons, then the five setups are taught step by step. No prior edge is assumed — but you do have to put in the screen time to learn the models." },
  { q: "Is this just another signals group?", a: "No. You're not renting alerts — you're learning the exact entry models so you can find and execute them yourself, for life. The trading floor and reviews are support, not a crutch." },
  { q: "How much time do I need each day?", a: "The framework is built around a handful of high-quality setups, not all-day screen-staring. Most members mark up their pairs in well under an hour and wait for their setup to appear." },
  { q: "Does this work on crypto and forex?", a: "The Smart Money concepts behind the setups apply to any liquid market — crypto, FX, indices. The examples lean crypto, but the logic transfers." },
  { q: "Is there a profit guarantee?", a: "No, and anyone promising one is lying to you. This is education. Trading carries substantial risk and results are not typical. What you get is a clear, repeatable framework and the support to apply it." },
  { q: "What if I can't make the live reviews?", a: "Every live review is recorded and added to the vault, and you can submit your charts ahead of time to get covered even if you can't attend live." },
  { q: "Why are Inner Circle seats capped at 10?", a: "Because 1-on-1 time is finite. A hard cap is the only way the coaching and chart reviews stay personal. When this cohort fills, it closes — no waitlist rollovers." },
  { q: "How do I get access after I enroll?", a: "Instant. You're emailed your login right after checkout and the full dashboard — setups, indicator, vault — unlocks immediately." },
  { q: "What if it's not for me?", a: "Go through the first two setup modules. If the framework isn't clearer than anything you've paid for, email within 14 days for a full refund and keep the foundation lessons." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">Before you talk yourself out of it</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[-0.02em] text-white leading-[0.95]">
              Every objection,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">answered.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={f.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.04 }} className={"rounded-2xl border bg-[#071828]/60 overflow-hidden " + (isOpen ? "border-[#00e5a8]/35" : "border-white/[0.08]")}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left">
                    <span className="text-base md:text-lg font-bold text-white">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className={"shrink-0 " + (isOpen ? "text-[#00e5a8]" : "text-white/40")}>
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }}>
                        <p className="px-5 md:px-6 pb-5 -mt-1 text-sm md:text-base text-white/55 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default FAQ;
