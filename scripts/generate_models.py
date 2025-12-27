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
    
    # Locking collar (metal deformation)
    collar = trimesh.creation.cylinder(
        radius=outer_radius, # Same as body
        height=0.06,
        sections=6
    )
    collar.apply_translation([0, 0, nut_height/2 + 0.03])
    
    # Combine
    meshes = [nut, collar] + threads
    final_nut = trimesh.util.concatenate(meshes)
    
    # Stainless steel color
    final_nut.visual.vertex_colors = [199, 209, 224, 255]
    
    return final_nut

def create_hydraulic_fitting():
    """Create a hydraulic fitting (AN815 Union style)"""
    # Central Hex
    hex_center = trimesh.creation.cylinder(
        radius=0.28,
        height=0.22,
        sections=6
    )

    # Top Body
    body_top = trimesh.creation.cylinder(
        radius=0.16,
        height=0.5,
        sections=32
    )
    body_top.apply_translation([0, 0, 0.36])

    # Bottom Body
    body_bottom = trimesh.creation.cylinder(
        radius=0.16,
        height=0.5,
        sections=32
    )
    body_bottom.apply_translation([0, 0, -0.36])
    
    # Flared ends (cones)
    flare1 = trimesh.creation.cone(
        radius=0.2,
        height=0.2,
        sections=32
    )
    flare1.apply_translation([0, 0, 0.61])
    
    flare2 = trimesh.creation.cone(
        radius=0.2,
        height=0.2,
        sections=32
    )
    flare2.apply_transform(trimesh.transformations.rotation_matrix(np.pi, [1, 0, 0]))
    flare2.apply_translation([0, 0, -0.61])
    
    # Combine
    fitting = trimesh.util.concatenate([hex_center, body_top, body_bottom, flare1, flare2])
    
    # Brass color
    fitting.visual.vertex_colors = [224, 183, 92, 255]
    
    return fitting

def create_precision_pin():
    """Create a precision pin (MS16555 Dowel style)"""
    # Main shaft
    shaft_radius = 0.09
    shaft_length = 1.6
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    shaft.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    
    # Chamfer Left
    chamfer1 = trimesh.creation.cone(
        radius=shaft_radius,
        height=0.1,
        sections=32
    )
    chamfer1.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [0, 1, 0]))
    chamfer1.apply_translation([-0.85, 0, 0])

    # Chamfer Right
    chamfer2 = trimesh.creation.cone(
        radius=shaft_radius,
        height=0.1,
        sections=32
    )
    chamfer2.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    chamfer2.apply_translation([0.85, 0, 0])
    
    # Combine
    pin = trimesh.util.concatenate([shaft, chamfer1, chamfer2])
    
    # Stainless steel color
    pin.visual.vertex_colors = [199, 209, 224, 255]
    
    return pin
    
    # Stainless steel color
    pin.visual.vertex_colors = [133, 133, 133, 255]
    
    return pin

def create_tube_coupling():
    """Create a tube coupling (AN819 style) - different from AN818 fitting"""
    # AN819 is a sleeve/coupling, not a flared fitting
    # Main coupling body
    body = trimesh.creation.cylinder(
        radius=0.18,
        height=0.9,
        sections=32
    )
    
    # Hex grip in center
    hex_grip = trimesh.creation.cylinder(
        radius=0.23,
        height=0.35,
        sections=6
    )
    
    # Inner passage
    passage = trimesh.creation.cylinder(
        radius=0.13,
        height=1.0,
        sections=32
    )
    
    # Create the coupling by subtracting the passage
    try:
        coupling = body.difference(passage)
    except:
        coupling = body
    
    # Add hex grip
    coupling = trimesh.util.concatenate([coupling, hex_grip])
    
    # Brass color - slightly different than AN818
    coupling.visual.vertex_colors = [205, 170, 80, 255]
    
    return coupling

