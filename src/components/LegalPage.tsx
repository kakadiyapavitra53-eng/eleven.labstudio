import React, { useEffect, useState } from 'react';
import { LegalPageType } from '../types';
import {
  TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
  REFUND_POLICY,
  WEBSITE_DISCLAIMER,
  LegalDoc
} from '../data/legal';
import { ArrowLeft, FileText, Shield, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  pageType: LegalPageType;
  onChangePage: (page: LegalPageType) => void;
  onBackToHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  pageType,
  onChangePage,
  onBackToHome
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageType]);

  const getDoc = (): LegalDoc => {
    switch (pageType) {
      case 'terms': return TERMS_AND_CONDITIONS;
      case 'privacy': return PRIVACY_POLICY;
      case 'refund': return REFUND_POLICY;
      case 'disclaimer': return WEBSITE_DISCLAIMER;
      default: return TERMS_AND_CONDITIONS;
    }
  };

  const doc = getDoc();

  const tabs: { type: LegalPageType; label: string; icon: React.ReactNode }[] = [
    { type: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
    { type: 'privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4" /> },
    { type: 'refund', label: 'Refund Policy', icon: <RefreshCw className="w-4 h-4" /> },
    { type: 'disclaimer', label: 'Website Disclaimer', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Navigation */}
        <div className="mb-8">
          <button
            id="legal-back-to-home-btn"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#A1A1A1] hover:text-white px-4 py-2 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#333333] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO HOMEPAGE</span>
          </button>
        </div>

        {/* Legal Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#222222] scrollbar-none">
          {tabs.map((tab) => {
            const isActive = pageType === tab.type;
            return (
              <button
                key={tab.type}
                id={`legal-tab-${tab.type}`}
                onClick={() => onChangePage(tab.type)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                    : 'bg-[#121212] text-[#A1A1A1] hover:text-white hover:bg-[#181818] border border-[#242424]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Document Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Table of Contents for Large Docs (Desktop Sidebar) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 h-fit max-h-[80vh] overflow-y-auto pr-4">
            <div className="p-5 rounded-2xl bg-[#101010] border border-[#202020]">
              <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-wider block mb-3">
                TABLE OF CONTENTS
              </span>
              <ul className="space-y-1.5 text-xs text-[#8E8E8E]">
                {doc.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#sec-${idx}`}
                      className="block py-1 hover:text-white transition-colors truncate"
                    >
                      {sec.number ? `${sec.number}. ` : ''}{sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Document Body */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header Header */}
            <div className="pb-8 border-b border-[#222222]">
              <span className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-widest block mb-2">
                OFFICIAL POLICY & LEGAL STANDARDS
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                {doc.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-[#888888]">
                <span>Effective & Last Updated: {doc.lastUpdated}</span>
                <span>&bull;</span>
                <span>ElevenLab Studio</span>
              </div>
              <p className="mt-4 text-sm text-[#A1A1A1] leading-relaxed bg-[#121212] p-4 rounded-xl border border-[#222222]">
                {doc.summary}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {doc.sections.map((sec, idx) => (
                <div
                  key={idx}
                  id={`sec-${idx}`}
                  className="p-6 rounded-2xl bg-[#111111] border border-[#1F1F1F] scroll-mt-28"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {sec.number && (
                      <span className="text-xs font-mono font-bold text-[#4D9FFF] bg-[#4D9FFF]/10 border border-[#4D9FFF]/20 px-2 py-0.5 rounded">
                        {sec.number}
                      </span>
                    )}
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="p-6 rounded-2xl bg-[#0D0D0D] border border-[#222222] text-xs text-[#777777] leading-relaxed">
              For any legal or contractual inquiries regarding ElevenLab Studio services, please email{' '}
              <a href="mailto:elevenlabs.studio2026@gmail.com" className="text-[#4D9FFF] underline">
                elevenlabs.studio2026@gmail.com
              </a>{' '}
              or reach out via WhatsApp at +91 90817 77443.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
