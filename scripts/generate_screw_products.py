#!/usr/bin/env python3
"""
Generate screw product catalog entries for TypeScript with manufacturer and type information.
"""

# Screw manufacturers
SCREW_MANUFACTURERS = [
    "B & B Specialties",
    "CBS Fasteners Inc.",
    "Ideal Fasteners",
    "Twist Tite Mfg.",
    "Accurate Screw Machine",
    "Apm Hexseal",
    "Zago Manufacturing Company",
    "Crescent Mfg.",
    "Mac Fasteners",
    "Safety Socket",
    "Heartland Precision",
    "SPS Fasteners"
]

# Simplified screw list - using existing models as templates
SCREWS = [
    # Socket Cap Screws
    ("MS24673-3C4", "Socket Cap Screw", "Socket Head Cap", "10-32 Thread"),
    ("MS24673-4C6", "Socket Cap Screw", "Socket Head Cap", "1/4-28 Thread"),
    ("MS24674-3C4", "Socket Cap Screw, Drilled", "Socket Head Cap", "10-32 Thread, Drilled"),
    ("MS24677-3C4", "Socket Cap Screw, Cad Plated", "Socket Head Cap", "Cadmium Plated"),
    ("MS21295-4C", "Socket Head Cap Self Locking", "Socket Head Cap", "Self-Locking Feature"),
    
    # Fillister Head Screws
    ("AN115-4", "Fillister Head Screw", "Fillister Head", "Standard Thread"),
    ("AN115-6", "Fillister Head Screw", "Fillister Head", "Standard Thread"),
    ("AN116-4", "Fillister Head Screw, Drilled", "Fillister Head", "Drilled Head"),
    ("AN117-4", "Oval Fillister Head Screw", "Fillister Head", "Oval Profile"),
    
    # Machine Screws
    ("MS9122-06", "Machine Screw, Slotted Hex", "Machine Screw", "Hex Head, Slotted"),
    ("MS9123-06", "Machine Screw, Slotted Hex", "Machine Screw", "Hex Head, Slotted"),
    ("MS9316-4", "Machine Screw, .190-32", "Machine Screw", "190-32 Thread"),
    ("MS9317-4", "Machine Screw, .250-28", "Machine Screw", "250-28 Thread"),
    
    # Hex Head Screws
    ("MS9177-06", "12 Point Head Screw", "Hex Head", "12-Point Drive"),
    ("MS9192-06", "12 Point Head Screw, Drilled", "Hex Head", "12-Point, Drilled"),
    
    # Shoulder Screws
    ("MS51575-4", "Shoulder Screw, Slotted", "Shoulder Screw", "Slotted Head"),
    ("MS51576-4", "Shoulder Screw, Hex Socket", "Shoulder Screw", "Hex Socket Head"),
    ("MS51975-4", "Shoulder Screw, Socket Head", "Shoulder Screw", "Socket Head"),
    ("NAS1298-4", "Shoulder Screw, Brazier Head", "Shoulder Screw", "Brazier Head, Cruciform"),
    
    # Pan Head Screws (Metric)
    ("NA0035-4", "Pan Head Screw, Close Tolerance", "Pan Head", "Metric, Close Tolerance"),
    ("NA0046-4", "Pan Head Screw, Close Tolerance", "Pan Head", "Metric, Close Tolerance"),
    ("NA0047-4", "Pan Head Screw, Close Tolerance", "Pan Head", "Metric, Close Tolerance"),
    ("NA0068-4", "A286 CRES Pan Head Screw", "Pan Head", "A286 CRES, Offset Cruciform"),
    ("NA0090-4", "Pan Head Screw, Offset Cruciform", "Pan Head", "Metric, Offset Cruciform"),
    ("NAS1141-4", "Modified Pan Head Screw", "Pan Head", "Short Thread, Offset Cruciform"),
    ("NAS1148-4", "Modified Pan Head Screw", "Pan Head", "Short Thread, Offset Cruciform"),
    ("NAS1171-4", "Pan Head Screw, Self Locking", "Pan Head", "Offset Cruciform, Self Locking"),
    ("NAS1178-4", "Pan Head Screw, Self Locking", "Pan Head", "Offset Cruciform, Self Locking"),
    ("NAS1216-4", "Pan Head Screw, Full Thread", "Pan Head", "Full Thread"),
    
    # Flush/Countersunk Head (100 degree)
    ("NA0038-4", "100° Flush Head Screw", "Flush Head", "Metric, Close Tolerance"),
    ("NA0039-4", "100° Flush Head Screw", "Flush Head", "Metric, Close Tolerance"),
    ("NA0042-4", "100° Flush Head Screw", "Flush Head", "Metric, Close Tolerance"),
    ("NA0060-4", "100° Flush Head Screw", "Flush Head", "Metric, Close Tolerance"),
    ("NA0070-4", "A286 CRES 100° Flush Head", "Flush Head", "A286 CRES, Offset Cruciform"),
    ("NA0091-4", "100° Flush Head Screw", "Flush Head", "Metric, Close Tolerance"),
    ("NA0092-4", "100° Flush Head Screw", "Flush Head", "Offset Cruciform"),
    ("NA0123-4", "100° Reduced Crown Head", "Flush Head", "Metric, Reduced Crown"),
    ("NA0124-4", "100° Reduced Crown Head", "Flush Head", "Metric, Reduced Crown"),
    ("NA0125-4", "100° Reduced Crown Head", "Flush Head", "Metric, Reduced Crown"),
    ("NAS1161-4", "100° Head Screw, Self Locking", "Flush Head", "Offset Cruciform, Self Locking"),
    ("NAS1168-4", "100° Head Screw, Self Locking", "Flush Head", "Offset Cruciform, Self Locking"),
    ("NAS1219-4", "100° Flush Head, Full Thread", "Flush Head", "Full Thread, Dovetail Slot"),
    ("NAS583-4", "100° Flush Head, Close Tolerance", "Flush Head", "Close Tolerance"),
    ("NAS590-4", "100° Flush Head, Close Tolerance", "Flush Head", "Close Tolerance"),
    ("NAS1121-4", "Flat Fillister Head Screw", "Flush Head", "Short Thread, Offset Cruciform"),
    ("NAS1128-4", "Flat Fillister Head Screw", "Flush Head", "Short Thread, Offset Cruciform"),
    
    # Dual Hex/Metric Screws  
    ("NA0067-4", "Dual Hex Head Screw", "Hex Head", "Dual Hex & Offset Cruciform"),
    ("NA0113-4", "Hex Head Screw, Offset Cruciform", "Hex Head", "Metric, Offset Cruciform"),
    ("NA0114-4", "Hex Head Screw, Offset Cruciform", "Hex Head", "Metric, Offset Cruciform"),
    
    # Socket Head A286 CRES
    ("NA0069-4", "A286 CRES Socket Head Screw", "Socket Head Cap", "A286 CRES, Full Thread"),
    
    # Specialty Screws
    ("MS25087-4", "Externally Relieved Body Screw", "Machine Screw", "Externally Relieved Body"),
    ("MS90402-2", "Captive Screw", "Captive Screw", "Captive Design"),
    
    # Studs
    ("AN126-4", "Straight Stud", "Stud", "Straight, Drilled or Undrilled"),
    ("AN130-4", "Straight Stud", "Stud", "Straight, Drilled or Undrilled"),
    ("AN151-4", "Stepped Stud", "Stud", "Stepped, .250-20 x .190-32"),
    ("AN170-4", "Stepped Stud", "Stud", "Stepped, Drilled or Undrilled"),
    ("MS17293-2", "Stepped Stud", "Stud", "Stepped, Drilled or Undrilled"),
    ("MS17303-2", "Stepped Stud", "Stud", "Stepped, Drilled or Undrilled"),
    ("MS9303-2", "Shouldered Hexagon Wrenching Stud", "Stud", "Shouldered, Hex Wrenching"),
    ("MS9312-2", "Shouldered Hexagon Wrenching Stud", "Stud", "Shouldered, Hex Wrenching"),
    ("MS9827-2", "Stepped Stud", "Stud", "Stepped"),
    ("MS9833-2", "Stepped Stud", "Stud", "Stepped"),
    ("MS9834-2", "Stepped Stud, Drilled", "Stud", "Stepped, Drilled, Steel"),
    ("MS9840-2", "Stepped Stud, Drilled", "Stud", "Stepped, Drilled, Steel"),
    ("NAS183-2", "Stud, Coarse or Fine Thread", "Stud", "Drilled or Undrilled"),
    ("NAS184-2", "Stud, Coarse or Fine Thread", "Stud", "Drilled or Undrilled"),
]

