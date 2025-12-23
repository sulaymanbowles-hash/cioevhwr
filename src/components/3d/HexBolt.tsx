import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface HexBoltProps {
  scale?: number;
  autoRotate?: boolean;
}

export const HexBolt = ({ scale = 1, autoRotate = true }: HexBoltProps) => {
  const boltRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  // NAS6204 specifications - Hex head cap screw (Titanium Grade 5)
  const headHeight = 0.32;
  const headDiameter = 0.62;
  const shaftDiameter = 0.25;
  const shaftLength = 1.25;
  const threadPitch = 0.045;
  const threadDepth = 0.025;

  // Advanced titanium material properties with enhanced realism
  const titaniumMaterial = useMemo(() => ({
    color: "#c0cdd9",
    metalness: 0.97,
    roughness: 0.12,
    envMapIntensity: 1.5,
    clearcoat: 0.15,
    clearcoatRoughness: 0.25,
  }), []);

  const threadMaterial = useMemo(() => ({
    color: "#a8b5c4",
    metalness: 0.94,
    roughness: 0.22,
    envMapIntensity: 1.2,
  }), []);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Hex Head with chamfered edges */}
      <mesh ref={boltRef} position={[0, shaftLength / 2 + headHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[headDiameter / 2, headDiameter / 2, headHeight, 6]} />
        <meshStandardMaterial {...titaniumMaterial} />
      </mesh>

      {/* Head chamfer top */}
      <mesh position={[0, shaftLength / 2 + headHeight + 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[headDiameter / 2 - 0.04, headDiameter / 2, 0.04, 6]} />
        <meshStandardMaterial {...titaniumMaterial} roughness={0.1} />
      </mesh>

      {/* Socket drive (hexagonal recess) */}
      <mesh position={[0, shaftLength / 2 + headHeight / 2 + 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.15, 6]} />
        <meshStandardMaterial color="#4a5568" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Smooth shaft section */}
      <mesh position={[0, shaftLength / 4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[shaftDiameter / 2, shaftDiameter / 2, shaftLength / 2, 48]} />
        <meshStandardMaterial {...titaniumMaterial} roughness={0.12} />
      </mesh>

      {/* Threaded section with detailed helical threads */}
      {Array.from({ length: 24 }).map((_, i) => {
        const yPos = (i * threadPitch) - shaftLength / 2.5;
        return (
          <mesh 
            key={i}
            position={[0, yPos, 0]}
            rotation={[0, i * 0.3, 0]}
            castShadow
            receiveShadow
          >
            <torusGeometry args={[shaftDiameter / 2 + threadDepth / 2, threadDepth, 12, 32]} />
            <meshStandardMaterial {...threadMaterial} />
          </mesh>
        );
      })}

      {/* Underhead fillet */}
      <mesh position={[0, shaftLength / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[shaftDiameter / 2 + 0.02, headDiameter / 2 - 0.02, 0.06, 32]} />
        <meshStandardMaterial {...titaniumMaterial} roughness={0.18} />
      </mesh>

      {/* Chamfered tip */}
      <mesh position={[0, -shaftLength / 2 - 0.06, 0]} castShadow receiveShadow>
        <coneGeometry args={[shaftDiameter / 2 + threadDepth, 0.12, 32]} />
        <meshStandardMaterial {...threadMaterial} roughness={0.2} />
      </mesh>

      {/* Tip point */}
      <mesh position={[0, -shaftLength / 2 - 0.15, 0]} castShadow>
        <coneGeometry args={[shaftDiameter / 2, 0.06, 32]} />
        <meshStandardMaterial {...titaniumMaterial} roughness={0.15} />
      </mesh>
    </group>
  );
};
