import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Upload, FileSpreadsheet, AlertCircle, Check, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuoteStore } from '../../stores/quoteStore';
import { allProducts } from '../../lib/products';
import { parseExcelFile } from '../../utils/excelParser';
import { ToastNotification, type ToastType } from '../ui/ToastNotification';

type SearchTab = 'individual' | 'aog' | 'bulk' | 'wildcard';

export const QuoteSearch = () => {
  const { addItem } = useQuoteStore();
  const [activeTab, setActiveTab] = useState<SearchTab>('individual');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [individualForm, setIndividualForm] = useState({ partNumber: '', quantity: 1 });
  const [suggestions, setSuggestions] = useState<typeof allProducts>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aogForm, setAogForm] = useState({ partNumber: '', quantity: 1 });
  const [bulkText, setBulkText] = useState('');
  const [wildcardSearch, setWildcardSearch] = useState('');
  const [wildcardResults, setWildcardResults] = useState<typeof allProducts>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePartNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIndividualForm({ ...individualForm, partNumber: value });

    if (value.length > 0) {
      const filtered = allProducts.filter(p => 
        p.partNumber.toLowerCase().includes(value.toLowerCase()) ||
        p.title.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (partNumber: string) => {
    setIndividualForm({ ...individualForm, partNumber });
    setShowSuggestions(false);
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const findProductTitle = (partNumber: string) => {
    const product = allProducts.find(p => p.partNumber.toLowerCase() === partNumber.toLowerCase());
    return product ? product.title : 'Custom Part Request';
  };

  const handleIndividualAdd = () => {
    if (!individualForm.partNumber) {
      showToast('Please enter a part number', 'error');
      return;
    }
    
    addItem({
      partNumber: individualForm.partNumber,
      title: findProductTitle(individualForm.partNumber),
      quantity: individualForm.quantity
    });
    
    setIndividualForm({ partNumber: '', quantity: 1 });
    showToast(`Added ${individualForm.partNumber} to quote`, 'success');
  };

  const handleAogAdd = () => {
    if (!aogForm.partNumber) {
      showToast('Please enter a part number', 'error');
      return;
    }

    // In a real app, we might check AOG eligibility here
    addItem({
      partNumber: aogForm.partNumber,
      title: `${findProductTitle(aogForm.partNumber)} (AOG)`,
      quantity: aogForm.quantity
    });

    setAogForm({ partNumber: '', quantity: 1 });
    showToast(`Added ${aogForm.partNumber} to AOG quote`, 'success');
  };

  const handleBulkTextProcess = () => {
    if (!bulkText.trim()) {
      showToast('Please enter part numbers', 'error');
      return;
    }

    const lines = bulkText.split('\n');
    let addedCount = 0;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Try to split by last space to separate qty
      // "PN-123 5" -> ["PN-123", "5"]
      // "LONG PN 123 5" -> ["LONG PN 123", "5"]
      const lastSpaceIndex = trimmed.lastIndexOf(' ');
      let partNumber = trimmed;
      let quantity = 1;

      if (lastSpaceIndex !== -1) {
        const possibleQty = trimmed.substring(lastSpaceIndex + 1);
        const parsedQty = parseInt(possibleQty);
        if (!isNaN(parsedQty)) {
          quantity = parsedQty;
          partNumber = trimmed.substring(0, lastSpaceIndex).trim();
        }
      }

      if (partNumber) {
        addItem({
          partNumber,
          title: findProductTitle(partNumber),
          quantity
        });
        addedCount++;
      }
    });

    setBulkText('');
    showToast(`Successfully added ${addedCount} items`, 'success');
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const parts = await parseExcelFile(file);
      
      if (parts.length === 0) {
        showToast('No valid parts found in Excel file', 'warning');
        return;
      }

      parts.forEach(part => {
        addItem({
          partNumber: part.partNumber,
          title: findProductTitle(part.partNumber),
          quantity: part.quantity
        });
      });

      showToast(`Successfully imported ${parts.length} items from Excel`, 'success');
    } catch (error) {
      console.error('Excel import failed:', error);
      showToast('Failed to parse Excel file', 'error');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleWildcardSearch = () => {
    if (wildcardSearch.length < 2) {
      showToast('Minimum 2 characters required', 'error');
      return;
    }
    
    const results = allProducts.filter(p => 
      p.partNumber.toLowerCase().includes(wildcardSearch.toLowerCase()) ||
      p.title.toLowerCase().includes(wildcardSearch.toLowerCase())
    );
    
    setWildcardResults(results);
    setHasSearched(true);
    
    if (results.length === 0) {
      showToast('No matching parts found', 'warning');
    } else {
      showToast(`Found ${results.length} matching parts`, 'success');
    }
  };

  const handleAddFromWildcard = (product: typeof allProducts[0]) => {
    addItem({
      partNumber: product.partNumber,
      title: product.title,
      quantity: 1
    });
    showToast(`Added ${product.partNumber} to quote`, 'success');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
      <ToastNotification
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-100">
        {(['individual', 'aog', 'bulk', 'wildcard'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 min-w-[140px] py-6 px-4 text-xs font-bold uppercase tracking-widest transition-all relative hover:bg-gray-50",
              activeTab === tab ? "text-black bg-gray-50/50" : "text-gray-400"
            )}
          >
            {tab} SEARCH
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-8 min-h-[300px] bg-white">
        <AnimatePresence mode="wait">
          {activeTab === 'individual' && (
            <motion.div
              key="individual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-8 relative" ref={suggestionsRef}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Part Number
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={individualForm.partNumber}
                      onChange={handlePartNumberChange}
                      placeholder="Enter part number..."
                      className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg group-hover:bg-gray-100 focus:bg-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleIndividualAdd()}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
                      >
                        {suggestions.map((product) => (
                          <button
                            key={product.partNumber}
                            onClick={() => selectSuggestion(product.partNumber)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors flex justify-between items-center group"
                          >
                            <div>
                              <span className="font-mono font-bold text-sm block text-gray-900">{product.partNumber}</span>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700">{product.title}</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded group-hover:bg-white group-hover:text-black transition-colors">
                              {product.category}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={individualForm.quantity}
                    onChange={(e) => setIndividualForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg hover:bg-gray-100 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <button 
                    onClick={handleIndividualAdd}
                    className="w-full bg-black text-white p-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-lg active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'aog' && (
            <motion.div
              key="aog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-red-50 border border-red-100 p-6 mb-8 rounded-xl flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">AOG (Aircraft On Ground) Search</h3>
                  <p className="text-sm text-red-800 leading-relaxed">
                    Search parts that are eligible for 24/7 shipment. AOG orders require "Will Call" shipping.
                    Fed Ex, UPS and DHL couriers are not available shipping methods under this search.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    AOG Part Number
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={aogForm.partNumber}
                      onChange={(e) => setAogForm(prev => ({ ...prev, partNumber: e.target.value }))}
                      placeholder="Search AOG eligible parts..."
                      className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg group-hover:bg-gray-100 focus:bg-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleAogAdd()}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={aogForm.quantity}
                    onChange={(e) => setAogForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg hover:bg-gray-100 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <button 
                    onClick={handleAogAdd}
                    className="w-full bg-red-600 text-white p-4 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all rounded-lg active:scale-95 shadow-lg shadow-red-200"
                  >
                    Add AOG
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bulk' && (
            <motion.div
              key="bulk"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Paste Part Numbers
                  </label>
                  <p className="text-xs text-gray-400 mb-4">
                    One part number and quantity per line (e.g., "PN123 5")
                  </p>
                  <textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    className="w-full h-48 bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg resize-none mb-4 hover:bg-gray-100 focus:bg-white font-mono"
                    placeholder="PN-12345 10&#10;PN-67890 5"
                  />
                  <button 
                    onClick={handleBulkTextProcess}
                    className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-lg active:scale-95"
                  >
                    Process List
                  </button>
                </div>
                
                <div className="border-l border-gray-100 pl-12 flex flex-col justify-center">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    Import Excel
                  </h3>
                  <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                    Got a list of parts? We've made it easier than ever to search. Just upload your Excel spreadsheet. We'll automatically detect part numbers and quantities.
                  </p>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleExcelUpload}
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                  />
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="relative flex items-center justify-center gap-4 border-2 border-dashed border-gray-300 p-10 hover:border-black hover:bg-gray-50 transition-all group rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors">
                          <Upload className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                          <span className="block font-bold text-gray-900 group-hover:text-black">Click to Upload</span>
                          <span className="text-xs text-gray-500">.xlsx, .xls, .csv supported</span>
                        </div>
                      </>
                    )}
                  </button>
                  
                  <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>Smart column detection enabled</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wildcard' && (
            <motion.div
              key="wildcard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Wildcard Search
                </label>
                <p className="text-sm text-gray-600 mb-6">
                  A minimum of 2 characters is required to find parts containing that particular character string.
                </p>
                <div className="flex gap-4">
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      value={wildcardSearch}
                      onChange={(e) => setWildcardSearch(e.target.value)}
                      placeholder="Enter character string..."
                      className="w-full bg-gray-50 border border-gray-200 p-4 text-sm focus:outline-none focus:border-black transition-all rounded-lg group-hover:bg-gray-100 focus:bg-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleWildcardSearch()}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <button 
                    onClick={handleWildcardSearch}
                    className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-lg active:scale-95"
                  >
                    Search
                  </button>
                </div>

                {/* Wildcard Results */}
                {hasSearched && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                      Search Results ({wildcardResults.length})
                    </h3>
                    
                    {wildcardResults.length > 0 ? (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="max-h-[300px] overflow-y-auto">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold sticky top-0">
                              <tr>
                                <th className="px-6 py-3">Part Number</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {wildcardResults.map((product) => (
                                <tr key={product.partNumber} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 font-mono font-bold text-gray-900">
                                    {product.partNumber}
                                  </td>
                                  <td className="px-6 py-4 text-gray-600">
                                    {product.title}
                                    <span className="block text-xs text-gray-400 mt-1">{product.category}</span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button
                                      onClick={() => handleAddFromWildcard(product)}
                                      className="text-xs font-bold uppercase tracking-widest text-black hover:text-orange-600 transition-colors"
                                    >
                                      Add to Quote
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <p className="text-gray-500">No parts found matching "{wildcardSearch}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

