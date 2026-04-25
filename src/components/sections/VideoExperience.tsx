import { motion } from "framer-motion";

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
      <div className="container-wide grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.28em] text-accent"
          >
            Atendimento em movimento
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl font-serif text-5xl leading-[1.04] text-foreground md:text-6xl text-balance"
          >
            Cenas reais de um cuidado{" "}
            <span className="italic text-primary">mais próximo.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.16 }}
            className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            <p>
              Os vídeos entram como prova visual, não como decoração: mostram atendimento,
              explicação e rotina clínica com naturalidade.
            </p>
            <p className="border-l border-accent/60 pl-5 font-serif text-2xl leading-snug text-foreground">
              Tecnologia importa, mas a experiência do paciente começa na forma como cada
              etapa é explicada.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {videos.map((video, index) => (
              <article
                key={video.src}
                className={`w-[min(72vw,300px)] shrink-0 snap-center rounded-[2rem] border border-border/70 bg-card p-2 shadow-elegant lg:w-full ${
                  index === 1 ? "lg:mt-16" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[1.55rem] bg-muted">
                  <video
                    className="aspect-[9/16] max-h-[540px] w-full object-cover"
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
                <p className="px-3 py-4 text-xs uppercase tracking-[0.18em] text-accent">
                  {video.label}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
