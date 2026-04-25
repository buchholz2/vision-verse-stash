import { ArrowRight, BadgeCheck, ClipboardCheck, ScanLine, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { DecorBackground } from "@/components/DecorBackground";
import heroGabriel from "@/assets/photos/hero-gabriel-clinica.png";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const floatingBadges = [
  { icon: BadgeCheck, label: "CRO 29705" },
  { icon: Sparkles, label: "Ortodontia moderna" },
  { icon: ScanLine, label: "Invisalign®" },
  { icon: ClipboardCheck, label: "Planejamento individualizado" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-hero pt-32 pb-16 md:pt-36 md:pb-20"
    >
      <DecorBackground variant="hero" />

      <div className="container-narrow relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/75 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-primary shadow-soft backdrop-blur-sm"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            Ijuí/RS · Ortodontia e alinhadores
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-4xl font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl text-balance"
          >
            Sorrisos alinhados com <span className="italic text-primary">precisão e naturalidade</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
          >
            Ortodontia moderna, Invisalign® e planejamento digital em uma experiência
            de atendimento clara, humana e cuidadosamente conduzida.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
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
            transition={{ duration: 0.65, delay: 0.35 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-y border-border/70 py-5"
          >
            <div>
              <p className="font-serif text-2xl leading-none text-primary sm:text-3xl">5+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                anos de clínica
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl leading-none text-primary sm:text-3xl">CRO</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                29705
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl leading-none text-primary sm:text-3xl">Digital</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                planejamento
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative mx-auto max-w-[460px] lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.6rem] border border-accent/20" aria-hidden="true" />
            <div className="relative rounded-[2.3rem] border border-border/70 bg-card/75 p-3 shadow-elegant backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[1.85rem] bg-muted aspect-[4/5]">
                <img
                  src={heroGabriel}
                  alt="Dr. Gabriel Paulo Rockenbach em sua clínica"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {floatingBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 rounded-full border border-border/70 bg-card/95 px-3 py-2 text-xs font-medium text-foreground/75 shadow-soft backdrop-blur-sm"
                >
                  <badge.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
