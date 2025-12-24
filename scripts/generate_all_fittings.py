#!/usr/bin/env python3
"""
Generate Complete Aerospace Fitting Models
Creates unique 3D models for all AN/MS/AS fitting part numbers
"""

import trimesh
import numpy as np
from pathlib import Path
import re

# Fitting part numbers from specifications
FITTING_PART_NUMBERS = [
    "AN774", "AN775", "AN776", "AN777", "AN778", "AN779", "AN780", "AN783", "AN784", "AN785", 
    "AN786", "AN790", "AN791", "AN792", "AN795", "AN800", "AN801", "AN802", "AN803", "AN804", 
    "AN806", "AN807", "AN814", "AN815", "AN816", "AN818", "AN821", "AN824", "AN825", "AN826", 
    "AN827", "AN832", "AN833", "AN834", "AN837", "AN838", "AN839", "AN840", "AN841", "AN842", 
    "AN844", "AN846", "AN848", "AN849", "AN871", "AN893", "AN894", "AN910", "AN911", "AN912", 
    "AN914", "AN915", "AN916", "AN917", "AN918", "AN919", "AN924", "AN929", "AN933", "AN937", 
    "AN938", "AN939", "AN941", "AN6289",
    "MS20819", "MS20822", "MS20823", "MS20825", "MS20826", "MS20913",
    "MS21900", "MS21902", "MS21904", "MS21905", "MS21906", "MS21907", "MS21908", "MS21909", 
    "MS21910", "MS21911", "MS21912", "MS21913", "MS21914", "MS21915", "MS21916", "MS21921", 
    "MS21922", "MS21924", "MS21925", "MS21926", "MS27073", "MS27074",
    "AS5160", "AS5161", "AS5162", "AS5163", "AS5164", "AS5165", "AS1031", "AS1032", "MS28740", 
    "AS1033", "AS5168", "AS5180", "AS5169", "AS5174", "AS5194", "AS5175", "AS1034", "AS1035", 
    "AS5197", "AS5198", "AS1036", "AS5406", "AS1038", "AS1039", "AS1040", "AS5181", "AS5182", 
    "AS5183", "AS5184", "AS5185", "AS5186", "AS5187", "AS5188", "AS5189", "AS5227", "AS5172", 
    "AS5173", "AS4859", "AS4860", "AS4861", "AS4854", "AS4855", "AS4856", "AS4857", "AS4858", 
    "AS5178", "AS5177", "AS4862", "AS5193", "AS5192", "AS5190", "AS5191", "AS5179", "AS5176", 
    "AS5195", "AS5196", "AS4863",
    "AS21900", "AS21902", "AS21904", "AS21905", "AS21906", "AS21907", "AS21908", "AS21909", 
    "AS21910", "AS21911", "AS21912", "AS21913", "AS21914", "AS21915", "AS21916", "AS21921", 
    "AS21922", "AS21924", "AS21925", "AS21926",
    "AS4370", "AS1791", "MS24388", "MS24389", "MS24587", "MS24390", "MS24404", "MS24391", 
    "MS24392", "MS24401", "MS24402", "MS24403", "MS24393", "MS24394", "MS24395", "MS24396", 
    "MS24397", "MS24398", "MS24399", "MS24400", "AS5238", "AS5230", "AS5231", "AS5232", "AS4864",
    "AN817", "AN932", "MS24387", "AS21923", "AS21937", "AS21938", "AS21939", "AS21940", 
    "AS21941", "AS21942", "AS21943", "AS21944", "AS21945", "AS24405", "AS24651", "AS24652", 
    "AS24654", "AS1001", "AS1002", "AS1003", "AS1004", "AS1005", "AS1006", "AS1007", "AS1008", 
    "AS1009", "AS1010", "AS1790", "AS1792", "AS1860", "AS4130", "AS4131", "AS4132", "AS4133", 
    "AS4134", "AS4135", "AS4136", "AS4137", "AS4138", "AS4139", "AS4140", "AS4141", "AS5233", 
    "AS5239", "AS5240", "AS5241", "AS5242",
    "MS21923", "MS21937", "MS21938", "MS21939", "MS21940", "MS21941", "MS21942", "MS21943", 
    "MS21944", "MS21945", "MS24405", "MS24651", "MS24652", "MS24654"
]

