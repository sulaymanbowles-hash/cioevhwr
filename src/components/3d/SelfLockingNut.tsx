import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface SelfLockingNutProps {
  scale?: number;
}

export const SelfLockingNut = ({ scale = 1 }: SelfLockingNutProps) => {
  const nutRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (nutRef.current) {
      nutRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      nutRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // MS21042-4 specifications
  const height = 0.35;
  const outerDiameter = 0.55;
  const innerDiameter = 0.25;
  const collarHeight = 0.12;

  return (
    <group scale={scale}>
      {/* Main hex body */}
      <mesh ref={nutRef} castShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2, height, 6]} />
        <meshStandardMaterial 
          color="#a8b2c4" 
          metalness={0.85} 
          roughness={0.25}
        />
      </mesh>

      {/* Nylon locking collar (blue/dark) */}
      <mesh position={[0, height / 2 - collarHeight / 2, 0]}>
        <cylinderGeometry args={[innerDiameter / 2 + 0.02, innerDiameter / 2 + 0.02, collarHeight, 24]} />
        <meshStandardMaterial 
          color="#2d3e5c" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>

      {/* Thread hole */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[innerDiameter / 2, innerDiameter / 2, height + 0.01, 24]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.3} 
          roughness={0.7}
          side={2}
        />
      </mesh>

      {/* Chamfer edges top */}
      <mesh position={[0, height / 2 + 0.03, 0]}>
        <cylinderGeometry args={[outerDiameter / 2 - 0.05, outerDiameter / 2, 0.06, 6]} />
        <meshStandardMaterial 
          color="#8892a8" 
          metalness={0.85} 
          roughness={0.2}
        />
      </mesh>

      {/* Chamfer edges bottom */}
      <mesh position={[0, -height / 2 - 0.03, 0]}>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2 - 0.05, 0.06, 6]} />
        <meshStandardMaterial 
          color="#8892a8" 
          metalness={0.85} 
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};
