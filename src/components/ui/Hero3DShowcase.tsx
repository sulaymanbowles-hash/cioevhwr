import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { HexBolt } from "../3d/HexBolt";
import { SelfLockingNut } from "../3d/SelfLockingNut";
import { HydraulicFitting } from "../3d/HydraulicFitting";
import { PrecisionPin } from "../3d/PrecisionPin";
import { motion } from "framer-motion";
import { TechLabel } from "./TechLabel";

export const Hero3DShowcase = () => {
  const [activeModel, setActiveModel] = useState<"bolt" | "nut" | "fitting" | "pin">("bolt");

  const models = [
    { type: "bolt" as const, label: "Hex Bolt", part: "NAS6204" },
    { type: "nut" as const, label: "Lock Nut", part: "MS21042" },
    { type: "fitting" as const, label: "Hydraulic", part: "AN818" },
    { type: "pin" as const, label: "Precision Pin", part: "MS16555" },
  ];

  const renderModel = () => {
    switch (activeModel) {
      case "bolt":
        return <HexBolt scale={1.4} />;
      case "nut":
        return <SelfLockingNut scale={1.8} />;
      case "fitting":
        return <HydraulicFitting scale={1.3} />;
      case "pin":
        return <PrecisionPin scale={1.2} />;
    }
  };

  return (
    <div className="relative w-full h-[600px] lg:h-[700px]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[3.5, 2.5, 3.5]} fov={40} />
          
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[5, 8, 5]} 
              intensity={1.2} 
              castShadow 
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-4, 4, -4]} intensity={0.5} />
            <spotLight 
              position={[0, 12, 0]} 
              angle={0.3} 
              penumbra={1} 
              intensity={0.6} 
              castShadow 
            />

            {renderModel()}

            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
              <planeGeometry args={[15, 15]} />
              <shadowMaterial opacity={0.12} />
            </mesh>

            <Environment preset="city" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minDistance={4}
              maxDistance={6}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate={true}
              autoRotateSpeed={0.8}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Model selector */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md border border-black/10 rounded-lg shadow-2xl p-2 flex gap-2"
        >
          {models.map((model) => (
            <button
              key={model.type}
              onClick={() => setActiveModel(model.type)}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                activeModel === model.type
                  ? "bg-black text-white shadow-lg"
                  : "bg-transparent hover:bg-gray-100"
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
