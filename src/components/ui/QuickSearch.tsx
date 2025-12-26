import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, TrendingUp, Command, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../../lib/products";

interface SearchResult {
  partNumber: string;
  title: string;
  category: string;
  slug: string;
}

const POPULAR_SEARCHES = [
  "MS21042",
  "AN310",
  "NAS1003",
  "MS24665",
  "MS16555",
  "AN365"
];

export const QuickSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to open search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Real search using allProducts
  useEffect(() => {
    if (searchTerm.length > 1) {
      const searchLower = searchTerm.toLowerCase();
      const filteredResults: SearchResult[] = allProducts
        .filter(item => 
          item.partNumber.toLowerCase().includes(searchLower) ||
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower)
        )
        .slice(0, 10) // Limit to 10 results
        .map(item => ({
          partNumber: item.partNumber,
          title: item.title,
          category: item.category,
          slug: item.slug
        }));
      
      setResults(filteredResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(`/product/${result.slug}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors group"
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        <span className="text-sm text-gray-500">Quick search...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 border border-gray-200 rounded">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search by part number or description..."
                    className="flex-1 text-base outline-none placeholder:text-gray-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 border border-gray-200 rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results or Popular Searches */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {searchTerm.length > 1 ? (
                    results.length > 0 ? (
                      <div className="p-2">
                        {results.map((result, index) => (
                          <button
                            key={result.partNumber}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left group ${
                              selectedIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-semibold text-black">
                                  {result.partNumber}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{result.title}</p>
                            </div>
                            <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${
                              selectedIndex === index ? "translate-x-1" : ""
                            }`} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">No results found</p>
                        <p className="text-sm text-gray-500">Try searching with a different part number</p>
                      </div>
                    )
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Popular Searches
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            onClick={() => handlePopularSearch(term)}
                            className="px-3 py-2 text-sm font-mono bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-gray-900">Pro tip:</span> Search by part number, 
                          description, or category to find exactly what you need
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs flex items-center justify-center"><ArrowUp className="w-3 h-3" /></kbd>
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs flex items-center justify-center"><ArrowDown className="w-3 h-3" /></kbd>
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs flex items-center justify-center"><CornerDownLeft className="w-3 h-3" /></kbd>
                      <span>to select</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/catalog')}
                    className="text-xs font-semibold text-gray-900 hover:text-black transition-colors flex items-center gap-1"
                  >
                    View All Products <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
