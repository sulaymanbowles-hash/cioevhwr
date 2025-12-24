import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Shield, FileText, Globe, AlertTriangle, CheckCircle, Lock } from "lucide-react";

export const ITARCompliance = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
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
            className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-12 flex items-start"
          >
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2 text-amber-900">ITAR Controlled Material</h3>
              <p className="text-amber-800 leading-relaxed">
                Many aerospace fasteners and hardware components are subject to ITAR regulations. Unauthorized export, re-export, or transfer to foreign persons may result in severe civil and criminal penalties.
              </p>
            </div>
          </motion.div>

          {/* Compliance Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "DDTC Registration",
                description: "Registered with the U.S. State Department Directorate of Defense Trade Controls",
                status: "Active"
              },
              {
                icon: Lock,
                title: "Secure Facilities",
                description: "ITAR-compliant storage with restricted access and 24/7 monitoring",
                status: "Certified"
              },
              {
                icon: FileText,
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
                className="p-8 border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <pillar.icon className="w-10 h-10 mb-4 text-gray-700" />
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{pillar.description}</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  {pillar.status}
                </span>
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

              <div className="space-y-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Registration & Licensing
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• Active registration with U.S. Department of State DDTC</li>
                    <li>• Maintained since 2008 with annual renewals</li>
                    <li>• Technical Assistance Agreements (TAA) management</li>
                    <li>• Manufacturing License Agreements (MLA) tracking</li>
                    <li>• Export license application support</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Personnel Screening
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• U.S. Person verification for all employees with ITAR access</li>
                    <li>• Background checks and security clearances where required</li>
                    <li>• Annual ITAR training for relevant personnel</li>
                    <li>• Foreign Person access restrictions and documentation</li>
                    <li>• Non-disclosure agreements for all staff</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Physical Security Measures
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• Segregated storage areas for ITAR-controlled items</li>
                    <li>• 24/7 surveillance and alarm systems</li>
                    <li>• Biometric access control for restricted areas</li>
                    <li>• Visitor escort requirements and documentation</li>
                    <li>• Regular security audits and assessments</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Information Security
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• Encrypted systems for technical data storage and transmission</li>
                    <li>• Network isolation for ITAR-sensitive information</li>
                    <li>• Secure email and file transfer protocols</li>
                    <li>• Data loss prevention (DLP) systems</li>
                    <li>• Regular cybersecurity assessments</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Export Control Procedures
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• Automated screening of all orders for ITAR classification</li>
                    <li>• End-user verification and certification requirements</li>
                    <li>• Export license determination and application support</li>
                    <li>• Denied parties list (DPL) screening</li>
                    <li>• Destination control statements on all shipments</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                    Record Keeping & Auditing
                  </h3>
                  <ul className="space-y-3 text-gray-700 ml-9">
                    <li>• 5-year retention of all ITAR-related documentation</li>
                    <li>• Complete chain of custody tracking</li>
                    <li>• Electronic audit trail for all transactions</li>
                    <li>• Annual internal ITAR compliance audits</li>
                    <li>• Ready for government inspection at any time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-red-900 flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                Prohibited Activities
              </h2>
              <p className="text-red-800 mb-6 leading-relaxed">
                The following activities are strictly prohibited without proper authorization:
              </p>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="font-bold mr-2">×</span>
                  <span>Export or re-export of ITAR-controlled items without proper licenses</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">×</span>
                  <span>Disclosure of technical data to foreign persons</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">×</span>
                  <span>Shipment to embargoed countries or denied parties</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">×</span>
                  <span>Brokering activities without proper registration</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">×</span>
                  <span>Unauthorized reproduction or retransmission of technical documentation</span>
                </li>
              </ul>
            </div>

            {/* Customer Responsibilities */}
            <div className="border-2 border-gray-300 rounded-lg p-8">
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
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">ITAR Compliance Officer Contact</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                For questions about ITAR compliance, export authorizations, or to report potential violations:
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-lg">Trade Compliance Department</p>
                <p className="text-gray-300">Aerospace Fasteners Inc.</p>
                <p className="text-gray-300">2600 E. Imperial Hwy, Brea, CA 92821</p>
                <p className="text-gray-300">Email: itar@aerospacefasteners.com</p>
                <p className="text-gray-300">Phone: +1 (714) 529-6144</p>
                <p className="text-gray-300">Fax: +1 (714) 529-6145</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  <strong>DDTC Registration:</strong> M-12345 (Example)
                </p>
                <p className="text-sm text-gray-400">
                  <strong>CAGE Code:</strong> 0P9Z1
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
