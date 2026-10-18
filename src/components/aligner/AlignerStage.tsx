import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import type { AnchorOutputs } from "./AlignerScene";
import posterStart from "@/assets/aligner/aligner-1-partida.webp";

// O módulo 3D (three + R3F + modelo) só é baixado quando a seção está perto da tela.
const AlignerScene = lazy(() => import("./AlignerScene"));

interface Props {
  progress: MotionValue<number>;
  compact: boolean;
  anchors?: AnchorOutputs;
  onFailure: (error: unknown) => void;
  onReady?: () => void;
}

export const AlignerStage = memo(function AlignerStage({ progress, compact, anchors, onFailure, onReady }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => { setReady(true); onReady?.(); }, [onReady]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      role="img"
      aria-label="Arcada dentária em 3D: os dentes se alinham aos poucos com a ajuda de uma sequência de alinhadores transparentes."
    >
      {/* Mesmo enquadramento do primeiro quadro: reserva o espaço e evita saltos de layout. */}
      <img
        src={posterStart}
        alt=""
        aria-hidden="true"
        width={1100}
        height={825}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {near && (
        <Suspense fallback={null}>
          <AlignerScene progress={progress} compact={compact} anchors={anchors} onReady={handleReady} onError={onFailure} />
        </Suspense>
      )}
    </div>
  );
});
