// Gera model-src/dental-arch.raw.glb a partir do modelo de dentes "ya" (OBJ de terceiros, 32 dentes separados com raiz
// e duas gengivas). A licença do modelo precisa ser confirmada com a origem; ver public/models/ATTRIBUTION.md.
// Uso: npm run model:build
//
// O que o script faz:
//  1. lê o OBJ (um grupo por dente e duas gengivas) e nivela o plano oclusal (o modelo vem inclinado ~7°);
//  2. cria um osso por dente inferior (pivô no centro da coroa) e deixa a gengiva inferior estática e decimada;
//  3. constrói o alinhador (SkinnedMesh) por traçado de raios sobre as coroas inferiores;
//  4. monta a arcada superior (dentes + gengiva) em um grupo articulado na "dobradiça" posterior;
//  5. exporta em GLB, sem texturas.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshoptSimplifier } from "meshoptimizer";
import { refineTooth } from "./dental-refine.mjs";
import { readYaObj } from "./ya-obj.mjs";

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = `data:application/octet-stream;base64,${Buffer.from(buffer).toString("base64")}`;
      this.onloadend?.();
    });
  }
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(__dirname, "..", "..", "assets-source", "ya-tooth-model", "ya.obj");
const OUT = join(__dirname, "..", "model-src", "dental-arch.raw.glb");

// ---------- parâmetros ----------
const SCALE = 0.05; // unidades do OBJ -> cm (incisivo central inferior ≈ 0,52 cm de largura)
const CROWN = 0.58; // comprimento visível da coroa a partir da borda oclusal (cm)
const LOWER_GUM_FACES = 30000;
const GUM_COMPRESS = 0.9; // fração da altura de gengiva acima/abaixo da margem que é mantida (igual nas duas arcadas)
const GUM_PULL = 0.07; // quanto a margem gengival superior desce sobre os dentes anteriores (cm)
const GAP = 0.016;
const THICKNESS = 0.05;
const RAY_CAP = 1.3;
const NS = 170;
const RAYS = 40;
const UP = new THREE.Vector3(0, 1, 0);
const clamp = THREE.MathUtils.clamp;
const smooth = (t) => t * t * (3 - 2 * t);

// ---------- 1. leitura e classificação ----------
const groups = await readYaObj(SOURCE);
const gumGroups = groups.filter((g) => /1SG/.test(g.material)).sort((a, b) => b.positions.length - a.positions.length);
const toothGroups = groups.filter((g) => /2SG/.test(g.material));
if (gumGroups.length !== 2 || toothGroups.length !== 32) throw new Error("Estrutura inesperada do OBJ (esperava 2 gengivas e 32 dentes).");
const [lowerGumSrc, upperGumSrc] = gumGroups;

const centroidOf = (positions) => {
  const c = new THREE.Vector3();
  for (let i = 0; i < positions.length; i += 3) c.x += positions[i], (c.y += positions[i + 1]), (c.z += positions[i + 2]);
  return c.divideScalar(positions.length / 3);
};
const teethSrc = toothGroups.map((g) => ({ g, c: centroidOf(g.positions) }));
const lowerSrc = teethSrc.filter((t) => t.c.y < 30).sort((a, b) => a.c.x - b.c.x);
const upperSrc = teethSrc.filter((t) => t.c.y >= 30).sort((a, b) => a.c.x - b.c.x);
if (lowerSrc.length !== 16 || upperSrc.length !== 16) throw new Error("Não consegui separar 16 dentes inferiores e 16 superiores.");

