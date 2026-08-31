import React, { useState } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { ArrowRight, Check, Sparkles, ShieldCheck, Globe, Zap, CheckCircle2, HelpCircle } from 'lucide-react';

export type LaunchOfferType = 'domain' | 'seo';

export const PricingOfferSection: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<LaunchOfferType>('domain');

  const offers: {
    id: LaunchOfferType;
    title: string;
    description: string;
    icon: typeof Globe;
    accentColor: string;
    iconBg: string;
  }[] = [
    {
      id: 'domain',
      title: '1 YEAR FREE DOMAIN*',
      description: 'Top-level domain included with annual website setup.',
      icon: Globe,
      accentColor: 'text-[#4D9FFF]',
      iconBg: 'bg-[#4D9FFF]/10'
    },
    {
      id: 'seo',
      title: '6 MONTHS FREE SEO*',
      description: 'On-page optimization and indexing setup.',
      icon: Zap,
      accentColor: 'text-teal-400',
      iconBg: 'bg-teal-500/10'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#0A0A0A] border-b border-[#1C1C1C] relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4D9FFF]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card Container */}
        <div className="rounded-3xl bg-[#111111] border border-[#242424] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Top Label */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#2E2E2E] text-xs font-bold text-[#4D9FFF] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT STUDIO PACKAGES</span>
            </div>
            <span className="text-xs font-mono text-[#888888]">
              Direct Founder Execution &bull; No Hidden Surprises
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
                WEBSITES FROM <span className="text-[#4D9FFF]">₹5,000</span>
              </h2>

              <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed mb-8">
                Professional websites designed for businesses that want to look credible, build customer trust, and capture more online enquiries.
              </p>

              {/* Special Bundle Offers (Interactive / Selectable) */}
              <div className="p-6 rounded-2xl bg-[#161616] border border-[#2A2A2A] mb-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#4D9FFF]" />
                    <span>SPECIAL LAUNCH BUNDLE INCLUDED:</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#888888] hidden sm:inline-block">
                    Select your preferred offer
                  </span>
                </div>

                {/* Selectable Cards Grid */}
                <div
                  role="radiogroup"
                  aria-label="Special launch bundle options"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {offers.map((offer) => {
                    const isSelected = selectedOffer === offer.id;
                    const IconComponent = offer.icon;

                    return (
                      <div
                        key={offer.id}
                        id={`offer-card-${offer.id}`}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => setSelectedOffer(offer.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedOffer(offer.id);
                          }
                        }}
                        className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9FFF] flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#151D29] border-[#4D9FFF] shadow-md shadow-[#4D9FFF]/10'
                            : 'bg-[#1C1C1C] border-[#333333] hover:border-[#444444] hover:bg-[#1E1E1E]'
                        }`}
                      >
                        {/* Icon Container */}
                        <div
                          className={`p-2 rounded-lg ${offer.iconBg} ${offer.accentColor} mt-0.5 shrink-0 transition-colors`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Text & Check indicator */}
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-bold text-white tracking-tight truncate">
                              {offer.title}
                            </div>
                          </div>
                          <div className="text-xs text-[#888888] mt-0.5 leading-relaxed">
                            {offer.description}
                          </div>
                        </div>

                        {/* Selected Checkmark Indicator Badge */}
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#4D9FFF] text-[#080808]'
                              : 'border border-[#444444] group-hover:border-[#666666] bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] text-[#777777] mt-3">
                  *T&C apply. Domain & SEO offer subject to project scope and registrar availability.
                </div>
              </div>

              {/* Quick Deliverable Points */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#CCCCCC] font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D9FFF]" />
                  <span>Responsive Mobile Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D9FFF]" />
                  <span>Fast Performance Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D9FFF]" />
                  <span>WhatsApp Chat Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4D9FFF]" />
                  <span>Lead Capture Funnel</span>
                </div>
              </div>

              {/* Service Pricing Scope Clarification */}
              <div className="mt-6 p-3.5 rounded-xl bg-[#141414] border border-[#262626] text-xs text-[#8E8E8E] leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#4D9FFF] shrink-0 mt-0.5" />
                <span>
                  <strong>Note:</strong> ₹5,000 is our starting website package price. Video editing, social media management, e-commerce systems, and custom software receive tailored quotes based on your exact deliverables.
                </span>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-sm p-8 rounded-2xl bg-[#161616] border border-[#2E2E2E] text-center shadow-xl">
                
                <span className="text-xs font-mono font-bold text-[#888888] uppercase tracking-widest block mb-2">
                  WEBSITE PACKAGES START AT
                </span>

                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                  ₹5,000<span className="text-2xl text-[#4D9FFF] font-bold">+</span>
                </div>

                {/* Active Selected Offer Badge in Action Box */}
                <div className="my-3 py-2 px-3 rounded-lg bg-[#111111] border border-[#262626] flex items-center justify-center gap-1.5 text-xs text-[#CCCCCC]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4D9FFF]" />
                  <span className="text-[#888888]">Selected Offer:</span>
                  <span className="font-bold text-white">
                    {selectedOffer === 'domain' ? '1 Year Free Domain' : '6 Months Free SEO'}
                  </span>
                </div>

                <p className="text-xs text-[#888888] mb-6">
                  Custom quote tailored to your specific goals, integrations & requirements.
                </p>

                <a
                  id="pricing-get-started-cta"
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#4D9FFF]/20 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#777777]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Google Form Consultation</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

