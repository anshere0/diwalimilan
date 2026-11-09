import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ShimmerButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'crimson' | 'emerald';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  shimmerColor?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = 'gold',
  className = '',
  size = 'md',
  shimmerColor = 'rgba(255, 255, 255, 0.35)',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs min-h-[38px]',
    md: 'px-7 py-3.5 text-sm sm:text-base min-h-[48px]',
    lg: 'px-9 py-4 text-base sm:text-lg min-h-[54px]',
  }[size];

  const variantClasses = {
    gold: 'bg-gradient-to-r from-marigold via-gold to-marigold text-midnight font-bold shadow-diya hover:shadow-diya-lg border border-gold-light/40',
    outline: 'bg-midnight/90 hover:bg-gold/15 text-ivory border border-gold/50 font-semibold shadow-md',
    crimson: 'bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy text-gold border border-gold/40 font-bold shadow-lg',
    emerald: 'bg-emerald-700 hover:bg-emerald-600 text-white font-bold border border-emerald-400/40 shadow',
  }[variant];

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-full overflow-hidden uppercase tracking-wider font-sans select-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Moving Shimmer Sweep */}
      {!disabled && (
        <span
          className="absolute inset-0 pointer-events-none -translate-x-[120%] hover:translate-x-[120%] transition-transform duration-1000 ease-out"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
            transform: 'skewX(-20deg)',
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

