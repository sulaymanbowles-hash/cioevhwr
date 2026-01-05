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
    <section className="py-20 sm:py-32 px-4 sm:px-6 md:px-8 bg-black text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-white/30" />
              <TechLabel className="!text-white/50">Market Reach</TechLabel>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[0.95]">
              Critical Missions
              <br />
              <span className="text-white/30">Global Impact</span>
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/about')}
            className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            View All Industries
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-black p-8 sm:p-12 hover:bg-white/5 transition-colors duration-500"
            >
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-sm flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                  <industry.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{industry.title}</h3>
                <div className="h-px w-12 bg-white/20 mb-3 sm:mb-4 group-hover:w-full transition-all duration-700" />
              </div>

              <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base min-h-0 sm:min-h-[3rem]">
                {industry.desc}
              </p>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 bg-safety-orange rounded-full" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                  {industry.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
