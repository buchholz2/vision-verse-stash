import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Orthodontics } from "@/components/sections/Orthodontics";
import { VideoExperience } from "@/components/sections/VideoExperience";
import { Treatments } from "@/components/sections/Treatments";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HumanizedCare } from "@/components/sections/HumanizedCare";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Orthodontics />
      <VideoExperience />
      <Treatments />
      <HowItWorks />
      <HumanizedCare />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
