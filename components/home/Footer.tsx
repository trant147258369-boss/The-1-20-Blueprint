"use client";

import { motion, MotionConfig } from "framer-motion";
import { Flame } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { PrimaryCTA } from "./PrimaryCTA";

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
      <section className="relative w-full bg-[#040e1c] py-[5.5rem] px-4 md:px-6 overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e5a8]/[0.05] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Eyebrow urgent icon={Flame}>{`Only ${seatsLeft} of 10 seats remain`}</Eyebrow>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.02em] text-white leading-[0.9] mb-8">
            When it&apos;s full,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">it&apos;s gone.</span>
          </motion.h2>
          <PrimaryCTA size="lg">Claim your seat</PrimaryCTA>
        </div>
      </section>

      <footer className="w-full bg-[#02080f] border-t border-white/[0.06] px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="The 1:20 Blueprint" className="h-9 w-auto" />
            </div>
            <nav className="flex flex-wrap gap-6">
              {footNav.map(([l, h]) => (
                <a key={h} href={h} className="text-base text-white/45 hover:text-white transition-colors">{l}</a>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-sm text-white/30 leading-relaxed space-y-2">
            <p>Trading involves substantial risk of loss and is not suitable for every investor. Educational content only — nothing here is financial advice. Results are not typical and past performance does not guarantee future results.</p>
            <p>© {year} The 1:20 Blueprint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}

export default Footer;
