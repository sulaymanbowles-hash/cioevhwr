# 3D Models Implementation Recommendation

## Current State
The website currently uses custom-built 3D models created with Three.js primitives (cylinders, boxes, etc.) for four aerospace components:
- Hex Bolt (Titanium)
- Self-Locking Nut (Cadmium-plated CRES)
- Hydraulic Fitting (Brass)
- Precision Pin (Stainless Steel)

## Recommendation: Use 3D Model Libraries

### Option 1: GLTF/GLB Model Files (Recommended)
Use pre-made or CAD-exported GLTF/GLB models for accurate representations:

**Implementation:**
```jsx
import { useGLTF } from '@react-three/drei';

function BoltModel() {
  const { scene } = useGLTF('/models/nas6204-bolt.glb');
  return <primitive object={scene} />;
}
```

**Benefits:**
- Photorealistic accuracy from actual CAD models
- Smaller bundle size than procedural geometry
- Industry-standard format
- Easy to add more models

**Sources:**
- [Sketchfab](https://sketchfab.com) - Industrial 3D models
- [TurboSquid](https://turbosquid.com) - Professional CAD models
- [GrabCAD](https://grabcad.com) - Engineering community models
- McMaster-Carr CAD downloads (for accurate part geometry)

### Option 2: Parametric CAD Libraries
Use libraries that generate models from specifications:

**react-cad** or **jscad-fiber**:
```jsx
import { Bolt } from 'react-cad/fasteners';

<Bolt 
  diameter={0.25}
  length={1.25}
  threadType="UNF"
  material="titanium"
/>
```

### Option 3: Three.js Geometry Libraries
Continue with procedural generation but use specialized libraries:

**three-stdlib** - Extended Three.js geometries
**@react-three/csg** - Constructive Solid Geometry operations

## Implementation Plan

### Phase 1: Source Models
1. Obtain GLTF/GLB files for key part numbers:
   - NAS6204-12 (Hex Bolt)
   - MS21042-4 (Lock Nut)
   - AN818-4 (Hydraulic Fitting)
   - MS16555-2 (Precision Pin)

### Phase 2: Integration
1. Install dependencies:
   ```bash
   npm install @react-three/drei
   ```

2. Create model loader component:
   ```tsx
   // src/components/3d/ModelLoader.tsx
   import { useGLTF } from '@react-three/drei';
   
   export function ModelLoader({ modelPath, ...props }) {
     const { scene } = useGLTF(modelPath);
     return <primitive object={scene.clone()} {...props} />;
   }
   ```

3. Replace existing components progressively

### Phase 3: Optimization
1. Use `useGLTF.preload()` for better performance
2. Implement LOD (Level of Detail) for complex models
3. Compress models with Draco or gzip

## Model Requirements by Part Type

### Bolts & Screws
- Accurate thread representation
- Head geometry (hex, socket, etc.)
- Material finish details
- Drive recess details

### Nuts
- Thread representation
- Locking feature visualization
- Flange/collar details
- Material finish

### Fittings
- Flare angles (37° for AN fittings)
- Thread details
- Hex flat dimensions
- Port configurations

### Pins
- Surface finish representation
- Chamfers and radii
- Groove details
- Head configurations

## Current Custom Models
The existing custom models are well-crafted with:
- Accurate dimensional ratios
- Proper material colors
- Physically-based rendering
- Good performance

**Decision:** Keep custom models as fallback, add GLTF models when available.

## Resources
- [Three.js GLTF Guide](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [React Three Fiber Models](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)
- [Draco Compression](https://google.github.io/draco/)
- [McMaster-Carr 3D Downloads](https://www.mcmaster.com)

## Cost Considerations
- Free models: GrabCAD, Sketchfab (Creative Commons)
- Paid models: $10-50 per model (TurboSquid, CGTrader)
- Custom modeling: $100-500 per model (if commissioning)
- CAD export: Free if you have part specifications

## Next Steps
1. Identify highest-priority models for GLTF conversion
2. Source or create GLTF files
3. Implement parallel model system (GLTF + fallback)
4. Performance test
5. Roll out across product catalog
