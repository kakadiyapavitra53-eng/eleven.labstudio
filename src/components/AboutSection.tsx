import React, { useState } from 'react';
import { WHY_ELEVENLAB } from '../data/agency';
import { Sparkles, Shield, Smartphone, Zap, Lightbulb, BadgePercent, CheckCircle2, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Shield className="w-5 h-5" />;
      case 1: return <Smartphone className="w-5 h-5" />;
      case 2: return <Zap className="w-5 h-5" />;
      case 3: return <Lightbulb className="w-5 h-5" />;
      case 4: return <BadgePercent className="w-5 h-5" />;
      case 5: return <Layers className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-[#090909] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Identity Core Headline */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-[#4D9FFF] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AGENCY IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight mb-4">
            WE'RE ELEVENLAB STUDIO.
          </h2>
          <p className="text-base sm:text-lg text-[#B0B0B0] font-normal leading-relaxed">
            We combine design, technology and strategy to help businesses build a stronger digital presence.
          </p>
        </div>

        {/* Why ElevenLab Interactive Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#202020]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#4D9FFF] bg-[#4D9FFF]/10 border border-[#4D9FFF]/20 px-2.5 py-1 rounded">
                STUDIO ADVANTAGE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                WHY ELEVENLAB STUDIO?
              </h3>
            </div>
            <span className="text-xs text-[#888888] hidden sm:inline-block font-mono">
              Hover or tap cards to expand insights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_ELEVENLAB.map((item, index) => {
              const isActive = activeCard === index;
              return (
                <div
                  key={item.title}
                  id={`why-card-${item.number}`}
                  onClick={() => setActiveCard(index)}
                  onMouseEnter={() => setActiveCard(index)}
                  className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                    isActive
                      ? 'bg-[#151D29] border-[#4D9FFF] shadow-lg shadow-[#4D9FFF]/10'
                      : 'bg-[#111111] border-[#222222] hover:border-[#383838] hover:bg-[#141414]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`p-3 rounded-xl border transition-colors ${
                          isActive
                            ? 'bg-[#4D9FFF]/10 border-[#4D9FFF]/30 text-[#4D9FFF]'
                            : 'bg-[#181818] border-[#262626] text-[#A1A1A1]'
                        }`}
                      >
                        {getIcon(index)}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#666666]">
                        {item.number}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white tracking-wide mb-2 flex items-center gap-2">
                      <span>{item.title}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#4D9FFF]" />}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-3">
                      {item.shortDesc}
                    </p>

                    {isActive && (
                      <div className="pt-3 mt-2 border-t border-[#202A3A] text-xs text-[#CCCCCC] leading-relaxed animate-in fade-in duration-200">
                        {item.detail}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-2 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                    <span>STUDIO STANDARD</span>
                    <span className={isActive ? 'text-[#4D9FFF]' : ''}>
                      {isActive ? 'Active Details' : 'Tap to View'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
