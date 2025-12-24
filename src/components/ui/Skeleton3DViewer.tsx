import { motion } from "framer-motion";

export const Skeleton3DViewer = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center overflow-hidden">
      {/* Orbital ring animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-48 h-48"
      >
        <div className="absolute inset-0 border-2 border-gray-200 border-t-gray-400 rounded-full" />
      </motion.div>

      {/* Inner pulse */}
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-100"
      />

      {/* Loading text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["8px", "20px", "8px"]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="w-1 bg-gray-400 rounded-full"
              />
            ))}
          </div>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Loading 3D Model</span>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-300" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-300" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-300" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-300" />
    </div>
  );
};
