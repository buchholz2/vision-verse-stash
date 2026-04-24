import { motion } from "framer-motion";

const items = [
  {
    title: "Aparelhos convencionais",
    desc: "Tratamento clássico, eficaz para a maior parte dos casos ortodônticos.",
  },
  {
    title: "Aparelhos autoligados",
    desc: "Tecnologia moderna que pode reduzir o atrito e oferecer mais conforto.",
  },
  {
    title: "Aparelhos estéticos de cerâmica",
    desc: "Bráquetes discretos que se harmonizam com a cor natural dos dentes.",
  },
  {
    title: "Alinhadores Invisalign®",
    desc: "Alinhadores transparentes, removíveis e quase invisíveis para o dia a dia.",
  },
];

export function Orthodontics() {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-accent"
            >
              Especialidade · Ortodontia
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.1]"
            >
              Ortodontia moderna para <span className="italic text-primary">diferentes necessidades</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            O planejamento é sempre individualizado: a escolha do tratamento ideal depende
            de uma avaliação clínica detalhada, considerando a estética, a função e o
            conforto de cada paciente.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-soft hover:shadow-elegant transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <span className="font-serif text-3xl text-accent leading-none mt-1">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                </div>
              </div>
              <div
                className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                style={{ background: "hsl(var(--primary)/0.15)" }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
