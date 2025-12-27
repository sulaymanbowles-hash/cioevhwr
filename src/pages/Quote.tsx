import { QuoteSearch } from "../components/quote/QuoteSearch";
import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { useQuoteStore } from "../stores/quoteStore";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LogisticsIcon, CertifiedIcon } from "../components/ui/TechnicalIcons";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { allProducts } from "../lib/products";

export const Quote = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearQuote } = useQuoteStore();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearQuote();
      setTimeout(() => navigate('/'), 2000);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-8 text-green-600"
          >
            <CertifiedIcon className="w-full h-full" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">Quote Request Submitted!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our team will review your request and respond within 24 hours.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TechLabel className="mb-4">Request for Quote</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Your RFQ Cart
            </h1>
            <div className="flex items-center gap-6 text-lg text-gray-600">
              <p>
                <span className="font-bold text-black">{items.length}</span> {items.length === 1 ? 'line item' : 'line items'}
              </p>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <p>
                <span className="font-bold text-black">{items.reduce((acc, item) => acc + item.quantity, 0)}</span> total units
              </p>
            </div>
          </motion.div>
        </div>

        <QuoteSearch />

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-8 text-gray-300">
              <LogisticsIcon className="w-full h-full" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your RFQ cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Browse our catalog and add items to request a quote.
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Browse Catalog
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
                  const product = allProducts.find(p => p.partNumber === item.partNumber);
                  return (
                    <motion.div
                      key={item.partNumber}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TechnicalBorder className="bg-white p-6 hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between gap-6">
                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="font-bold text-lg">{item.title}</h3>
                              <span className="px-2 py-1 bg-gray-100 text-xs font-mono rounded text-gray-600">
                                {item.partNumber}
                              </span>
                            </div>
                            {product && (
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {product.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.partNumber, Math.max(1, item.quantity - 1))}
                                className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-200"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val) && val > 0) {
                                    updateQuantity(item.partNumber, val);
                                  }
                                }}
                                className="w-20 text-center font-mono font-bold text-sm py-2 focus:outline-none focus:bg-gray-50"
                              />
                              <button
                                onClick={() => updateQuantity(item.partNumber, item.quantity + 1)}
                                className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-200"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.partNumber)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </TechnicalBorder>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {items.length > 0 && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={clearQuote}
                    className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Quote Summary / Action */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Quote Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Line Items</span>
                    <span className="font-mono font-bold">{items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Units</span>
                    <span className="font-mono font-bold">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Estimated Total</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Calculated at Quote</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-black text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Finalize Request</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitQuote} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                        placeholder="Acme Aerospace Inc."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Required By Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Additional Notes</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm resize-none focus:border-black focus:outline-none transition-colors"
                        placeholder="Special requirements, delivery instructions, etc."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full bg-black text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Submit Request
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      By submitting this form, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
