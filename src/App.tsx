import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { Experience3DSection } from './components/Experience3DSection';
import { WebDevShowcase } from './components/WebDevShowcase';
import { ServicesSection } from './components/ServicesSection';
import { SeoDemoSection } from './components/SeoDemoSection';
import { SocialMediaShowcase } from './components/SocialMediaShowcase';
import { VideoEditingShowcase } from './components/VideoEditingShowcase';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { PricingOfferSection } from './components/PricingOfferSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalPage } from './components/LegalPage';
import { BackToTop } from './components/BackToTop';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ElevenLabAssistant } from './components/chatbot/ElevenLabAssistant';
import { LegalPageType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [legalPage, setLegalPage] = useState<LegalPageType | null>(null);

  // Sync hash routing for legal pages, deep section links, and back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('terms-and-conditions')) {
        setLegalPage('terms');
      } else if (hash.includes('privacy-policy')) {
        setLegalPage('privacy');
      } else if (hash.includes('refund-policy')) {
        setLegalPage('refund');
      } else if (hash.includes('website-disclaimer')) {
        setLegalPage('disclaimer');
      } else {
        setLegalPage(null);
        const sectionId = hash.replace(/^#\/?/, '');
        if (
          sectionId &&
          [
            'hero',
            'experience-3d',
            'showcase',
            'services',
            'seo-demo',
            'social-showcase',
            'video-showcase',
            'work',
            'process',
            'about',
            'team',
            'pricing',
            'faq',
            'contact'
          ].includes(sectionId)
        ) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll spy for active navigation state
  useEffect(() => {
    if (legalPage) return;

    const sections = [
      'hero',
      'experience-3d',
      'showcase',
      'services',
      'seo-demo',
      'social-showcase',
      'video-showcase',
      'work',
      'process',
      'about',
      'team',
      'pricing',
      'faq',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [legalPage]);

  const handleNavigateSection = (sectionId: string) => {
    if (legalPage) {
      setLegalPage(null);
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenLegal = (page: LegalPageType) => {
    setLegalPage(page);
    const hashMapping: Record<LegalPageType, string> = {
      terms: '#/terms-and-conditions',
      privacy: '#/privacy-policy',
      refund: '#/refund-policy',
      disclaimer: '#/website-disclaimer'
    };
    window.location.hash = hashMapping[page];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setLegalPage(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col selection:bg-[#4D9FFF]/30 selection:text-[#FFFFFF]">
      {/* Sticky Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        isLegalView={legalPage !== null}
        onBackToHome={handleBackToHome}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {legalPage ? (
          <LegalPage
            pageType={legalPage}
            onChangePage={handleOpenLegal}
            onBackToHome={handleBackToHome}
          />
        ) : (
          <>
            <Hero onExploreWork={() => handleNavigateSection('work')} />
            <TrustStrip />
            <Experience3DSection />
            <WebDevShowcase />
            <ServicesSection />
            <SeoDemoSection />
            <SocialMediaShowcase />
            <VideoEditingShowcase />
            <SelectedWorkSection />
            <ProcessSection />
            <AboutSection />
            <TeamSection />
            <PricingOfferSection />
            <FaqSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenLegal={handleOpenLegal}
      />

      {/* Floating Action Controls */}
      <ElevenLabAssistant />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
