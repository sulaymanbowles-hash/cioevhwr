import { motion } from "framer-motion";

export const IconWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {children}
  </svg>
);

export const SourcingIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    <motion.path d="M50 5 V95 M5 50 H95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
    <motion.ellipse cx="50" cy="50" rx="45" ry="20" stroke="currentColor" strokeWidth="0.5" />
    <motion.ellipse cx="50" cy="50" rx="20" ry="45" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
    <circle cx="75" cy="35" r="1.5" fill="currentColor" />
    <circle cx="25" cy="65" r="1.5" fill="currentColor" />
    <path d="M50 50 L75 35 M50 50 L25 65" stroke="currentColor" strokeWidth="0.5" />
  </IconWrapper>
);

export const QualityIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M50 5 L90 20 V50 C90 75 50 95 50 95 C50 95 10 75 10 50 V20 L50 5 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    <path d="M50 5 V95 M10 50 H90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <motion.path d="M30 50 L45 65 L70 35" stroke="currentColor" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }} />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
  </IconWrapper>
);

export const LogisticsIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.rect x="10" y="30" width="60" height="40" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    <path d="M70 30 L90 50 V70 H70 V30" stroke="currentColor" strokeWidth="1" />
    <path d="M10 30 L30 10 H70 L50 30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="25" cy="70" r="8" stroke="currentColor" strokeWidth="1" />
    <circle cx="55" cy="70" r="8" stroke="currentColor" strokeWidth="1" />
    <path d="M10 50 H70 M40 30 V70" stroke="currentColor" strokeWidth="0.5" />
    <motion.path d="M80 20 L95 20 M90 15 L95 20 L90 25" stroke="currentColor" strokeWidth="1" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5 }} />
  </IconWrapper>
);

export const AviationIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M50 10 L55 30 H85 L90 40 H60 L65 80 H55 L50 90 L45 80 H35 L40 40 H10 L15 30 H45 L50 10 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    <path d="M50 10 V90" stroke="currentColor" strokeWidth="0.5" />
    <path d="M10 40 H90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
  </IconWrapper>
);

export const DefenseIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M50 10 L62 35 H90 L68 52 L76 80 L50 65 L24 80 L32 52 L10 35 H38 L50 10 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" />
    <path d="M50 10 V65" stroke="currentColor" strokeWidth="0.5" />
    <path d="M10 35 H90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
  </IconWrapper>
);

export const SpaceIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M50 20 C50 20 30 40 30 70 H70 C70 40 50 20 50 20 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    <path d="M30 70 L20 90 H40 L45 80" stroke="currentColor" strokeWidth="1" />
    <path d="M70 70 L80 90 H60 L55 80" stroke="currentColor" strokeWidth="1" />
    <path d="M50 20 V80" stroke="currentColor" strokeWidth="0.5" />
    <path d="M30 50 H70" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
    <circle cx="80" cy="20" r="5" stroke="currentColor" strokeWidth="1" />
    <path d="M80 20 L50 50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
  </IconWrapper>
);

export const MROIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    <path d="M40 20 V60 M20 40 H60" stroke="currentColor" strokeWidth="0.5" />
    <motion.path d="M60 60 L90 90 M70 80 L80 70" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }} />
    <rect x="55" y="55" width="10" height="10" stroke="currentColor" strokeWidth="1" transform="rotate(45 60 60)" />
  </IconWrapper>
);

export const DeliveryIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M40 10 L20 50 H50 L40 90 L80 40 H50 L60 10 L40 10 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    <path d="M10 50 H90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
    <path d="M50 10 V90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
  </IconWrapper>
);

export const CustomersIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.rect x="20" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
    <motion.rect x="45" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
    <motion.rect x="70" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
    <motion.rect x="32" y="15" width="20" height="20" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
    <motion.rect x="58" y="15" width="20" height="20" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} />
    <path d="M10 70 H100" stroke="currentColor" strokeWidth="0.5" />
  </IconWrapper>
);

export const CertifiedIcon = ({ className }: { className?: string }) => (
  <IconWrapper className={className}>
    <motion.path d="M50 10 L85 25 V50 C85 75 50 90 50 90 C50 90 15 75 15 50 V25 L50 10 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    <path d="M50 25 V75 M25 50 H75" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" />
  </IconWrapper>
);
