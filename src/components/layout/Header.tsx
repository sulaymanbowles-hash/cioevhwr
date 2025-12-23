import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TechLabel } from "../ui/TechLabel";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-black/10">
      <nav className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-16">
          <a href="/" className="text-xl font-semibold tracking-tighter uppercase group">
            Aerospace<span className="font-light text-gray-400 group-hover:text-black transition-colors">Fasteners</span>
          </a>

          <div className="hidden lg:flex space-x-10">
            <div 
              className="relative"
              onMouseEnter={() => setActiveMenu("products")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest">Products</span>
              <AnimatePresence>
                {activeMenu === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute -left-12 top-full w-[640px] bg-white border border-black/10 shadow-2xl"
                  >
                    <div className="p-10 grid grid-cols-2 gap-12">
                      <div>
                        <TechLabel className="mb-6 block">Structural Hardware</TechLabel>
                        <ul className="space-y-4 text-sm">
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">Bolts & Screws</a></li>
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">Fittings & Fluid Systems</a></li>
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">Pins & Precision Collars</a></li>
                        </ul>
                      </div>
                      <div>
                        <TechLabel className="mb-6 block">Secondary & Specialty</TechLabel>
                        <ul className="space-y-4 text-sm">
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">Nuts & Locking Inserts</a></li>
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">O-Rings & Retaining Rings</a></li>
                          <li><a href="#" className="block hover:translate-x-1 transition-transform">Rivets & Blind Fasteners</a></li>
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
              <span className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest">Services</span>
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
                          <a href="#" className="group block">
                            <span className="block font-medium uppercase text-xs mb-1">Quality Control System</span>
                            <span className="text-gray-400 text-xs">AS9120B / ISO 9001:2015 Traceability</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="group block">
                            <span className="block font-medium uppercase text-xs mb-1">Inventory Management</span>
                            <span className="text-gray-400 text-xs">VMI, Kitting, and Consignment Programs</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <span className="nav-link cursor-pointer py-8 text-xs font-semibold uppercase tracking-widest">Company</span>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden xl:flex flex-col items-end">
            <TechLabel className="!text-[9px]">CAGE Code</TechLabel>
            <span className="font-mono text-[11px] font-medium">0P9Z1</span>
          </div>
          <button className="hidden lg:block bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">
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
                  <li><a href="#" className="block">Products</a></li>
                  <li><a href="#" className="block">Services</a></li>
                  <li><a href="#" className="block">Company</a></li>
                </ul>
              </div>
              <div>
                <TechLabel className="mb-4 block">Contact</TechLabel>
                <button className="w-full bg-black text-white px-6 py-4 text-xs font-bold uppercase tracking-widest">
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
