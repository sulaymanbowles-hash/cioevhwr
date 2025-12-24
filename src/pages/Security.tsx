import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Shield, Lock, Key, Server, Eye, CheckCircle } from "lucide-react";

export const Security = () => {
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
            <TechLabel className="mb-6">Information Security</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              Security & Data Protection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade security infrastructure protecting your data and transactions across our global aerospace supply chain operations.
            </p>
          </motion.div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Shield,
                title: "ISO 27001 Certified",
                description: "Information Security Management System certified to international standards"
              },
              {
                icon: Lock,
                title: "End-to-End Encryption",
                description: "256-bit SSL/TLS encryption for all data transmission and storage"
              },
              {
                icon: Key,
                title: "Multi-Factor Authentication",
                description: "Advanced MFA protecting all system access points"
              },
              {
                icon: Server,
                title: "Secure Infrastructure",
                description: "SOC 2 Type II compliant cloud infrastructure with 99.99% uptime"
              },
              {
                icon: Eye,
                title: "24/7 Monitoring",
                description: "Real-time threat detection and incident response team"
              },
              {
                icon: CheckCircle,
                title: "Regular Audits",
                description: "Quarterly security audits and penetration testing"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-xl transition-all"
              >
                <feature.icon className="w-12 h-12 mb-4 text-gray-700" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Comprehensive Security Measures</h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Network Security</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Next-Generation Firewalls:</strong> Advanced threat protection with intrusion detection and prevention systems (IDS/IPS)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Network Segmentation:</strong> Isolated environments for different security zones with strict access controls</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>DDoS Protection:</strong> Enterprise-grade protection against distributed denial of service attacks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>VPN Access:</strong> Encrypted virtual private network for secure remote connections</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Data Protection</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Encryption at Rest:</strong> AES-256 encryption for all stored data including databases and backups</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Encryption in Transit:</strong> TLS 1.3 protocol for all data transmission</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Automated Backups:</strong> Hourly incremental and daily full backups with geographic redundancy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Data Loss Prevention:</strong> Automated systems to prevent unauthorized data exfiltration</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Access Control</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Role-Based Access Control (RBAC):</strong> Granular permissions based on job function and need-to-know</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Multi-Factor Authentication:</strong> Required for all system access with hardware token support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Single Sign-On (SSO):</strong> Centralized authentication with activity logging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Privileged Access Management:</strong> Enhanced controls for administrative accounts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Compliance & Auditing</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>AS9100D Quality Management:</strong> Aerospace quality standards compliance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>ITAR Registered:</strong> International Traffic in Arms Regulations compliance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Comprehensive Audit Logs:</strong> Immutable logs of all system activity and data access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Regular Security Assessments:</strong> Quarterly penetration testing and annual third-party audits</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Incident Response</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>24/7 Security Operations Center:</strong> Round-the-clock monitoring and threat response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Incident Response Plan:</strong> Documented procedures for security event handling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Threat Intelligence:</strong> Real-time feeds and proactive threat hunting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-600 flex-shrink-0" />
                      <span><strong>Rapid Containment:</strong> Automated systems to isolate and neutralize threats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Security Reporting</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                If you discover a security vulnerability or have security concerns, please contact our security team immediately. We take all security reports seriously and respond within 24 hours.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">Security Team Contact:</p>
                <p className="text-gray-300">Email: security@aerospacefasteners.com</p>
                <p className="text-gray-300">Phone: +1 (714) 529-6144 (24/7 Security Hotline)</p>
                <p className="text-sm text-gray-400 mt-4">PGP Key: Available upon request for encrypted communications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
