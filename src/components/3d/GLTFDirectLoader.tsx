/**
 * GLTF Direct Loader Component
 * Loads specific GLTF/GLB files by direct path
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

interface GLTFDirectLoaderProps {
  modelPath: string;
  scale?: number;
  autoRotate?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Load a specific GLTF model by file path
 */
export const GLTFDirectLoader = ({
  modelPath,
  scale = 1,
  autoRotate = true,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: GLTFDirectLoaderProps) => {
  const groupRef = useRef<Group>(null);
  const fullPath = `/models/${modelPath}`;
  const { scene } = useGLTF(fullPath);

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
 * Preload specific model files
 */
export const preloadModelFiles = (modelPaths: string[]) => {
  modelPaths.forEach((path) => {
    useGLTF.preload(`/models/${path}`);
  });
};
