import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import especialidadeAlinhadores from "@/assets/photos/especialidade-alinhadores.png";

const specialtyCards = [
  {
    title: "Alinhadores Invisalign®",
    desc: "Alinhadores transparentes, removíveis e discretos para uma rotina mais confortável.",
  },
  {
    title: "Planejamento digital",
    desc: "Visualização mais clara do tratamento, com previsibilidade e acompanhamento.",
  },
  {
    title: "Miniimplantes ortodônticos",
    desc: "Recursos auxiliares para movimentos mais precisos em casos selecionados.",
  },
  {
    title: "Aparelhos modernos",
    desc: "Opções convencionais, autoligadas e estéticas conforme cada necessidade.",
  },
];

export function Orthodontics() {
  return (
    <section
      id="ortodontia"
      className="relative overflow-hidden bg-[hsl(120_16%_94%)] py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 gold-divider opacity-60" aria-hidden="true" />
      <div className="container-narrow grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-[2.2rem] border border-primary/15 bg-card/60 p-3 shadow-elegant">
            <img
              src={especialidadeAlinhadores}
              alt="Dr. Gabriel apresentando alinhador transparente e planejamento digital"
              className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-primary/70">
            Invisalign® · planejamento digital · ortodontia moderna
          </p>
        </motion.div>

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
            className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance"
          >
            Ortodontia moderna com <span className="italic text-primary">planejamento digital</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-2xl text-muted-foreground leading-relaxed text-pretty"
          >
            A especialidade do Dr. Gabriel é transformar o alinhamento do sorriso com
            técnicas atuais, diagnóstico cuidadoso e planos personalizados para cada paciente.
          </motion.p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {specialtyCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-primary/15 bg-card/80 p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-start gap-5">
                  <span className="font-serif text-2xl leading-none text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl leading-tight text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-9"
          >
            <WhatsAppButton size="lg">Quero avaliar meu caso</WhatsAppButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
