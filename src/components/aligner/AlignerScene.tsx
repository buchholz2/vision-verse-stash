import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";

/** Posições (px, no espaço do canvas) dos pontos 3D a que os balões apontam. Escritas a cada quadro, sem estado React. */
export type AnchorOutputs = Record<AnchorId, { x: MotionValue<number>; y: MotionValue<number> }>;
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { DENTAL_MODEL_URL, DENTAL_NODE_NAMES, MISALIGNMENT_SCALE, TEETH, TOOTH_IDS, type ToothPose } from "@/lib/dental/dentalModelConfig";
import { alignerState, cameraPose, jawAngle, JAW_CLOSED_RAD, JAW_OPEN_RAD, toothProgress, type AnchorId } from "@/lib/dental/timeline";
import { createFrameBudget, type QualityLevel } from "@/lib/dental/frame-budget";
import { usesSideBalloons } from "./AlignerCallouts";
import { ALIGNER_BASE_OPACITY, makeMaterials, useEnvironment } from "./studio";

const rad = THREE.MathUtils.degToRad;

interface Props {
  /** Progresso local da seção (0–1). Lido a cada quadro, sem estado React. */
  progress: MotionValue<number>;
  /** Pior caso de custo: limita a resolução em telas pequenas. */
  compact?: boolean;
  /** Saída das posições projetadas dos pontos de ancoragem dos balões. */
  anchors?: AnchorOutputs;
  /** Afasta a câmera (× distância); usado só para gerar os quadros estáticos. */
  zoomScale?: number;
  /** Somente depuração em desenvolvimento: força azimute/elevação (°). */
  poseOverride?: { azimuth?: number; elevation?: number };
  /** Somente captura de quadros em desenvolvimento. */
  preserveDrawingBuffer?: boolean;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}

interface BoneRig {
  bone: THREE.Object3D;
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
  start: ToothPose;
  delay: number;
}

