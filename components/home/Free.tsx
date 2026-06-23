"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Play, Calculator, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { PrimaryCTA } from "./PrimaryCTA";

interface FreeLesson {
  videoId: string;
  title: string;
  desc: string;
}

const lessons: FreeLesson[] = [
  { videoId: "6rq3LjaF4VA", title: "How Smart Money Actually Moves", desc: "The liquidity logic behind every institutional move." },
  { videoId: "hkQD00Nuhx0", title: "Where Most Traders Get Trapped", desc: "The exact spots retail gets hunted — and how to flip it." },
];

export function Free() {
  const [active, setActive] = useState<FreeLesson | null>(null);

  // lock body scroll + ESC to close while modal open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <MotionConfig reducedMotion="user">
      <section id="free" className="relative w-full bg-[#040e1c] py-24 px-4 md:px-6 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <Eyebrow icon={Play}>Watch free — no card needed</Eyebrow>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.02em] text-white leading-[0.95]">
              Two foundation lessons.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#33eab8] via-white/90 to-[#00e5a8]">Zero cost.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {lessons.map((l, i) => (
              <motion.button
                key={l.videoId}
                onClick={() => setActive(l)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative text-left rounded-3xl overflow-hidden bg-[#071828]/70 border border-[#00e5a8]/20"
              >
                {/* thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${l.videoId}/hqdefault.jpg`}
                    alt={l.title}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040e1c] via-[#040e1c]/30 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center h-16 w-16 rounded-full bg-[#f5a623] text-[#040e1c] shadow-[0_8px_30px_0_rgba(245,166,35,0.4)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 ml-1 fill-current" />
                    </span>
                  </span>
                  <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#00e5a8]/[0.15] text-[#33eab8] text-sm font-black">FREE</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{l.title}</h3>
                  <p className="text-base text-white/50 leading-snug">{l.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* risk calculator + free→locked contrast */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-[#00e5a8]/20 bg-[#071828]/50 px-6 py-6">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#00e5a8]/[0.12] text-[#00e5a8] shrink-0">
                <Calculator className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg font-bold text-white">1:20 Risk Calculator</p>
                <p className="text-base text-white/50">Size every trade to your asymmetric target in seconds — free with the lessons.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#071828]/50 px-6 py-5">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <Lock className="h-5 w-5 text-[#f5a623] shrink-0" />
                <p className="text-sm md:text-base text-white/70">These two show you the <span className="text-white font-semibold">map</span>. The 5 paid setups give you the <span className="text-[#33eab8] font-semibold">entries</span>.</p>
              </div>
              <PrimaryCTA size="sm" className="shrink-0">Unlock the 5 setups</PrimaryCTA>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal player */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm md:text-base font-bold text-white pr-4">{active.title}</p>
                <button onClick={() => setActive(null)} aria-label="Close" className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default Free;
