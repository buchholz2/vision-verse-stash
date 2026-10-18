import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export const ALIGNER_BASE_OPACITY = 0.1;

/** Ambiente de estúdio próprio: caixas de luz suaves refletidas no esmalte, sem arquivos HDR externos. */
export function buildStudio() {
  const studio = new THREE.Scene();
  studio.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(40, 28, 40),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#2a3a4c"), side: THREE.BackSide }),
    ),
  );
  const panel = (w: number, h: number, pos: [number, number, number], color: string, power: number) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide }),
    );
    mesh.position.set(...pos);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
  };
  panel(14, 9, [-8, 11, 9], "#fff4e0", 6.5); // principal, alta e à esquerda
  panel(3, 16, [13, 4, 3], "#dbe8ff", 2.4); // faixa lateral fria
  panel(18, 3, [-2, 7, -13], "#bcd2f5", 3.4); // contraluz
  panel(16, 16, [0, 15, 0], "#fffaf0", 2.2); // topo difuso
  panel(20, 10, [0, -9, 6], "#cdbfa8", 0.9); // rebatedor quente inferior
  return studio;
}

export function useEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const studio = buildStudio();
    const target = pmrem.fromScene(studio, 0.03);
    scene.environment = target.texture;
    scene.environmentIntensity = 1;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      studio.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        }
      });
    };
  }, [gl, scene]);
}

const NOISE_GLSL = `
float h31(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), f.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), f.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), f.x), f.y), f.z);
}`;

export function makeMaterials() {
  // Esmalte sem textura: a cor vem do gradiente colo → borda (atributo _edge) e de um ruído suave no shader.
  const enamel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f4efe6"),
    roughness: 0.34,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
    sheen: 0.25,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#fff1dc"),
    envMapIntensity: 0.9,
  });
  // Microvariação de rugosidade (ruído suave em espaço do objeto): o brilho deixa de parecer plástico uniforme.
  enamel.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;\nattribute float _edge;\nvarying float vEdge;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObjPos = position;\nvEdge = _edge;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vObjPos;\nvarying float vEdge;\n${NOISE_GLSL}`)
      // Esmalte real: colo mais quente e opaco, borda incisal mais clara, fria e levemente translúcida.
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         float neck = 1.0 - smoothstep(0.0, 0.42, vEdge);
         float tip = smoothstep(0.72, 1.0, vEdge);
         diffuseColor.rgb *= mix(vec3(1.04, 1.03, 1.02), vec3(0.99, 0.95, 0.9), neck * 0.45);
         float lum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.80, 0.86, 0.93) * (lum * 1.04), tip * 0.28);
         diffuseColor.rgb *= 0.985 + 0.03 * vnoise(vObjPos * 9.0);
         // Branqueamento: dessatura o creme do atlas e eleva o brilho do esmalte.
         float lum2 = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
         diffuseColor.rgb = mix(diffuseColor.rgb, vec3(lum2), 0.55) * vec3(1.16, 1.16, 1.2);`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
         roughnessFactor = clamp(roughnessFactor + (vnoise(vObjPos * 22.0) - 0.5) * 0.12, 0.08, 1.0);`,
      );
  };
  // As gengivas do modelo são cascas abertas: as duas faces precisam aparecer (por dentro se vê o palato).
  const gum = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    vertexColors: true,
    roughness: 0.72,
    metalness: 0,
    clearcoat: 0.06,
    clearcoatRoughness: 0.5,
    sheen: 0.18,
    sheenRoughness: 0.75,
    sheenColor: new THREE.Color("#edb8b4"),
    envMapIntensity: 0.42,
  });
  // Variação discreta do tecido, sem usar o atlas dos dentes na gengiva reconstruída.
  gum.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vGumPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvGumPos = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vGumPos;\n${NOISE_GLSL}`)
      .replace("#include <color_fragment>", `#include <color_fragment>
        diffuseColor.rgb *= 0.985 + 0.03 * vnoise(vGumPos * 14.0);`)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor + (vnoise(vGumPos * 35.0) - 0.5) * 0.07, 0.55, 0.85);`);
  };
  const aligner = new THREE.MeshPhysicalMaterial({
    color: "#d6e8f6",
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    transparent: true,
    opacity: ALIGNER_BASE_OPACITY,
    side: THREE.DoubleSide,
    depthWrite: false,
    envMapIntensity: 2.6,
    specularIntensity: 1,
  });
  // Transparência legível: a placa quase não cobre os dentes, mas bordas (Fresnel) e reflexos intensos ficam opacos.
  aligner.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      `float fres = pow(1.0 - abs(dot(normalize(vViewPosition), normalize(normal))), 2.6);
       float lum = dot(outgoingLight, vec3(0.299, 0.587, 0.114));
       float scale = opacity / ${ALIGNER_BASE_OPACITY.toFixed(3)};
       diffuseColor.a = clamp(diffuseColor.a + (fres * 0.5 + smoothstep(0.55, 1.1, lum) * 0.55) * scale, 0.0, 1.0);
       #include <opaque_fragment>`,
    );
  };
  return { enamel, gum, aligner };
}

