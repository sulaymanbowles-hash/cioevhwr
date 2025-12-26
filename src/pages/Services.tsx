import { TechLabel } from "../components/ui/TechLabel";
import { 
  Package, 
  Shield, 
  Truck, 
  Clock, 
  Search,
  Zap,
  BarChart,
  Users,
  ArrowRight
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
        "AS9100 Rev. D Quality System",
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
    <div className="min-h-screen pt-24 pb-20 bg-white">
      {/* Hero Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }} 
        />
        
        <div className="max-w-[1600px] mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-white/30" />
              <TechLabel className="!text-white/50">Comprehensive Services</TechLabel>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-[-0.02em] mb-10 leading-[0.95]">
              End-to-End
              <br />
              <span className="text-white/40">Aerospace Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
              More than distribution—we're your strategic partner in aerospace supply chain excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Redesigned */}
      <section className="relative py-40 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-white p-12 hover:bg-black hover:text-white transition-all duration-700"
              >
                <div className="w-16 h-16 border-2 border-black group-hover:border-white transition-colors duration-700 flex items-center justify-center mb-8">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{service.title}</h3>
                <p className="opacity-70 mb-8 leading-relaxed">{service.description}</p>
                <div className="space-y-3 pt-6 border-t border-black/10 group-hover:border-white/20">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 60px)',
          }} 
        />
        
        <div className="max-w-[1400px] mx-auto relative">
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
              <div
                key={i}
                className="group bg-black p-12 hover:bg-white hover:text-black transition-all duration-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-white group-hover:border-black transition-colors duration-700 mb-10">
                  <span className="text-2xl font-mono font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                <p className="opacity-70 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black">
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
              <div
                key={i}
                className="group bg-white p-16 hover:bg-black hover:text-white transition-all duration-700 text-center"
              >
                <div className="w-20 h-20 border-2 border-black group-hover:border-white transition-colors duration-700 flex items-center justify-center mx-auto mb-10">
                  <prop.icon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-wider mb-4 opacity-70">
                  {prop.title}
                </h3>
                <div className="text-5xl font-bold mb-6">{prop.stat}</div>
                <p className="opacity-60 leading-relaxed">{prop.desc}</p>
              </div>
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
              <div
                key={i}
                className="bg-black p-8 text-center hover:bg-white hover:text-black transition-all duration-500"
              >
                <p className="font-semibold text-sm uppercase tracking-wider">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="relative py-40 px-6 md:px-8 bg-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 60px)',
          }} 
        />
        
        <div className="max-w-[1200px] mx-auto text-center relative">
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
              Schedule Consultation
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
