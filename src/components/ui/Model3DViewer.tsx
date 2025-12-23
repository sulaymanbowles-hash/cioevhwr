import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Bounds } from "@react-three/drei";
import { EffectComposer, Bloom, SSAO, ToneMapping } from "@react-three/postprocessing";
import { HexBolt } from "../3d/HexBolt";
import { SelfLockingNut } from "../3d/SelfLockingNut";
import { HydraulicFitting } from "../3d/HydraulicFitting";
import { PrecisionPin } from "../3d/PrecisionPin";
import { ToneMappingMode } from "postprocessing";

interface Model3DViewerProps {
  modelType: "bolt" | "nut" | "fitting" | "pin";
  className?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  quality?: "low" | "medium" | "high";
}

const ModelComponent = memo(({ modelType, autoRotate }: { modelType: string; autoRotate?: boolean }) => {
  switch (modelType) {
    case "bolt":
      return <HexBolt scale={1.3} autoRotate={autoRotate} />;
    case "nut":
      return <SelfLockingNut scale={1.6} autoRotate={autoRotate} />;
    case "fitting":
      return <HydraulicFitting scale={1.2} autoRotate={autoRotate} />;
    case "pin":
      return <PrecisionPin scale={1.1} autoRotate={autoRotate} />;
    default:
      return <HexBolt scale={1.3} autoRotate={autoRotate} />;
  }
});

ModelComponent.displayName = "ModelComponent";

export const Model3DViewer = memo(({ 
  modelType, 
  className = "", 
  interactive = true, 
  autoRotate = true,
  quality = "high"
}: Model3DViewerProps) => {
  const dpr: [number, number] = quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : [1, 1];
  const shadowMapSize = quality === "high" ? 2048 : quality === "medium" ? 1024 : 512;

  return (
    <div className={className}>
      <Canvas 
        shadows 
        dpr={dpr}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[3.2, 2.2, 3.2]} fov={38} />
        
        <Suspense fallback={null}>
          {/* Optimized lighting setup */}
          <ambientLight intensity={0.35} />
          
          <directionalLight 
            position={[6, 8, 6]} 
            intensity={1.4} 
            castShadow 
            shadow-mapSize={[shadowMapSize, shadowMapSize]}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
            shadow-bias={-0.0001}
          />
          
          <directionalLight position={[-4, 5, -4]} intensity={0.6} />
          <directionalLight position={[0, -3, 0]} intensity={0.2} />
          
          <spotLight 
            position={[0, 12, 0]} 
            angle={0.25} 
            penumbra={1} 
            intensity={0.7} 
            castShadow
            shadow-mapSize={[shadowMapSize, shadowMapSize]}
          />

          <Bounds fit clip observe>
            <ModelComponent modelType={modelType} autoRotate={autoRotate} />
          </Bounds>

          {/* Contact shadows for better ground plane */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.25}
            scale={10}
            blur={2}
            far={3}
          />

          {/* High quality HDR environment */}
          <Environment preset="city" environmentIntensity={0.8} />

          {/* Post-processing effects */}
          {quality !== "low" && (
            <EffectComposer multisampling={quality === "high" ? 8 : 4}>
              <Bloom 
                intensity={0.3}
                luminanceThreshold={0.9}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <SSAO
                radius={quality === "high" ? 0.1 : 0.2}
                intensity={quality === "high" ? 30 : 15}
                luminanceInfluence={0.5}
                bias={0.025}
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
              maxDistance={8}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 6}
              autoRotate={false}
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.8}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
});

Model3DViewer.displayName = "Model3DViewer";
