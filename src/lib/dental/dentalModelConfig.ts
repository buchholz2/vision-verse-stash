// Ponto único de configuração do modelo 3D da arcada.
// Para trocar o modelo por um GLB anatômico final, ajuste `url`, os nomes dos nós e as poses
// iniciais abaixo; a timeline (timeline.ts, AlignerExperience) não precisa mudar.
//
// Requisitos do GLB (ver public/models/ATTRIBUTION.md):
//  - um nó por dente, com o pivô no centro da coroa, X = mesiodistal, Y = vertical, Z = vestibular;
//  - o nó do dente deve ser um Bone se existir alinhador skinned (um osso por dente);
//  - gum_31 … gum_48 são ossos independentes junto aos colos, usados apenas pela gengiva;
//  - o GLB está na pose ALINHADA (final); `start` descreve o desalinhamento inicial.

export const DENTAL_MODEL_URL = "/models/dental-arch.glb";

export const DENTAL_NODE_NAMES = {
  gum: "gum",
  aligner: "aligner",
  /** Arcada superior (dentes + gengiva), estática, com pivô na "dobradiça" posterior. */
  upper: "upper_arch",
} as const;

/** Deslocamentos em cm (unidades da cena) e rotações em graus, sempre nos eixos locais do dente. */
export interface ToothPose {
  dx?: number; // mesiodistal
  dy?: number; // vertical (extrusão)
  dz?: number; // vestibular (+) / lingual (-)
  yaw?: number; // giro em torno do eixo vertical
  tiltBL?: number; // inclinação vestíbulo-lingual
  tiltMD?: number; // inclinação mesiodistal
}

export interface ToothConfig {
  /** Estado inicial (desalinhado). */
  start: ToothPose;
  /** Atraso relativo (0–1) do início do movimento deste dente. */
  delay: number;
}

// Desalinhamento moderado e realista: apinhamento anterior com giros e pequenos escalonamentos
// vestíbulo-linguais. Os valores são pequenos de propósito, para que os dentes continuem em contato
// uns com os outros (sem "vãos" nem inclinações exageradas).
export const TEETH: Record<string, ToothConfig> = {
  // Lado esquerdo do paciente (31–38)
  tooth_31: { start: { dz: 0.07, yaw: 16, tiltBL: 2 }, delay: 0.0 },
  tooth_32: { start: { dz: -0.1, dx: -0.02, yaw: 18 }, delay: 0.08 },
  tooth_33: { start: { dz: 0.12, yaw: 9, tiltBL: 3 }, delay: 0.16 },
  tooth_34: { start: { dz: -0.04, yaw: 12 }, delay: 0.22 },
  tooth_35: { start: { dz: 0.04, yaw: 7 }, delay: 0.28 },
  tooth_36: { start: { yaw: 3, tiltMD: 2 }, delay: 0.34 },
  tooth_37: { start: { yaw: -3 }, delay: 0.4 },
  tooth_38: { start: { yaw: 2 }, delay: 0.44 },
  // Lado direito (41–48)
  tooth_41: { start: { dz: -0.08, yaw: -14, tiltBL: -2 }, delay: 0.04 },
  tooth_42: { start: { dz: 0.09, dx: 0.02, yaw: -16 }, delay: 0.12 },
  tooth_43: { start: { dz: -0.05, yaw: 8, tiltBL: -3 }, delay: 0.2 },
  tooth_44: { start: { dz: 0.04, yaw: -10 }, delay: 0.26 },
  tooth_45: { start: { dz: -0.03, yaw: -6 }, delay: 0.32 },
  tooth_46: { start: { yaw: -3 }, delay: 0.38 },
  tooth_47: { start: { yaw: 3 }, delay: 0.42 },
  tooth_48: { start: { yaw: -2 }, delay: 0.46 },
};

export const TOOTH_IDS = Object.keys(TEETH);

/** Intensidade global do desalinhamento inicial (1 = valores acima). */
export const MISALIGNMENT_SCALE = 1;
