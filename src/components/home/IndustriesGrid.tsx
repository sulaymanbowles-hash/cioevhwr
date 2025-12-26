import { motion } from "framer-motion";
import { TechLabel } from "../ui/TechLabel";
import { ArrowRight } from "lucide-react";
import { AviationIcon, DefenseIcon, SpaceIcon, MROIcon } from "../ui/TechnicalIcons";
import { useNavigate } from "react-router-dom";

const industries = [
  { 
    title: "Commercial Aviation", 
    desc: "Supporting major carriers and OEMs with critical airframe and engine components.", 
    icon: AviationIcon,
    highlight: "Major Carriers",
    colSpan: "lg:col-span-3"
  },
  { 
    title: "Defense & Military", 
    desc: "ITAR compliant supply chain for DoD contractors and military programs.", 
    icon: DefenseIcon,
    highlight: "ITAR Compliant",
    colSpan: "lg:col-span-2"
  },
  { 
    title: "Space & Satellite", 
    desc: "Mission-critical hardware for launch vehicles and orbital systems.", 
    icon: SpaceIcon,
    highlight: "Space Grade",
    colSpan: "lg:col-span-2"
  },
  { 
    title: "MRO & Repair", 
    desc: "24/7 AOG support and rapid logistics for maintenance operations.", 
    icon: MROIcon,
    highlight: "AOG Support",
    colSpan: "lg:col-span-3"
  }
];

export const IndustriesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 md:px-8 bg-black text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/30" />
              <TechLabel className="!text-white/50">Market Reach</TechLabel>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[0.95]">
              Critical Missions
              <br />
              <span className="text-white/30">Global Impact</span>
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/about')}
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            View All Industries
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${industry.colSpan} group relative bg-white/5 border border-white/10 p-10 hover:bg-white hover:text-black transition-all duration-500 rounded-sm overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-5 transition-opacity duration-500 transform group-hover:scale-110 origin-top-right">
                <industry.icon className="w-40 h-40" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <industry.icon className="w-8 h-8 mb-6 text-white group-hover:text-black transition-colors" />
                  <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                  <p className="text-white/60 group-hover:text-black/70 leading-relaxed max-w-md transition-colors">
                    {industry.desc}
                  </p>
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 group-hover:border-black/10 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-50">
                    {industry.highlight}
                  </span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
