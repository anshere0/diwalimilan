import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-black/40 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-marigold via-gold to-gold-light origin-left shadow-[0_0_12px_rgba(214,173,96,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};

