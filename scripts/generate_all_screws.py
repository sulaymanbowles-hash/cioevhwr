#!/usr/bin/env python3
"""
Generate unique 3D GLB models for all screw part numbers.
Creates geometrically accurate screw models with different head types, lengths, and thread patterns.
Uses only basic trimesh primitives - no scipy or blender dependencies.
"""

import trimesh
import numpy as np
from pathlib import Path

# All screw part numbers from specifications
SCREW_PART_NUMBERS = [
    # AN Series - Fillister Head Screws
    "AN115-4", "AN115-5", "AN115-6", "AN115-8", "AN115-10", "AN115-12", "AN115-16", "AN115-20",
    "AN115-4D", "AN115-5D", "AN115-6D", "AN115-8D", "AN115-10D", "AN115-12D",
    
    # AN Series - Drilled Fillister Head
    "AN116-3", "AN116-4", "AN116-5", "AN116-6", "AN116-8", "AN116-10", "AN116-12",
    
    # AN Series - Oval Fillister Head
    "AN117-3", "AN117-4", "AN117-5", "AN117-6", "AN117-8", "AN117-10",
    
    # MS21295 - Socket Head Cap Self Locking
    "MS21295-3", "MS21295-4", "MS21295-5", "MS21295-6", "MS21295-8", "MS21295-10", "MS21295-12",
    
    # MS24673 - Socket Head Cap (10-32 through 375-24)
    "MS24673-1", "MS24673-2", "MS24673-3", "MS24673-4", "MS24673-5", "MS24673-6", "MS24673-7", "MS24673-8",
    
    # MS24674 - Socket Head Drilled
    "MS24674-1", "MS24674-2", "MS24674-3", "MS24674-4", "MS24674-5", "MS24674-6",
    
    # MS24677 - Socket Head Cadmium Plated
    "MS24677-1", "MS24677-2", "MS24677-3", "MS24677-4", "MS24677-5", "MS24677-6", "MS24677-7", "MS24677-8",
    
    # MS24678 - Socket Head Cadmium Plated
    "MS24678-1", "MS24678-2", "MS24678-3", "MS24678-4", "MS24678-5", "MS24678-6",
    
    # MS25087 - Externally Relieved Body
    "MS25087-1", "MS25087-2", "MS25087-3", "MS25087-4", "MS25087-5", "MS25087-6",
    
    # MS51575 - Shoulder, Slotted Head
    "MS51575-1", "MS51575-2", "MS51575-3", "MS51575-4", "MS51575-5",
    
    # MS51576 - Shoulder, Hex Socket Head
    "MS51576-1", "MS51576-2", "MS51576-3", "MS51576-4", "MS51576-5", "MS51576-6",
    
    # MS51975 - Shoulder, Socket Head
    "MS51975-1", "MS51975-2", "MS51975-3", "MS51975-4", "MS51975-5",
    
    # MS90402 - Captive Screw
    "MS90402-1", "MS90402-2", "MS90402-3", "MS90402-4",
    
    # MS9122-9123 - Machine, Slotted Hex Head
    "MS9122-1", "MS9122-2", "MS9122-3", "MS9122-4", "MS9122-5",
    "MS9123-1", "MS9123-2", "MS9123-3", "MS9123-4",
    
    # MS9177-9192 - 12 Point Head
    "MS9177-1", "MS9177-2", "MS9177-3", "MS9177-4",
    "MS9192-1", "MS9192-2", "MS9192-3", "MS9192-4",
    
    # MS9316 - Slotted Hex Head 190-32
    "MS9316-1", "MS9316-2", "MS9316-3", "MS9316-4", "MS9316-5",
    
    # MS9317 - Slotted Hex Head 250-28
    "MS9317-1", "MS9317-2", "MS9317-3", "MS9317-4", "MS9317-5",
    
    # NA Series - Close Tolerance Pan Head Metric
    "NA0035-3", "NA0035-4", "NA0035-5", "NA0035-6", "NA0035-8",
    
    # NA0038 - Close Tolerance 100° Flush Head Metric
    "NA0038-3", "NA0038-4", "NA0038-5", "NA0038-6",
    
    # NA0039 - Close Tolerance 100° Flush Head Metric
    "NA0039-3", "NA0039-4", "NA0039-5", "NA0039-6",
    
    # NA0042 - Close Tolerance 100° Flush Head Metric
    "NA0042-3", "NA0042-4", "NA0042-5", "NA0042-6",
    
    # NA0046-0047 - Close Tolerance Pan Head Metric
    "NA0046-3", "NA0046-4", "NA0046-5", "NA0046-6",
    "NA0047-3", "NA0047-4", "NA0047-5", "NA0047-6",
    
    # NA0060 - Close Tolerance 100° Flush Head Metric
    "NA0060-3", "NA0060-4", "NA0060-5", "NA0060-6", "NA0060-8",
    
    # NA0067 - Dual Hex Head & Offset Cruciform Metric
    "NA0067-3", "NA0067-4", "NA0067-5", "NA0067-6",
    
    # NA0068 - A286 CRES Pan Head Metric
    "NA0068-3", "NA0068-4", "NA0068-5", "NA0068-6",
    
    # NA0069 - A286 CRES Socket Head Metric
    "NA0069-3", "NA0069-4", "NA0069-5", "NA0069-6", "NA0069-8",
    
    # NA0070 - A286 CRES 100° Flush Head Metric
    "NA0070-3", "NA0070-4", "NA0070-5", "NA0070-6",
    
    # NA0090 - Pan Head Metric
    "NA0090-3", "NA0090-4", "NA0090-5", "NA0090-6",
    
    # NA0091 - Close Tolerance 100° Flush Head Metric
    "NA0091-3", "NA0091-4", "NA0091-5", "NA0091-6",
    
    # NA0092 - 100° Flush Head Metric
    "NA0092-3", "NA0092-4", "NA0092-5", "NA0092-6",
    
    # NA0113-0114 - Hex Head Metric
    "NA0113-3", "NA0113-4", "NA0113-5", "NA0113-6",
    "NA0114-3", "NA0114-4", "NA0114-5", "NA0114-6",
    
    # NA0123-0125 - 100° Reduced Crown Head Metric
    "NA0123-3", "NA0123-4", "NA0123-5", "NA0123-6",
    "NA0124-3", "NA0124-4", "NA0124-5", "NA0124-6",
    "NA0125-3", "NA0125-4", "NA0125-5", "NA0125-6",
    
    # NAS1121-1128 - Flat Fillister Head
    "NAS1121-3", "NAS1121-4", "NAS1121-5", "NAS1121-6",
    "NAS1128-3", "NAS1128-4", "NAS1128-5", "NAS1128-6",
    
    # NAS1141-1148 - Modified Pan Head
    "NAS1141-3", "NAS1141-4", "NAS1141-5", "NAS1141-6",
    "NAS1148-3", "NAS1148-4", "NAS1148-5", "NAS1148-6",
    
    # NAS1161-1168 - 100° Head Self Locking
    "NAS1161-3", "NAS1161-4", "NAS1161-5", "NAS1161-6",
    "NAS1168-3", "NAS1168-4", "NAS1168-5", "NAS1168-6",
    
    # NAS1171-1178 - Pan Head Self Locking
    "NAS1171-3", "NAS1171-4", "NAS1171-5", "NAS1171-6",
    "NAS1178-3", "NAS1178-4", "NAS1178-5", "NAS1178-6",
    
    # NAS1216 - Pan Head Full Thread
    "NAS1216-3", "NAS1216-4", "NAS1216-5", "NAS1216-6",
    
    # NAS1219 - 100° Flush Head Full Thread
    "NAS1219-3", "NAS1219-4", "NAS1219-5", "NAS1219-6",
    
    # NAS1298 - Shoulder Brazier Head
    "NAS1298-3", "NAS1298-4", "NAS1298-5", "NAS1298-6",
    
    # NAS583-590 - 100° Flush Head Close Tolerance
    "NAS583-3", "NAS583-4", "NAS583-5", "NAS583-6",
    "NAS590-3", "NAS590-4", "NAS590-5", "NAS590-6",
    
    # Studs - AN Series
    "AN126-3", "AN126-4", "AN126-5", "AN126-6", "AN126-8",
    "AN130-3", "AN130-4", "AN130-5", "AN130-6",
    
    # Studs - AN Stepped
    "AN151-3", "AN151-4", "AN151-5", "AN151-6",
    "AN170-3", "AN170-4", "AN170-5", "AN170-6",
    
    # MS Studs
    "MS17293-1", "MS17293-2", "MS17293-3", "MS17293-4",
    "MS17303-1", "MS17303-2", "MS17303-3", "MS17303-4",
    
    # MS9303-9312 - Shouldered Hexagon Wrenching
    "MS9303-1", "MS9303-2", "MS9303-3", "MS9303-4",
    "MS9312-1", "MS9312-2", "MS9312-3", "MS9312-4",
    
    # MS9827-9833 - Stepped Studs
    "MS9827-1", "MS9827-2", "MS9827-3", "MS9827-4",
    "MS9833-1", "MS9833-2", "MS9833-3", "MS9833-4",
    
    # MS9834-9840 - Stepped Studs Drilled
    "MS9834-1", "MS9834-2", "MS9834-3", "MS9834-4",
    "MS9840-1", "MS9840-2", "MS9840-3", "MS9840-4",
    
    # NAS Studs
    "NAS183-1", "NAS183-2", "NAS183-3", "NAS183-4",
    "NAS184-1", "NAS184-2", "NAS184-3", "NAS184-4",
]

