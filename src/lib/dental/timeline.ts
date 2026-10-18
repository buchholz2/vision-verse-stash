// Mapeamento puro da timeline manual (0–1) -> estado da cena. Sem React, sem three.
// Ritmo: 0–20% ponto de partida · 20–40% alinhador se aproxima e encaixa ·
// 40–85% dentes se movem · 85–100% alinhador se afasta e o resultado se estabiliza.

export const PHASES = {
  fitStart: 0.18,
  fitEnd: 0.38,
  moveStart: 0.38,
  moveEnd: 0.78,
  awayStart: 0.8,
  awayEnd: 0.9,
  /** A arcada superior fecha sobre a inferior no fim, revelando o sorriso completo. */
  closeStart: 0.88,
} as const;

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
export const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};
export const smootherstep = (t: number) => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const easeInOutCubic = (t: number) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Progresso (0–1) do movimento de um dente, com atraso individual. */
export function toothProgress(progress: number, delay: number) {
  const q = clamp01((progress - PHASES.moveStart) / (PHASES.moveEnd - PHASES.moveStart));
  const span = 0.62;
  const local = clamp01((q - delay * (1 - span)) / span);
  return smootherstep(local);
}

export interface AlignerState {
  /** 0 = suspenso e distante, 1 = encaixado. */
  fit: number;
  /** 0 = encaixado, 1 = afastado. */
  away: number;
  opacity: number;
}

export function alignerState(progress: number): AlignerState {
  const fit = easeOutCubic((progress - PHASES.fitStart) / (PHASES.fitEnd - PHASES.fitStart));
  const away = easeInOutCubic((progress - PHASES.awayStart) / (PHASES.awayEnd - PHASES.awayStart));
  // O alinhador só aparece depois do ponto de partida e desaparece de leve ao se afastar.
  const appear = smoothstep((progress - PHASES.fitStart + 0.02) / 0.06);
  const opacity = appear * (1 - away);
  return { fit, away, opacity };
}

/** Ponto da cena 3D ao qual o balão aponta. */
export type AnchorId = "incisors" | "aligner" | "canineLeft" | "molarRight";

export interface Beat {
  id: string;
  from: number;
  to: number;
  /** Número de passos mostrado no balão. */
  kicker: string;
  title: string;
  text: string;
  anchor: AnchorId;
  /** Lado do balão em telas largas (em telas estreitas ele fica abaixo da arcada). */
  side: "left" | "right";
  /** Índice do render estático usado quando não há 3D (sem WebGL ou com movimento reduzido). */
  still?: 0 | 1 | 2 | 3;
}

/** Cada balão explica um momento da transformação; o balão anterior some antes do próximo aparecer. */
export const BEATS: readonly Beat[] = [
  {
    id: "partida",
    from: 0,
    to: 0.18,
    kicker: "1 de 5",
    title: "Cada sorriso tem um ponto de partida.",
    text: "Dentes com posições e giros diferentes. A avaliação começa por entender esse cenário.",
    anchor: "incisors",
    side: "left",
    still: 0,
  },
  {
    id: "alinhador",
    from: 0.18,
    to: 0.38,
    kicker: "2 de 5",
    title: "Alinhadores Invisalign® feitos para você.",
    text: "Transparentes, removíveis e planejados digitalmente a partir da sua arcada.",
    anchor: "aligner",
    side: "right",
    still: 1,
  },
  {
    id: "movimento",
    from: 0.38,
    to: 0.6,
    kicker: "3 de 5",
    title: "Um movimento de cada vez.",
    text: "Uma sequência de alinhadores conduz os dentes aos poucos, sem pressa.",
    anchor: "canineLeft",
    side: "left",
    still: 2,
  },
  {
    id: "acompanhamento",
    from: 0.6,
    to: 0.8,
    kicker: "4 de 5",
    title: "Acompanhamento em cada etapa.",
    text: "Consultas de controle ajudam a conferir se o plano segue como previsto.",
    anchor: "molarRight",
    side: "right",
  },
  {
    id: "resultado",
    from: 0.8,
    to: 1,
    kicker: "5 de 5",
    title: "O resultado também é planejado.",
    text: "O sorriso final é definido junto com você, a partir do diagnóstico de cada caso.",
    anchor: "incisors",
    side: "left",
    still: 3,
  },
];

/** Índice do balão ativo para um progresso (0–1). */
export function beatIndexAt(progress: number): number {
  const i = BEATS.findIndex((beat) => progress < beat.to);
  return i < 0 ? BEATS.length - 1 : i;
}

/** Pose da câmera ao longo da rolagem: aproxima nos dentes durante o movimento e abre para o sorriso no fim. */
const CAMERA_KEYS: readonly [number, number, number, number, number][] = [
  // progresso, azimute (°), elevação (°), zoom (× distância de enquadramento), deslocamento do alvo (× raio)
  [0, 38, 40, 0.688, 0.06],
  [0.18, 30, 38, 0.688, 0.06],
  [0.38, 22, 36, 0.688, 0.06],
  [0.6, 10, 32, 0.688, 0.04],
  [0.8, -6, 30, 0.722, 0.06],
  [0.88, -4, 14, 0.705, 0.08],
  [1, 0, 3, 0.585, 0.02],
];

export interface CameraPose {
  azimuth: number;
  elevation: number;
  zoom: number;
  targetLift: number;
}

export function cameraPose(progress: number): CameraPose {
  const p = clamp01(progress);
  let i = 0;
  while (i < CAMERA_KEYS.length - 2 && p > CAMERA_KEYS[i + 1][0]) i++;
  const [p0, az0, el0, z0, t0] = CAMERA_KEYS[i];
  const [p1, az1, el1, z1, t1] = CAMERA_KEYS[i + 1];
  const f = smoothstep((p - p0) / (p1 - p0));
  const mix = (a: number, b: number) => a + (b - a) * f;
  return { azimuth: mix(az0, az1), elevation: mix(el0, el1), zoom: mix(z0, z1), targetLift: mix(t0, t1) };
}

/** Abertura da arcada superior (rad): aberta como em um modelo de estudo; fecha no fim, sobre a inferior. */
export const JAW_OPEN_RAD = (78 * Math.PI) / 180;
export const JAW_CLOSED_RAD = 0;

export function jawAngle(progress: number): number {
  const t = easeInOutCubic((progress - PHASES.closeStart) / (1 - PHASES.closeStart));
  return JAW_OPEN_RAD + (JAW_CLOSED_RAD - JAW_OPEN_RAD) * t;
}

export const CAPTION = "Animação ilustrativa. O planejamento e os resultados variam conforme cada caso.";
