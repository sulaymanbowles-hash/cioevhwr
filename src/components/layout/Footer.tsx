import { TechLabel } from "../ui/TechLabel";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-b from-black to-gray-950 text-white py-24 px-6 md:px-8 border-t border-gray-800">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-tight">Aerospace Fasteners Inc.</h2>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-8">
              Since 1979, trusted aerospace fastener distributor serving 300+ commercial and military customers worldwide from Palestine, Texas.
            </p>
            <div className="flex space-x-4">
              <div className="w-12 h-12 border border-gray-800 flex items-center justify-center grayscale opacity-50">
                <TechLabel className="!text-[8px]">ISO</TechLabel>
              </div>
              <div className="w-12 h-12 border border-gray-800 flex items-center justify-center grayscale opacity-50">
                <TechLabel className="!text-[8px]">AS</TechLabel>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <TechLabel className="mb-8 block text-gray-600">Inventory</TechLabel>
            <ul className="text-xs space-y-4 uppercase tracking-widest">
              <li><button onClick={() => navigate('/catalog')} className="hover:text-white transition-colors text-left">Fittings</button></li>
              <li><button onClick={() => navigate('/catalog')} className="hover:text-white transition-colors text-left">Bolts</button></li>
              <li><button onClick={() => navigate('/catalog')} className="hover:text-white transition-colors text-left">Screws</button></li>
              <li><button onClick={() => navigate('/catalog')} className="hover:text-white transition-colors text-left">Nuts</button></li>
              <li><button onClick={() => navigate('/catalog')} className="hover:text-white transition-colors text-left">Washers</button></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <TechLabel className="mb-8 block text-gray-600">Resources</TechLabel>
            <ul className="text-xs space-y-4 uppercase tracking-widest">
              <li><button onClick={() => navigate('/certifications')} className="hover:text-white transition-colors text-left">Certifications</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors text-left">FAQ</button></li>
              <li><button onClick={() => navigate('/services')} className="hover:text-white transition-colors text-left">Services</button></li>
              <li><button onClick={() => navigate('/quote')} className="hover:text-white transition-colors text-left">Request Quote</button></li>
            </ul>
          </div>
          <div className="md:col-span-4 border-l border-gray-900 pl-12">
            <TechLabel className="mb-8 block text-gray-600">Stay Connected</TechLabel>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Subscribe for product updates, industry news, and technical resources.
            </p>
            <form className="flex gap-2 mb-8">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded text-sm focus:border-white focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all rounded"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-600 uppercase tracking-widest leading-loose">
              255 N US 287<br />Palestine, TX 75803<br />
              Phone: (903) 723-0693<br />
              Email: sales@afastinc.com
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-900 gap-6">
          <div className="flex flex-col md:flex-row md:space-x-8 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gray-700 text-center md:text-left">
            <span>© 2025 Aerospace Fasteners Inc.</span>
            <span className="hidden md:inline">•</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-gray-500">
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => navigate('/security')} className="hover:text-white transition-colors">Security</button>
            <button onClick={() => navigate('/itar-compliance')} className="hover:text-white transition-colors">ITAR Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
