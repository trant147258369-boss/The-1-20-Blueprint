import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";

export default function Page() {
  return (
    <main>
      <Hero seatsLeft={8} seatsTotal={10} deadline="2026-06-30T23:59:59" />
      <Pricing seatsLeft={8} />
    </main>
  );
}
