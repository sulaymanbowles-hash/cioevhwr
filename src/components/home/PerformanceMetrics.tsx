import { motion } from "framer-motion";
import { TechLabel } from "../ui/TechLabel";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(value * percentage));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const PerformanceMetrics = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/30" />
              <TechLabel className="!text-white/50">Operational Excellence</TechLabel>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]">
              Metrics That <br />
              <span className="text-white/30">Define Reliability</span>
            </h2>
          </div>
          <p className="text-lg text-white/60 leading-relaxed max-w-xl">
            Our commitment to precision goes beyond parts. We measure every aspect of our performance to ensure your supply chain never misses a beat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {[
            { label: "Active SKUs", value: 150000, suffix: "+", desc: "Ready to ship inventory" },
            { label: "On-Time Delivery", value: 99, suffix: "%", desc: "Consistent performance" },
            { label: "Quality Rating", value: 100, suffix: "%", desc: "AS9100 Rev. D standards" },
            { label: "Global Partners", value: 300, suffix: "+", desc: "Trusted worldwide" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-10 group hover:bg-white/5 transition-colors duration-500"
            >
              <div className="text-4xl md:text-5xl font-mono font-bold mb-4 text-white group-hover:text-safety-orange transition-colors">
                <Counter value={stat.value} />{stat.suffix}
              </div>
              <div className="h-px w-12 bg-white/20 mb-6 group-hover:w-full transition-all duration-700" />
              <h3 className="text-lg font-bold mb-2">{stat.label}</h3>
              <p className="text-white/50 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
