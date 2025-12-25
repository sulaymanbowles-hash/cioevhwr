#!/usr/bin/env python3
"""
Generate 3D GLB models for all bolt part numbers.
Creates unique parametric models for different bolt types.
"""

import trimesh
import numpy as np
from pathlib import Path

def create_hex_head_bolt(diameter, length, head_height):
    """Standard hexagon head bolt"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=6
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Hexagon head
    head = trimesh.creation.cylinder(
        radius=diameter * 0.9,
        height=head_height,
        sections=6
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head])
    return bolt

def create_twelve_point_bolt(diameter, length, head_height):
    """12-point head bolt for high torque applications"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # 12-point head
    head = trimesh.creation.cylinder(
        radius=diameter * 0.9,
        height=head_height,
        sections=12
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head])
    return bolt

def create_flush_head_bolt(diameter, length, head_height):
    """100° flush/countersunk head bolt"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Countersunk head (cone)
    head = trimesh.creation.cone(
        radius=diameter * 1.2,
        height=head_height,
        sections=16
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head])
    return bolt

def create_pan_head_bolt(diameter, length, head_height):
    """Pan head bolt with rounded top"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Pan head (cylinder for simplicity)
    head = trimesh.creation.cylinder(
        radius=diameter * 1.0,
        height=head_height,
        sections=16
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head])
    return bolt

def create_carriage_bolt(diameter, length, head_height):
    """Carriage bolt with round head and square neck"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Round head (hemisphere approximation)
    head = trimesh.creation.cylinder(
        radius=diameter * 1.1,
        height=head_height,
        sections=16
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Square neck (small cube)
    neck = trimesh.creation.box(extents=[diameter * 0.8, diameter * 0.8, diameter * 0.3])
    neck.apply_translation([0, 0, -diameter * 0.15])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head, neck])
    return bolt

def create_flange_bolt(diameter, length, head_height):
    """Flange bolt with integrated washer"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Hex head
    head = trimesh.creation.cylinder(
        radius=diameter * 0.9,
        height=head_height,
        sections=6
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Flange (integrated washer)
    flange = trimesh.creation.cylinder(
        radius=diameter * 1.3,
        height=head_height * 0.3,
        sections=16
    )
    flange.apply_translation([0, 0, -head_height * 0.15])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head, flange])
    return bolt

