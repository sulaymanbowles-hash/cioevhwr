import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, ShoppingCart, X } from "lucide-react";
import { useComparisonStore } from "../stores/comparisonStore";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { TechLabel } from "../components/ui/TechLabel";
import { Catalog3DViewer } from "../components/ui/Catalog3DViewer";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { useQuoteStore } from "../stores/quoteStore";

export const Compare = () => {
  const navigate = useNavigate();
  const { products, removeProduct, clearAll } = useComparisonStore();
  const { addItem } = useQuoteStore();

  if (products.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-8 mt-8">
          <Breadcrumbs items={[{ label: "Compare Products" }]} />
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-block p-6 bg-gray-100 rounded-full">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-tight">No Products to Compare</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start adding products to comparison from the catalog to see a detailed side-by-side comparison.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-sm transition-colors uppercase tracking-wide"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Catalog
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const allAttributes = [
    { key: "partNumber", label: "Part Number" },
    { key: "category", label: "Category" },
    { key: "material", label: "Material" },
    { key: "threadType", label: "Thread Type" },
    { key: "specification", label: "Specification" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-8 mt-8">
        <Breadcrumbs items={[{ label: "Compare Products" }]} />
      </div>

      {/* Header */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">
              Product Comparison
            </h1>
            <p className="text-gray-600 text-lg">
              Comparing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-3 border-2 border-gray-200 hover:border-black rounded-sm transition-colors flex items-center gap-2 font-bold uppercase tracking-wide"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Catalog
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors font-bold uppercase tracking-wide"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <TechnicalBorder className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Product Headers with 3D Models */}
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left p-6 font-bold uppercase tracking-wide text-sm border-r-2 border-gray-200 w-48 sticky left-0 bg-gray-50 z-10">
                    Attribute
                  </th>
                  {products.map((product) => (
                    <th key={product.partNumber} className="p-6 border-r border-gray-200 min-w-[320px]">
                      <div className="space-y-4">
                        {/* Remove Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeProduct(product.partNumber)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Category Badge */}
                        <TechLabel>{product.category}</TechLabel>

                        {/* 3D Model */}
                        <div className="aspect-square bg-gradient-to-br from-white to-gray-100/50 flex items-center justify-center overflow-hidden relative rounded-sm border border-gray-200">
                          <div className="w-full h-full">
                            <Catalog3DViewer modelPath={product.modelFile} scale={1.3} />
                          </div>
                        </div>

                        {/* Product Title */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold uppercase tracking-tight text-left">
                            {product.title}
                          </h3>
                          <button
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-mono underline text-left"
                          >
                            View Details →
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addItem({
                                partNumber: product.partNumber,
                                title: product.title,
                              });
                            }}
                            className="flex-1 h-10 bg-black hover:bg-gray-800 text-white font-bold rounded-sm transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wide"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to RFQ
                          </button>
                          <button
                            className="h-10 px-3 border-2 border-gray-200 hover:border-black rounded-sm transition-colors flex items-center justify-center"
                            title="Download Spec"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Attribute Rows */}
              <tbody>
                {allAttributes.map((attr, index) => (
                  <motion.tr
                    key={attr.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-6 font-bold uppercase tracking-wide text-sm border-r-2 border-gray-200 bg-gray-50/50 sticky left-0 z-10">
                      {attr.label}
                    </td>
                    {products.map((product) => (
                      <td key={`${product.partNumber}-${attr.key}`} className="p-6 border-r border-gray-200">
                        <span className="font-mono text-sm">
                          {(product as any)[attr.key] || "N/A"}
                        </span>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TechnicalBorder>

        {/* Add More Products CTA */}
        {products.length < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-8 border-2 border-dashed border-gray-300 rounded-sm text-center"
          >
            <p className="text-gray-600 mb-4">
              You can compare up to 4 products. Add {4 - products.length} more {products.length === 3 ? 'product' : 'products'} to compare.
            </p>
            <button
              onClick={() => navigate("/catalog")}
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-sm transition-colors uppercase tracking-wide"
            >
              Add More Products
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};
