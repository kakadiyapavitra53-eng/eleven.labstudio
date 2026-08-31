import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past hero section (~450px or hero height)
      const heroElement = document.getElementById('hero');
      const heroHeight = heroElement ? heroElement.offsetHeight : 450;
      const currentScroll = window.scrollY;

      if (currentScroll > heroHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate total scroll progress percentage
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalDocHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-22 right-6 z-30 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      }`}
    >
      <button
        id="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#121212]/95 backdrop-blur-md border border-[#282828] text-white hover:text-[#4D9FFF] hover:border-[#4D9FFF]/60 shadow-xl shadow-black/60 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#4D9FFF]/50"
      >
        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="21"
            className="text-[#202020]"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            className="text-[#4D9FFF] transition-all duration-150 ease-out"
            strokeWidth="2"
            strokeDasharray={132}
            strokeDashoffset={132 - (132 * scrollProgress) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-[#181818] border border-[#2E2E2E] text-[11px] font-bold text-[#E5E5E5] tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Top
        </span>
      </button>
    </div>
  );
};
