import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Globe, AlertTriangle, CheckCircle, X } from "lucide-react";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { DefenseIcon, CertifiedIcon, QualityIcon } from "../components/ui/TechnicalIcons";

export const ITARCompliance = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <section className="py-20 px-6 md:px-8 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Regulatory Compliance</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              ITAR Compliance Program
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive compliance with International Traffic in Arms Regulations (ITAR) for defense-related aerospace hardware distribution.
            </p>
          </motion.div>

          {/* Alert Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <TechnicalBorder className="bg-amber-50/50 border-amber-200 p-8 mb-12 flex items-start gap-6">
              <div className="w-12 h-12 text-amber-600 flex-shrink-0 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-amber-900">ITAR Controlled Material</h3>
                <p className="text-amber-800 leading-relaxed">
                  Many aerospace fasteners and hardware components are subject to ITAR regulations. Unauthorized export, re-export, or transfer to foreign persons may result in severe civil and criminal penalties.
                </p>
              </div>
            </TechnicalBorder>
          </motion.div>

          {/* Compliance Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: DefenseIcon,
                title: "DDTC Registration",
                description: "Registered with the U.S. State Department Directorate of Defense Trade Controls",
                status: "Active"
              },
              {
                icon: QualityIcon,
                title: "Secure Facilities",
                description: "ITAR-compliant storage with restricted access and 24/7 monitoring",
                status: "Certified"
              },
              {
                icon: CertifiedIcon,
                title: "Documentation",
                description: "Complete audit trails and export authorization tracking",
                status: "Maintained"
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <TechnicalBorder className="p-8 h-full hover:shadow-lg transition-all bg-white group">
                  <div className="w-16 h-16 mb-6 text-gray-900 group-hover:text-black transition-colors">
                    <pillar.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{pillar.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                    {pillar.status}
                  </span>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>

          {/* Detailed Compliance Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900">Our ITAR Compliance Framework</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Registration & Licensing",
                    items: [
                      "Active registration with U.S. Department of State DDTC",
                      "Maintained since 2008 with annual renewals",
                      "Technical Assistance Agreements (TAA) management",
                      "Manufacturing License Agreements (MLA) tracking",
                      "Export license application support"
                    ]
                  },
                  {
                    title: "Personnel Screening",
                    items: [
                      "U.S. Person verification for all employees with ITAR access",
                      "Background checks and security clearances where required",
                      "Annual ITAR training for relevant personnel",
                      "Foreign Person access restrictions and documentation",
                      "Non-disclosure agreements for all staff"
                    ]
                  },
                  {
                    title: "Physical Security Measures",
                    items: [
                      "Segregated storage areas for ITAR-controlled items",
                      "24/7 surveillance and alarm systems",
                      "Biometric access control for restricted areas",
                      "Visitor escort requirements and documentation",
                      "Regular security audits and assessments"
                    ]
                  },
                  {
                    title: "Information Security",
                    items: [
                      "Encrypted systems for technical data storage and transmission",
                      "Network isolation for ITAR-sensitive information",
                      "Secure email and file transfer protocols",
                      "Data loss prevention (DLP) systems",
                      "Regular cybersecurity assessments"
                    ]
                  },
                  {
                    title: "Export Control Procedures",
                    items: [
                      "Automated screening of all orders for ITAR classification",
                      "End-user verification and certification requirements",
                      "Export license determination and application support",
                      "Denied parties list (DPL) screening",
                      "Destination control statements on all shipments"
                    ]
                  },
                  {
                    title: "Record Keeping & Auditing",
                    items: [
                      "5-year retention of all ITAR-related documentation",
                      "Complete chain of custody tracking",
                      "Electronic audit trail for all transactions",
                      "Annual internal ITAR compliance audits",
                      "Ready for government inspection at any time"
                    ]
                  }
                ].map((section, i) => (
                  <TechnicalBorder key={i} className="bg-gray-50/50 p-8 hover:bg-white transition-colors">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                      {section.title}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start text-sm">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 mt-1.5 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TechnicalBorder>
                ))}
              </div>
            </div>

            {/* Prohibited Activities */}
            <TechnicalBorder className="bg-red-50/50 border-red-200 p-8">
              <h2 className="text-2xl font-bold mb-6 text-red-900 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                Prohibited Activities
              </h2>
              <p className="text-red-800 mb-6 leading-relaxed">
                The following activities are strictly prohibited without proper authorization:
              </p>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Export or re-export of ITAR-controlled items without proper licenses</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Disclosure of technical data to foreign persons</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Shipment to embargoed countries or denied parties</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Brokering activities without proper registration</span>
                </li>
                <li className="flex items-start">
                  <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Unauthorized reproduction or retransmission of technical documentation</span>
                </li>
              </ul>
            </TechnicalBorder>

            {/* Customer Responsibilities */}
            <TechnicalBorder className="bg-white p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Globe className="w-8 h-8 mr-3" />
                Customer Responsibilities
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                When purchasing ITAR-controlled aerospace hardware, customers must:
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                  <span>Verify authorization to receive ITAR-controlled items</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                  <span>Provide end-use and end-user certifications when required</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                  <span>Maintain proper storage and handling procedures</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                  <span>Comply with re-export and retransfer restrictions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-gray-600 flex-shrink-0" />
                  <span>Report any violations or suspected violations immediately</span>
                </div>
              </div>
            </TechnicalBorder>

            {/* Contact Information */}
            <TechnicalBorder className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 border-gray-700">
              <h2 className="text-3xl font-bold mb-6">ITAR Compliance Officer Contact</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                For questions about ITAR compliance, export authorizations, or to report potential violations:
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-lg">Trade Compliance Department</p>
                <p className="text-gray-300">Aerospace Fasteners Inc.</p>
                <p className="text-gray-300">255 N US 287, Palestine, TX 75803</p>
                <p className="text-gray-300">Email: sales@afastinc.com</p>
                <p className="text-gray-300">Phone: 903-723-0693</p>
                <p className="text-gray-300">Fax: 903-723-3968</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  <strong>DDTC Registration:</strong> M-12345 (Example)
                </p>
                <p className="text-sm text-gray-400">
                  <strong>CAGE Code:</strong> 0P9Z1
                </p>
              </div>
            </TechnicalBorder>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
