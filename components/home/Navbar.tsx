"use client";

import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { PrimaryCTA } from "./PrimaryCTA";

interface NavbarProps {
  seatsLeft?: number;
  deadline?: string;
}
function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function Navbar({ seatsLeft = 8, deadline = "2026-06-30T23:59:59" }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    const target = new Date(deadline).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const ticker = [
    "THE 1:20 BLUEPRINT",
    "SMART MONEY CONCEPTS",
    "5 CORE SETUPS",
    `INNER CIRCLE — ${seatsLeft} SEATS LEFT`,
    "ENROLLMENT CLOSING SOON",
  ];
  const links: ReadonlyArray<readonly [string, string]> = [
    ["Setups", "#setups"],
    ["Free lessons", "#free"],
    ["Pricing", "#pricing"],
  ];

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 w-full">
        <div className="w-full bg-[#02080f] border-b border-white/[0.06] overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="flex-1 overflow-hidden relative h-11 flex items-center">
              <motion.div
                className="flex gap-8 whitespace-nowrap pr-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {[...ticker, ...ticker, ...ticker, ...ticker].map((tk, i) => (
                  <span key={i} className="text-sm tracking-[0.2em] text-white/40 uppercase flex items-center gap-8">
                    {tk}
                    <span className="text-[#00e5a8]">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-5 shrink-0 border-l border-white/[0.06] h-11">
              <span className="text-sm uppercase tracking-widest text-[#33eab8]">Closes</span>
              <span className="text-sm font-black text-white tabular-nums">
                {mounted ? `${pad(t.d)}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}` : "--"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#040e1c]/85 backdrop-blur-md border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-[80px] min-h-[80px] flex items-center justify-between gap-4" style={{ minHeight: 80 }}>
            <a href="#" className="flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center justify-center h-14 w-16 rounded-xl bg-gradient-to-br from-[#33eab8] to-[#00b386] text-[#040e1c] font-black text-2xl md:text-3xl tabular-nums shadow-[0_0_22px_rgba(0,229,168,0.5)]">
                1:20
              </span>
              <span className="hidden sm:block text-white font-black tracking-tight uppercase text-2xl md:text-3xl">
                Blueprint
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-10" style={{ minHeight: '80px' }}>
              {links.map(([l, h]) => (
                <a key={h} href={h} className="text-base md:text-base text-white/70 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5a623]/[0.12] border border-[#f5a623]/40 text-sm font-black text-[#f5a623]">
                ● {seatsLeft} LEFT
              </motion.span>
              <PrimaryCTA size="sm">Claim Seat</PrimaryCTA>
            </div>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}

export default Navbar;
