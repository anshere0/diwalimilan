import React from 'react';
import { motion } from 'framer-motion';

export const GoldenRays: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Ray 1 */}
      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          rotate: [-35, -31, -35],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut',
        }}
        style={{
          transformOrigin: 'top left',
          background: 'linear-gradient(135deg, rgba(232, 154, 39, 0.3) 0%, rgba(214, 173, 96, 0.08) 40%, transparent 75%)',
        }}
        className="absolute -top-40 -left-20 w-[600px] h-[900px] blur-3xl"
      />

      {/* Ray 2 */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          rotate: [30, 36, 30],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          transformOrigin: 'top right',
          background: 'linear-gradient(225deg, rgba(214, 173, 96, 0.25) 0%, rgba(75, 22, 39, 0.15) 50%, transparent 80%)',
        }}
        className="absolute -top-40 -right-20 w-[650px] h-[950px] blur-3xl"
      />
    </div>
  );
};

