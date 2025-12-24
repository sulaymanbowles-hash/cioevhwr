# Quick Start: Enabling GLTF Models

## Status
✅ Lighting fixed - models no longer appear black
✅ GLTF loader system implemented
✅ Fallback system ready
⏳ Waiting for GLTF model files

## To Enable GLTF Models (2 Steps)

### Step 1: Add Model Files
Place your GLTF/GLB files in `/public/models/` with these exact names:
- `nas6204-bolt.glb`
- `ms21042-nut.glb`
- `an818-fitting.glb`
- `ms16555-pin.glb`

### Step 2: Enable in Code

#### Option A: Enable in Hero3DShowcase (Homepage)
In [src/components/ui/Hero3DShowcase.tsx](src/components/ui/Hero3DShowcase.tsx):
```tsx
// Change line 11 from:
const useGLTF = false;

// To:
const useGLTF = true;
```

#### Option B: Enable when using Model3DViewer
```tsx
<Model3DViewer 
  modelType="bolt" 
  useGLTF={true}  // Add this prop
/>
```

## What's Fixed

### 1. Black Material Issue ✅
**Problem**: Models appeared all black
**Solution**: 
- Increased ambient light intensity (0.3 → 0.6)
- Enhanced directional light intensity
- Improved environment map intensity
- Added multiple light sources for better coverage

**Files Updated**:
- [Model3DViewer.tsx](src/components/ui/Model3DViewer.tsx)
- [Product3DViewer.tsx](src/components/ui/Product3DViewer.tsx)
- [Hero3DShowcase.tsx](src/components/ui/Hero3DShowcase.tsx)

### 2. GLTF Model System ✅
**Implemented**:
- GLTF loader component ([GLTFModelLoader.tsx](src/components/3d/GLTFModelLoader.tsx))
- Smart wrapper with fallback ([ModelWrapper.tsx](src/components/3d/ModelWrapper.tsx))
- Model path configuration
- Error handling with automatic fallback to procedural models

## Current Behavior

### Without GLTF Files (Current)
- Uses procedural models (custom Three.js geometry)
- Models now properly lit and visible
- No console errors

### With GLTF Files (After adding models)
- Loads actual CAD models from `/public/models/`
- Automatic fallback if files missing or fail to load
- Better visual fidelity and accuracy

## File Structure
```
src/
├── components/
│   ├── 3d/
│   │   ├── GLTFModelLoader.tsx     ← New: GLTF loader
│   │   ├── ModelWrapper.tsx        ← New: Smart wrapper
│   │   ├── HexBolt.tsx             ← Fallback model
│   │   ├── SelfLockingNut.tsx      ← Fallback model
│   │   ├── HydraulicFitting.tsx    ← Fallback model
│   │   └── PrecisionPin.tsx        ← Fallback model
│   └── ui/
│       ├── Model3DViewer.tsx       ← Updated: supports GLTF
│       ├── Product3DViewer.tsx     ← Updated: better lighting
│       └── Hero3DShowcase.tsx      ← Updated: uses ModelWrapper

public/
└── models/
    └── README.md                   ← Instructions for model files
```

## Testing

### Test Current Changes (No GLTF files needed)
```bash
npm run dev
```
Visit the homepage - models should now be properly lit (not black)

### Test GLTF System (After adding model files)
1. Add at least one model file to `/public/models/`
2. Enable GLTF in code (see Step 2 above)
3. Run `npm run dev`
4. Check browser console for any errors
5. Model should load from GLTF file

### Test Fallback System
1. Enable GLTF but don't add model files
2. Should see procedural model + console warning:
   ```
   Failed to load GLTF model for bolt, using procedural fallback
   ```

## Where to Get Models

See [GLTF_SETUP_GUIDE.md](GLTF_SETUP_GUIDE.md) for:
- Free model sources (GrabCAD, Sketchfab, McMaster-Carr)
- Paid model sources (TurboSquid, CGTrader)
- How to convert CAD files to GLTF using Blender
- Model optimization tips
- Detailed specifications for each part type

## Next Steps

1. ✅ Black material issue - **FIXED**
2. ✅ GLTF system - **IMPLEMENTED**
3. ⏳ Get GLTF model files - **YOUR ACTION**
4. ⏳ Enable GLTF in code - **YOUR ACTION**
5. ⏳ Test and verify - **YOUR ACTION**

## Need Help?

- **Can't find models?** Check [GLTF_SETUP_GUIDE.md](GLTF_SETUP_GUIDE.md) for sources
- **Model not loading?** Check browser console for errors
- **Wrong size/position?** Adjust `scale` prop in code
- **Still appears black?** Refresh browser (hard refresh: Ctrl+Shift+R)

## Summary

✨ **The black material issue is fixed** - your procedural models now display correctly with proper lighting.

🎯 **GLTF system is ready** - just add model files to `/public/models/` and set `useGLTF={true}` to use actual part models.

📖 **Full documentation available** in [GLTF_SETUP_GUIDE.md](GLTF_SETUP_GUIDE.md)
