import React from 'react';

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
}

export const MovingBorder: React.FC<MovingBorderProps> = ({
  children,
  duration = 4,
  className = '',
  containerClassName = '',
  borderRadius = '1.25rem',
}) => {
  return (
    <div
      className={`relative p-[1.5px] overflow-hidden ${containerClassName}`}
      style={{ borderRadius }}
    >
      {/* Moving Beam Layer */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius,
        }}
      >
        <div
          className="absolute inset-[-100%] animate-[spin_6s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, #D6AD60 320deg, #FFE8A8 340deg, #E89A27 360deg)',
          }}
        />
      </div>

      {/* Inner Card Container */}
      <div
        className={`relative bg-midnight-card z-10 ${className}`}
        style={{ borderRadius: `calc(${borderRadius} - 1.5px)` }}
      >
        {children}
      </div>
    </div>
  );
};

