// Ferramenta de desenvolvimento: mede o quanto dentes vizinhos se atravessam durante o alinhamento.
// Uso: npx vite-node scripts/collision-check.ts   (lê model-src/dental-arch.raw.glb e a configuração da cena)
import fs from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MISALIGNMENT_SCALE, TEETH } from "../src/lib/dental/dentalModelConfig";
import { toothProgress } from "../src/lib/dental/timeline";

const buf = fs.readFileSync("model-src/dental-arch.raw.glb");
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const gltf = await new Promise<{ scene: THREE.Object3D }>((res, rej) => new GLTFLoader().parse(ab, "", res, rej));
const root: THREE.Object3D = gltf.scene;
const order = ["38", "37", "36", "35", "34", "33", "32", "31", "41", "42", "43", "44", "45", "46", "47", "48"];
const rad = THREE.MathUtils.degToRad;
const bones = order.map((n) => {
  const bone = root.getObjectByName(`tooth_${n}`)!;
  const crown = root.getObjectByName(`crown_${n}`) as THREE.Mesh;
  (crown.material as THREE.Material).side = THREE.DoubleSide; // contagem de interseções precisa das faces de trás
  return { id: `tooth_${n}`, bone, crown, pos: bone.position.clone(), quat: bone.quaternion.clone() };
});

function pose(p: number, scale = MISALIGNMENT_SCALE) {
  const tmpV = new THREE.Vector3();
  const tmpE = new THREE.Euler();
  const tmpQ = new THREE.Quaternion();
  for (const b of bones) {
    const cfg = TEETH[b.id];
    const k = (1 - toothProgress(p, cfg.delay)) * scale;
    const s = cfg.start;
    tmpV.set((s.dx ?? 0) * k, (s.dy ?? 0) * k, (s.dz ?? 0) * k).applyQuaternion(b.quat);
    b.bone.position.copy(b.pos).add(tmpV);
    tmpE.set(rad((s.tiltBL ?? 0) * k), rad((s.yaw ?? 0) * k), rad((s.tiltMD ?? 0) * k), "YXZ");
    tmpQ.setFromEuler(tmpE);
    b.bone.quaternion.copy(b.quat).multiply(tmpQ);
  }
  root.updateMatrixWorld(true);
}

// Penetração por distância com sinal: para cada vértice de A, acha o ponto mais próximo na superfície de B
// e testa se o vértice está do lado de dentro (contra a normal do triângulo).
const tri = new THREE.Triangle();
const closest = new THREE.Vector3();
const normal = new THREE.Vector3();
const world = (mesh: THREE.Mesh) => {
  const pos = mesh.geometry.attributes.position;
  const idx = mesh.geometry.index!.array;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) pts.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld));
  return { pts, idx, box: new THREE.Box3().setFromPoints(pts) };
};

export function measure(p: number, scale?: number) {
  pose(p, scale);
  const cache = new Map<string, ReturnType<typeof world>>();
  const get = (b: (typeof bones)[number]) => {
    if (!cache.has(b.id)) cache.set(b.id, world(b.crown));
    return cache.get(b.id)!;
  };
  const result: { pair: string; max: number; n: number }[] = [];
  for (let i = 0; i < bones.length - 1; i++) {
    const A = bones[i], B = bones[i + 1];
    let max = 0, n = 0;
    for (const [from, to] of [[A, B], [B, A]] as const) {
      const f = get(from), t = get(to);
      const nearBox = t.box.clone().expandByScalar(0.25);
      for (let j = 0; j < f.pts.length; j += 3) {
        const v = f.pts[j];
        if (!nearBox.containsPoint(v)) continue;
        let bestD = Infinity, bestSign = 1;
        for (let k = 0; k < t.idx.length; k += 3) {
          tri.set(t.pts[t.idx[k]], t.pts[t.idx[k + 1]], t.pts[t.idx[k + 2]]);
          tri.closestPointToPoint(v, closest);
          const d = closest.distanceToSquared(v);
          if (d < bestD) {
            bestD = d;
            tri.getNormal(normal);
            bestSign = normal.dot(v.clone().sub(closest));
          }
        }
        if (bestSign < 0) { n++; max = Math.max(max, Math.sqrt(bestD)); }
      }
    }
    result.push({ pair: `${A.id.slice(-2)}-${B.id.slice(-2)}`, max: +max.toFixed(3), n });
  }
  return result;
}

const ps = (process.env.P ?? "0,0.25,0.4,0.5,0.6,0.7,0.8,1").split(",").map(Number);
for (const p of ps) {
  const r = measure(p);
  const worst = r.reduce((m, x) => (x.max > m.max ? x : m), r[0]);
  console.log(`p=${p} pior=${worst.pair} ${worst.max} | ` + r.filter((x) => x.max > 0.02).map((x) => `${x.pair}:${x.max}`).join(" "));
}

/** Mordida fechada: arcada superior contra as coroas inferiores (penetração máxima e folga mínima). */
export function occlusion(jawDeg: number, dy = 0, dz = 0) {
  pose(1);
  const upper = root.getObjectByName("upper_arch")!;
  const base = upper.position.clone();
  upper.position.set(base.x, base.y + dy, base.z + dz);
  upper.rotation.x = -THREE.MathUtils.degToRad(jawDeg);
  root.updateMatrixWorld(true);
  const teeth = upper.getObjectByName("upper_teeth") as THREE.Mesh;
  const pos = teeth.geometry.attributes.position;
  const lowers = bones.map((b) => world(b.crown));
  let maxPen = 0, pen = 0, minGap = Infinity, contact = 0, n = 0;
  const region = { ant: { pen: 0, max: 0, gap: Infinity, contact: 0 }, post: { pen: 0, max: 0, gap: Infinity, contact: 0 } };
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 6) {
    v.fromBufferAttribute(pos, i).applyMatrix4(teeth.matrixWorld);
    for (const t of lowers) {
      if (!t.box.clone().expandByScalar(0.3).containsPoint(v)) continue;
      let bestD = Infinity, sign = 1;
      for (let k = 0; k < t.idx.length; k += 3) {
        tri.set(t.pts[t.idx[k]], t.pts[t.idx[k + 1]], t.pts[t.idx[k + 2]]);
        tri.closestPointToPoint(v, closest);
        const d = closest.distanceToSquared(v);
        if (d < bestD) { bestD = d; tri.getNormal(normal); sign = normal.dot(v.clone().sub(closest)); }
      }
      n++;
      const d = Math.sqrt(bestD);
      if (sign < 0) { pen++; maxPen = Math.max(maxPen, d); const r = Math.abs(v.x) < 1.7 ? region.ant : region.post; r.pen++; r.max = Math.max(r.max, d); } else { minGap = Math.min(minGap, d); if (d < 0.04) contact++; const r = Math.abs(v.x) < 1.7 ? region.ant : region.post; r.gap = Math.min(r.gap, d); if (d < 0.04) r.contact++; }
    }
  }
  upper.position.copy(base);
  return { jawDeg, dy, dz, n, pen, maxPen: +maxPen.toFixed(3), minGap: +minGap.toFixed(3), contact, ant: region.ant.pen + "/" + region.ant.max.toFixed(3), post: region.post.pen + "/" + region.post.max.toFixed(3), antGap: +region.ant.gap.toFixed(3), postGap: +region.post.gap.toFixed(3), antC: region.ant.contact, postC: region.post.contact };
}

if (process.env.OCC) {
  for (const spec of process.env.OCC.split(";")) {
    const [j, dy, dz] = spec.split(",").map(Number);
    console.log(JSON.stringify(occlusion(j, dy ?? 0, dz ?? 0)));
  }
}
