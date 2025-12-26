import { useRef } from "react";
import { motion } from "framer-motion";
import { TechLabel } from "../ui/TechLabel";
import { GridBackground } from "../ui/GridBackground";
import { SourcingIcon, QualityIcon, LogisticsIcon } from "../ui/TechnicalIcons";

const steps = [
  {
    num: "01",
    title: "Intelligent Sourcing",
    desc: "Direct access to certified manufacturers ensuring authentic, traceable components for every specification.",
    features: ["Approved Vendor Management", "Real-Time Stock Visibility", "24/7 AOG Emergency Support"],
    icon: SourcingIcon
  },
  {
    num: "02",
    title: "Rigorous Quality Control",
    desc: "AS9100 Rev. D certified inspection with complete documentation and material certifications for full traceability.",
    features: ["Certificate of Conformance", "Material Test Reports", "First Article Inspection"],
    icon: QualityIcon
  },
  {
    num: "03",
    title: "Precision Logistics",
    desc: "Climate-controlled storage with premium carrier partnerships enabling rapid turnaround for time-sensitive programs.",
    features: ["Same-Day Shipping", "Temperature Control", "Custom Kitting"],
    icon: LogisticsIcon
  }
];

export const ProcessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-white">
      <GridBackground pattern="diagonal" opacity={0.03} />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Sticky Left Side */}
          <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-20 lg:py-0">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-black/20" />
                <TechLabel>Our Process</TechLabel>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] mb-8 leading-[0.95]">
                Supply Chain
                <br />
                <span className="text-black/30">Excellence</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Precision sourcing, rigorous quality control, and rapid logistics for mission-critical aerospace operations.
              </p>

              <div className="hidden lg:block">
                <div className="w-px h-32 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Scrollable Right Side */}
          <div className="lg:w-1/2 py-20 lg:py-32 space-y-32">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-gray-50 border border-gray-100 p-10 md:p-12 rounded-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute -left-4 top-10 w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full border-4 border-white">
                  {step.num}
                </div>

                <div className="mb-8">
                  <step.icon className="w-12 h-12 text-black mb-6" />
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-6">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
