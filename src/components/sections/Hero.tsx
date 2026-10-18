import { ArrowDown, MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CRO } from "@/lib/contact";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export function Hero() {
  return (
    <section id="inicio" className="hero-section scroll-mt-24">
      <div className="container-wide">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary-soft">
              <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> Ortodontia em Ijuí, RS
            </p>
            <h1 className="hero-title">
              Seu sorriso,{" "}<br /><span className="block">planejado em{" "}</span>cada detalhe.
              <span className="sr-only"> Ortodontista em Ijuí/RS, especialista em Invisalign® e aparelho transparente.</span>
            </h1>
            <p className="mt-6 max-w-[31rem] text-base leading-[1.8] text-muted-foreground sm:text-lg">
              Ortodontista em Ijuí/RS, com alinhadores Invisalign®, aparelho transparente e planejamento digital. Um cuidado que começa por entender você.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <WhatsAppButton size="lg" className="w-full sm:w-auto">Agendar avaliação</WhatsAppButton>
              <a href="#alinhadores" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary-soft hover:underline underline-offset-4">
                Conhecer os alinhadores <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="hero-portrait">
            <ResponsivePhoto name="gabriel-hero-clinica" alt="Dr. Gabriel Paulo Rockenbach em sua clínica"
              sizes="(min-width: 1024px) 464px, 100vw"
              className="hero-photo" loading="eager" {...({ fetchpriority: "high" } as object)} />
            <figcaption className="hero-caption">
              <span className="block font-serif text-xl text-white sm:text-2xl">Dr. Gabriel Paulo Rockenbach</span>
              <span className="mt-1 block text-xs text-white/75 sm:text-sm">Especialista em Ortodontia <span className="mx-2 text-white/35">/</span> {CRO}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