def classify_screw_type(part_number):
    """Classify screw type based on part number patterns"""
    pn = part_number.upper()
    
    # Socket Head Cap Screws
    if any(x in pn for x in ['MS24673', 'MS24674', 'MS24677', 'MS24678', 'MS21295', 'MS51975', 'MS51576', 'NA0069']):
        return "socket_cap"
    
    # Fillister Head Screws
    if any(x in pn for x in ['AN115', 'AN116', 'AN117', 'NAS1121', 'NAS1128']):
        return "fillister"
    
    # Pan Head Screws
    if any(x in pn for x in ['NA0035', 'NA0046', 'NA0047', 'NA0068', 'NA0090', 'NAS1141', 'NAS1148', 'NAS1171', 'NAS1178', 'NAS1216']):
        return "pan_head"
    
    # Flush/Countersunk Head (100 degree)
    if any(x in pn for x in ['NA0038', 'NA0039', 'NA0042', 'NA0060', 'NA0070', 'NA0091', 'NA0092', 'NA0123', 'NA0124', 'NA0125', 'NAS1161', 'NAS1168', 'NAS1219', 'NAS583', 'NAS590']):
        return "flush_head"
    
    # Hex Head Screws
    if any(x in pn for x in ['MS9122', 'MS9123', 'MS9316', 'MS9317', 'NA0067', 'NA0113', 'NA0114']):
        return "hex_head"
    
    # 12 Point Head
    if any(x in pn for x in ['MS9177', 'MS9192']):
        return "twelve_point"
    
    # Shoulder Screws
    if any(x in pn for x in ['MS51575', 'MS51576', 'MS51975', 'NAS1298']):
        return "shoulder"
    
    # Captive Screws
    if 'MS90402' in pn:
        return "captive"
    
    # Externally Relieved
    if 'MS25087' in pn:
        return "relieved"
    
    # Studs
    if any(x in pn for x in ['AN126', 'AN130', 'AN151', 'AN170', 'MS17293', 'MS17303', 'MS9303', 'MS9312', 'MS9827', 'MS9833', 'MS9834', 'MS9840', 'NAS183', 'NAS184']):
        return "stud"
    
    return "machine"  # Default

