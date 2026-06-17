import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Callout from "@/components/home/Callout";
import Setups from "@/components/home/Setups";
import Free from "@/components/home/Free";
import OfferStack from "@/components/home/OfferStack";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/home/Footer";

export default function Page() {
  const seatsLeft = 8;
  const deadline = "2026-06-30T23:59:59";
  return (
    <>
      <Navbar seatsLeft={seatsLeft} deadline={deadline} />
      <main>
        <Hero seatsLeft={seatsLeft} seatsTotal={10} deadline={deadline} />
        <Callout />
        <Setups />
        <Free />
        <OfferStack />
        <Pricing seatsLeft={seatsLeft} />
      </main>
      <Footer seatsLeft={seatsLeft} />
    </>
  );
}
