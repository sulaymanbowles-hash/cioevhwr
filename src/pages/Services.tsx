import { TechLabel } from "../components/ui/TechLabel";
import { useNavigate } from "react-router-dom";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { 
  LogisticsIcon, 
  QualityIcon, 
  SourcingIcon, 
  AviationIcon, 
  DeliveryIcon,
  MROIcon,
  CustomersIcon
} from "../components/ui/TechnicalIcons";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: LogisticsIcon,
      title: "Inventory Management Solutions",
      description: "Comprehensive VMI, kitting, and consignment programs tailored to your operational needs.",
      features: [
        "Vendor Managed Inventory (VMI)",
        "Custom Kitting & Packaging",
        "Consignment Programs",
        "Min/Max Stock Management",
        "Real-time Inventory Tracking"
      ]
    },
    {
      icon: QualityIcon,
      title: "Quality Assurance & Traceability",
      description: "Full material traceability and documentation for every component we supply.",
      features: [
        "AS9100 Rev. D Quality System",
        "Certificate of Conformance (C of C)",
        "Material Test Reports (MTR)",
        "First Article Inspection (FAIR)",
        "Full Chain of Custody Documentation"
      ]
    },
    {
      icon: SourcingIcon,
      title: "Custom Sourcing Services",
      description: "Can't find what you need? Our sourcing team has access to 150,000+ SKUs worldwide.",
      features: [
        "Hard-to-Find Part Location",
        "Obsolete Component Sourcing",
        "Alternative Part Recommendations",
        "Global Supplier Network",
        "Engineering Support"
      ]
    },
    {
      icon: DeliveryIcon,
      title: "Logistics & Distribution",
      description: "Flexible shipping options with same-day service available for time-critical orders.",
      features: [
        "Same-Day Shipping Available",
        "International Freight Management",
        "Climate-Controlled Storage",
        "Blind Shipment Options",
        "Expedited AOG Service"
      ]
    },
    {
      icon: AviationIcon,
      title: "24/7 AOG Support",
      description: "Aircraft On Ground situations demand immediate response. We're here around the clock.",
      features: [
        "24/7 Emergency Hotline",
        "Dedicated AOG Team",
        "Global Parts Network",
        "Expedited Processing",
        "Direct-to-Site Delivery"
      ]
    },
    {
      icon: MROIcon,
      title: "Supply Chain Analytics",
      description: "Data-driven insights to optimize your procurement and reduce costs.",
      features: [
        "Usage Pattern Analysis",
        "Cost Optimization Reports",
        "Lead Time Tracking",
        "Supplier Performance Metrics",
        "Inventory Turnover Analysis"
      ]
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Initial Assessment",
      description: "We assess your requirements, volume needs, and quality standards to develop a tailored solution."
    },
    {
      number: "02",
      title: "Solution Design",
      description: "Our team creates a custom program addressing your specific inventory, quality, and logistics needs."
    },
    {
      number: "03",
      title: "Implementation",
      description: "Seamless onboarding with dedicated support to ensure smooth integration with your systems."
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "Continuous optimization and responsive service to adapt to your evolving requirements."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      {/* Hero Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Subtle gradient background instead of grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Comprehensive Services</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-10 leading-[0.95]"
            >
              End-to-End
              <br />
              <span className="text-white/40">Aerospace Solutions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto"
            >
              More than distribution—we're your strategic partner in aerospace supply chain excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid - Redesigned */}
      <section className="relative py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TechnicalBorder className="bg-white p-10 h-full hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 text-gray-900 group-hover:text-black transition-colors mb-8">
                    <service.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    {service.features.map((feature, j) => (
                      <motion.div 
                        key={j} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (j * 0.1), duration: 0.3 }}
                        className="flex items-start gap-3 text-sm text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-32">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Our Process</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.02em] mb-6 leading-[0.95]">
              How We
              <br />
              <span className="text-white/30">Partner With You</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              A proven approach to delivering customized aerospace supply chain solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-black p-12 hover:bg-white hover:text-black transition-all duration-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white group-hover:border-black transition-colors duration-700 mb-10">
                  <span className="text-2xl font-mono font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="opacity-70 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto relative">
          <div className="text-center mb-32">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-black/20" />
              <TechLabel>Why Choose Us</TechLabel>
              <div className="h-px w-16 bg-black/20" />
            </div>
            <h2 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-8 leading-[0.95]">
              The Aerospace
              <br />
              <span className="text-black/30">Fasteners Advantage</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DeliveryIcon,
                title: "Speed",
                stat: "Same-Day",
                desc: "Shipping available on most in-stock items for emergency needs"
              },
              {
                icon: QualityIcon,
                title: "Quality",
                stat: "99.8%",
                desc: "Quality acceptance rate across all shipments in 2024"
              },
              {
                icon: CustomersIcon,
                title: "Expertise",
                stat: "150+",
                desc: "Years of combined aerospace experience on our team"
              }
            ].map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TechnicalBorder className="bg-white p-12 text-center hover:shadow-lg transition-all h-full group">
                  <div className="w-20 h-20 text-gray-900 group-hover:text-black transition-colors mx-auto mb-8">
                    <prop.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-gray-500">
                    {prop.title}
                  </h3>
                  <div className="text-5xl font-bold mb-6 text-gray-900">{prop.stat}</div>
                  <p className="text-gray-600 leading-relaxed">{prop.desc}</p>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-32">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Industries</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h2 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-8 leading-[0.95]">
              Serving Multiple
              <br />
              <span className="text-white/30">Sectors</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              "Commercial Aviation",
              "Defense & Military",
              "Space Systems",
              "Business Jets",
              "Helicopters",
              "UAV/Drones",
              "MRO Facilities",
              "OEM Manufacturers"
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-black p-8 text-center hover:bg-white hover:text-black transition-all duration-500"
              >
                <p className="font-semibold text-sm uppercase tracking-wider">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-black/20" />
            <TechLabel>Get Started</TechLabel>
            <div className="h-px w-16 bg-black/20" />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-12 leading-[0.95]">
            Ready to Optimize
            <br />
            <span className="text-black/30">Your Supply Chain?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Let's discuss how our services can improve your aerospace hardware procurement and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center justify-center gap-3 bg-black text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all"
            >
              Contact Sales
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
            <button 
              onClick={() => navigate('/catalog')}
              className="inline-flex items-center justify-center gap-3 border-2 border-black px-12 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              View Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
