import { useEffect, useRef } from "react";

// Vídeos próprios do consultório (instrumentais e preparo clínico). Auditoria de mídia: nenhum é cópia ou
// derivado dos vídeos de referência rejeitados (resolução, duração e conteúdo distintos). Cada item traz uma
// versão leve (720p, sem áudio) e, como alternativa, o arquivo original.
const videos = [
  {
    src: "/videos/reels-atendimento-01.mp4",
    light: "/videos/reels-atendimento-01-web.mp4",
    poster: "/images/poster-atendimento-01.jpg",
    label: "Atendimento e procedimento clínico",
  },
  {
    src: "/videos/reels-atendimento-02.mp4",
    light: "/videos/reels-atendimento-02-web.mp4",
    poster: "/images/poster-atendimento-02.jpg",
    label: "Atendimento ortodôntico",
  },
];

/**
 * Reprodução automática, muda, em loop e inline. Para poupar CPU e bateria, pausa fora da tela e retoma ao voltar,
 * exceto se o visitante pausou manualmente (os controles nativos permitem pausar e retomar).
 */
function ClinicVideo({ src, light, poster, label }: (typeof videos)[number]) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const autoPausing = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onPause = () => {
      if (!autoPausing.current) userPaused.current = true;
      autoPausing.current = false;
    };
    const onPlay = () => {
      userPaused.current = false;
    };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) void video.play().catch(() => undefined);
        } else if (!video.paused) {
          autoPausing.current = true;
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  return (
    <figure>
      <div className="overflow-hidden rounded-[1.5rem] bg-primary">
        <video
          ref={ref}
          className="block aspect-[9/16] w-full object-cover [filter:saturate(0.92)]"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster={poster}
          aria-label={label}
        >
          <source src={light} type="video/mp4" />
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

export function VideoExperience() {
  return (
    <section id="atendimento" className="section-y scroll-mt-20 bg-secondary">
      <div className="container-wide layout-grid lg:items-start">
        <div className="lg:col-span-5">
          <h2 className="section-title">A rotina do consultório.</h2>
          <p className="lead mt-6">O ambiente e o cuidado em cada etapa, como acontecem no dia a dia.</p>
        </div>
        <div className="mx-auto grid w-full max-w-[34rem] grid-cols-2 items-start gap-4 sm:gap-6 lg:col-span-7 lg:mx-0 lg:max-w-none">
          <ClinicVideo {...videos[0]} />
          <ClinicVideo {...videos[1]} />
        </div>
      </div>
    </section>
  );
}
