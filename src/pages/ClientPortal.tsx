import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Lock, FileText, Package, Clock } from "lucide-react";

export const ClientPortal = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TechLabel className="mb-4">Secure Access</TechLabel>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Client Portal
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Access your order history, download certifications (8130-3, CofC), and track shipments in real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <FileText className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="font-bold mb-2">Document Retrieval</h3>
                <p className="text-sm text-gray-500">Instant access to all quality documentation and certifications.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <Package className="w-8 h-8 mb-4 text-green-600" />
                <h3 className="font-bold mb-2">Order Tracking</h3>
                <p className="text-sm text-gray-500">Real-time status updates on all your active shipments.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <Clock className="w-8 h-8 mb-4 text-orange-600" />
                <h3 className="font-bold mb-2">Order History</h3>
                <p className="text-sm text-gray-500">View past orders and quickly reorder common items.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto w-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-black rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Login</h2>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <button className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                Sign In
              </button>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-500 hover:text-black underline">Forgot password?</a>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account? <a href="/contact" className="text-black font-bold hover:underline">Request Access</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
