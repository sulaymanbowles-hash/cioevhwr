/**
 * Model Wrapper - Direct GLTF Loading
 * Loads actual GLB models from /public/models/
 */

import { Suspense } from "react";

// GLTF Models
import {
  HexBoltGLTF,
  SelfLockingNutGLTF,
  HydraulicFittingGLTF,
  PrecisionPinGLTF,
} from "./GLTFModelLoader";

interface ModelWrapperProps {
  modelType: "bolt" | "nut" | "fitting" | "pin";
  scale?: number;
  autoRotate?: boolean;
  useGLTF?: boolean;
}

/**
 * Simple GLTF Model component
 */
const GLTFModel = ({ modelType, scale = 1, autoRotate = true }: ModelWrapperProps) => {
  switch (modelType) {
    case "bolt":
      return <HexBoltGLTF scale={scale} autoRotate={autoRotate} />;
    case "nut":
      return <SelfLockingNutGLTF scale={scale} autoRotate={autoRotate} />;
    case "fitting":
      return <HydraulicFittingGLTF scale={scale} autoRotate={autoRotate} />;
    case "pin":
      return <PrecisionPinGLTF scale={scale} autoRotate={autoRotate} />;
    default:
      return <HexBoltGLTF scale={scale} autoRotate={autoRotate} />;
  }
};

/**
 * Main model wrapper - GLTF only
 */
export const ModelWrapper = ({
  modelType,
  scale = 1,
  autoRotate = true,
}: ModelWrapperProps) => {
  // Load GLTF model directly with empty fallback
  return (
    <Suspense fallback={null}>
      <GLTFModel 
        modelType={modelType} 
        scale={scale} 
        autoRotate={autoRotate}
      />
    </Suspense>
  );
};
