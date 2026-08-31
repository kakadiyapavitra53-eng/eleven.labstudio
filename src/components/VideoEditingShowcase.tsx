import React, { useState, useEffect } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Video, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, ArrowRight, Film, Scissors, Layers, Music, Eye } from 'lucide-react';

type VideoCategory = 'reels' | 'promo' | 'product' | 'brand' | 'social';

interface VideoCategoryData {
  id: VideoCategory;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  mockTitle: string;
  mockDuration: string;
  aspectRatio: '9:16' | '16:9';
  visualTheme: string;
}

export const VideoEditingShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('reels');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(35);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  const categories: Record<VideoCategory, VideoCategoryData> = {
    reels: {
      id: 'reels',
      label: 'REELS / SHORTS',
      title: 'High-Retention Short-Form Reels & YouTube Shorts',
      subtitle: 'Fast-paced kinetic cuts designed to stop mindless scrolling.',
      description: 'We edit short-form videos with immediate 0-3 second hooks, animated kinetic subtitles, synchronized sound effects, and punchy pacing tailored to Instagram Reels and YouTube Shorts algorithms.',
      features: [
        'Jump Cuts & Precise Pacing to eliminate dead air',
        'Sound Design & Audio Mix (risers, whooshes, impacts)',
        'Animated Captions & Dynamic Text Highlights',
        'Color Correction, LUT Grading & Crisp 4K/1080p Export'
      ],
      mockTitle: '3 Secrets to High-Conversion Landing Pages',
      mockDuration: '0:30',
      aspectRatio: '9:16',
      visualTheme: 'from-purple-900/40 via-blue-900/20 to-black'
    },
    promo: {
      id: 'promo',
      label: 'PROMOTIONAL VIDEOS',
      title: 'Business & Service Launch Commercials',
      subtitle: 'Clear, compelling storytelling that converts interest into sales.',
      description: 'Promotional video edits engineered to showcase your business offerings, value proposition, and customer testimonials with cinematic transitions and professional motion design.',
      features: [
        'Brand Storytelling & Narrative Structure',
        'Motion Graphics & Custom Logo Openers',
        'Licensed Commercial Music & Audio Mastering',
        'Call-to-Action End Cards & Conversion Cards'
      ],
      mockTitle: 'ElevenLab Studio — Client Digital Platform Launch',
      mockDuration: '1:15',
      aspectRatio: '16:9',
      visualTheme: 'from-blue-900/40 via-indigo-900/20 to-black'
    },
    product: {
      id: 'product',
      label: 'PRODUCT VIDEOS',
      title: 'E-Commerce & Physical Product Showcases',
      subtitle: 'Highlighting product craftsmanship, features, and unboxing details.',
      description: 'Transform raw product footage into sleek showcase videos with macro feature callouts, speed-ramped camera motion, and clean commercial lighting correction.',
      features: [
        'Speed Ramping & Dynamic Camera Flow',
        'Spec Highlights & Animated Callout Pointers',
        'Surface Reflection & Color Enhancement',
        'Multi-format Output for Ads, Reels & Product Pages'
      ],
      mockTitle: 'Next-Gen Wireless Acoustic Earbuds Overview',
      mockDuration: '0:45',
      aspectRatio: '9:16',
      visualTheme: 'from-teal-900/40 via-cyan-900/20 to-black'
    },
    brand: {
      id: 'brand',
      label: 'BRAND VIDEOS',
      title: 'Cinematic Founder & Studio Brand Overviews',
      subtitle: 'Building deep emotional connection and authority.',
      description: 'Establish leadership in your industry with high-production founder interviews, studio culture videos, and documentary-style brand narratives.',
      features: [
        'Multi-Camera Sync & A/B Roll Sequencing',
        'Professional Audio Denoising & Vocal EQ',
        'Cinematic 2.39:1 Letterbox / Widescreen Framing',
        'Graded Contrast & Balanced Highlights'
      ],
      mockTitle: 'Founder Journey: The Vision Behind the Studio',
      mockDuration: '2:00',
      aspectRatio: '16:9',
      visualTheme: 'from-amber-900/40 via-zinc-900/20 to-black'
    },
    social: {
      id: 'social',
      label: 'SOCIAL MEDIA CONTENT',
      title: 'Event Highlights, Vlogs & Fast Social Clips',
      subtitle: 'Consistent, eye-catching video snippets for daily distribution.',
      description: 'Batch video editing for creators and brands looking to maintain a high-frequency social video output without sacrificing visual quality.',
      features: [
        'Batch Content Formatting & Quick Iterations',
        'Engaging Lower Thirds & Profile Watermarks',
        'Seamless Loop Transitions for Infinite Replays',
        'Platform-Specific Safe Zone Framing (IG/TikTok/YT)'
      ],
      mockTitle: 'Weekly Behind-the-Scenes Sprint Highlights',
      mockDuration: '0:40',
      aspectRatio: '9:16',
      visualTheme: 'from-rose-900/40 via-purple-900/20 to-black'
    }
  };

  const current = categories[activeCategory];

  // Simulated player progress animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="video-showcase" className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-[#4D9FFF] uppercase mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>VIDEO EDITING PRODUCTION WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
            CONTENT THAT HOLDS ATTENTION.
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A1] mt-3 font-normal leading-relaxed">
            From reels to promotional videos, we edit content designed to communicate clearly and capture attention.
          </p>
        </div>

        {/* Category Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121212] border border-[#242424] rounded-2xl mb-8 w-fit">
          {(['reels', 'promo', 'product', 'brand', 'social'] as VideoCategory[]).map((catKey) => {
            const cat = categories[catKey];
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => {
                  setActiveCategory(catKey);
                  setProgress(20);
                  setIsPlaying(true);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                    : 'text-[#A1A1A1] hover:text-white hover:bg-[#181818]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Video Player Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className={`relative rounded-2xl bg-[#0D0D0D] border border-[#262626] overflow-hidden shadow-2xl p-4 flex flex-col justify-between ${
                current.aspectRatio === '9:16' ? 'w-full max-w-xs h-[480px]' : 'w-full max-w-lg h-[340px]'
              }`}
            >
              {/* Top Video Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#222222] z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                    SIMULATED PREVIEW
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#4D9FFF]">{current.mockDuration}</span>
              </div>

              {/* Central Dynamic Video Visual Preview */}
              <div
                className={`flex-1 my-3 rounded-xl bg-gradient-to-br ${current.visualTheme} border border-[#333] p-4 flex flex-col justify-between relative overflow-hidden text-left`}
              >
                {/* Visual Audio Waveform */}
                <div className="flex items-center gap-1 opacity-60">
                  <div className="w-1 h-3 bg-[#4D9FFF] rounded animate-pulse" />
                  <div className="w-1 h-6 bg-[#4D9FFF] rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-4 bg-[#4D9FFF] rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-7 bg-[#4D9FFF] rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 h-2 bg-[#4D9FFF] rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Animated Captions Demonstration */}
                {showCaptions && (
                  <div className="space-y-1.5 my-auto">
                    <span className="px-2 py-0.5 rounded bg-black/80 border border-[#4D9FFF]/40 text-[#4D9FFF] text-[11px] font-black tracking-wide uppercase">
                      HOOK 0-3S
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white leading-tight drop-shadow-md">
                      "{current.mockTitle}"
                    </h4>
                  </div>
                )}

                {/* Bottom Overlay Info */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#CCCCCC] pt-2">
                  <span>1080x1920 • 60 FPS</span>
                  <span className="text-teal-400">Audio Sync OK</span>
                </div>
              </div>

              {/* Video Player Controls Bar */}
              <div className="space-y-2 pt-2 border-t border-[#202020] z-10">
                
                {/* Timeline Progress Scrubber */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.round((clickX / rect.width) * 100);
                    setProgress(Math.max(0, Math.min(100, newProgress)));
                  }}
                  className="w-full h-1.5 bg-[#262626] rounded-full cursor-pointer overflow-hidden relative"
                >
                  <div
                    className="h-full bg-[#4D9FFF] transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-[#181818] hover:bg-[#222] text-white transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setProgress(0)}
                      title="Restart Video"
                      className="p-2 rounded-lg bg-[#181818] hover:bg-[#222] text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg bg-[#181818] hover:bg-[#222] text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#4D9FFF]" />}
                    </button>
                  </div>

                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      showCaptions ? 'bg-[#4D9FFF]/20 text-[#4D9FFF]' : 'bg-[#181818] text-[#888888]'
                    }`}
                  >
                    Captions: {showCaptions ? 'ON' : 'OFF'}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Specification & Techniques Breakdown */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="text-xs font-mono font-bold text-[#4D9FFF] uppercase tracking-wider mb-2">
                {current.subtitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Techniques Checklist */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] space-y-3">
              <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2">
                EDITING TECHNIQUES INCLUDED:
              </div>
              {current.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E0E0E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#4D9FFF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>EDIT MY VIDEO</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
