import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, ChevronDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TechLabel } from "../ui/TechLabel";
import { useQuoteStore } from "../../stores/quoteStore";
import { QuickSearch } from "../ui/QuickSearch";
import { Button } from "../ui/Button";

export const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useQuoteStore();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-black/5 shadow-sm transition-all duration-300">
      <nav className="max-w-[1600px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold tracking-tighter uppercase group bg-transparent border-none cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-mono">AF</div>
            <span className="hidden sm:inline">Aerospace<span className="font-light text-gray-400 group-hover:text-black transition-colors">Fasteners</span></span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu("products")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => navigate('/catalog')}
                className="flex items-center gap-1 py-8 text-xs font-bold uppercase tracking-widest hover:text-safety-orange transition-colors"
              >
                Products
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === "products" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute -left-4 top-[calc(100%-1rem)] w-[600px] bg-white border border-gray-100 shadow-2xl rounded-sm overflow-hidden"
                  >
                    <div className="grid grid-cols-2 p-6 gap-8">
                      <div>
                        <TechLabel className="mb-4 block text-gray-400">Categories</TechLabel>
                        <ul className="space-y-2">
                          {['Fittings', 'Screws', 'Bolts', 'Pins', 'Nuts', 'Rivets', 'Washers'].map((item) => (
                            <li key={item}>
                              <button 
                                onClick={() => { navigate(`/catalog?category=${item}`); setActiveMenu(null); }} 
                                className="block w-full text-left text-sm font-medium text-gray-600 hover:text-black hover:translate-x-1 transition-all py-1"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-6 -m-6 ml-0 border-l border-gray-100">
                        <TechLabel className="mb-4 block text-gray-400">Featured</TechLabel>
                        <div className="space-y-4">
                           <div className="group cursor-pointer" onClick={() => navigate('/catalog?category=Specialty Products')}>
                              <div className="aspect-video bg-gray-200 mb-2 rounded-sm overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                              </div>
                              <div className="text-sm font-bold">Specialty Products</div>
                              <div className="text-xs text-gray-500">Custom engineered solutions</div>
                           </div>
                           <button onClick={() => { navigate('/line-card'); setActiveMenu(null); }} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-safety-orange hover:border-safety-orange transition-colors">
                              View Line Card
                           </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveMenu("services")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => navigate('/services')}
                className="flex items-center gap-1 py-8 text-xs font-bold uppercase tracking-widest hover:text-safety-orange transition-colors"
              >
                Services
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === "services" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {activeMenu === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute -left-4 top-[calc(100%-1rem)] w-[320px] bg-white border border-gray-100 shadow-2xl rounded-sm"
                  >
                    <div className="p-6">
                      <ul className="space-y-4">
                        <li>
                          <button onClick={() => { navigate('/services'); setActiveMenu(null); }} className="group block text-left w-full hover:bg-gray-50 -mx-2 p-2 rounded transition-colors">
                            <span className="block font-bold text-sm mb-1 group-hover:text-safety-orange transition-colors">Quality Control</span>
                            <span className="text-gray-500 text-xs leading-tight">AS9100 Rev. D / ISO 9001:2015 Certified processes</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigate('/services'); setActiveMenu(null); }} className="group block text-left w-full hover:bg-gray-50 -mx-2 p-2 rounded transition-colors">
                            <span className="block font-bold text-sm mb-1 group-hover:text-safety-orange transition-colors">Inventory Management</span>
                            <span className="text-gray-500 text-xs leading-tight">VMI, Kitting & Consignment programs</span>
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
              className="nav-link cursor-pointer py-8 text-xs font-bold uppercase tracking-widest hover:text-safety-orange transition-colors"
            >
              Company
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block w-64">
             <QuickSearch />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/quote')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-safety-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            
            <div className="hidden lg:block">
                <Button variant="technical" size="sm" onClick={() => navigate('/contact')}>
                    Contact Sales
                </Button>
            </div>

            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[59]"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[60] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-black/5">
                <span className="text-sm font-bold uppercase tracking-widest">Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <nav className="p-6">
                  <div className="space-y-1">
                    <button 
                      onClick={() => { navigate('/catalog'); setMobileMenuOpen(false); }} 
                      className="flex items-center justify-between w-full p-4 text-left text-base font-semibold hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      Products
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="ml-4 pl-4 border-l border-gray-100 space-y-1">
                      {['Fittings', 'Bolts', 'Screws', 'Nuts', 'Washers'].map((item) => (
                        <button 
                          key={item}
                          onClick={() => { navigate(`/catalog?category=${item}`); setMobileMenuOpen(false); }} 
                          className="block w-full p-3 text-left text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors rounded-lg"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => { navigate('/services'); setMobileMenuOpen(false); }} 
                      className="flex items-center justify-between w-full p-4 text-left text-base font-semibold hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      Services
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button 
                      onClick={() => { navigate('/about'); setMobileMenuOpen(false); }} 
                      className="flex items-center justify-between w-full p-4 text-left text-base font-semibold hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      Company
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                    
                    <button 
                      onClick={() => { navigate('/certifications'); setMobileMenuOpen(false); }} 
                      className="flex items-center justify-between w-full p-4 text-left text-base font-semibold hover:bg-gray-50 transition-colors rounded-lg"
                    >
                      Certifications
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </nav>
              </div>
              
              <div className="p-6 border-t border-gray-100 space-y-3">
                <button 
                  onClick={() => { navigate('/quote'); setMobileMenuOpen(false); }}
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                >
                  Request Quote
                </button>
                <button 
                  onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
                  className="w-full border border-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
