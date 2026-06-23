"use client";

import { motion, MotionConfig } from "framer-motion";
import { Star, Users } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

const testimonials = [
  {
    name: "Junix",
    quote: "Honestly I was skeptical at first. The liquidity sweep setup clicked after maybe a week. Now I just wait for it instead of guessing.",
  },
  {
    name: "Jesús Durón",
    quote: "I dropped like six indicators after this. Just price and where the big orders sit. Cleaner charts, fewer dumb entries.",
  },
  {
    name: "Justin",
    quote: "Took me longer than I want to admit to stop overtrading. The order block stuff finally gave me a reason to wait.",
  },
  {
    name: "Pure",
    quote: "Not gonna lie, the live reviews caught mistakes I didn't even know I was making. My stop losses actually make sense now.",
  },
  {
    name: "Ajmal",
    quote: "The Telegram group calls out setups in real time. I used to trade alone and just guess. Not anymore.",
  },
  {
    name: "Milovan Djokovic",
    quote: "No magic indicator, just learning where stops get hunted. First green month in a while, ngl.",
  },
  {
    name: "Gio",
    quote: "I used to need like 20 confirmations before clicking buy. Now it's basically liquidity, structure, done. Way less staring at screens.",
  },
  {
    name: "Arif Salman",
    quote: "Crypto charts stopped looking random once I got the sweep and reclaim. Still mess it up sometimes, just way less often.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mt-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#f5a623] text-[#f5a623]" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="testimonials" className="relative w-full bg-[#020814] py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,229,168,0.14),transparent_28%),radial-gradient(circle_at_100%_40%,rgba(245,166,35,0.08),transparent_24%)] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow icon={Users}>Real members, real feedback</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-[-0.02em] text-white leading-[1.05]">
              Trusted by members who moved from confusion to clarity.
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/50 max-w-2xl mx-auto">
              These are actual community members sharing what the course helped them do — no performance promises, just a better way to read and trade price.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="rounded-3xl border border-white/[0.06] border-l-4 border-l-[#00e5a8] bg-[#071828]/70 p-9 md:p-10 shadow-[0_25px_90px_-55px_rgba(0,229,168,0.35)]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] text-lg font-black text-white shrink-0">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="text-base font-bold uppercase tracking-[0.25em] text-white/60">{testimonial.name}</p>
                    <StarRating />
                  </div>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-white/80">“{testimonial.quote}”</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-white/30 mt-12 max-w-2xl mx-auto">
            Feedback is from real members in the community. Trading involves substantial risk; results are not typical.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Testimonials;
