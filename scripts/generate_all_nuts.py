#!/usr/bin/env python3
"""
Generate parametric 3D models for various aerospace nut types.
Supports Castle, Lock, Hex, Wing, Flange, and other specialty nuts.
"""

import trimesh
import numpy as np
from pathlib import Path
from typing import Tuple, Optional

def get_nut_type(part_number: str) -> str:
    """Determine nut type from part number."""
    pn_upper = part_number.upper()
    
    # Castle Nuts
    if any(x in pn_upper for x in ['AN310', 'MS20365', 'NAS1291']):
        return 'castle'
    
    # Self-Locking Nuts (Nylon Insert)
    if any(x in pn_upper for x in ['MS21042', 'MS21043', 'MS21044', 'MS21045', 'NAS1021',
                                     'BACN10', 'AN365']):
        return 'locknut'
    
    # Wing Nuts
    if 'AN315' in pn_upper or 'AN316' in pn_upper:
        return 'wing'
    
    # Slotted Nuts
    if any(x in pn_upper for x in ['AN320', 'MS20364']):
        return 'slotted'
    
    # Flange Nuts
    if any(x in pn_upper for x in ['MS21047', 'MS21048', 'MS21049', 'NAS1473']):
        return 'flange'
    
    # Square Nuts
    if 'AN361' in pn_upper or 'MS51952' in pn_upper:
        return 'square'
    
    # Bearing/Jam Nuts
    if any(x in pn_upper for x in ['AN316', 'MS21050', 'NAS1778']):
        return 'jam'
    
    # Coupling Nuts
    if 'MS51866' in pn_upper:
        return 'coupling'
    
    # Acorn/Cap Nuts
    if 'AN460' in pn_upper or 'MS51972' in pn_upper:
        return 'acorn'
    
    # Default to hex nut
    return 'hex'

def parse_nut_size(part_number: str) -> Tuple[float, float]:
    """
    Extract thread size from part number.
    Returns (thread diameter in inches, nut height in inches)
    """
    pn_upper = part_number.upper()
    
    # Extract numeric suffix
    parts = pn_upper.replace('-', ' ').replace('/', ' ').split()
    size_code = None
    
    for part in reversed(parts):
        if part.isdigit():
            size_code = int(part)
            break
    
    if size_code is None:
        size_code = 4
    
    # Map size codes to thread sizes (common aerospace sizes)
    size_map = {
        3: (0.125, 0.125),   # #10-32
        4: (0.1562, 0.156),  # 1/4-28
        5: (0.1875, 0.187),  # 5/16-24
        6: (0.2187, 0.218),  # 3/8-24
        7: (0.2500, 0.250),  # 7/16-20
        8: (0.2812, 0.281),  # 1/2-20
        10: (0.3750, 0.375), # 5/8-18
        12: (0.5000, 0.500), # 3/4-16
    }
    
    if size_code in size_map:
        diameter, height = size_map[size_code]
    else:
        # Estimate based on size code
        diameter = (size_code + 2) / 16.0
        height = diameter * 1.0
    
    # Clamp to reasonable ranges
    diameter = max(0.125, min(diameter, 1.5))
    height = max(0.125, min(height, 1.0))
    
    return diameter, height

def get_nut_material_color(part_number: str) -> list:
    """Get material color based on part number."""
    pn_upper = part_number.upper()
    
    # Stainless/CRES (lighter gray)
    if any(x in pn_upper for x in ['CRES', 'STAINLESS', 'NAS1', 'MS21043']):
        return [0.60, 0.60, 0.65, 1.0]
    
    # Aluminum (lighter)
    if any(x in pn_upper for x in ['MS21042', 'AN310', 'ALUMINUM']):
        return [0.70, 0.72, 0.75, 1.0]
    
    # Cadmium plated (yellow tint)
    if any(x in pn_upper for x in ['AN315', 'AN320', 'MS20364', 'MS20365']):
        return [0.70, 0.70, 0.55, 1.0]
    
    # Steel (dark gray)
    return [0.40, 0.40, 0.45, 1.0]

