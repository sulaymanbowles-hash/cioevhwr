/**
 * Model Wrapper with GLTF and Fallback Support
 * Attempts to load GLTF model, falls back to procedural model if unavailable
 * Implements hybrid approach from 3D_MODELS_RECOMMENDATION.md
 */

import { Suspense, useState, useEffect } from "react";

// GLTF Models
import {
  HexBoltGLTF,
  SelfLockingNutGLTF,
  HydraulicFittingGLTF,
  PrecisionPinGLTF,
} from "./GLTFModelLoader";

// Procedural Fallback Models
import { HexBolt } from "./HexBolt";
import { SelfLockingNut } from "./SelfLockingNut";
import { HydraulicFitting } from "./HydraulicFitting";
import { PrecisionPin } from "./PrecisionPin";

interface ModelWrapperProps {
  modelType: "bolt" | "nut" | "fitting" | "pin";
  scale?: number;
  autoRotate?: boolean;
  useGLTF?: boolean;
}

/**
 * Fallback component when GLTF loading fails
 */
const FallbackModel = ({ modelType, scale = 1, autoRotate = true }: ModelWrapperProps) => {
  switch (modelType) {
    case "bolt":
      return <HexBolt scale={scale * 1.3} autoRotate={autoRotate} />;
    case "nut":
      return <SelfLockingNut scale={scale * 1.6} autoRotate={autoRotate} />;
    case "fitting":
      return <HydraulicFitting scale={scale * 1.2} autoRotate={autoRotate} />;
    case "pin":
      return <PrecisionPin scale={scale * 1.1} autoRotate={autoRotate} />;
    default:
      return <HexBolt scale={scale * 1.3} autoRotate={autoRotate} />;
  }
};

/**
 * GLTF Model component with error handling
 */
const GLTFModelWithErrorBoundary = ({ modelType, scale = 1, autoRotate = true, onError }: ModelWrapperProps & { onError: () => void }) => {
  useEffect(() => {
    // Set up error listener for catching GLTF loading errors
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('Failed to load') || event.message?.includes('404')) {
        onError();
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

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
 * Main model wrapper with automatic fallback
 * Set useGLTF={true} to enable GLTF models (requires model files)
 * Set useGLTF={false} to use procedural models
 */
export const ModelWrapper = ({
  modelType,
  scale = 1,
  autoRotate = true,
  useGLTF = true, // GLTF models are now available!
}: ModelWrapperProps) => {
  const [hasError, setHasError] = useState(false);

  // If GLTF is disabled or errored, use fallback
  if (!useGLTF || hasError) {
    return <FallbackModel modelType={modelType} scale={scale} autoRotate={autoRotate} />;
  }

  // Try to load GLTF model with error handling
  return (
    <Suspense fallback={<FallbackModel modelType={modelType} scale={scale} autoRotate={autoRotate} />}>
      <GLTFModelWithErrorBoundary 
        modelType={modelType} 
        scale={scale} 
        autoRotate={autoRotate}
        onError={() => {
          console.warn(`Failed to load GLTF model for ${modelType}, using procedural fallback`);
          setHasError(true);
        }}
      />
    </Suspense>
  );
};
