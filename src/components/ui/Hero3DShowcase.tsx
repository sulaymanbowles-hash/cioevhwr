import { Suspense, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Bounds, Float } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { HexBolt } from "../3d/HexBolt";
import { SelfLockingNut } from "../3d/SelfLockingNut";
import { HydraulicFitting } from "../3d/HydraulicFitting";
import { PrecisionPin } from "../3d/PrecisionPin";
import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "./TechLabel";
import { ToneMappingMode } from "postprocessing";
import { Loader2 } from "lucide-react";

const Scene = memo(({ activeModel }: { activeModel: string }) => {
  const renderModel = () => {
    switch (activeModel) {
      case "bolt":
        return (
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <HexBolt scale={1.5} autoRotate={true} />
          </Float>
        );
      case "nut":
        return (
          <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
            <SelfLockingNut scale={1.9} autoRotate={true} />
          </Float>
        );
      case "fitting":
        return (
          <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
            <HydraulicFitting scale={1.4} autoRotate={true} />
          </Float>
        );
      case "pin":
        return (
          <Float speed={1.3} rotationIntensity={0.28} floatIntensity={0.45}>
            <PrecisionPin scale={1.3} autoRotate={true} />
          </Float>
        );
      default:
        return (
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <HexBolt scale={1.5} autoRotate={true} />
          </Float>
        );
    }
  };

  return (
    <>
      {/* Advanced lighting setup for dramatic effect */}
      <ambientLight intensity={0.5} />
      
      {/* Key light - main illumination */}
      <directionalLight 
        position={[10, 12, 8]} 
        intensity={2.0} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light - blue tinted for depth */}
      <directionalLight position={[-6, 8, -6]} intensity={0.9} color="#c8d8ff" />
      
      {/* Rim light - warm accent from below */}
      <directionalLight position={[0, -5, 2]} intensity={0.5} color="#ffecd4" />
      {/* Refined spotlight for focus */}
      <spotLight 
        position={[0, 18, 0]} 
        angle={0.18} 
        penumbra={1} 
        intensity={1.2} 
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#ffffff"
      />

      <Bounds fit clip observe margin={1.3}>
        {renderModel()}
      </Bounds>

      {/* Enhanced contact shadows for better grounding */}
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.4}
        scale={14}
        blur={3}
        far={5}
        resolution={1024}
      />

      {/* High-quality environment for realistic reflections */}
      <Environment
        background={false}
        environmentIntensity={1.2}
      >
        <mesh>
          <sphereGeometry args={[50, 64, 64]} />
          <meshBasicMaterial color="#f5f5f5" side={2} />
        </mesh>
      </Environment>

      {/* Enhanced post-processing for premium look */}
      <EffectComposer multisampling={8}>
        <Bloom 
          intensity={0.5}
          luminanceThreshold={0.82}
          luminanceSmoothing={0.98}
          mipmapBlur
          radius={0.8}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>

      {/* Improved controls for better interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={5}
        maxDistance={7}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
        autoRotate={true}
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.03}
        rotateSpeed={0.5}
      />
    </>
  );
});

Scene.displayName = "Scene";

export const Hero3DShowcase = memo(() => {
  const [activeModel, setActiveModel] = useState<"bolt" | "nut" | "fitting" | "pin">("bolt");
  const [isLoading, setIsLoading] = useState(true);

  const models = [
    { type: "bolt" as const, label: "Hex Bolt", part: "NAS6204", desc: "Titanium Grade 5" },
    { type: "nut" as const, label: "Lock Nut", part: "MS21042", desc: "Self-Locking" },
    { type: "fitting" as const, label: "Hydraulic", part: "AN818", desc: "Brass Fitting" },
    { type: "pin" as const, label: "Clevis Pin", part: "MS16555", desc: "Stainless Steel" },
  ];

  return (
    <div className="relative w-full h-[600px] lg:h-[750px]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Canvas 
          shadows 
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          onCreated={() => setIsLoading(false)}
        >
          <PerspectiveCamera makeDefault position={[4, 2.8, 4]} fov={42} />
          
          <Suspense fallback={null}>
            <Scene activeModel={activeModel} />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 z-20"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <TechLabel className="!text-gray-400">Loading 3D Model</TechLabel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model selector with descriptions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-2xl p-3 grid grid-cols-2 lg:grid-cols-4 gap-2"
        >
          {models.map((model) => (
            <button
              key={model.type}
              onClick={() => setActiveModel(model.type)}
              className={`px-5 py-4 rounded-xl transition-all duration-300 group ${
                activeModel === model.type
                  ? "bg-black text-white shadow-lg scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 active:scale-95"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1">
                {model.label}
              </div>
              <TechLabel className={`!text-[9px] block mb-1 ${activeModel === model.type ? "!text-gray-400" : "!text-gray-500"}`}>
                {model.part}
              </TechLabel>
              <div className={`text-[10px] ${activeModel === model.type ? "text-gray-300" : "text-gray-400"}`}>
                {model.desc}
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Technical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }} 
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 via-transparent to-white/10" />
    </div>
  );
});

Hero3DShowcase.displayName = "Hero3DShowcase";
