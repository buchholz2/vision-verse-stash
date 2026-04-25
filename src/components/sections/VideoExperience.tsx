import { motion } from "framer-motion";

const videos = [
  {
    src: "/videos/reels-atendimento-01.mp4",
    label: "Procedimento clínico",
  },
  {
    src: "/videos/reels-atendimento-02.mp4",
    label: "Materiais e preparo",
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
            Amostragem de procedimentos
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl font-serif text-5xl leading-[1.04] text-foreground md:text-6xl text-balance"
          >
            Procedimentos clínicos, vistos{" "}
            <span className="italic text-primary">de perto.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, delay: 0.16 }}
            className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            <p>
              Os vídeos mostram trechos de procedimentos odontológicos e etapas de
              preparo clínico, com foco na rotina real de atendimento.
            </p>
            <p className="border-l border-accent/60 pl-5 font-serif text-2xl leading-snug text-foreground">
              Uma amostragem visual para entender como o cuidado acontece na prática.
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
          <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:items-start lg:justify-items-center lg:overflow-visible lg:pb-0">
            {videos.map((video, index) => (
              <article
                key={video.src}
                className={`w-[min(72vw,300px)] shrink-0 snap-center self-start rounded-[2rem] border border-border/70 bg-card p-2 shadow-elegant lg:w-full lg:max-w-[300px] ${
                  index === 1 ? "lg:mt-16" : ""
                }`}
              >
                <div className="overflow-hidden rounded-[1.55rem] bg-muted">
                  <video
                    className="block aspect-[9/16] w-full object-cover"
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
