"use client";

import { motion, MotionConfig } from "framer-motion";
import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  original?: string;
  badge?: string;
  badgeKind?: "popular" | "scarce";
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}

interface PricingProps {
  seatsLeft?: number;
}

export function Pricing({ seatsLeft = 8 }: PricingProps) {
  const tiers: Tier[] = [
    {
      name: "Free",
      price: "$0",
      tagline: "Start here — no card needed",
      features: [
        "2 free foundation lessons",
        "“How Smart Money Actually Moves”",
        "“Where Most Traders Get Trapped”",
        "1:20 risk calculator",
      ],
      cta: "Watch 2 free lessons",
      href: "#free",
    },
    {
      name: "The Method",
      price: "$5,999",
      original: "$7,900",
      badge: "MOST POPULAR",
      badgeKind: "popular",
      tagline: "The full self-study system",
      features: [
        "All 5 core setups (S-01 → S-05)",
        "1:20 Signal Indicator",
        "Backtest vault",
        "Private trading floor",
        "Live trade reviews",
      ],
      cta: "Get The Method",
      href: "#",
      highlight: true,
    },
    {
      name: "Inner Circle",
      price: "$9,999",
      badge: `${seatsLeft} SEATS LEFT`,
      badgeKind: "scarce",
      tagline: "Done-with-you, 1-on-1",
      features: [
        "Everything in The Method",
        "12 × 1-on-1 sessions",
        "Private chart reviews",
        "Private direct channel",
      ],
      cta: "Claim your seat",
      href: "#",
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="pricing"
        className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5a8]/[0.03] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-16"
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#33eab8] mb-4">
              Choose your path
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-[-0.02em] text-white leading-[0.95]">
              One framework.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">
                Three ways in.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-stretch">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className={
                  "relative flex flex-col rounded-3xl p-7 md:p-8 border " +
                  (tier.highlight
                    ? "bg-[#071828] border-[#00e5a8]/40 shadow-[0_0_60px_-15px_rgba(0,229,168,0.35)] md:-mt-4 md:mb-4"
                    : "bg-[#071828]/60 border-white/[0.08]")
                }
              >
                {tier.badge && (
                  <span
                    className={
                      "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap " +
                      (tier.badgeKind === "scarce"
                        ? "bg-[#f5a623] text-[#040e1c]"
                        : "bg-[#00e5a8] text-[#040e1c]")
                    }
                  >
                    {tier.badgeKind === "popular" ? "⚡ " : "🔒 "}
                    {tier.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-white/45 mb-6">{tier.tagline}</p>

                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {tier.price}
                  </span>
                  {tier.original && (
                    <span className="mb-1.5 text-lg text-white/30 line-through">
                      {tier.original}
                    </span>
                  )}
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={
                          "h-5 w-5 shrink-0 mt-0.5 " +
                          (tier.highlight ? "text-[#00e5a8]" : "text-[#33eab8]/70")
                        }
                      />
                      <span className="text-sm text-white/70 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href={tier.href}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={
                    "inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-base tracking-wide transition-colors " +
                    (tier.highlight
                      ? "bg-[#f5a623] text-[#040e1c]"
                      : tier.badgeKind === "scarce"
                      ? "border border-[#f5a623]/50 text-[#f5a623] hover:bg-[#f5a623]/[0.08]"
                      : "border border-[#00e5a8]/40 text-[#33eab8] hover:bg-[#00e5a8]/[0.08]")
                  }
                >
                  {tier.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-white/30 mt-10 max-w-xl mx-auto leading-relaxed">
            Trading involves substantial risk. Education only — results are not
            typical and past performance does not guarantee future results.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Pricing;
