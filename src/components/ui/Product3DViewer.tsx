import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

interface Product3DViewerProps {
  type: "bolt" | "nut" | "fitting" | "pin";
}

function BoltModel() {
  return (
    <group>
      {/* Bolt Head */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 6]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bolt Shaft */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1.5, 32]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Thread ridges */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[0, -0.6 + i * 0.1, 0]}>
          <torusGeometry args={[0.25, 0.03, 8, 32]} />
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function NutModel() {
  return (
    <group>
      {/* Hexagonal Nut Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.4, 6]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Inner Hole */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.45, 32]} />
        <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.8} />
      </mesh>
      {/* Thread details */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.15 + i * 0.04]}>
          <torusGeometry args={[0.28, 0.015, 8, 32]} />
          <meshStandardMaterial color="#52525b" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FittingModel() {
  return (
    <group>
      {/* Main Body */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
        <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Top Connector */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bottom Connector */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Hex grip sections */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 6]} />
        <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.2, 6]} />
        <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function PinModel() {
  return (
    <group>
      {/* Pin Shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 2, 32]} />
        <meshStandardMaterial color="#52525b" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Pin Head */}
      <mesh position={[1.1, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Pin Tip Chamfer */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.15, 0.15, 32]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

export const Product3DViewer = ({ type }: Product3DViewerProps) => {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        
        <Suspense fallback={null}>
          {type === "bolt" && <BoltModel />}
          {type === "nut" && <NutModel />}
          {type === "fitting" && <FittingModel />}
          {type === "pin" && <PinModel />}
        </Suspense>
      </Canvas>
    </div>
  );
};
