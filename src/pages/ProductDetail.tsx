import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Shield, Truck, FileText, ShoppingCart, Factory, Tag, Phone, Mail } from "lucide-react";
import { Product3DViewer } from "../components/ui/Product3DViewer";
import { TechLabel } from "../components/ui/TechLabel";
import { useState } from "react";
import { useQuoteStore } from "../stores/quoteStore";

interface ProductInfo {
  title: string;
  category: string;
  partNumber: string;
  modelType: "bolt" | "nut" | "fitting" | "pin" | "screw";
  modelFile: string;
  description: string;
  specifications: { label: string; value: string }[];
  materials: string[];
  applications: string[];
  standards: string[];
  manufacturers?: string[];
  fittingType?: string;
  screwType?: string;
  boltType?: string;
}

const productsData: Record<string, ProductInfo> = {
  "titanium-hex-bolt": {
    title: "Titanium Hex Bolt",
    category: "Bolts",
    partNumber: "NAS6204-12",
    modelType: "bolt",
    modelFile: "nas6204-12.glb",
    description: "High-strength titanium hex head bolt designed for critical aerospace structural applications. Features precision machining and full material traceability. Meets or exceeds all NAS standards for dimensional accuracy and mechanical properties.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF-3A" },
      { label: "Length", value: "1.250 inches" },
      { label: "Head Height", value: "0.188 inches" },
      { label: "Tensile Strength", value: "160,000 PSI min" },
      { label: "Shear Strength", value: "95,000 PSI min" },
      { label: "Temperature Range", value: "-65°F to 800°F" }
    ],
    materials: ["Ti-6Al-4V Titanium Alloy", "Grade 5 (AMS 4928)"],
    applications: [
      "Airframe structural joints",
      "Engine mount assemblies",
      "Landing gear components",
      "Wing attachment fittings"
    ],
    standards: ["NAS6204", "MS21250", "AS8879", "AMS 4928"]
  },
  "self-locking-nut": {
    title: "Self-Locking Nut",
    category: "Nuts",
    partNumber: "MS21042-4",
    modelType: "nut",
    modelFile: "ms21042-4.glb",
    description: "All-metal self-locking nut with deformed threads providing reliable vibration resistance. Engineered for high-temperature applications where nylon inserts are unsuitable. Reusable design maintains locking torque through multiple installations.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF-3B" },
      { label: "Height", value: "0.281 inches" },
      { label: "Width Across Flats", value: "0.438 inches" },
      { label: "Proof Load", value: "3,650 lbs min" },
      { label: "Prevailing Torque", value: "5-15 in-lbs" },
      { label: "Temperature Range", value: "-65°F to 450°F" }
    ],
    materials: ["CRES Steel Alloy", "Cadmium Plated per QQ-P-416"],
    applications: [
      "Control surface linkages",
      "Access panel retention",
      "Avionics mounting",
      "Interior structure assembly"
    ],
    standards: ["MS21042", "NAS1291", "AN365", "AS5387"]
  },
  "hydraulic-fitting": {
    title: "Hydraulic Fitting",
    category: "Fittings",
    partNumber: "AN818-4",
    modelType: "fitting",
    modelFile: "an818-4.glb",
    fittingType: "Adapter - Flared Connection",
    description: "Precision hydraulic adapter fitting designed for critical fluid system connections. Manufactured to exact tolerances ensuring leak-free operation under extreme pressures and temperatures. Available in flared, flareless, and standard configurations. Compatible with MIL-PRF-5606 hydraulic fluid and meeting AN, MS, and AS aerospace specifications.",
    specifications: [
      { label: "Connection Type", value: "37° Flare, Male" },
      { label: "Thread Size", value: "7/16-20 UNF-3A" },
      { label: "Tube OD", value: "1/4 inch" },
      { label: "Working Pressure", value: "3,000 PSI" },
      { label: "Burst Pressure", value: "12,000 PSI" },
      { label: "Temperature Range", value: "-65°F to 400°F" }
    ],
    materials: ["Aluminum Alloy 2024-T4", "Anodized per MIL-A-8625", "Stainless Steel (select models)", "Brass (select models)"],
    manufacturers: [
      "Parker Hannifin Corporation",
      "Eaton Aerospace",
      "Safran Aerosystems",
      "Triumph Group",
      "Ametek",
      "Senior Aerospace",
      "TransDigm Group",
      "Meggitt"
    ],
    applications: [
      "Hydraulic brake systems",
      "Flight control actuators",
      "Landing gear systems",
      "Utility hydraulic lines",
      "Fuel system connections",
      "Pneumatic systems"
    ],
    standards: [
      "AN774-AN894 Series",
      "AN910-AN941 Series", 
      "MS20819-MS20826 Series",
      "MS21900-MS21926 Series",
      "AS5160-AS5242 Series",
      "AS21900-AS21945 Series",
      "MS24387-MS24405 Series",
      "MIL-F-18280"
    ]
  },
  "precision-pin": {
    title: "Precision Pin",
    category: "Pins",
    partNumber: "MS16555-2",
    modelType: "pin",
    modelFile: "ms16555-2.glb",
    description: "Ultra-precision dowel pin manufactured to tight tolerances for critical alignment applications. Ground and polished finish ensures consistent fitment. Used in applications requiring precise positioning and load transfer between mating components.",
    specifications: [
      { label: "Diameter", value: "0.0625 inches ±0.0001" },
      { label: "Length", value: "0.500 inches" },
      { label: "Surface Finish", value: "16 RMS max" },
      { label: "Hardness", value: "RC 50-58" },
      { label: "Straightness", value: "0.0005 TIR max" },
      { label: "Material Spec", value: "416 Stainless Steel" }
    ],
    materials: ["416 Stainless Steel", "Passivated per QQ-P-35"],
    applications: [
      "Hinge pin assemblies",
      "Jig and fixture alignment",
      "Precision bearing installations",
      "Structural joint registration"
    ],
    standards: ["MS16555", "AN385", "AS8879", "MIL-P-85490"]
  },
  "hex-head-cap-screw": {
    title: "Hex Head Cap Screw",
    category: "Screws",
    partNumber: "NAS1351-4",
    modelType: "bolt",
    modelFile: "nas1351-4.glb",
    description: "Heavy-duty hex head design for structural applications requiring high tensile strength.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Material", value: "Titanium Grade 5" },
      { label: "Tensile Strength", value: "160,000 PSI" }
    ],
    materials: ["Titanium Ti-6Al-4V"],
    applications: ["Structural assembly", "Engine mounts"],
    standards: ["NAS1351"]
  },
  "nylon-insert-lock-nut": {
    title: "Nylon Insert Lock Nut",
    category: "Nuts",
    partNumber: "MS21044-4",
    modelType: "nut",
    modelFile: "ms21044-4.glb",
    description: "Self-locking nut with nylon insert to prevent loosening under vibration.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Material", value: "303 Stainless Steel" }
    ],
    materials: ["303 Stainless Steel"],
    applications: ["Fastening", "Vibration resistance"],
    standards: ["MS21044"]
  },
  "tube-coupling": {
    title: "Tube Coupling",
    category: "Fittings",
    partNumber: "AN819-4",
    modelType: "fitting",
    modelFile: "an819-4.glb",
    fittingType: "Coupling - Straight Union",
    description: "Coupling sleeve for connecting hydraulic tubing in high-pressure systems.",
    specifications: [
      { label: "Tube OD", value: "1/4 inch" },
      { label: "Material", value: "Brass" }
    ],
    materials: ["CDA 360 Brass"],
    manufacturers: [
      "Parker Hannifin Corporation",
      "Eaton Aerospace",
      "Safran Aerosystems",
      "Triumph Group"
    ],
    applications: ["Hydraulic lines", "Fuel systems"],
    standards: ["AN819"]
  },
  "clevis-pin": {
    title: "Clevis Pin",
    category: "Pins",
    partNumber: "AN392-12",
    modelType: "pin",
    modelFile: "an392-12.glb",
    description: "Structural pin with head and cotter pin hole for secure retention in linkage systems.",
    specifications: [
      { label: "Diameter", value: "0.375 inches" },
      { label: "Material", value: "17-4PH Stainless" }
    ],
    materials: ["17-4PH Stainless Steel"],
    applications: ["Control linkages", "Hinges"],
    standards: ["AN392"]
  },
  "aerospace-hex-bolt": {
    title: "Aerospace Hex Bolt",
    category: "Bolts",
    partNumber: "NAS6204-16",
    modelType: "bolt",
    modelFile: "nas6204-16.glb",
    description: "Extended length titanium hex bolt for deep structural connections.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Length", value: "1.500 inches" }
    ],
    materials: ["Titanium Ti-6Al-4V"],
    applications: ["Airframe structure"],
    standards: ["NAS6204"]
  },
  "castle-nut": {
    title: "Castle Nut",
    category: "Fasteners",
    partNumber: "AN310-4",
    modelType: "nut",
    modelFile: "an310-4.glb",
    description: "Castellated nut designed for use with cotter pins to positively lock the fastener.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Material", value: "CRES 303" }
    ],
    materials: ["Stainless Steel"],
    applications: ["Safety critical joints", "Rotating assemblies"],
    standards: ["AN310"]
  },
  "ms24673-1": {
    title: "Socket Cap Screw",
    category: "Screws",
    partNumber: "MS24673-1",
    modelType: "screw",
    modelFile: "ms24673-1.glb",
    screwType: "Socket Head Cap Screw",
    description: "Socket head cap screw for aerospace structural assembly and engine mounts. Manufactured to exact tolerances for critical fastening applications. Features internal hex drive for high torque applications.",
    specifications: [
      { label: "Thread Size", value: "10-32 UNF" },
      { label: "Drive Type", value: "Hex Socket" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Finish", value: "Black Oxide" }
    ],
    materials: ["Alloy Steel", "Heat Treated"],
    manufacturers: [
      "B & B Specialties",
      "CBS Fasteners Inc.",
      "Ideal Fasteners",
      "Twist Tite Mfg.",
      "Accurate Screw Machine",
      "Apm Hexseal",
      "Zago Manufacturing Company",
      "Crescent Mfg."
    ],
    applications: ["Structural assembly", "Engine mounts", "Panel attachment", "Equipment installation"],
    standards: ["MS24673"]
  },
  "an115-4": {
    title: "Fillister Head Screw",
    category: "Screws",
    partNumber: "AN115-4",
    modelType: "screw",
    modelFile: "an115-4.glb",
    screwType: "Fillister Head Screw",
    description: "Fillister head screw for panel attachment and general aerospace applications. Rounded head profile with straight sides provides positive positioning and enhanced appearance.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Drive Type", value: "Slotted" },
      { label: "Head Style", value: "Fillister" },
      { label: "Material", value: "Carbon Steel" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated"],
    manufacturers: [
      "CBS Fasteners Inc.",
      "Ideal Fasteners",
      "Twist Tite Mfg.",
      "Accurate Screw Machine",
      "Apm Hexseal",
      "Zago Manufacturing Company"
    ],
    applications: ["Panel attachment", "Cover plates", "Interior fittings", "Access doors"],
    standards: ["AN115"]
  },
  "ms51575-1": {
    title: "Shoulder Screw, Slotted",
    category: "Screws",
    partNumber: "MS51575-1",
    modelType: "screw",
    modelFile: "ms51575-1.glb",
    screwType: "Shoulder Screw",
    description: "Shoulder screw with slotted head for precision bearing applications. Unthreaded shoulder section provides accurate shaft diameter for rotating components.",
    specifications: [
      { label: "Shoulder Diameter", value: "0.250 inches" },
      { label: "Thread Size", value: "10-32 UNF" },
      { label: "Drive Type", value: "Slotted" },
      { label: "Material", value: "Alloy Steel" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Black Oxide Finish"],
    manufacturers: [
      "CBS Fasteners Inc.",
      "Ideal Fasteners",
      "Twist Tite Mfg.",
      "Accurate Screw Machine",
      "Mac Fasteners",
      "SPS Fasteners"
    ],
    applications: ["Bearing mounts", "Linkage pivots", "Rotating assemblies", "Precision mechanisms"],
    standards: ["MS51575"]
  },
  "nas1216-4": {
    title: "Pan Head Screw, Full Thread",
    category: "Screws",
    partNumber: "NAS1216-4",
    modelType: "screw",
    modelFile: "nas1216-4.glb",
    screwType: "Pan Head Screw",
    description: "Pan head screw with full thread length and offset cruciform recess. Designed for general purpose fastening with improved torque transfer and reduced cam-out.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Drive Type", value: "Offset Cruciform" },
      { label: "Thread Length", value: "Full Length" },
      { label: "Material", value: "Carbon Steel" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated"],
    manufacturers: [
      "CBS Fasteners Inc.",
      "Ideal Fasteners",
      "Accurate Screw Machine",
      "Apm Hexseal",
      "Mac Fasteners",
      "SPS Fasteners"
    ],
    applications: ["Panel fastening", "Equipment mounting", "General assembly", "Interior components"],
    standards: ["NAS1216"]
  },
  "nas583-4": {
    title: "100° Flush Head Screw, Close Tolerance",
    category: "Screws",
    partNumber: "NAS583-4",
    modelFile: "nas583-4.glb",
    modelType: "screw",
    screwType: "Flush Head Screw",
    description: "Close tolerance 100-degree countersunk head screw for aerodynamically smooth installations. Precision machined for flush mounting in critical surface applications.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Head Angle", value: "100 degrees" },
      { label: "Drive Type", value: "Phillips" },
      { label: "Tolerance", value: "Close" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "CBS Fasteners Inc.",
      "Ideal Fasteners",
      "Twist Tite Mfg.",
      "Accurate Screw Machine",
      "Apm Hexseal",
      "Mac Fasteners"
    ],
    applications: ["Aerodynamic surfaces", "Skin panels", "Flush mounting", "External fairings"],
    standards: ["NAS583"]
  },
  "an126-4": {
    title: "Straight Stud",
    category: "Screws",
    partNumber: "AN126-4",
    modelType: "screw",
    modelFile: "an126-4.glb",
    screwType: "Stud",
    description: "Straight threaded stud for permanent or semi-permanent installations. Available drilled or undrilled for safety wire applications.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Both Ends" },
      { label: "Configuration", value: "Straight" },
      { label: "Material", value: "Carbon Steel" }
    ],
    materials: ["Carbon Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Ideal Fasteners",
      "Twist Tite Mfg.",
      "Accurate Screw Machine",
      "Apm Hexseal",
      "Mac Fasteners",
      "SPS Fasteners"
    ],
    applications: ["Through-hole mounting", "Double-sided fastening", "Spacer mounting", "Equipment installation"],
    standards: ["AN126"]
  },
  "an173-4": {
    title: "Hex Head Bolt",
    category: "Bolts",
    partNumber: "AN173-4",
    modelType: "bolt",
    modelFile: "an173-4.glb",
    boltType: "Hex Head",
    description: "Standard AN-series hex head bolt with cadmium plating for corrosion resistance. Suitable for general structural applications in aircraft assembly.",
    specifications: [
      { label: "Thread Size", value: "3/16-24 UNC" },
      { label: "Thread Length", value: "Full Length" },
      { label: "Head Type", value: "Hexagon" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated", "Heat Treated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision",
      "3V Fastening Company Inc.",
      "California Screw Products",
      "MacLean Sky"
    ],
    applications: ["Structural assembly", "Panel attachment", "Equipment mounting", "General aircraft assembly"],
    standards: ["AN173", "MIL-B-8831"]
  },
  "nas1003-4": {
    title: "Hex Head Bolt",
    category: "Bolts",
    partNumber: "NAS1003-4",
    modelType: "bolt",
    modelFile: "nas1003-4.glb",
    boltType: "Hex Head",
    description: "NAS-series hex head bolt available drilled or undrilled for safety wire applications. High-strength alloy steel construction for critical aircraft structures.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Standard" },
      { label: "Head Type", value: "Hexagon" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Strength", value: "High Strength" },
      { label: "Drilling", value: "Optional" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision",
      "3V Fastening Company Inc.",
      "Fastener Innovation Technology"
    ],
    applications: ["High-stress structural joints", "Engine mounting", "Landing gear assembly", "Safety-critical applications"],
    standards: ["NAS1003", "MIL-DTL-1222"]
  },
  "ms14181-4": {
    title: "12-Point Tension Bolt",
    category: "Bolts",
    partNumber: "MS14181-4",
    modelType: "bolt",
    modelFile: "ms14181-4.glb",
    boltType: "12-Point Head",
    description: "High-strength 12-point tension bolt rated at 220 ksi for extreme load applications. Designed for high-stress structural joints requiring maximum torque capacity.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Partial" },
      { label: "Head Type", value: "12-Point" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Tensile Strength", value: "220 ksi" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Alloy Steel (4037/4137)", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision",
      "3V Fastening Company Inc."
    ],
    applications: ["Engine mounts", "Landing gear", "Wing attach points", "High-stress structural joints"],
    standards: ["MS14181", "MIL-B-8831"]
  },
  "nas1271-4": {
    title: "12-Point Head Bolt",
    category: "Bolts",
    partNumber: "NAS1271-4",
    modelType: "bolt",
    modelFile: "nas1271-4.glb",
    boltType: "12-Point Head",
    description: "NAS-series 12-point head bolt available drilled or undrilled. Provides superior torque transfer with 12-point head design, suitable for high-vibration environments.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Standard" },
      { label: "Head Type", value: "12-Point" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Tensile Strength", value: "180 ksi" },
      { label: "Drilling", value: "Optional" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision",
      "California Screw Products",
      "Fastener Innovation Technology"
    ],
    applications: ["High-torque applications", "Vibration-resistant assembly", "Engine components", "Control surface attachment"],
    standards: ["NAS1271", "MIL-B-8831"]
  },
  "nas1083-4": {
    title: "100° Flush Head Bolt Close Tolerance",
    category: "Bolts",
    partNumber: "NAS1083-4",
    modelType: "bolt",
    modelFile: "nas1083-4.glb",
    boltType: "Flush Head",
    description: "100° countersunk flush head bolt with close tolerance shank for precision fit. Ideal for aerodynamic surfaces requiring flush installation.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Partial" },
      { label: "Head Type", value: "100° Flush" },
      { label: "Head Angle", value: "100 degrees" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Tolerance", value: "Close Tolerance Shank" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision",
      "MacLean Sky"
    ],
    applications: ["Wing skins", "Fuselage panels", "Aerodynamic surfaces", "Flush-mount requirements"],
    standards: ["NAS1083", "MIL-DTL-1222"]
  },
  "nas1728-4": {
    title: "Pan Head Bolt Taper-Lok",
    category: "Bolts",
    partNumber: "NAS1728-4",
    modelType: "bolt",
    modelFile: "nas1728-4.glb",
    boltType: "Pan Head",
    description: "Pan head bolt with tapered shank (Taper-Lok) for interference fit. Provides enhanced grip and vibration resistance in panel mounting applications.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Partial" },
      { label: "Head Type", value: "Pan Head" },
      { label: "Shank", value: "Tapered (Taper-Lok)" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "Alloy Steel" }
    ],
    materials: ["Alloy Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "3V Fastening Company Inc.",
      "Fastener Innovation Technology"
    ],
    applications: ["Panel fastening", "Cover plates", "Interior panels", "Equipment mounting"],
    standards: ["NAS1728"]
  },
  "an21-10": {
    title: "Clevis Bolt",
    category: "Bolts",
    partNumber: "AN21-10",
    modelType: "bolt",
    modelFile: "an21-10.glb",
    boltType: "Clevis",
    description: "Clevis bolt with round head and drilled shank for cotter pin retention. Designed for pivoting applications in flight control linkages.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNC" },
      { label: "Thread Length", value: "Partial" },
      { label: "Head Type", value: "Round Head" },
      { label: "Length", value: "1.25 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Drilling", value: "Cotter Pin Hole" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "Reid Products",
      "Houston Precision",
      "3V Fastening Company Inc.",
      "California Screw Products"
    ],
    applications: ["Control linkages", "Pivoting assemblies", "Flight control systems", "Rod end connections"],
    standards: ["AN21", "MIL-B-7838"]
  },
  "an42-4": {
    title: "Eye Bolt",
    category: "Bolts",
    partNumber: "AN42-4",
    modelType: "bolt",
    modelFile: "an42-4.glb",
    boltType: "Eye",
    description: "Eye bolt with forged loop head for lifting, rigging, and tie-down applications. Provides secure attachment point for cables, chains, and straps.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNC" },
      { label: "Thread Length", value: "Partial" },
      { label: "Head Type", value: "Eye/Loop" },
      { label: "Eye Inner Diameter", value: "0.50 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Forged", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "Reid Products",
      "Houston Precision",
      "California Screw Products"
    ],
    applications: ["Aircraft tie-down", "Lifting points", "Cable attachment", "Rigging applications"],
    standards: ["AN42", "MIL-B-7838"]
  },
  "nas6303-4": {
    title: "Hex Head Bolt A286",
    category: "Bolts",
    partNumber: "NAS6303-4",
    modelType: "bolt",
    modelFile: "nas6303-4.glb",
    boltType: "Hex Head",
    description: "A286 CRES hex head bolt for high-temperature applications. Maintains strength at elevated temperatures, ideal for engine and exhaust system mounting.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Thread Length", value: "Standard" },
      { label: "Head Type", value: "Hexagon" },
      { label: "Length", value: "1/2 inch" },
      { label: "Material", value: "A286 CRES" },
      { label: "Temperature Range", value: "Up to 1200°F" }
    ],
    materials: ["A286 CRES (Stainless Steel)", "Heat Treated", "Corrosion Resistant"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products",
      "Houston Precision"
    ],
    applications: ["Engine mounting", "Exhaust systems", "High-temperature structures", "Turbine components"],
    standards: ["NAS6303", "MIL-DTL-1222"]
  },
  
  // ========== PINS SECTION ==========
  
  "ms24665-4": {
    title: "Cotter Pin",
    category: "Pins",
    partNumber: "MS24665-4",
    modelType: "pin",
    modelFile: "ms24665-4.glb",
    description: "Standard cotter pin with cadmium plating for securing castle nuts and clevis pins. Split design allows insertion through drilled shafts and self-locks when legs are bent.",
    specifications: [
      { label: "Wire Diameter", value: "0.072 inches" },
      { label: "Extended Length", value: "1.0 inch" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" },
      { label: "Type", value: "Split Pin" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated", "Corrosion Resistant Coating"],
    manufacturers: [
      "Spirol International",
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "Western Wire",
      "Houston Precision"
    ],
    applications: ["Castle nut retention", "Clevis pin locking", "Safety wiring", "Fastener retention"],
    standards: ["MS24665", "MIL-DTL-24665"]
  },
  "ms9245-3": {
    title: "Cotter Pin CRES",
    category: "Pins",
    partNumber: "MS9245-3",
    modelFile: "ms9245-3.glb",
    description: "Corrosion resistant steel (CRES) cotter pin for high-corrosion environments. Stainless construction provides superior durability in marine and chemical exposure.",
    specifications: [
      { label: "Wire Diameter", value: "0.062 inches" },
      { label: "Extended Length", value: "0.75 inch" },
      { label: "Material", value: "CRES 302/304" },
      { label: "Finish", value: "Passivated" },
      { label: "Type", value: "Split Pin" }
    ],
    materials: ["Stainless Steel CRES", "Passivated", "Non-Magnetic"],
    manufacturers: [
      "Spirol International",
      "Howmet Aerospace",
      "Western Wire",
      "Acufast Aircraft Products"
    ],
    applications: ["Marine aircraft", "Corrosive environments", "High-moisture areas", "Salt spray exposure"],
    standards: ["MS9245", "AS9245", "MIL-DTL-24665"]
  },
  "ms16555-100": {
    title: "Dowel Pin Hardened",
    category: "Pins",
    partNumber: "MS16555-100",
    modelFile: "ms16555-100.glb",
    description: "Precision hardened and ground dowel pin for exact alignment of mating parts. Cylindrical pin with tight diameter tolerance ensures accurate component positioning.",
    specifications: [
      { label: "Diameter", value: "0.1875 inches (3/16\")" },
      { label: "Length", value: "0.500 inches" },
      { label: "Tolerance", value: "+0.0001/-0.0000" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Hardness", value: "HRC 58-62" },
      { label: "Finish", value: "Ground" }
    ],
    materials: ["Alloy Steel", "Hardened", "Precision Ground"],
    manufacturers: [
      "Spirol International",
      "Howmet Aerospace",
      "Western Wire",
      "Houston Precision",
      "California Screw Products"
    ],
    applications: ["Precision alignment", "Assembly jigs", "Tooling", "Structural joints"],
    standards: ["MS16555", "MIL-DTL-16555"]
  },
  "ms16562-4": {
    title: "Dowel Pin Standard",
    category: "Pins",
    partNumber: "MS16562-4",
    modelFile: "ms16562-4.glb",
    description: "Standard tolerance dowel pin for general alignment applications. Economical solution for non-critical positioning requirements.",
    specifications: [
      { label: "Diameter", value: "0.125 inches (1/8\")" },
      { label: "Length", value: "0.625 inches" },
      { label: "Tolerance", value: "Standard" },
      { label: "Material", value: "Steel" },
      { label: "Finish", value: "Plain" }
    ],
    materials: ["Carbon Steel", "Heat Treated"],
    manufacturers: [
      "Spirol International",
      "Western Wire",
      "Acufast Aircraft Products"
    ],
    applications: ["General alignment", "Assembly", "Component positioning"],
    standards: ["MS16562", "MIL-DTL-16562"]
  },
  "d25": {
    title: "Precision Dowel D Series",
    category: "Pins",
    partNumber: "D25",
    modelFile: "d25.glb",
    description: "High precision ground dowel pin with ultra-tight tolerances for critical alignment. Premium quality for tooling and precision assembly applications.",
    specifications: [
      { label: "Diameter", value: "0.250 inches (1/4\")" },
      { label: "Length", value: "0.750 inches" },
      { label: "Tolerance", value: "±0.00005" },
      { label: "Material", value: "Tool Steel" },
      { label: "Hardness", value: "HRC 60-64" },
      { label: "Finish", value: "Precision Ground" },
      { label: "Surface Roughness", value: "8 μin Ra" }
    ],
    materials: ["Tool Steel", "Hardened & Ground", "Black Oxide"],
    manufacturers: [
      "Spirol International",
      "Western Wire",
      "Houston Precision"
    ],
    applications: ["Precision tooling", "Jig & fixture alignment", "Machine alignment", "Critical assemblies"],
    standards: ["D Series Precision"]
  },
  "ms17430-100": {
    title: "Spring Pin Coiled",
    category: "Pins",
    partNumber: "MS17430-100",
    modelFile: "ms17430-100.glb",
    description: "Coiled spring pin that compresses upon insertion for secure fit in drilled holes. Self-retaining design eliminates need for additional fasteners.",
    specifications: [
      { label: "Diameter", value: "0.1875 inches" },
      { label: "Length", value: "1.00 inches" },
      { label: "Material", value: "Spring Steel" },
      { label: "Type", value: "Coiled" },
      { label: "Shear Strength", value: "4,500 lbs" }
    ],
    materials: ["Spring Steel", "Heat Treated", "Oil Quenched"],
    manufacturers: [
      "Spirol International",
      "Howmet Aerospace",
      "Western Wire",
      "Acufast Aircraft Products"
    ],
    applications: ["Quick assembly", "Removable fastening", "Pivot pins", "Shaft retention"],
    standards: ["MS17430", "MIL-DTL-24576"]
  },
  "ms9047-4": {
    title: "Spring Pin Slotted",
    category: "Pins",
    partNumber: "MS9047-4",
    modelFile: "ms9047-4.glb",
    description: "Slotted tubular spring pin with chamfered ends. Compresses radially to fit hole, providing vibration resistance and secure retention.",
    specifications: [
      { label: "Diameter", value: "0.125 inches" },
      { label: "Length", value: "0.625 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Type", value: "Slotted" },
      { label: "Finish", value: "Black Oxide" }
    ],
    materials: ["Carbon Steel", "Heat Treated", "Black Oxide Finish"],
    manufacturers: [
      "Spirol International",
      "Western Wire",
      "Howmet Aerospace"
    ],
    applications: ["Mechanical assemblies", "Link connections", "Hinges", "Lever pivots"],
    standards: ["MS9047", "MIL-DTL-24576"]
  },
  "nas561-5": {
    title: "Spring Pin CRES",
    category: "Pins",
    partNumber: "NAS561-5",
    modelFile: "nas561-5.glb",
    description: "Corrosion resistant stainless steel spring pin for harsh environment applications. Maintains spring properties in high-moisture and chemical exposure.",
    specifications: [
      { label: "Diameter", value: "0.156 inches" },
      { label: "Length", value: "0.750 inches" },
      { label: "Material", value: "CRES 302" },
      { label: "Type", value: "Slotted" },
      { label: "Finish", value: "Passivated" }
    ],
    materials: ["Stainless Steel CRES", "Passivated", "Non-Magnetic"],
    manufacturers: [
      "Spirol International",
      "Howmet Aerospace",
      "Western Wire"
    ],
    applications: ["Marine aircraft", "Corrosive environments", "Food processing equipment", "Chemical exposure"],
    standards: ["NAS561", "MIL-DTL-24576"]
  },
  "ms20253-4": {
    title: "Clevis Pin",
    category: "Pins",
    partNumber: "MS20253-4",
    modelFile: "ms20253-4.glb",
    description: "Standard clevis pin with head and cotter pin hole for securing pivoting connections. Cadmium plated for corrosion protection in control linkages.",
    specifications: [
      { label: "Diameter", value: "0.250 inches" },
      { label: "Grip Length", value: "0.625 inches" },
      { label: "Head Diameter", value: "0.375 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" },
      { label: "Cotter Hole", value: "0.047 inches" },
      { label: "Shear Strength", value: "6,800 lbs" }
    ],
    materials: ["Carbon Steel", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "Reid Products",
      "Houston Precision",
      "California Screw Products"
    ],
    applications: ["Flight control linkages", "Landing gear connections", "Door hinges", "Actuator attachments"],
    standards: ["MS20253", "MIL-DTL-24665"]
  },
  "nas607-4": {
    title: "Clevis Pin NAS",
    category: "Pins",
    partNumber: "NAS607-4",
    modelFile: "nas607-4.glb",
    description: "NAS standard clevis pin with enlarged head for higher bearing loads. Precision machined for critical aerospace applications.",
    specifications: [
      { label: "Diameter", value: "0.250 inches" },
      { label: "Grip Length", value: "0.750 inches" },
      { label: "Head Diameter", value: "0.438 inches" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Finish", value: "Cadmium Plated" },
      { label: "Tensile Strength", value: "125 ksi min" }
    ],
    materials: ["Alloy Steel 8740", "Heat Treated", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "GS Aerospace",
      "Reid Products"
    ],
    applications: ["Heavy duty linkages", "Landing gear", "Primary structures", "High-load pivots"],
    standards: ["NAS607", "MIL-DTL-1222"]
  },
  "an122690": {
    title: "Clevis Pin AN Series",
    category: "Pins",
    partNumber: "AN122690",
    modelFile: "an122690.glb",
    description: "AN standard clevis pin with drilled shank for cotter pin retention. Proven design for general aviation and commercial aircraft applications.",
    specifications: [
      { label: "Diameter", value: "0.1875 inches" },
      { label: "Grip Length", value: "0.688 inches" },
      { label: "Head Type", value: "Flat Head" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Acufast Aircraft Products",
      "Reid Products",
      "California Screw Products"
    ],
    applications: ["Control surfaces", "General linkages", "Light duty pivots", "Maintenance rigging"],
    standards: ["AN122", "MIL-B-7838"]
  },

  // ========== NUTS SECTION ==========

  "an310-4": {
    title: "Castle Nut",
    category: "Nuts",
    partNumber: "AN310-4",
    modelFile: "an310-4.glb",
    description: "Standard castle nut with slotted crown for cotter pin retention. Essential for securing bolts in critical safety applications where positive locking is required.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.281 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Finish", value: "Cadmium Plated" },
      { label: "Castle Slots", value: "6" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated", "Heat Treated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "Bristol Industries",
      "Automatic Screw Machine Products",
      "SPS Technologies"
    ],
    applications: ["Flight control linkages", "Landing gear", "Propeller attachments", "Structural connections"],
    standards: ["AN310", "MIL-DTL-18240"]
  },
  "ms20365-4": {
    title: "Castle Nut Cadmium Plated",
    category: "Nuts",
    partNumber: "MS20365-4",
    modelFile: "ms20365-4.glb",
    description: "Military standard castle nut with superior corrosion protection. Slotted crown design allows cotter pin insertion for positive locking.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.281 inches" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Finish", value: "Cadmium Plated" },
      { label: "Torque Value", value: "40-60 in-lbs" }
    ],
    materials: ["Alloy Steel 8740", "Cadmium Plated", "Heat Treated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "SPS Technologies",
      "Bristol Industries"
    ],
    applications: ["Safety critical fastening", "Control systems", "High-vibration areas", "Landing gear assemblies"],
    standards: ["MS20365", "MIL-DTL-18240"]
  },
  "ms21042-4": {
    title: "Self-Locking Nut Aluminum",
    category: "Nuts",
    partNumber: "MS21042-4",
    modelFile: "ms21042-4.glb",
    description: "Lightweight aluminum self-locking nut with non-metallic insert. Nylon collar provides vibration resistance without requiring safety wiring.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.219 inches" },
      { label: "Material", value: "2024-T4 Aluminum" },
      { label: "Insert Material", value: "Nylon" },
      { label: "Temperature Range", value: "-67°F to +250°F" },
      { label: "Reusability", value: "15 cycles" }
    ],
    materials: ["2024-T4 Aluminum Alloy", "Nylon Insert", "Anodized"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "SPS Technologies",
      "Bristol Industries",
      "Automatic Screw Machine Products"
    ],
    applications: ["Airframe structures", "Non-critical fastening", "Weight-sensitive applications", "Interior assemblies"],
    standards: ["MS21042", "NAS1291", "MIL-DTL-21042"]
  },
  "ms21043-4": {
    title: "Self-Locking Nut CRES",
    category: "Nuts",
    partNumber: "MS21043-4",
    modelFile: "ms21043-4.glb",
    description: "Corrosion-resistant stainless steel self-locking nut with nylon insert. Ideal for high-moisture environments and marine applications.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.219 inches" },
      { label: "Material", value: "CRES 303" },
      { label: "Insert Material", value: "Nylon" },
      { label: "Temperature Range", value: "-67°F to +250°F" },
      { label: "Corrosion Resistance", value: "Excellent" }
    ],
    materials: ["CRES 303 Stainless Steel", "Nylon Insert", "Passivated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "SPS Technologies",
      "Bristol Industries"
    ],
    applications: ["Marine aircraft", "Corrosive environments", "Exhaust systems", "High-humidity areas"],
    standards: ["MS21043", "MIL-DTL-21042"]
  },
  "ms21044-4": {
    title: "Self-Locking Nut Steel",
    category: "Nuts",
    partNumber: "MS21044-4",
    modelFile: "ms21044-4.glb",
    description: "Heavy-duty steel self-locking nut with nylon insert for high-strength applications. UNC threads provide better vibration resistance.",
    specifications: [
      { label: "Thread Size", value: "1/4-20 UNC" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.235 inches" },
      { label: "Material", value: "Carbon Steel" },
      { label: "Insert Material", value: "Nylon" },
      { label: "Tensile Strength", value: "120,000 psi min" }
    ],
    materials: ["Carbon Steel", "Nylon Insert", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "SPS Technologies",
      "Bristol Industries"
    ],
    applications: ["Structural fastening", "High-load applications", "Engine mounts", "Heavy equipment"],
    standards: ["MS21044", "MIL-DTL-21042"]
  },
  "an365-4": {
    title: "Self-Locking Nut AN Series",
    category: "Nuts",
    partNumber: "AN365-4",
    modelFile: "an365-4.glb",
    description: "AN standard elastic stop nut with fiber collar insert. Proven design for general aviation applications requiring vibration resistance.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.203 inches" },
      { label: "Material", value: "Steel" },
      { label: "Insert Type", value: "Fiber Collar" },
      { label: "Reusability", value: "Limited" }
    ],
    materials: ["Carbon Steel", "Fiber Insert", "Cadmium or Zinc Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "Bristol Industries",
      "SPS Technologies"
    ],
    applications: ["General aviation", "Light aircraft", "Experimental aircraft", "Maintenance operations"],
    standards: ["AN365", "MIL-DTL-18240"]
  },
  "nas1021-4": {
    title: "Self-Locking Hex Nut NAS",
    category: "Nuts",
    partNumber: "NAS1021-4",
    modelFile: "nas1021-4.glb",
    description: "NAS standard self-locking hex nut with metallic locking feature. Superior temperature range compared to nylon insert nuts.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.219 inches" },
      { label: "Material", value: "Alloy Steel" },
      { label: "Locking Type", value: "All-Metal" },
      { label: "Temperature Range", value: "-100°F to +550°F" }
    ],
    materials: ["Alloy Steel", "All-Metal Locking", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "SPS Technologies",
      "MacLean-ESNA"
    ],
    applications: ["High-temperature areas", "Engine compartments", "Exhaust systems", "Critical fastening"],
    standards: ["NAS1021", "MIL-DTL-1222"]
  },
  "an315-4": {
    title: "Wing Nut",
    category: "Nuts",
    partNumber: "AN315-4",
    modelFile: "an315-4.glb",
    description: "Standard wing nut for hand-tightening applications. Wings provide leverage for tool-free installation and removal.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Wing Span", value: "0.875 inches" },
      { label: "Body Height", value: "0.156 inches" },
      { label: "Material", value: "Steel" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated"],
    manufacturers: [
      "Automatic Screw Machine Products",
      "Bristol Industries",
      "Howmet Aerospace"
    ],
    applications: ["Access panels", "Quick-removal covers", "Cowling fasteners", "Battery connections"],
    standards: ["AN315", "MIL-DTL-18240"]
  },
  "ms21047-4": {
    title: "Flange Lock Nut",
    category: "Nuts",
    partNumber: "MS21047-4",
    modelFile: "ms21047-4.glb",
    description: "Self-locking flange nut with integral washer. Flange distributes load while nylon insert provides locking action.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Flange Diameter", value: "0.625 inches" },
      { label: "Overall Height", value: "0.250 inches" },
      { label: "Material", value: "Steel" },
      { label: "Insert Material", value: "Nylon" }
    ],
    materials: ["Alloy Steel", "Nylon Insert", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "MacLean-ESNA",
      "SPS Technologies"
    ],
    applications: ["Sheet metal attachments", "Composite structures", "Load distribution", "Avionics mounting"],
    standards: ["MS21047", "NAS1473"]
  },
  "nas1473-4": {
    title: "Flange Nut NAS",
    category: "Nuts",
    partNumber: "NAS1473-4",
    modelFile: "nas1473-4.glb",
    description: "NAS standard floating self-locking flange nut. Flange rotates freely to accommodate misalignment while maintaining secure locking.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Flange Diameter", value: "0.625 inches" },
      { label: "Material", value: "Steel" },
      { label: "Floating Design", value: "Yes" },
      { label: "Locking Type", value: "All-Metal" }
    ],
    materials: ["Alloy Steel", "All-Metal Locking", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "SPS Technologies",
      "MacLean-ESNA"
    ],
    applications: ["Floating nutplates", "Misalignment compensation", "Panel attachments", "Access doors"],
    standards: ["NAS1473", "MIL-DTL-25027"]
  },
  "an320-4": {
    title: "Slotted Shear Nut",
    category: "Nuts",
    partNumber: "AN320-4",
    modelFile: "an320-4.glb",
    description: "Thin slotted shear nut for rod end assemblies. Slots allow cotter pin safety without the bulk of a castle nut.",
    specifications: [
      { label: "Thread Size", value: "1/4-28 UNF" },
      { label: "Across Flats", value: "0.438 inches" },
      { label: "Height", value: "0.125 inches" },
      { label: "Material", value: "Steel" },
      { label: "Finish", value: "Cadmium Plated" }
    ],
    materials: ["Carbon Steel", "Cadmium Plated"],
    manufacturers: [
      "Howmet Aerospace",
      "Bristol Industries",
      "Automatic Screw Machine Products"
    ],
    applications: ["Rod end bearings", "Control linkages", "Turnbuckles", "Shear load applications"],
    standards: ["AN320", "MIL-DTL-18240"]
  },
  "elbow-fitting-90": {
    title: "Elbow Fitting 90°",
    category: "Fluid Systems",
    partNumber: "MS21904-4",
    modelType: "fitting",
    modelFile: "ms21904-4.glb",
    description: "90-degree elbow fitting for routing fluid lines in tight spaces.",
    specifications: [
      { label: "Angle", value: "90 degrees" },
      { label: "Tube OD", value: "1/4 inch" }
    ],
    materials: ["2024-T4 Aluminum"],
    applications: ["Hydraulic routing", "Fuel lines"],
    standards: ["MS21904"]
  },
  "dowel-pin": {
    title: "Dowel Pin",
    category: "Alignment",
    partNumber: "MS16555-4",
    modelType: "pin",
    modelFile: "ms16555-4.glb",
    description: "Precision ground dowel pin for exact alignment of mating components.",
    specifications: [
      { label: "Diameter", value: "0.125 inches" },
      { label: "Material", value: "Stainless Steel" }
    ],
    materials: ["Stainless Steel"],
    applications: ["Precision alignment"],
    standards: ["MS16555"]
  },
  "socket-head-cap-screw": {
    title: "Socket Head Cap Screw",
    category: "Structural",
    partNumber: "NAS1352-5",
    modelType: "bolt",
    modelFile: "nas1352-5.glb",
    description: "High-strength screw with internal socket drive for compact installation.",
    specifications: [
      { label: "Thread Size", value: "5/16-24 UNF" },
      { label: "Drive", value: "Hex Socket" }
    ],
    materials: ["Titanium Grade 5"],
    applications: ["Internal assemblies", "Access panels"],
    standards: ["NAS1352"]
  },
  "all-metal-lock-nut": {
    title: "All-Metal Lock Nut",
    category: "Fasteners",
    partNumber: "MS21042-6",
    modelType: "nut",
    modelFile: "ms21042-6.glb",
    description: "Lightweight, all-metal self-locking nut for high-temperature applications.",
    specifications: [
      { label: "Thread Size", value: "3/8-24 UNF" },
      { label: "Temp Rating", value: "450°F" }
    ],
    materials: ["Aluminum Alloy"],
    applications: ["Engine bays", "High temp zones"],
    standards: ["MS21042"]
  },
  "straight-union": {
    title: "Straight Union",
    category: "Fluid Systems",
    partNumber: "AN815-6",
    modelType: "fitting",
    modelFile: "an815-6.glb",
    description: "Standard straight union for connecting two fluid lines of equal size.",
    specifications: [
      { label: "Tube OD", value: "3/8 inch" },
      { label: "Material", value: "Brass" }
    ],
    materials: ["CDA 360 Brass"],
    applications: ["Fluid line extension"],
    standards: ["AN815"]
  },
  "taper-pin": {
    title: "Taper Pin",
    category: "Alignment",
    partNumber: "AN385-3",
    modelType: "pin",
    modelFile: "an385-3.glb",
    description: "Tapered pin for self-tightening alignment and secure positioning.",
    specifications: [
      { label: "Taper", value: "0.250 in/ft" },
      { label: "Material", value: "Stainless Steel" }
    ],
    materials: ["Stainless Steel"],
    applications: ["Shaft coupling", "Gear location"],
    standards: ["AN385"]
  }
};

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useQuoteStore();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = slug ? productsData[slug] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* 3D Viewer Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 self-start"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg border border-gray-200 shadow-xl overflow-hidden">
              <Product3DViewer type={product.modelType} modelPath={product.modelFile} />
            </div>
            <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <TechLabel className="mb-4 block">Interactive 3D Model</TechLabel>
              <p className="text-sm text-gray-600">
                Click and drag to rotate. This is a detailed 3D representation of the actual component.
              </p>
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TechLabel className="mb-4">{product.category}</TechLabel>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-gray-900">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-lg text-gray-700">Part #: {product.partNumber}</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                In Stock
              </span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {product.description}
            </p>

            {/* Fitting Type (for fittings only) */}
            {product.fittingType && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Fitting Type
                </h2>
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <span className="text-lg font-semibold text-blue-900">{product.fittingType}</span>
                </div>
              </div>
            )}

            {/* Screw Type (for screws only) */}
            {product.screwType && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Screw Type
                </h2>
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <span className="text-lg font-semibold text-green-900">{product.screwType}</span>
                </div>
              </div>
            )}

            {/* Bolt Type (for bolts only) */}
            {product.boltType && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Bolt Type
                </h2>
                <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                  <span className="text-lg font-semibold text-orange-900">{product.boltType}</span>
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded border border-gray-200">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      {spec.label}
                    </div>
                    <div className="font-mono text-sm font-medium text-gray-900">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Materials & Finish
              </h2>
              <ul className="space-y-2">
                {product.materials.map((material, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Manufacturers (for fittings) */}
            {product.manufacturers && product.manufacturers.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  Approved Manufacturers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.manufacturers.map((manufacturer, i) => (
                    <div key={i} className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                      <span className="text-sm font-medium text-gray-900">{manufacturer}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600 italic">
                  All manufacturers meet or exceed aerospace quality standards and are approved for use in critical applications.
                </p>
              </div>
            )}

            {/* Applications */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Typical Applications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.applications.map((app, i) => (
                  <div key={i} className="p-3 bg-white border border-gray-200 rounded text-sm text-gray-700">
                    {app}
                  </div>
                ))}
              </div>
            </div>

            {/* Standards */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Compliance Standards
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.standards.map((standard, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-black text-white text-xs font-mono rounded"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to RFQ Section */}
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black px-8 py-6">
                <h3 className="text-2xl font-bold text-white mb-2">Request a Quote</h3>
                <p className="text-gray-300 text-sm">
                  Add to your RFQ cart or contact our sales team for pricing and lead times.
                </p>
              </div>

              {/* Main Content */}
              <div className="bg-white px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-24 px-4 py-3 border-2 border-gray-300 rounded-lg text-center font-mono text-lg font-semibold focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          addItem({ partNumber: product.partNumber, title: product.title });
                        }
                        setAddedToCart(true);
                        setTimeout(() => setAddedToCart(false), 2000);
                      }}
                      className="group flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-all rounded-lg shadow-md hover:shadow-xl"
                    >
                      {addedToCart ? (
                        <>
                          <motion.svg
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-block w-6 h-6 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                          <span className="text-green-400">Added to RFQ</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Add to RFQ Cart
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => navigate('/quote')}
                      className="flex items-center justify-center gap-2 border-2 border-black text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all rounded-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      View Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="bg-gray-50 px-8 py-6 border-t-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4">Need immediate assistance?</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+19037230693" 
                    className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">(903) 723-0693</span>
                  </a>
                  <a 
                    href="mailto:sales@afastinc.com" 
                    className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">sales@afastinc.com</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
