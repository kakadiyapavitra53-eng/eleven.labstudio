import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { GOOGLE_FORM_URL } from '../data/projects';
import { Play, Pause, RotateCcw, ArrowRight, Sparkles, Layers, Monitor, Smartphone, CheckCircle2, ChevronRight, Eye, Code2, Film, ShieldCheck } from 'lucide-react';

/**
 * =========================================================================
 * ELEVENLAB STUDIO — CINEMATIC SCROLL EXPERIENCE CONFIGURATION
 * =========================================================================
 * 
 * Mode options:
 * - "AUTO"  : Automatically shows the temporary AI Cinematic Video before
 *             REAL_EXPERIENCE_LAUNCH_TIME, and transitions to the REAL
 *             scroll-based website experience after.
 * - "VIDEO" : Always shows the temporary AI Cinematic Video (scroll-scrubbed).
 * - "REAL"  : Always shows the genuine interactive scroll-driven website experience.
 */
export type ExperienceMode = 'AUTO' | 'VIDEO' | 'REAL';

// Default configuration mode
export const EXPERIENCE_MODE: ExperienceMode = 'AUTO';

// Launch Timestamp: 72 hours from configuration
// (Timestamp: 3 days in milliseconds)
export const REAL_EXPERIENCE_LAUNCH_TIME: number = Date.now() + 72 * 60 * 60 * 1000;

