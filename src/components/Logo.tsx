import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-sm tracking-tight',
    md: 'text-base tracking-tight',
    lg: 'text-lg tracking-tight'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Pristine Geometric Monogram 11 */}
      <div className={`relative flex items-center justify-center rounded-lg bg-[#111111] border border-[#2A2A2A] p-1.5 transition-colors group-hover:border-[#4D9FFF]/50 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* First "1" */}
          <path
            d="M8 12L12 8V24H8"
            stroke="#F5F5F5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Second "1" with Blue Accent Point */}
          <path
            d="M18 12L22 8V24H18"
            stroke="#4D9FFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle connecting digital node */}
          <circle cx="22" cy="8" r="1.5" fill="#4D9FFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold text-[#F5F5F5] font-sans">
            <span className={`${textSizes[size]} font-extrabold tracking-wider`}>ELEVENLAB</span>
            <span className={`${textSizes[size]} font-light text-[#4D9FFF] tracking-widest`}>STUDIO</span>
          </div>
          <span className="text-[9px] text-[#A1A1A1] uppercase tracking-[0.2em] font-medium -mt-1 hidden sm:block">
            Digital Agency
          </span>
        </div>
      )}
    </div>
  );
};
