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
  useGLTF?: boolean; // Enable GLTF models when files are available
}

const ModelComponent = memo(({ 
  modelType, 
  autoRotate, 
  useGLTF = false 
}: { 
  modelType: "bolt" | "nut" | "fitting" | "pin"; 
  autoRotate: boolean;
  useGLTF?: boolean;
}) => {
  return <ModelWrapper modelType={modelType} autoRotate={autoRotate} useGLTF={useGLTF} />;
});

export const Model3DViewer = memo(({ 
  modelType, 
  className = "", 
  interactive = true, 
  autoRotate = true,
  quality = "high",
  useGLTF = true // GLTF models are now available!
}: Model3DViewerProps) => {
  const dpr: [number, number] = quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : [1, 1];
  const shadowMapSize = quality === "high" ? 2048 : quality === "medium" ? 1024 : 512;

  return (
    <div className={className}>
      <Canvas 
        shadows 
        dpr={dpr}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true,
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
          <ModelComponent modelType={modelType} autoRotate={autoRotate} useGLTF={useGLTF} />

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