// Simetria: o lado direito de cada arcada vira o espelho do lado esquerdo (sorriso simétrico, mordida igual dos dois lados).
function mirrorSide(list) {
  const mid = (list[7].c.x + list[8].c.x) / 2;
  const mirrored = list.map((entry, i) => {
    if (i < 8) return entry;
    const src = list[15 - i].g;
    const positions = new Float32Array(src.positions);
    for (let k = 0; k < positions.length; k += 3) positions[k] = 2 * mid - positions[k];
    const indices = new Uint32Array(src.indices);
    for (let k = 0; k < indices.length; k += 3) {
      const t = indices[k + 1];
      indices[k + 1] = indices[k + 2];
      indices[k + 2] = t;
    }
    const g = { ...src, positions, indices };
    return { g, c: centroidOf(positions) };
  });
  return { list: mirrored, mid };
}
const lowerMirror = mirrorSide(lowerSrc);
const upperMirror = mirrorSide(upperSrc);
lowerSrc.splice(0, 16, ...lowerMirror.list);
// A linha média superior é levada à inferior (a diferença original é de ~0,1 mm).
for (const entry of upperMirror.list) {
  const shift = lowerMirror.mid - upperMirror.mid;
  for (let k = 0; k < entry.g.positions.length; k += 3) entry.g.positions[k] += shift;
  entry.c.x += shift;
}
upperSrc.splice(0, 16, ...upperMirror.list);

// Plano oclusal: o modelo vem pitchado (molares ~1 cm mais altos que os incisivos). Ajusta a reta das bordas oclusais.
const tipPoints = (list, isLower) =>
  list.map(({ g, c }) => {
    let tip = isLower ? -Infinity : Infinity;
    for (let i = 1; i < g.positions.length; i += 3) tip = isLower ? Math.max(tip, g.positions[i]) : Math.min(tip, g.positions[i]);
    return { z: c.z, y: tip };
  });
const slopeOf = (pts) => {
  const n = pts.length;
  const mz = pts.reduce((s, p) => s + p.z, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  const num = pts.reduce((s, p) => s + (p.z - mz) * (p.y - my), 0);
  const den = pts.reduce((s, p) => s + (p.z - mz) ** 2, 0);
  return num / den;
};
const slope = (slopeOf(tipPoints(lowerSrc, true)) + slopeOf(tipPoints(upperSrc, false))) / 2;
const PITCH = Math.atan(slope);
const cosP = Math.cos(PITCH);
const sinP = Math.sin(PITCH);

// Origem: linha média, bordas dos incisivos inferiores a ~0,8 cm do zero e z médio dos dentes inferiores.
const pitched = (x, y, z) => [x, y * cosP - z * sinP, y * sinP + z * cosP];
const midX = (lowerSrc[7].c.x + lowerSrc[8].c.x) / 2;
let lowerTipMean = 0;
for (const { g } of lowerSrc) {
  let tip = -Infinity;
  for (let i = 0; i < g.positions.length; i += 3) tip = Math.max(tip, pitched(g.positions[i], g.positions[i + 1], g.positions[i + 2])[1]);
  lowerTipMean += tip / 16;
}
const meanZ = lowerSrc.reduce((s, { g }) => s + pitched(...centroidOf(g.positions).toArray())[2], 0) / 16;
const origin = new THREE.Vector3(midX, lowerTipMean - 0.8 / SCALE, meanZ);
const toFinal = (positions) => {
  const out = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    const [x, y, z] = pitched(positions[i], positions[i + 1], positions[i + 2]);
    out[i] = (x - origin.x) * SCALE;
    out[i + 1] = (y - origin.y) * SCALE;
    out[i + 2] = (z - origin.z) * SCALE;
  }
  return out;
};


/** Superfícies abertas (gengivas) não têm volume: orienta pelas normais, que devem apontar para longe do centro do arco. */
function faceOutward(geo, center = new THREE.Vector3()) {
  geo.computeVertexNormals();
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  let sum = 0;
  for (let i = 0; i < pos.count; i++) sum += (pos.getX(i) - center.x) * nor.getX(i) + (pos.getZ(i) - center.z) * nor.getZ(i);
  if (sum >= 0) return geo;
  const idx = geo.index.array;
  for (let i = 0; i < idx.length; i += 3) {
    const t = idx[i + 1];
    idx[i + 1] = idx[i + 2];
    idx[i + 2] = t;
  }
  geo.index.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}


