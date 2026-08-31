import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { GOOGLE_FORM_URL, WHATSAPP_LINK } from '../data/projects';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Services', 'Pricing', 'Process', 'General'];

  const filteredItems = FAQ_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const toggleAccordion = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#090909] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-[#4D9FFF] uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
            CLEAR ANSWERS TO COMMON QUESTIONS.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A1] mt-3 font-normal leading-relaxed">
            Everything you need to know about our web packages, video production, social media handling, and project delivery timeline.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#4D9FFF] text-[#080808] font-black'
                  : 'bg-[#141414] text-[#888888] hover:text-white border border-[#242424]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-3">
            {filteredItems.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={item.question}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141414] border-[#4D9FFF]/60 shadow-lg shadow-[#4D9FFF]/5'
                      : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAccordion(idx);
                      }
                    }}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9FFF]"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.question}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg bg-[#1C1C1C] text-[#A1A1A1] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#4D9FFF] bg-[#4D9FFF]/10' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed border-t border-[#1C1C1C] animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#222222] space-y-5 text-left">
            <div className="p-3 rounded-xl bg-[#4D9FFF]/10 text-[#4D9FFF] w-fit">
              <MessageSquare className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Have a specific question?</h3>
              <p className="text-xs text-[#A1A1A1] leading-relaxed">
                Connect directly with our founding team to discuss custom scope, timelines, or technical feasibility.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#181818] hover:bg-[#222] text-white border border-[#2E2E2E] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                <span>OFFICIAL INTAKE FORM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
