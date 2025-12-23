import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface SelfLockingNutProps {
  scale?: number;
  autoRotate?: boolean;
}

export const SelfLockingNut = ({ scale = 1, autoRotate = true }: SelfLockingNutProps) => {
  const nutRef = useRef<Mesh>(null);
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.22;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
    }
  });

  // MS21042-4 specifications - Aluminum alloy
  const height = 0.36;
  const outerDiameter = 0.56;
  const innerDiameter = 0.25;
  const collarHeight = 0.13;
  const threadDepth = 0.015;

  const aluminumMaterial = useMemo(() => ({
    color: "#d4dce8",
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.3,
    clearcoat: 0.15,
  }), []);

  const nylonMaterial = useMemo(() => ({
    color: "#1e3a5f",
    metalness: 0.05,
    roughness: 0.85,
    envMapIntensity: 0.3,
  }), []);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main hex body */}
      <mesh ref={nutRef} castShadow receiveShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2, height, 6]} />
        <meshStandardMaterial {...aluminumMaterial} />
      </mesh>

      {/* Top chamfer */}
      <mesh position={[0, height / 2 + 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[outerDiameter / 2 - 0.04, outerDiameter / 2, 0.05, 6]} />
        <meshStandardMaterial {...aluminumMaterial} roughness={0.15} />
      </mesh>

      {/* Bottom chamfer */}
      <mesh position={[0, -height / 2 - 0.025, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2 - 0.04, 0.05, 6]} />
        <meshStandardMaterial {...aluminumMaterial} roughness={0.15} />
      </mesh>

      {/* Nylon locking collar (more realistic blue polymer) */}
      <mesh position={[0, height / 2 - collarHeight / 2 + 0.01, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[innerDiameter / 2 + 0.025, innerDiameter / 2 + 0.025, collarHeight, 32]} />
        <meshStandardMaterial {...nylonMaterial} />
      </mesh>

      {/* Thread hole visualization */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[innerDiameter / 2, innerDiameter / 2, height + 0.02, 32]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.2} 
          roughness={0.75}
          side={2}
        />
      </mesh>

      {/* Internal threads */}
      {Array.from({ length: 8 }).map((_, i) => {
        const yPos = (i - 4) * 0.04;
        return (
          <mesh 
            key={i}
            position={[0, yPos, 0]}
            rotation={[0, i * 0.4, 0]}
          >
            <torusGeometry args={[innerDiameter / 2 + threadDepth, threadDepth / 2, 8, 24]} />
            <meshStandardMaterial 
              color="#4a5568" 
              metalness={0.4} 
              roughness={0.7}
            />
          </mesh>
        );
      })}

      {/* Hex flats detail lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * (outerDiameter / 2 - 0.01);
        const z = Math.sin(angle) * (outerDiameter / 2 - 0.01);
        return (
          <mesh 
            key={`flat-${i}`}
            position={[x, 0, z]}
            rotation={[0, angle + Math.PI / 2, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.005, 0.005, height * 0.95, 16]} />
            <meshStandardMaterial 
              color="#b8c5d6" 
              metalness={0.95} 
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};
