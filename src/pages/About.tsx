import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Target, Users, Award, Globe, TrendingUp, Shield } from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">About Aerospace Fasteners</TechLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-gray-900 leading-[1.1]">
              Building the Future of
              <br />Aerospace Distribution
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Since 1979, we've been the trusted distributor of precision aerospace fasteners for commercial and military customers worldwide. Family-owned and operated from our 34,000 sq. ft. facility in Palestine, Texas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-8 border-y border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">{stat.number}</div>
                <div className="text-sm font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TechLabel className="mb-6">Our Mission</TechLabel>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-[1.15]">
                Powering Aerospace Innovation
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                We solve one of aerospace's most critical challenges: ensuring the right hardware reaches the right place at the right time, every time. Our philosophy is simple—on time, every time, defect free.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Through our AS9100 Rev. D and ISO 9001:2015 certified processes, strategic manufacturer partnerships, and barcode-managed inventory system with lot traceability, we maintain up to three years of parts inventory supporting both commercial and military aerospace programs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 gap-6"
            >
              {[
                { icon: Target, title: "Precision", desc: "Every component meets exact specifications" },
                { icon: Shield, title: "Quality", desc: "AS9100 Rev. D & ISO 9001:2015 certified" },
                { icon: TrendingUp, title: "Reliability", desc: "Consistent on-time delivery" },
                { icon: Globe, title: "Global Reach", desc: "Serving customers worldwide" }
              ].map((value, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="p-3 bg-black text-white rounded-lg">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6">Our Journey</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              A Legacy of Excellence
            </h2>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                year: "1979",
                title: "Founded in Palestine, Texas",
                desc: "Established as a family-owned aerospace fastener distributor, beginning a legacy of excellence serving commercial and military customers."
              },
              {
                year: "2010",
                title: "AS9100 Certification Achieved",
                desc: "Earned AS9100 certification, demonstrating our commitment to aerospace quality management standards and continuous improvement."
              },
              {
                year: "2015",
                title: "Expanded Distribution Network",
                desc: "Grew warehouse facilities and established strategic partnerships with major OEMs and approved manufacturers."
              },
              {
                year: "2020",
                title: "International Growth",
                desc: "Expanded to serve international customers with comprehensive 24/7 AOG support capabilities and global shipping."
              },
              {
                year: "2024",
                title: "Continued Excellence",
                desc: "Serving 300+ customers worldwide with AS9100 Rev. D and ISO 9001:2015 certifications, maintaining the highest quality standards."
              }
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-black text-white rounded-lg flex items-center justify-center">
                    <span className="font-mono text-lg font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 md:px-8">
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
                className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-lg"
              >
                <div className="w-20 h-20 bg-gray-700 rounded-full mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                <TechLabel className="text-gray-500">{member.experience}</TechLabel>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6 md:px-8 bg-gray-900 text-white">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TechLabel className="mb-6 text-gray-500">Certifications & Compliance</TechLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Committed to the Highest Standards
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "AS9100 Rev. D", desc: "Quality Management" },
              { name: "ISO 9001:2015", desc: "International Standard" },
              { name: "ITAR Compliant", desc: "Export Compliance" },
              { name: "CAGE: 4U021", desc: "Government Entity Code" }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
              >
                <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-bold mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-400">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
