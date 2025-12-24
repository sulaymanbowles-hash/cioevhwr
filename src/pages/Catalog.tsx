import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { Search, Filter, Download, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuoteStore } from "../stores/quoteStore";
import { ToastNotification } from "../components/ui/ToastNotification";
import type { ToastType } from "../components/ui/ToastNotification";
import { Catalog3DViewer, preloadCatalogModels } from "../components/ui/Catalog3DViewer";

interface Product {
  title: string;
  category: string;
  partNumber: string;
  modelFile: string; // Unique GLTF model file for this specific part
  slug: string;
  material: string;
  threadType?: string;
  specification: string;
  description: string;
}

const categories = ["All Categories", "Structural", "Fasteners", "Fluid Systems", "Alignment"];
const materials = ["All Materials", "Titanium", "Aluminum", "Stainless Steel", "Brass"];
const threadTypes = ["All Thread Types", "UNF", "UNC", "Metric", "NPT", "N/A"];

const allProducts: Product[] = [
  { 
    title: "Titanium Hex Bolt", 
    category: "Structural", 
    partNumber: "NAS6204-12",
    modelFile: "nas6204-12.glb", 
    slug: "titanium-hex-bolt",
    material: "Titanium",
    threadType: "UNF",
    specification: "NAS6204 - Grade 5 Ti-6Al-4V",
    description: "High-strength aerospace fastener with exceptional corrosion resistance"
  },
  { 
    title: "Self-Locking Nut", 
    category: "Fasteners", 
    partNumber: "MS21042-4",
    modelFile: "ms21042-4.glb", 
    slug: "self-locking-nut",
    material: "Aluminum",
    threadType: "UNF",
    specification: "MS21042 - 2024-T4 Aluminum",
    description: "Self-locking design prevents loosening under vibration"
  },
  { 
    title: "Hydraulic Fitting", 
    category: "Fluid Systems", 
    partNumber: "AN818-4",
    modelFile: "an818-4.glb", 
    slug: "hydraulic-fitting",
    material: "Brass",
    threadType: "NPT",
    specification: "AN818 - CDA 360 Brass",
    description: "37° flare angle for reliable fluid connections"
  },
  { 
    title: "Precision Pin", 
    category: "Alignment", 
    partNumber: "MS16555-2",
    modelFile: "ms16555-2.glb", 
    slug: "precision-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "MS16555 - 304 Stainless",
    description: "Hardened precision alignment pin with tight tolerances"
  },
  { 
    title: "Hex Head Cap Screw", 
    category: "Structural", 
    partNumber: "NAS1351-4",
    modelFile: "nas1351-4.glb", 
    slug: "hex-head-cap-screw",
    material: "Titanium",
    threadType: "UNC",
    specification: "NAS1351 - Grade 5 Titanium",
    description: "Heavy-duty hex head design for structural applications"
  },
  { 
    title: "Nylon Insert Lock Nut", 
    category: "Fasteners", 
    partNumber: "MS21044-4",
    modelFile: "ms21044-4.glb", 
    slug: "nylon-insert-lock-nut",
    material: "Stainless Steel",
    threadType: "UNC",
    specification: "MS21044 - 303 Stainless",
    description: "Nylon insert provides superior locking performance"
  },
  { 
    title: "Tube Coupling", 
    category: "Fluid Systems", 
    partNumber: "AN819-4",
    modelFile: "an819-4.glb", 
    slug: "tube-coupling",
    material: "Brass",
    threadType: "NPT",
    specification: "AN819 - CDA 360 Brass",
    description: "Coupling for connecting hydraulic tubing"
  },
  { 
    title: "Clevis Pin", 
    category: "Alignment", 
    partNumber: "AN392-12",
    modelFile: "an392-12.glb", 
    slug: "clevis-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "AN392 - 17-4PH Stainless",
    description: "Clevis design with cotter pin hole for secure retention"
  },
  {
    title: "Aerospace Hex Bolt",
    category: "Structural",
    partNumber: "NAS6204-16",
    modelFile: "nas6204-16.glb",
    slug: "aerospace-hex-bolt",
    material: "Titanium",
    threadType: "UNF",
    specification: "NAS6204 - Ti-6Al-4V Grade 5",
    description: "Extended length bolt for deep structural connections"
  },
  {
    title: "Castle Nut",
    category: "Fasteners",
    partNumber: "AN310-4",
    modelFile: "an310-4.glb",
    slug: "castle-nut",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "AN310 - CRES 303",
    description: "Castle design for cotter pin safety wire retention"
  },
  {
    title: "Elbow Fitting 90°",
    category: "Fluid Systems",
    partNumber: "MS21904-4",
    modelFile: "ms21904-4.glb",
    slug: "elbow-fitting-90",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21904 - 2024-T4 Al",
    description: "90-degree elbow for tight space installations"
  },
  {
    title: "Dowel Pin",
    category: "Alignment",
    partNumber: "MS16555-4",
    modelFile: "ms16555-4.glb",
    slug: "dowel-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "MS16555 - Hardened",
    description: "Precision ground dowel for exact alignment"
  },
  {
    title: "Socket Head Cap Screw",
    category: "Structural",
    partNumber: "NAS1352-5",
    modelFile: "nas1352-5.glb",
    slug: "socket-head-cap-screw",
    material: "Titanium",
    threadType: "UNC",
    specification: "NAS1352 - Grade 5",
    description: "Low-profile socket head for recessed applications"
  },
  {
    title: "All-Metal Lock Nut",
    category: "Fasteners",
    partNumber: "MS21042-6",
    modelFile: "ms21042-6.glb",
    slug: "all-metal-lock-nut",
    material: "Aluminum",
    threadType: "UNF",
    specification: "MS21042 - Self-Locking",
    description: "All-metal construction for high-temperature applications"
  },
  {
    title: "Straight Union",
    category: "Fluid Systems",
    partNumber: "AN815-6",
    modelFile: "an815-6.glb",
    slug: "straight-union",
    material: "Brass",
    threadType: "NPT",
    specification: "AN815 - Fluid Connector",
    description: "Straight union for inline tube connections"
  },
  {
    title: "Taper Pin",
    category: "Alignment",
    partNumber: "AN385-3",
    modelFile: "an385-3.glb",
    slug: "taper-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "AN385 - CRES",
    description: "Tapered design for self-tightening alignment"
  },
];

