#!/usr/bin/env python3
"""
Generate Simple GLTF Models for Aerospace Components
Creates basic but realistic 3D models for bolts, nuts, fittings, and pins
"""

import trimesh
import numpy as np
from pathlib import Path

def create_hex_bolt():
    """Create a titanium hex bolt (NAS6204 style)"""
    # Hex head
    hex_radius = 0.22
    hex_height = 0.19
    hex_head = trimesh.creation.cylinder(
        radius=hex_radius, 
        height=hex_height, 
        sections=6
    )
    hex_head.apply_translation([0, 0, 0.6])
    
    # Shaft
    shaft_radius = 0.125
    shaft_length = 1.2
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    
    # Thread ridges
    threads = []
    num_threads = 25
    for i in range(num_threads):
        z_pos = -0.6 + (i * 0.048)
        thread = trimesh.creation.torus(
            major_radius=shaft_radius,
            minor_radius=0.012,
            major_sections=32,
            minor_sections=8
        )
        thread.apply_translation([0, 0, z_pos])
        threads.append(thread)
    
    # Combine all parts
    meshes = [hex_head, shaft] + threads
    bolt = trimesh.util.concatenate(meshes)
    
    # Apply titanium-like color
    bolt.visual.vertex_colors = [148, 158, 173, 255]
    
    return bolt

def create_self_locking_nut():
    """Create a self-locking nut (MS21042 style)"""
    # Main hex body
    outer_radius = 0.22
    nut_height = 0.28
    nut_body = trimesh.creation.cylinder(
        radius=outer_radius,
        height=nut_height,
        sections=6
    )
    
    # Inner hole
    inner_radius = 0.13
    hole = trimesh.creation.cylinder(
        radius=inner_radius,
        height=nut_height + 0.1,
        sections=32
    )
    
    # Subtract hole from body (boolean difference)
    try:
        nut = nut_body.difference(hole)
    except:
        nut = nut_body  # Fallback if boolean fails
    
    # Add thread details
    threads = []
    num_threads = 8
    for i in range(num_threads):
        z_pos = -0.12 + (i * 0.035)
        thread = trimesh.creation.torus(
            major_radius=inner_radius,
            minor_radius=0.01,
            major_sections=32,
            minor_sections=6
        )
        thread.apply_translation([0, 0, z_pos])
        threads.append(thread)
    
    # Locking collar (nylon insert)
    collar = trimesh.creation.cylinder(
        radius=inner_radius + 0.02,
        height=0.09,
        sections=32
    )
    collar.apply_translation([0, 0, 0.09])
    collar.visual.vertex_colors = [30, 60, 90, 255]  # Blue for nylon
    
    # Combine
    meshes = [nut, collar] + threads
    final_nut = trimesh.util.concatenate(meshes)
    
    # Stainless steel color
    final_nut.visual.vertex_colors = [199, 209, 224, 255]
    
    return final_nut

def create_hydraulic_fitting():
    """Create a hydraulic fitting (AN818 style)"""
    # Main body
    body = trimesh.creation.cylinder(
        radius=0.16,
        height=1.1,
        sections=32
    )
    
    # Hex grip sections
    hex1 = trimesh.creation.cylinder(
        radius=0.21,
        height=0.25,
        sections=6
    )
    hex1.apply_translation([0, 0, 0.3])
    
    hex2 = trimesh.creation.cylinder(
        radius=0.21,
        height=0.25,
        sections=6
    )
    hex2.apply_translation([0, 0, -0.3])
    
    # Flared ends (cones)
    flare1 = trimesh.creation.cone(
        radius=0.2,
        height=0.2,
        sections=32
    )
    flare1.apply_translation([0, 0, 0.65])
    
    flare2 = trimesh.creation.cone(
        radius=0.2,
        height=0.2,
        sections=32
    )
    flare2.apply_transform(trimesh.transformations.rotation_matrix(np.pi, [1, 0, 0]))
    flare2.apply_translation([0, 0, -0.65])
    
    # Combine
    fitting = trimesh.util.concatenate([body, hex1, hex2, flare1, flare2])
    
    # Brass color
    fitting.visual.vertex_colors = [224, 183, 92, 255]
    
    return fitting

def create_precision_pin():
    """Create a precision pin (MS16555 style)"""
    # Main shaft
    shaft_radius = 0.09
    shaft_length = 1.6
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    shaft.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    
    # Rounded head
    head = trimesh.creation.icosphere(
        subdivisions=3,
        radius=0.12
    )
    head.apply_translation([0.82, 0, 0])
    
    # Groove for retaining clip
    groove = trimesh.creation.torus(
        major_radius=shaft_radius - 0.01,
        minor_radius=0.015,
        major_sections=32,
        minor_sections=8
    )
    groove.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    groove.apply_translation([-0.65, 0, 0])
    
    # Chamfered tip
    tip = trimesh.creation.cone(
        radius=shaft_radius,
        height=0.12,
        sections=32
    )
    tip.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [0, 1, 0]))
    tip.apply_translation([-0.86, 0, 0])
    
    # Combine
    pin = trimesh.util.concatenate([shaft, head, groove, tip])
    
    # Stainless steel color
    pin.visual.vertex_colors = [133, 133, 133, 255]
    
    return pin

def main():
    """Generate all models and save as GLB files"""
    output_dir = Path(__file__).parent.parent / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("Generating 3D models...")
    
    # Generate bolt
    print("  Creating hex bolt...")
    bolt = create_hex_bolt()
    bolt.export(output_dir / "nas6204-bolt.glb")
    print(f"    ✓ Saved: nas6204-bolt.glb ({bolt.vertices.shape[0]} vertices)")
    
    # Generate nut
    print("  Creating self-locking nut...")
    nut = create_self_locking_nut()
    nut.export(output_dir / "ms21042-nut.glb")
    print(f"    ✓ Saved: ms21042-nut.glb ({nut.vertices.shape[0]} vertices)")
    
    # Generate fitting
    print("  Creating hydraulic fitting...")
    fitting = create_hydraulic_fitting()
    fitting.export(output_dir / "an818-fitting.glb")
    print(f"    ✓ Saved: an818-fitting.glb ({fitting.vertices.shape[0]} vertices)")
    
    # Generate pin
    print("  Creating precision pin...")
    pin = create_precision_pin()
    pin.export(output_dir / "ms16555-pin.glb")
    print(f"    ✓ Saved: ms16555-pin.glb ({pin.vertices.shape[0]} vertices)")
    
    print("\n✅ All models generated successfully!")
    print(f"📁 Location: {output_dir}")
    print("\n🚀 Next steps:")
    print("  1. Set useGLTF={true} in your components")
    print("  2. Refresh your browser")
    print("  3. Models will load automatically!")

if __name__ == "__main__":
    main()
