import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface HydraulicFittingProps {
  scale?: number;
  autoRotate?: boolean;
}

export const HydraulicFitting = ({ scale = 1, autoRotate = true }: HydraulicFittingProps) => {
  const fittingRef = useRef<Mesh>(null);
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
    }
  });

  // AN818-4 specifications - Brass flared tube fitting
  const bodyLength = 1.05;
  const bodyDiameter = 0.42;
  const hexDiameter = 0.62;
  const hexLength = 0.32;
  const flareLength = 0.28;

  const brassMaterial = useMemo(() => ({
    color: "#d4b896",
    metalness: 0.78,
    roughness: 0.32,
    envMapIntensity: 1.1,
  }), []);

  const darkBrassMaterial = useMemo(() => ({
    color: "#b89870",
    metalness: 0.72,
    roughness: 0.38,
    envMapIntensity: 0.9,
  }), []);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Hex nut section */}
      <mesh ref={fittingRef} position={[0, hexLength / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[hexDiameter / 2, hexDiameter / 2, hexLength, 6]} />
        <meshStandardMaterial {...brassMaterial} />
      </mesh>

      {/* Hex top chamfer */}
      <mesh position={[0, hexLength + 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[hexDiameter / 2 - 0.04, hexDiameter / 2, 0.04, 6]} />
        <meshStandardMaterial {...brassMaterial} roughness={0.25} />
      </mesh>

      {/* Transition sleeve */}
      <mesh position={[0, hexLength - 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[bodyDiameter / 2 + 0.06, hexDiameter / 2 - 0.02, 0.16, 32]} />
        <meshStandardMaterial {...brassMaterial} />
      </mesh>

      {/* Main body tube */}
      <mesh position={[0, -bodyLength / 2 + hexLength / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[bodyDiameter / 2, bodyDiameter / 2, bodyLength, 48]} />
        <meshStandardMaterial {...brassMaterial} roughness={0.28} />
      </mesh>

      {/* Flare section (cone) */}
      <mesh position={[0, -bodyLength + hexLength / 2 - flareLength / 2, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.38, flareLength, 48]} />
        <meshStandardMaterial {...darkBrassMaterial} />
      </mesh>

      {/* Flare lip */}
      <mesh position={[0, -bodyLength + hexLength / 2 - flareLength + 0.02, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.36, 0.025, 16, 48]} />
        <meshStandardMaterial {...brassMaterial} roughness={0.2} />
      </mesh>

      {/* Internal bore */}
      <mesh position={[0, -bodyLength / 2 + hexLength / 2, 0]}>
        <cylinderGeometry args={[0.16, 0.16, bodyLength + 0.1, 32]} />
        <meshStandardMaterial 
          color="#3d342a" 
          metalness={0.15} 
          roughness={0.85}
          side={2}
        />
      </mesh>

      {/* Thread ridges on hex section */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh 
          key={i}
          position={[0, (i * 0.045) + 0.08, 0]}
          castShadow
          receiveShadow
        >
          <torusGeometry args={[hexDiameter / 2 + 0.012, 0.015, 10, 32]} />
          <meshStandardMaterial {...darkBrassMaterial} />
        </mesh>
      ))}

      {/* Knurl pattern on body */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 48;
        const x = Math.cos(angle) * (bodyDiameter / 2 + 0.008);
        const z = Math.sin(angle) * (bodyDiameter / 2 + 0.008);
        return (
          <mesh 
            key={`knurl-${i}`}
            position={[x, -bodyLength / 4, z]}
            rotation={[0, angle + Math.PI / 2, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.004, 0.004, bodyLength / 2.5, 8]} />
            <meshStandardMaterial 
              color="#c0a888" 
              metalness={0.82} 
              roughness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
};
