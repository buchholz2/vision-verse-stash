import { motion } from "framer-motion";
import { DecorBackground } from "@/components/DecorBackground";

const treatments = [
  {
    title: "Profilaxia",
    desc: "Limpeza profissional para prevenção, saúde gengival e manutenção do sorriso.",
    benefit: "Prevenção e cuidado contínuo.",
  },
  {
    title: "Clareamento",
    desc: "Tratamento estético para deixar o sorriso mais luminoso com segurança.",
    benefit: "Estética com orientação profissional.",
  },
  {
    title: "Restaurações",
    desc: "Recuperação de dentes com materiais modernos, buscando função e naturalidade.",
    benefit: "Saúde e estética dental.",
  },
  {
    title: "Facetas",
    desc: "Reabilitação estética para melhorar forma, cor e harmonia do sorriso.",
    benefit: "Harmonia estética.",
  },
  {
    title: "Próteses",
    desc: "Reabilitação funcional e estética para repor dentes ausentes.",
    benefit: "Função e confiança.",
  },
  {
    title: "Exodontia de Sisos",
    desc: "Procedimento planejado com foco em segurança, conforto e recuperação.",
    benefit: "Planejamento e cuidado.",
  },
];

const orthodonticTreatments = [
  "Aparelhos convencionais",
  "Aparelhos autoligados",
  "Aparelhos estéticos de cerâmica",
  "Alinhadores Invisalign®",
];

export function Treatments() {
  return (
    <section id="tratamentos" className="relative overflow-hidden bg-gradient-soft py-24 md:py-32">
      <DecorBackground variant="soft" />
      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-xs uppercase tracking-[0.2em] text-accent"
            >
              Tratamentos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 max-w-2xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance"
            >
              Cuidado completo para a <span className="italic text-primary">saúde do sorriso</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Tratamentos odontológicos planejados para prevenção, estética, função e
            reabilitação, sempre com indicação individualizada.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.58, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-card/95 p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-7 flex items-center justify-between border-b border-border/70 pb-5">
                <span className="font-serif text-3xl leading-none text-accent/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-16 bg-accent/35" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl leading-tight text-foreground">{item.title}</h3>
              <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <div className="mt-6 rounded-full bg-secondary/75 px-4 py-2 text-sm font-medium text-primary">
                {item.benefit}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-[2rem] border border-primary/15 bg-primary p-6 text-primary-foreground shadow-elegant md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.2em] text-accent">
                Foco em alinhamento
              </span>
              <h3 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                Tratamentos ortodônticos
              </h3>
              <p className="mt-3 text-primary-foreground/80 leading-relaxed">
                Opções modernas para alinhar o sorriso com conforto, estética e planejamento individualizado.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {orthodonticTreatments.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-4"
                >
                  <span className="font-serif text-2xl text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium text-primary-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