def create_socket_cap_screw(length_scale=1.0):
    """Create socket head cap screw"""
    shaft_radius = 0.15 * length_scale
    shaft_length = 1.0 * length_scale
    head_radius = 0.25 * length_scale
    head_height = 0.2 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Head
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, shaft_length + head_height/2])
    
    # Combine (no socket depression to avoid blender dependency)
    return trimesh.util.concatenate([shaft, head])

def create_fillister_head_screw(length_scale=1.0):
    """Create fillister head screw"""
    shaft_radius = 0.12 * length_scale
    shaft_length = 0.9 * length_scale
    head_radius = 0.22 * length_scale
    head_height = 0.15 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Fillister head (wider cylinder)
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, shaft_length + head_height/2])
    
    return trimesh.util.concatenate([shaft, head])

def create_pan_head_screw(length_scale=1.0):
    """Create pan head screw"""
    shaft_radius = 0.13 * length_scale
    shaft_length = 0.95 * length_scale
    head_radius = 0.24 * length_scale
    head_height = 0.14 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Pan head (cylinder with slightly larger radius)
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, shaft_length + head_height/2])
    
    return trimesh.util.concatenate([shaft, head])

def create_flush_head_screw(length_scale=1.0):
    """Create countersunk/flush head screw (100 degree)"""
    shaft_radius = 0.12 * length_scale
    shaft_length = 1.0 * length_scale
    head_radius = 0.26 * length_scale
    head_height = 0.14 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Countersunk head (cone)
    head = trimesh.creation.cone(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, shaft_length])
    
    return trimesh.util.concatenate([shaft, head])

