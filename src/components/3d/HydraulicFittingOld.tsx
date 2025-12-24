import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color } from "three";

interface HydraulicFittingProps {
  scale?: number;
  autoRotate?: boolean;
}

export const HydraulicFitting = ({ scale = 1, autoRotate = true }: HydraulicFittingProps) => {
  const groupRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.32;
    }
  });

  // AN818-4 specifications - 37° Flared tube fitting brass
  const bodyLength = 1.1;
  const bodyDiameter = 0.32;
  const hexDiameter = 0.625; // 7/16" hex
  const hexLength = 0.25;
  const tubeOD = 0.25; // 1/4" tube

  // High-fidelity brass material - richer golden tone
  const brassMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.88, 0.72, 0.36),
    metalness: 0.85,
    roughness: 0.24,
    envMapIntensity: 1.5,
  }), []);

  const brassDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.76, 0.60, 0.28),
    metalness: 0.82,
    roughness: 0.32,
  }), []);

  const brassPolishedMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.92, 0.78, 0.42),
    metalness: 0.88,
    roughness: 0.18,
    envMapIntensity: 1.6,
  }), []);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Hex nut section - wrench flats */}
      <mesh position={[0, hexLength / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[hexDiameter / 2, hexDiameter / 2, hexLength, 6]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Hex wrench marks (wear marks on flats) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const distance = (hexDiameter / 2) * 0.95;
        return (
          <mesh 
            key={`wear-${i}`}
            position={[
              Math.cos(angle) * distance,
              hexLength / 2,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.003, hexLength * 0.6, hexDiameter * 0.6]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Thread section on hex with accurate 7/16-20 UNF thread */}
      {Array.from({ length: 7 }).map((_, i) => {
        const yPos = (i * 0.05) + 0.02;
        return (
          <mesh 
            key={`hex-thread-${i}`}
            position={[0, yPos, 0]}
            castShadow
          >
            <torusGeometry args={[hexDiameter / 2 + 0.015, 0.015, 8, 32]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Main body tube - precision bore */}
      <mesh position={[0, -bodyLength / 2 + hexLength, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[bodyDiameter / 2, bodyDiameter / 2, bodyLength, 48]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Knurled grip section detail */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * Math.PI) / 24;
        const yPos = hexLength + 0.12;
        return (
          <mesh 
            key={`knurl-${i}`}
            position={[
              Math.cos(angle) * (bodyDiameter / 2 + 0.008),
              yPos,
              Math.sin(angle) * (bodyDiameter / 2 + 0.008)
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.008, 0.008, 0.12, 4]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* 37° Flare cone - precision seat */}
      <mesh position={[0, -bodyLength + hexLength - 0.18, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.38, 0.36, 48]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Flare lip detail ring */}
      <mesh position={[0, -bodyLength + hexLength - 0.02, 0]}>
        <torusGeometry args={[0.36, 0.012, 12, 48]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Internal bore - visible through tube */}
      <mesh position={[0, -bodyLength / 2 + hexLength, 0]}>
        <cylinderGeometry args={[tubeOD / 2, tubeOD / 2, bodyLength + 0.2, 32]} />
        <meshStandardMaterial 
          color="#2a2520"
          metalness={0.25}
          roughness={0.75}
          side={2}
        />
      </mesh>

      {/* Sleeve coupling detail */}
      <mesh position={[0, hexLength + 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[bodyDiameter / 2 + 0.04, bodyDiameter / 2 + 0.04, 0.16, 48]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Sleeve detail grooves */}
      {Array.from({ length: 2 }).map((_, i) => (
        <mesh 
          key={`sleeve-groove-${i}`}
          position={[0, hexLength + 0.08 + (i - 0.5) * 0.06, 0]}
        >
          <torusGeometry args={[bodyDiameter / 2 + 0.042, 0.008, 8, 32]} />
          <primitive object={brassDarkMaterial} attach="material" />
        </mesh>
      ))}

      {/* Top chamfer on hex */}
      <mesh position={[0, hexLength + 0.018, 0]} castShadow>
        <cylinderGeometry args={[hexDiameter / 2 - 0.02, hexDiameter / 2, 0.036, 6]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Bottom transition to flare */}
      <mesh position={[0, -bodyLength + hexLength + 0.15, 0]} castShadow>
        <cylinderGeometry args={[bodyDiameter / 2, 0.28, 0.18, 48]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>
    </group>
  );
};
