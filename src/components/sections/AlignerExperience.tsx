import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { AlignerCallouts } from "@/components/aligner/AlignerCallouts";
import { AlignerFallback } from "@/components/aligner/AlignerFallback";
import { AlignerStage } from "@/components/aligner/AlignerStage";
import type { AnchorOutputs } from "@/components/aligner/AlignerScene";
import { useMediaQuery } from "@/hooks/use-media-query";
import { detectFallbackReason } from "@/lib/dental/capabilities";
import { BEATS, CAPTION, type AnchorId } from "@/lib/dental/timeline";

const ANCHOR_IDS: AnchorId[] = ["incisors", "aligner", "canineLeft", "molarRight"];

/**
 * Cena fixa em tela cheia guiada pela rolagem nativa: a arcada fica grande no centro e, a cada passo,
 * um balão com linha de chamada explica o que está acontecendo. A cena 3D só lê o progresso (MotionValue),
 * sem estado React por quadro. Rolar para cima percorre a mesma sequência ao contrário.
 */
export function AlignerExperience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // A detecção de WebGL/memória só roda no navegador, depois da hidratação, para que o HTML pré-renderizado coincida.
  const [failure, setFailure] = useState<unknown>(null);
  const compact = useMediaQuery("(max-width: 1023px)");
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const staticMode = Boolean(reducedMotion || failure);

  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35, restDelta: 0.0004 });
  const anchorX = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const anchorY = [useMotionValue(0), useMotionValue(0), useMotionValue(0), useMotionValue(0)];
  const anchors = useMemo(
    () => Object.fromEntries(ANCHOR_IDS.map((id, i) => [id, { x: anchorX[i], y: anchorY[i] }])) as AnchorOutputs,
    // Os MotionValues são estáveis durante a vida do componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleFailure = useCallback((error: unknown) => setFailure(error ?? "error"), []);

  useEffect(() => {
    const reason = detectFallbackReason();
    if (reason) setFailure(reason);
  }, []);

  // Progresso local: 0 quando a cena gruda no topo, 1 quando é liberada.
  useEffect(() => {
    if (staticMode) return;
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      raw.set(travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [raw, staticMode]);

  // Tamanho do palco: os balões são posicionados em pixels a partir dele.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || staticMode) return;
    const measure = () => setLayout({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [staticMode]);

  return (
    <section id="alinhadores" aria-label="Como os alinhadores movem os dentes" className="scroll-mt-24 bg-background pt-10 md:pt-14">
      <div className="container-wide relative z-10">
        <div className="max-w-2xl">
          <h2 className="section-title">Um sorriso, passo a passo.</h2>
          <p className="lead mt-5">
            {staticMode ? "Conheça as etapas do tratamento com alinhadores." : "Veja o que acontece com os dentes em cada etapa do tratamento."}
          </p>
        </div>
      </div>

      {staticMode ? (
        <AlignerFallback />
      ) : (
        <div ref={trackRef} className="relative -mt-10 h-[500svh] lg:h-[540svh]">
          <div ref={stageRef} id="painel-alinhadores" className="sticky top-0 h-svh overflow-hidden bg-background">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_46%_at_50%_50%,hsl(210_32%_90%),transparent_78%)]"
            />
            <AlignerStage progress={progress} compact={compact} anchors={anchors} onFailure={handleFailure} />
            <AlignerCallouts progress={progress} anchors={anchors} layout={layout} />
            <p className="pointer-events-none absolute inset-x-0 bottom-3 z-10 px-5 text-center text-[0.7rem] leading-snug text-muted-foreground">{CAPTION}</p>
            <h3 className="sr-only">Etapas do tratamento com alinhadores</h3>
            <ol className="sr-only">
              {BEATS.map((beat) => (
                <li key={beat.id}>
                  {beat.title} {beat.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
