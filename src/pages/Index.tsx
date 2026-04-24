import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Treatments } from "@/components/sections/Treatments";
import { Orthodontics } from "@/components/sections/Orthodontics";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Differentials } from "@/components/sections/Differentials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Treatments />
      <Orthodontics />
      <HowItWorks />
      <Differentials />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
