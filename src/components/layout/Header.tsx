import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TechLabel } from "../ui/TechLabel";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200/80 shadow-sm">
      <nav className="max-w-[1600px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12 lg:space-x-16">
          <Link to="/" className="text-xl font-semibold tracking-tighter uppercase group transition-all">
            Aerospace<span className="font-light text-gray-500 group-hover:text-black transition-colors duration-300">Fasteners</span>
          </Link>

          <div className="hidden lg:flex space-x-8 xl:space-x-10">
            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu("products")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => navigate('/catalog')}
                className="nav-link cursor-pointer py-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-700 hover:text-black transition-colors"
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
                    className="absolute -left-12 top-full w-[640px] bg-white border border-gray-200 shadow-2xl rounded-sm mt-2"
                  >
                    <div className="p-10 grid grid-cols-2 gap-12">
                      <div>
                        <TechLabel className="mb-6 block">Structural Hardware</TechLabel>
                        <ul className="space-y-4 text-sm">
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">Bolts & Screws</Link></li>
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">Fittings & Fluid Systems</Link></li>
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">Pins & Precision Collars</Link></li>
                        </ul>
                      </div>
                      <div>
                        <TechLabel className="mb-6 block">Secondary & Specialty</TechLabel>
                        <ul className="space-y-4 text-sm">
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">Nuts & Locking Inserts</Link></li>
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">O-Rings & Retaining Rings</Link></li>
                          <li><Link to="/catalog" className="block hover:translate-x-1 transition-transform text-gray-600 hover:text-black">Rivets & Blind Fasteners</Link></li>
                        </ul>
                      </div>
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
                className="nav-link cursor-pointer py-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-700 hover:text-black transition-colors"
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
                    className="absolute -left-12 top-full w-[400px] bg-white border border-gray-200 shadow-2xl rounded-sm mt-2"
                  >
                    <div className="p-10">
                      <ul className="space-y-6 text-sm">
                        <li>
                          <Link to="/services" className="group block">
                            <span className="block font-medium uppercase text-xs mb-1 text-gray-900">Quality Control System</span>
                            <span className="text-gray-500 text-xs group-hover:text-gray-700 transition-colors">AS9120B / ISO 9001:2015 Traceability</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/services" className="group block">
                            <span className="block font-medium uppercase text-xs mb-1 text-gray-900">Inventory Management</span>
                            <span className="text-gray-500 text-xs group-hover:text-gray-700 transition-colors">VMI, Kitting, and Consignment Programs</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => navigate('/about')}
              className="nav-link cursor-pointer py-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-700 hover:text-black transition-colors"
            >
              Company
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="hidden xl:flex flex-col items-end">
            <TechLabel className="!text-[9px] mb-0.5">CAGE Code</TechLabel>
            <span className="font-mono text-[11px] font-medium text-gray-700">0P9Z1</span>
          </div>
          <button 
            onClick={() => navigate('/contact')}
            className="hidden lg:block bg-black text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95 rounded-sm"
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
                  <li><Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block">Products</Link></li>
                  <li><Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block">Services</Link></li>
                  <li><Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block">About</Link></li>
                  <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block">Contact</Link></li>
                </ul>
              </div>
              <div>
                <TechLabel className="mb-4 block">Contact</TechLabel>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/contact');
                  }}
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
