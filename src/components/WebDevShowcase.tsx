import React, { useState } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Layout, Palette, ShoppingBag, Smartphone, ArrowRight, CheckCircle2, Sparkles, ExternalLink, Code2, Monitor, Cpu } from 'lucide-react';

type WebDevTab = 'website' | 'uiux' | 'ecommerce' | 'mobile';

interface TabData {
  id: WebDevTab;
  label: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export const WebDevShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WebDevTab>('website');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'code'>('desktop');
  const [interactiveCartCount, setInteractiveCartCount] = useState<number>(1);

  const tabs: Record<WebDevTab, TabData> = {
    website: {
      id: 'website',
      label: 'WEBSITE',
      badge: 'HIGH-PERFORMANCE WEB ARCHITECTURE',
      title: 'Modern, Fast & Conversion-Engineered Business Websites',
      subtitle: 'Engineered for maximum speed, crystal-clear typography, and customer credibility.',
      description: 'We build tailored digital platforms that reflect the true quality of your business. Fast loading times, clean semantic markup, and intuitive navigation that turns visitors into qualified inquiries.',
      features: [
        'Sub-second load times with modern Vite + React runtime',
        'Mobile-first responsive layout with dynamic micro-interactions',
        'Built-in conversion funnels, instant WhatsApp hooks & intake forms',
        'Optimized for search engines with clean semantic DOM hierarchy'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
      metrics: [
        { label: 'Avg. Lighthouse Speed', value: '98/100' },
        { label: 'Responsive Viewports', value: '100%' },
        { label: 'SEO Readiness', value: 'Structured' }
      ]
    },
    uiux: {
      id: 'uiux',
      label: 'UI/UX',
      badge: 'EDITORIAL DIGITAL DESIGN SYSTEM',
      title: 'Intuitive Interfaces Designed Around Human Psychology',
      subtitle: 'Visual hierarchies, balanced contrast, and purposeful typography.',
      description: 'Great design is not just aesthetics—it is clarity. We craft comprehensive Figma wireframes, component design systems, and tactile prototypes that remove friction and guide users effortlessly toward taking action.',
      features: [
        'Custom typographic scale and WCAG-compliant color harmony',
        'Figma interactive prototypes with real user-journey mapping',
        'Tactile hover states, micro-animations and smooth transition physics',
        'Modular reusable design token system for effortless scalability'
      ],
      techStack: ['Figma Pro', 'Design Systems', 'Design Tokens', 'Prototyping'],
      metrics: [
        { label: 'Visual Hierarchy', value: 'Custom Crafted' },
        { label: 'Accessibility', value: 'WCAG AA' },
        { label: 'Design Tokens', value: 'Standardized' }
      ]
    },
    ecommerce: {
      id: 'ecommerce',
      label: 'E-COMMERCE',
      badge: 'HIGH-CONVERSION STOREFRONT',
      title: 'Scalable Online Stores & Frictionless Checkout Experiences',
      subtitle: 'Engineered for smooth product discovery, trust badges, and instant payments.',
      description: 'Whether you need a custom headless storefront or a tailored Shopify theme, we create polished shopping experiences with instant catalog filtering, one-tap mobile checkout, and high conversion flow.',
      features: [
        'Instant multi-parameter category filtering & dynamic search',
        'Frictionless multi-step checkout with instant payment gateways',
        'Automated inventory tracking, order receipts & shipping hooks',
        'High-resolution product galleries with pinch-to-zoom & variation selectors'
      ],
      techStack: ['Shopify Liquid', 'Custom React Cart', 'Stripe / Razorpay', 'Headless API'],
      metrics: [
        { label: 'Checkout Steps', value: '1-Page Streamlined' },
        { label: 'Payment Gateway', value: 'Universal' },
        { label: 'Mobile Cart UX', value: 'Frictionless' }
      ]
    },
    mobile: {
      id: 'mobile',
      label: 'MOBILE',
      badge: 'TOUCH-OPTIMIZED INTERFACES',
      title: 'Responsive & Progressive Mobile Web Apps',
      subtitle: 'Smooth touch gestures, app-like navigation drawers, and thumb-friendly controls.',
      description: 'Over 70% of modern web traffic originates from mobile devices. We engineer every component with generous 44px+ touch targets, swipeable card carousels, and responsive typography that feels native.',
      features: [
        'Thumb-zone optimized navigation and floating action triggers',
        'Progressive Web App (PWA) capabilities with offline caching',
        'Silky-smooth swipe gestures and gesture-aware sheet drawers',
        'Aggressive mobile asset compression for lightning cellular speed'
      ],
      techStack: ['Mobile Viewport CSS', 'Touch Events', 'PWA Service Workers', 'Fluid Units'],
      metrics: [
        { label: 'Touch Target Size', value: '44px+ Standard' },
        { label: 'Mobile Cellular Speed', value: 'Instant' },
        { label: 'Thumb Ergonomics', value: 'Optimized' }
      ]
    }
  };

  const current = tabs[activeTab];

  return (
    <section id="showcase" className="py-24 bg-[#0A0A0A] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-[#4D9FFF] uppercase mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>INTERACTIVE BUILD SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
            ENGINEERED FOR REAL WORLD RESULTS.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A1] mt-3 font-normal leading-relaxed">
            Switch between disciplines below to see how our engineering and design standards translate into practical, high-impact business platforms.
          </p>
        </div>

        {/* Tab Selection Switcher Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-[#242424] rounded-2xl mb-8 w-fit">
          {(['website', 'uiux', 'ecommerce', 'mobile'] as WebDevTab[]).map((tabKey) => {
            const tab = tabs[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                id={`tab-${tabKey}`}
                onClick={() => setActiveTab(tabKey)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                    : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
                }`}
              >
                {tabKey === 'website' && <Layout className="w-4 h-4" />}
                {tabKey === 'uiux' && <Palette className="w-4 h-4" />}
                {tabKey === 'ecommerce' && <ShoppingBag className="w-4 h-4" />}
                {tabKey === 'mobile' && <Smartphone className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Tab Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Context, Features & Deep-dive */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#222222]">
            <div>
              <div className="text-xs font-mono font-bold text-[#4D9FFF] tracking-wider uppercase mb-2">
                {current.badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider">
                  KEY DELIVERABLES:
                </div>
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E0E0E0]">
                    <CheckCircle2 className="w-4 h-4 text-[#4D9FFF] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-6">
                <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                  TECHNOLOGY & TOOLING:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#181818] border border-[#2A2A2A] text-[11px] font-mono text-[#4D9FFF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="pt-6 border-t border-[#202020] flex items-center justify-between">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>REQUEST THIS SPECIFICATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Interactive Mockup Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 rounded-2xl bg-[#111111] border border-[#222222] p-5 sm:p-6 flex flex-col justify-between">
              
              {/* Mockup Header Controls */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#202020]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-[#888888] ml-2 hidden sm:inline">
                    elevenlab.studio/showcase/{activeTab}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#161616] p-1 rounded-lg border border-[#282828]">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      previewMode === 'desktop' ? 'bg-[#4D9FFF] text-black font-bold' : 'text-[#888888] hover:text-white'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      previewMode === 'mobile' ? 'bg-[#4D9FFF] text-black font-bold' : 'text-[#888888] hover:text-white'
                    }`}
                  >
                    Mobile
                  </button>
                  <button
                    onClick={() => setPreviewMode('code')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      previewMode === 'code' ? 'bg-[#4D9FFF] text-black font-bold' : 'text-[#888888] hover:text-white'
                    }`}
                  >
                    Schema
                  </button>
                </div>
              </div>

              {/* Mockup Dynamic Content Area */}
              <div className="flex-1 min-h-[300px] flex items-center justify-center p-4 rounded-xl bg-[#0B0B0B] border border-[#1E1E1E] relative overflow-hidden">
                
                {previewMode === 'code' ? (
                  <div className="w-full text-left font-mono text-xs text-[#00F0FF] space-y-1.5 overflow-x-auto p-3">
                    <div className="text-[#888888]">// ElevenLab Studio — Architecture Blueprint</div>
                    <div><span className="text-[#F43F5E]">interface</span> <span className="text-white">ProjectSpec</span> &#123;</div>
                    <div className="pl-4">framework: <span className="text-[#A3E635]">'React 19 + TypeScript + Vite'</span>;</div>
                    <div className="pl-4">styling: <span className="text-[#A3E635]">'Tailwind CSS + Fluid Layout'</span>;</div>
                    <div className="pl-4">performance: &#123; lcp: <span className="text-[#FBBF24]">0.8</span>, fid: <span className="text-[#FBBF24]">12</span>, cls: <span className="text-[#FBBF24]">0.01</span> &#125;;</div>
                    <div className="pl-4">modules: [<span className="text-[#A3E635]">'LiveIntake'</span>, <span className="text-[#A3E635]">'WhatsAppDirect'</span>, <span className="text-[#A3E635]">'SEOJsonLd'</span>];</div>
                    <div>&#125;</div>
                  </div>
                ) : activeTab === 'website' ? (
                  /* Website Interactive Visual */
                  <div className="w-full max-w-lg space-y-3 text-left">
                    <div className="p-4 rounded-xl bg-[#141414] border border-[#282828] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase">HERO SECTION SIMULATION</span>
                        <span className="text-[10px] font-mono text-[#4D9FFF] bg-[#4D9FFF]/10 px-2 py-0.5 rounded">60 FPS</span>
                      </div>
                      <div className="h-4 bg-gradient-to-r from-[#4D9FFF] to-cyan-400 rounded w-3/4" />
                      <div className="h-2 bg-[#262626] rounded w-full" />
                      <div className="h-2 bg-[#262626] rounded w-2/3" />
                      <div className="pt-2 flex gap-2">
                        <span className="px-3 py-1 rounded bg-[#4D9FFF] text-[10px] font-bold text-black">CTA ACTION</span>
                        <span className="px-3 py-1 rounded bg-[#202020] text-[10px] text-white">LEARN MORE</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#141414] border border-[#282828]">
                        <div className="text-[11px] font-bold text-white">Service Matrix</div>
                        <div className="text-[10px] text-[#888888] mt-1">Modular cards with hover depth & instant feedback.</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#141414] border border-[#282828]">
                        <div className="text-[11px] font-bold text-white">Intake Funnel</div>
                        <div className="text-[10px] text-[#888888] mt-1">Google Form & WhatsApp integrated booking pipeline.</div>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'uiux' ? (
                  /* UI/UX Interactive Visual */
                  <div className="w-full max-w-md space-y-3 text-left">
                    <div className="p-4 rounded-xl bg-[#141414] border border-[#282828]">
                      <div className="text-xs font-bold text-white mb-2">Design Tokens & Component Palette</div>
                      <div className="flex gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#080808] border border-[#333] flex items-center justify-center text-[9px] text-white">#08</div>
                        <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#333] flex items-center justify-center text-[9px] text-white">#14</div>
                        <div className="w-8 h-8 rounded-lg bg-[#4D9FFF] flex items-center justify-center text-[9px] text-black font-bold">#4D</div>
                        <div className="w-8 h-8 rounded-lg bg-teal-400 flex items-center justify-center text-[9px] text-black font-bold">#00</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-between text-xs">
                        <span className="text-[#CCCCCC]">Interactive Button State</span>
                        <span className="px-2 py-0.5 rounded bg-[#4D9FFF]/20 text-[#4D9FFF] text-[10px] font-mono">Hover Active</span>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'ecommerce' ? (
                  /* E-Commerce Interactive Visual with Cart simulation */
                  <div className="w-full max-w-md p-4 rounded-xl bg-[#141414] border border-[#282828] text-left">
                    <div className="flex items-center justify-between pb-3 border-b border-[#242424] mb-3">
                      <div>
                        <div className="text-xs font-bold text-white">Premium Product Showcase</div>
                        <div className="text-[10px] text-teal-400">In Stock • Ready to Dispatch</div>
                      </div>
                      <div className="text-sm font-bold text-white">₹4,999</div>
                    </div>

                    <div className="flex items-center justify-between bg-[#1A1A1A] p-2.5 rounded-lg border border-[#2E2E2E] mb-3">
                      <span className="text-xs text-[#CCCCCC]">Interactive Cart Items:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInteractiveCartCount(Math.max(1, interactiveCartCount - 1))}
                          className="w-6 h-6 rounded bg-[#262626] text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1.5">{interactiveCartCount}</span>
                        <button
                          onClick={() => setInteractiveCartCount(interactiveCartCount + 1)}
                          className="w-6 h-6 rounded bg-[#262626] text-white text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-lg bg-[#4D9FFF] hover:bg-[#3d8de6] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                      Instant 1-Click Checkout (Demo)
                    </button>
                  </div>
                ) : (
                  /* Mobile Responsive Visual */
                  <div className="w-48 p-3 rounded-2xl bg-[#141414] border-2 border-[#333333] shadow-xl text-left space-y-2">
                    <div className="w-12 h-1 bg-[#444] rounded-full mx-auto mb-2" />
                    <div className="text-[10px] font-bold text-white">Mobile Viewport</div>
                    <div className="p-2 rounded bg-[#1C1C1C] text-[9px] text-[#A1A1A1]">
                      Fluid flex layouts with 100% viewport width matching.
                    </div>
                    <div className="h-6 rounded bg-[#4D9FFF] flex items-center justify-center text-[9px] text-black font-bold">
                      Tap To Call / Chat
                    </div>
                  </div>
                )}

              </div>

              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#202020]">
                {current.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left">
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">{m.value}</div>
                    <div className="text-[10px] text-[#888888] mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