def create_eye_bolt(diameter, length, head_height):
    """Eye bolt with loop head"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Eye loop (torus)
    eye = trimesh.creation.torus(
        major_radius=diameter * 1.2,
        minor_radius=diameter * 0.4,
        sections=16,
        minor_sections=12
    )
    eye.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))
    eye.apply_translation([0, diameter * 1.2, head_height])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, eye])
    return bolt

def create_clevis_bolt(diameter, length, head_height):
    """Clevis bolt with head and hole for cotter pin"""
    # Threaded shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Cylindrical head
    head = trimesh.creation.cylinder(
        radius=diameter * 1.0,
        height=head_height,
        sections=16
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head])
    return bolt

def create_anchor_bolt(diameter, length, head_height):
    """Anchor bolt with hooked or bent end"""
    # Main shaft
    shaft = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length,
        sections=12
    )
    shaft.apply_translation([0, 0, -length/2])
    
    # Hex head
    head = trimesh.creation.cylinder(
        radius=diameter * 0.9,
        height=head_height,
        sections=6
    )
    head.apply_translation([0, 0, head_height/2])
    
    # Anchor hook (simplified as bent cylinder)
    hook = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length * 0.3,
        sections=12
    )
    hook.apply_translation([diameter * 0.5, 0, -length * 0.85])
    
    # Combine
    bolt = trimesh.util.concatenate([shaft, head, hook])
    return bolt

def create_hanger_bolt(diameter, length, head_height):
    """Hanger bolt with wood screw thread on one end"""
    # Machine thread section
    machine_thread = trimesh.creation.cylinder(
        radius=diameter/2,
        height=length * 0.5,
        sections=12
    )
    machine_thread.apply_translation([0, 0, -length * 0.25])
    
    # Wood screw section (slightly tapered)
    wood_thread = trimesh.creation.cone(
        radius=diameter * 0.45,
        height=length * 0.5,
        sections=12
    )
    wood_thread.apply_translation([0, 0, -length * 0.75])
    
    # Combine
    bolt = trimesh.util.concatenate([machine_thread, wood_thread])
    return bolt

def get_bolt_material_color(part_number):
    """Assign material color based on part number patterns"""
    pn_upper = part_number.upper()
    
    # Stainless/CRES (silver-white)
    if 'CRES' in pn_upper or 'A286' in pn_upper or 'NAS6' in pn_upper or 'NAS8' in pn_upper:
        return [0.65, 0.65, 0.70, 1.0]
    
    # Titanium (gray-blue)
    if 'TITANIUM' in pn_upper or 'NAS64' in pn_upper or 'NAS68' in pn_upper:
        return [0.55, 0.60, 0.65, 1.0]
    
    # Black oxide finish
    if 'MS9281' in pn_upper or 'MS9169' in pn_upper or 'BLACK' in pn_upper:
        return [0.20, 0.20, 0.25, 1.0]
    
    # Cadmium plated (light gray-yellow)
    if 'MS9440' in pn_upper or 'CAD' in pn_upper:
        return [0.75, 0.75, 0.78, 1.0]
    
    # Default steel (medium gray)
    return [0.35, 0.35, 0.40, 1.0]

def classify_bolt_type(part_number):
    """Classify bolt type based on part number and description"""
    pn_upper = part_number.upper()
    
    # Eye bolts
    if 'AN42' in pn_upper or 'AN43' in pn_upper or 'AN44' in pn_upper or 'AN45' in pn_upper or \
       'AN46' in pn_upper or 'AN47' in pn_upper or 'AN48' in pn_upper or 'AN49' in pn_upper:
        return 'eye'
    
    # Clevis bolts
    if 'AN21' in pn_upper or 'AN22' in pn_upper or 'AN23' in pn_upper or 'AN24' in pn_upper or \
       'AN25' in pn_upper or 'AN26' in pn_upper or 'AN27' in pn_upper or 'CLEVIS' in pn_upper:
        return 'clevis'
    
    # 12-point bolts
    if '12' in pn_upper and 'POINT' in pn_upper or 'MS14181' in pn_upper or 'MS21098' in pn_upper or \
       'MS21099' in pn_upper or 'MS21250' in pn_upper or 'MS21277' in pn_upper or 'MS9033' in pn_upper or \
       'MS9060' in pn_upper or 'MS9088' in pn_upper or 'MS9110' in pn_upper or 'MS9146' in pn_upper or \
       'MS9169' in pn_upper or 'MS9224' in pn_upper or 'MS9694' in pn_upper or 'MS9722' in pn_upper or \
       'MS9730' in pn_upper or 'MS9739' in pn_upper or 'MS9748' in pn_upper or 'MS9883' in pn_upper or \
       'MS9892' in pn_upper or 'MS9921' in pn_upper or 'MS9930' in pn_upper or 'MS9939' in pn_upper or \
       'NAS624' in pn_upper or 'NAS1271' in pn_upper:
        return 'twelve_point'
    
    # Flush head bolts (100° countersunk)
    if 'FLUSH' in pn_upper or '100' in pn_upper or 'NAS1083' in pn_upper or 'NAS1220' in pn_upper or \
       'NAS1503' in pn_upper or 'NAS1580' in pn_upper or 'NAS1581' in pn_upper or 'NAS1582' in pn_upper or \
       'NAS1603' in pn_upper or 'NAS1703' in pn_upper or 'NAS1724' in pn_upper or 'NAS1725' in pn_upper or \
       'NAS2803' in pn_upper or 'NAS333' in pn_upper or 'NAS583' in pn_upper or 'NAS663' in pn_upper or \
       'NAS7203' in pn_upper or 'NAS7303' in pn_upper or 'NAS7400' in pn_upper or 'NAS7500' in pn_upper or \
       'NAS7600' in pn_upper or 'NAS8602' in pn_upper or 'NAS8702' in pn_upper or 'NAS8802' in pn_upper:
        return 'flush_head'
    
    # Pan head bolts
    if 'PAN' in pn_upper or 'NAS1728' in pn_upper or 'NAS1729' in pn_upper or \
       'NAS7700' in pn_upper or 'NAS7800' in pn_upper or 'NAS7900' in pn_upper:
        return 'pan_head'
    
    # Flange bolts
    if 'FLANGE' in pn_upper:
        return 'flange'
    
    # Carriage bolts
    if 'CARRIAGE' in pn_upper:
        return 'carriage'
    
    # Anchor bolts
    if 'ANCHOR' in pn_upper:
        return 'anchor'
    
    # Hanger bolts
    if 'HANGER' in pn_upper:
        return 'hanger'
    
    # Default: hex head bolt
    return 'hex_head'

def generate_bolt_model(part_number, output_path):
    """Generate a single bolt 3D model"""
    try:
        # Determine bolt type
        bolt_type = classify_bolt_type(part_number)
        
        # Extract size from part number (simplified)
        pn_upper = part_number.upper()
        
        # Default dimensions
        diameter = 0.25  # inches
        length = 1.0     # inches
        head_height = 0.2
        
        # Adjust size based on part number patterns
        if 'AN3' in pn_upper or 'AN21' in pn_upper or 'AN42' in pn_upper:
            diameter = 0.19
            length = 0.5 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 5) * 0.125
        elif 'AN173' in pn_upper or 'AN174' in pn_upper:
            diameter = 0.19 + (int(pn_upper.split('-')[-1]) % 20) * 0.03
            length = 0.5 + (int(pn_upper.split('-')[-1]) % 20) * 0.125
        elif 'MS' in pn_upper:
            # MS series sizing
            if 'MS14181' in pn_upper or 'MS21' in pn_upper:
                diameter = 0.25 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.05
                length = 0.75 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.125
            elif 'MS9' in pn_upper:
                diameter = 0.19 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.03
                length = 0.625 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.125
            elif 'MS20' in pn_upper:
                diameter = 0.25 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.05
                length = 0.75 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.125
        elif 'NAS' in pn_upper:
            # NAS series sizing
            if 'NAS1' in pn_upper or 'NAS2' in pn_upper or 'NAS3' in pn_upper:
                diameter = 0.19 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.03
                length = 0.5 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.125
            elif 'NAS6' in pn_upper or 'NAS7' in pn_upper or 'NAS8' in pn_upper:
                diameter = 0.19 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.03
                length = 0.5 + (int(pn_upper.split('-')[-1]) if '-' in pn_upper else 3) * 0.125
        
        head_height = diameter * 0.7
        
        # Create bolt based on type
        if bolt_type == 'hex_head':
            mesh = create_hex_head_bolt(diameter, length, head_height)
        elif bolt_type == 'twelve_point':
            mesh = create_twelve_point_bolt(diameter, length, head_height)
        elif bolt_type == 'flush_head':
            mesh = create_flush_head_bolt(diameter, length, head_height)
        elif bolt_type == 'pan_head':
            mesh = create_pan_head_bolt(diameter, length, head_height)
        elif bolt_type == 'carriage':
            mesh = create_carriage_bolt(diameter, length, head_height)
        elif bolt_type == 'flange':
            mesh = create_flange_bolt(diameter, length, head_height)
        elif bolt_type == 'eye':
            mesh = create_eye_bolt(diameter, length, head_height)
        elif bolt_type == 'clevis':
            mesh = create_clevis_bolt(diameter, length, head_height)
        elif bolt_type == 'anchor':
            mesh = create_anchor_bolt(diameter, length, head_height)
        elif bolt_type == 'hanger':
            mesh = create_hanger_bolt(diameter, length, head_height)
        else:
            mesh = create_hex_head_bolt(diameter, length, head_height)
        
        # Apply material color
        color = get_bolt_material_color(part_number)
        mesh.visual.vertex_colors = color
        
        # Export to GLB
        mesh.export(output_path)
        
        return mesh, None
    
    except Exception as e:
        # Create simple fallback model
        shaft = trimesh.creation.cylinder(radius=0.125, height=1.0, sections=12)
        shaft.apply_translation([0, 0, -0.5])
        head = trimesh.creation.cylinder(radius=0.2, height=0.15, sections=6)
        head.apply_translation([0, 0, 0.075])
        mesh = trimesh.util.concatenate([shaft, head])
        mesh.visual.vertex_colors = [0.35, 0.35, 0.40, 1.0]
        mesh.export(output_path)
        return mesh, str(e)

# Generate all bolt part numbers
bolt_part_numbers = []

# AN Series
bolt_part_numbers.extend([f'AN3-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20]])
bolt_part_numbers.extend([f'AN173-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20]])
bolt_part_numbers.extend([f'AN174-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'AN175-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'AN176-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'AN21-{i}' for i in [8, 10, 12, 14, 16, 18, 20, 22]])
bolt_part_numbers.extend([f'AN22-{i}' for i in [8, 10, 12, 14, 16, 18, 20]])
bolt_part_numbers.extend([f'AN23-{i}' for i in [8, 10, 12, 14, 16, 18, 20]])
bolt_part_numbers.extend([f'AN42-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'AN43-{i}' for i in [3, 4, 5, 6, 7, 8]])

# MS Series - Tension and 12-point
bolt_part_numbers.extend([f'MS14181-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'MS20004-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS20033-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'MS20074-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS21098-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'MS21099-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'MS21250-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'MS21277-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'MS24387-{i}' for i in [3, 4, 5, 6]])

# MS9000 series
bolt_part_numbers.extend([f'MS9033-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9060-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9088-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9110-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9146-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9169-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9224-{i}' for i in [3, 4, 5, 6]])
bolt_part_numbers.extend([f'MS9281-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9440-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9487-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9498-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9583-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9631-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9640-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9685-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9694-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9722-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9730-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9739-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9748-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9781-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9792-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9803-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9814-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9883-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9892-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9921-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9930-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9939-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'MS9957-{i}' for i in [3, 4, 5, 6, 7, 8]])

# NAS Series
bolt_part_numbers.extend([f'NAS1003-{i}' for i in [3, 4, 5, 6, 7, 8, 10, 12]])
bolt_part_numbers.extend([f'NAS1083-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1220-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1271-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS1297-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS144-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1503-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1580-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1581-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1582-{i}' for i in [3, 4, 5, 6]])
bolt_part_numbers.extend([f'NAS1603-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1703-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1724-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1725-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1728-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS1729-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS2803-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS333-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS464-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS583-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS624-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS6303-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS6403-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS653-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS663-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS6703-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS673-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS6803-{i}' for i in [3, 4, 5, 6, 7, 8, 10]])
bolt_part_numbers.extend([f'NAS7203-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS7303-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS7400-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS7500-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS7600-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS7700-{i}' for i in [3, 4, 5, 6]])
bolt_part_numbers.extend([f'NAS7800-{i}' for i in [3, 4, 5, 6]])
bolt_part_numbers.extend([f'NAS7900-{i}' for i in [3, 4, 5, 6]])
bolt_part_numbers.extend([f'NAS8602-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS8702-{i}' for i in [3, 4, 5, 6, 7, 8]])
bolt_part_numbers.extend([f'NAS8802-{i}' for i in [3, 4, 5, 6, 7, 8]])

# Generate all models
if __name__ == '__main__':
    output_dir = Path(__file__).parent.parent / 'public' / 'models'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Generating {len(bolt_part_numbers)} bolt models...")
    print()
    
    success_count = 0
    error_count = 0
    
    for i, part_num in enumerate(bolt_part_numbers, 1):
        slug = part_num.lower().replace('/', '-')
        output_file = output_dir / f'{slug}.glb'
        
        mesh, error = generate_bolt_model(part_num, str(output_file))
        
        if error:
            print(f"[{i}/{len(bolt_part_numbers)}] {part_num} -> {slug}.glb (FALLBACK: {error})")
            error_count += 1
        else:
            vert_count = len(mesh.vertices)
            print(f"[{i}/{len(bolt_part_numbers)}] {part_num} -> {slug}.glb ({vert_count} verts)")
            success_count += 1
    
    print()
    print(f"Complete! Successfully generated {success_count} models ({error_count} with fallbacks)")
    print()
    print("All bolt models are ready to use!")
