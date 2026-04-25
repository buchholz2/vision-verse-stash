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
    desc: "Consulta completa para entender seu caso, histórico e objetivos com o tratamento.",
  },
  {
    title: "Plano individual",
    desc: "O melhor caminho é definido com base no diagnóstico: ortodontia, alinhadores, estética ou prevenção.",
  },
  {
    title: "Acompanhamento",
    desc: "Cada etapa é acompanhada de forma próxima, segura e humanizada.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
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
              className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance"
            >
              Uma jornada clara para você entender cada{" "}
              <span className="italic text-primary">decisão do tratamento</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Do primeiro contato ao acompanhamento, o processo é pensado para trazer
            previsibilidade, acolhimento e segurança.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-secondary/70 p-3 shadow-elegant">
              <img
                src={consultaPlanejamento}
                alt="Dr. Gabriel explicando o planejamento do tratamento para paciente"
                className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/40 bg-card/90 p-5 shadow-card backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">Planejamento</p>
                <p className="mt-2 font-serif text-2xl leading-tight text-foreground">
                  Clareza antes de iniciar
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <ol className="relative border-l border-border/80 pl-6 md:pl-9">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.58, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pb-9 last:pb-0"
                >
                  <span className="absolute -left-[2.05rem] top-1 h-4 w-4 rounded-full border border-accent/50 bg-background shadow-soft md:-left-[2.58rem]" />
                  <div className="grid gap-3 md:grid-cols-[8rem_1fr] md:gap-8">
                    <p className="font-serif text-4xl leading-none text-accent/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-10"
            >
              <WhatsAppButton size="lg">Agendar avaliação pelo WhatsApp</WhatsAppButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
