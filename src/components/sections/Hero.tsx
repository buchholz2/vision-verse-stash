import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import heroGabriel from "@/assets/photos/real/gabriel-hero-clinica.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const proof = ["Invisalign®", "Planejamento digital", "Atendimento humanizado"];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-screen overflow-hidden bg-[hsl(42_35%_98%)] pt-24"
    >
      <div className="absolute inset-x-0 top-24 h-px bg-border/60" aria-hidden="true" />

      <div className="container-wide grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-12 lg:py-0">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.28em] text-accent"
          >
            Ortodontia moderna em Ijuí/RS
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-[760px] font-serif text-6xl leading-[0.95] text-foreground sm:text-7xl lg:text-7xl xl:text-8xl text-balance"
          >
            Ortodontia moderna em{" "}
            <span className="italic text-primary">detalhes.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty"
          >
            Invisalign®, planejamento digital e cuidado clínico individualizado para
            alinhar o sorriso com naturalidade.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto">
              Agende sua avaliação
            </WhatsAppButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-full border-primary/20 bg-transparent px-8 text-base hover:bg-primary/5 sm:w-auto"
            >
              <a href="#ortodontia">
                Ver especialidade
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-foreground/70 sm:flex-row sm:items-center sm:gap-7"
          >
            {proof.map((item) => (
              <span key={item} className="relative sm:after:absolute sm:after:-right-4 sm:after:top-1/2 sm:after:h-1 sm:after:w-1 sm:after:-translate-y-1/2 sm:after:rounded-full sm:after:bg-accent/70 sm:last:after:hidden">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6 xl:col-span-7"
        >
          <div className="relative ml-auto max-w-[760px]">
            <div className="absolute -left-8 top-10 hidden h-[78%] w-px bg-accent/45 lg:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-card p-3 shadow-elegant">
              <img
                src={heroGabriel}
                alt="Dr. Gabriel Paulo Rockenbach em sua clínica"
                className="h-[520px] w-full rounded-[1.75rem] object-cover object-[center_24%] md:h-[640px] lg:h-[690px]"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
