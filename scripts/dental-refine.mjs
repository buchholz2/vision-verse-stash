import * as THREE from "three";

// Os dentes do asset têm só 133–207 vértices: silhuetas facetadas e cantos duros. Este refinamento subdivide a malha
// com tesselação de Phong (os vértices novos são puxados para os planos tangentes dos vértices vizinhos). Os vértices
// originais não se movem, então a arcada não encolhe nem abre espaços entre os dentes.

const key = (x, y, z) => `${Math.round(x * 1e4)},${Math.round(y * 1e4)},${Math.round(z * 1e4)}`;

/** Normais suaves e contínuas nas costuras de UV: soma ponderada pelo ângulo, agrupada por posição. */
export function weldedNormals(geometry) {
  const pos = geometry.attributes.position;
  const index = geometry.index.array;
  const sums = new Map();
  const ids = new Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const k = key(pos.getX(i), pos.getY(i), pos.getZ(i));
    ids[i] = k;
    if (!sums.has(k)) sums.set(k, new THREE.Vector3());
  }
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), n = new THREE.Vector3();
  for (let f = 0; f < index.length; f += 3) {
    const tri = [index[f], index[f + 1], index[f + 2]];
    [a, b, c].forEach((v, j) => v.fromBufferAttribute(pos, tri[j]));
    n.crossVectors(e1.subVectors(b, a), e2.subVectors(c, a));
    if (n.lengthSq() < 1e-14) continue;
    n.normalize();
    const corners = [[a, b, c], [b, c, a], [c, a, b]];
    for (let j = 0; j < 3; j++) {
      const [p, q, r] = corners[j];
      e1.subVectors(q, p).normalize();
      e2.subVectors(r, p).normalize();
      const angle = Math.acos(THREE.MathUtils.clamp(e1.dot(e2), -1, 1));
      sums.get(ids[tri[j]]).addScaledVector(n, angle);
    }
  }
  const out = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const v = sums.get(ids[i]).clone().normalize();
    out[i * 3] = v.x;
    out[i * 3 + 1] = v.y;
    out[i * 3 + 2] = v.z;
  }
  geometry.setAttribute("normal", new THREE.BufferAttribute(out, 3));
}

function subdivideOnce(geometry, alpha) {
  const pos = geometry.attributes.position, nor = geometry.attributes.normal, uv = geometry.attributes.uv;
  const index = geometry.index.array;
  const P = Array.from(pos.array), N = Array.from(nor.array), UV = Array.from(uv.array);
  const mids = new Map();
  const P0 = new THREE.Vector3(), P1 = new THREE.Vector3(), N0 = new THREE.Vector3(), N1 = new THREE.Vector3();
  const M = new THREE.Vector3(), A = new THREE.Vector3(), B = new THREE.Vector3(), L = new THREE.Vector3();
  const mid = (i, j) => {
    const id = i < j ? `${i}_${j}` : `${j}_${i}`;
    if (mids.has(id)) return mids.get(id);
    P0.set(P[i * 3], P[i * 3 + 1], P[i * 3 + 2]);
    P1.set(P[j * 3], P[j * 3 + 1], P[j * 3 + 2]);
    N0.set(N[i * 3], N[i * 3 + 1], N[i * 3 + 2]);
    N1.set(N[j * 3], N[j * 3 + 1], N[j * 3 + 2]);
    M.addVectors(P0, P1).multiplyScalar(0.5);
    // Projeção do ponto médio no plano tangente de cada ponta.
    A.copy(M).addScaledVector(N0, -M.clone().sub(P0).dot(N0));
    B.copy(M).addScaledVector(N1, -M.clone().sub(P1).dot(N1));
    L.addVectors(A, B).multiplyScalar(0.5);
    M.lerp(L, alpha);
    const n = N0.add(N1).normalize();
    const out = P.length / 3;
    P.push(M.x, M.y, M.z);
    N.push(n.x, n.y, n.z);
    UV.push((UV[i * 2] + UV[j * 2]) / 2, (UV[i * 2 + 1] + UV[j * 2 + 1]) / 2);
    mids.set(id, out);
    return out;
  };
  const idx = [];
  for (let f = 0; f < index.length; f += 3) {
    const a = index[f], b = index[f + 1], c = index[f + 2];
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    idx.push(a, ab, ca, b, bc, ab, c, ca, bc, ab, bc, ca);
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
  out.setAttribute("uv", new THREE.Float32BufferAttribute(UV, 2));
  out.setIndex(idx);
  return out;
}

/** `geometry`: indexada, com position/normal/uv. Retorna uma nova geometria refinada `levels` vezes. */
export function refineTooth(geometry, levels = 2, alpha = 0.72) {
  let geo = geometry;
  weldedNormals(geo);
  for (let i = 0; i < levels; i++) geo = subdivideOnce(geo, alpha);
  return geo;
}

/**
 * Atributo `edge` (_EDGE no GLB) por vértice: 0 no colo (junto à gengiva) e 1 na borda incisal/oclusal.
 * `neckSign` = +1 se o colo fica no menor Y (arcada inferior), -1 se fica no maior Y (superior).
 */
export function bakeEdge(geometry, neckSign) {
  const pos = geometry.attributes.position;
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    min = Math.min(min, pos.getY(i));
    max = Math.max(max, pos.getY(i));
  }
  const values = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - min) / Math.max(1e-6, max - min);
    values[i] = neckSign > 0 ? t : 1 - t;
  }
  geometry.setAttribute("edge", new THREE.BufferAttribute(values, 1));
}
