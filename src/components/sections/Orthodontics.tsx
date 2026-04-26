import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link2, Settings2, Gem, Scan, type LucideIcon } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import especialidadeAlinhadores from "@/assets/photos/real/gabriel-especialidade-clinica.jpg";

const specialtyItems: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Link2,     title: "Aparelhos convencionais",  desc: "Indicação clássica para alinhamento e correções ortodônticas." },
  { icon: Settings2, title: "Aparelhos autoligados",    desc: "Sistema moderno, com acompanhamento ajustado ao plano do caso." },
  { icon: Gem,       title: "Aparelhos estéticos",      desc: "Alternativa em cerâmica para quem busca mais discrição." },
  { icon: Scan,      title: "Alinhadores Invisalign®",  desc: "Alinhadores transparentes, removíveis e planejados digitalmente." },
];

export function Orthodontics() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY   = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const glowY  = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const dotsY  = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="ortodontia"
      className="relative overflow-hidden py-24 text-primary-foreground md:py-32"
      style={{ background: "var(--gradient-cta)" }}
    >
      {/* Dots — drift */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(hsl(0 0% 100%) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px", y: dotsY }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 gold-divider opacity-60" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -top-64 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(210 42% 55%) 0%, transparent 70%)", y: glowY }}
        aria-hidden="true"
      />

      <div className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">

        {/* ——— Content — LEFT ——— */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.28em] text-accent"
          >
            Ortodontia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] md:text-6xl text-balance"
          >
            O alinhamento do sorriso como foco do{" "}
            <em className="not-italic" style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              planejamento.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.72, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/78 text-pretty"
          >
            Aparelhos e alinhadores são escolhidos após avaliação clínica, diagnóstico e definição de um caminho compatível com a rotina e o objetivo de cada paciente.
          </motion.p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {specialtyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/6 p-5 transition-all duration-400 hover:border-white/18 hover:bg-white/9 cursor-default overflow-hidden"
                >
                  {/* subtle accent glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(38 62% 55% / 0.08), transparent 60%)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_18px_-6px_hsl(38_62%_55%/0.45)] transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/15"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-serif text-base leading-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/62">{item.desc}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-10"
          >
            <WhatsAppButton size="lg" variant="outline"
              className="border-white/25 bg-white/10 text-primary-foreground hover:bg-white/18 hover:border-white/35 backdrop-blur-sm"
            >
              Quero avaliar meu caso
            </WhatsAppButton>
          </motion.div>
        </div>

        {/* ——— Image — RIGHT (flipped) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/5 p-3 shadow-deep">
            <div className="absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/10 pointer-events-none" aria-hidden="true" />
            <div className="aspect-[4/5] overflow-hidden rounded-[1.9rem]">
              <motion.img
                src={especialidadeAlinhadores}
                alt="Dr. Gabriel em ambiente clínico odontológico"
                className="h-[115%] w-full object-cover object-[center_32%]"
                style={{ y: imgY }} loading="lazy"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-8 left-8 glass-dark rounded-2xl px-5 py-3 shadow-deep"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">certificação</p>
              <p className="mt-1 font-serif text-lg leading-tight text-white">Invisalign® Provider</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