def create_socket_head_screw():
    """Create a socket head cap screw (NAS1351/1352 style)"""
    # Socket head (low profile)
    head_radius = 0.21
    head_height = 0.17
    head = trimesh.creation.cylinder(
        radius=head_radius,
        height=head_height,
        sections=32
    )
    head.apply_translation([0, 0, 0.5])
    
    # Hex socket recess
    socket = trimesh.creation.cylinder(
        radius=0.09,
        height=0.10,
        sections=6
    )
    socket.apply_translation([0, 0, 0.54])
    
    # Shaft
    shaft_radius = 0.125
    shaft_length = 1.0
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    
    # Threads
    threads = []
    num_threads = 20
    for i in range(num_threads):
        z_pos = -0.5 + (i * 0.048)
        thread = trimesh.creation.torus(
            major_radius=shaft_radius,
            minor_radius=0.010,
            major_sections=32,
            minor_sections=8
        )
        thread.apply_translation([0, 0, z_pos])
        threads.append(thread)
    
    # Combine
    meshes = [head, shaft] + threads
    screw = trimesh.util.concatenate(meshes)
    
    # Titanium color
    screw.visual.vertex_colors = [148, 158, 173, 255]
    
    return screw

def create_castle_nut():
    """Create a castle nut (AN310 style)"""
    # Main hex body
    outer_radius = 0.20
    nut_height = 0.25
    nut_body = trimesh.creation.cylinder(
        radius=outer_radius,
        height=nut_height,
        sections=6
    )
    
    # Castle top (slots)
    castle_height = 0.08
    castle = trimesh.creation.cylinder(
        radius=outer_radius,
        height=castle_height,
        sections=6
    )
    castle.apply_translation([0, 0, 0.16])
    
    # Inner hole
    inner_radius = 0.125
    hole = trimesh.creation.cylinder(
        radius=inner_radius,
        height=nut_height + castle_height + 0.1,
        sections=32
    )
    
    # Combine
    try:
        nut = nut_body.union(castle)
        nut = nut.difference(hole)
    except:
        nut = trimesh.util.concatenate([nut_body, castle])
    
    # Stainless steel color
    nut.visual.vertex_colors = [199, 209, 224, 255]
    
    return nut

def create_elbow_fitting():
    """Create a 90-degree elbow fitting (MS21904 style)"""
    # Create curved elbow using segments
    segments = []
    num_segments = 8
    radius = 0.12
    bend_radius = 0.3
    
    for i in range(num_segments):
        angle = (i * np.pi / 2) / (num_segments - 1)
        seg = trimesh.creation.cylinder(
            radius=radius,
            height=bend_radius / num_segments,
            sections=24
        )
        # Position and rotate each segment
        x = bend_radius * np.cos(angle)
        z = bend_radius * np.sin(angle)
        seg.apply_transform(trimesh.transformations.rotation_matrix(angle, [0, 1, 0]))
        seg.apply_translation([x, 0, z])
        segments.append(seg)
    
    # Straight sections
    straight1 = trimesh.creation.cylinder(
        radius=radius,
        height=0.4,
        sections=24
    )
    straight1.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    straight1.apply_translation([-0.5, 0, 0])
    
    straight2 = trimesh.creation.cylinder(
        radius=radius,
        height=0.4,
        sections=24
    )
    straight2.apply_translation([0, 0, 0.5])
    
    # Combine
    elbow = trimesh.util.concatenate(segments + [straight1, straight2])
    
    # Aluminum color
    elbow.visual.vertex_colors = [191, 196, 204, 255]
    
    return elbow

def create_dowel_pin():
    """Create a dowel pin (MS16555-4 style) - larger diameter"""
    shaft_radius = 0.0625  # 1/8 inch diameter
    shaft_length = 0.5
    
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    shaft.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    
    # Chamfered ends
    end1 = trimesh.creation.cone(
        radius=shaft_radius,
        height=0.05,
        sections=32
    )
    end1.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [0, 1, 0]))
    end1.apply_translation([-0.275, 0, 0])
    
    end2 = trimesh.creation.cone(
        radius=shaft_radius,
        height=0.05,
        sections=32
    )
    end2.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    end2.apply_translation([0.275, 0, 0])
    
    # Combine
    pin = trimesh.util.concatenate([shaft, end1, end2])
    
    # Hardened steel color (darker)
    pin.visual.vertex_colors = [110, 110, 110, 255]
    
    return pin

def create_clevis_pin():
    """Create a clevis pin (AN392 style)"""
    shaft_radius = 0.1875
    shaft_length = 1.2
    
    # Main shaft
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=shaft_length,
        sections=32
    )
    shaft.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    
    # Head
    head = trimesh.creation.cylinder(
        radius=0.28,
        height=0.15,
        sections=32
    )
    head.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    head.apply_translation([0.675, 0, 0])
    
    # Cotter pin hole
    hole = trimesh.creation.cylinder(
        radius=0.04,
        height=0.4,
        sections=16
    )
    hole.apply_translation([-0.5, 0, 0])
    
    # Combine
    try:
        pin = trimesh.util.concatenate([shaft, head])
        pin = pin.difference(hole)
    except:
        pin = trimesh.util.concatenate([shaft, head])
    
    # Stainless steel color
    pin.visual.vertex_colors = [160, 160, 160, 255]
    
    return pin

