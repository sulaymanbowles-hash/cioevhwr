import { motion } from "framer-motion";
import { TechLabel } from "./TechLabel";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="relative">
        {/* Animated logo/text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            AEROSPACE<span className="font-light text-gray-400">FASTENERS</span>
          </h2>
          <TechLabel className="text-xs">Initializing Precision Systems</TechLabel>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="h-px w-64 bg-gradient-to-r from-transparent via-black to-transparent mt-8 origin-left"
        />

        {/* Pulsing dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 rounded-full bg-black"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