function lowerTipMean2() {
  return lowerTeeth.reduce((a, g) => a + tipOf(g, true), 0) / 16;
}
function tipOf2(list, isLower) {
  return list.map((g) => tipOf(g, isLower));
}
/** Depuração: exposição da coroa (borda → margem gengival) por dente e altura total da gengiva. */
function debugMargins(gum, teeth, tipList, isLower, label) {
  const gp = gum.attributes.position;
  const rows = teeth.map((g, i) => {
    const tp = g.attributes.position;
    const near = [];
    for (let k = 0; k < gp.count; k++) {
      const x = gp.getX(k), y = gp.getY(k), z = gp.getZ(k);
      if (Math.abs(y - tipList[i]) > 1.6) continue;
      let best = Infinity;
      for (let j = 0; j < tp.count; j += 3) {
        const d = (tp.getX(j) - x) ** 2 + (tp.getY(j) - y) ** 2 + (tp.getZ(j) - z) ** 2;
        if (d < best) best = d;
      }
      if (best < 0.06 ** 2) near.push(y);
    }
    near.sort((a, b) => a - b);
    const margin = isLower ? near.at(-1) : near[0];
    const b = bounds(g);
    return `${label}${i} larg=${(b.max.x - b.min.x).toFixed(2)} exposição=${(isLower ? tipList[i] - margin : margin - tipList[i]).toFixed(2)} n=${near.length}`;
  });
  const gb = bounds(gum);
  console.log(label, "gengiva y:", gb.min.y.toFixed(2), gb.max.y.toFixed(2), "ponta média:", (tipList.reduce((a, b) => a + b, 0) / 16).toFixed(2));
  console.log(rows.join("\n"));
}

/** Geometria soldada, em coordenadas finais (cm), com normais suaves. */
const toGeometry = (src) => {
  let geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(toFinal(src.positions), 3));
  geo.setIndex(new THREE.BufferAttribute(src.indices, 1));
  geo = mergeVertices(geo, 1e-4);
  geo.computeVertexNormals();
  return geo;
};

const bounds = (geo) => new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
const tipOf = (geo, isLower) => (isLower ? bounds(geo).max.y : bounds(geo).min.y);
const lowerTeeth = lowerSrc.map(({ g }) => {
  const full = toGeometry(g);
  return trimRoot(full, tipOf(full, true), true, 1.1);
});
const upperTeeth = upperSrc.map(({ g }) => toGeometry(g));

// ---------- arco inferior (curva pelos centros das coroas) ----------
const crownCentroid = (geo, isLower) => {
  const tip = tipOf(geo, isLower);
  const pos = geo.attributes.position;
  const c = new THREE.Vector3();
  let n = 0;
  for (let i = 0; i < pos.count; i++) {
    if (Math.abs(pos.getY(i) - tip) <= CROWN) {
      c.x += pos.getX(i);
      c.z += pos.getZ(i);
      n++;
    }
  }
  return new THREE.Vector3(c.x / n, 0, c.z / n);
};
const pivotsXZ = lowerTeeth.map((g) => crownCentroid(g, true));
const extend = (a, b, len) => a.clone().add(a.clone().sub(b).setY(0).normalize().multiplyScalar(len));
const arch = new THREE.CatmullRomCurve3([extend(pivotsXZ[0], pivotsXZ[1], 0.9), ...pivotsXZ, extend(pivotsXZ[15], pivotsXZ[14], 0.9)], false, "centripetal");
const ARCLEN = arch.getLength();
const uTable = [];
for (let i = 0; i <= 3000; i++) uTable.push({ u: i / 3000, p: arch.getPointAt(i / 3000) });
const uOf = (p) => {
  let best = 0;
  let bd = Infinity;
  for (const e of uTable) {
    const d = (e.p.x - p.x) ** 2 + (e.p.z - p.z) ** 2;
    if (d < bd) {
      bd = d;
      best = e.u;
    }
  }
  return best;
};
const frameAtU = (u) => {
  const T = arch.getTangentAt(u);
  T.y = 0;
  T.normalize();
  return { T, N: new THREE.Vector3(-T.z, 0, T.x), p: arch.getPointAt(u) };
};

