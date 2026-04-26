import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Shield, LayoutList } from "lucide-react";
import atendimentoClinico from "@/assets/photos/real/gabriel-cuidado-clinica.jpg";

const highlights = [
  { icon: MessageSquare, title: "Explicação clara",     desc: "Cada etapa do tratamento é apresentada de forma acessível e transparente." },
  { icon: Shield,        title: "Conforto garantido",   desc: "Protocolos pensados para minimizar desconforto durante o atendimento." },
  { icon: LayoutList,    title: "Plano individualizado", desc: "Soluções construídas com base no perfil, rotina e objetivos de cada paciente." },
];

export function HumanizedCare() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY  = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const blobX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={sectionRef}
      id="cuidado"
      className="relative scroll-mt-24 overflow-hidden bg-background py-24 md:scroll-mt-28 md:py-32"
    >
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 opacity-[0.04]"
        style={{ background: "radial-gradient(circle, hsl(210 42% 28%) 0%, transparent 65%)", x: blobX }}
        aria-hidden="true"
      />

      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">

        {/* ——— Content — LEFT ——— */}
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Cuidado humanizado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl font-serif text-4xl leading-[1.08] text-foreground md:text-6xl text-balance"
          >
            Cuidado próximo, seguro e{" "}
            <span className="italic text-primary">personalizado</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty"
          >
            Cada sorriso tem uma história. Por isso, o atendimento é conduzido com escuta,
            planejamento e explicação clara de cada etapa, para que o paciente se sinta seguro
            antes, durante e depois do tratamento.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-soft card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-8 flex items-center gap-5 rounded-2xl border border-border/50 bg-secondary/60 px-6 py-4"
          >
            <div className="h-10 w-1 rounded-full bg-accent/70 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-accent">CRO 29705 · Ijuí/RS</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Especialista em Ortodontia formado pela FASURGS (ATITUS)
              </p>
            </div>
          </motion.div>
        </div>

        {/* ——— Image — RIGHT (flipped) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto max-w-[540px] overflow-hidden rounded-[2.4rem] border border-border/60 bg-card/70 p-3 shadow-deep lg:mx-0">
            <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/60 pointer-events-none" aria-hidden="true" />
            <div className="aspect-[4/5] overflow-hidden rounded-[1.9rem]">
              <motion.img
                src={atendimentoClinico}
                alt="Dr. Gabriel em consultório odontológico"
                className="h-[115%] w-full object-cover object-[center_12%]"
                style={{ y: imgY }} loading="lazy"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-7 left-6 right-6 glass-card rounded-2xl px-5 py-4 shadow-elegant"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Experiência clínica</p>
              <p className="mt-1.5 font-serif text-xl leading-tight text-foreground">
                Cuidado explicado etapa por etapa
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
