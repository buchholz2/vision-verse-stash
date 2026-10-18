import { describe, expect, it } from "vitest";
import { alignerState, BEATS, beatIndexAt, cameraPose, jawAngle, JAW_CLOSED_RAD, JAW_OPEN_RAD, PHASES, toothProgress } from "@/lib/dental/timeline";
import { TEETH } from "@/lib/dental/dentalModelConfig";

describe("timeline da arcada guiada pela rolagem", () => {
  it("mantém os dentes na posição inicial até o início do movimento e alinhados no fim", () => {
    for (const { delay } of Object.values(TEETH)) {
      expect(toothProgress(0, delay)).toBe(0);
      expect(toothProgress(PHASES.moveStart, delay)).toBe(0);
      expect(toothProgress(PHASES.moveEnd, delay)).toBe(1);
      expect(toothProgress(1, delay)).toBe(1);
    }
  });

  it("é monotônica e contínua, então rolar para cima percorre a sequência ao contrário", () => {
    for (const { delay } of Object.values(TEETH)) {
      let previous = -1;
      for (let p = 0; p <= 1.0001; p += 0.005) {
        const value = toothProgress(p, delay);
        expect(value).toBeGreaterThanOrEqual(previous);
        expect(value - Math.max(previous, 0)).toBeLessThan(0.08);
        previous = value;
      }
    }
  });

  it("depende apenas do progresso (mesmo valor ida e volta)", () => {
    const forward = [0.1, 0.3, 0.6, 0.9].map((p) => ({ a: alignerState(p), c: cameraPose(p), j: jawAngle(p) }));
    const backward = [0.9, 0.6, 0.3, 0.1].map((p) => ({ a: alignerState(p), c: cameraPose(p), j: jawAngle(p) })).reverse();
    expect(backward).toEqual(forward);
  });

  it("alinhador aparece e encaixa, depois se afasta e some por completo", () => {
    expect(alignerState(0.05).opacity).toBe(0);
    expect(alignerState(PHASES.fitEnd).fit).toBe(1);
    expect(alignerState(0.6).away).toBe(0);
    expect(alignerState(PHASES.awayEnd).opacity).toBe(0);
    expect(alignerState(1).away).toBe(1);
  });

  it("a arcada superior fica aberta e só fecha no fim", () => {
    expect(jawAngle(0)).toBeCloseTo(JAW_OPEN_RAD);
    expect(jawAngle(PHASES.closeStart)).toBeCloseTo(JAW_OPEN_RAD);
    expect(jawAngle(1)).toBeCloseTo(JAW_CLOSED_RAD);
  });

  it("os balões cobrem 0–100% sem lacunas e um de cada vez", () => {
    expect(BEATS[0].from).toBe(0);
    for (let i = 1; i < BEATS.length; i++) expect(BEATS[i].from).toBe(BEATS[i - 1].to);
    expect(BEATS[BEATS.length - 1].to).toBe(1);
    expect(beatIndexAt(0)).toBe(0);
    expect(beatIndexAt(0.5)).toBe(2);
    expect(beatIndexAt(1)).toBe(BEATS.length - 1);
  });

  it("a câmera começa de cima e termina de frente, sem saltos", () => {
    expect(cameraPose(0).elevation).toBeGreaterThan(cameraPose(1).elevation);
    expect(Math.abs(cameraPose(1).azimuth)).toBeLessThan(Math.abs(cameraPose(0).azimuth));
    let prev = cameraPose(0);
    for (let p = 0.01; p <= 1; p += 0.01) {
      const pose = cameraPose(p);
      expect(Math.abs(pose.azimuth - prev.azimuth)).toBeLessThan(4);
      expect(Math.abs(pose.zoom - prev.zoom)).toBeLessThan(0.03);
      prev = pose;
    }
  });
});
