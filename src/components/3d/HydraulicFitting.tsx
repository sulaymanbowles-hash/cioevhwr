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
  const spec = useMemo(() => STANDARD_SPECS.AN815(4), []);
  const material = MATERIAL_PRESETS[spec.material];

  // High-fidelity brass materials
  const brassMaterial = useMemo(() => new MeshStandardMaterial({
    color: new Color(...material.color),
    metalness: material.metalness,
    roughness: material.roughness,
    envMapIntensity: material.envMapIntensity,
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
        position={[0, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={hexGeometry} attach="geometry" />
        <primitive object={brassMaterial} attach="material" />
      </mesh>

      {/* Top Body Tube */}
      <mesh position={[0, spec.hexLength/2 + spec.bodyLength/4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.bodyDiameter / 2, spec.bodyDiameter / 2, spec.bodyLength/2, 64]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Bottom Body Tube */}
      <mesh position={[0, -spec.hexLength/2 - spec.bodyLength/4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[spec.bodyDiameter / 2, spec.bodyDiameter / 2, spec.bodyLength/2, 64]} />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Top Flare */}
      <mesh 
        position={[0, spec.hexLength/2 + spec.bodyLength/2, 0]} 
        castShadow 
        receiveShadow
      >
        <primitive object={flareGeometry} attach="geometry" />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>

      {/* Bottom Flare (Rotated) */}
      <mesh 
        position={[0, -spec.hexLength/2 - spec.bodyLength/2, 0]} 
        rotation={[Math.PI, 0, 0]}
        castShadow 
        receiveShadow
      >
        <primitive object={flareGeometry} attach="geometry" />
        <primitive object={brassPolishedMaterial} attach="material" />
      </mesh>
    </group>
  );
};
