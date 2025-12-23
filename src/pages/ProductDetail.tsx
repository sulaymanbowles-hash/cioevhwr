import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Shield, Truck, FileText } from "lucide-react";
import { Product3DViewer } from "../components/ui/Product3DViewer";
import { TechLabel } from "../components/ui/TechLabel";
import { useState } from "react";

interface ProductInfo {
  title: string;
  category: string;
  partNumber: string;
  modelType: "bolt" | "nut" | "fitting" | "pin";
  description: string;
  specifications: { label: string; value: string }[];
  materials: string[];
  applications: string[];
  standards: string[];
}

const productsData: Record<string, ProductInfo> = {
  "titanium-hex-bolt": {
    title: "Titanium Hex Bolt",
    category: "Structural Fasteners",
    partNumber: "NAS6204-12",
    modelType: "bolt",
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
    category: "Fastening Hardware",
    partNumber: "MS21042-4",
    modelType: "nut",
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
    category: "Fluid Systems",
    partNumber: "AN818-4",
    modelType: "fitting",
    description: "Precision hydraulic adapter fitting designed for critical fluid system connections. Manufactured to exact tolerances ensuring leak-free operation under extreme pressures and temperatures. Compatible with MIL-PRF-5606 hydraulic fluid.",
    specifications: [
      { label: "Connection Type", value: "37° Flare, Male" },
      { label: "Thread Size", value: "7/16-20 UNF-3A" },
      { label: "Tube OD", value: "1/4 inch" },
      { label: "Working Pressure", value: "3,000 PSI" },
      { label: "Burst Pressure", value: "12,000 PSI" },
      { label: "Temperature Range", value: "-65°F to 400°F" }
    ],
    materials: ["Aluminum Alloy 2024-T4", "Anodized per MIL-A-8625"],
    applications: [
      "Hydraulic brake systems",
      "Flight control actuators",
      "Landing gear systems",
      "Utility hydraulic lines"
    ],
    standards: ["AN818", "MS33656", "AS4395", "MIL-F-18280"]
  },
  "precision-pin": {
    title: "Precision Pin",
    category: "Alignment Hardware",
    partNumber: "MS16555-2",
    modelType: "pin",
    description: "Ultra-precision dowel pin manufactured to tight tolerances for critical alignment applications. Ground and polished finish ensures consistent fitment. Used in applications requiring precise positioning and load transfer between mating components.",
    specifications: [
      { label: "Diameter", value: "0.0625 inches ±0.0001" },
      { label: "Length", value: "0.500 inches" },
      { label: "Surface Finish", value: "16 RMS max" },
      { label: "Hardness", value: "HRC 58-62" },
      { label: "Straightness", value: "0.0005 TIR max" },
      { label: "Material Spec", value: "AISI 4340 Alloy Steel" }
    ],
    materials: ["4340 Alloy Steel", "Hardened & Ground", "Passivated per QQ-P-35"],
    applications: [
      "Hinge pin assemblies",
      "Jig and fixture alignment",
      "Precision bearing installations",
      "Structural joint registration"
    ],
    standards: ["MS16555", "AN385", "AS8879", "MIL-P-85490"]
  }
};

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

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
              <Product3DViewer type={product.modelType} />
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

            {/* Quote Section */}
            <div className="p-8 bg-gradient-to-br from-gray-900 to-black text-white rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Request a Quote</h3>
              <p className="text-gray-400 mb-6">
                Contact our sales team for pricing, lead times, and bulk orders.
              </p>
              
              {!showQuoteForm ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 bg-white text-black rounded text-center font-mono"
                    />
                  </div>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded"
                  >
                    Get Quote
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Quote request submitted for ${quantity} units of ${product.partNumber}`);
                  setShowQuoteForm(false);
                }}>
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                  />
                  <textarea
                    placeholder="Additional Requirements"
                    rows={3}
                    className="w-full px-4 py-3 bg-white text-black rounded text-sm resize-none"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuoteForm(false)}
                      className="px-6 py-3 border border-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
