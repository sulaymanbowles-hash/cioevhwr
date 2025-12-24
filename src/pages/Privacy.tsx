import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TechLabel className="mb-6">Legal Documentation</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-4">Last Updated: December 2024</p>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Aerospace Fasteners Inc. is committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </motion.div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: Shield,
                title: "Data Protection",
                description: "Industry-standard encryption and security measures"
              },
              {
                icon: Lock,
                title: "Secure Storage",
                description: "All data stored in compliance with aerospace regulations"
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "Clear communication about how we use your data"
              },
              {
                icon: FileText,
                title: "Compliance",
                description: "GDPR, CCPA, and ITAR compliant practices"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <item.icon className="w-8 h-8 mb-4 text-gray-700" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Policy Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6 mt-12">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect information necessary to fulfill aerospace hardware procurement and distribution services, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and company details</li>
              <li><strong>Business Information:</strong> Purchase orders, shipping addresses, and payment information</li>
              <li><strong>Technical Data:</strong> Part specifications, certifications, and quality documentation</li>
              <li><strong>Usage Data:</strong> Website analytics and interaction patterns for service improvement</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your information is used exclusively for legitimate business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li>Processing and fulfilling orders for aerospace hardware components</li>
              <li>Providing quotes, technical support, and customer service</li>
              <li>Maintaining quality assurance and traceability documentation</li>
              <li>Compliance with aerospace industry regulations and standards</li>
              <li>Improving our services and website functionality</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">3. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement comprehensive security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li>256-bit SSL encryption for all data transmission</li>
              <li>Secure, encrypted databases with regular backups</li>
              <li>Multi-factor authentication for employee access</li>
              <li>Regular security audits and penetration testing</li>
              <li>ITAR-compliant data handling procedures</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We do not sell or rent your personal information. Data is shared only when necessary:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li>With manufacturers for order fulfillment and certification</li>
              <li>With shipping carriers for delivery services</li>
              <li>With regulatory authorities when legally required</li>
              <li>With third-party service providers under strict confidentiality agreements</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-8">
              <li>Access your personal data at any time</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Receive a copy of your data in portable format</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">6. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Our website uses cookies to enhance user experience and analyze site usage. You can control cookie preferences through your browser settings. Essential cookies required for site functionality cannot be disabled.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              We retain your information for as long as necessary to fulfill business purposes and comply with legal requirements. Aerospace industry regulations may require us to maintain certain records for extended periods (typically 7-10 years for quality documentation).
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">8. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              As a global aerospace distributor, we may transfer data internationally. All transfers comply with applicable data protection laws and are protected by appropriate safeguards, including standard contractual clauses and Privacy Shield frameworks where applicable.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For privacy-related questions or to exercise your rights:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
              <p className="font-semibold mb-2">Privacy Officer</p>
              <p className="text-gray-700">Aerospace Fasteners Inc.</p>
              <p className="text-gray-700">255 N US 287, Palestine, TX 75803</p>
              <p className="text-gray-700">Email: sales@afastinc.com</p>
              <p className="text-gray-700">Phone: 903-723-0693</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
