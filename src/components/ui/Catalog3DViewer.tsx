/**
 * Optimized 3D Viewer for Catalog Thumbnails
 * Implements lazy loading, reduced quality, and performance optimizations
 */

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { GLTFDirectLoader } from "../3d/GLTFDirectLoader";
import { ErrorBoundary } from "./ErrorBoundary";

interface Catalog3DViewerProps {
  modelPath: string;
  scale?: number;
  isVisible?: boolean;
}

const FallbackThumbnail = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <div className="text-gray-400 text-xs font-mono">No Preview</div>
  </div>
);

/**
 * Lightweight 3D viewer optimized for catalog grid display
 * - Lazy loads models only when visible
 * - Reduced lighting and shadow quality
 * - Lower DPR for better performance
 * - Pauses rendering when off-screen
 */
export const Catalog3DViewer = ({ 
  modelPath, 
  scale = 1.3,
  isVisible = true 
}: Catalog3DViewerProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before viewport
        threshold: 0.01
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <ErrorBoundary fallback={<FallbackThumbnail />}>
        {shouldLoad ? (
          <Canvas
            dpr={[0.5, 1]} // Lower device pixel ratio for thumbnails
            performance={{ min: 0.1, max: 0.8 }} // Aggressive performance throttling
            frameloop={isVisible ? "always" : "demand"} // Pause when not visible
            gl={{
              antialias: false, // Disable antialiasing for performance
              alpha: true,
              powerPreference: "low-power" // Prefer battery life
            }}
          >
            <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={35} />

            <Suspense fallback={null}>
              {/* Minimal lighting for thumbnails */}
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.0} />
              <directionalLight position={[-3, 3, -3]} intensity={0.5} />

              {/* Model */}
              <GLTFDirectLoader modelPath={modelPath} scale={scale} autoRotate={true} />

              {/* Lightweight environment */}
              <Environment preset="city" environmentIntensity={0.5} />
            </Suspense>
          </Canvas>
        ) : (
          // Placeholder while not loaded
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

/**
 * Preload catalog models in batches
 */
export const preloadCatalogModels = (modelPaths: string[], batchSize = 4) => {
  const batches: string[][] = [];
  for (let i = 0; i < modelPaths.length; i += batchSize) {
    batches.push(modelPaths.slice(i, i + batchSize));
  }

  // Load batches sequentially with delay
  batches.forEach((batch, index) => {
    setTimeout(() => {
      batch.forEach(async (path) => {
        try {
          const module = await import("@react-three/drei");
          module.useGLTF.preload(`/models/${path}`);
        } catch (error) {
          console.warn(`Failed to preload ${path}:`, error);
        }
      });
    }, index * 500); // 500ms between batches
  });
};
