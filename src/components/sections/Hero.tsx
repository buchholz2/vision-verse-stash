import { ArrowRight, BadgeCheck, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { DecorBackground } from "@/components/DecorBackground";
import drClinica from "@/assets/photos/dr-clinica.png";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-gradient-hero"
    >
      <DecorBackground variant="hero" showWatermark />

      <div className="container-narrow relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 backdrop-blur-sm text-xs uppercase tracking-[0.16em] text-primary mb-8 shadow-soft"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            <span>CRO 29705 · Ijuí/RS</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.04] text-foreground text-balance"
          >
            Ortodontia e estética <br className="hidden md:block" />
            <span className="italic text-primary">do sorriso</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed text-pretty"
          >
            Tratamentos personalizados com foco em alinhamento dental, funcionalidade
            e harmonia estética. Cuide do seu sorriso com um atendimento humanizado
            e tecnologia moderna.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <WhatsAppButton size="lg">Agende sua avaliação</WhatsAppButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full px-7 border-primary/25 bg-card/60 backdrop-blur-sm hover:bg-primary/5"
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
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <li className="inline-flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-primary" />
              Atendimento humanizado
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Planejamento individualizado
            </li>
            <li className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Ortodontia moderna
            </li>
          </motion.ul>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* glow behind */}
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-sage opacity-20 blur-3xl"
              aria-hidden="true"
            />
            {/* gold accent corner */}
            <div
              className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-gradient-gold opacity-70 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 shadow-elegant aspect-[4/5] bg-muted">
              <img
                src={drClinica}
                alt="Dr. Gabriel Paulo Rockenbach, cirurgião-dentista, em sua clínica"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              {/* gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              {/* CRO badge */}
              <div className="absolute bottom-5 left-5 right-5 glass-card rounded-2xl px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-serif text-base text-foreground leading-tight">Dr. Gabriel Rockenbach</p>
                  <p className="text-xs text-muted-foreground tracking-wide">Cirurgião-dentista · Ortodontista</p>
                </div>
                <span className="text-xs font-medium text-accent tracking-wider">CRO 29705</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* gold divider at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 gold-divider z-10" aria-hidden="true" />
    </section>
  );
}
