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
import { SupplyChainAnimation } from "../components/home/SupplyChainAnimation";
import { OperationalStatus } from "../components/ui/OperationalStatus";
import { DataStream } from "../components/ui/DataStream";
import { PrecisionEngineering } from "../components/home/PrecisionEngineering";
import { PerformanceMetrics } from "../components/home/PerformanceMetrics";
import { DocumentationSection } from "../components/home/DocumentationSection";
import { Button } from "../components/ui/Button";

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
      <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden bg-gray-50">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100/50 to-white -z-10" />
        
        {/* Grid overlay */}
        <GridBackground pattern="lines" opacity={0.03} />

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 relative z-10">
            <motion.div {...getAnimation()}>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="h-px w-8 sm:w-12 bg-safety-orange" />
                <TechLabel className="!text-gray-600 font-medium text-[9px] sm:text-[10px]">Precision Distribution Infrastructure</TechLabel>
              </div>
            </motion.div>
            
            <motion.h1
              {...getAnimation(0.1)}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8 text-gray-900"
            >
              High Integrity{" "}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                Aerospace Hardware
              </span>
            </motion.h1>
            
            <motion.div
              {...getAnimation(0.2)}
              className="space-y-8 sm:space-y-10"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                AS9100 Rev. D certified distributor of precision aerospace fasteners since 1979. Serving 300+ commercial and military customers worldwide with complete material traceability.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
                <div className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4 border-l-2 border-gray-100 hover:border-safety-orange transition-colors duration-300 group pl-3 sm:pl-6">
                  <CertifiedIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">AS9100D</div>
                    <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-medium">Certified</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4 border-l-2 border-gray-100 hover:border-safety-orange transition-colors duration-300 group pl-3 sm:pl-6">
                  <DeliveryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">24-48h</div>
                    <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-medium">Delivery</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4 border-l-2 border-gray-100 hover:border-safety-orange transition-colors duration-300 group pl-3 sm:pl-6">
                  <CustomersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-safety-orange transition-colors" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">300+</div>
                    <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-medium">Customers</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/catalog')}
                  className="group w-full sm:w-auto justify-center"
                >
                  View Catalog
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto justify-center"
                >
                  Request Quote
                </Button>
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
      
      <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-4 sm:gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2 sm:mb-3">Featured Components</h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">Precision-engineered aerospace fasteners with interactive 3D visualization</p>
            </div>
            <TechLabel className="hidden sm:block">Catalog Preview</TechLabel>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 shadow-sm">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </div>
      </section>

      <SupplyChainAnimation />

      <PerformanceMetrics />

      <PrecisionEngineering />

      <ProcessTimeline />
      <IndustriesGrid />

      {/* Certifications - Redesigned */}
      <section className="relative py-20 sm:py-40 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
        {/* Subtle dot pattern */}
        <GridBackground pattern="radial" opacity={0.02} />
        <DataStream />
        
        <div className="max-w-[1600px] mx-auto relative">
          <motion.div 
            {...getAnimation()}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-24"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <div className="h-px w-8 sm:w-16 bg-black/20" />
              <TechLabel>Quality Assurance</TechLabel>
              <div className="h-px w-8 sm:w-16 bg-black/20" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-4 sm:mb-6 leading-[0.95]">
              Certified for
              <br />
              <span className="text-black/30">Excellence</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Continuous commitment to quality and regulatory compliance in aerospace distribution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black mb-12 sm:mb-20">
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
                className="group bg-white p-8 sm:p-12 md:p-14 hover:bg-black hover:text-white transition-all duration-500"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-10 border-2 border-black group-hover:border-white transition-colors duration-500 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">{cert.name}</h4>
                <p className="text-xs sm:text-sm opacity-60 mb-6 sm:mb-8 leading-relaxed">{cert.desc}</p>
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 border border-black/10 group-hover:border-white/20 transition-colors">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black group-hover:bg-white rounded-full transition-colors" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em]">{cert.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Documentation Section */}
          <DocumentationSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-40 px-4 sm:px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Subtle grid overlay */}
        <GridBackground pattern="lines" opacity={0.03} className="-z-10" />
        <OperationalStatus showText={false} className="opacity-10" />
        
        <div className="max-w-[1400px] mx-auto relative">
          <motion.div 
            {...getAnimation()}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-20"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <div className="h-px w-8 sm:w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Let's Work Together</TechLabel>
              <div className="h-px w-8 sm:w-16 bg-white/30" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-6 sm:mb-10 leading-[0.95]">
              Partner With
              <br />
              <span className="text-white/40">Proven Experts</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed px-4">
              Join 300+ aerospace organizations that trust us for certified fasteners and rapid turnaround times.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mb-12 sm:mb-20">
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
                className="group relative bg-black p-8 sm:p-12 md:p-16 hover:bg-white hover:text-black transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="mb-8 sm:mb-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-2 border-white group-hover:border-black transition-colors duration-500 mb-6 sm:mb-8">
                    <span className="text-xl sm:text-2xl font-mono font-bold">{cta.num}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 tracking-tight">{cta.title}</h3>
                  <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
                    {cta.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => navigate(cta.path)}
                  className="group/btn inline-flex items-center gap-3 sm:gap-4 border-2 border-white group-hover:border-black px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] group-hover:bg-black group-hover:text-white transition-all duration-500"
                >
                  {cta.action}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...getAnimation(0.3)}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-10 sm:pt-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <div className="text-center sm:text-left">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mb-3 sm:mb-4">Call Us Direct</div>
                <a 
                  href="tel:+19037230693" 
                  className="text-xl sm:text-2xl font-mono font-bold hover:text-white/80 transition-colors inline-block"
                >
                  (903) 723-0693
                </a>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mb-3 sm:mb-4">Email Sales</div>
                <a 
                  href="mailto:sales@afastinc.com" 
                  className="text-lg sm:text-2xl font-mono font-bold hover:text-white/80 transition-colors inline-block break-all sm:break-normal"
                >
                  sales@afastinc.com
                </a>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 mb-3 sm:mb-4">Our Location</div>
                <div className="text-lg sm:text-xl font-semibold">
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
