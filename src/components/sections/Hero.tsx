import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import heroGabriel from "@/assets/photos/real/gabriel-hero-clinica.jpg";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const proof = [
  { label: "Invisalign® Provider", icon: CheckCircle2 },
  { label: "Planejamento digital", icon: CheckCircle2 },
  { label: "Atendimento humanizado", icon: CheckCircle2 },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = Math.ceil(target / (1400 / 16));
    const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(s); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref} className="stat-counter">{count}{suffix}</span>;
}

const stats = [
  { label: "Anos de experiência", value: 5, suffix: "+" },
  { label: "Pacientes atendidos", value: 500, suffix: "+" },
  { label: "Satisfação dos pacientes", value: 98, suffix: "%" },
];


export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const photoY      = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY       = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const blobY       = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const badgeBottomY = useTransform(scrollYProgress, [0, 1], ["0px", "-24px"]);
  const badgeTopY   = useTransform(scrollYProgress, [0, 1], ["0px", "16px"]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate flex min-h-screen flex-col overflow-hidden pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >

      {/* Subtle ambient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-[-10%] h-[600px] w-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(210 42% 28%) 0%, transparent 70%)", y: blobY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, hsl(38 62% 55%) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Decorative ring circles */}
      <div className="pointer-events-none absolute -left-28 top-20 h-[420px] w-[420px] rounded-full border border-primary/5" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-44 top-4 h-[580px] w-[580px] rounded-full border border-primary/4" aria-hidden="true" />

      <div className="absolute inset-x-0 top-24 h-px bg-border/50" aria-hidden="true" />

      {/* Main content */}
      <div className="container-wide flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:py-16">

          {/* Left — text */}
          <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6 xl:col-span-5">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Ortodontia moderna em Ijuí/RS
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[720px] font-serif text-6xl leading-[0.93] text-foreground sm:text-7xl xl:text-[5.5rem] text-balance"
            >
              Ortodontia moderna em{" "}
              <em className="not-italic" style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                detalhes.
              </em>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty"
            >
              Invisalign®, planejamento digital e cuidado clínico individualizado para alinhar o sorriso com naturalidade e precisão.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <WhatsAppButton size="lg" className="w-full shadow-blue-glow hover:shadow-gold sm:w-auto">
                Agende sua avaliação
              </WhatsAppButton>
              <Button asChild size="lg" variant="outline"
                className="h-14 w-full rounded-full border-primary/20 bg-transparent px-8 text-base hover:bg-primary/6 hover:border-primary/40 hover:text-primary transition-all duration-400 sm:w-auto"
              >
                <a href="#ortodontia" className="flex items-center gap-2">
                  Ver especialidade <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {proof.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.48 }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-border/60 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="font-serif text-3xl font-normal text-primary leading-none md:text-4xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs leading-tight text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 lg:col-span-6 xl:col-span-7"
          >
            <div className="relative ml-auto max-w-[720px]">
              <div className="absolute -left-8 top-10 hidden h-[78%] w-px bg-accent/35 lg:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-border/60 bg-card p-3 shadow-deep">
                <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/40 pointer-events-none" aria-hidden="true" />
                <div className="h-[480px] overflow-hidden rounded-[1.9rem] md:h-[580px] lg:h-[640px] xl:h-[680px]">
                  <motion.img src={heroGabriel} alt="Dr. Gabriel Paulo Rockenbach em sua clínica"
                    className="h-[130%] w-full object-cover object-[center_24%]"
                    style={{ y: photoY }} loading="eager"
                  />
                </div>
                {/* CRO badge */}
                <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ y: badgeBottomY }}
                  className="absolute bottom-10 left-7 glass-card rounded-2xl px-5 py-4 shadow-elegant"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/15">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">CRO 29705</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">Cirurgião-dentista · Ortodontia</p>
                    </div>
                  </div>
                </motion.div>
                {/* Stars badge */}
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ y: badgeTopY }}
                  className="absolute right-7 top-8 glass-card rounded-2xl px-4 py-3 shadow-card"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}
                  </div>
                  <p className="mt-1 text-[11px] font-medium text-foreground">Invisalign® Provider</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
