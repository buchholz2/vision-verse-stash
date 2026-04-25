import { motion } from "framer-motion";
import { Braces, Crown, Layers, Scissors, ShieldCheck, Sun, Wrench } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import tratamentosClinica from "@/assets/photos/real/gabriel-tratamentos-clinica.jpg";

const treatments = [
  {
    icon: ShieldCheck,
    title: "Profilaxia",
    desc: "Limpeza profissional para prevenção, saúde gengival e manutenção do sorriso.",
    benefit: "Prevenção e cuidado contínuo",
  },
  {
    icon: Sun,
    title: "Clareamento",
    desc: "Tratamento estético para deixar o sorriso mais luminoso com segurança.",
    benefit: "Estética com orientação profissional",
  },
  {
    icon: Wrench,
    title: "Restaurações",
    desc: "Recuperação de dentes com materiais modernos, buscando função e naturalidade.",
    benefit: "Saúde e estética dental",
  },
  {
    icon: Layers,
    title: "Facetas",
    desc: "Reabilitação estética para melhorar forma, cor e harmonia do sorriso.",
    benefit: "Harmonia estética",
  },
  {
    icon: Crown,
    title: "Próteses",
    desc: "Reabilitação funcional e estética para repor dentes ausentes.",
    benefit: "Função e confiança",
  },
  {
    icon: Scissors,
    title: "Exodontia de sisos",
    desc: "Procedimento planejado com foco em segurança, conforto e recuperação.",
    benefit: "Planejamento e cuidado",
  },
];

const orthodonticTreatments = [
  "Aparelhos convencionais",
  "Aparelhos autoligados",
  "Aparelhos estéticos",
  "Alinhadores Invisalign®",
];

export function Treatments() {
  return (
    <section id="tratamentos" className="relative overflow-hidden bg-[hsl(42_30%_97%)] py-24 md:py-32">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-28"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Tratamentos</p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[1.03] text-foreground md:text-6xl text-balance">
                Menos catálogo. Mais{" "}
                <span className="italic text-primary">cuidado indicado.</span>
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
                Tratamentos gerais apresentados de forma clara, sem transformar o site
                em uma vitrine genérica de procedimentos.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-border/80">
              {treatments.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.58, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid gap-5 border-b border-border/80 py-8 transition-colors duration-500 md:grid-cols-[4rem_1fr_12rem] md:items-start"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/12 bg-card text-primary shadow-soft">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-primary md:text-right">
                    {item.benefit}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 overflow-hidden rounded-[2.2rem] bg-card shadow-elegant"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[420px] lg:col-span-6">
              <img
                src={tratamentosClinica}
                alt="Dr. Gabriel em consultório odontológico"
                className="absolute inset-0 h-full w-full object-cover object-[center_38%]"
                loading="lazy"
              />
            </div>

            <div className="bg-primary p-8 text-primary-foreground md:p-12 lg:col-span-6">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Ortodontia</p>
              <h3 className="mt-5 max-w-xl font-serif text-4xl leading-[1.04] md:text-6xl text-balance">
                O tratamento principal ganha espaço próprio.
              </h3>
              <p className="mt-6 max-w-xl text-primary-foreground/78 leading-relaxed md:text-lg">
                A escolha entre aparelho convencional, autoligado, estético ou Invisalign®
                acontece depois de avaliação e planejamento individualizado.
              </p>

              <div className="mt-9 border-y border-primary-foreground/16">
                {orthodonticTreatments.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-primary-foreground/16 py-5 last:border-b-0"
                  >
                    <Braces className="h-5 w-5 text-accent" />
                    <span className="font-medium text-primary-foreground/92">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15"
                >
                  Quero avaliar meu sorriso
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
