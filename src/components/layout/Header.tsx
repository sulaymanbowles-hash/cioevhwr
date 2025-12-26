import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TechLabel } from "../ui/TechLabel";
import { useQuoteStore } from "../../stores/quoteStore";
import { QuickSearch } from "../ui/QuickSearch";

export const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useQuoteStore();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-black/5 shadow-sm transition-all duration-300">
      <nav className="max-w-[1600px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-16">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-semibold tracking-tighter uppercase group bg-transparent border-none cursor-pointer"
          >
            Aerospace<span className="font-light text-gray-400 group-hover:text-black transition-colors">Fasteners</span>
          </button>

          <div className="hidden lg:flex space-x-10">
            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu("products")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => navigate('/catalog')}
                className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest"
              >
                Products
              </button>
              <AnimatePresence>
                {activeMenu === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute -left-12 top-full w-[320px] bg-white border border-black/10 shadow-2xl"
                  >
                    <div className="p-8">
                      <ul className="space-y-3 text-sm font-medium uppercase tracking-wide">
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Fittings</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Screws</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Bolts</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Pins</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Nuts</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">O-Rings & Retaining Rings</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Rivets</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Washers</button></li>
                        <li><button onClick={() => { navigate('/catalog'); setActiveMenu(null); }} className="block hover:translate-x-1 transition-transform text-left w-full">Specialty Products</button></li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu("services")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => navigate('/services')}
                className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest"
              >
                Services
              </button>
              <AnimatePresence>
                {activeMenu === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute -left-12 top-full w-[400px] bg-white border border-black/10 shadow-2xl"
                  >
                    <div className="p-10">
                      <ul className="space-y-6 text-sm">
                        <li>
                          <button onClick={() => { navigate('/services'); setActiveMenu(null); }} className="group block text-left w-full">
                            <span className="block font-semibold text-xs mb-1 group-hover:text-black transition-colors">Quality Control</span>
                            <span className="text-gray-500 text-xs leading-tight">AS9100 Rev. D / ISO 9001:2015</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigate('/services'); setActiveMenu(null); }} className="group block text-left w-full">
                            <span className="block font-semibold text-xs mb-1 group-hover:text-black transition-colors">Inventory Management</span>
                            <span className="text-gray-500 text-xs leading-tight">VMI, Kitting & Consignment</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => navigate('/about')}
              className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest"
            >
              Company
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quick Search */}
          <QuickSearch />
          
          <div className="hidden xl:flex flex-col items-end">
            <TechLabel className="!text-[9px]">CAGE Code</TechLabel>
            <span className="font-mono text-[11px] font-medium">4U021</span>
          </div>
          
          {/* Quote Cart Button */}
          <button
            onClick={() => navigate('/quote')}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="View RFQ Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {items.length}
              </motion.span>
            )}
          </button>

          <button 
            onClick={() => navigate('/contact')}
            className="hidden lg:block bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 hover:shadow-lg"
          >
            Request Quote
          </button>
          <button 
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-black/10">
              <span className="text-xl font-semibold tracking-tighter uppercase">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-8 flex flex-col space-y-8 overflow-y-auto">
              <div>
                <TechLabel className="mb-4 block">Navigation</TechLabel>
                <ul className="space-y-6 text-2xl font-light tracking-tight">
                  <li>
                    <button onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} className="block text-left w-full">Products</button>
                    <ul className="mt-4 ml-4 space-y-3 text-sm text-gray-500 font-medium uppercase tracking-wide border-l border-gray-200 pl-4">
                      <li><button onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} className="block text-left w-full">Fittings</button></li>
                      <li><button onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} className="block text-left w-full">Bolts</button></li>
                      <li><button onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} className="block text-left w-full">Screws</button></li>
                      <li><button onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} className="block text-left w-full">Nuts</button></li>
                    </ul>
                  </li>
                  <li><button onClick={() => { navigate('/services'); setMobileMenuOpen(false); }} className="block text-left w-full">Services</button></li>
                  <li><button onClick={() => { navigate('/about'); setMobileMenuOpen(false); }} className="block text-left w-full">Company</button></li>
                </ul>
              </div>
              <div>
                <TechLabel className="mb-4 block">Contact</TechLabel>
                <button 
                  onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
                  className="w-full bg-black text-white px-6 py-4 text-xs font-bold uppercase tracking-widest"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