def create_hex_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a standard hex nut."""
    # Outer hex dimensions
    across_flats = diameter * 1.5
    across_corners = across_flats * 1.1547
    
    # Create hexagonal prism
    vertices = []
    faces = []
    
    # Generate hex vertices
    for i in range(6):
        angle = i * np.pi / 3
        x = across_corners / 2 * np.cos(angle)
        y = across_corners / 2 * np.sin(angle)
        vertices.append([x, y, -height/2])
        vertices.append([x, y, height/2])
    
    vertices = np.array(vertices)
    
    # Create side faces
    for i in range(6):
        i1 = i * 2
        i2 = i * 2 + 1
        i3 = ((i + 1) % 6) * 2 + 1
        i4 = ((i + 1) % 6) * 2
        faces.append([i1, i2, i3])
        faces.append([i1, i3, i4])
    
    # Create top and bottom faces
    top_face = [i * 2 + 1 for i in range(6)]
    bottom_face = [i * 2 for i in range(5, -1, -1)]
    
    # Triangulate hex faces
    for i in range(1, 5):
        faces.append([top_face[0], top_face[i], top_face[i+1]])
        faces.append([bottom_face[0], bottom_face[i+1], bottom_face[i]])
    
    faces = np.array(faces)
    
    nut = trimesh.Trimesh(vertices=vertices, faces=faces)
    
    # Create threaded hole
    hole = trimesh.creation.cylinder(radius=diameter/2, height=height*1.1, sections=16)
    hole.apply_translation([0, 0, 0])
    
    # Subtract hole
    try:
        nut = nut.difference(hole)
    except:
        pass
    
    return nut

def create_castle_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a castle nut with slots on top."""
    # Start with hex base
    nut = create_hex_nut(diameter, height * 0.7)
    
    # Add castle top
    castle_height = height * 0.3
    castle = trimesh.creation.cylinder(
        radius=diameter * 0.85,
        height=castle_height,
        sections=24
    )
    castle.apply_translation([0, 0, height * 0.35 + castle_height/2])
    
    # Create slots
    slot_count = 6
    slot_width = np.pi * diameter / 12
    
    for i in range(slot_count):
        angle = i * 2 * np.pi / slot_count
        slot = trimesh.creation.box([slot_width, diameter * 0.5, castle_height * 1.1])
        slot.apply_transform(trimesh.transformations.rotation_matrix(angle, [0, 0, 1]))
        slot.apply_translation([diameter * 0.6 * np.cos(angle), diameter * 0.6 * np.sin(angle), height * 0.35 + castle_height/2])
        
        try:
            castle = castle.difference(slot)
        except:
            pass
    
    return trimesh.util.concatenate([nut, castle])

def create_locknut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a self-locking nut with nylon insert."""
    # Standard hex nut base
    nut = create_hex_nut(diameter, height)
    
    # Add nylon insert ring (visual indicator)
    insert = trimesh.creation.cylinder(
        radius=diameter * 0.55,
        height=height * 0.3,
        sections=16
    )
    insert.apply_translation([0, 0, -height * 0.15])
    
    # Different color for insert (blue tint)
    insert.visual.vertex_colors = [0.3, 0.4, 0.7, 1.0]
    
    return trimesh.util.concatenate([nut, insert])

def create_wing_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a wing nut."""
    # Central hex body
    body = create_hex_nut(diameter, height * 0.6)
    
    # Create wings
    wing_width = diameter * 1.5
    wing_height = height * 0.8
    wing_thickness = height * 0.3
    
    # Left wing
    left_wing = trimesh.creation.box([wing_thickness, wing_width, wing_height])
    left_wing.apply_translation([-diameter * 0.8, 0, 0])
    
    # Right wing
    right_wing = trimesh.creation.box([wing_thickness, wing_width, wing_height])
    right_wing.apply_translation([diameter * 0.8, 0, 0])
    
    return trimesh.util.concatenate([body, left_wing, right_wing])

