import { motion } from "framer-motion";

export const DataStream = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      {/* Vertical flowing lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] bg-black h-full"
          style={{ left: `${10 + i * 12}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5
          }}
        />
      ))}
      
      {/* Horizontal scan */}
      <motion.div
        className="absolute left-0 w-full h-[1px] bg-black"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
