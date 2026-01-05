import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TechLabel } from "../ui/TechLabel";
import { ArrowRight } from "lucide-react";

const TechnicalStat = ({ label, value, sub, delay }: { label: string, value: string, sub?: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative pl-3 sm:pl-4 border-l border-white/10 group hover:border-white/40 transition-colors duration-500"
  >
    <div className="absolute left-0 top-0 w-[1px] h-0 bg-white group-hover:h-full transition-all duration-500 ease-out" />
    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 group-hover:text-white/60 transition-colors">{label}</div>
    <div className="text-xl sm:text-2xl font-light text-white tracking-tight">{value}</div>
    {sub && <div className="text-[9px] sm:text-[10px] text-white/30 mt-1 font-mono">{sub}</div>}
  </motion.div>
);

const TechnicalFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative p-1 group">
    {/* Corners */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-white/60 transition-colors" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-white/60 transition-colors" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-white/60 transition-colors" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-white/60 transition-colors" />
    
    {/* Technical Markers */}
    <div className="absolute top-1/2 left-0 w-1 h-1 bg-white/20 -translate-x-1/2" />
    <div className="absolute top-1/2 right-0 w-1 h-1 bg-white/20 translate-x-1/2" />
    <div className="absolute top-0 left-1/2 w-1 h-1 bg-white/20 -translate-y-1/2" />
    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/20 translate-y-1/2" />

    {/* Content */}
    <div className="relative bg-black/40 backdrop-blur-sm border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
        {children}
    </div>
  </div>
);

const KittingAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [animationStep, setAnimationStep] = useState(0);
  
  // Mouse Parallax
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const rotateX = useTransform(y, [0, 400], [5, -5]);
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  useEffect(() => {
    if (isInView) {
      // Sequence controller
      const timers = [
        setTimeout(() => setAnimationStep(1), 500),  // Parts appear
        setTimeout(() => setAnimationStep(2), 3500), // Scan starts
        setTimeout(() => setAnimationStep(3), 5500), // Lid closes
        setTimeout(() => setAnimationStep(4), 6500), // Label appears
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  const partVariants = {
    initial: () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotate: Math.random() * 360,
      opacity: 0,
      scale: 0
    }),
    assembling: (i: number) => ({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: i * 0.08
      }
    })
  };

  const lidVariants = {
    open: { x: -400, opacity: 0 },
    closed: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" as const }
    }
  };

  return (
    <div 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative w-full aspect-square max-w-md mx-auto perspective-1000 cursor-crosshair"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full opacity-50" />
        
        <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="trayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <linearGradient id="lidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333" />
            <stop offset="50%" stopColor="#666" />
            <stop offset="100%" stopColor="#333" />
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
          </filter>
          <filter id="inner-shadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.8" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* The Tray Base */}
        <motion.rect
          x="40" y="40" width="320" height="320" rx="12"
          fill="url(#trayGradient)"
          stroke="#333"
          strokeWidth="1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
        
        {/* Noise Texture Overlay */}
        <motion.rect
          x="40" y="40" width="320" height="320" rx="12"
          fill="transparent"
          filter="url(#noise)"
          opacity="0.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
        />

        {/* Grid Lines on Tray */}
        <g opacity="0.1">
            <line x1="40" y1="146" x2="360" y2="146" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="253" x2="360" y2="253" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        </g>

        {/* Slots Group */}
        <g filter="url(#inner-shadow)">
          {/* Top Row: Bolts */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={`slot-bolt-${i}`} cx={80 + i * 80} cy="93" r="28" fill="#0a0a0a" stroke="#222" strokeWidth="0.5" />
          ))}
          {/* Middle Row: Nuts */}
          {[0, 1, 2, 3].map((i) => (
            <path key={`slot-nut-${i}`} d={`M ${65 + i * 80} 180 L ${95 + i * 80} 180 L ${105 + i * 80} 200 L ${95 + i * 80} 220 L ${65 + i * 80} 220 L ${55 + i * 80} 200 Z`} fill="#0a0a0a" stroke="#222" strokeWidth="0.5" />
          ))}
          {/* Bottom Row: Washers */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={`slot-washer-${i}`} cx={80 + i * 80} cy="306" r="24" fill="#0a0a0a" stroke="#222" strokeWidth="0.5" />
          ))}
        </g>

        {/* Slot Labels - Engraved Look */}
        <g opacity="0.2" style={{ fontSize: '6px', fontFamily: 'monospace', fill: 'white', pointerEvents: 'none' }}>
            {[0, 1, 2, 3].map(i => <text key={`lbl-b-${i}`} x={80 + i * 80} y="135" textAnchor="middle">BLT-0{i+1}</text>)}
            {[0, 1, 2, 3].map(i => <text key={`lbl-n-${i}`} x={80 + i * 80} y="240" textAnchor="middle">NUT-0{i+1}</text>)}
            {[0, 1, 2, 3].map(i => <text key={`lbl-w-${i}`} x={80 + i * 80} y="345" textAnchor="middle">WSH-0{i+1}</text>)}
        </g>

        {/* The Parts */}
        <g>
          {/* Bolts - Detailed */}
          {[0, 1, 2, 3].map((i) => (
            <motion.g key={`bolt-${i}`} custom={i} variants={partVariants} initial="initial" animate={animationStep >= 1 ? "assembling" : "initial"}>
              {/* Bolt Head */}
              <circle cx={80 + i * 80} cy="93" r="24" fill="url(#metalGradient)" stroke="white" strokeWidth="0.5" />
              {/* Hex Detail */}
              <path d={`M ${80 + i * 80} 78 L ${93 + i * 80} 85 L ${93 + i * 80} 101 L ${80 + i * 80} 108 L ${67 + i * 80} 101 L ${67 + i * 80} 85 Z`} fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
              {/* Thread Lines */}
              <path d={`M ${80 + i * 80} 85 L ${80 + i * 80} 101`} stroke="white" strokeWidth="0.5" opacity="0.3" />
              <path d={`M ${75 + i * 80} 93 L ${85 + i * 80} 93`} stroke="white" strokeWidth="0.5" opacity="0.3" />
            </motion.g>
          ))}
          
          {/* Nuts - Detailed */}
          {[0, 1, 2, 3].map((i) => (
            <motion.g key={`nut-${i}`} custom={i + 4} variants={partVariants} initial="initial" animate={animationStep >= 1 ? "assembling" : "initial"}>
              <path 
                d={`M ${68 + i * 80} 183 L ${92 + i * 80} 183 L ${100 + i * 80} 200 L ${92 + i * 80} 217 L ${68 + i * 80} 217 L ${60 + i * 80} 200 Z`}
                fill="url(#metalGradient)"
                stroke="white"
                strokeWidth="0.5"
              />
              {/* Inner Hole */}
              <circle cx={80 + i * 80} cy="200" r="12" fill="#1a1a1a" stroke="white" strokeWidth="0.5" opacity="0.8" />
              {/* Thread Detail */}
              <circle cx={80 + i * 80} cy="200" r="10" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
            </motion.g>
          ))}

          {/* Washers - Detailed */}
          {[0, 1, 2, 3].map((i) => (
            <motion.g key={`washer-${i}`} custom={i + 8} variants={partVariants} initial="initial" animate={animationStep >= 1 ? "assembling" : "initial"}>
              <circle cx={80 + i * 80} cy="306" r="20" fill="url(#metalGradient)" stroke="white" strokeWidth="0.5" opacity="0.9" />
              <circle cx={80 + i * 80} cy="306" r="12" fill="#1a1a1a" stroke="white" strokeWidth="0.5" />
            </motion.g>
          ))}
        </g>

        {/* Scanning Beam */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={animationStep === 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
            {/* The Laser Line */}
            <motion.line
              x1="40" y1="40" x2="360" y2="40"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="1"
              animate={animationStep === 2 ? { 
                y1: [40, 360, 40], 
                y2: [40, 360, 40],
              } : {}}
              transition={{ duration: 2, ease: "linear" }}
            />
            {/* The Glow Trail */}
            <motion.rect
              x="40" y="40" width="320" height="40"
              fill="url(#lidGradient)" // Re-using a gradient for now, but ideally a fade
              opacity="0.3"
              animate={animationStep === 2 ? { 
                y: [0, 320, 0], 
              } : {}}
              transition={{ duration: 2, ease: "linear" }}
              style={{ mixBlendMode: 'overlay' }}
            />
        </motion.g>

        {/* The Lid */}
        <motion.g
            initial="open"
            animate={animationStep >= 3 ? "closed" : "open"}
            variants={lidVariants}
        >
            <rect x="40" y="40" width="320" height="320" rx="12" fill="url(#lidGradient)" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
            {/* Lid Fasteners */}
            <circle cx="55" cy="55" r="3" fill="#333" stroke="white" strokeWidth="0.5" />
            <circle cx="345" cy="55" r="3" fill="#333" stroke="white" strokeWidth="0.5" />
            <circle cx="55" cy="345" r="3" fill="#333" stroke="white" strokeWidth="0.5" />
            <circle cx="345" cy="345" r="3" fill="#333" stroke="white" strokeWidth="0.5" />
            
            {/* Reflections on Lid */}
            <path d="M 40 40 L 360 360" stroke="white" strokeWidth="100" strokeOpacity="0.03" style={{ mixBlendMode: 'overlay' }} />
        </motion.g>

        {/* Shipping Label */}
        <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={animationStep >= 4 ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <rect x="220" y="280" width="120" height="60" rx="4" fill="white" />
            <rect x="230" y="290" width="30" height="30" fill="black" /> {/* QR Code placeholder */}
            <line x1="270" y1="295" x2="330" y2="295" stroke="black" strokeWidth="2" />
            <line x1="270" y1="305" x2="320" y2="305" stroke="black" strokeWidth="2" />
            <line x1="270" y1="315" x2="300" y2="315" stroke="black" strokeWidth="2" />
            <text x="230" y="332" fontSize="6" fontFamily="monospace" fill="black">VERIFIED: OK</text>
        </motion.g>

      </svg>

      {/* Status Indicators */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={animationStep >= 1 ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2"
        >
            <div className={`w-1.5 h-1.5 rounded-full ${animationStep >= 2 ? 'bg-white' : 'bg-white/30'}`} />
            <span className="text-[10px] font-mono text-white/50">ASSEMBLY</span>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={animationStep >= 2 ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2"
        >
            <div className={`w-1.5 h-1.5 rounded-full ${animationStep >= 3 ? 'bg-white' : 'bg-white/30'}`} />
            <span className="text-[10px] font-mono text-white/50">VERIFICATION</span>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={animationStep >= 3 ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2"
        >
            <div className={`w-1.5 h-1.5 rounded-full ${animationStep >= 4 ? 'bg-white' : 'bg-white/30'}`} />
            <span className="text-[10px] font-mono text-white/50">SEALING</span>
        </motion.div>
      </div>
      </motion.div>
    </div>
  );
};

export const PrecisionEngineering = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
          
          {/* Left Visual - Kitting Animation */}
          <div className="order-1 lg:order-1 relative h-full flex items-center">
            <TechnicalFrame>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex gap-2">
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/50 border border-white/10 text-[7px] sm:text-[8px] font-mono text-white/50">
                        CAM-01
                    </div>
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 border border-white/10 text-[7px] sm:text-[8px] font-mono text-white animate-pulse">
                        LIVE
                    </div>
                </div>
                <div className="p-4 sm:p-8 md:p-12">
                    <KittingAnimation />
                </div>
            </TechnicalFrame>
          </div>

          {/* Right Content */}
          <div className="order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="h-px w-8 sm:w-12 bg-white/30" />
                <TechLabel className="!text-white/50">Custom Solutions</TechLabel>
              </div>
              
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-[-0.02em] mb-6 sm:mb-8 leading-[0.95]">
                Intelligent <br />
                <span className="text-white/30">
                  Kitting & Design
                </span>
              </h2>
              
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 sm:mb-12 max-w-xl">
                Streamline your assembly line with custom-designed kitting solutions. We organize complex BOMs into single-SKU packages, reducing handling time and eliminating FOD risks.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-12 mb-8 sm:mb-12">
              <TechnicalStat 
                label="Assembly Time" 
                value="-40%" 
                sub="REDUCTION"
                delay={0.2} 
              />
              <TechnicalStat 
                label="Inventory" 
                value="1 SKU" 
                sub="CONSOLIDATED"
                delay={0.3} 
              />
              <TechnicalStat 
                label="Accuracy" 
                value="100%" 
                sub="VERIFIED"
                delay={0.4} 
              />
              <TechnicalStat 
                label="Organization" 
                value="0 FOD" 
                sub="GUARANTEED"
                delay={0.5} 
              />
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-widest text-white hover:text-white/70 transition-colors"
            >
              Explore Kitting Options
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};
