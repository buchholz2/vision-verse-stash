// Ferramenta de desenvolvimento: relatório da mordida fechada (linha média, overjet, overbite, relação de caninos e molares).
// Uso: npx vite-node scripts/bite-report.ts
import fs from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const buf = fs.readFileSync("model-src/dental-arch.raw.glb");
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const gltf = await new Promise<{ scene: THREE.Object3D }>((res, rej) => new GLTFLoader().parse(ab, "", res, rej));
const root = gltf.scene;
const upper = root.getObjectByName("upper_arch")!;
upper.rotation.x = 0;
root.updateMatrixWorld(true);

const box = (mesh: THREE.Mesh, filter: (v: THREE.Vector3) => boolean = () => true) => {
  const b = new THREE.Box3();
  const p = mesh.geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld);
    if (filter(v)) b.expandByPoint(v);
  }
  return b;
};
const f = (n: number) => n.toFixed(3);
const lower = (id: string) => box(root.getObjectByName(`crown_${id}`) as THREE.Mesh);
const ut = upper.getObjectByName("upper_teeth") as THREE.Mesh;

// Dentes superiores individuais: agrupa os vértices por proximidade em x (o mesh é único, 16 dentes).
const p = ut.geometry.attributes.position;
const v = new THREE.Vector3();
const pts: THREE.Vector3[] = [];
for (let i = 0; i < p.count; i++) pts.push(v.fromBufferAttribute(p, i).applyMatrix4(ut.matrixWorld).clone());
const xs = pts.map((q) => q.x).sort((a, b) => a - b);
console.log("upper x:", f(xs[0]), "..", f(xs.at(-1)!), " lower x:", f(lower("38").min.x), "..", f(lower("48").max.x));
const centralU = box(ut, (q) => Math.abs(q.x) < 0.3 && q.z > 1.2);
const l31 = lower("31"), l41 = lower("41");
console.log("incisivos centrais superiores:", `y ${f(centralU.min.y)}..${f(centralU.max.y)} z ${f(centralU.min.z)}..${f(centralU.max.z)}`);
console.log("incisivos centrais inferiores 31/41:", `y ${f(l31.min.y)}..${f(l31.max.y)} z ${f(l31.min.z)}..${f(l31.max.z)} | x31 ${f(l31.min.x)}..${f(l31.max.x)} x41 ${f(l41.min.x)}..${f(l41.max.x)}`);
const midLower = (l31.max.x + l41.min.x) / 2;
console.log("linha média inferior x =", f(midLower));
// Contato entre os dois centrais superiores: x onde a densidade cai (vão entre dentes).
const upperMid = box(ut, (q) => q.z > 1.6 && q.y < centralU.min.y + 0.15);
console.log("linha média superior (centro da faixa dos dois centrais) x ≈", f((upperMid.min.x + upperMid.max.x) / 2));
console.log("overjet (z labial sup - inf):", f(centralU.max.z - l31.max.z), " overbite (topo inf - borda sup):", f(l31.max.y - centralU.min.y));
