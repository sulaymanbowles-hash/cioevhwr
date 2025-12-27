import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface OperationalStatusProps {
  className?: string;
  showText?: boolean;
}

export const OperationalStatus = ({ className, showText = true }: OperationalStatusProps) => {
  return (
    <div className={cn("absolute bottom-0 left-0 w-full h-32 pointer-events-none overflow-hidden flex items-end justify-between px-6 md:px-12 pb-8 opacity-20 mix-blend-screen", className)}>
       {/* Left side: System Status Text */}
       {showText && (
       <div className="hidden md:flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <motion.div 
                className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
             />
             <span className="text-[10px] font-mono text-white/80 uppercase tracking-[0.2em]">System Operational</span>
          </div>
          <div className="flex gap-4 text-[10px] font-mono text-white/40">
             <span>UPTIME: 99.99%</span>
             <span>LATENCY: &lt;1MS</span>
          </div>
       </div>
       )}

       {/* Center: Activity Graph */}
       <div className="flex items-end gap-[2px] h-16 mx-auto">
          {[...Array(32)].map((_, i) => (
             <motion.div
                key={i}
                className="w-[2px] bg-gradient-to-t from-white/80 to-transparent"
                animate={{
                   height: ["10%", "40%", "20%", "70%", "30%", "10%"],
                   opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut",
                   times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                   delay: i * 0.05,
                   repeatType: "loop"
                }}
                style={{ height: "10%" }}
             />
          ))}
       </div>

       {/* Right: Processing Indicators */}
       {showText && (
       <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex gap-1">
             {[...Array(3)].map((_, i) => (
                <motion.div
                   key={i}
                   className="w-1 h-1 bg-white/80"
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
             ))}
          </div>
          <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.2em]">Processing</span>
       </div>
       )}
       
       {/* Background Scan Line */}
       <motion.div
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
             top: ["0%", "100%"],
             opacity: [0, 0.5, 0]
          }}
          transition={{
             duration: 5,
             repeat: Infinity,
             ease: "linear"
          }}
       />
    </div>
  );
};
