import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useComparisonStore } from "../../stores/comparisonStore";
import { Catalog3DViewer } from "./Catalog3DViewer";

export const ComparisonBar = () => {
  const navigate = useNavigate();
  const { products, removeProduct, clearAll } = useComparisonStore();

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black shadow-2xl z-50"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Title & Count */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-white rounded">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Compare Products</h3>
              <p className="text-xs text-gray-600">
                {products.length} of 4 products selected
              </p>
            </div>
          </div>

          {/* Middle: Product Cards */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl overflow-x-auto">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <motion.div
                  key={product.partNumber}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative flex-shrink-0 w-32 bg-gray-50 rounded-lg border border-gray-200 p-2"
                >
                  <button
                    onClick={() => removeProduct(product.partNumber)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="aspect-square bg-white rounded mb-1 overflow-hidden">
                    <Catalog3DViewer modelPath={product.modelFile} scale={1.2} />
                  </div>
                  <p className="font-mono text-[10px] font-semibold truncate">
                    {product.partNumber}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Placeholder slots */}
            {[...Array(4 - products.length)].map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="flex-shrink-0 w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <p className="text-xs text-gray-400">Empty</p>
              </div>
            ))}
          </div>

          {/* Mobile: Just count */}
          <div className="md:hidden text-sm font-mono">
            {products.length} items
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => navigate('/compare')}
              disabled={products.length < 2}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all rounded-lg"
            >
              Compare
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
