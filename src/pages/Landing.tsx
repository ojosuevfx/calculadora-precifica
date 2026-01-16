import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import FAQ from "@/components/landing/FAQ";
import Donation from "@/components/landing/Donation";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Donation />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
