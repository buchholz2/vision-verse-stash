import { motion } from "framer-motion";
import { Heart, Target, Cpu, Smile } from "lucide-react";

const items = [
  { icon: Heart, title: "Atendimento humanizado", desc: "Escuta atenta, conforto e acolhimento em cada consulta." },
  { icon: Target, title: "Planejamento individualizado", desc: "Tratamento desenhado para o seu caso específico." },
  { icon: Cpu, title: "Tecnologia moderna", desc: "Recursos digitais e técnicas atuais para mais precisão." },
  { icon: Smile, title: "Estética, função e saúde", desc: "Resultado equilibrado entre beleza e funcionalidade." },
];

export function Differentials() {
  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* subtle accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, hsl(var(--primary-glow)/0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="container-narrow relative">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Diferenciais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.1]"
          >
            Um cuidado <span className="italic text-primary">de outro nível</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 text-center shadow-soft hover:shadow-elegant transition-shadow duration-500"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-sage text-primary-foreground shadow-soft">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-lg text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
