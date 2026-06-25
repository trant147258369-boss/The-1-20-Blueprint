"use client";

import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { PrimaryCTA } from "./PrimaryCTA";
import { getNextDeadline } from "./deadline";

interface NavbarProps {
  seatsLeft?: number;
}
function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

type Urgency = "calm" | "warn" | "critical";

export function Navbar({ seatsLeft = 8 }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  // Same shared month-end deadline as the Hero/Pricing countdowns — real
  // date math, rolls to next month the instant this one passes.
  const [deadline, setDeadline] = useState<Date>(() => getNextDeadline());
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [urgency, setUrgency] = useState<Urgency>("calm");

  useEffect(() => {
    setMounted(true);
    const target = deadline.getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setDeadline(getNextDeadline());
        return;
      }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
      setUrgency(diff < 60 * 60 * 1000 ? "critical" : diff < 6 * 60 * 60 * 1000 ? "warn" : "calm");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const dotColor = urgency === "critical" ? "bg-[#ef4444]" : urgency === "warn" ? "bg-[#f5a623]" : "bg-[#33eab8]";
  const digitColor = urgency === "critical" ? "text-[#ef4444]" : urgency === "warn" ? "text-[#f5a623]" : "text-white";
  const digitGlow =
    urgency === "critical"
      ? "drop-shadow-[0_0_10px_rgba(239,68,68,0.55)]"
      : urgency === "warn"
      ? "drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]"
      : "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]";

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
        <div className="w-full bg-gradient-to-b from-[#03101c] via-[#02080f] to-[#03101c] border-t border-b border-[#00e5a8]/[0.1] overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="flex-1 overflow-hidden relative h-11 flex items-center">
              <motion.div
                className="flex gap-8 whitespace-nowrap pr-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {[...ticker, ...ticker, ...ticker, ...ticker].map((tk, i) => (
                  <span key={i} className="text-sm tracking-[0.2em] text-white/65 uppercase flex items-center gap-8">
                    {tk}
                    <span className="text-[#33eab8] drop-shadow-[0_0_6px_rgba(51,234,184,0.9)]">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-5 shrink-0 border-l border-[#00e5a8]/[0.15] bg-white/[0.03] h-11">
              <motion.span
                className={cn("inline-flex h-1.5 w-1.5 rounded-full shrink-0", dotColor)}
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <span className="text-sm md:text-base font-black uppercase tracking-wide text-[#33eab8]">Closes</span>
              <span className={cn("text-base md:text-lg font-black tabular-nums", digitColor, digitGlow)}>
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
