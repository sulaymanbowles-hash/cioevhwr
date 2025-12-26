import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecentlyViewedStore } from "../../stores/recentlyViewedStore";
import { Catalog3DViewer } from "./Catalog3DViewer";

export const RecentlyViewed = () => {
  const navigate = useNavigate();
  const { products, clearAll } = useRecentlyViewedStore();

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-6 md:px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-2xl font-bold uppercase tracking-tight">Recently Viewed</h2>
          </div>
          <button
            onClick={clearAll}
            className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <motion.button
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/product/${product.slug}`)}
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-black hover:shadow-lg transition-all text-left"
            >
              {/* 3D Preview */}
              <div className="aspect-square bg-gray-50 rounded mb-3 overflow-hidden">
                <Catalog3DViewer modelPath={product.modelFile} scale={1.3} />
              </div>

              {/* Info */}
              <div className="space-y-1">
                <p className="font-mono text-xs text-gray-600">{product.partNumber}</p>
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-black transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
