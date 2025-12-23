import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Marquee } from "../components/ui/Marquee";
import { ProductCard } from "../components/ui/ProductCard";
import { Hero3DShowcase } from "../components/ui/Hero3DShowcase";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Package } from "lucide-react";

import boltImage from "../assets/products/bolt.svg";
import nutImage from "../assets/products/nut.svg";
import fittingImage from "../assets/products/fitting.svg";
import pinImage from "../assets/products/pin.svg";

const products = [
  { title: "Titanium Hex Bolt", category: "Structural", partNumber: "NAS6204-12", image: boltImage, modelType: "bolt" as const, slug: "titanium-hex-bolt" },
  { title: "Self-Locking Nut", category: "Fasteners", partNumber: "MS21042-4", image: nutImage, modelType: "nut" as const, slug: "self-locking-nut" },
  { title: "Hydraulic Fitting", category: "Fluid Systems", partNumber: "AN818-4", image: fittingImage, modelType: "fitting" as const, slug: "hydraulic-fitting" },
  { title: "Precision Pin", category: "Alignment", partNumber: "MS16555-2", image: pinImage, modelType: "pin" as const, slug: "precision-pin" },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center px-6 md:px-8 pt-20 pb-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 -z-10" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] -z-10"
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-black/20" />
                <TechLabel className="!text-black/60">Precision Distribution Infrastructure</TechLabel>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.03em] mb-8 text-gray-900"
            >
              High Integrity{" "}
              <span className="block mt-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Aerospace Hardware
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                The definitive source for mission-critical aerospace fasteners. AS9120B certified with full material traceability for global primes and OEMs.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 max-w-lg">
                <div className="flex flex-col items-start gap-2 p-4 border border-black/5 rounded-lg bg-white/50">
                  <Shield className="w-5 h-5 text-gray-700" />
                  <div className="text-xs font-mono font-semibold">AS9120B</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Certified</div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 border border-black/5 rounded-lg bg-white/50">
                  <Zap className="w-5 h-5 text-gray-700" />
                  <div className="text-xs font-mono font-semibold">24-48h</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Delivery</div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 border border-black/5 rounded-lg bg-white/50">
                  <Package className="w-5 h-5 text-gray-700" />
                  <div className="text-xs font-mono font-semibold">150k+</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">SKUs</div>
                </div>
              </div>

              {/* CTA Buttons - Enhanced with better visual hierarchy */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="group relative bg-black text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 active:scale-[0.98] rounded-sm shadow-2xl hover:shadow-3xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    View Catalog
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="group relative border-2 border-gray-900 px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-[0.98] rounded-sm overflow-hidden"
                >
                  <span className="relative z-10">Request Quote</span>
                  <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <Hero3DShowcase />
          </motion.div>
        </div>
      </section>

      <Marquee />
      
      <section className="py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-gray-900">Featured Components</h2>
            <TechLabel>Catalog Preview</TechLabel>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 shadow-sm">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <TechLabel className="mb-10 block text-gray-500">Technical Specifications</TechLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.01em] mb-12 leading-tight">
              Engineered for <br /> Extreme Performance.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md">
              Our inventory meets the rigorous standards of AS9100D and ISO 9001:2015. Every component is fully traceable and certified for mission-critical applications.
            </p>
          </div>
          
          <div className="border border-white/10">
            <div className="grid grid-cols-2 border-b border-white/10">
              <div className="p-8 border-r border-white/10">
                <div className="text-4xl font-mono mb-2">150k+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">SKUs in Stock</div>
              </div>
              <div className="p-8">
                <div className="text-4xl font-mono mb-2">99.8%</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">Quality Rating</div>
              </div>
            </div>
            <div className="p-8">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b border-white/10">
                    <th className="pb-4 font-normal uppercase tracking-widest text-[10px]">Standard</th>
                    <th className="pb-4 font-normal uppercase tracking-widest text-[10px]">Description</th>
                    <th className="pb-4 font-normal uppercase tracking-widest text-[10px] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-white/5">
                    <td className="py-4">NAS1351</td>
                    <td className="py-4 text-gray-400">Socket Head Cap Screw</td>
                    <td className="py-4 text-right text-green-400">Active</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4">MS24665</td>
                    <td className="py-4 text-gray-400">Cotter Pin</td>
                    <td className="py-4 text-right text-green-400">Active</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4">AN960</td>
                    <td className="py-4 text-gray-400">Flat Washer</td>
                    <td className="py-4 text-right text-green-400">Active</td>
                  </tr>
                  <tr>
                    <td className="py-4">NAS6203</td>
                    <td className="py-4 text-gray-400">Hex Head Bolt</td>
                    <td className="py-4 text-right text-green-400">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <TechLabel className="mb-6 block">Core Capabilities</TechLabel>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
              End-to-End Supply Chain
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From sourcing to delivery, we provide comprehensive aerospace hardware solutions with unmatched precision and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0 }}
              className="bg-white border border-gray-200 p-10 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-8 font-mono text-2xl">
                01
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Global Sourcing</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Access to 150,000+ SKUs from certified manufacturers worldwide. Direct relationships with OEMs and authorized distributors ensure authenticity.
              </p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Approved Vendor List (AVL) Management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Real-time Inventory Visibility</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Emergency AOG Support 24/7</span>
                </li>
              </ul>
            </motion.div>

            {/* Capability 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white border border-gray-200 p-10 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-8 font-mono text-2xl">
                02
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                AS9100D and ISO 9001:2015 certified processes. Every component undergoes rigorous inspection and full traceability documentation.
              </p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Certificate of Conformance (C of C)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Material Test Reports (MTR)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>First Article Inspection Reports (FAIR)</span>
                </li>
              </ul>
            </motion.div>

            {/* Capability 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-gray-200 p-10 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-8 font-mono text-2xl">
                03
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">Logistics Excellence</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Strategic warehouse locations and partnerships with premium carriers ensure rapid fulfillment for time-critical aerospace programs.
              </p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Same-Day Shipping Available</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Climate-Controlled Storage</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span>Custom Kitting & Packaging</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-32 px-8 bg-gray-900 text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <TechLabel className="mb-8 block text-gray-500">Industries Served</TechLabel>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-8 leading-tight">
                Trusted by Aerospace Leaders
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                From commercial aviation to defense contractors, our hardware supports the most demanding aerospace applications worldwide.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded"
              >
                View Case Studies
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Commercial Aviation", desc: "Boeing, Airbus Programs", count: "2,500+" },
                { title: "Defense & Military", desc: "DoD Contractors", count: "1,200+" },
                { title: "Space Systems", desc: "Satellite & Launch", count: "350+" },
                { title: "MRO Services", desc: "Maintenance Facilities", count: "800+" }
              ].map((industry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-800 border border-gray-700 p-8 hover:bg-gray-750 transition-colors"
                >
                  <div className="text-3xl font-mono mb-4 text-gray-300">{industry.count}</div>
                  <h4 className="text-lg font-semibold mb-2 tracking-tight">{industry.title}</h4>
                  <p className="text-sm text-gray-500">{industry.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-32 px-8 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <TechLabel className="mb-6 block">Certifications & Compliance</TechLabel>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
              Industry Standards Met
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "AS9100D", desc: "Quality Management" },
              { name: "ISO 9001:2015", desc: "International Standard" },
              { name: "ITAR Registered", desc: "Export Compliance" },
              { name: "NADCAP", desc: "Special Processes" }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center border border-gray-200 p-10 hover:border-gray-400 transition-colors"
              >
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">✓</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 tracking-tight">{cert.name}</h4>
                <p className="text-sm text-gray-500">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-black text-white">
        <div className="max-w-[1600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TechLabel className="mb-8 block text-gray-500">Get Started</TechLabel>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 leading-tight">
              Ready to Partner?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join hundreds of aerospace organizations that trust us for their hardware needs. Request a quote or speak with our technical team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-black px-12 py-6 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded"
              >
                Request Quote
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border border-white px-12 py-6 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded"
              >
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