def create_flange_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a flange nut with integrated washer."""
    # Hex nut top
    nut = create_hex_nut(diameter, height * 0.8)
    nut.apply_translation([0, 0, height * 0.1])
    
    # Flange base
    flange = trimesh.creation.cylinder(
        radius=diameter * 1.5,
        height=height * 0.2,
        sections=24
    )
    flange.apply_translation([0, 0, -height * 0.4])
    
    # Create center hole in flange
    hole = trimesh.creation.cylinder(radius=diameter/2, height=height*1.2, sections=16)
    
    flange_nut = trimesh.util.concatenate([nut, flange])
    
    try:
        flange_nut = flange_nut.difference(hole)
    except:
        pass
    
    return flange_nut

def create_square_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a square nut."""
    side_length = diameter * 1.5
    
    # Square prism
    nut = trimesh.creation.box([side_length, side_length, height])
    
    # Create threaded hole
    hole = trimesh.creation.cylinder(radius=diameter/2, height=height*1.1, sections=16)
    
    try:
        nut = nut.difference(hole)
    except:
        pass
    
    return nut

def create_jam_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a thin jam nut."""
    return create_hex_nut(diameter, height * 0.5)

def create_slotted_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a slotted nut."""
    nut = create_hex_nut(diameter, height)
    
    # Add slots on sides
    for i in range(6):
        angle = i * np.pi / 3
        slot = trimesh.creation.box([diameter * 0.3, diameter * 0.15, height * 0.4])
        slot.apply_transform(trimesh.transformations.rotation_matrix(angle, [0, 0, 1]))
        
        x = diameter * 0.85 * np.cos(angle)
        y = diameter * 0.85 * np.sin(angle)
        slot.apply_translation([x, y, 0])
        
        try:
            nut = nut.difference(slot)
        except:
            pass
    
    return nut

