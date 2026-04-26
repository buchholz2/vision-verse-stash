import { motion } from "framer-motion";
import {
  BadgeCheck,
  ClipboardCheck,
  Crown,
  Layers,
  ShieldCheck,
  Sparkles,
  Link2,
  Settings2,
  Gem,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import tratamentosClinica from "@/assets/photos/real/gabriel-tratamentos-clinica.jpg";

const treatments = [
  {
    icon: ShieldCheck,
    area: "Prevenção",
    title: "Profilaxia",
    desc: "Limpeza profissional para controlar biofilme, preservar a gengiva e manter o sorriso saudável.",
    benefit: "Manutenção preventiva",
    color: "hsl(210 42% 28%)",
  },
  {
    icon: Sparkles,
    area: "Estética",
    title: "Clareamento",
    desc: "Indicação segura para iluminar o sorriso, respeitando sensibilidade, rotina e expectativa estética.",
    benefit: "Sorriso mais luminoso",
    color: "hsl(38 62% 55%)",
  },
  {
    icon: BadgeCheck,
    area: "Conservadora",
    title: "Restaurações",
    desc: "Recuperação de dentes com materiais atuais, buscando naturalidade, função e acabamento discreto.",
    benefit: "Forma e função",
    color: "hsl(210 42% 28%)",
  },
  {
    icon: Layers,
    area: "Harmonia",
    title: "Facetas",
    desc: "Planejamento estético para ajustar forma, cor e proporção do sorriso com indicação criteriosa.",
    benefit: "Estética planejada",
    color: "hsl(38 62% 55%)",
  },
  {
    icon: Crown,
    area: "Reabilitação",
    title: "Próteses",
    desc: "Soluções para repor dentes ausentes e devolver conforto, confiança e estabilidade mastigatória.",
    benefit: "Reabilitação oral",
    color: "hsl(210 42% 28%)",
  },
  {
    icon: ClipboardCheck,
    area: "Cirurgia",
    title: "Exodontia de sisos",
    desc: "Procedimento planejado com avaliação clínica, orientação prévia e cuidado no pós-operatório.",
    benefit: "Segurança e orientação",
    color: "hsl(38 62% 55%)",
  },
];

const orthodonticTreatments: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Link2,      title: "Aparelhos convencionais", desc: "Indicação clássica para alinhamento e correções ortodônticas." },
  { icon: Settings2,  title: "Aparelhos autoligados",   desc: "Sistema moderno, com acompanhamento ajustado ao plano do caso." },
  { icon: Gem,        title: "Aparelhos estéticos",     desc: "Alternativa em cerâmica para quem busca mais discrição." },
  { icon: ScanSearch, title: "Alinhadores Invisalign®", desc: "Alinhadores transparentes, removíveis e planejados digitalmente." },
];

const highlights = [
  { value: "500+", label: "Pacientes atendidos" },
  { value: "5+", label: "Anos de experiência" },
  { value: "98%", label: "Satisfação" },
];


export function Treatments() {
  return (
    <section id="tratamentos" className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle at top right, hsl(210 42% 28%) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-wide">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Tratamentos</p>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] text-foreground md:text-7xl text-balance">
              Cuidado completo para preservar e valorizar o{" "}
              <span className="italic text-primary">seu sorriso.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="rounded-[2rem] border border-border/60 bg-card/70 p-6 shadow-soft lg:col-span-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Indicação individualizada</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Cada procedimento entra no plano quando faz sentido para a saúde, a estética e a fase
              do tratamento do paciente.
            </p>
          </motion.div>
        </div>

        {/* Highlight numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-12 grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/50 shadow-soft"
        >
          {highlights.map((h) => (
            <div key={h.label} className="px-6 py-7 text-center">
              <p className="font-serif text-4xl text-primary md:text-5xl">{h.value}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{h.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Treatment cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {treatments.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-card card-hover"
            >
              {/* Hover gradient fill */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${item.color}08 0%, ${item.color}04 100%)`,
                }}
                aria-hidden="true"
              />

              {/* Corner accent */}
              <div
                className="absolute right-0 top-0 h-20 w-24 rounded-bl-[1.75rem] opacity-60 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(225deg, ${item.color}12 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-accent">{item.area}</p>
                    <h3 className="mt-4 font-serif text-3xl leading-tight text-foreground">{item.title}</h3>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-background text-primary shadow-soft transition-all duration-400 group-hover:border-primary/25 group-hover:bg-primary/8 group-hover:text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>

                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="h-px w-8 bg-accent/60 transition-all duration-400 group-hover:w-14" aria-hidden="true" />
                    <span className="text-sm font-medium text-primary">{item.benefit}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Orthodontic CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 overflow-hidden rounded-[2.4rem] shadow-deep"
          style={{ background: "var(--gradient-cta)" }}
        >
          {/* Dots pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.4rem] opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(hsl(0 0% 100%) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[420px] lg:col-span-4">
              <img
                src={tratamentosClinica}
                alt="Dr. Gabriel em consultório odontológico"
                className="absolute inset-0 h-full w-full object-cover object-[center_16%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[hsl(215_48%_15%)/60]" aria-hidden="true" />
            </div>

            <div className="relative p-8 text-primary-foreground md:p-12 lg:col-span-8 lg:p-14">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Ortodontia</p>
              <h3 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.03] md:text-5xl text-balance">
                O alinhamento do sorriso como foco do planejamento.
              </h3>
              <p className="mt-5 max-w-2xl text-primary-foreground/72 leading-relaxed">
                Aparelhos e alinhadores são escolhidos após avaliação clínica, diagnóstico e definição
                de um caminho compatível com a rotina e o objetivo de cada paciente.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {orthodonticTreatments.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 transition-all duration-300 hover:border-accent/25 hover:bg-white/9"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_18px_-6px_hsl(38_62%_55%/0.5)] transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/15">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-primary-foreground">{item.title}</h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/55">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-9">
                <WhatsAppButton
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/10 text-primary-foreground hover:bg-white/18 hover:border-white/35"
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
