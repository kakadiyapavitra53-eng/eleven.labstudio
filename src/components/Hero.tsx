import React, { useState, useEffect } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { ArrowRight, ArrowDown, Sparkles, CheckCircle2, Globe, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]"
    >
      {/* Background Abstract Grid & Ambient Light Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Interactive Cursor Reactive Accent Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out opacity-25"
        style={{
          background: 'radial-gradient(circle, #4D9FFF 0%, rgba(77,159,255,0.05) 70%, transparent 100%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Secondary Ambient Corner Glow */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Headline & Conversion Block */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Small Label Badge */}
            <div
              id="hero-agency-badge"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold tracking-widest text-[#F5F5F5] uppercase mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-pulse" />
              <span className="text-[#F5F5F5]">ELEVENLAB STUDIO</span>
              <span className="text-[#666666]">•</span>
              <span className="text-[#4D9FFF]">DIGITAL AGENCY</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F5F5F5] leading-[1.08] mb-6"
            >
              WE BUILD DIGITAL{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F0F0F0] to-[#4D9FFF]">
                EXPERIENCES
              </span>{' '}
              THAT MAKE BRANDS{' '}
              <span className="underline decoration-[#4D9FFF]/40 decoration-wavy decoration-2 underline-offset-8">
                STAND OUT.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              id="hero-subtext"
              className="text-lg sm:text-xl text-[#A1A1A1] max-w-2xl font-normal leading-relaxed mb-10"
            >
              Websites, e-commerce, branding, social media, video and digital solutions designed to help
              businesses look better, build trust and grow online.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto mb-10">
              <a
                id="hero-primary-cta"
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-sm sm:text-base tracking-wider uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#4D9FFF]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <button
                id="hero-secondary-cta"
                onClick={onExploreWork}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#151515] hover:bg-[#1C1C1C] text-[#F5F5F5] font-semibold text-sm sm:text-base px-7 py-4 rounded-xl border border-[#282828] hover:border-[#3E3E3E] transition-all duration-200 cursor-pointer"
              >
                <span>VIEW OUR WORK</span>
                <ArrowDown className="w-4 h-4 text-[#A1A1A1] group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </div>

            {/* Disciplines Tagline Strip */}
            <div className="pt-4 border-t border-[#1C1C1C] w-full flex items-center">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#737373] uppercase">
                WEB &bull; E-COMMERCE &bull; BRANDING &bull; SOCIAL &bull; VIDEO &bull; SEO &bull; DIGITAL SOLUTIONS
              </span>
            </div>

          </div>

          {/* Abstract Editorial Digital Showcase */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-[#111111]/80 border border-[#222222] backdrop-blur-md shadow-2xl">
              
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222222]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-[#E5E5E5] uppercase tracking-wider">
                    STUDIO STATUS
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#4D9FFF] bg-[#4D9FFF]/10 border border-[#4D9FFF]/20 px-2 py-0.5 rounded">
                  Q1/Q2 SESSIONS OPEN
                </span>
              </div>

              {/* Agency Highlights Preview */}
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#4D9FFF]/10 text-[#4D9FFF] mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5]">Fast Turnaround</div>
                    <div className="text-xs text-[#A1A1A1] mt-0.5">Direct execution with rapid milestones & weekly delivery.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5]">Real Live Projects</div>
                    <div className="text-xs text-[#A1A1A1] mt-0.5">8+ deployed live demo platforms ready to inspect.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#F5F5F5]">Transparent Pricing</div>
                    <div className="text-xs text-[#A1A1A1] mt-0.5">Packages starting from ₹5,000 with clear deliverables.</div>
                  </div>
                </div>
              </div>

              {/* Live Enquiry Quick Trigger */}
              <div className="mt-5 pt-4 border-t border-[#222222] flex items-center justify-between text-xs">
                <span className="text-[#888888]">Official Intake:</span>
                <span className="text-[#4D9FFF] font-semibold flex items-center gap-1">
                  Google Form Verified <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
