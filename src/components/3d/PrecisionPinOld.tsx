import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color } from "three";

interface PrecisionPinProps {
  scale?: number;
  autoRotate?: boolean;
}

export const PrecisionPin = ({ scale = 1, autoRotate = true }: PrecisionPinProps) => {
  const pinRef = useRef<Mesh>(null);
  const groupRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.38;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });

  // MS16555-2 specifications - Clevis pin CRES
  const shaftLength = 1.62;
  const shaftDiameter = 0.1875; // 3/16"
  const headDiameter = 0.375; // 3/8"
  const headHeight = 0.125;
  const cotterPinHoleDiameter = 0.047; // #43 drill
  const grooveDepth = 0.008;

  // High-fidelity stainless steel material (CRES 303)
  const stainlessMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.78, 0.82, 0.88),
    metalness: 0.96,
    roughness: 0.12,
    envMapIntensity: 1.4,
  }), []);

  const stainlessGroundMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.82, 0.86, 0.92),
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.6,
  }), []);

  const stainlessDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(0.68, 0.72, 0.78),
    metalness: 0.94,
    roughness: 0.18,
  }), []);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Main pin shaft - precision ground */}
      <mesh ref={pinRef} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[shaftDiameter / 2, shaftDiameter / 2, shaftLength, 64]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Head (larger end) - precision machined */}
      <mesh position={[-shaftLength / 2 - headHeight / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[headDiameter / 2, headDiameter / 2, headHeight, 48]} />
        <primitive object={stainlessGroundMaterial} attach="material" />
      </mesh>

      {/* Head chamfer edge */}
      <mesh position={[-shaftLength / 2 - headHeight - 0.015, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[headDiameter / 2 - 0.01, headDiameter / 2, 0.03, 48]} />
        <primitive object={stainlessGroundMaterial} attach="material" />
      </mesh>

      {/* Head fillet radius */}
      <mesh position={[-shaftLength / 2 - 0.01, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[shaftDiameter / 2 + 0.015, 0.02, 16, 48]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Precision ground surface rings (centerless ground finish) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const xPos = ((i - 2) * (shaftLength / 6));
        return (
          <mesh 
            key={`ground-ring-${i}`}
            position={[xPos, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[shaftDiameter / 2 + 0.006, 0.01, 12, 64]} />
            <primitive object={stainlessGroundMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Retention groove near tip */}
      <mesh position={[shaftLength / 2 - 0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[shaftDiameter / 2 - grooveDepth, shaftDiameter / 2 - grooveDepth, 0.062, 48]} />
        <primitive object={stainlessDarkMaterial} attach="material" />
      </mesh>

      {/* Groove side fillets */}
      {[-0.031, 0.031].map((offset, i) => (
        <mesh 
          key={`groove-fillet-${i}`}
          position={[shaftLength / 2 - 0.25 + offset, 0, 0]} 
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[shaftDiameter / 2 - grooveDepth + 0.003, 0.006, 12, 48]} />
          <primitive object={stainlessDarkMaterial} attach="material" />
        </mesh>
      ))}

      {/* Chamfered tip - 30° angle */}
      <mesh position={[shaftLength / 2 + 0.06, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
        <coneGeometry args={[shaftDiameter / 2, 0.12, 48]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Cross-hole for cotter pin - #43 drill */}
      <mesh position={[shaftLength / 2 - 0.18, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[cotterPinHoleDiameter / 2, cotterPinHoleDiameter / 2, shaftDiameter + 0.08, 24]} />
        <meshStandardMaterial 
          color="#2a2e35"
          metalness={0.4}
          roughness={0.65}
        />
      </mesh>

      {/* Cotter pin hole chamfer edges */}
      {[1, -1].map((dir, i) => (
        <mesh 
          key={`hole-chamfer-${i}`}
          position={[shaftLength / 2 - 0.18, dir * (shaftDiameter / 2 + 0.02), 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[cotterPinHoleDiameter / 2 + 0.01, 0.04, 24]} />
          <meshStandardMaterial 
            color="#3a3e45"
            metalness={0.5}
            roughness={0.55}
          />
        </mesh>
      ))}

      {/* Center punch marks on head (for identification) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI) / 2;
        const radius = headDiameter / 4;
        return (
          <mesh 
            key={`punch-${i}`}
            position={[
              -shaftLength / 2 - headHeight / 2,
              Math.cos(angle) * radius,
              Math.sin(angle) * radius
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <sphereGeometry args={[0.008, 12, 12]} />
            <meshStandardMaterial 
              color="#4a5058"
              metalness={0.7}
              roughness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};