// ---------- 2. dentes inferiores: ossos + malhas locais ----------
const names = [];
for (let i = 0; i < 8; i++) names.push(`tooth_3${8 - i}`); // x<0: 38 … 31
for (let i = 0; i < 8; i++) names.push(`tooth_4${i + 1}`); // x>0: 41 … 48
const root = new THREE.Group();
root.name = "DentalArch";
const bones = [];
const toothInfo = [];
const crownTris = []; // triângulos das coroas inferiores, em coordenadas finais (traçado de raios do alinhador)
const enamel = new THREE.MeshStandardMaterial({ name: "enamel" });

/** Atributo `edge` (_EDGE no GLB): 1 na borda oclusal, 0 no colo (comprimento da coroa = CROWN). */
const bakeEdgeAt = (geo, tip, isLower) => {
  const pos = geo.attributes.position;
  const values = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const d = isLower ? tip - pos.getY(i) : pos.getY(i) - tip;
    values[i] = clamp(1 - d / CROWN, 0, 1);
  }
  geo.setAttribute("edge", new THREE.BufferAttribute(values, 1));
};

lowerTeeth.forEach((worldGeo, idx) => {
  const tip = tipOf(worldGeo, true);
  const pc = crownCentroid(worldGeo, true);
  const pivot = new THREE.Vector3(pc.x, tip - CROWN / 2, pc.z);
  const u = uOf(pc);
  const { T, N } = frameAtU(u);
  const basis = new THREE.Matrix4().makeBasis(T, UP, N);
  const quat = new THREE.Quaternion().setFromRotationMatrix(basis);
  const inv = basis.clone().transpose();

  // triângulos da coroa (para o alinhador), em coordenadas finais
  const wp = worldGeo.attributes.position;
  const wi = worldGeo.index.array;
  for (let t = 0; t < wi.length; t += 3) {
    if ([0, 1, 2].every((k) => tip - wp.getY(wi[t + k]) <= CROWN + 0.05)) {
      const v = [0, 1, 2].map((k) => new THREE.Vector3().fromBufferAttribute(wp, wi[t + k]));
      crownTris.push({ a: v[0], e1: v[1].clone().sub(v[0]), e2: v[2].clone().sub(v[0]) });
    }
  }

  const geo = worldGeo.clone();
  const lp = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < lp.count; i++) {
    v.fromBufferAttribute(lp, i).sub(pivot).applyMatrix4(inv);
    lp.setXYZ(i, v.x, v.y, v.z);
  }
  // o osso só gira em torno do eixo vertical (basis), então o Y local = Y final - pivô.y
  bakeEdgeAt(worldGeo, tip, true);
  geo.setAttribute("edge", worldGeo.attributes.edge.clone());
  geo.deleteAttribute("normal");
  geo.computeVertexNormals();

  const bone = new THREE.Bone();
  bone.name = names[idx];
  bone.position.copy(pivot);
  bone.quaternion.copy(quat);
  const mesh = new THREE.Mesh(geo, enamel);
  mesh.name = `crown_${names[idx].replace("tooth_", "")}`;
  bone.add(mesh);
  root.add(bone);
  bones.push(bone);
  const box = new THREE.Box3(new THREE.Vector3(pc.x - 0.3, tip - CROWN, pc.z - 0.3), new THREE.Vector3(pc.x + 0.3, tip, pc.z + 0.3));
  toothInfo.push({ name: names[idx], box, pivot, u, height: CROWN });
});

// ---------- 3. gengiva inferior: estática, decimada, com cor pela distância aos dentes ----------
await MeshoptSimplifier.ready;
function decimate(geo, targetFaces) {
  const positions = geo.attributes.position.array;
  const indices = Uint32Array.from(geo.index.array);
  const [simplified] = MeshoptSimplifier.simplify(indices, positions, 3, targetFaces * 3, 0.05, ["ErrorAbsolute"]);
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
  out.setIndex(new THREE.BufferAttribute(simplified, 1));
  return compact(out);
}
function compact(geo) {
  const idx = geo.index.array;
  const pos = geo.attributes.position;
  const remap = new Map();
  const outPos = [];
  const outIdx = new Uint32Array(idx.length);
  for (let i = 0; i < idx.length; i++) {
    let r = remap.get(idx[i]);
    if (r === undefined) {
      r = remap.size;
      remap.set(idx[i], r);
      outPos.push(pos.getX(idx[i]), pos.getY(idx[i]), pos.getZ(idx[i]));
    }
    outIdx[i] = r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(outPos, 3));
  g.setIndex(new THREE.BufferAttribute(outIdx, 1));
  g.computeVertexNormals();
  return g;
}

