import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula M.",
    role: "Paciente há 2 anos",
    text: "O Dr. Gabriel explicou cada etapa do meu tratamento com muita clareza. O resultado com o Invisalign superou todas as minhas expectativas. Meu sorriso mudou completamente!",
    rating: 5,
    initials: "AP",
    color: "hsl(210 42% 28%)",
  },
  {
    name: "Carlos Eduardo R.",
    role: "Paciente · Tratamento ortodôntico",
    text: "Profissional incrível, atencioso e técnico. Me sentei na cadeira pela primeira vez com muito medo e saí com total confiança no tratamento. Recomendo demais!",
    rating: 5,
    initials: "CE",
    color: "hsl(38 62% 55%)",
  },
  {
    name: "Fernanda S.",
    role: "Paciente · Facetas e clareamento",
    text: "Fiz facetas e clareamento com o Dr. Gabriel e o resultado ficou absolutamente natural. Ele tem um olhar estético muito apurado e escutou tudo o que eu queria.",
    rating: 5,
    initials: "FS",
    color: "hsl(210 42% 28%)",
  },
  {
    name: "Rafael A.",
    role: "Paciente · Aparelho autoligado",
    text: "O atendimento do consultório é impecável desde o primeiro contato. Hoje morro de sorriso — literalmente! Recomendo o Dr. Gabriel sem hesitar para toda a família.",
    rating: 5,
    initials: "RA",
    color: "hsl(38 62% 55%)",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(168deg, hsl(40 30% 97%) 0%, hsl(210 30% 96%) 40%, hsl(210 35% 94%) 100%)" }}
    >
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 blue-divider opacity-50" aria-hidden="true" />

      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, hsl(210 40% 88%) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(hsl(210 30% 40%) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        aria-hidden="true"
      />

      {/* Decorative large quote */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-serif text-[200px] leading-none text-primary/5"
        aria-hidden="true"
      >
        "
      </div>

      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Depoimentos</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance">
            O que nossos pacientes{" "}
            <span className="italic text-primary">dizem</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-14 mx-auto max-w-3xl">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-8 shadow-[0_8px_48px_hsl(210_20%_70%/0.25)] md:p-12"
            >
              {/* Quote icon */}
              <div className="absolute right-8 top-8 opacity-10">
                <Quote className="h-16 w-16 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote text */}
              <p className="mt-6 font-serif text-2xl leading-relaxed text-foreground md:text-[1.65rem] text-pretty">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white shadow-card"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="h-2 rounded-full transition-all duration-400"
                  style={{
                    width: i === current ? "2rem" : "0.5rem",
                    background: i === current ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/8 hover:text-primary"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/8 hover:text-primary"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
            </div>
            <span>5.0 · Avaliação geral</span>
          </div>
          <div className="h-px w-8 bg-border sm:h-4 sm:w-px" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">+500 pacientes atendidos</span>
          <div className="h-px w-8 bg-border sm:h-4 sm:w-px" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">Ijuí/RS · CRO 29705</span>
        </motion.div>
      </div>
    </section>
  );
}
