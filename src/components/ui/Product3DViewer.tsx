import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ModelWrapper } from "../3d/ModelWrapper";
import { GLTFDirectLoader } from "../3d/GLTFDirectLoader";

interface Product3DViewerProps {
  type: "bolt" | "nut" | "fitting" | "pin" | "screw";
  modelPath?: string;
}

export const Product3DViewer = ({ type, modelPath }: Product3DViewerProps) => {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={40} />
        <OrbitControls
          enableZoom={true}
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          zoomSpeed={0.6}
          enableDamping
          dampingFactor={0.05}
        />
        
        <Suspense fallback={null}>
          {/* Enhanced lighting for realistic metal rendering */}
          <ambientLight intensity={0.6} color="#ffffff" />
          
          {/* Key light - main illumination */}
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.4} 
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.00005}
            shadow-normalBias={0.02}
          />
          
          {/* Fill light - soften shadows */}
          <directionalLight position={[-5, 3, -5]} intensity={0.7} color="#b8d4ff" />
          
          {/* Rim light - edge highlight for metals */}
          <directionalLight position={[0, 2, -6]} intensity={0.6} color="#fff4e6" />
          
          {/* Accent light */}
          <pointLight position={[0, 5, 0]} intensity={0.8} />
          
          {/* Model with GLTF support */}
          {modelPath ? (
            <GLTFDirectLoader modelPath={modelPath} scale={1.3} autoRotate={true} />
          ) : (
            <ModelWrapper modelType={type} autoRotate={true} />
          )}
          
          {/* High quality contact shadows */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={8}
            blur={2.5}
            far={4}
            resolution={1024}
            color="#000000"
          />
          
          {/* HDR environment for realistic reflections */}
          <Environment preset="city" environmentIntensity={1.0} />
        </Suspense>
      </Canvas>
    </div>
  );
};
