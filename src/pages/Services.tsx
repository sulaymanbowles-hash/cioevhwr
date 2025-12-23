import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { 
  Package, 
  Shield, 
  Truck, 
  Clock, 
  Search,
  CheckCircle,
  Zap,
  BarChart,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Package,
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
      icon: Shield,
      title: "Quality Assurance & Traceability",
      description: "Full material traceability and documentation for every component we supply.",
      features: [
        "AS9100D Quality System",
        "Certificate of Conformance (C of C)",
        "Material Test Reports (MTR)",
        "First Article Inspection (FAIR)",
        "Full Chain of Custody Documentation"
      ]
    },
    {
      icon: Search,
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
      icon: Truck,
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
      icon: Clock,
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
      icon: BarChart,
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
      title: "Initial Consultation",
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
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Comprehensive Services</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              End-to-End Aerospace Hardware Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              More than just a distributor—we're your strategic partner in aerospace supply chain excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border-2 border-gray-200 p-8 rounded-lg hover:border-gray-400 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6 text-gray-500">Our Process</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How We Partner With You
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A proven approach to delivering customized aerospace supply chain solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-gray-800 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gray-700"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Why Choose Us</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              The Aerospace Fasteners Advantage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Speed",
                stat: "Same-Day",
                desc: "Shipping available on most in-stock items for emergency needs"
              },
              {
                icon: Shield,
                title: "Quality",
                stat: "99.8%",
                desc: "Quality acceptance rate across all shipments in 2024"
              },
              {
                icon: Users,
                title: "Expertise",
                stat: "150+",
                desc: "Years of combined aerospace experience on our team"
              }
            ].map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg"
              >
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <prop.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-wider mb-2 text-gray-700">
                  {prop.title}
                </h3>
                <div className="text-5xl font-bold mb-3 text-gray-900">{prop.stat}</div>
                <p className="text-gray-600">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Industries</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Serving Multiple Sectors
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-gray-400 hover:shadow-md transition-all"
              >
                <p className="font-semibold text-gray-900">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-8 bg-black text-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TechLabel className="mb-6 text-gray-500">Get Started</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Optimize Your Supply Chain?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Let's discuss how our services can improve your aerospace hardware procurement and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-black px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded shadow-lg"
              >
                Schedule Consultation
              </button>
              <button 
                onClick={() => navigate('/catalog')}
                className="border-2 border-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded"
              >
                View Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
