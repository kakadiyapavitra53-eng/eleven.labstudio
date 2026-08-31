import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/agency';
import { Compass, Sparkles, Code2, Rocket, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <Compass className="w-5 h-5" />;
      case 1: return <Sparkles className="w-5 h-5" />;
      case 2: return <Code2 className="w-5 h-5" />;
      case 3: return <Rocket className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const stepDetails = [
    {
      title: 'DISCOVERY & ALIGNMENT',
      timeline: 'Phase 01 • Days 1–3',
      objective: 'Deep-dive into your business model, target clientele, competitors, and technical requirements.',
      deliverables: ['Brand Brief & Scope Definition', 'User Journey Architecture', 'Tech Stack Selection', 'Content & Asset Outline']
    },
    {
      title: 'DESIGN & USER EXPERIENCE',
      timeline: 'Phase 02 • Days 4–8',
      objective: 'Crafting responsive, high-craft layouts with tailored typography, custom color systems, and conversion-optimized components.',
      deliverables: ['High-Fidelity Wireframes', 'Interactive UI Prototypes', 'Responsive Layout System', 'Micro-Interaction Blueprints']
    },
    {
      title: 'ENGINEERING & INTEGRATION',
      timeline: 'Phase 03 • Days 9–14',
      objective: 'Writing clean, performant TypeScript and React code with mobile-first architecture and third-party integrations.',
      deliverables: ['Responsive Web Development', 'Lead Funnel & Form Wiring', 'SEO Metadata & Performance Tuning', 'Speed Optimization']
    },
    {
      title: 'OPTIMIZATION & LAUNCH',
      timeline: 'Phase 04 • Days 15+',
      objective: 'Comprehensive cross-device QA, Core Web Vitals audit, domain DNS wiring, and official go-live handover.',
      deliverables: ['Cross-Device QA & Testing', 'Domain & DNS Configuration', 'Analytics Setup', 'Handover & Client Support']
    }
  ];

  const currentDetail = stepDetails[activeStepIndex] || stepDetails[0];

  return (
    <section id="process" className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1E1E1E]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>DELIVERY FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] tracking-tight">
              FROM IDEA TO LAUNCH.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md mt-4 md:mt-0 leading-relaxed">
            A disciplined four-phase delivery methodology ensuring speed, design excellence, and transparent progress.
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Cards */}
        <div className="relative mb-10">
          
          {/* Subtle Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#222222] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const isSelected = activeStepIndex === index;

              return (
                <div
                  key={step.number}
                  id={`process-step-${step.number}`}
                  onClick={() => setActiveStepIndex(index)}
                  className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#141414] border-[#4D9FFF] shadow-xl shadow-[#4D9FFF]/10 -translate-y-1'
                      : 'bg-[#111111] border-[#242424] hover:border-[#383838] hover:bg-[#131313]'
                  }`}
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`p-3 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-[#4D9FFF] text-[#080808] border-[#4D9FFF]'
                            : 'bg-[#181818] border-[#2A2A2A] text-[#4D9FFF] group-hover:bg-[#4D9FFF]/20'
                        }`}
                      >
                        {getStepIcon(index)}
                      </div>
                      <span
                        className={`text-2xl font-mono font-black transition-colors ${
                          isSelected ? 'text-[#4D9FFF]' : 'text-[#3A3A3A] group-hover:text-[#666666]'
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest block mb-1 transition-colors ${
                        isSelected ? 'text-[#4D9FFF]' : 'text-[#888888]'
                      }`}
                    >
                      {step.subtitle}
                    </span>

                    <h3 className="text-xl font-extrabold text-white tracking-tight mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1E1E1E] flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-[#4D9FFF] font-bold' : 'text-[#666666]'}>
                      {isSelected ? 'Active Phase Details' : `Step 0${index + 1} of 04`}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-[#4D9FFF] translate-x-1' : 'text-[#666666] group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Interactive Stage Deep-Dive Panel */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[#242424] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#202020]">
            <div>
              <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-wider block mb-1">
                {currentDetail.timeline}
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {currentDetail.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-md">
              {currentDetail.objective}
            </p>
          </div>

          <div>
            <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-4">
              STAGE OUTPUTS & DELIVERABLES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentDetail.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#161616] border border-[#262626] text-xs text-[#E5E5E5] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4D9FFF] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