function Rig({ progress, onReady, anchors, zoomScale = 1, poseOverride }: Pick<Props, "progress" | "onReady" | "anchors" | "zoomScale" | "poseOverride">) {
  // O GLB distribuído usa compressão meshopt (EXT_meshopt_compression).
  const gltf = useLoader(GLTFLoader, DENTAL_MODEL_URL, (loader) => loader.setMeshoptDecoder(MeshoptDecoder));
  const invalidate = useThree((s) => s.invalidate);
  useEnvironment();

  const rig = useMemo(() => {
    const root = gltf.scene;
    const materials = makeMaterials();
    const bones: BoneRig[] = [];
    for (const id of TOOTH_IDS) {
      const bone = root.getObjectByName(id);
      if (!bone) throw new Error(`Dente ausente no modelo: ${id}`);
      // A pose final do modelo é lida uma única vez (o GLB é compartilhado pelo cache do loader).
      bone.userData.base ??= { pos: bone.position.clone(), quat: bone.quaternion.clone() };
      bones.push({ bone, pos: bone.userData.base.pos, quat: bone.userData.base.quat, start: TEETH[id].start, delay: TEETH[id].delay });
      // O cache pode guardar a pose do último quadro de uma cena anterior.
      // Mede o enquadramento sempre na mesma pose alinhada.
      bone.position.copy(bone.userData.base.pos);
      bone.quaternion.copy(bone.userData.base.quat);
    }
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const name = mesh.name;
      if (name === DENTAL_NODE_NAMES.gum || name === "upper_gum") mesh.material = materials.gum;
      else if (name === DENTAL_NODE_NAMES.aligner) mesh.material = materials.aligner;
      else mesh.material = materials.enamel;
      mesh.frustumCulled = false;
      if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
    });
    const aligner = root.getObjectByName(DENTAL_NODE_NAMES.aligner) as THREE.SkinnedMesh;
    if (!aligner?.isSkinnedMesh) throw new Error("Alinhador (SkinnedMesh) ausente no modelo.");
    // 'detached': o deslocamento do nó do alinhador vale depois da deformação pelos ossos.
    aligner.bindMode = THREE.DetachedBindMode;
    aligner.bind(aligner.skeleton, new THREE.Matrix4());
    aligner.renderOrder = 2;
    // Enquadramento pelo volume real da arcada (dentes + gengiva, pose final).
    root.updateMatrixWorld(true);
    const box = new THREE.Box3();
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh !== aligner) box.expandByObject(mesh);
    });
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const upper = root.getObjectByName(DENTAL_NODE_NAMES.upper) ?? null;
    // Mesma medida com a mandíbula superior aberta: o enquadramento interpola entre as duas, para nada ser cortado.
    let sphereOpen = sphere;
    if (upper) {
      upper.rotation.x = -JAW_OPEN_RAD;
      root.updateMatrixWorld(true);
      const openBox = new THREE.Box3();
      root.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh && mesh !== aligner) openBox.expandByObject(mesh);
      });
      sphereOpen = openBox.getBoundingSphere(new THREE.Sphere());
      upper.rotation.x = 0;
      root.updateMatrixWorld(true);
    }
    const incisorA = root.getObjectByName("tooth_31");
    const incisorB = root.getObjectByName("tooth_41");
    return { root, bones, aligner, materials, sphere, sphereOpen, upper, incisorA, incisorB };
  }, [gltf]);

  useEffect(() => {
    onReady?.();
    return progress.on("change", () => invalidate());
  }, [progress, invalidate, onReady]);

  useEffect(() => {
    invalidate();
  }, [invalidate, rig]);

  const tmpV = useMemo(() => new THREE.Vector3(), []);
  const tmpE = useMemo(() => new THREE.Euler(), []);
  const tmpQ = useMemo(() => new THREE.Quaternion(), []);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);
  const tmpC = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, size }) => {
    const p = progress.get();

    // Dentes: cada um interpola do desalinhamento inicial até a pose alinhada do modelo.
    for (const item of rig.bones) {
      const k = (1 - toothProgress(p, item.delay)) * MISALIGNMENT_SCALE;
      const s = item.start;
      tmpV.set((s.dx ?? 0) * k, (s.dy ?? 0) * k, (s.dz ?? 0) * k).applyQuaternion(item.quat);
      item.bone.position.copy(item.pos).add(tmpV);
      tmpE.set(rad((s.tiltBL ?? 0) * k), rad((s.yaw ?? 0) * k), rad((s.tiltMD ?? 0) * k), "YXZ");
      tmpQ.setFromEuler(tmpE);
      item.bone.quaternion.copy(item.quat).multiply(tmpQ);
    }

    // Alinhador: aproxima, acompanha os dentes pelos ossos e se afasta no final.
    const a = alignerState(p);
    const lift = (1 - a.fit) * 2.7 + a.away * 1.9;
    const forward = (1 - a.fit) * 1.2 + a.away * 0.4;
    rig.aligner.position.set(0, lift, forward);
    rig.aligner.rotation.set(-0.42 * (1 - a.fit) - 0.2 * a.away, 0.18 * (1 - a.fit), 0);
    rig.aligner.visible = a.opacity > 0.01;
    (rig.materials.aligner as THREE.MeshPhysicalMaterial).opacity = ALIGNER_BASE_OPACITY * a.opacity;

    // Arcada superior: aberta como em um modelo de estudo; fecha no fim, sobre a inferior.
    if (rig.upper) rig.upper.rotation.x = -jawAngle(p);

    // Câmera coreografada pela rolagem: aproxima nos dentes durante o movimento e abre para o sorriso no fim.
    const aspect = size.width / size.height;
    const perspective = camera as THREE.PerspectiveCamera;
    const pose = cameraPose(p);
    const halfV = rad(perspective.fov) / 2;
    const halfH = Math.atan(Math.tan(halfV) * aspect);
    const portrait = aspect < 0.95;
    const openness = THREE.MathUtils.clamp((jawAngle(p) - JAW_CLOSED_RAD) / (JAW_OPEN_RAD - JAW_CLOSED_RAD), 0, 1);
    const radius = THREE.MathUtils.lerp(rig.sphere.radius, rig.sphereOpen.radius, openness);
    const center = tmpC.lerpVectors(rig.sphere.center, rig.sphereOpen.center, openness);
    // Área livre para a arcada: abaixo do cabeçalho e, em telas estreitas, acima do balão (que fica embaixo).
    const sideLayout = usesSideBalloons({ width: size.width, height: size.height });
    const insetTop = sideLayout ? 0.12 : 0.11;
    const insetBottom = sideLayout ? 0.13 : 0.4;
    const halfVFree = Math.atan(Math.tan(halfV) * (1 - insetTop - insetBottom));
    // Em telas estreitas a largura manda: abaixo de ~0,8–1 a arcada (com a gengiva superior aberta) sairia pelas laterais.
    const floor = THREE.MathUtils.lerp(0.8, 0.98, THREE.MathUtils.smoothstep(p, 0.8, 0.95));
    const zoom = sideLayout ? pose.zoom : Math.max(pose.zoom, floor);
    const distance = (radius / Math.sin(Math.min(halfVFree, halfH * 0.96))) * zoom * zoomScale;
    const azimuth = rad(poseOverride?.azimuth ?? (portrait ? pose.azimuth * 0.8 : pose.azimuth));
    const elevation = rad(poseOverride?.elevation ?? pose.elevation);
    const c = center;
    perspective.setViewOffset(size.width, size.height, 0, ((insetBottom - insetTop) / 2) * size.height, size.width, size.height);
    perspective.position.set(
      c.x + Math.sin(azimuth) * Math.cos(elevation) * distance,
      c.y + Math.sin(elevation) * distance,
      c.z + Math.cos(azimuth) * Math.cos(elevation) * distance,
    );
    perspective.lookAt(c.x, c.y + radius * pose.targetLift, c.z);

    // Pontos de ancoragem dos balões, projetados para pixels (a câmera é atualizada aqui, no mesmo quadro).
    if (anchors) {
      perspective.updateMatrixWorld();
      perspective.matrixWorldInverse.copy(perspective.matrixWorld).invert();
      const top = 0.6;
      const project = (v: THREE.Vector3, id: AnchorId) => {
        v.project(perspective);
        anchors[id].x.set((v.x * 0.5 + 0.5) * size.width);
        anchors[id].y.set((-v.y * 0.5 + 0.5) * size.height);
      };
      const pos = (name: string, out: THREE.Vector3) => {
        const item = rig.bones.find((b) => b.bone.name === name);
        return item ? out.copy(item.bone.position) : out.set(0, 0, 0);
      };
      pos("tooth_31", tmpA).add(pos("tooth_41", tmpB)).multiplyScalar(0.5);
      const incisors = tmpA.clone().setY(tmpA.y + top);
      project(incisors.clone(), "incisors");
      project(incisors.clone().add(rig.aligner.position), "aligner");
      project(pos("tooth_33", tmpB).setY(tmpB.y + top), "canineLeft");
      project(pos("tooth_46", tmpB).setY(tmpB.y + top), "molarRight");
    }
  });

  return <primitive object={rig.root} />;
}