/** Só a coroa e um trecho curto da raiz: o resto fica dentro do tecido e, com a gengiva encurtada, furaria a casca. */
function trimRoot(geo, tip, isLower, depth) {
  const pos = geo.attributes.position;
  const idx = geo.index.array;
  const keep = [];
  for (let t = 0; t < idx.length; t += 3) {
    if ([0, 1, 2].some((k) => (isLower ? tip - pos.getY(idx[t + k]) : pos.getY(idx[t + k]) - tip) <= depth)) keep.push(idx[t], idx[t + 1], idx[t + 2]);
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", pos.clone());
  out.setIndex(keep);
  return compact(out);
}

/** Cores por vértice: margem gengival mais clara e saturada perto do dente, tecido mais escuro longe dele. */
function paintGum(geo, toothGeos) {
  const cell = 0.2;
  const grid = new Map();
  const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  for (const t of toothGeos) {
    const p = t.attributes.position;
    for (let i = 0; i < p.count; i += 2) {
      const k = key(p.getX(i), p.getY(i), p.getZ(i));
      if (!grid.has(k)) grid.set(k, []);
      grid.get(k).push(p.getX(i), p.getY(i), p.getZ(i));
    }
  }
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const margin = new THREE.Color("#c98b88");
  const base = new THREE.Color("#a5646c");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    let best = Infinity;
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
    for (let dx = -2; dx <= 2; dx++)
      for (let dy = -2; dy <= 2; dy++)
        for (let dz = -2; dz <= 2; dz++) {
          const list = grid.get(`${cx + dx},${cy + dy},${cz + dz}`);
          if (!list) continue;
          for (let k = 0; k < list.length; k += 3) best = Math.min(best, (list[k] - x) ** 2 + (list[k + 1] - y) ** 2 + (list[k + 2] - z) ** 2);
        }
    const d = Math.sqrt(best);
    const t = 1 - smooth(clamp(d / 0.45, 0, 1));
    const c = base.clone().lerp(margin, t);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

let lowerGumGeo = toGeometry(lowerGumSrc);
{
  // mesma altura de gengiva embaixo e em cima: o bloco inferior original desce ~2,3 cm abaixo das bordas
  const pos = lowerGumGeo.attributes.position;
  const start = lowerTipMean2() - 0.9;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < start) pos.setY(i, start - (start - y) * GUM_COMPRESS);
  }
}
lowerGumGeo = decimate(lowerGumGeo, LOWER_GUM_FACES);
faceOutward(lowerGumGeo, bounds(lowerGumGeo).getCenter(new THREE.Vector3()));
if (process.env.DEBUG_MARGIN) debugMargins(lowerGumGeo, lowerTeeth, tipOf2(lowerTeeth, true), true, 'inf');
paintGum(lowerGumGeo, lowerTeeth);
const lowerGum = new THREE.Mesh(lowerGumGeo, new THREE.MeshStandardMaterial({ name: "gum" }));
lowerGum.name = "gum";
root.add(lowerGum);

// ---------- 4. alinhador por traçado de raios (só coroas) ----------
function farthestHit(o, d) {
  let best = -1;
  const pvec = new THREE.Vector3();
  const tvec = new THREE.Vector3();
  const qvec = new THREE.Vector3();
  for (const tr of crownTris) {
    pvec.crossVectors(d, tr.e2);
    const det = tr.e1.dot(pvec);
    if (Math.abs(det) < 1e-9) continue;
    const inv = 1 / det;
    tvec.copy(o).sub(tr.a);
    const u = tvec.dot(pvec) * inv;
    if (u < 0 || u > 1) continue;
    qvec.crossVectors(tvec, tr.e1);
    const v = d.dot(qvec) * inv;
    if (v < 0 || u + v > 1) continue;
    const t = tr.e2.dot(qvec) * inv;
    if (t > 1e-4 && t <= RAY_CAP && t > best) best = t;
  }
  return best;
}