def generate_product_entry(part_number, title, screw_type, thread_spec):
    """Generate a TypeScript product entry"""
    slug = part_number.lower().replace(' ', '-')
    model_file = f"{slug}.glb"
    
    # Determine screw category
    if "Stud" in screw_type:
        category = "Screws"  # Studs go in Screws category
        screw_category = "Stud"
    elif "Socket" in screw_type:
        category = "Screws"
        screw_category = "Socket Cap Screw"
    elif "Fillister" in screw_type:
        category = "Screws"
        screw_category = "Fillister Head Screw"
    elif "Pan" in screw_type:
        category = "Screws"
        screw_category = "Pan Head Screw"
    elif "Flush" in screw_type:
        category = "Screws"
        screw_category = "Flush Head Screw"
    elif "Hex" in screw_type:
        category = "Screws"
        screw_category = "Hex Head Screw"
    elif "Shoulder" in screw_type:
        category = "Screws"
        screw_category = "Shoulder Screw"
    elif "Machine" in screw_type:
        category = "Screws"
        screw_category = "Machine Screw"
    elif "Captive" in screw_type:
        category = "Screws"
        screw_category = "Captive Screw"
    else:
        category = "Screws"
        screw_category = "Machine Screw"
    
    # Generate description
    description = f"{title} for aerospace applications. {thread_spec}. Manufactured to exact tolerances for critical fastening applications."
    
    # Select manufacturers (vary by type)
    if "Socket" in screw_type or "A286" in title:
        manufacturers = SCREW_MANUFACTURERS[:8]  # Premium manufacturers
    elif "Stud" in screw_type:
        manufacturers = SCREW_MANUFACTURERS[2:8]  # Specialized stud manufacturers
    elif "Metric" in thread_spec or "NA" in part_number:
        manufacturers = SCREW_MANUFACTURERS[4:10]  # Metric specialists
    else:
        manufacturers = SCREW_MANUFACTURERS[1:7]  # Standard manufacturers
    
    return f"""  {{
    id: "{slug}",
    title: "{title}",
    category: "{category}",
    partNumber: "{part_number}",
    modelType: "screw",
    modelFile: "{model_file}",
    screwType: "{screw_category}",
    threadSpec: "{thread_spec}",
    description: "{description}",
    specifications: [
      {{ label: "Part Number", value: "{part_number}" }},
      {{ label: "Type", value: "{screw_type}" }},
      {{ label: "Thread/Size", value: "{thread_spec}" }},
      {{ label: "Category", value: "{screw_category}" }}
    ],
    materials: ["Alloy Steel", "Stainless Steel", "A286 CRES"],
    manufacturers: {manufacturers},
    applications: ["Structural assembly", "Engine mounts", "Panel attachment", "Equipment installation"],
    standards: ["{part_number.split('-')[0]}"]
  }}"""

def main():
    print("// Generated Screw Product Entries")
    print("// Total:", len(SCREWS), "screws\n")
    
    for i, (part_number, title, screw_type, thread_spec) in enumerate(SCREWS):
        entry = generate_product_entry(part_number, title, screw_type, thread_spec)
        print(entry, end="")
        if i < len(SCREWS) - 1:
            print(",")
        else:
            print()
    
    print("\n// End of screw products")

if __name__ == "__main__":
    main()