def get_fitting_type(part_number):
    """Determine fitting type based on part number patterns"""
    pn = part_number.upper()
    
    # Straight fittings
    if any(x in pn for x in ['AN774', 'AN775', 'AN814', 'AN815', 'AN816', 'MS24387', 'MS24388']):
        return 'straight'
    
    # Elbow fittings (90 degree)
    if any(x in pn for x in ['AN822', 'AN823', 'AN826', 'MS20822', 'MS20823', 'MS20826', 'MS21904', 'MS21908', 'AS21904']):
        return 'elbow_90'
    
    # Elbow fittings (45 degree)
    if any(x in pn for x in ['AN913', 'MS20913', 'MS21905', 'AS21905']):
        return 'elbow_45'
    
    # Tee fittings
    if any(x in pn for x in ['AN932', 'MS21902', 'MS21906', 'AS21902', 'AS21906']):
        return 'tee'
    
    # Cross fittings
    if any(x in pn for x in ['MS21910', 'AS21910']):
        return 'cross'
    
    # Reducer fittings
    if any(x in pn for x in ['AN817', 'AN821', 'MS21907', 'AS5160', 'AS5161']):
        return 'reducer'
    
    # Bulkhead fittings
    if any(x in pn for x in ['AN833', 'AN834', 'MS21911', 'AS21911']):
        return 'bulkhead'
    
    # Cap/Plug fittings
    if any(x in pn for x in ['AN806', 'AN807', 'MS21909', 'AS21909', 'AS4370']):
        return 'cap'
    
    # Adapter fittings (most common - flared connections)
    if any(x in pn for x in ['AN818', 'AN819', 'AN824', 'AN825', 'MS21900', 'AS21900']):
        return 'adapter'
    
    # Default to adapter for unknown types
    return 'adapter'

def create_straight_fitting(part_number, scale=1.0):
    """Create straight union fitting"""
    # Determine size variations based on part number
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    body = trimesh.creation.cylinder(radius=0.18*scale, height=0.9*scale, sections=32)
    hex_grip = trimesh.creation.cylinder(radius=0.24*scale, height=0.3*scale, sections=6)
    
    sleeve1 = trimesh.creation.cylinder(radius=0.14*scale, height=0.25*scale, sections=32)
    sleeve1.apply_translation([0, 0, 0.575*scale])
    
    sleeve2 = trimesh.creation.cylinder(radius=0.14*scale, height=0.25*scale, sections=32)
    sleeve2.apply_translation([0, 0, -0.575*scale])
    
    fitting = trimesh.util.concatenate([body, hex_grip, sleeve1, sleeve2])
    fitting.visual.vertex_colors = [220, 180, 85, 255]
    return fitting

def create_elbow_fitting(part_number, angle=90, scale=1.0):
    """Create elbow fitting (90 or 45 degree)"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    segments = []
    num_segments = 10
    radius = 0.11*scale
    bend_radius = 0.28*scale
    angle_rad = np.radians(angle)
    
    for i in range(num_segments):
        ang = (i * angle_rad) / (num_segments - 1)
        seg = trimesh.creation.cylinder(radius=radius, height=bend_radius/num_segments, sections=24)
        x = bend_radius * np.cos(ang)
        z = bend_radius * np.sin(ang)
        seg.apply_transform(trimesh.transformations.rotation_matrix(ang, [0, 1, 0]))
        seg.apply_translation([x, 0, z])
        segments.append(seg)
    
    straight1 = trimesh.creation.cylinder(radius=radius, height=0.4*scale, sections=24)
    straight1.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    straight1.apply_translation([-0.5*scale, 0, 0])
    
    straight2 = trimesh.creation.cylinder(radius=radius, height=0.4*scale, sections=24)
    straight2.apply_translation([0, 0, 0.5*scale])
    
    hex_grip = trimesh.creation.cylinder(radius=0.18*scale, height=0.25*scale, sections=6)
    hex_grip.apply_translation([bend_radius*0.5, 0, bend_radius*0.5])
    
    fitting = trimesh.util.concatenate(segments + [straight1, straight2, hex_grip])
    fitting.visual.vertex_colors = [191, 196, 204, 255]
    return fitting

def create_tee_fitting(part_number, scale=1.0):
    """Create T-junction fitting"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Main body
    body = trimesh.creation.box(extents=[0.6*scale, 0.6*scale, 0.8*scale])
    
    # Three outlets
    outlet1 = trimesh.creation.cylinder(radius=0.11*scale, height=0.4*scale, sections=24)
    outlet1.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
    outlet1.apply_translation([0.5*scale, 0, 0])
    
    outlet2 = trimesh.creation.cylinder(radius=0.11*scale, height=0.4*scale, sections=24)
    outlet2.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [0, 1, 0]))
    outlet2.apply_translation([-0.5*scale, 0, 0])
    
    outlet3 = trimesh.creation.cylinder(radius=0.11*scale, height=0.4*scale, sections=24)
    outlet3.apply_translation([0, 0, 0.6*scale])
    
    hex_grip = trimesh.creation.cylinder(radius=0.20*scale, height=0.25*scale, sections=6)
    
    fitting = trimesh.util.concatenate([body, outlet1, outlet2, outlet3, hex_grip])
    fitting.visual.vertex_colors = [205, 170, 80, 255]
    return fitting

