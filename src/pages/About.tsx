import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { QualityIcon, CertifiedIcon, LogisticsIcon, SourcingIcon, DefenseIcon, AviationIcon } from "../components/ui/TechnicalIcons";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { HistoryTimeline } from "../components/about/HistoryTimeline";
import { GridBackground } from "../components/ui/GridBackground";
import { Users } from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <GridBackground pattern="lines" opacity={0.03} />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <TechLabel className="mb-4 sm:mb-6">About Aerospace Fasteners</TechLabel>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-gray-900 leading-[1.1]">
              Building the Future of
              <br />Aerospace Distribution
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Since 1979, we've been the trusted distributor of precision aerospace fasteners for commercial and military customers worldwide. Family-owned and operated from our 34,000 sq. ft. facility in Palestine, Texas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 border-y border-gray-200 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { number: "45+", label: "Years in Business", sublabel: "Since 1979" },
              { number: "34", label: "Employees", sublabel: "Small Business" },
              { number: "300+", label: "Active Customers", sublabel: "Worldwide" },
              { number: "34,000+", label: "Square Feet", sublabel: "3 Buildings" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TechnicalBorder className="text-center p-4 sm:p-8 bg-gray-50/50 hover:bg-white transition-colors h-full flex flex-col justify-center">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-gray-900">{stat.number}</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">{stat.label}</div>
                  <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">{stat.sublabel}</div>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TechLabel className="mb-4 sm:mb-6">Our Mission</TechLabel>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-[1.15]">
                Powering Aerospace Innovation
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                We solve one of aerospace's most critical challenges: ensuring the right hardware reaches the right place at the right time, every time. Our philosophy is simple—on time, every time, defect free.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Through our AS9100 Rev. D and ISO 9001:2015 certified processes, strategic manufacturer partnerships, and barcode-managed inventory system with lot traceability, we maintain up to three years of parts inventory supporting both commercial and military aerospace programs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {[
                { icon: QualityIcon, title: "Precision", desc: "Every component meets exact specifications" },
                { icon: CertifiedIcon, title: "Quality", desc: "AS9100 Rev. D & ISO 9001:2015 certified" },
                { icon: LogisticsIcon, title: "Reliability", desc: "Consistent on-time delivery" },
                { icon: SourcingIcon, title: "Global Reach", desc: "Serving customers worldwide" }
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <TechnicalBorder className="flex items-start gap-4 sm:gap-6 p-5 sm:p-8 bg-white hover:shadow-lg transition-all group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 text-gray-900 group-hover:text-black transition-colors flex-shrink-0">
                      <value.icon className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                    </div>
                  </TechnicalBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HistoryTimeline />

      {/* Team Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Leadership</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Led by Industry Veterans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings over 150 years of combined aerospace experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Jason Elfarr", role: "President", experience: "Executive Leadership" },
              { name: "Carole Elfarr", role: "Vice President", experience: "Operations Management" },
              { name: "Travis Link", role: "Quality / Warehouse Manager", experience: "Quality Assurance" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TechnicalBorder className="bg-white p-8 h-full hover:shadow-lg transition-all">
                  <div className="w-20 h-20 bg-gray-100 rounded-full mb-6 flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 font-mono">{member.role}</p>
                    <TechLabel className="text-gray-400">{member.experience}</TechLabel>
                  </div>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6 md:px-8 bg-black text-white relative overflow-hidden">
        <GridBackground pattern="dots" opacity={0.1} className="bg-white" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6 !text-gray-500">Certifications & Compliance</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Committed to the Highest Standards
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "AS9100 Rev. D", desc: "Quality Management", icon: CertifiedIcon },
              { name: "ISO 9001:2015", desc: "International Standard", icon: QualityIcon },
              { name: "ITAR Compliant", desc: "Export Compliance", icon: DefenseIcon },
              { name: "CAGE: 4U021", desc: "Government Entity Code", icon: AviationIcon }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TechnicalBorder className="text-center p-8 border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-colors h-full group">
                  <div className="w-16 h-16 mx-auto mb-6 text-gray-500 group-hover:text-white transition-colors">
                    <cert.icon className="w-full h-full" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.desc}</p>
                </TechnicalBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
