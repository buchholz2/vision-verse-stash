import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AlignerExperience } from "@/components/sections/AlignerExperience";
import { VideoExperience } from "@/components/sections/VideoExperience";
import { Treatments } from "@/components/sections/Treatments";
import { HowItWorks } from "@/components/sections/HowItWorks";
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
    <div className="min-h-screen bg-background">
      <SEO
        title="Ortodontista em Ijuí | Invisalign | Dr. Gabriel Rockenbach"
        description="Ortodontista em Ijuí/RS com atendimento em Invisalign, alinhadores transparentes e aparelho ortodôntico. Agende sua avaliação com o Dr. Gabriel Rockenbach."
        path="/"
        jsonLd={homeSchemas}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <AlignerExperience />
        <About />
        <Treatments />
        <VideoExperience />
        <HowItWorks />
        <LocalSeoSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
