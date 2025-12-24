import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color } from "three";

interface SelfLockingNutProps {
  scale?: number;
  autoRotate?: boolean;
}

export const SelfLockingNut = ({ scale = 1, autoRotate = true }: SelfLockingNutProps) => {
  const groupRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
    }
  });

  // MS21042-4 CRES specifications
  const totalHeight = 0.281;
  const collarHeight = 0.094;
  const metalHeight = totalHeight - collarHeight;
  const widthAcrossFlats = 0.438;
  const outerDiameter = widthAcrossFlats / Math.cos(Math.PI / 6);
  const innerDiameter = 0.25; // 1/4-28 UNF-3B

  // High-fidelity cadmium-plated CRES material (silver-gray finish)
  const cadmiumMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.72, 0.74, 0.76),
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.2,
  }), []);

  const cadmiumDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.62, 0.64, 0.66),
    metalness: 0.90,
    roughness: 0.24,
  }), []);

  // Blue nylon insert material
  const nylonMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.12, 0.24, 0.36),
    metalness: 0.05,
    roughness: 0.75,
    envMapIntensity: 0.3,
  }), []);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Main hex body - metal portion */}
      <mesh position={[0, -collarHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2, metalHeight, 6]} />
        <primitive object={cadmiumMaterial} attach="material" />
      </mesh>

      {/* Hex flat detail lines for realism */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const distance = widthAcrossFlats / 2;
        return (
          <mesh 
            key={`flat-${i}`}
            position={[
              Math.cos(angle) * distance,
              -collarHeight / 2,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.002, metalHeight - 0.02, widthAcrossFlats * 0.8]} />
            <primitive object={cadmiumDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Nylon locking collar (blue) - top portion */}
      <mesh position={[0, metalHeight / 2 + collarHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2, collarHeight, 6]} />
        <primitive object={nylonMaterial} attach="material" />
      </mesh>

      {/* Nylon insert detail - textured surface */}
      <mesh position={[0, metalHeight / 2 + collarHeight / 2, 0]}>
        <torusGeometry args={[innerDiameter / 2 + 0.02, 0.015, 12, 32]} />
        <meshStandardMaterial 
          color="#0d1a28"
          metalness={0.02}
          roughness={0.85}
        />
      </mesh>

      {/* Top chamfer - beveled edge */}
      <mesh position={[0, totalHeight / 2 + 0.015, 0]} castShadow>
        <cylinderGeometry args={[outerDiameter / 2 - 0.02, outerDiameter / 2, 0.03, 6]} />
        <primitive object={nylonMaterial} attach="material" />
      </mesh>

      {/* Bottom chamfer - beveled edge */}
      <mesh position={[0, -totalHeight / 2 - 0.015, 0]} castShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2 - 0.02, 0.03, 6]} />
        <primitive object={cadmiumMaterial} attach="material" />
      </mesh>

      {/* Internal thread bore - visible hole */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[innerDiameter / 2, innerDiameter / 2, totalHeight + 0.02, 32]} />
        <meshStandardMaterial 
          color="#2a2e35"
          metalness={0.4}
          roughness={0.65}
          side={2}
        />
      </mesh>

      {/* Internal thread detail rings - visible through hole */}
      {Array.from({ length: 8 }).map((_, i) => {
        const yPos = (i / 7) * metalHeight - metalHeight / 2 - collarHeight / 2;
        return (
          <mesh 
            key={`thread-${i}`}
            position={[0, yPos, 0]}
          >
            <torusGeometry args={[innerDiameter / 2 + 0.005, 0.008, 8, 24]} />
            <meshStandardMaterial 
              color="#3a4048"
              metalness={0.5}
              roughness={0.6}
            />
          </mesh>
        );
      })}

      {/* Transition band between metal and nylon */}
      <mesh position={[0, metalHeight / 2, 0]}>
        <cylinderGeometry args={[outerDiameter / 2 + 0.002, outerDiameter / 2 + 0.002, 0.01, 6]} />
        <meshStandardMaterial 
          color="#4a5058"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};
