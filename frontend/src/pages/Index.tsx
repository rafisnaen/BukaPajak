import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RegionalDistribution from "@/components/RegionalDistribution";
import TransparencyMetrics from "@/components/TransparencyMetrics";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <RegionalDistribution />
      <TransparencyMetrics />
      <Footer />
    </div>
  );
};

export default Index;
