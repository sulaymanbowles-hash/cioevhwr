/**
 * GLTF Model Loader Component
 * Loads actual 3D CAD models in GLTF/GLB format
 * Implements Option 1 from 3D_MODELS_RECOMMENDATION.md
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

interface GLTFModelLoaderProps {
  modelPath: string;
  scale?: number;
  autoRotate?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Generic GLTF model loader with auto-rotation support
 */
export const GLTFModelLoader = ({
  modelPath,
  scale = 1,
  autoRotate = true,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: GLTFModelLoaderProps) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene.clone()} />
    </group>
  );
};

/**
 * Preload GLTF models for better performance
 */
export const preloadModels = (modelPaths: string[]) => {
  modelPaths.forEach((path) => {
    useGLTF.preload(path);
  });
};

/**
 * Model paths configuration
 * Place your GLTF/GLB files in /public/models/ directory
 */
export const MODEL_PATHS = {
  // NAS6204 Hex Bolt (Titanium)
  bolt: "/models/nas6204-bolt.glb",
  
  // MS21042 Self-Locking Nut (Cadmium-plated CRES)
  nut: "/models/ms21042-nut.glb",
  
  // AN818 Hydraulic Fitting (Brass)
  fitting: "/models/an818-fitting.glb",
  
  // MS16555 Precision Pin (Stainless Steel)
  pin: "/models/ms16555-pin.glb",
} as const;

/**
 * Component-specific GLTF model loaders
 */
export const HexBoltGLTF = ({ scale = 1.3, autoRotate = true }) => (
  <GLTFModelLoader
    modelPath={MODEL_PATHS.bolt}
    scale={scale}
    autoRotate={autoRotate}
  />
);

export const SelfLockingNutGLTF = ({ scale = 1.6, autoRotate = true }) => (
  <GLTFModelLoader
    modelPath={MODEL_PATHS.nut}
    scale={scale}
    autoRotate={autoRotate}
  />
);

export const HydraulicFittingGLTF = ({ scale = 1.2, autoRotate = true }) => (
  <GLTFModelLoader
    modelPath={MODEL_PATHS.fitting}
    scale={scale}
    autoRotate={autoRotate}
  />
);

export const PrecisionPinGLTF = ({ scale = 1.1, autoRotate = true }) => (
  <GLTFModelLoader
    modelPath={MODEL_PATHS.pin}
    scale={scale}
    autoRotate={autoRotate}
  />
);
