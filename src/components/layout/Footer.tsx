import { TechLabel } from "../ui/TechLabel";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-24 px-8 border-t border-gray-900">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <Link to="/" className="text-2xl font-semibold mb-8 uppercase tracking-tighter inline-block hover:text-gray-300 transition-colors">
              Aerospace Fasteners
            </Link>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed mb-8 mt-8">
              Precision distribution for global aerospace primes. We provide the structural hardware and logistics infrastructure that keeps industry leaders in flight.
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
            <ul className="text-xs space-y-4 uppercase tracking-widest text-gray-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Bolts & Screws</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Fittings</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Pins</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Rivets</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <TechLabel className="mb-8 block text-gray-600">Resources</TechLabel>
            <ul className="text-xs space-y-4 uppercase tracking-widest text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4 border-l border-gray-900 pl-12">
            <TechLabel className="mb-8 block text-gray-600">Contact Infrastructure</TechLabel>
            <a href="mailto:sales@aerospacefasteners.com" className="text-sm mb-2 block hover:text-gray-300 transition-colors">
              sales@aerospacefasteners.com
            </a>
            <a href="tel:+17145296144" className="text-sm mb-8 block hover:text-gray-300 transition-colors">
              +1 714 529 6144
            </a>
            <p className="text-xs text-gray-600 uppercase tracking-widest leading-loose">
              2600 E. Imperial Hwy<br />Brea, California 92821
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-900 gap-8">
          <div className="flex space-x-12 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-gray-700">
            <span>© 2025 Aerospace Fasteners Inc.</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-gray-500">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Security</Link>
            <Link to="/contact" className="hover:text-white transition-colors">ITAR Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