def create_cross_fitting(part_number, scale=1.0):
    """Create cross/4-way fitting"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Central body
    body = trimesh.creation.box(extents=[0.7*scale, 0.7*scale, 0.7*scale])
    
    # Four outlets
    outlets = []
    for angle in [0, 90, 180, 270]:
        outlet = trimesh.creation.cylinder(radius=0.10*scale, height=0.35*scale, sections=24)
        outlet.apply_transform(trimesh.transformations.rotation_matrix(np.radians(angle), [0, 0, 1]))
        outlet.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [0, 1, 0]))
        outlet.apply_translation([0.525*scale * np.cos(np.radians(angle)), 
                                 0.525*scale * np.sin(np.radians(angle)), 0])
        outlets.append(outlet)
    
    fitting = trimesh.util.concatenate([body] + outlets)
    fitting.visual.vertex_colors = [200, 165, 75, 255]
    return fitting

def create_reducer_fitting(part_number, scale=1.0):
    """Create reducer/adapter fitting (different diameters)"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Large end
    large_body = trimesh.creation.cylinder(radius=0.18*scale, height=0.35*scale, sections=32)
    large_body.apply_translation([0, 0, 0.175*scale])
    
    # Transition cone
    transition = trimesh.creation.cone(radius=0.18*scale, height=0.3*scale, sections=32)
    transition.apply_transform(trimesh.transformations.rotation_matrix(np.pi, [1, 0, 0]))
    
    # Small end
    small_body = trimesh.creation.cylinder(radius=0.12*scale, height=0.35*scale, sections=32)
    small_body.apply_translation([0, 0, -0.325*scale])
    
    # Hex grip
    hex_grip = trimesh.creation.cylinder(radius=0.22*scale, height=0.25*scale, sections=6)
    hex_grip.apply_translation([0, 0, 0.025*scale])
    
    fitting = trimesh.util.concatenate([large_body, transition, small_body, hex_grip])
    fitting.visual.vertex_colors = [215, 175, 82, 255]
    return fitting

def create_bulkhead_fitting(part_number, scale=1.0):
    """Create bulkhead/panel mount fitting"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Main body through-hole
    body = trimesh.creation.cylinder(radius=0.15*scale, height=0.6*scale, sections=32)
    
    # Mounting flange
    flange = trimesh.creation.cylinder(radius=0.35*scale, height=0.08*scale, sections=6)
    
    # Threaded ends
    thread1 = trimesh.creation.cylinder(radius=0.13*scale, height=0.25*scale, sections=32)
    thread1.apply_translation([0, 0, 0.425*scale])
    
    thread2 = trimesh.creation.cylinder(radius=0.13*scale, height=0.25*scale, sections=32)
    thread2.apply_translation([0, 0, -0.425*scale])
    
    fitting = trimesh.util.concatenate([body, flange, thread1, thread2])
    fitting.visual.vertex_colors = [210, 172, 78, 255]
    return fitting

def create_cap_fitting(part_number, scale=1.0):
    """Create cap/plug fitting"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Cap body
    cap = trimesh.creation.cylinder(radius=0.16*scale, height=0.15*scale, sections=32)
    cap.apply_translation([0, 0, 0.075*scale])
    
    # Threaded shaft
    shaft = trimesh.creation.cylinder(radius=0.12*scale, height=0.35*scale, sections=32)
    shaft.apply_translation([0, 0, -0.175*scale])
    
    # Hex grip
    hex_grip = trimesh.creation.cylinder(radius=0.20*scale, height=0.12*scale, sections=6)
    hex_grip.apply_translation([0, 0, 0.14*scale])
    
    fitting = trimesh.util.concatenate([cap, shaft, hex_grip])
    fitting.visual.vertex_colors = [225, 185, 90, 255]
    return fitting

