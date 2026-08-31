import React from 'react';
import { Logo } from './Logo';
import {
  OFFICIAL_EMAIL,
  OFFICIAL_PHONE_DISPLAY,
  WHATSAPP_LINK,
  OFFICIAL_PORTFOLIO_URL,
  GOOGLE_FORM_URL
} from '../data/projects';
import { ArrowUpRight, Mail, MessageSquare, Globe } from 'lucide-react';
import { LegalPageType } from '../types';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenLegal: (page: LegalPageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-[#1C1C1C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1A1A1A]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={scrollToTop}
              className="group focus:outline-none rounded-lg text-left"
              aria-label="Scroll to top"
            >
              <Logo size="lg" />
            </button>
            
            <p className="text-sm text-[#A1A1A1] max-w-sm leading-relaxed">
              Digital experiences for ambitious businesses. We build websites, e-commerce, branding, social media, video, and digital solutions that convert.
            </p>

            <div className="pt-2">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4D9FFF] uppercase tracking-wider hover:underline"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-white uppercase tracking-widest block mb-4">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-[#A1A1A1]">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-work"
                  onClick={() => onNavigateSection('work')}
                  className="hover:text-white transition-colors"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-process"
                  onClick={() => onNavigateSection('process')}
                  className="hover:text-white transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-team"
                  onClick={() => onNavigateSection('team')}
                  className="hover:text-white transition-colors"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => onNavigateSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-white uppercase tracking-widest block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-[#A1A1A1]">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  E-commerce & Shopify
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Branding & Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Social Media Handling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Video Editing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  SEO & Digital Growth
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Digital Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-white uppercase tracking-widest block mb-4">
              LEGAL
            </span>
            <ul className="space-y-2.5 text-xs font-medium text-[#A1A1A1]">
              <li>
                <button
                  id="footer-legal-terms"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  id="footer-legal-privacy"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-legal-refund"
                  onClick={() => onOpenLegal('refund')}
                  className="hover:text-white transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-legal-disclaimer"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-white transition-colors text-left"
                >
                  Website Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="lg:col-span-2">
            <span className="text-xs font-bold text-white uppercase tracking-widest block mb-4">
              CONTACT
            </span>
            <div className="space-y-3 text-xs text-[#A1A1A1]">
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#4D9FFF]" />
                <span className="truncate">{OFFICIAL_EMAIL}</span>
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>{OFFICIAL_PHONE_DISPLAY}</span>
              </a>

              <a
                href={OFFICIAL_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors pt-2"
              >
                <Globe className="w-3.5 h-3.5 text-[#A1A1A1]" />
                <span>View Full Portfolio</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <div>
            &copy; 2026 ElevenLab Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#888888]">Modern Digital Agency</span>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
