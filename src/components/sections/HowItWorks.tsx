import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import consultaPlanejamento from "@/assets/photos/consulta-planejamento.png";

const steps = [
  {
    title: "Primeiro contato",
    desc: "Você envia uma mensagem pelo WhatsApp e compartilha sua necessidade ou dúvida inicial.",
  },
  {
    title: "Avaliação clínica",
    desc: "É realizada uma consulta completa para entender seu caso, histórico e objetivos com o tratamento.",
  },
  {
    title: "Planejamento personalizado",
    desc: "Com base no diagnóstico, é definido o melhor caminho: ortodontia, alinhadores, estética, prevenção ou outro cuidado indicado.",
  },
  {
    title: "Acompanhamento do sorriso",
    desc: "Durante o tratamento, cada etapa é acompanhada de forma próxima, segura e humanizada.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Como funciona
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance"
          >
            Sua jornada para um <span className="italic text-primary">novo sorriso</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Um processo simples, acolhedor e planejado para que você entenda cada etapa do seu tratamento.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <ol className="relative grid gap-4 before:absolute before:left-6 before:top-8 before:bottom-8 before:w-px before:bg-border/80 md:gap-5">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.58, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-[3rem_1fr] gap-4 rounded-[1.4rem] border border-border/70 bg-card/90 p-5 shadow-soft transition-all duration-500 hover:shadow-card"
                >
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background font-serif text-xl text-primary shadow-soft">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">Etapa {index + 1}</p>
                    <h3 className="mt-1 font-serif text-2xl leading-tight text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-8"
            >
              <WhatsAppButton size="lg">Agendar avaliação pelo WhatsApp</WhatsAppButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2.2rem] border border-border/70 bg-secondary/70 p-3 shadow-elegant">
              <img
                src={consultaPlanejamento}
                alt="Dr. Gabriel explicando o planejamento do tratamento para paciente"
                className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
