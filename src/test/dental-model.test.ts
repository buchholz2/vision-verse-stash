import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TEETH, TOOTH_IDS } from "@/lib/dental/dentalModelConfig";

const modelsDir = join(process.cwd(), "public", "models");
// Verificações de geometria usam a saída bruta (sem compressão); o arquivo público é checado à parte.
const rawModel = join(process.cwd(), "model-src", "dental-arch.raw.glb");

function readGlbJson(path: string) {
  const buf = readFileSync(path);
  expect(buf.readUInt32LE(0)).toBe(0x46546c67); // "glTF"
  const jsonLength = buf.readUInt32LE(12);
  return JSON.parse(buf.subarray(20, 20 + jsonLength).toString("utf8"));
}

describe("modelo da arcada (GLB gerado do OBJ ya)", () => {
  const gltf = readGlbJson(rawModel);
  const nodeNames: string[] = gltf.nodes.map((n: { name?: string }) => n.name ?? "");

  it("tem um osso e um dente para cada dente inferior configurado", () => {
    expect(TOOTH_IDS).toHaveLength(16);
    for (const id of TOOTH_IDS) {
      expect(nodeNames).toContain(id);
      expect(nodeNames).toContain(`crown_${id.replace("tooth_", "")}`);
      expect(TEETH[id].delay).toBeGreaterThanOrEqual(0);
    }
  });

  it("tem o alinhador como malha com esqueleto e a gengiva inferior estática", () => {
    const aligner = gltf.nodes.find((n: { name?: string }) => n.name === "aligner");
    expect(aligner?.skin, "alinhador sem skin").toBeDefined();
    expect(gltf.skins[aligner.skin].joints).toHaveLength(16);
    const gum = gltf.nodes.find((n: { name?: string }) => n.name === "gum");
    expect(gum?.mesh, "gengiva inferior").toBeDefined();
    expect(gum.skin, "a gengiva inferior é estática").toBeUndefined();
  });

  it("tem a arcada superior articulada com dentes e gengiva", () => {
    for (const name of ["upper_arch", "upper_teeth", "upper_gum"]) expect(nodeNames).toContain(name);
  });

  it("distribui o GLB comprimido com meshopt e o rig intacto", () => {
    const publicPath = join(modelsDir, "dental-arch.glb");
    const published = readGlbJson(publicPath);
    expect(published.extensionsUsed).toContain("EXT_meshopt_compression");
    expect(readFileSync(publicPath).length).toBeLessThan(1400 * 1024);
    const names: string[] = published.nodes.map((n: { name?: string }) => n.name ?? "");
    for (const id of TOOTH_IDS) expect(names).toContain(id);
    const aligner = published.nodes.find((n: { name?: string }) => n.name === "aligner");
    expect(aligner?.skin).toBeDefined();
    expect(published.skins[aligner.skin].joints.length).toBeGreaterThanOrEqual(16);
  });

  it("distribui apenas o GLB final (sem texturas, FBX, OBJ ou STL)", () => {
    for (const file of ["teeth-color.jpg", "teeth-roughness.jpg", "teeth-normal.jpg", "Teeth.fbx", "ya.obj", "ya.stl", "Arcata.stl"]) {
      expect(existsSync(join(modelsDir, file)), file).toBe(false);
    }
  });

  it("registra a origem do modelo e a pendência de licença", () => {
    const text = readFileSync(join(modelsDir, "ATTRIBUTION.md"), "utf8");
    expect(text).toContain("ya.obj");
    expect(text).toContain("Licença: não confirmada");
  });
});
