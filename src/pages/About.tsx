import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Target, Users, Award, Globe, TrendingUp, Shield } from "lucide-react";

export const About = () => {
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
            <TechLabel className="mb-6">About Aerospace Fasteners</TechLabel>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
              Building the Future of Aerospace Distribution
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we've been the trusted partner for aerospace manufacturers and maintenance organizations worldwide, delivering precision hardware with unmatched reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-8 border-y border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Years in Business", sublabel: "Since 1998" },
              { number: "150k+", label: "Active SKUs", sublabel: "In Stock" },
              { number: "3,000+", label: "Active Customers", sublabel: "Worldwide" },
              { number: "99.8%", label: "On-Time Delivery", sublabel: "2024 Average" }
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Powering Aerospace Innovation Through Reliable Distribution
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We exist to solve one of aerospace's most critical challenges: ensuring the right hardware reaches the right place at the right time, every time.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our AS9100D-certified processes, strategic partnerships with leading manufacturers, and investment in cutting-edge inventory management systems, we've become the backbone of aerospace supply chains across the globe.
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
                { icon: Shield, title: "Quality", desc: "AS9100D & ISO 9001:2015 certified" },
                { icon: TrendingUp, title: "Reliability", desc: "99.8% on-time delivery rate" },
                { icon: Globe, title: "Global Reach", desc: "Serving customers on 6 continents" }
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
                year: "1998",
                title: "Founded in Southern California",
                desc: "Started as a small aerospace fastener distributor serving local manufacturers in the greater Los Angeles area."
              },
              {
                year: "2005",
                title: "AS9100 Certification Achieved",
                desc: "Earned our first AS9100 certification, marking our commitment to aerospace quality management standards."
              },
              {
                year: "2012",
                title: "Expanded Distribution Network",
                desc: "Opened additional warehouse facilities and established partnerships with major OEMs and approved distributors."
              },
              {
                year: "2018",
                title: "International Growth",
                desc: "Began serving international customers across Europe, Asia, and South America with 24/7 AOG support."
              },
              {
                year: "2023",
                title: "Technology Integration",
                desc: "Implemented advanced inventory management systems with real-time tracking and predictive analytics."
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
              { name: "Michael Chen", role: "Chief Executive Officer", experience: "30+ years aerospace" },
              { name: "Sarah Rodriguez", role: "VP of Operations", experience: "25+ years supply chain" },
              { name: "David Thompson", role: "Director of Quality", experience: "20+ years QA/QC" }
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
              { name: "AS9100D", desc: "Quality Management" },
              { name: "ISO 9001:2015", desc: "International Standard" },
              { name: "ITAR Registered", desc: "Export Compliance" },
              { name: "CAGE Code", desc: "0P9Z1" }
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
