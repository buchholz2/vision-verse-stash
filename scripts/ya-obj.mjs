import { readFile } from "node:fs/promises";

/**
 * Lê o OBJ "ya" (modelo de dentes de terceiros) e devolve um grupo por objeto, com vértices soldados por índice.
 * Cada grupo: { name, material, positions: Float32Array, indices: Uint32Array }. Coordenadas originais (mm, Y para cima).
 */
export async function readYaObj(path) {
  const text = await readFile(path, "utf8");
  const verts = [];
  const groups = [];
  let current = null;
  let material = "";
  for (const line of text.split("\n")) {
    const c = line.charCodeAt(0);
    if (c === 118 && line.charCodeAt(1) === 32) {
      const p = line.split(" ");
      verts.push(+p[1], +p[2], +p[3]);
    } else if (c === 103 && line.charCodeAt(1) === 32) {
      const name = line.slice(2).trim();
      if (name === "default") continue;
      current = { name, material: "", faces: [] };
      groups.push(current);
    } else if (line.startsWith("usemtl ")) {
      material = line.slice(7).trim();
      if (current) current.material = material;
    } else if (c === 102 && line.charCodeAt(1) === 32 && current) {
      const idx = line
        .trim()
        .split(" ")
        .slice(1)
        .map((t) => {
          const i = parseInt(t, 10);
          return i > 0 ? i - 1 : verts.length / 3 + i;
        });
      for (let k = 1; k < idx.length - 1; k++) current.faces.push(idx[0], idx[k], idx[k + 1]);
    }
  }
  return groups.map((g) => {
    const remap = new Map();
    const positions = [];
    const indices = new Uint32Array(g.faces.length);
    g.faces.forEach((vi, n) => {
      let r = remap.get(vi);
      if (r === undefined) {
        r = remap.size;
        remap.set(vi, r);
        positions.push(verts[vi * 3], verts[vi * 3 + 1], verts[vi * 3 + 2]);
      }
      indices[n] = r;
    });
    return { name: g.name, material: g.material, positions: new Float32Array(positions), indices };
  });
}
