import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Heart } from "lucide-react";
import sobreGabriel from "@/assets/photos/real/gabriel-sobre-sofa.jpg";

const highlights = [
  { icon: GraduationCap, title: "Formação em Odontologia", text: "FASURGS, atualmente ATITUS" },
  { icon: Award, title: "Especialista em Ortodontia", text: "Invisalign®, aparelhos e miniimplantes" },
  { icon: Heart, title: "Atendimento próximo", text: "Escuta, explicação clara e acompanhamento" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves up slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  // Background radial blob drifts
  const blobX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={sectionRef} id="sobre" className="relative overflow-hidden bg-background py-24 md:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 30% 50%, hsl(210 42% 28%) 0%, transparent 70%)",
          x: blobX,
        }}
        aria-hidden="true"
      />

      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        {/* Image — parallax */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div ref={imgWrapRef} className="relative rounded-[2.4rem] border border-border/60 bg-secondary/50 p-3 shadow-deep">
            <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/70 pointer-events-none" aria-hidden="true" />

            {/* Image inner container — clip overflow for parallax */}
            <div className="aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[1.9rem]">
              <motion.img
                src={sobreGabriel}
                alt="Dr. Gabriel Paulo Rockenbach em retrato institucional"
                className="h-[115%] w-full object-cover object-[center_34%]"
                style={{ y: imgY }}
                loading="lazy"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-7 left-6 right-6 glass-card rounded-2xl px-6 py-5 shadow-elegant md:left-auto md:right-[-1.5rem] md:max-w-[280px]"
            >
              <div className="flex items-center gap-4">
                <p className="font-serif text-5xl leading-none text-primary">5+</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Anos</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">de experiência clínica</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Orthodontia, estética e cuidado individualizado
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-7 lg:mt-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Sobre · Dr. Gabriel
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl font-serif text-4xl leading-[1.06] text-foreground md:text-6xl text-balance"
          >
            Técnica, escuta e planejamento para um resultado{" "}
            <span className="italic text-primary">natural</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-8 grid gap-6 text-muted-foreground leading-relaxed text-pretty xl:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="space-y-5 text-base md:text-lg">
              <p>
                Sou cirurgião-dentista, especialista em Ortodontia, com foco em
                ortodontia moderna, alinhadores Invisalign® e uso de miniimplantes.
              </p>
              <p>
                Cada plano é construído a partir de diagnóstico, função, estética e
                rotina do paciente, com acompanhamento próximo do início ao fim.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-border/60 bg-secondary/50 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Registro profissional</p>
              <p className="mt-3 font-serif text-2xl text-foreground">CRO 29705</p>
              <div className="mt-3 h-px bg-border/60" />
              <p className="mt-3 text-sm leading-relaxed">
                Formado pela FASURGS, atualmente ATITUS, com atuação clínica em
                ortodontia, estética e cuidado preventivo.
              </p>
            </div>
          </motion.div>

          <div className="mt-10 space-y-0 divide-y divide-border/60 border-y border-border/60">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
                  <item.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
