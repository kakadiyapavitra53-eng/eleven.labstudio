import React from 'react';
import { VALUES } from '../data/agency';

export const TrustStrip: React.FC = () => {
  return (
    <section
      id="trust-values"
      className="py-12 border-y border-[#1C1C1C] bg-[#0C0C0C]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Section Heading & Statement */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#222222] pb-6 lg:pb-0 lg:pr-8">
            <span className="text-[11px] font-bold text-[#4D9FFF] uppercase tracking-widest block mb-1">
              OUR PROMISE
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#F5F5F5] tracking-tight mb-2">
              BUILT FOR MODERN BUSINESS.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
              From first impression to final conversion, we create digital
              experiences designed around your business.
            </p>
          </div>

          {/* Four Values Grid (Architectural & Compact) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {VALUES.map((val) => (
              <div
                key={val.number}
                className="group relative p-3.5 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#4D9FFF]/40 transition-all duration-200"
              >
                <div className="text-xs font-mono font-bold text-[#4D9FFF] mb-1.5 flex items-center justify-between">
                  <span>{val.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF]/40 group-hover:bg-[#4D9FFF]" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#F5F5F5] tracking-wide mb-1">
                  {val.title}
                </div>
                <div className="text-[11px] text-[#8E8E8E] leading-snug line-clamp-2">
                  {val.description}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
