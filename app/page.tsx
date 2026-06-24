import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Callout from "@/components/home/Callout";
import Setups from "@/components/home/Setups";
import ImageDivider from "@/components/home/ImageDivider";
import Free from "@/components/home/Free";
import OfferStack from "@/components/home/OfferStack";
import PainPoints from "@/components/home/PainPoints";
import FinancialBg from "@/components/home/FinancialBg";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";

export default function Page() {
  const seatsLeft = 8;
  return (
    <>
      <Navbar seatsLeft={seatsLeft} />
      <main>
        <Hero seatsLeft={seatsLeft} seatsTotal={10} />
        <Callout />
        <ImageDivider
          src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=1920&q=80&auto=format&fit=crop"
          alt="Dark trading desk atmosphere"
        />
        <Setups />
        <ImageDivider
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&q=80&auto=format&fit=crop"
          alt="Trading charts closeup"
        />
        <Free />
        <OfferStack />
        <PainPoints />
        <FinancialBg />
        <Testimonials />
        <ImageDivider
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80&auto=format&fit=crop"
          alt="Moody financial atmosphere"
        />
        <div id="pricing">
          <Pricing seatsLeft={seatsLeft} />
        </div>
        <ImageDivider
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&q=80&auto=format&fit=crop"
          alt="Trading charts closeup"
        />
        <FAQ />
      </main>
      <Footer seatsLeft={seatsLeft} />
    </>
  );
}
