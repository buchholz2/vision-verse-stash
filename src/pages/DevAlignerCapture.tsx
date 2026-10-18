import { useEffect, useMemo, useRef, useState } from "react";
import { motionValue } from "framer-motion";
import AlignerScene from "@/components/aligner/AlignerScene";

// Rota exclusiva de desenvolvimento: exporta o canvas com transparência, sem capturar a interface.
const DevAlignerCapture = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const width = Number(params.get("w") ?? 0);
  const height = Number(params.get("h") ?? 0);
  const progress = useMemo(() => motionValue(Number(params.get("p") ?? 0)), [params]);
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [png, setPng] = useState("");
  // Gancho de depuração: permite varrer o progresso na mesma página (window.__setP).
  useEffect(() => {
    (window as unknown as { __setP: (p: number) => void }).__setP = (p) => progress.set(p);
  }, [progress]);
  return (
    <>
      <div ref={wrap} style={{ width: width || "100%", height: height || "100svh", background: params.get("bg") ?? "transparent" }}>
        <AlignerScene progress={progress} zoomScale={Number(params.get("z") ?? 1)} poseOverride={{ azimuth: params.has("az") ? Number(params.get("az")) : undefined, elevation: params.has("el") ? Number(params.get("el")) : undefined }} preserveDrawingBuffer onReady={() => setReady(true)} onError={(error) => console.error("[dev/aligner]", error)} />
      </div>
      <div className="fixed bottom-4 left-4 flex items-center gap-4 rounded-lg bg-white p-3 text-sm shadow-card">
        <button disabled={!ready} onClick={() => setPng(wrap.current?.querySelector("canvas")?.toDataURL("image/png") ?? "")}>
          Preparar PNG
        </button>
        {png && <a href={png} download={`arcada-${params.get("p") ?? "0"}.png`}>Baixar PNG</a>}
      </div>
    </>
  );
};

export default DevAlignerCapture;
