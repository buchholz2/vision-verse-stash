import { motion } from "framer-motion";
import { GraduationCap, HeartHandshake, Stethoscope } from "lucide-react";
import sobreGabriel from "@/assets/photos/sobre-gabriel-recepcao.png";

const highlights = [
  {
    icon: GraduationCap,
    title: "Formação em Odontologia",
    text: "FASURGS, atualmente ATITUS",
  },
  {
    icon: Stethoscope,
    title: "Especialista em Ortodontia",
    text: "Invisalign®, aparelhos e miniimplantes",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento próximo",
    text: "Escuta, explicação clara e acompanhamento",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-narrow grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative rounded-[2.2rem] border border-border/70 bg-secondary/70 p-3 shadow-elegant">
            <img
              src={sobreGabriel}
              alt="Dr. Gabriel Paulo Rockenbach na recepção da clínica"
              className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-border/70 bg-card/95 px-6 py-5 shadow-card backdrop-blur-sm md:left-auto md:right-[-1.5rem] md:max-w-[245px]">
              <p className="font-serif text-5xl leading-none text-primary">5+</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                anos de experiência clínica em tratamentos odontológicos e ortodônticos
              </p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
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
            className="mt-3 max-w-2xl font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance"
          >
            Técnica, escuta e planejamento para um resultado{" "}
            <span className="italic text-primary">natural</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 grid gap-8 text-muted-foreground leading-relaxed text-pretty md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-5">
              <p>
                Sou cirurgião-dentista, especialista em Ortodontia, com foco em
                ortodontia moderna, alinhadores Invisalign® e uso de miniimplantes.
              </p>
              <p>
                Cada plano é construído a partir de diagnóstico, função, estética e
                rotina do paciente, com acompanhamento próximo do início ao fim.
              </p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-secondary/65 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Registro profissional</p>
              <p className="mt-3 font-serif text-2xl text-foreground">CRO 29705</p>
              <p className="mt-3 text-sm leading-relaxed">
                Formado pela FASURGS, atualmente ATITUS, com atuação clínica em
                ortodontia, estética e cuidado preventivo.
              </p>
            </div>
          </motion.div>

          <div className="mt-9 grid gap-3">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 border-b border-border/70 py-4 last:border-b-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-card text-primary shadow-soft">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-serif text-xl leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