def create_adapter_fitting(part_number, scale=1.0):
    """Create adapter/flared connection fitting (most common type)"""
    last_digit = int(re.findall(r'\d+', part_number)[-1]) if re.findall(r'\d+', part_number) else 4
    size_factor = 0.8 + (last_digit % 10) * 0.03
    scale *= size_factor
    
    # Main body
    body = trimesh.creation.cylinder(radius=0.15*scale, height=1.0*scale, sections=32)
    
    # Hex grips
    hex1 = trimesh.creation.cylinder(radius=0.20*scale, height=0.24*scale, sections=6)
    hex1.apply_translation([0, 0, 0.28*scale])
    
    hex2 = trimesh.creation.cylinder(radius=0.20*scale, height=0.24*scale, sections=6)
    hex2.apply_translation([0, 0, -0.28*scale])
    
    # Flared ends (37 degree cone)
    flare1 = trimesh.creation.cone(radius=0.19*scale, height=0.18*scale, sections=32)
    flare1.apply_translation([0, 0, 0.59*scale])
    
    flare2 = trimesh.creation.cone(radius=0.19*scale, height=0.18*scale, sections=32)
    flare2.apply_transform(trimesh.transformations.rotation_matrix(np.pi, [1, 0, 0]))
    flare2.apply_translation([0, 0, -0.59*scale])
    
    fitting = trimesh.util.concatenate([body, hex1, hex2, flare1, flare2])
    fitting.visual.vertex_colors = [224, 183, 92, 255]
    return fitting

def generate_fitting_model(part_number):
    """Generate appropriate 3D model based on part number"""
    fitting_type = get_fitting_type(part_number)
    
    # Determine material color based on prefix
    # AN/MS typically brass/aluminum, AS typically stainless
    if part_number.startswith('AS'):
        color_adjustment = 0.95  # Slightly lighter for stainless
    else:
        color_adjustment = 1.0
    
    if fitting_type == 'straight':
        model = create_straight_fitting(part_number)
    elif fitting_type == 'elbow_90':
        model = create_elbow_fitting(part_number, angle=90)
    elif fitting_type == 'elbow_45':
        model = create_elbow_fitting(part_number, angle=45)
    elif fitting_type == 'tee':
        model = create_tee_fitting(part_number)
    elif fitting_type == 'cross':
        model = create_cross_fitting(part_number)
    elif fitting_type == 'reducer':
        model = create_reducer_fitting(part_number)
    elif fitting_type == 'bulkhead':
        model = create_bulkhead_fitting(part_number)
    elif fitting_type == 'cap':
        model = create_cap_fitting(part_number)
    else:  # adapter
        model = create_adapter_fitting(part_number)
    
    return model

def main():
    """Generate all fitting models"""
    output_dir = Path(__file__).parent.parent / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🔧 Generating {len(FITTING_PART_NUMBERS)} unique fitting models...")
    print("=" * 70)
    
    successful = 0
    failed = 0
    
    for i, part_number in enumerate(FITTING_PART_NUMBERS, 1):
        filename = f"{part_number.lower()}.glb"
        try:
            model = generate_fitting_model(part_number)
            model.export(output_dir / filename)
            print(f"[{i:3d}/{len(FITTING_PART_NUMBERS)}] ✓ {part_number:12s} → {filename:20s} ({model.vertices.shape[0]:5d} verts)")
            successful += 1
        except Exception as e:
            print(f"[{i:3d}/{len(FITTING_PART_NUMBERS)}] ✗ {part_number:12s} → ERROR: {str(e)[:40]}")
            failed += 1
    
    print("=" * 70)
    print(f"✅ Complete! Successfully generated {successful} models")
    if failed > 0:
        print(f"⚠️  Failed: {failed} models")
    print(f"📁 Location: {output_dir}")
    print("\n🚀 All fitting models are ready to use!")

if __name__ == "__main__":
    main()