export const Experience3DSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);
  const targetProgressRef = useRef<number>(0.15);
  const currentProgressRef = useRef<number>(0.15);

  // Runtime Mode State (Defaults to EXPERIENCE_MODE, but can be toggled for immediate testing)
  const [activeMode, setActiveMode] = useState<ExperienceMode>(EXPERIENCE_MODE);
  const [progressState, setProgressState] = useState<number>(0.15);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Determine effective display mode based on AUTO logic & Launch timestamp
  const effectiveMode = useMemo<'VIDEO' | 'REAL'>(() => {
    if (activeMode === 'AUTO') {
      return Date.now() >= REAL_EXPERIENCE_LAUNCH_TIME ? 'REAL' : 'VIDEO';
    }
    return activeMode;
  }, [activeMode]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Intersection Observer to stop rendering when out of viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: [0, 0.1, 0.5, 1.0] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // TRUE SCROLL SCRUBBING LISTENER
  // Tracks the scroll progress through the section smoothly
  const handleScroll = useCallback(() => {
    if (isPlayingRef.current) return; // Allow manual play to override temporarily
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || 800;

    // Calculate scroll progress from when the top enters the window until bottom leaves
    const totalDistance = rect.height + windowHeight * 0.4;
    const currentDistance = windowHeight - rect.top;
    let rawProgress = currentDistance / totalDistance;

    // Clamp between 0.0 and 1.0
    rawProgress = Math.max(0, Math.min(1, rawProgress));

    targetProgressRef.current = rawProgress;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Continuous smooth interpolation (LERP) render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      if (!isVisibleRef.current) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isPlayingRef.current) {
        // Auto playback speed (10-12 second full progression)
        targetProgressRef.current += delta * 0.08;
        if (targetProgressRef.current > 1) {
          targetProgressRef.current = 0;
        }
      }

      // Smooth lerp easing towards target scroll progress
      const lerpSpeed = prefersReducedMotion ? 1 : 0.12;
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * lerpSpeed;
      const p = currentProgressRef.current;

      // Update state for UI indicators (throttled)
      if (Math.abs(p - progressState) > 0.01) {
        setProgressState(p);
        const sceneIdx = Math.min(5, Math.floor(p * 6));
        setActiveSceneIndex(sceneIdx);
      }

      // Sync video currentTime if video element is present
      if (videoRef.current && videoRef.current.duration) {
        const vid = videoRef.current;
        const targetTime = p * vid.duration;
        if (Math.abs(vid.currentTime - targetTime) > 0.05) {
          vid.currentTime = targetTime;
        }
      }

      // Draw high-fidelity generative canvas scene corresponding to progress p
      drawCinematicWebsiteScene(ctx, canvas.width, canvas.height, p, effectiveMode);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [effectiveMode, prefersReducedMotion, progressState]);

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlayingAuto(isPlayingRef.current);
  };

  // Reset to initial state
  const handleReset = () => {
    isPlayingRef.current = false;
    setIsPlayingAuto(false);
    targetProgressRef.current = 0.05;
  };

  // Scene definitions for progress indicators
  const scenes = [
    { num: '01', title: 'Dark Environment', desc: 'Space & Grid Architecture' },
    { num: '02', title: 'Interface Forming', desc: 'Wireframes & Blueprint Lines' },
    { num: '03', title: 'Camera Motion', desc: 'Isometric Depth & Spatial Flow' },
    { num: '04', title: 'Sections Forming', desc: 'Hero, Services & Micro-states' },
    { num: '05', title: 'Responsive Views', desc: 'Desktop & Mobile Synchronization' },
    { num: '06', title: 'Polished Experience', desc: 'Final High-Fidelity Website' }
  ];

  return (
    <section
      id="experience-3d"
      ref={sectionRef}
      className="py-24 bg-[#080808] border-b border-[#1C1C1C] relative overflow-hidden"
    >
      {/* Subtle Ambient Radial Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4D9FFF]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Preserved exactly with enhanced scroll description) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-[#1C1C1C] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold text-[#4D9FFF] uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>SCROLL-DRIVEN DIGITAL JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
              EXPERIENCES, NOT JUST WEBSITES.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1A1] max-w-2xl mt-3 font-normal leading-relaxed">
              Scroll down to scrub forward through the cinematic digital experience. Scroll up to reverse in real time. Seamlessly linked to your natural page scroll.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs sm:text-sm tracking-wider uppercase px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <span>BUILD EXPERIENCE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Cinematic Scroll-Scrubbed Viewport Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="relative rounded-2xl bg-[#0D0D0D] border border-[#242424] overflow-hidden shadow-2xl group flex flex-col justify-between"
            >
              {/* Canvas Viewport (Fixed aspect ratio 16:10 for crystal-clear fidelity) */}
              <div className="relative w-full h-[380px] sm:h-[480px] bg-[#070707] overflow-hidden select-none">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  aria-label="Cinematic Scroll-Scrubbed Website Experience"
                />

                {/* Subtle Interactive Preview Label */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#121212]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#282828] text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-ping" />
                  <span className="text-[#4D9FFF] font-bold">INTERACTIVE PREVIEW</span>
                  <span className="text-[#666666] hidden sm:inline">&bull; SCROLL TO SCRUB</span>
                </div>

                {/* Current Scene Badge */}
                <div className="absolute top-4 right-4 bg-[#141414]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#282828] text-[11px] font-mono text-[#CCCCCC] hidden sm:flex items-center gap-2">
                  <span className="text-[#4D9FFF] font-bold">SCENE {scenes[activeSceneIndex].num}:</span>
                  <span>{scenes[activeSceneIndex].title}</span>
                </div>

                {/* Mode Indicator Badge */}
                <div className="absolute bottom-16 right-4 hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101010]/80 border border-[#242424] text-[10px] font-mono text-[#888888]">
                  <span>Mode:</span>
                  <span className="text-white font-bold">{effectiveMode}</span>
                  {activeMode === 'AUTO' && (
                    <span className="text-[#4D9FFF] text-[9px]">(AUTO Active)</span>
                  )}
                </div>
              </div>

              {/* Minimalist Bottom Control Bar */}
              <div className="p-3 sm:p-4 bg-[#111111] border-t border-[#202020] flex flex-wrap items-center justify-between gap-3">
                
                {/* Scroll Timeline Progress Bar */}
                <div className="flex-1 min-w-[200px] flex items-center gap-3">
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newP = Math.max(0, Math.min(1, clickX / rect.width));
                      targetProgressRef.current = newP;
                    }}
                    className="flex-1 h-2 bg-[#222222] rounded-full cursor-pointer overflow-hidden relative group/bar"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#4D9FFF] to-cyan-400 rounded-full transition-all duration-75"
                      style={{ width: `${Math.round(progressState * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#888888] w-12 text-right">
                    {Math.round(progressState * 100)}%
                  </span>
                </div>

                {/* Minimal Control Buttons (Play / Reset / Mode Switcher) */}
                <div className="flex items-center gap-2">
                  <button
                    id="experience-play-btn"
                    onClick={togglePlay}
                    title={isPlayingAuto ? 'Pause Auto Scroll' : 'Play Cinematic Animation'}
                    className="px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2B2B2B] text-xs text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPlayingAuto ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#4D9FFF]" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#4D9FFF]" />
                        <span>PLAY</span>
                      </>
                    )}
                  </button>

                  <button
                    id="experience-reset-btn"
                    onClick={handleReset}
                    title="Reset to Beginning"
                    className="p-2 rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2B2B2B] text-xs text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Mode Testing Selector */}
                  <div className="flex items-center gap-1 bg-[#161616] p-1 rounded-lg border border-[#262626]">
                    {(['AUTO', 'VIDEO', 'REAL'] as ExperienceMode[]).map((mode) => (
                      <button
                        key={mode}
                        id={`mode-toggle-${mode}`}
                        onClick={() => setActiveMode(mode)}
                        className={`px-2 py-1 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                          activeMode === mode
                            ? 'bg-[#4D9FFF] text-black font-bold'
                            : 'text-[#777777] hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Interactive Scene Sequence Journey Panel */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222]">
              
              <div className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#4D9FFF]" />
                  <span>SCROLL JOURNEY SEQUENCE</span>
                </div>
                <span className="text-[10px] font-mono text-[#4D9FFF]">
                  {effectiveMode === 'VIDEO' ? 'PREVIEW MODE' : 'REAL ARCHITECTURE'}
                </span>
              </div>

              <p className="text-xs text-[#A1A1A1] leading-relaxed mb-4">
                Watch the interface construct itself in real time as you scroll. Every viewport, card, and particle trajectory responds directly to your scroll velocity.
              </p>

              {/* Scene Checklist */}
              <div className="space-y-2">
                {scenes.map((scene, idx) => {
                  const isActive = activeSceneIndex === idx;
                  const isPassed = progressState > (idx + 1) / 6;

                  return (
                    <div
                      key={scene.num}
                      onClick={() => {
                        targetProgressRef.current = (idx + 0.5) / 6;
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-[#151D29] border-[#4D9FFF] shadow-sm'
                          : 'bg-[#161616] border-[#242424] hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-[#4D9FFF] text-black'
                              : isPassed
                              ? 'bg-[#202020] text-teal-400'
                              : 'bg-[#1D1D1D] text-[#666666]'
                          }`}
                        >
                          {scene.num}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">
                            {scene.title}
                          </div>
                          <div className="text-[10px] text-[#888888]">
                            {scene.desc}
                          </div>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-ping shrink-0" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#444] shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Technical Status */}
              <div className="mt-5 pt-4 border-t border-[#202020] flex items-center justify-between text-xs">
                <span className="text-[#888888]">Engine:</span>
                <span className="text-[#4D9FFF] font-mono font-semibold">
                  Scroll LERP Interpolation (60 FPS)
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/**
 * =========================================================================
 * CINEMATIC WEBSITE SCENE RENDERER
 * =========================================================================
 * Renders 6 distinct visual phases based on scroll progress p in [0.0, 1.0].
 * Matches ElevenLab Studio brand palette: Black, Dark Graphite, White, #4D9FFF.
 */
function drawCinematicWebsiteScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  p: number,
  mode: 'VIDEO' | 'REAL'
) {
  // Clear canvas
  ctx.fillStyle = '#070707';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;

  // Scale factor for hi-dpi canvas
  const scale = Math.min(width / 960, height / 600);

  ctx.save();
  ctx.translate(cx, cy);

  // 1. BACKGROUND PERSPECTIVE GRID (Floats and zooms with scroll progress)
  const gridAlpha = 0.08 + Math.sin(p * Math.PI) * 0.08;
  ctx.strokeStyle = `rgba(77, 159, 255, ${gridAlpha})`;
  ctx.lineWidth = 1;

  const gridSize = 50 * scale;
  const gridOffset = (p * 200 * scale) % gridSize;

  // Horizontal Grid Lines
  for (let y = -height / 2; y <= height / 2; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(-width / 2, y + gridOffset);
    ctx.lineTo(width / 2, y + gridOffset);
    ctx.stroke();
  }

  // Vertical Grid Lines
  for (let x = -width / 2; x <= width / 2; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, -height / 2);
    ctx.lineTo(x, height / 2);
    ctx.stroke();
  }

  // Radial ambient center glow
  const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 320 * scale);
  grad.addColorStop(0, 'rgba(77, 159, 255, 0.12)');
  grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 320 * scale, 0, Math.PI * 2);
  ctx.fill();

  // 2. STAGE TRANSITIONS ACCORDING TO SCROLL PROGRESS P:
  // Phase 1: Wireframe Construction (p: 0 -> 0.25)
  // Phase 2: Isometric 3D Expansion & Navigation (p: 0.25 -> 0.55)
  // Phase 3: Desktop + Mobile Split View (p: 0.55 -> 0.8)
  // Phase 4: Final High-Fidelity Website Release (p: 0.8 -> 1.0)

  const browserW = 680 * scale;
  const browserH = 410 * scale;
  const cornerRadius = 14 * scale;

  // Perspective tilt based on progress
  const tiltY = Math.sin(p * Math.PI) * -0.12;
  const tiltX = Math.cos(p * Math.PI * 0.8) * 0.05;
  const zoom = 0.85 + p * 0.22;

  ctx.scale(zoom, zoom);
  ctx.rotate(tiltY);

  // MAIN BROWSER SHELL CONTAINER
  const bx = -browserW / 2;
  const by = -browserH / 2;

  // Card Outer Glow
  ctx.shadowColor = 'rgba(77, 159, 255, 0.35)';
  ctx.shadowBlur = 24 * scale * (0.4 + p * 0.6);

  // Background Card
  ctx.fillStyle = '#0F0F0F';
  roundRect(ctx, bx, by, browserW, browserH, cornerRadius);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Card Border (Glowing Blue Accent in Early wireframe -> Clean Graphite in Final)
  const borderHueAlpha = p < 0.35 ? 0.8 : 0.3 + (1 - p) * 0.3;
  ctx.strokeStyle = `rgba(77, 159, 255, ${borderHueAlpha})`;
  ctx.lineWidth = 1.5 * scale;
  roundRect(ctx, bx, by, browserW, browserH, cornerRadius);
  ctx.stroke();

  // BROWSER TOP NAVIGATION BAR
  const barH = 40 * scale;
  ctx.fillStyle = '#161616';
  ctx.beginPath();
  ctx.roundRect
    ? ctx.roundRect(bx, by, browserW, barH, [cornerRadius, cornerRadius, 0, 0])
    : ctx.rect(bx, by, browserW, barH);
  ctx.fill();

  // Traffic Light Window Dots
  const dotY = by + barH / 2;
  ctx.fillStyle = '#FF5F56';
  ctx.beginPath();
  ctx.arc(bx + 20 * scale, dotY, 4.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFBD2E';
  ctx.beginPath();
  ctx.arc(bx + 35 * scale, dotY, 4.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#27C93F';
  ctx.beginPath();
  ctx.arc(bx + 50 * scale, dotY, 4.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  // URL Bar in Browser
  ctx.fillStyle = '#222222';
  roundRect(ctx, bx + 75 * scale, by + 9 * scale, 280 * scale, 22 * scale, 5 * scale);
  ctx.fill();
  ctx.fillStyle = '#888888';
  ctx.font = `${Math.floor(10 * scale)}px monospace`;
  ctx.fillText('https://elevenlab.studio/experience/live', bx + 88 * scale, by + 24 * scale);

  // CONTENT AREA INSIDE VIRTUAL BROWSER
  const contentTop = by + barH + 18 * scale;
  const contentLeft = bx + 28 * scale;
  const contentW = browserW - 56 * scale;

  // Scene 1-2: Wireframe Gridlines & Blueprint Markers
  if (p < 0.45) {
    const wireAlpha = (1 - p / 0.45) * 0.7;
    ctx.strokeStyle = `rgba(77, 159, 255, ${wireAlpha})`;
    ctx.lineWidth = 1;

    // Laser scanning horizontal line moving down
    const scanY = contentTop + (p / 0.45) * (browserH - barH - 30 * scale);
    ctx.beginPath();
    ctx.moveTo(contentLeft, scanY);
    ctx.lineTo(contentLeft + contentW, scanY);
    ctx.stroke();

    // Blueprint Crosshairs
    ctx.fillStyle = `rgba(0, 240, 255, ${wireAlpha})`;
    ctx.fillRect(contentLeft, scanY - 3 * scale, 6 * scale, 6 * scale);
    ctx.fillRect(contentLeft + contentW - 6 * scale, scanY - 3 * scale, 6 * scale, 6 * scale);
  }

  // Hero Headline on Virtual Screen
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.floor(22 * scale)}px sans-serif`;
  ctx.fillText('MODERN DIGITAL PLATFORM', contentLeft, contentTop + 24 * scale);

  ctx.fillStyle = '#4D9FFF';
  ctx.font = `800 ${Math.floor(16 * scale)}px sans-serif`;
  ctx.fillText('BUILT FOR MAXIMUM SPEED & CONVERSION', contentLeft, contentTop + 48 * scale);

  // CTA Button Simulation
  ctx.fillStyle = '#4D9FFF';
  roundRect(ctx, contentLeft, contentTop + 65 * scale, 130 * scale, 30 * scale, 6 * scale);
  ctx.fill();
  ctx.fillStyle = '#080808';
  ctx.font = `bold ${Math.floor(10 * scale)}px sans-serif`;
  ctx.fillText('EXPLORE WORK →', contentLeft + 16 * scale, contentTop + 84 * scale);

  // 3 CARDS MATRIX INSIDE SIMULATED SCREEN
  const cardW = (contentW - 24 * scale) / 3;
  const cardH = 140 * scale;
  const cardY = contentTop + 115 * scale;

  const cardItems = [
    { label: '01 HIGH SPEED', color: '#4D9FFF', sub: '99/100 Lighthouse' },
    { label: '02 SCROLL JOURNEY', color: '#00F0FF', sub: 'Kinetic 60 FPS Flow' },
    { label: '03 CONVERSION UX', color: '#A855F7', sub: 'Direct WhatsApp Hook' }
  ];

  cardItems.forEach((c, i) => {
    const cxPos = contentLeft + i * (cardW + 12 * scale);
    // Dynamic pop-up offset with scroll progress
    const popY = Math.max(0, (1 - (p * 2 - i * 0.15)) * 40 * scale);

    ctx.fillStyle = '#141414';
    roundRect(ctx, cxPos, cardY + popY, cardW, cardH, 8 * scale);
    ctx.fill();

    ctx.strokeStyle = i === 1 && p > 0.4 ? '#4D9FFF' : '#262626';
    ctx.lineWidth = 1;
    roundRect(ctx, cxPos, cardY + popY, cardW, cardH, 8 * scale);
    ctx.stroke();

    // Color Accent Strip
    ctx.fillStyle = c.color;
    ctx.fillRect(cxPos + 12 * scale, cardY + popY + 14 * scale, 24 * scale, 4 * scale);

    // Card Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.floor(11 * scale)}px sans-serif`;
    ctx.fillText(c.label, cxPos + 12 * scale, cardY + popY + 40 * scale);

    ctx.fillStyle = '#888888';
    ctx.font = `${Math.floor(9.5 * scale)}px sans-serif`;
    ctx.fillText(c.sub, cxPos + 12 * scale, cardY + popY + 60 * scale);

    // Simulated progress bar inside card
    ctx.fillStyle = '#222222';
    roundRect(ctx, cxPos + 12 * scale, cardY + popY + 95 * scale, cardW - 24 * scale, 6 * scale, 3 * scale);
    ctx.fill();

    ctx.fillStyle = c.color;
    const barProgress = Math.min(1, Math.max(0, p * 1.5 - i * 0.2));
    roundRect(ctx, cxPos + 12 * scale, cardY + popY + 95 * scale, (cardW - 24 * scale) * barProgress, 6 * scale, 3 * scale);
    ctx.fill();
  });

  // 3. RESPONSIVE MOBILE DEVICE EMERGENCE (Appears at p > 0.55)
  if (p > 0.45) {
    const mobileAlpha = Math.min(1, (p - 0.45) / 0.3);
    const mobileW = 140 * scale;
    const mobileH = 250 * scale;
    const mobX = bx + browserW - 90 * scale + (1 - mobileAlpha) * 40 * scale;
    const mobY = by + browserH - mobileH + 40 * scale;

    ctx.save();
    ctx.globalAlpha = mobileAlpha;

    // Mobile Phone Body Frame
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 30 * scale;

    ctx.fillStyle = '#0B0B0B';
    roundRect(ctx, mobX, mobY, mobileW, mobileH, 18 * scale);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#4D9FFF';
    ctx.lineWidth = 2 * scale;
    roundRect(ctx, mobX, mobY, mobileW, mobileH, 18 * scale);
    ctx.stroke();

    // Mobile Top Speaker notch
    ctx.fillStyle = '#262626';
    roundRect(ctx, mobX + mobileW / 2 - 20 * scale, mobY + 8 * scale, 40 * scale, 4 * scale, 2 * scale);
    ctx.fill();

    // Mobile Content Display
    ctx.fillStyle = '#181818';
    roundRect(ctx, mobX + 10 * scale, mobY + 22 * scale, mobileW - 20 * scale, 50 * scale, 6 * scale);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.floor(8 * scale)}px sans-serif`;
    ctx.fillText('MOBILE FLUID', mobX + 16 * scale, mobY + 40 * scale);
    ctx.fillStyle = '#4D9FFF';
    ctx.fillText('100% RESPONSIVE', mobX + 16 * scale, mobY + 54 * scale);

    // Floating touch badge on mobile
    ctx.fillStyle = '#4D9FFF';
    roundRect(ctx, mobX + 10 * scale, mobY + mobileH - 36 * scale, mobileW - 20 * scale, 22 * scale, 6 * scale);
    ctx.fill();
    ctx.fillStyle = '#080808';
    ctx.font = `bold ${Math.floor(8 * scale)}px sans-serif`;
    ctx.fillText('TAP TO CHAT', mobX + 32 * scale, mobY + mobileH - 22 * scale);

    ctx.restore();
  }

  // 4. FLOATING DATA NODES & LIGHT FLARES (Cinematic Particles)
  for (let i = 0; i < 6; i++) {
    const nodeAngle = i * (Math.PI / 3) + p * 2;
    const nodeRadius = (300 + Math.sin(p * 4 + i) * 30) * scale;
    const nx = Math.cos(nodeAngle) * nodeRadius;
    const ny = Math.sin(nodeAngle) * (nodeRadius * 0.5);

    ctx.fillStyle = i % 2 === 0 ? '#4D9FFF' : '#00F0FF';
    ctx.beginPath();
    ctx.arc(nx, ny, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Subtle connecting line
    ctx.strokeStyle = 'rgba(77, 159, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(nx, ny);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Utility helper to draw rounded rectangle across all canvas implementations
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
