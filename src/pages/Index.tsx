import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Orthodontics } from "@/components/sections/Orthodontics";
import { VideoExperience } from "@/components/sections/VideoExperience";
import { Treatments } from "@/components/sections/Treatments";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HumanizedCare } from "@/components/sections/HumanizedCare";
import { LocalSeoSection } from "@/components/sections/LocalSeoSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SEO } from "@/components/SEO";
import { homeFaqs } from "@/data/localPages";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

const homeSchemas = [
  breadcrumbSchema([{ name: "Início", path: "/" }]),
  faqSchema(homeFaqs),
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Ortodontista em Ijuí | Invisalign e Aparelho Transparente | Dr. Gabriel Rockenbach"
        description="Atendimento odontológico em Ijuí/RS com foco em ortodontia moderna, Invisalign e alinhadores transparentes. Agende sua avaliação com o Dr. Gabriel Rockenbach."
        path="/"
        jsonLd={homeSchemas}
      />
      <Header />
      <Hero />
      <About />
      <Orthodontics />
      <VideoExperience />
      <Treatments />
      <HowItWorks />
      <HumanizedCare />
      <LocalSeoSection />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
