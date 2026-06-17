"use client";

import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

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
            <div className="flex-1 overflow-hidden relative h-9 flex items-center">
              <motion.div
                className="flex gap-8 whitespace-nowrap pr-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {[...ticker, ...ticker, ...ticker, ...ticker].map((tk, i) => (
                  <span key={i} className="text-[11px] tracking-[0.2em] text-white/40 uppercase flex items-center gap-8">
                    {tk}
                    <span className="text-[#00e5a8]">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 shrink-0 border-l border-white/[0.06] h-9">
              <span className="text-[10px] uppercase tracking-widest text-[#33eab8]">Closes</span>
              <span className="text-xs font-bold text-white tabular-nums">
                {mounted ? `${pad(t.d)}d ${pad(t.h)}:${pad(t.m)}:${pad(t.s)}` : "--"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#040e1c]/85 backdrop-blur-md border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2.5 shrink-0">
              <span className="inline-flex items-center justify-center h-9 w-12 rounded-lg bg-[#00e5a8] text-[#040e1c] font-black text-base tabular-nums">
                1:20
              </span>
              <span className="hidden sm:block text-white font-extrabold tracking-tight uppercase text-sm">
                Blueprint
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-7">
              {links.map(([l, h]) => (
                <a key={h} href={h} className="text-sm text-white/55 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5a623]/[0.12] border border-[#f5a623]/40 text-xs font-black text-[#f5a623]">
                ● {seatsLeft} LEFT
              </motion.span>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    "0 6px 20px 0 rgba(245,166,35,0.25)",
                    "0 8px 30px 0 rgba(245,166,35,0.5)",
                    "0 6px 20px 0 rgba(245,166,35,0.25)",
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="inline-flex items-center gap-1.5 px-4 md:px-6 py-2.5 rounded-lg bg-[#f5a623] text-[#040e1c] font-black text-sm md:text-base"
              >
                Claim Seat <span aria-hidden>→</span>
              </motion.a>
            </div>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}

export default Navbar;