def create_acorn_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create an acorn/cap nut."""
    # Hex base
    base_height = height * 0.6
    base = create_hex_nut(diameter, base_height)
    base.apply_translation([0, 0, -height * 0.2])
    
    # Domed cap
    cap = trimesh.creation.cylinder(
        radius=diameter * 0.75,
        height=height * 0.4,
        sections=16
    )
    
    # Create dome using sphere intersection
    dome = trimesh.creation.icosphere(radius=diameter * 0.6)
    dome.apply_translation([0, 0, height * 0.2])
    
    # Trim dome
    cutter = trimesh.creation.box([diameter * 3, diameter * 3, height])
    cutter.apply_translation([0, 0, height * 0.7])
    
    try:
        dome = dome.difference(cutter)
        cap = trimesh.util.concatenate([cap, dome])
    except:
        pass
    
    cap.apply_translation([0, 0, height * 0.1])
    
    return trimesh.util.concatenate([base, cap])

def create_coupling_nut(diameter: float, height: float) -> trimesh.Trimesh:
    """Create a coupling nut (long hex nut)."""
    return create_hex_nut(diameter, height * 2.0)

def generate_nut_model(part_number: str, output_path: str) -> Tuple[Optional[trimesh.Trimesh], Optional[str]]:
    """Generate a 3D model for a nut part number."""
    try:
        # Determine nut type and size
        nut_type = get_nut_type(part_number)
        diameter, height = parse_nut_size(part_number)
        
        # Create appropriate nut model
        if nut_type == 'castle':
            mesh = create_castle_nut(diameter, height)
        elif nut_type == 'locknut':
            mesh = create_locknut(diameter, height)
        elif nut_type == 'wing':
            mesh = create_wing_nut(diameter, height)
        elif nut_type == 'flange':
            mesh = create_flange_nut(diameter, height)
        elif nut_type == 'square':
            mesh = create_square_nut(diameter, height)
        elif nut_type == 'jam':
            mesh = create_jam_nut(diameter, height)
        elif nut_type == 'slotted':
            mesh = create_slotted_nut(diameter, height)
        elif nut_type == 'acorn':
            mesh = create_acorn_nut(diameter, height)
        elif nut_type == 'coupling':
            mesh = create_coupling_nut(diameter, height)
        else:  # hex
            mesh = create_hex_nut(diameter, height)
        
        # Apply material color
        color = get_nut_material_color(part_number)
        mesh.visual.vertex_colors = color
        
        # Export to GLB
        mesh.export(output_path)
        
        return mesh, None
    
    except Exception as e:
        # Create simple fallback model
        fallback = trimesh.creation.cylinder(radius=0.2, height=0.15, sections=6)
        hole = trimesh.creation.cylinder(radius=0.125, height=0.2, sections=12)
        try:
            fallback = fallback.difference(hole)
        except:
            pass
        fallback.visual.vertex_colors = [0.40, 0.40, 0.45, 1.0]
        fallback.export(output_path)
        return fallback, str(e)

# Generate all nut part numbers
nut_part_numbers = []

# AN Series Nuts
nut_part_numbers.extend([f'AN310-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Castle nuts
nut_part_numbers.extend([f'AN315-{i}' for i in [3, 4, 5, 6, 7, 8]])      # Wing nuts
nut_part_numbers.extend([f'AN316-{i}' for i in [3, 4, 5, 6, 7, 8]])      # Check nuts
nut_part_numbers.extend([f'AN320-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Shear nuts
nut_part_numbers.extend([f'AN365-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Self-locking
nut_part_numbers.extend([f'AN361-{i}' for i in [3, 4, 5, 6]])            # Square nuts
nut_part_numbers.extend(['AN363-428', 'AN363-624', 'AN363-832'])         # Hex nuts

# MS Series Nuts
nut_part_numbers.extend([f'MS14144-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS14145-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS14146-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS14156-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS14164-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS20364-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'MS20365-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'MS20500-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS20501-{i}' for i in [3, 4, 5, 6]])

# MS21040 Series (Self-Locking)
nut_part_numbers.extend([f'MS21042-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Aluminum
nut_part_numbers.extend([f'MS21043-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # CRES
nut_part_numbers.extend([f'MS21044-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Steel
nut_part_numbers.extend([f'MS21045-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'MS21046-{i}' for i in [3, 4, 5, 6, 7, 8]])

# MS21047 Series (Flange)
nut_part_numbers.extend([f'MS21047-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'MS21048-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'MS21049-{i}' for i in [3, 4, 5, 6, 7, 8]])

# Additional MS Series
nut_part_numbers.extend([f'MS21224-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS21225-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS35649-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS51865-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS51866-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS51922-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'MS51972-{i}' for i in [3, 4, 5, 6]])

# NAS Series
nut_part_numbers.extend([f'NAS1021-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])  # Self-locking
nut_part_numbers.extend([f'NAS679-{i}' for i in [3, 4, 5, 6, 7, 8]])
nut_part_numbers.extend([f'NAS1291-{i}' for i in [3, 4, 5, 6, 7, 8]])      # Castle
nut_part_numbers.extend([f'NAS1473-{i}' for i in [3, 4, 5, 6, 7, 8]])      # Flange
nut_part_numbers.extend([f'NAS1757-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'NAS1778-{i}' for i in [3, 4, 5, 6]])
nut_part_numbers.extend([f'NAS1805-{i}' for i in [3, 4, 5, 6]])

# Boeing/Commercial
nut_part_numbers.extend(['BACN10-3', 'BACN10-4', 'BACN10-5', 'BACN10-6'])

# Generate all models
if __name__ == '__main__':
    output_dir = Path(__file__).parent.parent / 'public' / 'models'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Generating {len(nut_part_numbers)} nut models...")
    print()
    
    success_count = 0
    error_count = 0
    
    for i, part_num in enumerate(nut_part_numbers, 1):
        slug = part_num.lower().replace('/', '-')
        output_file = output_dir / f'{slug}.glb'
        
        mesh, error = generate_nut_model(part_num, str(output_file))
        
        if error:
            print(f"[{i}/{len(nut_part_numbers)}] {part_num} -> {slug}.glb (FALLBACK: {error})")
            error_count += 1
        else:
            vert_count = len(mesh.vertices) if mesh else 0
            print(f"[{i}/{len(nut_part_numbers)}] {part_num} -> {slug}.glb ({vert_count} verts)")
            success_count += 1
    
    print()
    print(f"Complete! Successfully generated {success_count} models ({error_count} with fallbacks)")
    print()
    print("All nut models are ready to use!")
