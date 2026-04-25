import { ArrowRight, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { DecorBackground } from "@/components/DecorBackground";
import heroGabriel from "@/assets/photos/hero-gabriel-clinica.png";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const benefits = ["Atendimento humanizado", "Planejamento individualizado", "Ortodontia moderna"];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-hero pt-28 pb-10 md:pt-32 md:pb-12"
    >
      <DecorBackground variant="hero" />

      <div className="container-narrow relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/75 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-primary shadow-soft backdrop-blur-sm"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            <span>CRO 29705 · Ijuí/RS</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-4xl font-serif text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            Ortodontia moderna para o <span className="italic text-primary">seu sorriso</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
          >
            Alinhadores Invisalign®, aparelhos ortodônticos e planejamento digital com
            um cuidado próximo, claro e individualizado.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto">
              Agende sua avaliação
            </WhatsAppButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-full border-primary/25 bg-card/65 px-7 text-base backdrop-blur-sm hover:bg-primary/5 sm:w-auto"
            >
              <a href="#tratamentos">
                Conheça os tratamentos
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="inline-flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-[400px]">
            <div className="rounded-[2.2rem] border border-border/70 bg-card/75 p-3 shadow-elegant backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[1.7rem] bg-muted aspect-[4/5]">
                <img
                  src={heroGabriel}
                  alt="Dr. Gabriel Paulo Rockenbach em sua clínica"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
