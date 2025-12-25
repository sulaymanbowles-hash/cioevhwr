#!/usr/bin/env python3
"""
Generate parametric 3D models for various aerospace pin types.
Supports Cotter Pins, Dowel Pins, Hitch Pins, and Spring Pins.
"""

import trimesh
import numpy as np
from pathlib import Path
from typing import Tuple, Optional

def get_pin_type(part_number: str) -> str:
    """Determine pin type from part number."""
    pn_upper = part_number.upper()
    
    # Cotter Pins
    if any(x in pn_upper for x in ['MS24665', 'NASM24665', 'MS9245', 'AS9245', 'NASMS9245']):
        return 'cotter'
    
    # Dowel Pins
    if any(x in pn_upper for x in ['MS16555', 'MS16556', 'MS16562', 'NASM16562', 'AA554881', 'AA554882']):
        return 'dowel'
    
    # Spring Pins
    if any(x in pn_upper for x in ['MS17430', 'MS9047', 'MS9048', 'MS51923', 'MS51987', 'NAS561']):
        return 'spring'
    
    # Hitch/Clevis Pins
    if any(x in pn_upper for x in ['MS20253', 'MS24692', 'MS27074', 'MS51400', 'MS51838', 'MS51932',
                                     'MS9105', 'MS9164', 'MS9389', 'MS9390', 'MS9486', 'MS19065',
                                     'M21143', 'NAS607', 'NAS427', 'AN122', 'AN150', 'MA4018', 'MA4019', 'MDP']):
        return 'clevis'
    
    # Precision Dowel/Shaft
    if pn_upper.startswith('D') and len(pn_upper) <= 4:
        return 'dowel'
    
    if 'D63478' in pn_upper:
        return 'dowel'
    
    return 'dowel'  # Default

