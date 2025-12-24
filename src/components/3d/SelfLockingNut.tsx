import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color, Shape, ExtrudeGeometry } from "three";
import { STANDARD_SPECS, MATERIAL_PRESETS } from "@/lib/parametricModels";

interface SelfLockingNutProps {
  scale?: number;
  autoRotate?: boolean;
}

export const SelfLockingNut = ({ scale = 1, autoRotate = true }: SelfLockingNutProps) => {
  const groupRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
    }
  });

  // Get parametric specifications
  const spec = useMemo(() => STANDARD_SPECS.MS21042(4), []);
  const material = MATERIAL_PRESETS.cadmiumPlated;

  // Cadmium-plated CRES materials
  const cadmiumMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
  }), []);

  const cadmiumDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] - 0.1, material.color[1] - 0.1, material.color[2] - 0.1),
    metalness: material.metalness - 0.02,
    roughness: material.roughness + 0.06,
  }), []);

  // Blue nylon insert material
  const nylonMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...MATERIAL_PRESETS.nylon.color),
    metalness: MATERIAL_PRESETS.nylon.metalness,
    roughness: MATERIAL_PRESETS.nylon.roughness,
    envMapIntensity: MATERIAL_PRESETS.nylon.envMapIntensity,
  }), []);

  // Generate hex geometry parametrically
  const hexGeometry = useMemo(() => {
    const shape = new Shape();
    const radius = spec.widthAcrossFlats / (2 * Math.cos(Math.PI / 6));
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    
    const metalHeight = spec.height - (spec.lockingCollarHeight || 0);
    return new ExtrudeGeometry(shape, {
      depth: metalHeight,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2
    });
  }, [spec]);

  const collarGeometry = useMemo(() => {
    const shape = new Shape();
    const radius = spec.widthAcrossFlats / (2 * Math.cos(Math.PI / 6));
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    
    return new ExtrudeGeometry(shape, {
      depth: spec.lockingCollarHeight || 0.094,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3
    });
  }, [spec]);

  const metalHeight = spec.height - (spec.lockingCollarHeight || 0);
  const outerDiameter = spec.widthAcrossFlats / Math.cos(Math.PI / 6);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Main hex body - metal portion (parametric) */}
      <mesh 
        position={[0, -(spec.lockingCollarHeight || 0) / 2, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={hexGeometry} attach="geometry" />
        <primitive object={cadmiumMaterial} attach="material" />
      </mesh>

      {/* Hex flat detail lines for realism */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const distance = spec.widthAcrossFlats / 2;
        return (
          <mesh 
            key={`flat-${i}`}
            position={[
              Math.cos(angle) * distance,
              -(spec.lockingCollarHeight || 0) / 2,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.002, metalHeight - 0.02, spec.widthAcrossFlats * 0.8]} />
            <primitive object={cadmiumDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Nylon locking collar (blue) - top portion (parametric) */}
      <mesh 
        position={[0, metalHeight / 2 + (spec.lockingCollarHeight || 0) / 2, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={collarGeometry} attach="geometry" />
        <primitive object={nylonMaterial} attach="material" />
      </mesh>

      {/* Nylon insert detail - textured surface */}
      <mesh position={[0, metalHeight / 2 + (spec.lockingCollarHeight || 0) / 2, 0]}>
        <torusGeometry args={[spec.innerDiameter / 2 + 0.02, 0.015, 12, 32]} />
        <meshStandardMaterial 
          color="#0d1a28"
          metalness={0.02}
          roughness={0.85}
        />
      </mesh>

      {/* Locking feature detail rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh 
          key={`lock-ring-${i}`}
          position={[0, metalHeight / 2 + (i + 1) * (spec.lockingCollarHeight || 0) / 4, 0]}
        >
          <torusGeometry args={[spec.innerDiameter / 2 + 0.015 + i * 0.01, 0.008, 8, 32]} />
          <meshStandardMaterial 
            color={new Color(...MATERIAL_PRESETS.nylon.color).multiplyScalar(0.8)}
            metalness={0.02}
            roughness={0.9}
          />
        </mesh>
      ))}

      {/* Bottom chamfer - beveled edge */}
      <mesh position={[0, -spec.height / 2 - 0.015, 0]} castShadow>
        <cylinderGeometry args={[outerDiameter / 2, outerDiameter / 2 - 0.02, 0.03, 6]} />
        <primitive object={cadmiumMaterial} attach="material" />
      </mesh>

      {/* Thread visualization - internal */}
      {Array.from({ length: Math.floor(spec.thread.length / spec.thread.pitch) }).map((_, i) => {
        const yPos = (i * spec.thread.pitch) - spec.height / 2.5;
        return (
          <mesh 
            key={`thread-${i}`}
            position={[0, yPos, 0]}
          >
            <torusGeometry args={[spec.innerDiameter / 2 - 0.006, 0.008, 8, 32]} />
            <primitive object={cadmiumDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Precision machined edges */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3 + Math.PI / 6;
        const distance = outerDiameter / 2 - 0.005;
        return (
          <mesh 
            key={`edge-${i}`}
            position={[
              Math.cos(angle) * distance,
              0,
              Math.sin(angle) * distance
            ]}
            rotation={[Math.PI / 2, angle, 0]}
          >
            <cylinderGeometry args={[0.003, 0.003, spec.height - 0.04, 8]} />
            <meshStandardMaterial 
              color={new Color(...material.color).multiplyScalar(1.15)}
              metalness={material.metalness + 0.02}
              roughness={material.roughness - 0.05}
              envMapIntensity={material.envMapIntensity + 0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};
