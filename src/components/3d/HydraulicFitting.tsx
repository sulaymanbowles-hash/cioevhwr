import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface HydraulicFittingProps {
  scale?: number;
}

export const HydraulicFitting = ({ scale = 1 }: HydraulicFittingProps) => {
  const fittingRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (fittingRef.current) {
      fittingRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  // AN818-4 specifications - Flared tube fitting
  const bodyLength = 1.0;
  const bodyDiameter = 0.4;
  const hexDiameter = 0.6;
  const hexLength = 0.3;

  return (
    <group scale={scale}>
      {/* Hex nut section */}
      <mesh ref={fittingRef} position={[0, hexLength / 2, 0]} castShadow>
        <cylinderGeometry args={[hexDiameter / 2, hexDiameter / 2, hexLength, 6]} />
        <meshStandardMaterial 
          color="#b8a890" 
          metalness={0.75} 
          roughness={0.3}
        />
      </mesh>

      {/* Main body tube */}
      <mesh position={[0, -bodyLength / 2 + hexLength, 0]} castShadow>
        <cylinderGeometry args={[bodyDiameter / 2, bodyDiameter / 2, bodyLength, 32]} />
        <meshStandardMaterial 
          color="#d4c4a8" 
          metalness={0.7} 
          roughness={0.35}
        />
      </mesh>

      {/* Flare section (cone) */}
      <mesh position={[0, -bodyLength + hexLength - 0.15, 0]} castShadow>
        <coneGeometry args={[0.35, 0.3, 32]} />
        <meshStandardMaterial 
          color="#c4b498" 
          metalness={0.75} 
          roughness={0.3}
        />
      </mesh>

      {/* Internal bore */}
      <mesh position={[0, -bodyLength / 2 + hexLength, 0]}>
        <cylinderGeometry args={[0.15, 0.15, bodyLength + 0.1, 24]} />
        <meshStandardMaterial 
          color="#4a4238" 
          metalness={0.2} 
          roughness={0.8}
          side={2}
        />
      </mesh>

      {/* Thread ridges on hex section */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i}
          position={[0, (i * 0.05) + 0.05, 0]}
          castShadow
        >
          <torusGeometry args={[hexDiameter / 2 + 0.01, 0.012, 8, 24]} />
          <meshStandardMaterial 
            color="#a89880" 
            metalness={0.7} 
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Sleeve detail */}
      <mesh position={[0, hexLength + 0.1, 0]} castShadow>
        <cylinderGeometry args={[bodyDiameter / 2 + 0.05, bodyDiameter / 2 + 0.05, 0.15, 32]} />
        <meshStandardMaterial 
          color="#b8a890" 
          metalness={0.75} 
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};