/** Mede a taxa de quadros durante a animação: reduz a resolução e, se continuar lenta, pede a alternativa estática. */
function PerformanceGuard({ onLevel }: { onLevel: (level: QualityLevel) => void }) {
  const budget = useRef<ReturnType<typeof createFrameBudget>>();
  const last = useRef(0);
  useFrame(() => {
    budget.current ??= createFrameBudget(onLevel);
    const now = performance.now();
    if (last.current) budget.current.push(now - last.current);
    last.current = now;
  });
  return null;
}

export default function AlignerScene({ progress, compact, anchors, zoomScale, poseOverride, preserveDrawingBuffer, onReady, onError }: Props) {
  const [reduced, setReduced] = useState(false);
  const handleLevel = (level: QualityLevel) => {
    if (level === 1) setReduced(true);
    if (level === 2) onError?.(new Error("A cena 3D ficou lenta neste aparelho."));
  };
  return (
    <Canvas
      frameloop="demand"
      dpr={preserveDrawingBuffer ? 2 : reduced ? 1 : compact ? [1, 1.5] : [1, 2]}
      camera={{ fov: 26, near: 0.5, far: 80, position: [6, 6, 11] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.18;
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onError?.(new Error("webglcontextlost"));
        });
      }}
      style={{ touchAction: "pan-y" }}
    >
      <directionalLight position={[-4, 8, 7]} intensity={1.5} color="#fff3e2" />
      <directionalLight position={[6, 3, -4]} intensity={0.6} color="#a9c6f2" />
      {!preserveDrawingBuffer && <PerformanceGuard onLevel={handleLevel} />}
      <Suspense fallback={null}>
        <ErrorCatcher onError={onError}>
          <Rig progress={progress} onReady={onReady} anchors={anchors} zoomScale={zoomScale} poseOverride={poseOverride} />
        </ErrorCatcher>
      </Suspense>
    </Canvas>
  );
}


class ErrorCatcher extends Component<{ children: ReactNode; onError?: (e: unknown) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