const toothU = toothInfo.map((t) => t.u);
const tips = lowerTeeth.map((g) => tipOf(g, true));
// borda do alinhador: 32% do comprimento da coroa acima do colo, interpolada entre dentes
const edgeY = (u) => {
  const ys = tips.map((tip) => tip - CROWN + 0.32 * CROWN);
  if (u <= toothU[0]) return ys[0];
  if (u >= toothU[15]) return ys[15];
  let i = 0;
  while (u > toothU[i + 1]) i++;
  const f = smooth((u - toothU[i]) / (toothU[i + 1] - toothU[i]));
  return ys[i] * (1 - f) + ys[i + 1] * f;
};
const rayDir = (N, k) => {
  const phi = Math.PI - (Math.PI * k) / (RAYS - 1);
  return N.clone().multiplyScalar(Math.cos(phi)).addScaledVector(UP, Math.sin(phi));
};
const uStart = toothU[0] - 0.45 / ARCLEN;
const uEnd = toothU[15] + 0.45 / ARCLEN;
const hits = [];
const frames = [];
for (let i = 0; i <= NS; i++) {
  const u = uStart + ((uEnd - uStart) * i) / NS;
  const { N, p } = frameAtU(u);
  const o = new THREE.Vector3(p.x, edgeY(u), p.z);
  frames.push({ u, N, o });
  const row = [];
  for (let k = 0; k < RAYS; k++) row.push(farthestHit(o, rayDir(N, k)));
  hits.push(row);
}
for (const row of hits)
  for (let k = 0; k < RAYS; k++)
    if (row[k] < 0) {
      let a = k - 1;
      let b = k + 1;
      while (a >= 0 && row[a] < 0) a--;
      while (b < RAYS && row[b] < 0) b++;
      row[k] = a >= 0 && b < RAYS ? (row[a] + row[b]) / 2 : a >= 0 ? row[a] : b < RAYS ? row[b] : 0.45;
    }
for (let pass = 0; pass < 2; pass++)
  for (const row of hits) {
    const copy = row.slice();
    for (let k = 1; k < RAYS - 1; k++) row[k] = (copy[k - 1] + 2 * copy[k] + copy[k + 1]) / 4;
  }
{
  const copy = hits.map((r) => r.slice());
  for (let i = 0; i <= NS; i++)
    for (let k = 0; k < RAYS; k++) {
      let s = 0;
      let w = 0;
      for (let di = -2; di <= 2; di++) {
        const wt = [1, 2, 3, 2, 1][di + 2];
        s += copy[clamp(i + di, 0, NS)][k] * wt;
        w += wt;
      }
      hits[i][k] = s / w;
    }
}
const weightsAt = (u) => {
  if (u <= toothU[0]) return [[0, 1]];
  if (u >= toothU[15]) return [[15, 1]];
  let i = 0;
  while (u > toothU[i + 1]) i++;
  const f = smooth((u - toothU[i]) / (toothU[i + 1] - toothU[i]));
  return [
    [i, 1 - f],
    [i + 1, f],
  ];
};
const alPos = [];
const alWts = [];
const alIdx = [];
const surfaces = [[], []];
for (let i = 0; i <= NS; i++) {
  const { N, o, u } = frames[i];
  const w = weightsAt(u);
  [GAP, GAP + THICKNESS].forEach((offset, layer) => {
    const row = [];
    for (let k = 0; k < RAYS; k++) {
      const p = o.clone().addScaledVector(rayDir(N, k), hits[i][k] + offset);
      alPos.push(p.x, p.y, p.z);
      const ii = [0, 0, 0, 0];
      const ww = [0, 0, 0, 0];
      w.forEach(([bi, bw], q) => {
        ii[q] = bi;
        ww[q] = bw;
      });
      alIdx.push(...ii);
      alWts.push(...ww);
      row.push(alPos.length / 3 - 1);
    }
    surfaces[layer].push(row);
  });
}
const rows = NS + 1;
const alTris = [];
for (let i = 0; i < rows - 1; i++) {
  for (let j = 0; j < RAYS - 1; j++) {
    const [a, b, c, d] = [surfaces[0][i][j], surfaces[0][i + 1][j], surfaces[0][i][j + 1], surfaces[0][i + 1][j + 1]];
    alTris.push(a, c, b, c, d, b);
    const [a2, b2, c2, d2] = [surfaces[1][i][j], surfaces[1][i + 1][j], surfaces[1][i][j + 1], surfaces[1][i + 1][j + 1]];
    alTris.push(a2, b2, c2, c2, b2, d2);
  }
  for (const j of [0, RAYS - 1]) {
    const [a, b, a2, b2] = [surfaces[0][i][j], surfaces[0][i + 1][j], surfaces[1][i][j], surfaces[1][i + 1][j]];
    alTris.push(a, b, a2, a2, b, b2);
  }
}
for (const i of [0, rows - 1])
  for (let j = 0; j < RAYS - 1; j++) {
    const [a, c, a2, c2] = [surfaces[0][i][j], surfaces[0][i][j + 1], surfaces[1][i][j], surfaces[1][i][j + 1]];
    alTris.push(a, c, a2, a2, c, c2);
  }