def parse_pin_size(part_number: str) -> Tuple[float, float]:
    """
    Extract diameter and length from part number.
    Returns (diameter in inches, length in inches)
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
    
    # Map size codes to dimensions (simplified mapping)
    # Size code typically maps to 1/16" increments for diameter
    diameter = (size_code + 2) / 16.0  # inches
    
    # Length varies by type and size
    if 'MS16555' in pn_upper or 'MS16556' in pn_upper:
        # Dowel pins - length based on size code
        length = diameter * 2.5
    elif 'AN122' in pn_upper or 'AN150' in pn_upper:
        # Clevis pins - extract both diameter and length from number
        if 'AN122' in pn_upper:
            # Format: AN122XXX where XXX encodes size
            length = diameter * 3.0
        else:
            length = diameter * 2.5
    else:
        length = diameter * 3.0
    
    # Clamp to reasonable ranges
    diameter = max(0.0625, min(diameter, 1.0))  # 1/16" to 1"
    length = max(0.25, min(length, 4.0))  # 1/4" to 4"
    
    return diameter, length

def get_pin_material_color(part_number: str) -> list:
    """Get material color based on part number."""
    pn_upper = part_number.upper()
    
    # Stainless/CRES (lighter gray)
    if any(x in pn_upper for x in ['CRES', 'STAINLESS', 'MS9245', 'AS9245']):
        return [0.60, 0.60, 0.65, 1.0]
    
    # Cadmium plated (yellow tint)
    if any(x in pn_upper for x in ['MS24665', 'MS20253']):
        return [0.70, 0.70, 0.55, 1.0]
    
    # Steel (dark gray)
    if any(x in pn_upper for x in ['STEEL', 'MS16555', 'MS16562']):
        return [0.35, 0.35, 0.40, 1.0]
    
    # Default steel color
    return [0.40, 0.40, 0.45, 1.0]

def create_cotter_pin(diameter: float, length: float) -> trimesh.Trimesh:
    """Create a cotter pin model."""
    # Main shaft (cylindrical)
    shaft_radius = diameter / 2
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=length * 0.7,
        sections=16
    )
    shaft.apply_translation([0, 0, length * 0.35])
    
    # Split legs
    leg_length = length * 0.3
    leg_offset = shaft_radius * 1.2
    
    # Left leg
    left_leg = trimesh.creation.cylinder(
        radius=shaft_radius * 0.7,
        height=leg_length,
        sections=12
    )
    left_leg.apply_translation([-leg_offset, 0, -leg_length / 2])
    
    # Right leg
    right_leg = trimesh.creation.cylinder(
        radius=shaft_radius * 0.7,
        height=leg_length,
        sections=12
    )
    right_leg.apply_translation([leg_offset, 0, -leg_length / 2])
    
    # Eye/loop at top
    eye = trimesh.creation.cylinder(
        radius=shaft_radius * 1.5,
        height=shaft_radius * 0.5,
        sections=16
    )
    eye.apply_translation([0, 0, length * 0.7 + shaft_radius * 0.25])
    
    return trimesh.util.concatenate([shaft, left_leg, right_leg, eye])

def create_dowel_pin(diameter: float, length: float) -> trimesh.Trimesh:
    """Create a dowel pin model (simple cylinder)."""
    pin = trimesh.creation.cylinder(
        radius=diameter / 2,
        height=length,
        sections=24
    )
    # Center at origin
    pin.apply_translation([0, 0, 0])
    
    return pin

def create_spring_pin(diameter: float, length: float) -> trimesh.Trimesh:
    """Create a spring pin model with chamfered ends."""
    main_radius = diameter / 2
    
    # Main cylindrical body
    body = trimesh.creation.cylinder(
        radius=main_radius,
        height=length * 0.9,
        sections=24
    )
    body.apply_translation([0, 0, 0])
    
    # Chamfered top
    chamfer_top = trimesh.creation.cone(
        radius=main_radius,
        height=length * 0.05,
        sections=24
    )
    chamfer_top.apply_translation([0, 0, length * 0.475])
    
    # Chamfered bottom
    chamfer_bottom = trimesh.creation.cone(
        radius=main_radius,
        height=length * 0.05,
        sections=24
    )
    chamfer_bottom.apply_transform(trimesh.transformations.rotation_matrix(
        np.pi, [1, 0, 0]
    ))
    chamfer_bottom.apply_translation([0, 0, -length * 0.475])
    
    # Add slot texture (visual indication it's a spring pin)
    slot_width = main_radius * 0.1
    slot = trimesh.creation.box([slot_width, main_radius * 2.1, length * 0.9])
    slot.apply_translation([main_radius * 0.95, 0, 0])
    
    pin = trimesh.util.concatenate([body, chamfer_top, chamfer_bottom])
    
    # Subtract slot (boolean operation)
    try:
        pin = pin.difference(slot)
    except:
        pass  # If boolean fails, just use pin without slot
    
    return pin

def create_clevis_pin(diameter: float, length: float) -> trimesh.Trimesh:
    """Create a clevis/hitch pin model."""
    shaft_radius = diameter / 2
    
    # Main shaft
    shaft = trimesh.creation.cylinder(
        radius=shaft_radius,
        height=length,
        sections=24
    )
    shaft.apply_translation([0, 0, 0])
    
    # Head (enlarged end)
    head_radius = shaft_radius * 1.5
    head_height = shaft_radius * 1.2
    head = trimesh.creation.cylinder(
        radius=head_radius,
        height=head_height,
        sections=24
    )
    head.apply_translation([0, 0, length / 2 + head_height / 2])
    
    # Hole for cotter pin at bottom
    hole_radius = shaft_radius * 0.3
    hole_offset = length / 2 - shaft_radius
    
    hole = trimesh.creation.cylinder(
        radius=hole_radius,
        height=shaft_radius * 2.5,
        sections=12
    )
    hole.apply_transform(trimesh.transformations.rotation_matrix(
        np.pi / 2, [0, 1, 0]
    ))
    hole.apply_translation([0, 0, -hole_offset])
    
    pin = trimesh.util.concatenate([shaft, head])
    
    # Try to subtract hole
    try:
        pin = pin.difference(hole)
    except:
        pass
    
    return pin

def generate_pin_model(part_number: str, output_path: str) -> Tuple[Optional[trimesh.Trimesh], Optional[str]]:
    """Generate a 3D model for a pin part number."""
    try:
        # Determine pin type and size
        pin_type = get_pin_type(part_number)
        diameter, length = parse_pin_size(part_number)
        
        # Create appropriate pin model
        if pin_type == 'cotter':
            mesh = create_cotter_pin(diameter, length)
        elif pin_type == 'spring':
            mesh = create_spring_pin(diameter, length)
        elif pin_type == 'clevis':
            mesh = create_clevis_pin(diameter, length)
        else:  # dowel
            mesh = create_dowel_pin(diameter, length)
        
        # Apply material color
        color = get_pin_material_color(part_number)
        mesh.visual.vertex_colors = color
        
        # Export to GLB
        mesh.export(output_path)
        
        return mesh, None
    
    except Exception as e:
        # Create simple fallback model
        fallback = trimesh.creation.cylinder(radius=0.125, height=1.0, sections=16)
        fallback.visual.vertex_colors = [0.40, 0.40, 0.45, 1.0]
        fallback.export(output_path)
        return fallback, str(e)

# Generate all pin part numbers
pin_part_numbers = []

# Cotter Pins
pin_part_numbers.extend([f'MS24665-{i}' for i in [1, 2, 3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS9245-{i}' for i in [1, 2, 3, 4, 5, 6]])
pin_part_numbers.extend([f'AS9245-{i}' for i in [1, 2, 3, 4, 5, 6]])

# Dowel Pins - MS16555 series (representative samples)
pin_part_numbers.extend([f'MS16555-{i}' for i in [10, 20, 50, 100, 200, 300, 400, 500, 600, 700]])
pin_part_numbers.extend([f'MS16556-{i}' for i in [10, 20, 50, 100, 200, 400, 600, 800]])
pin_part_numbers.extend([f'MS16562-{i}' for i in [1, 2, 3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'AA554881-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'AA554882-{i}' for i in [1, 2, 3, 4, 5]])

# Precision dowels
pin_part_numbers.extend([f'D{i}' for i in [2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90]])
pin_part_numbers.extend([f'D63478-{i}' for i in [1, 2]])

# Spring Pins
pin_part_numbers.extend([f'MS17430-{i}' for i in [10, 20, 30, 40, 50, 100, 200]])
pin_part_numbers.extend([f'MS9047-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS9048-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS39086-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS51923-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS51987-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'NAS561-{i}' for i in [3, 4, 5, 6, 7, 8]])

# Clevis/Hitch Pins
pin_part_numbers.extend(['MS20253-1', 'MS20253-2', 'MS20253-3', 'MS20253-4'])
pin_part_numbers.extend([f'MS24692-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS27074-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS51400-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS51838-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS51932-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MS9105-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS9164-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS9389-{i}' for i in [3, 4, 5, 6]])
pin_part_numbers.extend([f'MS9390-{i}' for i in [3, 4, 5, 6]])
pin_part_numbers.extend([f'MS9486-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'MS19065-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend(['M21143-1', 'M21143-2'])
pin_part_numbers.extend([f'NAS607-{i}' for i in [3, 4, 5, 6, 7, 8]])
pin_part_numbers.extend([f'NAS427W-{i}' for i in [3, 4, 5, 6, 7, 8]])

# AN Series clevis pins (representative samples from ranges)
pin_part_numbers.extend([f'AN122{i}' for i in [676, 680, 690, 700, 720, 740, 760]])
pin_part_numbers.extend([f'AN150{i}' for i in [201, 210, 220, 240, 260, 280, 295]])
pin_part_numbers.extend([f'AN150{i}' for i in [301, 310, 320, 340, 360, 380, 395]])

# MDP Series
pin_part_numbers.extend(['MDP1-1', 'MDP2-2', 'MDP3-3', 'MDP5-5', 'MDP7-7', 'MDP11-12'])

# MA Series
pin_part_numbers.extend([f'MA4018-{i}' for i in [1, 2, 3, 4, 5]])
pin_part_numbers.extend([f'MA4019-{i}' for i in [1, 2, 3, 4, 5]])

# Generate all models
if __name__ == '__main__':
    output_dir = Path(__file__).parent.parent / 'public' / 'models'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Generating {len(pin_part_numbers)} pin models...")
    print()
    
    success_count = 0
    error_count = 0
    
    for i, part_num in enumerate(pin_part_numbers, 1):
        slug = part_num.lower().replace('/', '-')
        output_file = output_dir / f'{slug}.glb'
        
        mesh, error = generate_pin_model(part_num, str(output_file))
        
        if error:
            print(f"[{i}/{len(pin_part_numbers)}] {part_num} -> {slug}.glb (FALLBACK: {error})")
            error_count += 1
        else:
            vert_count = len(mesh.vertices) if mesh else 0
            print(f"[{i}/{len(pin_part_numbers)}] {part_num} -> {slug}.glb ({vert_count} verts)")
            success_count += 1
    
    print()
    print(f"Complete! Successfully generated {success_count} models ({error_count} with fallbacks)")
    print()
    print("All pin models are ready to use!")
