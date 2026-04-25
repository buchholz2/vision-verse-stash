import { motion } from "framer-motion";
import { Braces, CircleDot, ScanLine, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import especialidadeAlinhadores from "@/assets/photos/real/gabriel-especialidade-clinica.jpg";

const specialtyItems = [
  {
    icon: Sparkles,
    title: "Alinhadores Invisalign®",
    desc: "Transparentes, removíveis e discretos para uma rotina mais confortável.",
  },
  {
    icon: ScanLine,
    title: "Planejamento digital",
    desc: "Mais clareza para visualizar caminhos, fases e acompanhamento.",
  },
  {
    icon: CircleDot,
    title: "Miniimplantes ortodônticos",
    desc: "Recursos auxiliares para movimentos mais precisos em casos selecionados.",
  },
  {
    icon: Braces,
    title: "Aparelhos modernos",
    desc: "Opções convencionais, autoligadas e estéticas conforme cada necessidade.",
  },
];

export function Orthodontics() {
  return (
    <section id="ortodontia" className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      <div className="absolute inset-x-0 top-0 gold-divider opacity-70" aria-hidden="true" />

      <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-[2.2rem] border border-primary-foreground/15 bg-primary-foreground/8 p-3 shadow-elegant">
            <img
              src={especialidadeAlinhadores}
              alt="Dr. Gabriel em ambiente clínico odontológico"
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[center_32%]"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.28em] text-accent"
          >
            O foco é ortodontia
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] md:text-7xl text-balance"
          >
            Alinhar o sorriso sem perder a{" "}
            <span className="italic text-accent">naturalidade.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/82 text-pretty"
          >
            A especialidade do Dr. Gabriel une diagnóstico cuidadoso, recursos digitais
            e escolhas terapêuticas indicadas para cada caso.
          </motion.p>

          <div className="mt-10 border-y border-primary-foreground/16">
            {specialtyItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 border-b border-primary-foreground/16 py-6 last:border-b-0 md:grid-cols-[3rem_1fr]"
              >
                <item.icon className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/72 md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-10"
          >
            <WhatsAppButton
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15"
            >
              Quero avaliar meu caso
            </WhatsAppButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
