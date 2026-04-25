import { motion } from "framer-motion";
import atendimentoClinico from "@/assets/photos/real/gabriel-cuidado-clinica.jpg";

const highlights = [
  "Explicação clara do tratamento",
  "Conforto durante o atendimento",
  "Planejamento individualizado",
];

export function HumanizedCare() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-24 md:py-32">
      <div className="container-wide grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-[2.4rem] border border-border/70 bg-card/70 p-3 shadow-elegant">
            <img
              src={atendimentoClinico}
              alt="Dr. Gabriel em consultório odontológico"
              className="aspect-[5/4] w-full rounded-[1.9rem] object-cover object-[center_24%]"
              loading="lazy"
            />
            <div className="absolute bottom-7 left-7 rounded-3xl border border-white/40 bg-card/90 p-5 shadow-card backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Experiência clínica</p>
              <p className="mt-2 font-serif text-2xl text-foreground">Cuidado explicado etapa por etapa</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Cuidado humanizado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl font-serif text-4xl leading-[1.08] text-foreground md:text-6xl text-balance"
          >
            Cuidado próximo, seguro e <span className="italic text-primary">personalizado</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty"
          >
            Cada sorriso tem uma história. Por isso, o atendimento é conduzido com escuta,
            planejamento e explicação clara de cada etapa, para que o paciente se sinta seguro
            antes, durante e depois do tratamento.
          </motion.p>

          <div className="mt-9 border-y border-border/70">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between gap-5 border-b border-border/70 py-5 last:border-b-0"
              >
                <span className="font-medium text-foreground">{item}</span>
                <span className="h-px w-10 shrink-0 bg-accent/70" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
