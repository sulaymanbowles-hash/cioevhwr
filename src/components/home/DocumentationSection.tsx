import { motion } from "framer-motion";
import { FileText, CheckCircle, Shield, Search, ArrowRight } from "lucide-react";
import { TechLabel } from "../ui/TechLabel";
import { useNavigate } from "react-router-dom";

const DocItem = ({ title, icon: Icon, delay }: { title: string, icon: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative bg-white p-4 sm:p-6 border border-gray-100 hover:border-black transition-colors duration-300"
  >
    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gray-50 group-hover:bg-black transition-colors duration-300 flex items-center justify-center">
      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 group-hover:text-white transition-colors" />
    </div>
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 rounded-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    </div>
    <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wide pr-6 sm:pr-8">{title}</h4>
  </motion.div>
);

export const DocumentationSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="h-px w-8 sm:w-12 bg-black/20" />
              <TechLabel>Compliance & Quality</TechLabel>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] mb-6 sm:mb-8 leading-[0.95]">
              Complete Documentation
              <br />
              <span className="text-black/30">with Every Order</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-xl">
              We provide full traceability and certification packages for mission-critical compliance. Every shipment includes comprehensive documentation to ensure your audit readiness.
            </p>

            <button
              onClick={() => navigate('/certifications')}
              className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest hover:text-safety-orange transition-colors"
            >
              View Sample Certificates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <DocItem 
              title="Certificate of Conformance" 
              icon={CheckCircle} 
              delay={0.1} 
            />
            <DocItem 
              title="Material Test Reports" 
              icon={FileText} 
              delay={0.2} 
            />
            <DocItem 
              title="First Article Inspection" 
              icon={Search} 
              delay={0.3} 
            />
            <DocItem 
              title="Traceability Documentation" 
              icon={Shield} 
              delay={0.4} 
            />
          </div>

        </div>
      </div>
    </section>
  );
};
