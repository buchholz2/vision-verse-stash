import { motion } from "framer-motion";
import { Braces, Crown, Layers, Scissors, ShieldCheck, Sun, Wrench } from "lucide-react";
import { DecorBackground } from "@/components/DecorBackground";
import consultaPlanejamento from "@/assets/photos/consulta-planejamento.png";

const treatments = [
  {
    icon: ShieldCheck,
    area: "Prevenção",
    title: "Profilaxia",
    desc: "Limpeza profissional para prevenção, saúde gengival e manutenção do sorriso.",
    benefit: "Prevenção e cuidado contínuo",
  },
  {
    icon: Sun,
    area: "Estética",
    title: "Clareamento",
    desc: "Tratamento estético para deixar o sorriso mais luminoso com segurança.",
    benefit: "Estética com orientação profissional",
  },
  {
    icon: Wrench,
    area: "Restauração",
    title: "Restaurações",
    desc: "Recuperação de dentes com materiais modernos, buscando função e naturalidade.",
    benefit: "Saúde e estética dental",
  },
  {
    icon: Layers,
    area: "Harmonia",
    title: "Facetas",
    desc: "Reabilitação estética para melhorar forma, cor e harmonia do sorriso.",
    benefit: "Harmonia estética",
  },
  {
    icon: Crown,
    area: "Reabilitação",
    title: "Próteses",
    desc: "Reabilitação funcional e estética para repor dentes ausentes.",
    benefit: "Função e confiança",
  },
  {
    icon: Scissors,
    area: "Cirurgia",
    title: "Exodontia de Sisos",
    desc: "Procedimento planejado com foco em segurança, conforto e recuperação.",
    benefit: "Planejamento e cuidado",
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
              className="mt-3 max-w-2xl font-serif text-4xl leading-[1.08] text-foreground md:text-5xl text-balance"
            >
              Cuidado completo com uma estética mais{" "}
              <span className="italic text-primary">natural e precisa</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-5 text-muted-foreground leading-relaxed text-pretty"
          >
            Tratamentos odontológicos organizados por necessidade, com indicação clara,
            materiais atuais e cuidado na experiência de atendimento.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {treatments.map((item, index) => {
            const featured = index === 0 || index === 3;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.58, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                className={`group overflow-hidden rounded-[1.8rem] border border-border/70 bg-card/95 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant ${
                  featured ? "lg:col-span-2" : ""
                }`}
              >
              <div className="grid min-h-full grid-cols-1 md:grid-cols-[0.8fr_1.2fr]">
                <div className="relative flex min-h-28 flex-col justify-between overflow-hidden bg-secondary/75 p-6 md:min-h-40">
                  <div className="absolute inset-0 hairline-panel opacity-20" aria-hidden="true" />
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-primary/10"
                    aria-hidden="true"
                  />
                  <p className="relative max-w-[10rem] text-xs uppercase tracking-[0.18em] text-primary/70">
                    {item.area}
                  </p>
                  <div className="relative mt-6 flex items-end justify-between gap-5">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/15 bg-card text-primary shadow-card">
                      <item.icon className="h-7 w-7" />
                    </span>
                    <span
                      className={`max-w-[8rem] text-right text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground/75 ${
                        featured ? "hidden xl:block" : "hidden"
                      }`}
                    >
                      {item.benefit}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-accent">{item.benefit}</p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-primary/15 bg-primary text-primary-foreground shadow-elegant"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[320px] overflow-hidden lg:col-span-5">
              <img
                src={consultaPlanejamento}
                alt="Planejamento ortodôntico explicado em consulta"
                className="h-full w-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/45" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">Foco principal</p>
                <h3 className="mt-3 font-serif text-4xl leading-tight">
                  Tratamentos ortodônticos
                </h3>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-9">
              <p className="max-w-xl text-primary-foreground/80 leading-relaxed">
                Opções modernas para alinhar o sorriso com conforto, estética e planejamento
                individualizado, escolhidas após avaliação clínica.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {orthodonticTreatments.map((item) => (
                  <div
                    key={item}
                    className="group flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-4 transition-colors duration-500 hover:bg-primary-foreground/15"
                  >
                    <span className="text-sm font-medium text-primary-foreground/90">{item}</span>
                    <Braces className="h-5 w-5 shrink-0 text-accent opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
