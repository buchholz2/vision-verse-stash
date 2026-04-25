import { motion } from "framer-motion";
import { ClipboardCheck, HeartHandshake, MessageCircle } from "lucide-react";

const highlights = [
  { icon: MessageCircle, text: "Explicação clara antes do tratamento" },
  { icon: ClipboardCheck, text: "Cuidado durante cada etapa" },
  { icon: HeartHandshake, text: "Atendimento humanizado" },
];

const videos = [
  {
    src: "/videos/reels-atendimento-01.mp4",
    label: "Atendimento clínico",
  },
  {
    src: "/videos/reels-atendimento-02.mp4",
    label: "Planejamento e cuidado",
  },
];

export function VideoExperience() {
  return (
    <section id="atendimento" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-narrow grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.2em] text-accent"
          >
            Atendimento em movimento
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl text-balance"
          >
            Atendimento real, <span className="italic text-primary">cuidado próximo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Além da tecnologia, cada etapa do tratamento é conduzida com atenção, explicação
            clara e acompanhamento próximo.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 leading-relaxed text-muted-foreground text-pretty"
          >
            Os vídeos mostram momentos reais de atendimento clínico, planejamento e cuidado
            com o paciente, reforçando uma experiência mais humana, segura e personalizada.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-8 space-y-3"
          >
            {highlights.map((item) => (
              <li
                key={item.text}
                className="flex items-center gap-3 rounded-full border border-border/70 bg-card/75 px-4 py-3 text-sm text-muted-foreground shadow-soft"
              >
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span>{item.text}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {videos.map((video) => (
              <article
                key={video.src}
                className="w-[min(74vw,285px)] shrink-0 snap-center rounded-[2rem] border border-border/70 bg-card p-2 shadow-elegant lg:w-full"
              >
                <div className="overflow-hidden rounded-[1.55rem] bg-muted">
                  <video
                    className="aspect-[9/16] max-h-[520px] w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={video.label}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
                <div className="flex items-center justify-between px-3 py-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-accent">{video.label}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