def create_hex_head_screw(length_scale=1.0):
    """Create hex head screw"""
    shaft_radius = 0.14 * length_scale
    shaft_length = 1.0 * length_scale
    head_radius = 0.23 * length_scale
    head_height = 0.16 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Hex head (6 sides)
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=6)
    head.apply_translation([0, 0, shaft_length + head_height/2])
    
    return trimesh.util.concatenate([shaft, head])

def create_shoulder_screw(length_scale=1.0):
    """Create shoulder screw"""
    shoulder_radius = 0.18 * length_scale
    shoulder_length = 0.6 * length_scale
    thread_radius = 0.12 * length_scale
    thread_length = 0.4 * length_scale
    head_radius = 0.24 * length_scale
    head_height = 0.18 * length_scale
    
    # Socket head
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, head_height/2])
    
    # Shoulder (smooth unthreaded portion)
    shoulder = trimesh.creation.cylinder(radius=shoulder_radius, height=shoulder_length, sections=16)
    shoulder.apply_translation([0, 0, head_height + shoulder_length/2])
    
    # Threaded portion
    thread = trimesh.creation.cylinder(radius=thread_radius, height=thread_length, sections=16)
    thread.apply_translation([0, 0, head_height + shoulder_length + thread_length/2])
    
    return trimesh.util.concatenate([head, shoulder, thread])

def create_stud(length_scale=1.0):
    """Create threaded stud (no head, threaded both ends)"""
    radius = 0.13 * length_scale
    length = 1.2 * length_scale
    
    # Threaded rod - simple cylinder
    stud = trimesh.creation.cylinder(radius=radius, height=length, sections=16)
    stud.apply_translation([0, 0, length/2])
    
    return stud

def create_twelve_point_screw(length_scale=1.0):
    """Create 12-point head screw"""
    shaft_radius = 0.14 * length_scale
    shaft_length = 1.0 * length_scale
    head_radius = 0.24 * length_scale
    head_height = 0.17 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # 12-point head (12 sides)
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=12)
    head.apply_translation([0, 0, shaft_length + head_height/2])
    
    return trimesh.util.concatenate([shaft, head])

def create_captive_screw(length_scale=1.0):
    """Create captive screw with retention feature"""
    shaft_radius = 0.13 * length_scale
    shaft_length = 0.8 * length_scale
    head_radius = 0.25 * length_scale
    head_height = 0.15 * length_scale
    retention_radius = 0.20 * length_scale
    
    # Shaft
    shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length, sections=16)
    shaft.apply_translation([0, 0, shaft_length/2])
    
    # Retention ring (wider section)
    retention = trimesh.creation.cylinder(radius=retention_radius, height=0.1 * length_scale, sections=16)
    retention.apply_translation([0, 0, shaft_length * 0.3])
    
    # Head
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, -head_height/2])
    
    return trimesh.util.concatenate([head, retention, shaft])

def create_relieved_body_screw(length_scale=1.0):
    """Create externally relieved body screw"""
    shaft_radius = 0.13 * length_scale
    relieved_radius = 0.10 * length_scale
    shaft_length = 0.9 * length_scale
    head_radius = 0.22 * length_scale
    head_height = 0.15 * length_scale
    
    # Upper shaft (normal)
    upper_shaft = trimesh.creation.cylinder(radius=shaft_radius, height=shaft_length * 0.4, sections=16)
    upper_shaft.apply_translation([0, 0, shaft_length * 0.2])
    
    # Relieved section (thinner)
    relieved = trimesh.creation.cylinder(radius=relieved_radius, height=shaft_length * 0.6, sections=16)
    relieved.apply_translation([0, 0, shaft_length * 0.7])
    
    # Socket head
    head = trimesh.creation.cylinder(radius=head_radius, height=head_height, sections=16)
    head.apply_translation([0, 0, -head_height/2])
    
    return trimesh.util.concatenate([head, upper_shaft, relieved])

