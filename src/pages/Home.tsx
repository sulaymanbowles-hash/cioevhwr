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

      {/* Technical Excellence */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }} 
        />
        
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-4xl mx-auto text-center mb-32"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Technical Excellence</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-[-0.02em] mb-12 leading-[0.95]">
              Precision-Engineered.
              <br />
              <span className="text-white/40">Rigorously Certified.</span>
            </h2>
            <p className="text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-16">
              Every component meets AS9100 Rev. D and ISO 9001:2015 standards with complete traceability.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {[
              { 
                standard: "AS9100 Rev. D",
                title: "Aerospace Quality Management System",
                details: "Comprehensive quality management for aviation, space, and defense industries"
              },
              { 
                standard: "ISO 9001:2015",
                title: "International Quality Standard",
                details: "Global standard for quality management systems ensuring consistent service"
              }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="group relative bg-black p-12 md:p-16 hover:bg-white hover:text-black transition-all duration-700"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="relative">
                  <div className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                    Certified
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    {cert.standard}
                  </h3>
                  <p className="text-lg font-semibold mb-4 opacity-80">
                    {cert.title}
                  </p>
                  <p className="text-sm opacity-60 leading-relaxed">
                    {cert.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mt-20 text-center"
          >
            <button
              onClick={() => navigate('/certifications')}
              className="group inline-flex items-center gap-3 border-2 border-white px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500"
            >
              View Certifications
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </motion.div>
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] hover:gap-5 transition-all"
              >
                View Full Catalog
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Supply Chain Excellence - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white overflow-hidden">
        {/* Diagonal lines background */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 60px)',
          }} 
        />
        
        <div className="max-w-[1600px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mb-32"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-black/20" />
              <TechLabel>Our Process</TechLabel>
              <div className="h-px w-16 bg-black/20" />
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-[-0.02em] mb-8 leading-[0.95]">
              Supply Chain
              <br />
              <span className="text-black/30">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Precision sourcing, rigorous quality control, and rapid logistics for mission-critical aerospace needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black">
            {[
              {
                num: "01",
                title: "Intelligent Sourcing",
                desc: "Direct access to certified manufacturers ensuring authentic, traceable components for every specification.",
                features: ["Approved Vendor Management", "Real-Time Stock Visibility", "24/7 AOG Emergency Support"]
              },
              {
                num: "02",
                title: "Rigorous Quality Control",
                desc: "AS9100 Rev. D certified inspection with complete documentation and material certifications for full traceability.",
                features: ["Certificate of Conformance", "Material Test Reports", "First Article Inspection"]
              },
              {
                num: "03",
                title: "Precision Logistics",
                desc: "Climate-controlled storage with premium carrier partnerships enabling rapid turnaround for time-sensitive programs.",
                features: ["Same-Day Shipping", "Temperature Control", "Custom Kitting"]
              }
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="group relative bg-white p-16 hover:bg-black hover:text-white transition-all duration-700"
              >
                {/* Number Badge */}
                <div className="mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-black group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-700">
                    <span className="font-mono text-3xl font-bold">{capability.num}</span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-6 tracking-tight leading-tight">
                  {capability.title}
                </h3>
                
                <p className="text-base leading-relaxed mb-10 opacity-70">
                  {capability.desc}
                </p>
                
                {/* Features */}
                <div className="space-y-4 pt-8 border-t border-black/10 group-hover:border-white/20">
                  {capability.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.2 + idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full" />
                      <span className="text-sm font-medium tracking-wide">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-16 right-16 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mt-20"
          >
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex items-center gap-4 bg-black text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all"
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Industries Served - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-[1600px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px w-12 bg-white/30" />
                <TechLabel className="!text-white/50">Market Reach</TechLabel>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-10 leading-[0.95]">
                Supporting
                <br />
                <span className="text-white/30">Critical Missions</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-12">
                From commercial airlines to defense programs—precision fasteners enabling aerospace excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/about')}
                  className="group bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-3"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="border-2 border-white text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-3 grid grid-cols-2 gap-px bg-white/10">
              {[
                { title: "Commercial Aviation", desc: "Airlines & OEMs", highlight: "Major carriers" },
                { title: "Defense & Military", desc: "DoD Contractors", highlight: "ITAR compliant" },
                { title: "Space & Satellite", desc: "Launch Systems", highlight: "Mission-critical" },
                { title: "MRO & Repair", desc: "Maintenance Ops", highlight: "AOG 24/7" }
              ].map((industry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
                  className="group bg-black p-12 hover:bg-white hover:text-black transition-all duration-700"
                >
                  <div className="mb-8">
                    <div className="w-12 h-12 border-2 border-white group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-700 flex items-center justify-center">
                      <span className="text-2xl font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 tracking-tight">{industry.title}</h4>
                  <p className="text-sm opacity-60 mb-6">{industry.desc}</p>
                  <div className="pt-6 border-t border-white/20 group-hover:border-black/20">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-50">{industry.highlight}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10"
          >
            {[
              { value: "300+", label: "Active Customers" },
              { value: "45+", label: "Years Experience" },
              { value: "99.9%", label: "On-Time Delivery" },
              { value: "34,000+", label: "Sq Ft Facility" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="bg-black p-12 text-center hover:bg-white hover:text-black transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-mono font-bold mb-3">{stat.value}</div>
                <div className="text-xs opacity-50 uppercase tracking-[0.15em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white overflow-hidden">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className="max-w-[1600px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mb-32"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-black/20" />
              <TechLabel>Quality Assurance</TechLabel>
              <div className="h-px w-16 bg-black/20" />
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-[-0.02em] mb-8 leading-[0.95]">
              Certified for
              <br />
              <span className="text-black/30">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unwavering commitment to quality and continuous improvement in aerospace distribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black mb-24">
            {[
              { name: "AS9100 Rev. D", desc: "Aerospace Quality Management", detail: "Since 2010" },
              { name: "ISO 9001:2015", desc: "International Quality Standard", detail: "Annual audits" },
              { name: "ITAR Compliant", desc: "Export Control Regulations", detail: "Defense-ready" },
              { name: "CAGE: 4U021", desc: "Government Entity Code", detail: "GSA approved" }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="group bg-white p-14 hover:bg-black hover:text-white transition-all duration-700"
              >
                <div className="w-16 h-16 mb-10 border-2 border-black group-hover:border-white transition-colors duration-700 flex items-center justify-center">
                  <span className="text-2xl font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{cert.name}</h4>
                <p className="text-sm opacity-60 mb-8 leading-relaxed">{cert.desc}</p>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-black/10 group-hover:border-white/20">
                  <div className="w-2 h-2 bg-black group-hover:bg-white rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">{cert.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Documentation Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="bg-black text-white p-16 md:p-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
                  Complete Documentation
                  <br />
                  <span className="text-white/30">with Every Order</span>
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-10">
                  Full traceability and certification packages for mission-critical compliance.
                </p>
                <button
                  onClick={() => navigate('/certifications')}
                  className="group bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-3"
                >
                  View Certificates
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10">
                {["Certificate of Conformance", "Material Test Reports", "First Article Inspection", "Traceability Documentation"].map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                    className="bg-black p-8 hover:bg-white hover:text-black transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 border-2 border-white hover:border-black mb-6" />
                    <p className="text-sm font-bold leading-tight">{doc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-8 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-10 text-gray-500">Let's Work Together</TechLabel>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
              Partner With
              <br />Proven Experts
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join 300+ aerospace organizations that rely on certified fasteners and rapid turnaround.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border-2 border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="text-4xl mb-6">📋</div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Request a Quote</h3>
              <p className="opacity-70 mb-8 leading-relaxed">
                Get instant pricing on our extensive inventory. Detailed quote within 24 hours.
              </p>
              <button
                onClick={() => navigate('/quote')}
                className="group/btn w-full bg-white text-black border-2 border-white px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-3"
              >
                Start Your RFQ
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border-2 border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="text-4xl mb-6">💬</div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Talk to Our Team</h3>
              <p className="opacity-70 mb-8 leading-relaxed">
                Technical questions? AOG support? Our aerospace specialists are ready to help.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="group/btn w-full border-2 border-white px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
              >
                Contact Sales
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-white/20 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
          >
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Call Us Direct</div>
              <a href="tel:+19037230693" className="text-xl font-mono font-bold hover:text-gray-300 transition-colors">
                (903) 723-0693
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Email Sales</div>
              <a href="mailto:sales@afastinc.com" className="text-xl font-mono font-bold hover:text-gray-300 transition-colors">
                sales@afastinc.com
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Our Location</div>
              <div className="text-lg font-semibold">Palestine, Texas 75803</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
