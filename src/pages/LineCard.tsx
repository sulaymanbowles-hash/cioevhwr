import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { Factory, CheckCircle } from "lucide-react";

const manufacturers = [
  "Alcoa Fastening Systems",
  "LISI Aerospace",
  "PCC Fasteners",
  "Cherry Aerospace",
  "Monogram Aerospace Fasteners",
  "Saturn Fasteners",
  "SPS Technologies",
  "Avibank Mfg. Inc.",
  "Click Bond",
  "Shur-Lok",
  "Heartland Precision Fasteners",
  "Fitz Manufacturing"
];

const categories = [
  { name: "Bolts", description: "High-strength structural bolts, hex head, 12-point" },
  { name: "Nuts", description: "Self-locking, castellated, shear nuts" },
  { name: "Screws", description: "Machine screws, pan head, flat head" },
  { name: "Pins", description: "Quick release, cotter pins, dowel pins" },
  { name: "Fittings", description: "Hydraulic, pneumatic, fluid transfer" },
  { name: "Rivets", description: "Solid, blind, structural rivets" }
];

export const LineCard = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <TechLabel className="mb-4">Authorized Distribution</TechLabel>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Line Card
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            We are an authorized distributor for the world's leading aerospace fastener manufacturers. 
            Our direct relationships ensure full traceability and factory-new condition for every component.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Factory className="w-8 h-8" />
              Manufacturers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {manufacturers.map((mfg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3 hover:border-black transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{mfg}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Product Categories</h2>
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-black transition-all group"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                  <p className="text-gray-600">{cat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-black text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Don't see what you're looking for?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our network extends beyond these listed manufacturers. Contact our sourcing team for hard-to-find items.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg"
          >
            Contact Sourcing Team
          </a>
        </div>
      </div>
    </div>
  );
};
