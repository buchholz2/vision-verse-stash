import { motion } from "framer-motion";
import { MessageCircle, Stethoscope, Smile } from "lucide-react";
import { DecorBackground } from "@/components/DecorBackground";

const steps = [
  {
    icon: MessageCircle,
    title: "Entre em contato",
    desc:
      "Preencha o formulário ou envie uma mensagem. Vou entender suas necessidades e agendar o melhor horário para sua avaliação.",
  },
  {
    icon: Stethoscope,
    title: "Avaliação inicial",
    desc:
      "Realizamos uma consulta completa para diagnóstico e planejamento do seu tratamento, definindo a melhor abordagem para o seu caso.",
  },
  {
    icon: Smile,
    title: "Transformação do sorriso",
    desc:
      "Com acompanhamento contínuo e técnicas modernas, você alcança um sorriso alinhado, funcional e esteticamente harmônico.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 bg-gradient-soft overflow-hidden">
      <DecorBackground variant="soft" />
      <div className="container-narrow relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Como funciona
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.1]"
          >
            Sua jornada para um <span className="italic text-primary">novo sorriso</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Um processo simples e acolhedor para você dar o primeiro passo rumo
            ao seu melhor sorriso.
          </motion.p>
        </div>

        <div className="mt-16 relative">
          {/* connecting line */}
          <div
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            aria-hidden="true"
          />
          <ol className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <div className="mx-auto relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-card border border-border shadow-card">
                  <s.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-gold text-xs font-medium text-primary-foreground flex items-center justify-center shadow-gold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
