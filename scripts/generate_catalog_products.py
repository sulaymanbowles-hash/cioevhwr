#!/usr/bin/env python3
"""
Generate TypeScript product list for all fitting models
"""

# All fitting part numbers
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

def get_fitting_type_description(part_number):
    """Determine fitting type and description based on part number"""
    pn = part_number.upper()
    
    # Straight fittings
    if any(x in pn for x in ['AN774', 'AN775', 'AN814', 'AN815', 'AN816', 'MS24387', 'MS24388']):
        return "Straight Union", "Union coupling for connecting tubes"
    
    # Elbow fittings (90 degree)
    if any(x in pn for x in ['AN822', 'AN823', 'AN826', 'MS20822', 'MS20823', 'MS20826', 'MS21904', 'MS21908', 'AS21904']):
        return "90° Elbow", "90-degree elbow for routing lines"
    
    # Elbow fittings (45 degree)
    if any(x in pn for x in ['AN913', 'MS20913', 'MS21905', 'AS21905']):
        return "45° Elbow", "45-degree angle fitting"
    
    # Tee fittings
    if any(x in pn for x in ['AN932', 'MS21902', 'MS21906', 'AS21902', 'AS21906']):
        return "Tee Fitting", "T-junction for branching lines"
    
    # Cross fittings
    if any(x in pn for x in ['MS21910', 'AS21910']):
        return "Cross Fitting", "4-way cross junction"
    
    # Reducer fittings
    if any(x in pn for x in ['AN817', 'AN821', 'MS21907', 'AS5160', 'AS5161']):
        return "Reducer", "Size adapter for different tube diameters"
    
    # Bulkhead fittings
    if any(x in pn for x in ['AN833', 'AN834', 'MS21911', 'AS21911']):
        return "Bulkhead", "Panel mount fitting"
    
    # Cap/Plug fittings
    if any(x in pn for x in ['AN806', 'AN807', 'MS21909', 'AS21909', 'AS4370']):
        return "Cap/Plug", "End cap or plug fitting"
    
    # Adapter fittings (most common - flared connections)
    return "Adapter", "Hydraulic adapter fitting"

def get_material(part_number):
    """Determine material based on part number prefix"""
    if part_number.startswith('AS'):
        return "Stainless Steel"
    elif part_number.startswith('MS'):
        return "Aluminum"
    else:  # AN
        return "Brass"

def generate_product_entry(part_number, index):
    """Generate TypeScript product object"""
    fitting_type, description = get_fitting_type_description(part_number)
    material = get_material(part_number)
    
    # Create slug
    slug = part_number.lower().replace('/', '-')
    
    # Format title
    title = f"{fitting_type} {part_number}"
    
    return f"""  {{
    title: "{title}",
    category: "Fittings",
    partNumber: "{part_number}",
    modelFile: "{part_number.lower()}.glb",
    slug: "{slug}",
    material: "{material}",
    threadType: "NPT",
    specification: "{part_number} - Aerospace Fitting",
    description: "{description}"
  }}"""

def main():
    """Generate all product entries"""
    print("// AUTO-GENERATED FITTING PRODUCTS - DO NOT EDIT MANUALLY")
    print("// Generated from generate_catalog_products.py\n")
    
    products = []
    for i, part_number in enumerate(FITTING_PART_NUMBERS):
        products.append(generate_product_entry(part_number, i))
    
    print(",\n".join(products))
    print(f"\n// Total: {len(products)} fitting products")

if __name__ == "__main__":
    main()
