import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, UserRound } from "lucide-react";
import sobreGabriel from "@/assets/photos/sobre-gabriel-recepcao.png";

const cards = [
  {
    icon: GraduationCap,
    title: "Formação Acadêmica",
    text: "Graduação em Odontologia pela FASURGS, atualmente ATITUS, e especialista em Ortodontia. CRO 29705.",
  },
  {
    icon: Stethoscope,
    title: "Experiência Clínica",
    text: "Mais de 5 anos de atuação na área odontológica, com foco em aparelhos ortodônticos, Invisalign® e miniimplantes.",
  },
  {
    icon: UserRound,
    title: "Atendimento Personalizado",
    text: "Planejamento individualizado, acompanhamento próximo e cuidado humanizado em todas as etapas do tratamento.",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-narrow grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
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
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-border/70 bg-card/95 px-5 py-4 shadow-card backdrop-blur-sm md:left-auto md:right-[-1.25rem] md:max-w-[230px]">
              <p className="font-serif text-4xl leading-none text-primary">5+</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                anos de experiência clínica
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
            className="mt-3 max-w-2xl font-serif text-4xl leading-[1.12] text-foreground md:text-5xl text-balance"
          >
            Um cuidado especializado <span className="italic text-primary">para o seu sorriso</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-3xl space-y-5 text-muted-foreground leading-relaxed text-pretty"
          >
            <p>
              Sou cirurgião-dentista, especialista em Ortodontia, com foco em ortodontia
              moderna, alinhadores Invisalign® e uso de miniimplantes. Atuo com planejamento
              individualizado para cada paciente, unindo estética, função e saúde bucal para
              resultados duradouros e naturais.
            </p>
            <p>
              Formado pela Faculdade Especializada na Área da Saúde do Rio Grande do Sul -
              FASURGS, atualmente ATITUS, e inscrito no Conselho Regional de Odontologia sob
              o nº 29705. Com experiência clínica em tratamentos ortodônticos e uso de
              tecnologias atuais, ofereço um atendimento humanizado, seguro e baseado em
              evidências científicas.
            </p>
          </motion.div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.58, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
              >
                <card.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-serif text-lg leading-tight text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
