import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface PrecisionPinProps {
  scale?: number;
}

export const PrecisionPin = ({ scale = 1 }: PrecisionPinProps) => {
  const pinRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      pinRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // MS16555-2 specifications - Clevis pin
  const shaftLength = 1.5;
  const shaftDiameter = 0.2;
  const headDiameter = 0.35;
  const headHeight = 0.15;

  return (
    <group scale={scale}>
      {/* Main pin shaft */}
      <mesh ref={pinRef} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[shaftDiameter / 2, shaftDiameter / 2, shaftLength, 32]} />
        <meshStandardMaterial 
          color="#c0c8d4" 
          metalness={0.95} 
          roughness={0.15}
        />
      </mesh>

      {/* Head (larger end) */}
      <mesh position={[-shaftLength / 2 - headHeight / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[headDiameter / 2, headDiameter / 2, headHeight, 32]} />
        <meshStandardMaterial 
          color="#b0b8c4" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Chamfered tip */}
      <mesh position={[shaftLength / 2 + 0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[shaftDiameter / 2, 0.1, 32]} />
        <meshStandardMaterial 
          color="#c0c8d4" 
          metalness={0.95} 
          roughness={0.15}
        />
      </mesh>

      {/* Cross-hole for cotter pin */}
      <mesh position={[shaftLength / 2 - 0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, shaftDiameter + 0.05, 16]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.3} 
          roughness={0.7}
        />
      </mesh>

      {/* Precision ground surface rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh 
          key={i}
          position={[((i - 1) * 0.4), 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[shaftDiameter / 2 + 0.005, 0.008, 8, 32]} />
          <meshStandardMaterial 
            color="#a8b4c0" 
            metalness={0.98} 
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
