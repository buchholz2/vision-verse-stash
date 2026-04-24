import { motion } from "framer-motion";
import { DecorBackground } from "@/components/DecorBackground";
import {
  Sparkles,
  Sun,
  Wrench,
  Layers,
  Crown,
  Scissors,
} from "lucide-react";

const items = [
  { icon: Sparkles, title: "Profilaxia", desc: "Limpeza profissional para prevenção e saúde bucal." },
  { icon: Sun, title: "Clareamento", desc: "Tratamento estético para um sorriso mais luminoso." },
  { icon: Wrench, title: "Restaurações", desc: "Recuperação de dentes com materiais modernos e duradouros." },
  { icon: Layers, title: "Facetas", desc: "Reabilitação estética avançada para um sorriso harmônico." },
  { icon: Crown, title: "Próteses", desc: "Reabilitação funcional e estética para repor dentes ausentes." },
  { icon: Scissors, title: "Exodontia de sisos", desc: "Procedimento seguro com planejamento e conforto." },
];

export function Treatments() {
  return (
    <section id="tratamentos" className="relative py-24 md:py-32 bg-gradient-soft overflow-hidden">
      <DecorBackground variant="soft" showWatermark />
      <div className="container-narrow relative z-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Tratamentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.1]"
          >
            Como posso <span className="italic text-primary">te ajudar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Diferentes tratamentos odontológicos para cuidar da saúde, estética e
            alinhamento do seu sorriso, com planejamento individualizado para cada caso.
          </motion.p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 ease-smooth"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              <div className="absolute inset-x-7 bottom-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
