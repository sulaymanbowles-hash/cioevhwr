import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface PrecisionPinProps {
  scale?: number;
  autoRotate?: boolean;
}

export const PrecisionPin = ({ scale = 1, autoRotate = true }: PrecisionPinProps) => {
  const pinRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.32;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    }
  });

  // MS16555-2 specifications - Stainless steel clevis pin
  const shaftLength = 1.55;
  const shaftDiameter = 0.22;
  const headDiameter = 0.37;
  const headHeight = 0.16;
  const grooveWidth = 0.08;

  const stainlessMaterial = useMemo(() => ({
    color: "#e4ecf5",
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.6,
    clearcoat: 0.25,
  }), []);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main pin shaft - precision ground */}
      <mesh ref={pinRef} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[shaftDiameter / 2, shaftDiameter / 2, shaftLength, 64]} />
        <meshStandardMaterial {...stainlessMaterial} />
      </mesh>

      {/* Head (larger end) */}
      <mesh position={[-shaftLength / 2 - headHeight / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[headDiameter / 2, headDiameter / 2, headHeight, 48]} />
        <meshStandardMaterial {...stainlessMaterial} roughness={0.15} />
      </mesh>

      {/* Head chamfer */}
      <mesh position={[-shaftLength / 2 - headHeight - 0.015, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[headDiameter / 2 - 0.03, headDiameter / 2, 0.03, 48]} />
        <meshStandardMaterial {...stainlessMaterial} roughness={0.1} />
      </mesh>

      {/* Transition from head to shaft */}
      <mesh position={[-shaftLength / 2 + 0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[shaftDiameter / 2, headDiameter / 2 - 0.02, 0.08, 48]} />
        <meshStandardMaterial {...stainlessMaterial} roughness={0.13} />
      </mesh>

      {/* Chamfered tip */}
      <mesh position={[shaftLength / 2 + 0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
        <coneGeometry args={[shaftDiameter / 2, 0.1, 48]} />
        <meshStandardMaterial {...stainlessMaterial} />
      </mesh>

      {/* Cross-hole for cotter pin */}
      <mesh position={[shaftLength / 2 - 0.18, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.045, shaftDiameter + 0.06, 24]} />
        <meshStandardMaterial 
          color="#3a4350" 
          metalness={0.25} 
          roughness={0.75}
        />
      </mesh>

      {/* Retention groove near tip */}
      <mesh position={[shaftLength / 2 - 0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[shaftDiameter / 2 - 0.015, shaftDiameter / 2 - 0.015, grooveWidth, 48]} />
        <meshStandardMaterial 
          color="#b8c5d6" 
          metalness={0.92} 
          roughness={0.25}
        />
      </mesh>

      {/* Precision ground surface rings (finish marks) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i}
          position={[((i - 2) * 0.25), 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[shaftDiameter / 2 + 0.003, 0.006, 8, 64]} />
          <meshStandardMaterial 
            color="#c8d4e4" 
            metalness={0.98} 
            roughness={0.08}
          />
        </mesh>
      ))}

      {/* Centerline marks on head */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI) / 2;
        const y = Math.cos(angle) * (headDiameter / 2 - 0.02);
        const z = Math.sin(angle) * (headDiameter / 2 - 0.02);
        return (
          <mesh 
            key={`mark-${i}`}
            position={[-shaftLength / 2 - headHeight / 2, y, z]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.003, 0.003, headHeight * 0.8, 16]} />
            <meshStandardMaterial 
              color="#a8b8cc" 
              metalness={0.95} 
              roughness={0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
};
