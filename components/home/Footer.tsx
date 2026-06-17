"use client";

import { motion, MotionConfig } from "framer-motion";

interface FooterProps { seatsLeft?: number }
const footNav: ReadonlyArray<readonly [string, string]> = [
  ["Setups", "#setups"],
  ["Free", "#free"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export function Footer({ seatsLeft = 8 }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e5a8]/[0.05] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-sm uppercase tracking-[0.3em] text-[#f5a623] mb-5">
            Only {seatsLeft} of 10 seats remain
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.02em] text-white leading-[0.9] mb-8">
            When it&apos;s full,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">it&apos;s gone.</span>
          </motion.h2>
          <motion.a href="#pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} animate={{ boxShadow: ["0 8px 30px 0 rgba(245,166,35,0.3)", "0 12px 50px 0 rgba(245,166,35,0.6)", "0 8px 30px 0 rgba(245,166,35,0.3)"] }} transition={{ boxShadow: { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, scale: { type: "spring", stiffness: 400, damping: 17 } }} className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-[#f5a623] text-[#040e1c] font-black text-lg md:text-xl">
            Claim your seat <span aria-hidden>→</span>
          </motion.a>
        </div>
      </section>

      <footer className="w-full bg-[#02080f] border-t border-white/[0.06] px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center h-9 w-12 rounded-lg bg-[#00e5a8] text-[#040e1c] font-black text-base tabular-nums">1:20</span>
              <span className="text-white font-extrabold uppercase tracking-tight text-sm">The 1:20 Blueprint</span>
            </div>
            <nav className="flex flex-wrap gap-6">
              {footNav.map(([l, h]) => (
                <a key={h} href={h} className="text-sm text-white/45 hover:text-white transition-colors">{l}</a>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-xs text-white/30 leading-relaxed space-y-2">
            <p>Trading involves substantial risk of loss and is not suitable for every investor. Educational content only — nothing here is financial advice. Results are not typical and past performance does not guarantee future results.</p>
            <p>© {year} The 1:20 Blueprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default Footer;
