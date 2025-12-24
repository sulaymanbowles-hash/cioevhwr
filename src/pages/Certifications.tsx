import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Shield, Award, FileCheck, CheckCircle, Download } from "lucide-react";

export const Certifications = () => {
  const certifications = [
    {
      title: "AS9100 Rev. D Certification",
      issuer: "SAE International",
      validUntil: "2025",
      description: "Quality Management Systems for Aviation, Space, and Defense Organizations",
      icon: Shield,
      details: [
        "Comprehensive quality management system",
        "Full material traceability requirements",
        "Continuous improvement processes",
        "Risk-based thinking and planning",
        "Supplier management and approval"
      ]
    },
    {
      title: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      validUntil: "December 2025",
      description: "Quality Management Systems - Requirements",
      icon: Award,
      details: [
        "Customer focus and satisfaction",
        "Process approach methodology",
        "Evidence-based decision making",
        "Leadership commitment",
        "Relationship management"
      ]
    },
    {
      title: "ITAR Compliant",
      issuer: "U.S. Department of State",
      validUntil: "Ongoing",
      description: "Compliant with International Traffic in Arms Regulations (not ITAR certified)",
      icon: FileCheck,
      details: [
        "Defense article handling authorization",
        "Export control procedures",
        "Secure data management",
        "Employee training programs",
        "Government audit readiness"
      ]
    }
  ];

  const qualityProcesses = [
    {
      title: "Receiving Inspection",
      desc: "100% incoming material verification against source documentation"
    },
    {
      title: "Material Traceability",
      desc: "Complete chain of custody from manufacturer to customer"
    },
    {
      title: "Storage & Handling",
      desc: "Climate-controlled facilities with segregated storage areas"
    },
    {
      title: "Documentation Control",
      desc: "Full C of C, MTR, and test reports with every shipment"
    },
    {
      title: "Calibration Management",
      desc: "All measurement equipment traceable to NIST standards"
    },
    {
      title: "Non-Conformance Control",
      desc: "Immediate quarantine and investigation procedures"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <TechLabel className="mb-6 text-gray-400">Quality Assurance</TechLabel>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Certified Excellence in<br/>Aerospace Distribution
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Since 1979, Aerospace Fasteners Incorporated has maintained rigorous quality certifications. All parts are inspected prior to shipment, with paperwork maintained at our Palestine, Texas facility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-black transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center mb-6">
                  <cert.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Issued by: {cert.issuer}</p>
                <p className="text-sm text-green-600 font-semibold mb-4">Valid until: {cert.validUntil}</p>
                <p className="text-gray-700 mb-6">{cert.description}</p>
                <div className="space-y-2">
                  {cert.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full border-2 border-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Certificate
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Processes */}
      <section className="py-20 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Our Process</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Quality Control at Every Step
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From receiving to shipping, every component passes through rigorous quality checkpoints to ensure complete compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityProcesses.map((process, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{process.title}</h3>
                    <p className="text-sm text-gray-600">{process.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit & Compliance */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-br from-black to-gray-900 text-white rounded-2xl p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <TechLabel className="mb-6 text-gray-400">Transparency & Trust</TechLabel>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Open to Audit, Always
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                We welcome customer audits and maintain complete transparency in our quality systems. Our facilities undergo regular third-party audits to maintain certification compliance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm text-gray-400">Traceability</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Documentation Access</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">Zero</div>
                  <div className="text-sm text-gray-400">Nonconformances (2024)</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
