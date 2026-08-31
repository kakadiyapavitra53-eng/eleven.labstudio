import React, { useState } from 'react';
import { FOUNDING_TEAM, STUDIO_CAPABILITIES } from '../data/team';
import { GOOGLE_FORM_URL } from '../data/projects';
import { ArrowUpRight, Check, Users, Sparkles, Zap, Shield } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [activeMember, setActiveMember] = useState<string>('01');

  return (
    <section id="team" className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1E1E1E]">
          <div>
            <span className="text-xs font-bold text-[#4D9FFF] uppercase tracking-widest block mb-2">
              STUDIO LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] tracking-tight">
              BUILT BY PEOPLE WHO CARE ABOUT DIGITAL.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md mt-4 md:mt-0">
            A small, focused team combining design, technology and business thinking to build better digital experiences.
          </p>
        </div>

        {/* Founding Team Profiles (Typographic, High-Craft Editorial Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {FOUNDING_TEAM.map((member) => {
            const isSelected = activeMember === member.number;
            return (
              <div
                key={member.number}
                id={`team-member-${member.name.toLowerCase()}`}
                onMouseEnter={() => setActiveMember(member.number)}
                onClick={() => setActiveMember(member.number)}
                className={`group relative p-7 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#141414] border-[#4D9FFF]/60 shadow-xl shadow-[#4D9FFF]/5 -translate-y-1'
                    : 'bg-[#0E0E0E] border-[#222222] hover:border-[#333333] hover:bg-[#121212]'
                }`}
              >
                {/* Accent Top Line Indicator */}
                <div
                  className={`absolute top-0 left-8 right-8 h-0.5 rounded-full transition-all ${
                    isSelected ? 'bg-[#4D9FFF]' : 'bg-transparent group-hover:bg-[#4D9FFF]/30'
                  }`}
                />

                <div>
                  {/* Number & Role Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-sm font-mono font-bold transition-colors ${
                        isSelected ? 'text-[#4D9FFF]' : 'text-[#666666]'
                      }`}
                    >
                      {member.number}
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors ${
                        isSelected
                          ? 'text-[#4D9FFF] border-[#4D9FFF]/30 bg-[#4D9FFF]/10'
                          : 'text-[#888888] border-[#282828] bg-[#161616]'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>

                  {/* Typographic Avatar / Initials Moment */}
                  <div className="w-14 h-14 rounded-xl bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-lg font-black text-white mb-6 group-hover:border-[#4D9FFF]/50 transition-colors">
                    {member.name.slice(0, 2)}
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3">
                    {member.name}
                  </h3>

                  {/* Capability-Focused Description */}
                  <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6">
                    {member.description}
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="pt-5 border-t border-[#202020] space-y-1.5">
                  <div className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">
                    Core Focus
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.focus.map((f, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-[#CCCCCC] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#262626]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ElevenLab Studio Capabilities (Collective Tags without fake percentages) */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0F0F0F] border border-[#222222] mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#202020]">
            <div>
              <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-widest block mb-1">
                COMBINED EXPERTISE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                ELEVENLAB STUDIO CAPABILITIES
              </h3>
            </div>
            <p className="text-xs text-[#888888] max-w-sm">
              Our multidisciplinary stack spans design systems, engineering pipelines, and digital growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {STUDIO_CAPABILITIES.map((capability, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151515] border border-[#262626] hover:border-[#4D9FFF]/50 hover:bg-[#1A1A1A] transition-all duration-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF]/60 group-hover:bg-[#4D9FFF]" />
                <span className="text-xs sm:text-sm font-bold text-[#E5E5E5] tracking-wider uppercase">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section Unified CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#141414] via-[#111111] to-[#0A0A0A] border border-[#2A2A2A] text-center flex flex-col items-center justify-center">
          <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-widest mb-2">
            THREE PEOPLE. ONE STUDIO. ONE GOAL.
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl mb-4">
            Building digital experiences that help businesses move forward.
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1A1] max-w-md mb-8">
            Ready to collaborate with a focused, responsive team dedicated to your brand's digital presence?
          </p>
          <a
            id="team-cta-btn"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#4D9FFF]/20"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
