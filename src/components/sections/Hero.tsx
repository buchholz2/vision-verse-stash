import { lazy, Suspense } from "react";
import { ArrowRight, BadgeCheck, Sparkles, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WhatsAppButton } from "./WhatsAppButton";
import { Button } from "@/components/ui/button";
import drClinica from "@/assets/photos/dr-clinica.png";

const ToothScene = lazy(() => import("./ToothScene"));

export function Hero() {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const show3D = !isMobile && !prefersReduced;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-hero"
    >
      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary-glow)/0.5), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.35), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 3D background */}
      {show3D && (
        <Suspense fallback={null}>
          <ToothScene className="absolute inset-0 -z-0 opacity-70" />
        </Suspense>
      )}

      <div className="container-narrow relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 backdrop-blur-sm text-xs uppercase tracking-[0.16em] text-primary mb-8"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-accent" />
            <span>CRO 29705 · Ijuí/RS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-foreground text-balance"
          >
            Ortodontia e estética <br className="hidden md:block" />
            <span className="italic text-primary">do sorriso</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed text-pretty"
          >
            Tratamentos personalizados com foco em alinhamento dental, funcionalidade
            e harmonia estética. Cuide do seu sorriso com um atendimento humanizado
            e tecnologia moderna.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <WhatsAppButton size="lg">Agende sua avaliação</WhatsAppButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full px-7 border-primary/25 hover:bg-primary/5"
            >
              <a href="#tratamentos">
                Conheça os tratamentos
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-sage opacity-15 blur-2xl"
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 gold-divider" aria-hidden="true" />
    </section>
  );
}
