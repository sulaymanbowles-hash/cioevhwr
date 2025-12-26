import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { ModelWrapper } from "../3d/ModelWrapper";
import { motion, useReducedMotion } from "framer-motion";
import { TechLabel } from "./TechLabel";

export const Hero3DShowcase = () => {
  const [activeModel, setActiveModel] = useState<"bolt" | "nut" | "fitting" | "pin">("bolt");
  const shouldReduceMotion = useReducedMotion();

  const models = [
    { type: "bolt" as const, label: "Hex Bolt", part: "NAS6204" },
    { type: "nut" as const, label: "Lock Nut", part: "MS21042" },
    { type: "fitting" as const, label: "Hydraulic", part: "AN818" },
    { type: "pin" as const, label: "Precision Pin", part: "MS16555" },
  ];

  return (
    <div className="relative w-full h-[600px] lg:h-[700px]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <Canvas 
          dpr={[0.75, 1.5]} 
          performance={{ min: 0.2, max: 0.8 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <PerspectiveCamera makeDefault position={[3.5, 2.5, 3.5]} fov={40} />
          
          <Suspense fallback={null}>
            {/* Optimized lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <directionalLight position={[-3, 3, -3]} intensity={0.5} />
            <spotLight 
              position={[0, 12, 0]} 
              angle={0.3} 
              penumbra={1} 
              intensity={0.8} 
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />

            <ModelWrapper modelType={activeModel} />

            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
              <planeGeometry args={[20, 20]} />
              <shadowMaterial opacity={0.18} />
            </mesh>

            <Environment preset="city" environmentIntensity={0.6} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate={!shouldReduceMotion}
              autoRotateSpeed={0.8}
              zoomSpeed={0.6}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Model selector */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div 
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0 : 0.6 }}
          className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-sm shadow-2xl p-2 flex flex-wrap justify-center gap-2"
        >
          {models.map((model) => (
            <button
              key={model.type}
              onClick={() => setActiveModel(model.type)}
              className={`px-6 py-3 rounded-sm transition-all duration-300 ${
                activeModel === model.type
                  ? "bg-black text-white shadow-md"
                  : "bg-transparent hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">
                {model.label}
              </div>
              <TechLabel className={`!text-[9px] ${activeModel === model.type ? "!text-gray-400" : "!text-gray-500"}`}>
                {model.part}
              </TechLabel>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Technical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
};
