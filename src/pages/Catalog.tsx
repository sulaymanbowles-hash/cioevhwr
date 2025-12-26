import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { Search, Filter, Download, ShoppingCart, ArrowUpRight, GitCompare } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuoteStore } from "../stores/quoteStore";
import { useComparisonStore } from "../stores/comparisonStore";
import { ToastNotification } from "../components/ui/ToastNotification";
import type { ToastType } from "../components/ui/ToastNotification";
import { Catalog3DViewer, preloadCatalogModels } from "../components/ui/Catalog3DViewer";
import { ComparisonBar } from "../components/ui/ComparisonBar";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";

import { type Product, categories, materials, threadTypes, allProducts } from "../lib/products";



// Efficient memoized filtering with useMemo
export const Catalog = () => {
  const navigate = useNavigate();
  const { addItem } = useQuoteStore();
  const { addProduct: addToComparison, isComparing, products: compareProducts } = useComparisonStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");
  const [selectedThreadType, setSelectedThreadType] = useState("All Thread Types");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");
  const [visibleCount, setVisibleCount] = useState(12);

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

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

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

  const handleAddToComparison = (product: Product) => {
    if (compareProducts.length >= 4) {
      setToastMessage("Maximum 4 products can be compared");
      setToastType("warning");
      setShowToast(true);
      return;
    }
    addToComparison({
      partNumber: product.partNumber,
      title: product.title,
      slug: product.slug,
      category: product.category,
      material: product.material,
      threadType: product.threadType,
      specification: product.specification,
      modelFile: product.modelFile,
    });
    setToastMessage(`${product.title} added to comparison`);
    setToastType("success");
    setShowToast(true);
  };

  const handleDownloadSpec = (partNumber: string) => {
    // Trigger spec sheet download
    setToastMessage(`Downloading spec sheet for ${partNumber}`);
    setToastType("info");
    setShowToast(true);
  };

  const activeFiltersCount = [selectedCategory !== "All Categories", selectedMaterial !== "All Materials", selectedThreadType !== "All Thread Types"].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-32 bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumbs */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-8 mt-8">
        <Breadcrumbs items={[{ label: "Catalog" }]} />
      </div>
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
                {displayedProducts.map((product, i) => (
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
                        <div className="flex gap-2 pt-2 relative z-20">
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault();
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
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Added
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
                              handleAddToComparison(product);
                            }}
                            disabled={isComparing(product.partNumber)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`h-11 px-4 border-2 rounded-sm transition-colors flex items-center justify-center ${
                              isComparing(product.partNumber) 
                                ? 'bg-blue-50 border-blue-500' 
                                : 'border-gray-200 hover:border-black'
                            }`}
                            title="Add to Comparison"
                          >
                            <GitCompare className={`w-4 h-4 ${isComparing(product.partNumber) ? 'text-blue-600' : 'text-gray-600'}`} />
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
              
              {visibleCount < filteredProducts.length && (
                <div className="mt-16 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-10 py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
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

      {/* Comparison Bar */}
      <ComparisonBar />
    </div>
  );
};
