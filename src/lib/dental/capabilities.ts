// Decide se a experiência 3D deve rodar ou se a alternativa leve (renders estáticos) é mais adequada.

export type FallbackReason = "webgl" | "data-saver" | "low-memory" | "forced";

type NavigatorExtras = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

export function detectFallbackReason(): FallbackReason | null {
  if (typeof window === "undefined") return null;
  const mode = new URLSearchParams(window.location.search).get("aligner");
  if (mode === "static") return "forced";
  if (mode === "3d") return null;

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return "data-saver";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return "low-memory";

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "webgl";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return "webgl";
  }
  return null;
}
