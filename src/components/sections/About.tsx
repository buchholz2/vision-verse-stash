import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, UserRound } from "lucide-react";
import drCamisa from "@/assets/photos/dr-camisa-branca.png";

const cards = [
  {
    icon: GraduationCap,
    title: "Formação Acadêmica",
    text:
      "Graduação em Odontologia pela Faculdade Especializada na Área da Saúde do Rio Grande do Sul – FASURGS, atualmente ATITUS, e especialista em Ortodontia. CRO 29705.",
  },
  {
    icon: Stethoscope,
    title: "Experiência Clínica",
    text:
      "Atuo na área odontológica há mais de 5 anos, com foco em aparelhos ortodônticos, alinhadores Invisalign® e uso de miniimplantes — tratamentos mais eficientes e confortáveis.",
  },
  {
    icon: UserRound,
    title: "Atendimento Personalizado",
    text:
      "Atendimento humanizado e individualizado, com planejamento digital e acompanhamento próximo para garantir segurança, conforto e excelentes resultados.",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-background">
      <div className="container-narrow grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-sage opacity-10 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={drCamisa}
              alt="Dr. Gabriel Rockenbach em retrato profissional, com camisa branca"
              className="relative rounded-[2rem] w-full aspect-[4/5] object-cover shadow-elegant border border-border/60"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-card rounded-2xl shadow-card border border-border/60 px-5 py-4 max-w-[220px]">
              <p className="font-serif text-3xl text-primary leading-none">5+</p>
              <p className="text-xs text-muted-foreground mt-1">anos de experiência clínica em ortodontia</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Sobre · Dr. Gabriel
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.1]"
          >
            Um cuidado especializado <span className="italic text-primary">para o seu sorriso</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-pretty"
          >
            <p>
              Sou cirurgião-dentista, especialista em Ortodontia, com foco em ortodontia
              moderna, alinhadores Invisalign® e uso de miniimplantes. Atuo com planejamento
              individualizado para cada paciente, unindo estética, função e saúde bucal para
              resultados duradouros e naturais.
            </p>
            <p>
              Formado pela Faculdade Especializada na Área da Saúde do Rio Grande do Sul –
              FASURGS, atualmente ATITUS, e inscrito no Conselho Regional de Odontologia sob
              o nº 29705. Com experiência clínica em tratamentos ortodônticos e uso de
              tecnologias atuais, ofereço um atendimento humanizado, seguro e baseado em
              evidências científicas, sempre priorizando o conforto e a confiança em todas
              as etapas do tratamento.
            </p>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft hover:shadow-card transition-shadow duration-500"
              >
                <c.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-serif text-lg text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