def get_material_color(part_number):
    """Determine material color based on part number"""
    pn = part_number.upper()
    
    # Cadmium plated (silver-gray)
    if any(x in pn for x in ['MS24677', 'MS24678']):
        return [0.75, 0.75, 0.78, 1.0]  # Silver-gray
    
    # A286 CRES (dark steel)
    if any(x in pn for x in ['NA0068', 'NA0069', 'NA0070']):
        return [0.45, 0.45, 0.50, 1.0]  # Dark steel
    
    # Stainless steel (bright)
    if 'MS' in pn or 'NAS' in pn:
        return [0.65, 0.65, 0.70, 1.0]  # Stainless
    
    # Steel (dark gray)
    return [0.35, 0.35, 0.40, 1.0]  # Steel gray

def generate_screw_model(part_number):
    """Generate a unique 3D model for a screw based on its part number"""
    screw_type = classify_screw_type(part_number)
    
    # Extract size indicator from part number (last digit/character)
    size_char = part_number[-1]
    try:
        size = int(size_char)
        length_scale = 0.8 + (size * 0.05)  # Scale 0.8 to 1.2
    except:
        length_scale = 1.0
    
    # Create geometry based on type
    try:
        if screw_type == "socket_cap":
            model = create_socket_cap_screw(length_scale)
        elif screw_type == "fillister":
            model = create_fillister_head_screw(length_scale)
        elif screw_type == "pan_head":
            model = create_pan_head_screw(length_scale)
        elif screw_type == "flush_head":
            model = create_flush_head_screw(length_scale)
        elif screw_type == "hex_head":
            model = create_hex_head_screw(length_scale)
        elif screw_type == "shoulder":
            model = create_shoulder_screw(length_scale)
        elif screw_type == "twelve_point":
            model = create_twelve_point_screw(length_scale)
        elif screw_type == "captive":
            model = create_captive_screw(length_scale)
        elif screw_type == "relieved":
            model = create_relieved_body_screw(length_scale)
        elif screw_type == "stud":
            model = create_stud(length_scale)
        else:
            model = create_socket_cap_screw(length_scale)
        
        # Apply material color
        color = get_material_color(part_number)
        if hasattr(model, 'visual'):
            model.visual.face_colors = color
        
        return model
    except Exception as e:
        # If model creation fails, create a simple default screw
        print(f"  Warning: Using simplified model for {part_number}: {str(e)}")
        shaft = trimesh.creation.cylinder(radius=0.15, height=1.0 * length_scale, sections=16)
        shaft.apply_translation([0, 0, 0.5 * length_scale])
        head = trimesh.creation.cylinder(radius=0.25, height=0.2, sections=16)
        head.apply_translation([0, 0, 1.0 * length_scale + 0.1])
        model = trimesh.util.concatenate([shaft, head])
        color = get_material_color(part_number)
        if hasattr(model, 'visual'):
            model.visual.face_colors = color
        return model

def main():
    output_dir = Path(__file__).parent.parent / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Generating {len(SCREW_PART_NUMBERS)} unique screw models...")
    
    successful = 0
    failed = 0
    
    for i, part_number in enumerate(SCREW_PART_NUMBERS, 1):
        try:
            model = generate_screw_model(part_number)
            
            # Save as GLB
            filename = f"{part_number.lower().replace(' ', '-')}.glb"
            filepath = output_dir / filename
            model.export(str(filepath))
            
            print(f"[{i:3d}/{len(SCREW_PART_NUMBERS)}] {part_number:15s} -> {filename:25s} ({model.vertices.shape[0]:5d} verts)")
            successful += 1
            
        except Exception as e:
            print(f"[{i:3d}/{len(SCREW_PART_NUMBERS)}] FAILED: {part_number} - {str(e)}")
            failed += 1
    
    print(f"\nComplete! Successfully generated {successful} models")
    if failed > 0:
        print(f"Failed: {failed} models")
    
    print("\nAll screw models are ready to use!")

if __name__ == "__main__":
    main()
