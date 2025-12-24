import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastNotificationProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "bg-green-50 border-green-200 text-green-900",
  error: "bg-red-50 border-red-200 text-red-900",
  info: "bg-blue-50 border-blue-200 text-blue-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
};

const iconColors = {
  success: "text-green-600",
  error: "text-red-600",
  info: "text-blue-600",
  warning: "text-yellow-600",
};

export const ToastNotification = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastNotificationProps) => {
  const Icon = icons[type];

  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="fixed top-24 right-8 z-[100] max-w-md"
        >
          <div className={`${colors[type]} border rounded-lg shadow-2xl p-4 pr-12 flex items-start gap-3`}>
            <Icon className={`w-5 h-5 ${iconColors[type]} flex-shrink-0 mt-0.5`} />
            <p className="text-sm font-medium leading-relaxed">{message}</p>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 hover:opacity-60 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          {duration && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`h-1 ${iconColors[type]} origin-left mt-1 rounded-full opacity-30`}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
