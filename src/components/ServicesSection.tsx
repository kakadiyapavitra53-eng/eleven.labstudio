import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { GOOGLE_FORM_URL } from '../data/projects';
import {
  ArrowUpRight,
  Check,
  Layout,
  ShoppingBag,
  Store,
  Palette,
  TrendingUp,
  Cpu,
  Share2,
  Video,
  ChevronRight,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Store': return <Store className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      default: return <Layout className="w-5 h-5" />;
    }
  };

  const activeService = SERVICES[activeIndex] || SERVICES[0];

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
    setExpandedMobile(expandedMobile === index ? null : index);
  };

  return (
    <section id="services" className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1E1E1E]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] tracking-tight">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md mt-4 md:mt-0 leading-relaxed">
            From your first digital impression to ongoing content and growth, we build the systems businesses need to show up professionally online.
          </p>
        </div>

        {/* Editorial Interactive Layout: Desktop Left List + Right Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services List (Interactive rows with hover & focus) */}
          <div className="lg:col-span-7 space-y-3">
            {SERVICES.map((service, index) => {
              const isCurrent = activeIndex === index;
              const isMobileExpanded = expandedMobile === index;

              return (
                <div
                  key={service.number}
                  id={`service-item-${service.number}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleServiceClick(index)}
                  className={`group cursor-pointer rounded-2xl border transition-all duration-300 p-5 sm:p-6 ${
                    isCurrent
                      ? 'bg-[#141414] border-[#4D9FFF]/50 shadow-lg shadow-[#4D9FFF]/5'
                      : 'bg-[#0E0E0E] border-[#222222] hover:border-[#333333] hover:bg-[#121212]'
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      {/* Number with active glow */}
                      <span
                        className={`text-sm sm:text-base font-mono font-bold transition-colors ${
                          isCurrent ? 'text-[#4D9FFF]' : 'text-[#666666] group-hover:text-[#A1A1A1]'
                        }`}
                      >
                        {service.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={`p-2.5 rounded-lg border transition-all ${
                          isCurrent
                            ? 'bg-[#4D9FFF]/10 border-[#4D9FFF]/30 text-[#4D9FFF]'
                            : 'bg-[#181818] border-[#282828] text-[#888888] group-hover:text-white'
                        }`}
                      >
                        {getIcon(service.iconName)}
                      </div>

                      {/* Title */}
                      <div>
                        <h3
                          className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                            isCurrent ? 'text-white' : 'text-[#CCCCCC] group-hover:text-white'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#888888] mt-1 line-clamp-1 group-hover:text-[#A1A1A1]">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`p-2 rounded-full transition-all ${
                        isCurrent
                          ? 'bg-[#4D9FFF] text-[#080808] rotate-0'
                          : 'bg-transparent text-[#666666] group-hover:text-white -rotate-45'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Mobile expansion content (Progressive Disclosure) */}
                  {isMobileExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#262626] lg:hidden animate-in fade-in duration-200">
                      <p className="text-xs text-[#A1A1A1] leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#CCCCCC]">
                            <Check className="w-3.5 h-3.5 text-[#4D9FFF] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] uppercase tracking-wider hover:underline"
                      >
                        <span>{service.ctaText || `REQUEST ${service.title}`}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Right Side Service Detail Showcase */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-2xl bg-[#121212] border border-[#262626] shadow-xl relative overflow-hidden">
              
              {/* Subtle top accent bar */}
              <div className="w-12 h-1 bg-[#4D9FFF] rounded-full mb-6" />

              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-[#4D9FFF] bg-[#4D9FFF]/10 border border-[#4D9FFF]/20 px-2.5 py-1 rounded">
                  SERVICE {activeService.number}
                </span>
                <span className="text-xs uppercase text-[#888888] tracking-wider font-semibold">
                  Standard Studio Deliverable
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">
                {activeService.title}
              </h3>

              <p className="text-sm text-[#A1A1A1] leading-relaxed mb-6">
                {activeService.description}
              </p>

              {/* What We Deliver Checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold text-[#E5E5E5] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4D9FFF]" />
                  <span>TYPICAL DELIVERABLES:</span>
                </div>
                {activeService.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#181818] border border-[#2A2A2A]"
                  >
                    <div className="p-1 rounded-md bg-[#4D9FFF]/10 text-[#4D9FFF] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-[#DDDDDD] font-medium leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-200 shadow-md shadow-[#4D9FFF]/10 transform hover:-translate-y-0.5"
              >
                <span>{activeService.ctaText || `START A ${activeService.title} PROJECT`}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#777777]">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Enquiry routed to official Google Intake</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
