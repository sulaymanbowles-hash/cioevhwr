import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { useQuoteStore } from "../stores/quoteStore";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Send, Package, ArrowLeft } from "lucide-react";
import { useState } from "react";

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
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Send className="w-10 h-10 text-white" />
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
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
            <p className="text-lg text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} ready for quote
            </p>
          </motion.div>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
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
                {items.map((item, index) => (
                  <motion.div
                    key={item.partNumber}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 font-mono">
                          Part #: {item.partNumber}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.partNumber, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-mono font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.partNumber, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.partNumber)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length > 0 && (
                <button
                  onClick={clearQuote}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  Clear all items
                </button>
              )}
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-1">
              <div className="bg-black text-white rounded-lg p-8 sticky top-24">
                <h3 className="text-2xl font-semibold mb-6">Submit Quote Request</h3>
                <p className="text-gray-400 text-sm mb-8">
                  Fill out your details and we'll get back to you with pricing and availability within 24 hours.
                </p>

                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-white text-black px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded"
                  >
                    Continue to Request
                  </button>
                ) : (
                  <form onSubmit={handleSubmitQuote} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Required By Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes</label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-white text-black rounded text-sm resize-none"
                        placeholder="Special requirements, delivery instructions, etc."
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Submit RFQ
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-6 py-3 border border-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
