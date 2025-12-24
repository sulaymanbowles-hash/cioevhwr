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
      <section className="min-h-screen flex items-center px-6 md:px-8 pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white -z-10" />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] -z-10"
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-black/20" />
                <TechLabel className="!text-black/60">Precision Distribution Infrastructure</TechLabel>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.03em] mb-8 text-gray-900"
            >
              High Integrity{" "}
              <span className="block mt-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Aerospace Hardware
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Trusted distributor of aircraft fastening hardware since 1979. AS9100 Rev. D / ISO 9001:2015 certified with full material traceability serving more than 300 customers worldwide.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 max-w-lg">
                <div className="flex flex-col items-start gap-2 p-4 border border-black/10 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                  <Shield className="w-5 h-5 text-black" />
                  <div className="text-xs font-mono font-semibold">AS9100D</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Certified</div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 border border-black/10 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                  <Zap className="w-5 h-5 text-black" />
                  <div className="text-xs font-mono font-semibold">24-48h</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Delivery</div>
                </div>
                <div className="flex flex-col items-start gap-2 p-4 border border-black/10 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                  <Package className="w-5 h-5 text-black" />
                  <div className="text-xs font-mono font-semibold">300+</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Customers</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  onClick={() => navigate('/catalog')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-black text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors rounded-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  View Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors rounded-sm shadow-sm hover:shadow-lg"
                >
                  Request Quote
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Model Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="order-1 lg:order-2"
          >
            <Hero3DShowcase />
          </motion.div>
        </div>
      </section>

      <Marquee />
      
      <section className="py-32 px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-gray-900 mb-3">Featured Components</h2>
              <p className="text-gray-600 text-lg max-w-2xl">Explore our precision-engineered aerospace fasteners with real-time 3D visualization</p>
            </div>
            <TechLabel>Catalog Preview</TechLabel>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 shadow-sm">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <TechLabel className="mb-8 text-gray-500">Technical Excellence</TechLabel>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[0.95]">
              Precision-Engineered.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Rigorously Certified.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every component in our inventory meets AS9100 Rev. D and ISO 9001:2015 standards.
              Full traceability, material certifications, and inspection reports for mission-critical aerospace applications.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { value: "1,000+", label: "Aerospace-Grade SKUs", desc: "NAS, MS, AN Standards" },
              { value: "99.9%", label: "On-Time Delivery", desc: "Consistent Performance" },
              { value: "45+ Years", label: "Industry Experience", desc: "Since 1979" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-10 hover:bg-white/10 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-blue-400 to-cyan-400 group-hover:h-full transition-all duration-500"></div>
                <div className="text-5xl md:text-6xl font-mono font-bold text-white mb-3">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-300 mb-2 tracking-wide">{stat.label}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Standards Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden"
          >
            <div className="border-b border-white/10 p-8 bg-white/5">
              <h3 className="text-2xl font-semibold text-white tracking-tight">Active Part Standards</h3>
              <p className="text-sm text-gray-400 mt-2">Current inventory coverage by specification</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left py-5 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Standard</th>
                    <th className="text-left py-5 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="text-left py-5 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="text-right py-5 px-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { std: "NAS1351", desc: "Socket Head Cap Screw", cat: "Threaded Fastener" },
                    { std: "MS24665", desc: "Cotter Pin", cat: "Locking Device" },
                    { std: "AN960", desc: "Flat Washer", cat: "Spacer/Washer" },
                    { std: "NAS6203", desc: "Hex Head Bolt", cat: "Threaded Fastener" },
                    { std: "MS21042", desc: "Self-Locking Nut", cat: "Locking Device" },
                    { std: "AN818", desc: "Hydraulic Fitting", cat: "Fluid Connection" }
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-5 px-8">
                        <span className="font-mono text-white font-semibold">{row.std}</span>
                      </td>
                      <td className="py-5 px-8 text-gray-300">{row.desc}</td>
                      <td className="py-5 px-8 text-gray-400 text-sm">{row.cat}</td>
                      <td className="py-5 px-8 text-right">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                          In Stock
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/5 border-t border-white/10">
              <button
                onClick={() => navigate('/catalog')}
                className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 transition-colors"
              >
                View Full Catalog
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities - Redesigned */}
      <section className="py-40 px-6 md:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <TechLabel className="mb-8">Our Process</TechLabel>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              Comprehensive Supply
              <br />
              Chain Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From sourcing to final delivery, we manage every aspect of your aerospace fastener needs
              with precision, speed, and unwavering quality standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Intelligent Sourcing",
                desc: "Direct access to certified manufacturers and authorized distributors. Our extensive network ensures authentic, traceable components for every specification.",
                features: [
                  { icon: "✓", text: "Approved Vendor Management" },
                  { icon: "✓", text: "Real-Time Stock Visibility" },
                  { icon: "✓", text: "24/7 AOG Emergency Support" }
                ]
              },
              {
                num: "02",
                title: "Rigorous Quality Control",
                desc: "AS9100 Rev. D certified inspection processes. Every part comes with complete documentation and material certifications for full traceability.",
                features: [
                  { icon: "✓", text: "Certificate of Conformance (CoC)" },
                  { icon: "✓", text: "Material Test Reports (MTR)" },
                  { icon: "✓", text: "First Article Inspection (FAIR)" }
                ]
              },
              {
                num: "03",
                title: "Precision Logistics",
                desc: "Strategically located facility with climate-controlled storage. Premium carrier partnerships enable rapid turnaround for time-sensitive aerospace programs.",
                features: [
                  { icon: "✓", text: "Same-Day Shipping Options" },
                  { icon: "✓", text: "Temperature-Controlled Facility" },
                  { icon: "✓", text: "Custom Kitting & Assembly" }
                ]
              }
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group relative bg-white border-2 border-gray-200 p-12 hover:border-black hover:shadow-2xl transition-all duration-500"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Number badge */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="w-20 h-20 bg-black text-white flex items-center justify-center font-mono text-3xl font-bold group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-500">
                    {capability.num}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-5 tracking-tight text-gray-900 group-hover:text-black transition-colors">
                  {capability.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {capability.desc}
                </p>
                
                {/* Features list */}
                <ul className="space-y-4">
                  {capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {feature.icon}
                      </span>
                      <span className="font-medium">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover indicator */}
                <div className="absolute bottom-8 right-8 w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-gray-600" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 group"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Industries Served - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 overflow-hidden">
        {/* Dark background with pattern */}
        <div className="absolute inset-0 bg-gray-950"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <TechLabel className="mb-8 text-gray-500">Market Reach</TechLabel>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-8 leading-[1.05]">
                Supporting
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Critical Missions</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-12">
                From commercial airlines to defense programs, MRO facilities to space exploration—our precision fasteners enable aerospace excellence across every sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/about')}
                  className="group bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="border-2 border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>

            {/* Right stats grid */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-6">
              {[
                { 
                  title: "Commercial Aviation",
                  desc: "Airlines & OEMs",
                  icon: "✈️",
                  highlight: "Major carriers trust us"
                },
                { 
                  title: "Defense & Military",
                  desc: "DoD Contractors",
                  icon: "🛡️",
                  highlight: "ITAR compliant"
                },
                { 
                  title: "Space & Satellite",
                  desc: "Launch Systems",
                  icon: "🚀",
                  highlight: "Mission-critical parts"
                },
                { 
                  title: "MRO & Repair",
                  desc: "Maintenance Ops",
                  icon: "🔧",
                  highlight: "AOG support 24/7"
                }
              ].map((industry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
                >
                  <div className="text-4xl mb-6">{industry.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{industry.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{industry.desc}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{industry.highlight}</p>
                  </div>
                  
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10"
          >
            {[
              { value: "300+", label: "Active Customers" },
              { value: "45+", label: "Years Experience" },
              { value: "99.9%", label: "On-Time Delivery" },
              { value: "34,000+", label: "Sq Ft Facility" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 text-center hover:bg-white/10 transition-colors">
                <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications - Redesigned */}
      <section className="py-40 px-6 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <TechLabel className="mb-8">Quality Assurance</TechLabel>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              Certified for Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our certifications reflect our commitment to quality, compliance, and continuous improvement
              in aerospace manufacturing and distribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                name: "AS9100 Rev. D",
                desc: "Aerospace Quality Management",
                detail: "Certified since 2010",
                icon: "🎯"
              },
              { 
                name: "ISO 9001:2015",
                desc: "International Quality Standard",
                detail: "Annual audits passed",
                icon: "🏆"
              },
              { 
                name: "ITAR Compliant",
                desc: "Export Control Regulations",
                detail: "Defense-ready operations",
                icon: "🛡️"
              },
              { 
                name: "CAGE: 4U021",
                desc: "Commercial & Government Entity",
                detail: "GSA approved vendor",
                icon: "📋"
              }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 p-10 hover:border-black hover:shadow-2xl transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-black text-white flex items-center justify-center text-3xl group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-500">
                  {cert.icon}
                </div>
                
                {/* Content */}
                <h4 className="text-xl font-bold mb-3 tracking-tight text-gray-900">{cert.name}</h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cert.desc}</p>
                
                {/* Detail badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs font-semibold text-green-700">{cert.detail}</span>
                </div>

                {/* Hover corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-black opacity-0 group-hover:w-8 group-hover:h-8 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Documentation section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black text-white p-12 md:p-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  Complete Documentation
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">with Every Order</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Full traceability and certification packages ensure compliance with your most stringent aerospace quality requirements.
                </p>
                <button
                  onClick={() => navigate('/certifications')}
                  className="group bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                >
                  View Certificates
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Certificate of Conformance",
                  "Material Test Reports",
                  "First Article Inspection",
                  "Traceability Documentation"
                ].map((doc, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                    <div className="text-2xl mb-3">📄</div>
                    <p className="text-sm font-semibold text-gray-300">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-10 text-gray-500">Let's Work Together</TechLabel>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-10 leading-[0.95]">
              Partner With
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">Proven Experts</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join 300+ aerospace organizations that rely on us for certified fasteners,
              rapid turnaround, and uncompromising quality standards.
            </p>
          </motion.div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white/5 backdrop-blur-sm border-2 border-white/10 p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
            >
              <div className="text-4xl mb-6">📋</div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Request a Quote</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Get instant pricing on our extensive inventory. Submit your requirements and receive a detailed quote within 24 hours.
              </p>
              <button
                onClick={() => navigate('/quote')}
                className="group/btn w-full bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Start Your RFQ
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white/5 backdrop-blur-sm border-2 border-white/10 p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
            >
              <div className="text-4xl mb-6">💬</div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Talk to Our Team</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have technical questions? Need AOG support? Our aerospace specialists are ready to help you find the right solution.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="group/btn w-full border-2 border-white text-white px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
              >
                Contact Sales
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Contact info bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
          >
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Call Us Direct</div>
              <a href="tel:+19037230693" className="text-2xl font-mono font-bold text-white hover:text-blue-400 transition-colors">
                (903) 723-0693
              </a>
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Email Sales</div>
              <a href="mailto:sales@afastinc.com" className="text-2xl font-mono font-bold text-white hover:text-blue-400 transition-colors">
                sales@afastinc.com
              </a>
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Our Location</div>
              <div className="text-lg text-white">
                Palestine, Texas 75803
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
