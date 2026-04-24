import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/**
 * Tooth-like silhouette built from primitives.
 * Premium glass/pearl material — meant as a discreet background element.
 */
function ToothMesh() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.18) * 0.35;
    group.current.rotation.x = Math.sin(t * 0.12) * 0.12 - 0.05;
    group.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={group} scale={1.05}>
      {/* Crown (top wider rounded body) */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[1.1, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.18}
          transmission={1}
          ior={1.35}
          chromaticAberration={0.04}
          backside
          color={"#e9efe9"}
          attenuationColor={"#cfd9cf"}
          attenuationDistance={2}
        />
      </mesh>
      {/* Subtle crown notch (occlusal hint) */}
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.32, 0.06, 16, 64]} />
        <meshStandardMaterial color={"#dfe6df"} roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Roots — two tapered cones */}
      <mesh position={[-0.42, -0.95, 0]} rotation={[0, 0, 0.18]}>
        <coneGeometry args={[0.42, 1.6, 32]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.32}
          color={"#e9efe9"}
          attenuationColor={"#bcc8bd"}
          attenuationDistance={1.6}
        />
      </mesh>
      <mesh position={[0.42, -0.95, 0]} rotation={[0, 0, -0.18]}>
        <coneGeometry args={[0.42, 1.6, 32]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.32}
          color={"#e9efe9"}
          attenuationColor={"#bcc8bd"}
          attenuationDistance={1.6}
        />
      </mesh>
      {/* Discreet gold ring — orthodontic arch hint */}
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.18, 0.012, 16, 96]} />
        <meshStandardMaterial color={"#C9A86A"} metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={"#C9A86A"}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface ToothSceneProps {
  className?: string;
}

export default function ToothScene({ className }: ToothSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 5.5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} color={"#fff7e6"} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color={"#cfd9cf"} />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
            <ToothMesh />
          </Float>
          <Particles />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
