import Header from "@/components/layout/Header";
import HeroSlider from "@/components/home/HeroSlider";
import TodaysOffer from "@/components/home/TodaysOffer";
import NewToday from "@/components/home/NewToday";
import TopStores from "@/components/home/TopStores";
import PopularOffers from "@/components/home/PopularOffers";
import EndingSoon from "@/components/home/EndingSoon";
import CustomerFeedback from "@/components/home/CustomerFeedback";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSlider />
        <TodaysOffer />
        <NewToday />
        <TopStores />
        <PopularOffers />
        <EndingSoon />
        <CustomerFeedback />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}