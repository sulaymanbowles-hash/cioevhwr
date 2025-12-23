import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Search, Filter } from "lucide-react";
import { ProductCard } from "../components/ui/ProductCard";
import { useState } from "react";

import boltImage from "../assets/products/bolt.svg";
import nutImage from "../assets/products/nut.svg";
import fittingImage from "../assets/products/fitting.svg";
import pinImage from "../assets/products/pin.svg";

const categories = ["All Categories", "Structural", "Fasteners", "Fluid Systems", "Alignment"];

const allProducts = [
  { title: "Titanium Hex Bolt", category: "Structural", partNumber: "NAS6204-12", image: boltImage, modelType: "bolt" as const, slug: "titanium-hex-bolt" },
  { title: "Self-Locking Nut", category: "Fasteners", partNumber: "MS21042-4", image: nutImage, modelType: "nut" as const, slug: "self-locking-nut" },
  { title: "Hydraulic Fitting", category: "Fluid Systems", partNumber: "AN818-4", image: fittingImage, modelType: "fitting" as const, slug: "hydraulic-fitting" },
  { title: "Precision Pin", category: "Alignment", partNumber: "MS16555-2", image: pinImage, modelType: "pin" as const, slug: "precision-pin" },
  { title: "Hex Head Cap Screw", category: "Structural", partNumber: "NAS1351-4", image: boltImage, modelType: "bolt" as const, slug: "titanium-hex-bolt" },
  { title: "Nylon Insert Lock Nut", category: "Fasteners", partNumber: "MS21044-4", image: nutImage, modelType: "nut" as const, slug: "self-locking-nut" },
  { title: "Tube Coupling", category: "Fluid Systems", partNumber: "AN819-4", image: fittingImage, modelType: "fitting" as const, slug: "hydraulic-fitting" },
  { title: "Clevis Pin", category: "Alignment", partNumber: "AN392-12", image: pinImage, modelType: "pin" as const, slug: "precision-pin" },
];

export const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TechLabel className="mb-6">Product Catalog</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              Aerospace Hardware Catalog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-4 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors appearance-none bg-white cursor-pointer min-w-[200px]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-black">{filteredProducts.length}</span> products
            </p>
            <TechLabel>AS9100D Certified</TechLabel>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 shadow-sm">
              {filteredProducts.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-6">No products found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                }}
                className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8 bg-gray-900 text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <TechLabel className="mb-6 text-gray-500">Can't Find What You Need?</TechLabel>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Our Sourcing Team</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We have access to over 150,000 SKUs. If you don't see it here, we can source it for you.
          </p>
          <button className="bg-white text-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded">
            Request Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
};
