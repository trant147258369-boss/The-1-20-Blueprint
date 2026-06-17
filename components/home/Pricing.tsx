"use client";

import { motion, MotionConfig } from "framer-motion";

interface Row { label: string; value: string; strong?: boolean }
interface Tier {
  name: string;
  price: string;
  original?: string;
  sub: string;
  badge?: string;
  badgeKind?: "popular" | "scarce";
  rows: Row[];
  total?: string;
  cta: string;
  href: string;
  highlight?: boolean;
  scarce?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    sub: "2 free foundation lessons.",
    rows: [
      { label: "How Smart Money Actually Moves", value: "Free" },
      { label: "Where Most Traders Get Trapped", value: "Free" },
      { label: "Market structure basics", value: "Free" },
      { label: "1:20 Risk Calculator template", value: "Free" },
    ],
    cta: "Start Free →",
    href: "#free",
  },
  {
    name: "The Method",
    price: "$5,999",
    original: "$7,900",
    sub: "One payment. Lifetime access.",
    badge: "MOST POPULAR",
    badgeKind: "popular",
    rows: [
      { label: "The 5 Proprietary Setups (S-01 → S-05)", value: "$2,000" },
      { label: "The 1:20 Signal Indicator", value: "$1,500" },
      { label: "Backtest & Journal Vault", value: "$800" },
      { label: "Private Trading Floor (lifetime)", value: "$1,200" },
      { label: "Weekly Live Trade Reviews", value: "$2,400/yr" },
      { label: "Lifetime Updates", value: "∞" },
    ],
    total: "$7,900+",
    cta: "Enroll in The Method →",
    href: "#",
    highlight: true,
  },
  {
    name: "Inner Circle",
    price: "$9,999",
    sub: "8 seats · No waitlist.",
    badge: "8 SEATS LEFT",
    badgeKind: "scarce",
    rows: [
      { label: "Everything in The Method", value: "$5,999" },
      { label: "12 × 1-on-1 Coaching Sessions", value: "$6,000" },
      { label: "Personal Weekly Chart Reviews", value: "$3,600/yr" },
      { label: "Priority Cohort Access", value: "Exclusive" },
      { label: "Direct Private Channel", value: "Exclusive" },
    ],
    total: "$15,500+",
    cta: "Apply for Inner Circle →",
    href: "#",
    scarce: true,
  },
];

export function Pricing({ seatsLeft = 8 }: { seatsLeft?: number }) {
  const display = tiers.map((t) =>
    t.badgeKind === "scarce" ? { ...t, badge: `${seatsLeft} SEATS LEFT` } : t
  );
  return (
    <MotionConfig reducedMotion="user">
      <section id="pricing" className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5a8]/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">Lock your seat before it closes</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[-0.02em] text-white leading-[0.92]">
              Three ways in.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">One closing window.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
            {display.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={
                  "relative flex flex-col rounded-3xl p-7 md:p-8 border " +
                  (t.highlight
                    ? "bg-[#071828] border-[#00e5a8]/45 shadow-[0_0_70px_-15px_rgba(0,229,168,0.4)] md:-mt-5 md:mb-5"
                    : t.scarce
                    ? "bg-[#071828]/70 border-[#f5a623]/30"
                    : "bg-[#071828]/60 border-white/[0.08]")
                }
              >
                {t.badge && (
                  <span className={"absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide whitespace-nowrap " + (t.badgeKind === "scarce" ? "bg-[#f5a623] text-[#040e1c]" : "bg-[#00e5a8] text-[#040e1c]")}>
                    {t.badgeKind === "popular" ? "⚡ " : "🔒 "}{t.badge}
                  </span>
                )}

                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">{t.name}</p>
                <div className="flex items-end gap-2 mb-1.5">
                  <span className="text-5xl md:text-6xl font-black text-white tracking-tight tabular-nums">{t.price}</span>
                  {t.original && <span className="mb-2 text-xl text-white/30 line-through">{t.original}</span>}
                </div>
                <p className={"text-sm font-semibold mb-6 " + (t.highlight ? "text-[#33eab8]" : "text-white/45")}>{t.sub}</p>

                <p className="text-[11px] uppercase tracking-[0.2em] text-white/35 mb-3">What you get</p>
                <ul className="flex flex-col gap-3 mb-6">
                  {t.rows.map((r) => (
                    <li key={r.label} className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-2.5">
                      <span className="text-sm md:text-[15px] text-white/75">{r.label}</span>
                      <span className={"text-sm font-bold shrink-0 " + (r.value === "Free" ? "text-[#33eab8]" : r.value === "Exclusive" || r.value === "∞" ? "text-[#33eab8]" : "text-[#f5a623]")}>{r.value}</span>
                    </li>
                  ))}
                </ul>

                {t.total && (
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-white">Total value</span>
                    <span className="text-base font-black text-white tabular-nums">{t.total}</span>
                  </div>
                )}

                <motion.a
                  href={t.href}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.97 }}
                  animate={t.highlight ? { boxShadow: ["0 8px 30px 0 rgba(245,166,35,0.3)", "0 10px 44px 0 rgba(245,166,35,0.6)", "0 8px 30px 0 rgba(245,166,35,0.3)"] } : undefined}
                  transition={{ boxShadow: { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, scale: { type: "spring", stiffness: 400, damping: 17 } }}
                  className={
                    "mt-auto inline-flex items-center justify-center px-6 py-4 rounded-xl font-black text-base tracking-wide " +
                    (t.highlight ? "bg-[#f5a623] text-[#040e1c]" : t.scarce ? "bg-[#f5a623]/[0.12] border border-[#f5a623]/50 text-[#f5a623] hover:bg-[#f5a623]/20" : "border border-[#00e5a8]/45 text-[#33eab8] hover:bg-[#00e5a8]/[0.08]")
                  }
                >
                  {t.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-white/30 mt-10 max-w-xl mx-auto leading-relaxed">
            Values shown are estimated standalone value, not a statement of earnings. Trading involves substantial risk; results are not typical.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Pricing;
