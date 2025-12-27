import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { STANDARD_SPECS, MATERIAL_PRESETS } from "@/lib/parametricModels";

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

  // Get parametric specifications
  const spec = useMemo(() => STANDARD_SPECS.MS16555(2), []);
  const material = MATERIAL_PRESETS[spec.material];

  // High-fidelity stainless steel materials (CRES 303)
  const stainlessMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
  }), []);

  const stainlessGroundMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] + 0.04, material.color[1] + 0.04, material.color[2] + 0.04),
    metalness: material.metalness + 0.02,
    roughness: material.roughness - 0.04,
    envMapIntensity: material.envMapIntensity + 0.2,
  }), []);

  const stainlessDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] - 0.1, material.color[1] - 0.1, material.color[2] - 0.1),
    metalness: material.metalness - 0.02,
    roughness: material.roughness + 0.06,
  }), []);

  const grooveDepth = 0.008;

  return (
    <group scale={scale} ref={groupRef}>
      {/* Main pin shaft - precision ground (parametric) */}
      <mesh ref={pinRef} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.diameter / 2, spec.diameter / 2, spec.length, 80]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Chamfer End 1 (Left) */}
      <mesh position={[-spec.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[spec.diameter / 2, spec.diameter / 2 - 0.02, 0.02, 64]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Chamfer End 2 (Right) */}
      <mesh position={[spec.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[spec.diameter / 2 - 0.02, spec.diameter / 2, 0.02, 64]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Precision ground surface rings (centerless ground finish) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const xPos = ((i - 3.5) * (spec.length / 9));
        return (
          <mesh 
            key={`ground-ring-${i}`}
            position={[xPos, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[spec.diameter / 2 + 0.004, 0.006, 12, 80]} />
            <primitive object={stainlessGroundMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Retention groove near tip (parametric) */}
      {spec.hasGroove && (
        <>
          <mesh 
            position={[spec.length / 2 - (spec.groovePosition || 0.25), 0, 0]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[spec.diameter / 2 - grooveDepth, spec.diameter / 2 - grooveDepth, 0.062, 64]} />
            <primitive object={stainlessDarkMaterial} attach="material" />
          </mesh>

          {/* Groove side fillets */}
          {[-0.031, 0.031].map((offset, i) => (
            <mesh 
              key={`groove-fillet-${i}`}
              position={[spec.length / 2 - (spec.groovePosition || 0.25) + offset, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <torusGeometry args={[spec.diameter / 2 - grooveDepth / 2, grooveDepth / 2, 12, 48]} />
              <primitive object={stainlessDarkMaterial} attach="material" />
            </mesh>
          ))}

          {/* Groove bottom detail */}
          <mesh 
            position={[spec.length / 2 - (spec.groovePosition || 0.25), 0, 0]} 
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[spec.diameter / 2 - grooveDepth + 0.002, 0.004, 8, 48]} />
            <meshStandardMaterial 
              color={new Color(...material.color).multiplyScalar(0.85)}
              metalness={material.metalness - 0.05}
              roughness={material.roughness + 0.15}
            />
          </mesh>
        </>
      )}

      {/* Cotter pin hole (if applicable) */}
      {spec.type === 'clevis' && (
        <>
          <mesh 
            position={[spec.length / 2 - 0.15, 0, 0]} 
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.024, 0.024, spec.diameter + 0.02, 24]} />
            <meshStandardMaterial 
              color="#1a1e24"
              metalness={0.4}
              roughness={0.7}
            />
          </mesh>

          {/* Hole chamfers */}
          {[spec.diameter / 2 + 0.01, -(spec.diameter / 2 + 0.01)].map((zPos, i) => (
            <mesh 
              key={`chamfer-${i}`}
              position={[spec.length / 2 - 0.15, 0, zPos]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.024, 0.028, 0.015, 24]} />
              <primitive object={stainlessDarkMaterial} attach="material" />
            </mesh>
          ))}
        </>
      )}

      {/* Tip chamfer - 30° included angle */}
      <mesh 
        position={[spec.length / 2 + 0.025, 0, 0]} 
        rotation={[0, 0, Math.PI / 2]} 
        castShadow
      >
        <coneGeometry args={[spec.diameter / 2, 0.05, 64]} />
        <primitive object={stainlessMaterial} attach="material" />
      </mesh>

      {/* Tip detail ring */}
      <mesh position={[spec.length / 2 - 0.01, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[spec.diameter / 2 - 0.003, 0.006, 8, 48]} />
        <primitive object={stainlessGroundMaterial} attach="material" />
      </mesh>

      {/* Micro-finish indicators (highly polished sections) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const xPos = ((i - 1.5) * (spec.length / 5));
        return (
          <mesh 
            key={`polish-${i}`}
            position={[xPos, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[spec.diameter / 2 + 0.002, spec.diameter / 2 + 0.002, 0.025, 64]} />
            <meshStandardMaterial 
              color={new Color(...material.color).multiplyScalar(1.12)}
              metalness={material.metalness + 0.03}
              roughness={material.roughness - 0.08}
              envMapIntensity={material.envMapIntensity + 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};
