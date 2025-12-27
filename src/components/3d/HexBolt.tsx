import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color, Shape, ExtrudeGeometry } from "three";
import { STANDARD_SPECS, MATERIAL_PRESETS } from "@/lib/parametricModels";

interface HexBoltProps {
  scale?: number;
  autoRotate?: boolean;
}

export const HexBolt = ({ scale = 1, autoRotate = true }: HexBoltProps) => {
  const groupRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  // Get parametric specifications from part number
  const spec = useMemo(() => STANDARD_SPECS.NAS6204(12), []);
  const material = MATERIAL_PRESETS[spec.material];

  // High-fidelity titanium materials
  const titaniumMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
  }), [material]);

  const titaniumDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] - 0.1, material.color[1] - 0.1, material.color[2] - 0.1),
    metalness: material.metalness - 0.02,
    roughness: material.roughness + 0.07,
    envMapIntensity: material.envMapIntensity - 0.2,
  }), [material]);

  const threadMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] - 0.08, material.color[1] - 0.08, material.color[2] - 0.08),
    metalness: material.metalness - 0.04,
    roughness: material.roughness + 0.14,
    envMapIntensity: material.envMapIntensity - 0.3,
  }), [material]);

  // Generate hex head geometry parametrically
  const hexGeometry = useMemo(() => {
    const shape = new Shape();
    const radius = spec.headDiameter / (2 * Math.cos(Math.PI / 6));
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    
    return new ExtrudeGeometry(shape, {
      depth: spec.headHeight,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2
    });
  }, [spec]);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Parametric Hex Head */}
      <mesh 
        position={[0, spec.shaftLength / 2 + spec.headHeight / 2, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={hexGeometry} attach="geometry" />
        <primitive object={titaniumMaterial} attach="material" />
      </mesh>

      {/* Head chamfer ring */}
      <mesh position={[0, spec.shaftLength / 2 + spec.headHeight, 0]} castShadow>
        <cylinderGeometry args={[spec.headDiameter / 2 - 0.01, spec.headDiameter / 2, 0.02, 6]} />
        <primitive object={titaniumDarkMaterial} attach="material" />
      </mesh>

      {/* Main shaft with subtle taper */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.shaftDiameter / 2, spec.shaftDiameter / 2 - 0.002, spec.shaftLength, 64]} />
        <primitive object={titaniumMaterial} attach="material" />
      </mesh>

      {/* Precision threads - Parametric 28 TPI UNF-3A */}
      {Array.from({ length: Math.floor(spec.thread.length / spec.thread.pitch) }).map((_, i) => {
        const yPos = (i * spec.thread.pitch) - spec.shaftLength / 2.8;
        return (
          <mesh 
            key={`thread-${i}`}
            position={[0, yPos, 0]}
            castShadow
          >
            <torusGeometry args={[spec.shaftDiameter / 2 + 0.008, 0.012, 8, 32]} />
            <primitive object={threadMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Thread run-out detail */}
      <mesh position={[0, -spec.shaftLength / 2 + 0.15, 0]} castShadow>
        <cylinderGeometry args={[spec.shaftDiameter / 2 - 0.01, spec.shaftDiameter / 2 - 0.01, 0.08, 32]} />
        <primitive object={titaniumDarkMaterial} attach="material" />
      </mesh>

      {/* Chamfered tip - 45 degree angle */}
      <mesh position={[0, -spec.shaftLength / 2 - 0.06, 0]} castShadow receiveShadow>
        <coneGeometry args={[spec.shaftDiameter / 2, 0.12, 32]} />
        <primitive object={titaniumMaterial} attach="material" />
      </mesh>

      {/* Tip detail ring */}
      <mesh position={[0, -spec.shaftLength / 2 + 0.02, 0]}>
        <torusGeometry args={[spec.shaftDiameter / 2 - 0.005, 0.008, 8, 32]} />
        <primitive object={titaniumDarkMaterial} attach="material" />
      </mesh>

      {/* Head underside fillet */}
      <mesh position={[0, spec.shaftLength / 2 + 0.01, 0]} castShadow>
        <torusGeometry args={[spec.shaftDiameter / 2 + 0.02, 0.02, 12, 32]} />
        <primitive object={titaniumMaterial} attach="material" />
      </mesh>
    </group>
  );
};
