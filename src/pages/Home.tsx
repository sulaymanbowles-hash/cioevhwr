import { motion, useReducedMotion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Marquee } from "../components/ui/Marquee";
import { ProductCard } from "../components/ui/ProductCard";
import { Hero3DShowcase } from "../components/ui/Hero3DShowcase";
import { GridBackground } from "../components/ui/GridBackground";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CertifiedIcon, DeliveryIcon, CustomersIcon } from "../components/ui/TechnicalIcons";
import { ProcessTimeline } from "../components/home/ProcessTimeline";
import { IndustriesGrid } from "../components/home/IndustriesGrid";

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
  const shouldReduceMotion = useReducedMotion();
  
  // Animation helper
  const getAnimation = (delay = 0) => {
    if (shouldReduceMotion) {
      return { initial: {}, animate: {}, transition: { duration: 0 } };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const, delay }
    };
  };

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center px-6 md:px-8 pt-32 pb-20 relative overflow-hidden bg-gray-50">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100/50 to-white -z-10" />
        
        {/* Grid overlay */}
        <GridBackground pattern="lines" opacity={0.03} />

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 relative z-10">
            <motion.div {...getAnimation()}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-safety-orange" />
                <TechLabel className="!text-gray-600 font-medium">Precision Distribution Infrastructure</TechLabel>
              </div>
            </motion.div>
            
            <motion.h1
              {...getAnimation(0.1)}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 text-gray-900"
            >
              High Integrity{" "}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                Aerospace Hardware
              </span>
            </motion.h1>
            
            <motion.div
              {...getAnimation(0.2)}
              className="space-y-10"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                AS9100 Rev. D certified distributor of precision aerospace fasteners since 1979. Serving 300+ commercial and military customers worldwide with complete material traceability.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-6 max-w-lg">
                <div className="flex flex-col items-start gap-3 p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CertifiedIcon className="w-8 h-8 text-gray-900 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-sm font-mono font-bold text-gray-900">AS9100D</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Certified</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
                  <DeliveryIcon className="w-8 h-8 text-gray-900 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-sm font-mono font-bold text-gray-900">24-48h</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Delivery</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CustomersIcon className="w-8 h-8 text-gray-900 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-sm font-mono font-bold text-gray-900">300+</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Customers</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="group bg-gray-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all rounded-md shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  View Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="border-2 border-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all rounded-sm shadow-sm hover:shadow-lg"
                >
                  Request Quote
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Model Viewer */}
          <motion.div
            {...getAnimation(0.3)}
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
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">Featured Components</h2>
              <p className="text-gray-600 text-base max-w-2xl leading-relaxed">Precision-engineered aerospace fasteners with interactive 3D visualization</p>
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
        <GridBackground pattern="lines" opacity={0.03} className="-z-10" />
        
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div
            {...getAnimation()}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Technical Excellence</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-10 leading-[0.95]">
              Precision Engineering
              <br />
              <span className="text-white/40">Meets Certification</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-3xl mx-auto">
              Every component meets AS9100 Rev. D and ISO 9001:2015 standards with complete material traceability and documentation.
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
                {...getAnimation(i * 0.1)}
                viewport={{ once: true, margin: "-80px" }}
                className="group relative bg-black p-12 md:p-16 hover:bg-white hover:text-black transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="relative">
                  <div className="text-sm font-bold uppercase tracking-[0.2em] mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                    Certified
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                    {cert.standard}
                  </h3>
                  <p className="text-base font-semibold mb-3 opacity-90">
                    {cert.title}
                  </p>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {cert.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            {...getAnimation(0.3)}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => navigate('/certifications')}
              className="group inline-flex items-center gap-3 border-2 border-white px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              View Certifications
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      <ProcessTimeline />
      <IndustriesGrid />

      {/* Certifications - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white overflow-hidden">
        {/* Subtle dot pattern */}
        <GridBackground pattern="radial" opacity={0.02} />
        
        <div className="max-w-[1600px] mx-auto relative">
          <motion.div 
            {...getAnimation()}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-black/20" />
              <TechLabel>Quality Assurance</TechLabel>
              <div className="h-px w-16 bg-black/20" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-6 leading-[0.95]">
              Certified for
              <br />
              <span className="text-black/30">Excellence</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Continuous commitment to quality and regulatory compliance in aerospace distribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black mb-20">
            {[
              { name: "AS9100 Rev. D", desc: "Aerospace Quality Management", detail: "Since 2010" },
              { name: "ISO 9001:2015", desc: "International Quality Standard", detail: "Annual audits" },
              { name: "ITAR Compliant", desc: "Export Control Regulations", detail: "Defense-ready" },
              { name: "CAGE: 4U021", desc: "Government Entity Code", detail: "GSA approved" }
            ].map((cert, i) => (
              <motion.div
                key={i}
                {...getAnimation(i * 0.08)}
                viewport={{ once: true, margin: "-80px" }}
                className="group bg-white p-12 md:p-14 hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="w-16 h-16 mb-10 border-2 border-black group-hover:border-white transition-colors duration-500 flex items-center justify-center">
                  <span className="text-2xl font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{cert.name}</h4>
                <p className="text-sm opacity-60 mb-8 leading-relaxed">{cert.desc}</p>
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-black/10 group-hover:border-white/20 transition-colors">
                  <div className="w-2 h-2 bg-black group-hover:bg-white rounded-full transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">{cert.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Documentation Section */}
          <motion.div
            {...getAnimation(0.3)}
            viewport={{ once: true }}
            className="bg-black text-white p-12 md:p-16 lg:p-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight">
                  Complete Documentation
                  <br />
                  <span className="text-white/30">with Every Order</span>
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-8">
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
                  <div
                    key={i}
                    className="bg-black p-8 hover:bg-white hover:text-black transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 border-2 border-white hover:border-black mb-6 transition-colors" />
                    <p className="text-sm font-bold leading-tight">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Subtle grid overlay */}
        <GridBackground pattern="lines" opacity={0.03} className="-z-10" />
        
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div 
            {...getAnimation()}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Let's Work Together</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-10 leading-[0.95]">
              Partner With
              <br />
              <span className="text-white/40">Proven Experts</span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Join 300+ aerospace organizations that trust us for certified fasteners and rapid turnaround times.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mb-20">
            {[
              {
                num: "01",
                title: "Request a Quote",
                desc: "Get competitive pricing on our extensive inventory. Submit your requirements and receive a detailed quote within 24 hours.",
                action: "Start Your RFQ",
                path: "/quote"
              },
              {
                num: "02",
                title: "Contact Our Team",
                desc: "Technical questions or AOG support? Our aerospace specialists are ready to help you find the right solution.",
                action: "Contact Sales",
                path: "/contact"
              }
            ].map((cta, i) => (
              <motion.div
                key={i}
                {...getAnimation(i * 0.1)}
                viewport={{ once: true, margin: "-80px" }}
                className="group relative bg-black p-12 md:p-16 hover:bg-white hover:text-black transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white group-hover:border-black transition-colors duration-500 mb-8">
                    <span className="text-2xl font-mono font-bold">{cta.num}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-5 tracking-tight">{cta.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {cta.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => navigate(cta.path)}
                  className="group/btn inline-flex items-center gap-4 border-2 border-white group-hover:border-black px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] group-hover:bg-black group-hover:text-white transition-all duration-500"
                >
                  {cta.action}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...getAnimation(0.3)}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center md:text-left">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Call Us Direct</div>
                <a 
                  href="tel:+19037230693" 
                  className="text-2xl font-mono font-bold hover:text-white/80 transition-colors inline-block"
                >
                  (903) 723-0693
                </a>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Email Sales</div>
                <a 
                  href="mailto:sales@afastinc.com" 
                  className="text-2xl font-mono font-bold hover:text-white/80 transition-colors inline-block"
                >
                  sales@afastinc.com
                </a>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Our Location</div>
                <div className="text-xl font-semibold">
                  255 N US 287
                  <br />
                  Palestine, Texas 75803
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
