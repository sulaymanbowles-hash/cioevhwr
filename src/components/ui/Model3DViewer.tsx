import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { ModelWrapper } from "../3d/ModelWrapper";

interface Model3DViewerProps {
  modelType: "bolt" | "nut" | "fitting" | "pin";
  className?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  quality?: "low" | "medium" | "high";
}

const ModelComponent = memo(({ 
  modelType, 
  autoRotate
}: { 
  modelType: "bolt" | "nut" | "fitting" | "pin"; 
  autoRotate: boolean;
}) => {
  return <ModelWrapper modelType={modelType} autoRotate={autoRotate} />;
});

export const Model3DViewer = memo(({ 
  modelType, 
  className = "", 
  interactive = true, 
  autoRotate = true,
  quality = "high"
}: Model3DViewerProps) => {
  const dpr: [number, number] = quality === "high" ? [1, 1.5] : quality === "medium" ? [0.75, 1] : [0.5, 1];
  const shadowMapSize = quality === "high" ? 1024 : quality === "medium" ? 512 : 256;

  return (
    <div className={className}>
      <Canvas 
        shadows={quality === "high"}
        dpr={dpr}
        performance={{ min: 0.2, max: 0.8 }}
        gl={{ 
          antialias: quality === "high",
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[3.5, 2.5, 3.5]} fov={35} />
        
        <Suspense fallback={null}>
          {/* Enhanced lighting for realistic metal rendering - increased for better visibility */}
          <ambientLight intensity={0.5} color="#ffffff" />
          
          {/* Key light - main illumination */}
          <directionalLight 
            position={[6, 8, 4]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[shadowMapSize, shadowMapSize]}
            shadow-camera-near={0.1}
            shadow-camera-far={25}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-bias={-0.00005}
            shadow-normalBias={0.02}
          />
          
          {/* Fill light - soften shadows */}
          <directionalLight position={[-4, 4, -4]} intensity={0.6} color="#b8d4ff" />
          
          {/* Rim light - edge highlight for metals */}
          <directionalLight position={[0, 2, -6]} intensity={0.8} color="#fff4e6" />
          
          {/* Accent spot for depth */}
          <spotLight 
            position={[0, 10, 2]} 
            angle={0.25} 
            penumbra={0.8} 
            intensity={0.7} 
            castShadow
            shadow-mapSize={[shadowMapSize / 2, shadowMapSize / 2]}
          />

          {/* Model */}
          <ModelComponent modelType={modelType} autoRotate={autoRotate} />

          {/* High quality contact shadows */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={8}
            blur={2.5}
            far={4}
            resolution={quality === "high" ? 1024 : 512}
            color="#000000"
          />

          {/* High quality HDR environment - increased intensity for better lighting */}
          <Environment preset="city" environmentIntensity={1.2} />

          {/* Post-processing effects */}
          {quality !== "low" && (
            <EffectComposer multisampling={quality === "high" ? 8 : 4}>
              <Bloom 
                intensity={0.3}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            </EffectComposer>
          )}

          {/* Controls */}
          {interactive && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2.5}
              maxDistance={7}
              maxPolarAngle={Math.PI / 1.8}
              autoRotate={false}
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
});
