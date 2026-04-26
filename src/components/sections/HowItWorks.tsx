import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Stethoscope, FileText, HeartHandshake } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import consultaPlanejamento from "@/assets/photos/real/gabriel-planejamento-mesa.jpg";

const steps = [
  { icon: MessageCircle, title: "Primeiro contato", desc: "Você envia uma mensagem pelo WhatsApp e compartilha sua necessidade ou dúvida inicial." },
  { icon: Stethoscope, title: "Avaliação clínica", desc: "Consulta completa para entender seu caso, histórico e objetivos com o tratamento." },
  { icon: FileText, title: "Plano individual", desc: "O melhor caminho é definido com base no diagnóstico: ortodontia, alinhadores, estética ou prevenção." },
  { icon: HeartHandshake, title: "Acompanhamento", desc: "Cada etapa é acompanhada de forma próxima, segura e humanizada." },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  // Dot pattern drifts opposite direction
  const dotsY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--gradient-soft)" }}
    >
      <div className="absolute inset-x-0 top-0 blue-divider opacity-60" aria-hidden="true" />

      {/* Dots — scroll drift */}
      <motion.div
        className="pointer-events-none absolute inset-0 dot-pattern opacity-50"
        style={{ y: dotsY }}
        aria-hidden="true"
      />

      <div className="container-wide relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-xs uppercase tracking-[0.2em] text-accent"
            >
              Como funciona
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance"
            >
              Uma jornada clara para você entender cada{" "}
              <span className="italic text-primary">decisão do tratamento</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Do primeiro contato ao acompanhamento, o processo é pensado para trazer
            previsibilidade, acolhimento e segurança em cada etapa.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-[2.4rem] border border-border/60 bg-card shadow-deep lg:grid-cols-12">
          {/* Image — parallax */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[480px] overflow-hidden">
              <motion.img
                src={consultaPlanejamento}
                alt="Dr. Gabriel em momento de planejamento clínico"
                className="absolute inset-0 h-[115%] w-full object-cover object-[center_34%]"
                style={{ y: imgY }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(210 42% 18% / 0.6) 0%, transparent 50%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-7 left-7 right-7 glass-dark rounded-2xl px-6 py-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Planejamento</p>
                <p className="mt-1.5 font-serif text-xl leading-tight text-white">Clareza antes de iniciar</p>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <div className="lg:col-span-7 p-7 md:p-12">
            <ol className="space-y-0">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex gap-6 pb-10 last:pb-0"
                >
                  {index < steps.length - 1 && (
                    <div
                      className="absolute left-[23px] top-12 w-[2px] flex-none"
                      style={{
                        height: "calc(100% - 2.5rem)",
                        background: "linear-gradient(to bottom, hsl(210 42% 28% / 0.4), hsl(38 62% 55% / 0.2))",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/8 text-primary shadow-card transition-all duration-400 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                    <step.icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white shadow-soft">
                      {index + 1}
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-serif text-xl leading-tight text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-10 border-t border-border/50 pt-8"
            >
              <WhatsAppButton size="lg">Agendar avaliação pelo WhatsApp</WhatsAppButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