export const Catalog = () => {
  const navigate = useNavigate();
  const { addItem } = useQuoteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");
  const [selectedThreadType, setSelectedThreadType] = useState("All Thread Types");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  // Preload models for above-the-fold products on mount
  useEffect(() => {
    const initialModels = allProducts.slice(0, 6).map(p => p.modelFile);
    preloadCatalogModels(initialModels);
  }, []);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesMaterial = selectedMaterial === "All Materials" || product.material === selectedMaterial;
    const matchesThread = selectedThreadType === "All Thread Types" || product.threadType === selectedThreadType;
    return matchesSearch && matchesCategory && matchesMaterial && matchesThread;
  });

  const handleAddToQuote = (product: Product) => {
    addItem({
      partNumber: product.partNumber,
      title: product.title,
    });
    setAddedToCart(product.partNumber);
    setToastMessage(`${product.title} added to quote`);
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleDownloadSpec = (partNumber: string) => {
    // Trigger spec sheet download
    setToastMessage(`Downloading spec sheet for ${partNumber}`);
    setToastType("info");
    setShowToast(true);
  };

  const activeFiltersCount = [selectedCategory !== "All Categories", selectedMaterial !== "All Materials", selectedThreadType !== "All Thread Types"].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-8 border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TechLabel className="mb-6">Product Catalog</TechLabel>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">
              Aerospace Hardware
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse our complete inventory of certified aerospace fasteners, fittings, and precision hardware.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by part number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400 font-mono text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative px-6 py-4 border-2 border-gray-200 bg-white rounded-sm hover:border-black transition-colors flex items-center gap-3 text-black font-semibold"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-6 bg-white border-2 border-gray-200 rounded-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-black">Advanced Filters</h3>
                      <button
                        onClick={() => {
                          setSelectedCategory("All Categories");
                          setSelectedMaterial("All Materials");
                          setSelectedThreadType("All Thread Types");
                        }}
                        className="text-sm text-gray-600 hover:text-black transition-colors font-mono"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Material</label>
                        <select
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {materials.map(mat => (
                            <option key={mat} value={mat}>{mat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Thread Type</label>
                        <select
                          value={selectedThreadType}
                          onChange={(e) => setSelectedThreadType(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {threadTypes.map(thread => (
                            <option key={thread} value={thread}>{thread}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600 font-mono text-sm">
              Showing <span className="font-bold text-black">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <TechLabel>AS9120B Certified</TechLabel>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setSelectedMaterial("All Materials");
                    setSelectedThreadType("All Thread Types");
                  }}
                  className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-sm transition-colors uppercase tracking-wide"
                >
                  Clear All Filters
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={`${product.partNumber}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.8) }}
                >
                  <TechnicalBorder 
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="group p-8 border-r border-b border-gray-200 hover:bg-white hover:shadow-2xl hover:z-10 hover:-translate-y-1 transition-all duration-500 cursor-pointer relative overflow-hidden h-full"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-gray-50/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 z-10">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <TechLabel>{product.category}</TechLabel>
                      <span className="font-mono text-[10px] text-gray-500 tracking-wide group-hover:text-gray-900 transition-colors duration-300">
                        {product.partNumber}
                      </span>
                    </div>
                    
                    {/* 3D Model Viewer */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 mb-6 flex items-center justify-center overflow-hidden relative rounded-sm border border-gray-200 group-hover:border-gray-300 transition-all duration-500 group-hover:shadow-inner">
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" 
                           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} 
                      />
                      
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                        <Catalog3DViewer modelPath={product.modelFile} scale={1.3} />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 relative z-10">
                      <h3 className="text-lg font-bold uppercase tracking-tight text-gray-900 group-hover:text-black transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-mono">
                        {product.specification}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Material and Thread Type Tags */}
                      <div className="flex gap-2 flex-wrap pt-2">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-xs text-gray-700 font-mono">
                          {product.material}
                        </span>
                        {product.threadType !== "N/A" && (
                          <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-xs text-gray-700 font-mono">
                            {product.threadType}
                          </span>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToQuote(product);
                          }}
                          disabled={addedToCart === product.partNumber}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 h-11 bg-black hover:bg-gray-800 disabled:bg-green-600 text-white font-bold rounded-sm transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                        >
                          <AnimatePresence mode="wait">
                            {addedToCart === product.partNumber ? (
                              <motion.span
                                key="added"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-2"
                              >
                                ✓ Added
                              </motion.span>
                            ) : (
                              <motion.span
                                key="add"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Add to RFQ
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadSpec(product.partNumber);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-11 px-4 border-2 border-gray-200 hover:border-black rounded-sm transition-colors flex items-center justify-center"
                          title="Download Spec Sheet"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>
                  </TechnicalBorder>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