def create_taper_pin():
    """Create a taper pin (AN385 style)"""
    small_radius = 0.08
    large_radius = 0.12
    length = 0.8
    
    # Tapered shaft using cone
    shaft = trimesh.creation.cone(
        radius=large_radius,
        height=length,
        sections=32
    )
    shaft.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [0, 1, 0]))
    
    # Small end
    small_end = trimesh.creation.cylinder(
        radius=small_radius,
        height=0.05,
        sections=32
    )
    small_end.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    small_end.apply_translation([-0.425, 0, 0])
    
    # Combine
    pin = trimesh.util.concatenate([shaft, small_end])
    
    # Stainless steel color
    pin.visual.vertex_colors = [145, 145, 145, 255]
    
    return pin

def create_straight_union():
    """Create a straight union fitting (AN815 style)"""
    # Center body
    body = trimesh.creation.cylinder(
        radius=0.20,
        height=0.8,
        sections=32
    )
    
    # Hex grip in center
    hex_grip = trimesh.creation.cylinder(
        radius=0.25,
        height=0.3,
        sections=6
    )
    
    # End sleeves
    sleeve1 = trimesh.creation.cylinder(
        radius=0.15,
        height=0.25,
        sections=32
    )
    sleeve1.apply_translation([0, 0, 0.525])
    
    sleeve2 = trimesh.creation.cylinder(
        radius=0.15,
        height=0.25,
        sections=32
    )
    sleeve2.apply_translation([0, 0, -0.525])
    
    # Combine
    union = trimesh.util.concatenate([body, hex_grip, sleeve1, sleeve2])
    
    # Brass color
    union.visual.vertex_colors = [220, 180, 85, 255]
    
    return union

def main():
    """Generate all models and save as GLB files"""
    output_dir = Path(__file__).parent.parent / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print("Generating 3D models...")
    
    models = [
        ("nas6204-12.glb", create_hex_bolt, "NAS6204-12 Hex Bolt"),
        ("nas6204-16.glb", create_hex_bolt, "NAS6204-16 Hex Bolt (same design)"),
        ("ms21042-4.glb", create_self_locking_nut, "MS21042-4 Self-Locking Nut"),
        ("ms21042-6.glb", create_self_locking_nut, "MS21042-6 Self-Locking Nut (same design)"),
        ("an818-4.glb", create_hydraulic_fitting, "AN818-4 Hydraulic Fitting"),
        ("an819-4.glb", create_tube_coupling, "AN819-4 Tube Coupling (unique)"),
        ("ms16555-2.glb", create_precision_pin, "MS16555-2 Precision Pin"),
        ("ms16555-4.glb", create_dowel_pin, "MS16555-4 Dowel Pin (larger)"),
        ("nas1351-4.glb", create_socket_head_screw, "NAS1351-4 Socket Head Screw"),
        ("nas1352-5.glb", create_socket_head_screw, "NAS1352-5 Socket Head Screw (same design)"),
        ("ms21044-4.glb", create_self_locking_nut, "MS21044-4 Nylon Insert Lock Nut"),
        ("an392-12.glb", create_clevis_pin, "AN392-12 Clevis Pin"),
        ("an310-4.glb", create_castle_nut, "AN310-4 Castle Nut"),
        ("ms21904-4.glb", create_elbow_fitting, "MS21904-4 Elbow Fitting 90°"),
        ("an815-6.glb", create_straight_union, "AN815-6 Straight Union"),
        ("an385-3.glb", create_taper_pin, "AN385-3 Taper Pin"),
    ]
    
    for filename, create_func, description in models:
        print(f"  Creating {description}...")
        try:
            model = create_func()
            model.export(output_dir / filename)
            print(f"    ✓ Saved: {filename} ({model.vertices.shape[0]} vertices)")
        except Exception as e:
            print(f"    ✗ Error: {e}")
    
    print("\n✅ All models generated successfully!")
    print(f"📁 Location: {output_dir}")
    print("\n🚀 Next steps:")
    print("  1. Refresh your browser")
    print("  2. Models will load automatically!")

if __name__ == "__main__":
    main()
