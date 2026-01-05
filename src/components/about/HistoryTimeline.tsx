import { motion } from "framer-motion";
import { TechLabel } from "../ui/TechLabel";

const milestones = [
  {
    year: "1979",
    title: "Foundation",
    desc: "Established in Palestine, Texas as a specialized distributor of aerospace fasteners."
  },
  {
    year: "1995",
    title: "Expansion",
    desc: "Moved to current 34,000 sq. ft. facility to accommodate growing inventory."
  },
  {
    year: "2008",
    title: "AS9100 Certification",
    desc: "Achieved AS9100 Rev. B certification, marking a commitment to aerospace quality standards."
  },
  {
    year: "2015",
    title: "Global Reach",
    desc: "Expanded distribution network to serve customers in over 20 countries."
  },
  {
    year: "2024",
    title: "Digital Transformation",
    desc: "Launched new digital platform to streamline procurement for modern aerospace needs."
  }
];

export const HistoryTimeline = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-white relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <TechLabel className="mb-4 sm:mb-6">Our History</TechLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">Legacy of Excellence</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 sm:gap-8 items-start relative ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[17px] sm:left-[29px] md:left-1/2 top-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black rounded-full border-2 border-white ring-1 ring-gray-200 transform md:-translate-x-1/2 z-10 mt-2" />

                {/* Spacer for Desktop */}
                <div className="hidden md:block flex-1" />
                
                {/* Content */}
                <div className={`flex-1 pl-12 sm:pl-20 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <span className={`text-5xl font-bold text-gray-100 absolute -top-6 z-0 select-none hidden md:block ${i % 2 === 0 ? "right-16" : "left-16"}`}>
                    {milestone.year}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold text-gray-200 mb-1 sm:mb-2 block md:hidden">
                    {milestone.year}
                  </span>
                  <div className="relative z-10">
                    <div className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{milestone.title}</div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