const alGeo = new THREE.BufferGeometry();
alGeo.setAttribute("position", new THREE.Float32BufferAttribute(alPos, 3));
alGeo.setAttribute("skinIndex", new THREE.Uint8BufferAttribute(alIdx, 4));
alGeo.setAttribute("skinWeight", new THREE.Uint8BufferAttribute(alWts.map((w) => Math.round(w * 255)), 4, true));
alGeo.setIndex(alTris);
const aligner = new THREE.SkinnedMesh(alGeo, new THREE.MeshStandardMaterial({ name: "aligner", transparent: true }));
aligner.name = "aligner";
root.add(aligner);

// ---------- 5. arcada superior: contexto estático ----------
{
  const upperTips = upperTeeth.map((g) => tipOf(g, false));
  let minZ = Infinity;
  for (const g of upperTeeth) minZ = Math.min(minZ, bounds(g).min.z);
  const hinge = new THREE.Vector3(0, upperTips.reduce((a, b) => a + b, 0) / 16, minZ - 0.25);
  const toHinge = (geo) => {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) - hinge.x, p.getY(i) - hinge.y, p.getZ(i) - hinge.z);
    return geo;
  };
  const merged = upperTeeth.map((full, i) => {
    const g = trimRoot(full, upperTips[i], false, 1.2);
    const copy = g.clone();
    bakeEdgeAt(copy, upperTips[i], false);
    toHinge(copy);
    copy.deleteAttribute("normal");
    copy.computeVertexNormals();
    return copy;
  });
  const teethGeo = mergeGeometries(merged);

  // gengiva superior
  let gumGeo = toGeometry(upperGumSrc);
  {
    const pos = gumGeo.attributes.position;
    // (a) desce a margem gengival dos seis dentes anteriores: no modelo eles ficam longos demais, com a gengiva alta
    const tipMean = upperTips.reduce((a, b) => a + b, 0) / 16;
    const sortedIdx = upperTeeth.map((g, i) => ({ i, cx: (bounds(g).min.x + bounds(g).max.x) / 2 })).sort((p, q) => p.cx - q.cx).map((e) => e.i);
    const front = new Set(sortedIdx.slice(5, 11));
    const cell = 0.15;
    const grid = new Map();
    const key = (x, y, z) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
    upperTeeth.forEach((g, ti) => {
      if (!front.has(ti)) return;
      const tp = g.attributes.position;
      for (let j = 0; j < tp.count; j += 2) {
        const k = key(tp.getX(j), tp.getY(j), tp.getZ(j));
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push(ti, tp.getX(j), tp.getY(j), tp.getZ(j));
      }
    });
    const centers = upperTeeth.map((g) => bounds(g).getCenter(new THREE.Vector3()));
    const DELTA = GUM_PULL;
    const REACH = 0.3;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      if (y > tipMean + 1.8) continue;
      let best = Infinity, bt = -1;
      const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
      for (let dx = -2; dx <= 2; dx++)
        for (let dy = -2; dy <= 2; dy++)
          for (let dz = -2; dz <= 2; dz++) {
            const l = grid.get(`${cx + dx},${cy + dy},${cz + dz}`);
            if (!l) continue;
            for (let k = 0; k < l.length; k += 4) {
              const d = (l[k + 1] - x) ** 2 + (l[k + 2] - y) ** 2 + (l[k + 3] - z) ** 2;
              if (d < best) { best = d; bt = l[k]; }
            }
          }
      if (bt < 0) continue;
      const w = 1 - smooth(clamp(Math.sqrt(best) / REACH, 0, 1));
      if (w <= 0) continue;
      const fall = 1 - smooth(clamp((y - (tipMean + 0.5)) / 1.0, 0, 1)); // some perto do topo
      const down = DELTA * w * fall;
      const c = centers[bt];
      const dirX = x - c.x, dirZ = z - c.z;
      const len = Math.hypot(dirX, dirZ) || 1;
      pos.setXYZ(i, x + (dirX / len) * down * 0.45, y - down, z + (dirZ / len) * down * 0.45);
    }
    // (b) achata o "funil" acima da margem, sem abrir buracos no palato, até ficar com a mesma altura da gengiva inferior
    const start = tipMean + 0.95;
    const box = bounds(gumGeo);
    const top = box.max.y;
    const cx0 = (box.min.x + box.max.x) / 2;
    const cz0 = box.min.z + (box.max.z - box.min.z) * 0.45;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y <= start) continue;
      const t = smooth(clamp((y - start) / (top - start), 0, 1));
      const k = 1 - 0.0 * t; // sem fechar o funil: a gengiva precisa cobrir a face palatina dos dentes
      pos.setXYZ(i, cx0 + (pos.getX(i) - cx0) * k, start + (y - start) * GUM_COMPRESS, cz0 + (pos.getZ(i) - cz0) * k);
    }
  }
  {
    const withUv = gumGeo.clone();
    withUv.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(withUv.attributes.position.count * 2), 2));
    const smoothed = refineTooth(withUv, 1, 0.8);
    smoothed.deleteAttribute("uv");
    gumGeo = smoothed;
    gumGeo.computeVertexNormals();
  }
  faceOutward(gumGeo, bounds(gumGeo).getCenter(new THREE.Vector3()));
  if (process.env.DEBUG_MARGIN) debugMargins(gumGeo, upperTeeth, upperTips, false, 'sup');
  paintGum(gumGeo, upperTeeth);
  toHinge(gumGeo);
  gumGeo.computeVertexNormals();

  const group = new THREE.Group();
  group.name = "upper_arch";
  group.position.copy(hinge).add(new THREE.Vector3(0, 0.115, 0)); // folga mínima da mordida original (medida por scripts/collision-check.ts)
  const upperTeethMesh = new THREE.Mesh(teethGeo, enamel);
  upperTeethMesh.name = "upper_teeth";
  const upperGumMesh = new THREE.Mesh(gumGeo, new THREE.MeshStandardMaterial({ name: "gum" }));
  upperGumMesh.name = "upper_gum";
  group.add(upperTeethMesh, upperGumMesh);
  root.add(group);
}

// ---------- esqueleto e exportação ----------
root.updateMatrixWorld(true);
aligner.bind(new THREE.Skeleton(bones), new THREE.Matrix4());
const glb = await new Promise((resolve, reject) => new GLTFExporter().parse(root, resolve, reject, { binary: true, onlyVisible: false }));
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, Buffer.from(glb));
console.log(
  JSON.stringify(
    {
      file: OUT,
      kilobytes: Math.round(glb.byteLength / 1024),
      pitchDeg: +((PITCH * 180) / Math.PI).toFixed(2),
      lowerToothVertices: lowerTeeth.map((g) => g.attributes.position.count),
      lowerGumFaces: lowerGumGeo.index.count / 3,
      alignerVertices: alGeo.attributes.position.count,
      archLengthCm: +ARCLEN.toFixed(2),
    },
    null,
    1,
  ),
);
