"use client";

import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import HeroChart from "./charts/HeroChart";
import { Circle, Clock, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { PrimaryCTA } from "./PrimaryCTA";
import { getNextDeadline } from "./deadline";

function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(0,229,168,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,168,0.12),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface HeroProps {
  /** Real scarcity — Inner Circle capped at 10. */
  seatsLeft?: number;
  seatsTotal?: number;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function Hero({
  seatsLeft = 8,
  seatsTotal = 10,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [deadline, setDeadline] = useState<Date>(() => getNextDeadline());
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    setMounted(true);
    const target = deadline.getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        // The month just ended — roll straight to the next real month-end.
        setDeadline(getNextDeadline());
        return;
      }
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

  const claimed = Math.max(0, seatsTotal - seatsLeft);
  const claimedPct = Math.round((claimed / seatsTotal) * 100);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.18,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  const countItems: Array<[string, number]> = [
    ["days", t.d],
    ["hrs", t.h],
    ["min", t.m],
    ["sec", t.s],
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#040e1c]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00e5a8]/[0.05] via-transparent to-[#f5a623]/[0.05] blur-3xl" />

        {/* Dark trading charts background image with low opacity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80&auto=format&fit=crop"
            alt="Dark trading charts on monitor background"
            style={{ y: bgY, width: "100%", height: "120%", objectFit: "cover", opacity: 0.25, display: "block", willChange: "transform" }}
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none -z-10" style={{ opacity: 0.4 }}>
          <div className="w-full h-full">
            <HeroChart className="w-full h-full" />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-[#00e5a8]/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
          <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-[#f5a623]/[0.12]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
          <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-[#33eab8]/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
          <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-[#00b386]/[0.15]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
          <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-[#00e5a8]/[0.12]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Scarcity badge — pulsing dot, REAL seats */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5a623]/[0.08] border border-[#f5a623]/[0.25] mb-5"
            >
              <motion.span
                className="inline-flex"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Circle className="h-2.5 w-2.5 fill-[#f5a623] text-[#f5a623]" />
              </motion.span>
              <span className="text-sm md:text-base text-white/75 tracking-wide">
                {seatsLeft} of {seatsTotal} Inner Circle seats left
              </span>
            </motion.div>

            {/* Real scarcity bar — claimed out of total */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xs mx-auto mb-8"
            >
              <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#f5a623] to-[#d18c00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${claimedPct}%` }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-sm text-white/40 tracking-wide">
                {claimed} of {seatsTotal} seats already claimed
              </p>
            </motion.div>

            {/* Headline — bigger, fills the frame */}
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="uppercase mb-6 md:mb-8 leading-[0.9]">
                <span className="block text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.01em] text-white">
                  Trade with an asymmetric edge.
                </span>
                <span className="block text-6xl sm:text-7xl md:text-9xl font-black tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">
                  Risk 1R. Target 20R.
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-lg sm:text-xl md:text-2xl text-white/55 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-2">
                Stop trading noise and switch to a premium framework built around liquidity, structure and institutional flow. Get repeatable setups that make your risk predictable and your edge visible.
              </p>
            </motion.div>

            {/* Countdown — REAL deadline. Set the `deadline` prop to your true date. */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <Eyebrow urgent icon={Clock}>Enrollment closes in</Eyebrow>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {countItems.map(([label, val]) => (
                  <div
                    key={label}
                    className="min-w-[58px] md:min-w-[76px] rounded-xl bg-white/[0.04] border border-white/[0.08] px-2 py-2 md:py-3"
                  >
                    <div className="text-2xl md:text-4xl font-black text-white tabular-nums leading-none">
                      {mounted ? pad(val) : "--"}
                    </div>
                    <div className="mt-1 text-sm uppercase tracking-widest text-white/40">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA group — 3 tiers, with motion. Rewire hrefs to real targets. */}
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto"
            >
              <PrimaryCTA size="lg">Claim my seat now</PrimaryCTA>

              <motion.a
                href="#free"
                whileHover={{ scale: 1.06, boxShadow: "0 0 28px rgba(0,229,168,0.6)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-2xl border border-[#00e5a8]/45 text-[#33eab8] font-black text-lg md:text-xl tracking-wide shadow-[0_12px_40px_-20px_rgba(0,229,168,0.5)] transition-colors duration-300 hover:bg-[#00e5a8] hover:text-[#040e1c]"
              >
                Unlock 2 free lessons
              </motion.a>

              <motion.a
                href="#setups"
                initial="rest"
                whileHover={{ scale: 1.04 }}
                className="group inline-flex items-center gap-2 text-lg md:text-xl text-white/65 hover:text-white transition-colors"
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Explore the 5 setups
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatDelay: 2 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
            <motion.div
              custom={4.5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center"
            >
              <span className="inline-flex items-center gap-2 text-sm text-white/40 tracking-wide font-normal">
                <motion.span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-[#33eab8]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                You&apos;ll be chatting with Thomas directly. Lifetime access, live reviews included.
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#f5a623]">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Few seats left this intake
              </span>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#040e1c] via-transparent to-[#040e1c]/80 pointer-events-none" />
      </section>
    </MotionConfig>
  );
}

export default Hero;
