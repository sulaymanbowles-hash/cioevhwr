import { motion } from "framer-motion";
import { Factory, ShieldCheck, Package, Plane, CheckCircle } from "lucide-react";
import { TechLabel } from "../ui/TechLabel";

export const SupplyChainAnimation = () => {

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-black" />
              <TechLabel>Supply Chain Velocity</TechLabel>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[0.95]">
              Streamlined
              <br />
              <span className="text-gray-400">Logistics Network</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-xl">
              Our integrated supply chain ensures rapid movement from manufacturing to final delivery. 
              We leverage advanced logistics to minimize lead times and maximize operational readiness for our aerospace partners.
            </p>

            <div className="space-y-6">
              {[
                { title: "JIT Delivery", desc: "Just-in-time inventory management to reduce your carrying costs." },
                { title: "AOG Support", desc: "24/7 Aircraft on Ground rapid response protocols." },
                { title: "Global Reach", desc: "International shipping compliance and export control expertise." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1">
                    <CheckCircle className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Geometric Animation */}
          <div className="relative h-[500px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-inner">
            {/* Grid Background */}
            <div className="absolute inset-0" 
              style={{ 
                backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', 
                backgroundSize: '40px 40px',
                opacity: 0.5
              }} 
            />

            {/* SVG Layer for Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Connecting Lines */}
              <motion.path
                d="M 100,250 L 250,150 L 450,250 L 650,150"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Secondary Path */}
              <motion.path
                d="M 100,250 Q 275,350 450,250"
                fill="none"
                stroke="black"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              {/* Moving Particles */}
              <motion.circle
                r="4"
                fill="black"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 1
                }}
                style={{ offsetPath: "path('M 100,250 L 250,150 L 450,250 L 650,150')" }}
              />
              
              <motion.circle
                r="3"
                fill="black"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 1.5
                }}
                style={{ offsetPath: "path('M 100,250 Q 275,350 450,250')" }}
              />
            </svg>

            {/* Nodes */}
            <div className="absolute inset-0">
              {/* Node 1: Sourcing */}
              <motion.div 
                className="absolute left-[10%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg z-10 relative">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div className="absolute inset-0 bg-black/10 rounded-full animate-ping" />
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className="font-bold text-xs uppercase tracking-wider">Sourcing</div>
                    <div className="text-[10px] text-gray-500">Raw Materials</div>
                  </div>
                </div>
              </motion.div>

              {/* Node 2: Quality */}
              <motion.div 
                className="absolute left-[35%] top-[30%] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg z-10 relative">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className="font-bold text-xs uppercase tracking-wider">Quality</div>
                    <div className="text-[10px] text-gray-500">AS9100 Rev. D</div>
                  </div>
                </div>
              </motion.div>

              {/* Node 3: Inventory */}
              <motion.div 
                className="absolute left-[60%] top-[50%] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg z-10 relative">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className="font-bold text-xs uppercase tracking-wider">Inventory</div>
                    <div className="text-[10px] text-gray-500">Climate Controlled</div>
                  </div>
                </div>
              </motion.div>

              {/* Node 4: Logistics */}
              <motion.div 
                className="absolute left-[85%] top-[30%] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="relative group">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg z-10 relative">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                    <div className="font-bold text-xs uppercase tracking-wider">Logistics</div>
                    <div className="text-[10px] text-gray-500">Global Delivery</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
