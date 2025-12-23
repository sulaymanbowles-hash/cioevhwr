import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { HexBolt } from "../3d/HexBolt";
import { SelfLockingNut } from "../3d/SelfLockingNut";
import { HydraulicFitting } from "../3d/HydraulicFitting";
import { PrecisionPin } from "../3d/PrecisionPin";

interface Model3DViewerProps {
  modelType: "bolt" | "nut" | "fitting" | "pin";
  className?: string;
  interactive?: boolean;
}

export const Model3DViewer = ({ modelType, className = "", interactive = true }: Model3DViewerProps) => {
  const renderModel = () => {
    switch (modelType) {
      case "bolt":
        return <HexBolt scale={1.2} />;
      case "nut":
        return <SelfLockingNut scale={1.5} />;
      case "fitting":
        return <HydraulicFitting scale={1.1} />;
      case "pin":
        return <PrecisionPin scale={1.0} />;
      default:
        return <HexBolt scale={1.2} />;
    }
  };

  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={35} />
        
        <Suspense fallback={null}>
          {/* Lighting setup for aerospace metal aesthetic */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-3, 3, -3]} intensity={0.4} />
          <spotLight 
            position={[0, 10, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.5} 
            castShadow 
          />

          {/* Model */}
          {renderModel()}

          {/* Ground plane for shadows */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.1} />
          </mesh>

          {/* Environment for realistic reflections */}
          <Environment preset="studio" />

          {/* Controls */}
          {interactive && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={8}
              maxPolarAngle={Math.PI / 2}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
