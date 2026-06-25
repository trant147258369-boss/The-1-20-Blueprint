"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Play, Check, Lock, X, ArrowLeft, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardSetups, hasVideo, type DashboardSetup } from "@/components/dashboard/setupsData";

const STORAGE_KEY = "blueprint_progress_v1";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState<DashboardSetup | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggle = (code: string) => {
    persist(done.includes(code) ? done.filter((c) => c !== code) : [...done, code]);
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const total = dashboardSetups.length;
  const completed = mounted ? done.length : 0;
  const pct = Math.round((completed / total) * 100);
  const nextUp = dashboardSetups.find((s) => !done.includes(s.code));

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen w-full bg-[#040e1c] text-white">
        {/* top bar */}
        <header className="sticky top-0 z-40 w-full bg-[#040e1c]/85 backdrop-blur-md border-b border-white/[0.07]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="The 1:20 Blueprint" className="h-9 w-auto" />
              <span className="hidden sm:block text-white font-extrabold uppercase tracking-tight text-sm">Member Dashboard</span>
            </div>
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" /> Home
            </a>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[-0.02em] mb-2">Your setups</h1>
          <p className="text-white/45 mb-8">Work through each model, then mark it complete to track your progress.</p>

          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl bg-[#071828]/70 border border-white/[0.08] p-5">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Progress</p>
              <p className="text-2xl md:text-3xl font-black tabular-nums">{completed}<span className="text-white/30">/{total}</span></p>
            </div>
            <div className="rounded-2xl bg-[#071828]/70 border border-white/[0.08] p-5">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Completion</p>
              <p className="text-2xl md:text-3xl font-black tabular-nums text-[#33eab8]">{pct}%</p>
            </div>
            <div className="col-span-2 md:col-span-1 rounded-2xl bg-[#071828]/70 border border-white/[0.08] p-5">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Next up</p>
              <p className="text-base md:text-lg font-bold truncate">{nextUp ? `${nextUp.code} · ${nextUp.name}` : "All done 🎉"}</p>
            </div>
          </div>

          {/* progress bar */}
          <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden mb-10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-[#33eab8] to-[#00e5a8]" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
          </div>

          {/* setup list */}
          <div className="flex flex-col gap-4">
            {dashboardSetups.map((s, i) => {
              const isDone = done.includes(s.code);
              const playable = hasVideo(s.videoId);
              return (
                <motion.div
                  key={s.code}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-[#071828]/60 border border-white/[0.08] p-5"
                >
                  <span className="text-sm font-black tabular-nums shrink-0" style={{ color: s.color }}>{s.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-bold">{s.name}</p>
                    <p className="text-sm text-white/45">{s.type} — {s.blurb}</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    {playable ? (
                      <button onClick={() => setActive(s)} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f5a623] text-[#040e1c] font-bold text-sm">
                        <Play className="h-4 w-4 fill-current" /> Watch
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/40 text-sm font-medium">
                        <Lock className="h-4 w-4" /> Coming soon
                      </span>
                    )}
                    <button
                      onClick={() => toggle(s.code)}
                      className={
                        "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors " +
                        (isDone ? "bg-[#00e5a8]/[0.15] text-[#33eab8] border border-[#00e5a8]/40" : "border border-white/[0.12] text-white/60 hover:text-white")
                      }
                    >
                      {isDone ? <CircleCheck className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      {isDone ? "Completed" : "Mark complete"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* video modal */}
        <AnimatePresence>
          {active && hasVideo(active.videoId) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setActive(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.22 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm md:text-base font-bold pr-4">{active.code} · {active.name}</p>
                  <button onClick={() => setActive(null)} aria-label="Close" className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-black">
                  <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1`} title={active.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <button onClick={() => { toggle(active.code); }} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#00e5a8]/[0.12] border border-[#00e5a8]/40 text-[#33eab8] font-bold">
                  <CircleCheck className="h-5 w-5" /> Mark this setup complete
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
