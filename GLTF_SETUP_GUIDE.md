# GLTF Model Setup Guide

## Overview
This guide explains how to implement actual 3D CAD models (GLTF/GLB format) for your aerospace components. The system is configured with automatic fallback to procedural models if GLTF files are unavailable.

## Quick Start

### 1. Create Models Directory
```bash
mkdir -p public/models
```

### 2. Add Your GLTF/GLB Files
Place your 3D model files in the `public/models/` directory with these names:
- `nas6204-bolt.glb` - Hex Bolt (Titanium)
- `ms21042-nut.glb` - Self-Locking Nut (Cadmium-plated CRES)
- `an818-fitting.glb` - Hydraulic Fitting (Brass)
- `ms16555-pin.glb` - Precision Pin (Stainless Steel)

### 3. Enable GLTF Models
Update your components to use GLTF models by setting the `useGLTF` prop:

```tsx
<Model3DViewer 
  modelType="bolt" 
  useGLTF={true}  // Enable GLTF models
/>
```

## Where to Get 3D Models

### Option 1: Free Model Sources
1. **GrabCAD** (https://grabcad.com)
   - Search for part numbers: NAS6204, MS21042, AN818, MS16555
   - Download as STEP/IGES and convert to GLTF

2. **Sketchfab** (https://sketchfab.com)
   - Search: "aerospace bolt", "self locking nut", "hydraulic fitting"
   - Download GLTF format directly
   - Filter by "Downloadable" and "Creative Commons" license

3. **McMaster-Carr** (https://www.mcmaster.com)
   - Search for exact part numbers
   - Download CAD files (STEP format)
   - Convert to GLTF using Blender

### Option 2: Paid Model Sources
- **TurboSquid** ($10-50 per model): https://turbosquid.com
- **CGTrader** ($10-50 per model): https://cgtrader.com
- Search terms: "hex bolt", "lock nut", "hydraulic fitting", "precision pin"

### Option 3: Create Your Own
Use CAD software like:
- **Blender** (Free) - Model and export as GLTF
- **Fusion 360** (Free for hobbyists) - Export as STEP, convert to GLTF
- **OnShape** (Free) - Model parametric parts, export STEP

## Converting CAD Files to GLTF

### Using Blender (Recommended)
1. Install Blender: https://www.blender.org/download/
2. Import your CAD file (STEP, IGES, OBJ, STL):
   - File → Import → Select format
3. Optimize the model:
   - Tab (Edit Mode) → Select all (A)
   - Mesh → Clean Up → Decimate Geometry (optional)
4. Export as GLTF:
   - File → Export → glTF 2.0 (.glb)
   - Check "Apply Modifiers"
   - Format: "glTF Binary (.glb)"
   - Save to `public/models/`

### Using Online Converters
- **FreeCAD**: Import STEP, export as GLTF
- **Online converters**: https://imagetostl.com/convert/file/step/to/gltf

## Model Optimization

### Compression with Draco
Reduce file size by 70-90%:

```bash
npm install -g gltf-pipeline
gltf-pipeline -i model.glb -o model-compressed.glb -d
```

### Recommended Model Specs
- **Polygons**: 5,000 - 20,000 triangles per model
- **Textures**: 1024x1024 or 2048x2048 max
- **File size**: Under 5MB per model
- **Format**: GLB (binary GLTF) preferred over GLTF+separate files

## Implementation Details

### Current System Architecture

```
src/components/3d/
├── GLTFModelLoader.tsx     # Loads GLTF models
├── ModelWrapper.tsx         # Smart wrapper with fallback
├── HexBolt.tsx             # Procedural fallback model
├── SelfLockingNut.tsx      # Procedural fallback model
├── HydraulicFitting.tsx    # Procedural fallback model
└── PrecisionPin.tsx        # Procedural fallback model
```

### How the Fallback System Works

1. **GLTF First**: Attempts to load GLTF model from `/public/models/`
2. **Error Handling**: If GLTF fails to load, catches error
3. **Automatic Fallback**: Switches to procedural model
4. **Console Warning**: Logs fallback message for debugging

### Example Usage

```tsx
import { Model3DViewer } from "@/components/ui/Model3DViewer";

// With GLTF models (when files are available)
<Model3DViewer 
  modelType="bolt" 
  useGLTF={true}
  autoRotate={true}
  quality="high"
/>

// Using procedural fallback models
<Model3DViewer 
  modelType="bolt" 
  useGLTF={false}  // or omit this prop
  autoRotate={true}
  quality="high"
/>
```

## Testing Your Models

### 1. Test Locally
```bash
npm run dev
```
Navigate to your component and check:
- Model loads correctly
- Scale is appropriate
- Rotation works smoothly
- No console errors

### 2. Verify Fallback
Temporarily rename your model file to test fallback:
```bash
mv public/models/nas6204-bolt.glb public/models/nas6204-bolt.glb.bak
```
Refresh page - should see procedural model + console warning

### 3. Check Performance
- Open DevTools → Performance tab
- Record while rotating model
- FPS should stay above 55fps on modern hardware

## Model Requirements by Part Type

### Hex Bolt (NAS6204)
- **Key Features**: Hex head, socket drive recess, threaded shaft
- **Scale**: Approximately 1-2 inches length
- **Material**: Titanium appearance (gray metallic)

### Self-Locking Nut (MS21042)
- **Key Features**: Hexagonal shape, nylon locking collar visible
- **Scale**: Approximately 0.5 inches diameter
- **Material**: Cadmium-plated steel (silver metallic)

### Hydraulic Fitting (AN818)
- **Key Features**: 37° flare angle, hex grip sections, threaded ends
- **Scale**: Approximately 1-2 inches length
- **Material**: Brass (gold/yellow metallic)

### Precision Pin (MS16555)
- **Key Features**: Cylindrical shaft, rounded head, groove for clip
- **Scale**: Approximately 1.5 inches length
- **Material**: Stainless steel (bright silver)

## Troubleshooting

### Models appear black
✓ Fixed! Updated lighting in viewers:
- Increased ambient light intensity
- Added multiple directional lights
- Enhanced environment map intensity

### Model not loading
- Check file path: Must be in `public/models/`
- Check filename: Must match exactly (case-sensitive)
- Check console for errors
- Verify file format: .glb or .gltf
- Try different model file

### Model too large/small
Adjust scale prop:
```tsx
<Model3DViewer modelType="bolt" scale={2.0} useGLTF={true} />
```

### Model rotation issues
Check if autoRotate is enabled:
```tsx
<Model3DViewer modelType="bolt" autoRotate={true} useGLTF={true} />
```

### Performance issues
- Reduce polygon count in Blender
- Use Draco compression
- Lower quality prop: `quality="medium"`
- Enable LOD (Level of Detail) if available

## Preloading Models

For better performance, preload models on app initialization:

```tsx
import { useEffect } from "react";
import { preloadModels, MODEL_PATHS } from "@/components/3d/GLTFModelLoader";

function App() {
  useEffect(() => {
    // Preload all models
    preloadModels(Object.values(MODEL_PATHS));
  }, []);
  
  return <YourApp />;
}
```

## Next Steps

1. **Obtain GLTF files** for your four key parts
2. **Place files** in `public/models/` directory
3. **Enable GLTF** by setting `useGLTF={true}` in components
4. **Test thoroughly** with different browsers and devices
5. **Optimize** file sizes if needed
6. **Update** other components using Model3DViewer

## Resources

- [Three.js GLTF Documentation](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [React Three Fiber Models Guide](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)
- [Draco 3D Compression](https://google.github.io/draco/)
- [Blender Download](https://www.blender.org/download/)

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify file paths and names
3. Test with a sample GLTF model from Sketchfab
4. Ensure @react-three/drei is installed: `npm install @react-three/drei`

## Current Status

✅ GLTF loader system implemented
✅ Fallback system working
✅ Lighting issues fixed (models no longer appear black)
⏳ Waiting for actual GLTF/GLB model files

**To enable GLTF models**: Add your .glb files to `/public/models/` and set `useGLTF={true}`
