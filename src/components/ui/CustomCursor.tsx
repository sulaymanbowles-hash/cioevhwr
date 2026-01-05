import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'text' | 'link' | 'hidden';

export const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer ring - slower, more fluid
  const springConfigOuter = { damping: 20, stiffness: 150, mass: 0.6 };
  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);
  
  // Inner dot - snappy
  const springConfigInner = { damping: 40, stiffness: 1000 };
  const innerX = useSpring(cursorX, springConfigInner);
  const innerY = useSpring(cursorY, springConfigInner);

  // Check for pointer device
  useEffect(() => {
    const checkPointer = () => {
      const hasFineMouse = window.matchMedia('(pointer: fine)').matches;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      setIsPointerDevice(hasFineMouse && hasHover);
    };
    
    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    });
  }, [cursorX, cursorY, isVisible]);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    // Check for data attributes first
    const label = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
    if (label) {
      setCursorLabel(label);
      setVariant('hover');
      return;
    }
    
    // Determine variant based on element type
    if (target.closest('a, [role="link"]')) {
      setVariant('link');
    } else if (target.closest('button, [role="button"], input[type="submit"]')) {
      setVariant('hover');
    } else if (target.closest('input, textarea, select')) {
      setVariant('text');
    } else if (target.closest('[data-cursor-hidden]')) {
      setVariant('hidden');
    } else {
      setVariant('hover');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVariant('default');
    setCursorLabel(null);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const addListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], [role="link"], [data-cursor-label], [data-cursor-hidden]'
      );
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial add
    addListeners();
    
    // Re-add on DOM changes with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(addListeners, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isPointerDevice, moveCursor, handleMouseEnter, handleMouseLeave]);

  // Don't render on touch devices
  if (!isPointerDevice) return null;

  const getOuterSize = () => {
    switch (variant) {
      case 'hover': return 64;
      case 'link': return 80;
      case 'text': return 0;
      case 'hidden': return 0;
      default: return 32;
    }
  };

  const getInnerSize = () => {
    switch (variant) {
      case 'hover': return 8;
      case 'link': return 8;
      case 'text': return 32;
      case 'hidden': return 0;
      default: return 8;
    }
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-black/20 backdrop-blur-[1px]"
          animate={{
            width: getOuterSize(),
            height: getOuterSize(),
            opacity: isVisible && variant !== 'hidden' && variant !== 'text' ? 1 : 0,
            borderColor: variant === 'link' ? 'rgba(255, 95, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            backgroundColor: variant === 'link' ? 'rgba(255, 95, 0, 0.05)' : 'transparent',
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            mass: 0.5
          }}
        />
        
        {/* Label */}
        <AnimatePresence>
          {cursorLabel && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5"
            >
              {cursorLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: getInnerSize(),
            height: variant === 'text' ? 32 : getInnerSize(),
            opacity: isVisible && variant !== 'hidden' ? 1 : 0,
            borderRadius: variant === 'text' ? 2 : '50%',
            scaleX: variant === 'text' ? 0.1 : 1,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 500,
          }}
        />
      </motion.div>
    </>
  );
};
