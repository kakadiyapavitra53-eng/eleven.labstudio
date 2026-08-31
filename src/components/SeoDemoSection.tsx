import React, { useState } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Search, Globe, Zap, CheckCircle2, ArrowRight, Sparkles, FileCode, Gauge, Network, HelpCircle, RefreshCw } from 'lucide-react';

type SeoPillar = 'onpage' | 'indexing' | 'structure' | 'speed' | 'schema';

export const SeoDemoSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('best modern business website & clinic near me');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activePillar, setActivePillar] = useState<SeoPillar>('onpage');

  const sampleQueries = [
    'best modern business website & clinic near me',
    'high conversion e-commerce agency',
    'fast responsive web developer'
  ];

  const handleRunSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  return (
    <section id="seo-demo" className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-teal-400 uppercase mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>ORGANIC SEARCH VISIBILITY DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
            GET FOUND ONLINE.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A1] mt-3 font-normal leading-relaxed">
            Build a stronger search presence with structured pages, technical SEO and content designed around how people search.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-[11px] font-mono text-[#888888]">
            <HelpCircle className="w-3 h-3 text-[#4D9FFF]" />
            <span>SIMULATION / DEMO — Educational illustration of SEO architecture</span>
          </div>
        </div>

        {/* Interactive Simulated Search Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simulated Search Engine Engine Output */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-[#262626] shadow-xl">
              
              {/* Simulated Search Bar */}
              <div className="relative flex items-center mb-4">
                <div className="absolute left-4 text-[#888888] pointer-events-none">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search query..."
                  className="w-full bg-[#181818] border border-[#303030] focus:border-[#4D9FFF] focus:outline-none text-xs sm:text-sm text-white pl-11 pr-24 py-3 rounded-xl transition-all"
                />
                <button
                  onClick={handleRunSearch}
                  disabled={isSearching}
                  className="absolute right-2 px-4 py-1.5 rounded-lg bg-[#4D9FFF] hover:bg-[#3d8de6] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>...</span>
                    </>
                  ) : (
                    <span>Search</span>
                  )}
                </button>
              </div>

              {/* Quick sample query pills */}
              <div className="flex flex-wrap items-center gap-1.5 mb-6 text-[11px]">
                <span className="text-[#666666]">Try query:</span>
                {sampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setSearchQuery(q);
                      handleRunSearch();
                    }}
                    className="px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#2B2B2B] text-[#A1A1A1] hover:text-white hover:border-[#444] transition-colors cursor-pointer truncate max-w-[220px]"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Simulated Google Search Results Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0C0C0C] border border-[#202020] relative min-h-[220px]">
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-xs text-[#888888]">
                    <RefreshCw className="w-6 h-6 text-[#4D9FFF] animate-spin mb-2" />
                    <span>Analyzing domain authority & indexing structured data...</span>
                  </div>
                ) : (
                  <div className="space-y-3 text-left animate-in fade-in duration-300">
                    
                    {/* Breadcrumb URL */}
                    <div className="flex items-center gap-2 text-xs text-[#9AA0A6] font-sans">
                      <div className="w-5 h-5 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[10px] text-[#4D9FFF] font-bold">
                        11
                      </div>
                      <div className="truncate">
                        <span className="text-[#E8EAED]">ElevenLab Studio</span>
                        <span className="text-[#9AA0A6] ml-1.5 font-mono text-[11px]">https://elevenlab.studio &rsaquo; services</span>
                      </div>
                    </div>

                    {/* Result Title */}
                    <h3 className="text-base sm:text-lg font-medium text-[#8AB4F8] hover:underline cursor-pointer">
                      Modern Digital Experiences & High-Performance Websites | ElevenLab Studio
                    </h3>

                    {/* Meta Description */}
                    <p className="text-xs sm:text-sm text-[#BDC1C6] leading-relaxed">
                      Custom websites, e-commerce, Shopify setups, branding, and video editing designed to help modern businesses look credible and capture qualified inquiries.
                    </p>

                    {/* Google Sitelinks */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C1C1C] text-xs">
                      <div className="p-2 rounded bg-[#141414] hover:bg-[#1C1C1C] cursor-pointer">
                        <div className="text-[#8AB4F8] font-medium">Selected Client Work</div>
                        <div className="text-[10px] text-[#888888]">Explore 8+ live deployed platforms</div>
                      </div>
                      <div className="p-2 rounded bg-[#141414] hover:bg-[#1C1C1C] cursor-pointer">
                        <div className="text-[#8AB4F8] font-medium">Website Packages</div>
                        <div className="text-[10px] text-[#888888]">Starting from ₹5,000 with 1-Year Free Domain</div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: 5 Interactive Technical SEO Pillars */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
              EXPLORE TECHNICAL SEO FOUNDATIONS:
            </div>

            {/* Pillar 1: On-Page SEO */}
            <div
              onClick={() => setActivePillar('onpage')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activePillar === 'onpage'
                  ? 'bg-[#151D29] border-[#4D9FFF]'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#4D9FFF]/10 text-[#4D9FFF]">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">ON-PAGE SEO & METADATA</span>
                </div>
                {activePillar === 'onpage' && <span className="text-[10px] font-mono text-[#4D9FFF]">Active View</span>}
              </div>
              {activePillar === 'onpage' && (
                <div className="mt-3 pt-3 border-t border-[#202838] text-xs text-[#A1A1A1] space-y-1.5">
                  <div>• Semantic HTML5 (`&lt;main&gt;`, `&lt;article&gt;`, `&lt;h1&gt;-&lt;h3&gt;`) structure</div>
                  <div>• Dynamic OpenGraph social preview tags & Twitter cards</div>
                  <div>• Optimized image `alt` attributes and responsive `srcset`</div>
                </div>
              )}
            </div>

            {/* Pillar 2: Indexing & Crawlability */}
            <div
              onClick={() => setActivePillar('indexing')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activePillar === 'indexing'
                  ? 'bg-[#151D29] border-[#4D9FFF]'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">INDEXING & SITEMAP</span>
                </div>
                {activePillar === 'indexing' && <span className="text-[10px] font-mono text-[#4D9FFF]">Active View</span>}
              </div>
              {activePillar === 'indexing' && (
                <div className="mt-3 pt-3 border-t border-[#202838] text-xs text-[#A1A1A1] space-y-1.5">
                  <div>• Automated XML Sitemap generation (`sitemap.xml`)</div>
                  <div>• Strict Canonical URLs to eliminate duplicate page penalties</div>
                  <div>• Google Search Console setup and indexing request flow</div>
                </div>
              )}
            </div>

            {/* Pillar 3: Site Structure */}
            <div
              onClick={() => setActivePillar('structure')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activePillar === 'structure'
                  ? 'bg-[#151D29] border-[#4D9FFF]'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">SITE STRUCTURE & INTERNAL LINKS</span>
                </div>
                {activePillar === 'structure' && <span className="text-[10px] font-mono text-[#4D9FFF]">Active View</span>}
              </div>
              {activePillar === 'structure' && (
                <div className="mt-3 pt-3 border-t border-[#202838] text-xs text-[#A1A1A1] space-y-1.5">
                  <div>• Flat 2-tier internal linking path for maximum crawl depth</div>
                  <div>• Clear breadcrumb hierarchy with semantic schema microdata</div>
                  <div>• Contextual anchor texts guiding visitors to relevant pages</div>
                </div>
              )}
            </div>

            {/* Pillar 4: Page Speed & Core Web Vitals */}
            <div
              onClick={() => setActivePillar('speed')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activePillar === 'speed'
                  ? 'bg-[#151D29] border-[#4D9FFF]'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">CORE WEB VITALS PERFORMANCE</span>
                </div>
                {activePillar === 'speed' && <span className="text-[10px] font-mono text-[#4D9FFF]">Active View</span>}
              </div>
              {activePillar === 'speed' && (
                <div className="mt-3 pt-3 border-t border-[#202838] text-xs text-[#A1A1A1] space-y-2">
                  <div className="flex items-center justify-between bg-[#111111] p-2 rounded">
                    <span>Largest Contentful Paint (LCP)</span>
                    <span className="font-mono text-emerald-400 font-bold">&lt; 1.2s</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#111111] p-2 rounded">
                    <span>Cumulative Layout Shift (CLS)</span>
                    <span className="font-mono text-emerald-400 font-bold">0.00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pillar 5: Structured Schema */}
            <div
              onClick={() => setActivePillar('schema')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activePillar === 'schema'
                  ? 'bg-[#151D29] border-[#4D9FFF]'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">SCHEMA JSON-LD STRUCTURED DATA</span>
                </div>
                {activePillar === 'schema' && <span className="text-[10px] font-mono text-[#4D9FFF]">Active View</span>}
              </div>
              {activePillar === 'schema' && (
                <div className="mt-3 pt-3 border-t border-[#202838] text-xs font-mono text-amber-300 bg-[#0C0C0C] p-2.5 rounded overflow-x-auto">
                  <div>&#123; "@context": "https://schema.org", "@type": "LocalBusiness", "name": "ElevenLab Studio", "areaServed": "Global" &#125;</div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
