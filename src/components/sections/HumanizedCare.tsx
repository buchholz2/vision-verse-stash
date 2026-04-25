import { motion } from "framer-motion";
import { ClipboardCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import atendimentoClinico from "@/assets/photos/atendimento-clinico.png";

const highlights = [
  { icon: ClipboardCheck, title: "Explicação clara do tratamento" },
  { icon: ShieldCheck, title: "Conforto durante o atendimento" },
  { icon: HeartHandshake, title: "Planejamento individualizado" },
];

export function HumanizedCare() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-24 md:py-32">
      <div className="container-narrow grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <div className="rounded-[2.2rem] border border-border/70 bg-card/70 p-3 shadow-elegant">
            <img
              src={atendimentoClinico}
              alt="Atendimento clínico humanizado conduzido pelo Dr. Gabriel"
              className="aspect-[4/5] w-full rounded-[1.7rem] object-cover md:aspect-[5/4] lg:aspect-[4/5]"
              loading="lazy"
            />
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
            Cuidado humanizado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance"
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

          <div className="mt-8 grid gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card/90 px-5 py-4 shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-foreground">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
