import React from 'react';

// Ornate Indian corner filigree
export const CornerFiligree: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 sm:w-8 sm:h-8 text-gold/60 pointer-events-none ${className}`}
  >
    <path
      d="M2 2H18C20 2 24 6 24 10V24C24 28 28 32 32 32H38"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="6" cy="6" r="2" fill="currentColor" />
    <circle cx="34" cy="34" r="2" fill="currentColor" />
    <path
      d="M2 10C8 10 10 8 10 2"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

// Traditional Royal Arch Top Divider
export const RoyalArchDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full flex items-center justify-center my-8 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
    <div className="mx-4 flex items-center gap-2">
      <span className="text-gold/40 text-xs">✦</span>
      <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center bg-midnight shadow-gold-glow">
        <span className="text-sm">🪔</span>
      </div>
      <span className="text-gold/40 text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
  </div>
);

// Indian Royal Jali (Geometric lattice background pattern)
export const RoyalJaliBackground: React.FC<{ className?: string; opacity?: string }> = ({
  className = '',
  opacity = 'opacity-5',
}) => (
  <div
    className={`absolute inset-0 pointer-events-none ${opacity} ${className}`}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23D6AD60' stroke-width='0.75'/%3E%3Ccircle cx='20' cy='20' r='3' fill='%23D6AD60'/%3E%3C/svg%3E")`,
      backgroundSize: '36px 36px',
    }}
  />
);

// Wax Seal Stamp Effect
export const WaxSealStamp: React.FC<{ label: string; sub?: string; className?: string }> = ({
  label,
  sub = 'CONFIRMED',
  className = '',
}) => (
  <div
    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-burgundy-light via-burgundy to-midnight border-2 border-gold/70 shadow-gold-glow ${className}`}
  >
    <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-[10px] font-black text-gold">
      ✓
    </div>
    <div className="text-left leading-tight">
      <span className="text-[10px] uppercase font-bold tracking-widest text-gold block font-mono">
        {sub}
      </span>
      <span className="text-xs font-bold text-ivory tracking-wide block font-serif">
        {label}
      </span>
    </div>
  </div>
);

