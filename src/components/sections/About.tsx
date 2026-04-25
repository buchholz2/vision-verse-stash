import { motion } from "framer-motion";
import sobreGabriel from "@/assets/photos/real/gabriel-sobre-sofa.jpg";

const highlights = [
  {
    title: "Formação em Odontologia",
    text: "FASURGS, atualmente ATITUS",
  },
  {
    title: "Especialista em Ortodontia",
    text: "Invisalign®, aparelhos e miniimplantes",
  },
  {
    title: "Atendimento próximo",
    text: "Escuta, explicação clara e acompanhamento",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative rounded-[2.4rem] border border-border/70 bg-secondary/70 p-3 shadow-elegant">
            <img
              src={sobreGabriel}
              alt="Dr. Gabriel Paulo Rockenbach em retrato institucional"
              className="aspect-[5/4] w-full rounded-[1.9rem] object-cover object-[center_34%] lg:aspect-[4/5]"
              loading="lazy"
            />
            <div className="absolute -bottom-7 left-7 right-7 rounded-[1.7rem] border border-border/70 bg-card/95 px-6 py-5 shadow-card backdrop-blur-sm md:left-auto md:right-[-1.5rem] md:max-w-[290px]">
              <div className="flex items-end gap-4">
                <p className="font-serif text-6xl leading-none text-primary">5+</p>
                <p className="pb-1 text-sm font-medium uppercase tracking-[0.16em] text-accent">
                  anos
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                experiência clínica com foco em odontologia, ortodontia e atendimento individualizado
              </p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-6">
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
            initial={{ opacity: 0, y: 16 }}
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
            <div className="rounded-[1.7rem] border border-border/70 bg-secondary/65 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Registro profissional</p>
              <p className="mt-3 font-serif text-2xl text-foreground">CRO 29705</p>
              <p className="mt-3 text-sm leading-relaxed">
                Formado pela FASURGS, atualmente ATITUS, com atuação clínica em
                ortodontia, estética e cuidado preventivo.
              </p>
            </div>
          </motion.div>

          <div className="mt-10 border-y border-border/70">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-2 border-b border-border/70 py-5 last:border-b-0 md:grid-cols-[13rem_1fr]"
              >
                <div>
                  <h3 className="font-serif text-xl leading-tight text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-right">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
