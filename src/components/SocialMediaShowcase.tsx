import React, { useState } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Share2, Image, Film, Sparkles, Calendar, Heart, MessageCircle, Bookmark, ArrowRight, CheckCircle2, Eye, ChevronRight } from 'lucide-react';

type SocialTab = 'posts' | 'reels' | 'stories' | 'calendar';

export const SocialMediaShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SocialTab>('posts');
  const [selectedPostIdx, setSelectedPostIdx] = useState<number>(0);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<string>('Wednesday');

  const postSamples = [
    {
      title: 'Studio Identity & Aesthetic Reveal',
      type: 'Single Post',
      engagement: 'High-Impact Brand Visual',
      caption: 'Precision in every pixel. Elevating digital presences through modern editorial design and fast full-stack technology.',
      tags: '#DigitalAgency #ModernWeb #ElevenLabStudio',
      bgTheme: 'from-blue-600/30 to-cyan-500/20'
    },
    {
      title: 'E-Commerce Conversion Checklist',
      type: 'Multi-Slide Carousel',
      engagement: 'Educational & Actionable',
      caption: '5 crucial UX elements your online store needs to reduce cart abandonment and increase checkout velocity.',
      tags: '#ShopifyStore #ConversionOptimization #EcommerceDesign',
      bgTheme: 'from-purple-600/30 to-indigo-500/20'
    },
    {
      title: 'Client Platform Milestone Launch',
      type: 'Case Study Showcase',
      engagement: 'Social Proof & Results',
      caption: 'Proud to announce the deployment of our new clinic platform—built with sub-second page loads and seamless appointment scheduling.',
      tags: '#WebDev #HealthcareUI #Portfolio',
      bgTheme: 'from-teal-600/30 to-emerald-500/20'
    }
  ];

  const calendarDays = [
    { day: 'Monday', type: 'Educational Post', theme: 'Web Best Practices', status: 'Scheduled' },
    { day: 'Wednesday', type: 'High-Retention Reel', theme: 'Behind the Design', status: 'In Review' },
    { day: 'Friday', type: 'Client Project Showcase', theme: 'Live Platform Launch', status: 'Approved' },
    { day: 'Sunday', type: 'Interactive Story Poll', theme: 'Audience Engagement', status: 'Drafting' }
  ];

  return (
    <section id="social-showcase" className="py-24 bg-[#0A0A0A] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-pink-400 uppercase mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>SOCIAL MEDIA CONTENT WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
            YOUR BRAND, EVERYWHERE IT MATTERS.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A1] mt-3 font-normal leading-relaxed">
            Content strategy, high-craft static posts, interactive stories, viral reel pacing, and organized monthly calendar execution.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-[#242424] rounded-2xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>POSTS</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'reels'
                ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>REELS</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'stories'
                ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>STORIES</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === 'calendar'
                ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>CONTENT PLAN</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col justify-between">
            
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#4D9FFF] flex items-center justify-center text-xs font-bold text-black">
                      11
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">elevenlab.studio</div>
                      <div className="text-[10px] text-[#888888]">Brand & Web Agency</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#4D9FFF] bg-[#4D9FFF]/10 px-2 py-0.5 rounded">
                    {postSamples[selectedPostIdx].type}
                  </span>
                </div>

                {/* Simulated Post Canvas */}
                <div className={`h-64 sm:h-72 rounded-xl bg-gradient-to-br ${postSamples[selectedPostIdx].bgTheme} border border-[#333] p-6 flex flex-col justify-between text-left relative overflow-hidden`}>
                  <div className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                    ELEVENLAB STUDIO CREATIVE
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      {postSamples[selectedPostIdx].title}
                    </h3>
                    <p className="text-xs text-[#E0E0E0] mt-2 max-w-md">
                      {postSamples[selectedPostIdx].caption}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#CCCCCC]">
                    <span>MODERN DIGITAL DESIGN</span>
                    <span>SWIPE &bull; SAVE</span>
                  </div>
                </div>

                {/* Engagement & Caption */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-[#CCCCCC]">
                    <div className="flex items-center gap-4">
                      <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                      <MessageCircle className="w-4 h-4 text-[#A1A1A1]" />
                      <Share2 className="w-4 h-4 text-[#A1A1A1]" />
                    </div>
                    <Bookmark className="w-4 h-4 text-[#A1A1A1]" />
                  </div>
                  <p className="text-xs text-[#A1A1A1] leading-relaxed">
                    <span className="font-bold text-white mr-1.5">elevenlab.studio</span>
                    {postSamples[selectedPostIdx].caption}
                  </p>
                  <div className="text-[11px] font-mono text-[#4D9FFF]">
                    {postSamples[selectedPostIdx].tags}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reels' && (
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-4">
                {/* 9:16 Mobile Frame */}
                <div className="w-64 h-96 rounded-2xl bg-[#0D0D0D] border-2 border-[#333333] p-4 flex flex-col justify-between relative shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] text-[#A1A1A1] z-10">
                    <span className="font-bold text-white">Reels</span>
                    <span className="text-[#4D9FFF] font-mono">0:24</span>
                  </div>

                  <div className="space-y-2 z-10 text-left">
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                      Kinetic Hook
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      Why Your Website is Losing 60% of Mobile Visitors
                    </h4>
                    <p className="text-[10px] text-[#CCCCCC]">
                      3 instant UX tweaks you can deploy today to double conversion.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#888888] pt-2 border-t border-[#202020] z-10">
                    <span className="text-white font-bold">@elevenlab.studio</span>
                    <span className="text-teal-400">Audio: Original Studio Mix</span>
                  </div>

                  {/* Ambient backdrop glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
                </div>

                <div className="max-w-xs space-y-3 text-left">
                  <div className="text-xs font-bold text-white">Vertical Reel Production:</div>
                  <div className="text-xs text-[#A1A1A1] space-y-2">
                    <div className="p-2.5 rounded bg-[#161616] border border-[#262626]">
                      <span className="font-bold text-white">0-3s Hook:</span> Fast animated motion title capturing immediate thumb attention.
                    </div>
                    <div className="p-2.5 rounded bg-[#161616] border border-[#262626]">
                      <span className="font-bold text-white">Pacing:</span> Rapid jump cuts synchronized to energetic audio cues.
                    </div>
                    <div className="p-2.5 rounded bg-[#161616] border border-[#262626]">
                      <span className="font-bold text-white">Captions:</span> Highlighted bold kinetic typography for sound-off viewers.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stories' && (
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-4">
                <div className="w-56 h-88 rounded-2xl bg-gradient-to-b from-[#181818] to-[#0A0A0A] border border-[#333] p-4 flex flex-col justify-between text-left relative">
                  <div className="space-y-1">
                    <div className="h-1 bg-[#4D9FFF] rounded-full w-full" />
                    <div className="flex items-center justify-between text-[10px] text-[#888888]">
                      <span className="text-white font-bold">elevenlab.studio</span>
                      <span>2h ago</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141414]/90 border border-[#282828] space-y-2">
                    <div className="text-xs font-bold text-white">Which website style fits your brand best?</div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="p-1.5 rounded bg-[#4D9FFF]/20 border border-[#4D9FFF] text-white flex justify-between font-bold">
                        <span>A: Editorial Dark</span>
                        <span>68%</span>
                      </div>
                      <div className="p-1.5 rounded bg-[#1F1F1F] text-[#CCCCCC] flex justify-between">
                        <span>B: Clean Minimal Light</span>
                        <span>32%</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-[#4D9FFF] font-mono">
                    Swipe up to chat &rarr;
                  </div>
                </div>

                <div className="max-w-xs space-y-2 text-left">
                  <div className="text-xs font-bold text-white">Story Engagement Strategy:</div>
                  <p className="text-xs text-[#A1A1A1]">
                    Interactive polls, Q&As, daily behind-the-scenes, and direct link stickers to nurture and convert your existing followers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
                  <div className="text-xs font-bold text-white uppercase">Weekly Content Schedule Simulation</div>
                  <span className="text-[11px] font-mono text-[#4D9FFF]">Active Cadence: 4 Posts / Week</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {calendarDays.map((cd) => (
                    <div
                      key={cd.day}
                      onClick={() => setSelectedCalendarDay(cd.day)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedCalendarDay === cd.day
                          ? 'bg-[#151D29] border-[#4D9FFF]'
                          : 'bg-[#161616] border-[#262626] hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{cd.day}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202020] text-teal-400">
                          {cd.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#CCCCCC] font-medium">{cd.type}</div>
                      <div className="text-[11px] text-[#888888] mt-1">{cd.theme}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Selector Column */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-4">
                SOCIAL MEDIA DELIVERABLES:
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Strategic Monthly Content Calendar',
                  'High-Impact Static Posts & Carousels',
                  'Fast-Paced Vertical Reels & Shorts',
                  'Interactive Story Templates & Polls',
                  'Hashtag Research & Caption Copywriting'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E0E0E0]">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {activeTab === 'posts' && (
                <div className="space-y-2 pt-4 border-t border-[#202020]">
                  <div className="text-[11px] font-bold text-[#CCCCCC]">SELECT POST TEMPLATE:</div>
                  {postSamples.map((p, idx) => (
                    <button
                      key={p.title}
                      onClick={() => setSelectedPostIdx(idx)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        selectedPostIdx === idx
                          ? 'bg-[#4D9FFF]/10 border border-[#4D9FFF] text-white font-bold'
                          : 'bg-[#161616] text-[#A1A1A1] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#202020]">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
              >
                <span>MANAGE MY SOCIALS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
