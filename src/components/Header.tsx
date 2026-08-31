import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLegalView?: boolean;
  onBackToHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isLegalView = false,
  onBackToHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'WORK', id: 'work' },
    { label: '3D WEB', id: 'experience-3d' },
    { label: 'SHOWCASE', id: 'showcase' },
    { label: 'SERVICES', id: 'services' },
    { label: 'SEO DEMO', id: 'seo-demo' },
    { label: 'MEDIA & VIDEO', id: 'social-showcase' },
    { label: 'PRICING', id: 'pricing' },
    { label: 'FAQ', id: 'faq' }
  ];

  const handleNavClick = (id: string) => {
    if (isLegalView && onBackToHome) {
      onBackToHome();
      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isLegalView && onBackToHome) {
      onBackToHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#222222] py-3 shadow-xl shadow-black/40'
          : 'bg-transparent border-b border-white/[0.04] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          id="header-logo-btn"
          onClick={handleLogoClick}
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9FFF] rounded-lg transition-transform hover:scale-[1.01]"
          aria-label="ElevenLab Studio Homepage"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#111111]/85 border border-[#222222] px-3 py-1.5 rounded-full backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = !isLegalView && activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9FFF] cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#1E1E1E]'
                    : 'text-[#A1A1A1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#4D9FFF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="header-cta-btn"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 bg-[#151515] hover:bg-[#1C1C1C] text-[#F5F5F5] hover:text-white text-xs font-bold tracking-wide uppercase px-4 py-2.5 rounded-xl border border-[#2A2A2A] hover:border-[#4D9FFF]/60 transition-all duration-200 shadow-sm hover:shadow-[#4D9FFF]/10 cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#4D9FFF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#151515] border border-[#262626] text-[#F5F5F5] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4D9FFF] cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 top-[60px] bg-[#080808]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-6 border-t border-[#222222] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-1.5 pt-2">
            <span className="text-[11px] font-bold text-[#A1A1A1] uppercase tracking-widest px-3 mb-1">
              Explore Studio
            </span>
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-xl font-bold text-base tracking-wide transition-colors cursor-pointer ${
                  activeSection === item.id && !isLegalView
                    ? 'bg-[#181818] text-[#4D9FFF] border border-[#333333]'
                    : 'text-[#F5F5F5] hover:bg-[#141414]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#A1A1A1] font-mono">0{idx + 1}</span>
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A1A1A1]" />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#222222] pb-6 mt-4">
            <a
              id="mobile-menu-cta"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#4D9FFF] text-[#080808] font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-[#3d8de6] transition-colors shadow-lg shadow-[#4D9FFF]/20 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="text-center text-xs text-[#A1A1A1] mt-1 font-mono">
              elevenlabs.studio2026@gmail.com
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
