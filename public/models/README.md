# 3D Models Directory

Place your GLTF/GLB model files here with these exact filenames:

## Required Model Files

1. **nas6204-bolt.glb** - Titanium Hex Bolt (NAS6204-12)
2. **ms21042-nut.glb** - Self-Locking Nut (MS21042-4) 
3. **an818-fitting.glb** - Hydraulic Fitting (AN818-4)
4. **ms16555-pin.glb** - Precision Pin (MS16555-2)

## Getting Started

See the main [GLTF_SETUP_GUIDE.md](../../GLTF_SETUP_GUIDE.md) for:
- Where to download or create 3D models
- How to convert CAD files to GLTF format
- Optimization tips
- Testing instructions

## Example Directory Structure

```
public/
└── models/
    ├── README.md (this file)
    ├── nas6204-bolt.glb
    ├── ms21042-nut.glb
    ├── an818-fitting.glb
    └── ms16555-pin.glb
```

## File Format
- **Preferred**: GLB (binary GLTF)
- **Alternative**: GLTF with separate bin/texture files
- **Max size**: Under 5MB per model recommended

## After Adding Models

1. Verify files are in this directory
2. Enable GLTF in your components:
   ```tsx
   <Model3DViewer modelType="bolt" useGLTF={true} />
   ```
3. Or update the Hero3DShowcase:
   ```tsx
   // In Hero3DShowcase.tsx
   const useGLTF = true; // Change from false to true
   ```

## Current Status

⏳ No model files present - using procedural fallback models
✅ System ready to load GLTF models when files are added

## Quick Test

To test with a sample model:
1. Download any GLTF model from Sketchfab
2. Rename it to `nas6204-bolt.glb`
3. Place it in this directory
4. Set `useGLTF={true}` in your component
5. Refresh your browser
