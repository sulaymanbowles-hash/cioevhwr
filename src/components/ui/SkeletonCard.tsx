import { motion } from "framer-motion";

export const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-black/10 bg-white overflow-hidden group"
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-3 w-24 bg-gray-200 rounded" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Part number */}
        <div className="h-3 w-32 bg-gray-200 rounded" />

        {/* Button */}
        <div className="h-10 w-full bg-gray-100 rounded" />
      </div>

      {/* Shimmer effect */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};
