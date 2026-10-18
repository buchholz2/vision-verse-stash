// Monitor de taxa de quadros da cena 3D: reduz a resolução e, se ainda for lento, pede a alternativa estática.
// Funções puras, para teste sem WebGL.

/** Intervalos acima disso (aba em segundo plano, pausa do player) não entram na amostra. */
export const MAX_VALID_FRAME_MS = 250;
/** Quadros por janela de avaliação. */
export const WINDOW_SIZE = 90;
/** Mediana acima disso (≈ 20 fps) conta como cena lenta. */
export const SLOW_MEDIAN_MS = 50;

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export type QualityLevel = 0 | 1 | 2;

/**
 * Acumula intervalos entre quadros. Ao completar uma janela, devolve o próximo nível de qualidade
 * se a mediana estiver lenta: 0 = normal, 1 = resolução reduzida, 2 = alternativa estática.
 */
export function createFrameBudget(onLevel: (level: QualityLevel) => void) {
  let samples: number[] = [];
  let level: QualityLevel = 0;
  return {
    push(deltaMs: number) {
      if (level === 2 || deltaMs <= 0 || deltaMs > MAX_VALID_FRAME_MS) return;
      samples.push(deltaMs);
      if (samples.length < WINDOW_SIZE) return;
      const slow = median(samples) > SLOW_MEDIAN_MS;
      samples = [];
      if (slow) {
        level = (level + 1) as QualityLevel;
        onLevel(level);
      }
    },
    get level() {
      return level;
    },
  };
}
