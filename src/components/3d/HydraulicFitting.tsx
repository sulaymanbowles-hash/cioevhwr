import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Color, Shape, ExtrudeGeometry, LatheGeometry, Vector2 } from "three";
import { STANDARD_SPECS, MATERIAL_PRESETS } from "@/lib/parametricModels";

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

  // Get parametric specifications
  const spec = useMemo(() => STANDARD_SPECS.AN818(4), []);
  const material = MATERIAL_PRESETS[spec.material];

  // High-fidelity brass materials
  const brassMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
  }), []);

  const brassDarkMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] - 0.12, material.color[1] - 0.12, material.color[2] - 0.08),
    metalness: material.metalness - 0.03,
    roughness: material.roughness + 0.08,
  }), []);

  const brassPolishedMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(material.color[0] + 0.04, material.color[1] + 0.06, material.color[2] + 0.06),
    metalness: material.metalness + 0.03,
    roughness: material.roughness - 0.06,
    envMapIntensity: material.envMapIntensity + 0.1,
  }), []);

  // Generate hex geometry parametrically
  const hexGeometry = useMemo(() => {
    const shape = new Shape();
    const radius = spec.hexSize / (2 * Math.cos(Math.PI / 6));
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    
    return new ExtrudeGeometry(shape, {
      depth: spec.hexLength,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3
    });
  }, [spec]);

  // Generate 37° flare geometry parametrically
  const flareGeometry = useMemo(() => {
    const flareAngleRad = ((spec.flareAngle || 37) * Math.PI) / 180;
    const flareLength = 0.18;
    const innerRadius = spec.portSize / 2;
    const outerRadius = innerRadius + Math.tan(flareAngleRad) * flareLength;
    
    const points: Vector2[] = [
      new Vector2(innerRadius, 0),
      new Vector2(outerRadius, flareLength),
      new Vector2(outerRadius - 0.015, flareLength),
      new Vector2(innerRadius - 0.008, 0.01)
    ];
    
    return new LatheGeometry(points, 48);
  }, [spec]);

  return (
    <group scale={scale} ref={groupRef}>
      {/* Hex nut section (parametric) */}
      <mesh 
        position={[0, spec.hexLength / 2, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={hexGeometry} attach="geometry" />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Hex wrench marks (wear marks on flats) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const distance = (spec.hexSize / 2) * 0.95;
        return (
          <mesh 
            key={`wear-${i}`}
            position={[
              Math.cos(angle) * distance,
              spec.hexLength / 2,
              Math.sin(angle) * distance
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.003, spec.hexLength * 0.6, spec.hexSize * 0.6]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Thread section on hex with accurate threads */}
      {Array.from({ length: Math.floor(spec.hexLength / 0.05) }).map((_, i) => {
        const yPos = (i * 0.05) + 0.02;
        return (
          <mesh 
            key={`hex-thread-${i}`}
            position={[0, yPos, 0]}
            castShadow
          >
            <torusGeometry args={[spec.hexSize / 2 + 0.015, 0.012, 8, 32]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Main body tube - precision bore */}
      <mesh position={[0, -spec.bodyLength / 2 + spec.hexLength, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.bodyDiameter / 2, spec.bodyDiameter / 2, spec.bodyLength, 64]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Knurled grip section detail */}
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * Math.PI) / 24;
        const yPos = spec.hexLength + 0.12;
        return (
          <mesh 
            key={`knurl-${i}`}
            position={[
              Math.cos(angle) * (spec.bodyDiameter / 2 + 0.008),
              yPos,
              Math.sin(angle) * (spec.bodyDiameter / 2 + 0.008)
            ]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <cylinderGeometry args={[0.004, 0.004, 0.15, 4]} />
            <primitive object={brassDarkMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* 37° Flare end (parametric) */}
      <mesh 
        position={[0, -spec.bodyLength + spec.hexLength + 0.15, 0]} 
        castShadow 
        receiveShadow
      >
        <primitive object={flareGeometry} attach="geometry" />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Flare seat detail ring */}
      <mesh position={[0, -spec.bodyLength + spec.hexLength + 0.15, 0]}>
        <torusGeometry args={[spec.portSize / 2 + 0.04, 0.012, 12, 48]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Precision machined surface finish */}
      {Array.from({ length: 6 }).map((_, i) => {
        const yPos = -spec.bodyLength / 2 + spec.hexLength + (i * spec.bodyLength / 7);
        return (
          <mesh 
            key={`finish-${i}`}
            position={[0, yPos, 0]}
          >
            <torusGeometry args={[spec.bodyDiameter / 2 + 0.003, 0.005, 8, 48]} />
            <meshStandardMaterial 
              color={new Color(...material.color).multiplyScalar(1.08)}
              metalness={material.metalness + 0.02}
              roughness={material.roughness - 0.04}
              envMapIntensity={material.envMapIntensity + 0.2}
            />
          </mesh>
        );
      })}

      {/* Port opening detail */}
      <mesh position={[0, -spec.bodyLength + spec.hexLength, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[spec.portSize / 2 - 0.01, spec.portSize / 2 - 0.01, 0.08, 48]} />
        <meshStandardMaterial 
          color="#1a1410"
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Internal bore detail */}
      {Array.from({ length: 3 }).map((_, i) => {
        const yPos = -spec.bodyLength / 2 + spec.hexLength + (i * spec.bodyLength / 4);
        return (
          <mesh 
            key={`bore-${i}`}
            position={[0, yPos, 0]}
          >
            <torusGeometry args={[spec.portSize / 2 - 0.015, 0.008, 8, 32]} />
            <meshStandardMaterial 
              color={new Color(...material.color).multiplyScalar(0.6)}
              metalness={material.metalness - 0.1}
              roughness={material.roughness + 0.2}
            />
          </mesh>
        );
      })}

      {/* Hex-to-body transition fillet */}
      <mesh position={[0, spec.hexLength - 0.02, 0]}>
        <torusGeometry args={[spec.bodyDiameter / 2 + 0.03, 0.035, 16, 48]} />
        <primitive object={brassMaterial} attach="material" />
      </mesh>
    </group>
  );
};
