import { motion } from "framer-motion";
import { BadgeCheck, Braces, CircleDot, ScanLine, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import especialidadeAlinhadores from "@/assets/photos/especialidade-alinhadores.png";

const specialtyBlocks = [
  {
    icon: Sparkles,
    title: "Alinhadores Invisalign®",
    desc: "Alinhadores transparentes, removíveis e discretos para uma rotina mais confortável.",
    className: "md:col-span-2 bg-primary text-primary-foreground",
  },
  {
    icon: ScanLine,
    title: "Planejamento Digital",
    desc: "Mais clareza para visualizar caminhos, acompanhar fases e decidir com previsibilidade.",
    className: "bg-card/90",
  },
  {
    icon: CircleDot,
    title: "Miniimplantes Ortodônticos",
    desc: "Recursos auxiliares para movimentos mais precisos em casos selecionados.",
    className: "bg-[hsl(42_30%_96%)]",
  },
  {
    icon: Braces,
    title: "Aparelhos Modernos",
    desc: "Opções convencionais, autoligadas e estéticas conforme cada necessidade.",
    className: "md:col-span-2 bg-card/90",
  },
];

export function Orthodontics() {
  return (
    <section id="ortodontia" className="relative overflow-hidden bg-[hsl(120_16%_94%)] py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 gold-divider opacity-60" aria-hidden="true" />
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary shadow-soft"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-accent" />
              Especialidade · Ortodontia moderna
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-3xl font-serif text-4xl leading-[1.06] text-foreground md:text-6xl text-balance"
            >
              Uma vitrine de ortodontia feita para unir{" "}
              <span className="italic text-primary">estética, função e tecnologia</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            O foco do Dr. Gabriel é planejar o alinhamento do sorriso com diagnóstico
            cuidadoso, recursos digitais e escolhas terapêuticas indicadas para cada caso.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-[2.35rem] border border-primary/15 bg-card/60 p-3 shadow-elegant">
              <img
                src={especialidadeAlinhadores}
                alt="Dr. Gabriel apresentando alinhador transparente e planejamento digital"
                className="aspect-[4/5] w-full rounded-[1.9rem] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[0.68rem] uppercase tracking-[0.16em] text-primary/70">
              <span>Invisalign®</span>
              <span>Digital</span>
              <span>Precisão</span>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
            {specialtyBlocks.map((block, index) => (
              <motion.article
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                className={`${block.className} group relative overflow-hidden rounded-[1.75rem] border border-primary/15 p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl leading-tight">{block.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-80">{block.desc}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-current/15 bg-current/5">
                    <block.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-7 h-px w-full bg-current/10" />
                <p className="mt-4 text-xs uppercase tracking-[0.16em] opacity-65">
                  Planejamento individualizado
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-10 flex justify-center"
        >
          <WhatsAppButton size="lg">Quero avaliar meu caso</WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
}
