import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface HexBoltProps {
  scale?: number;
}

export const HexBolt = ({ scale = 1 }: HexBoltProps) => {
  const boltRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (boltRef.current) {
      boltRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      boltRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // NAS6204 specifications - Hex head cap screw
  const headHeight = 0.3;
  const headDiameter = 0.6;
  const shaftDiameter = 0.25;
  const shaftLength = 1.2;
  const threadPitch = 0.05;

  return (
    <group scale={scale}>
      {/* Hex Head */}
      <mesh ref={boltRef} position={[0, shaftLength / 2 + headHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[headDiameter / 2, headDiameter / 2, headHeight, 6]} />
        <meshStandardMaterial 
          color="#8892a8" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Shaft */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[shaftDiameter / 2, shaftDiameter / 2, shaftLength, 32]} />
        <meshStandardMaterial 
          color="#9ba5b8" 
          metalness={0.85} 
          roughness={0.25}
        />
      </mesh>

      {/* Thread visualization (simplified) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh 
          key={i}
          position={[0, (i * threadPitch) - shaftLength / 3, 0]}
          castShadow
        >
          <torusGeometry args={[shaftDiameter / 2, 0.01, 8, 24]} />
          <meshStandardMaterial 
            color="#7a8496" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Tip chamfer */}
      <mesh position={[0, -shaftLength / 2 - 0.05, 0]} castShadow>
        <coneGeometry args={[shaftDiameter / 2, 0.1, 32]} />
        <meshStandardMaterial 
          color="#9ba5b8" 
          metalness={0.85} 
          roughness={0.25}
        />
      </mesh>
    </group>
  );
};
