import React, { useState, useEffect } from 'react';
import { PROJECTS, OFFICIAL_PORTFOLIO_URL } from '../data/projects';
import { ProjectCategory, ProjectItem } from '../types';
import {
  ExternalLink,
  ArrowUpRight,
  Globe,
  Layers,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filterTabs: { label: string; value: ProjectCategory }[] = [
    { label: 'ALL WORK (8)', value: 'ALL' },
    { label: 'BUSINESS', value: 'BUSINESS' },
    { label: 'HEALTHCARE', value: 'HEALTHCARE' },
    { label: 'E-COMMERCE', value: 'E-COMMERCE' },
    { label: 'SERVICE', value: 'SERVICE' }
  ];

  const filteredProjects = selectedFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterCategory === selectedFilter);

  // Close modal on Escape key and handle background scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  return (
    <section id="work" className="py-24 bg-[#0A0A0A] relative border-b border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#202020]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4D9FFF] uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F5F5] tracking-tight">
              SELECTED WORK
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md mt-4 md:mt-0 leading-relaxed">
            Real digital experiences built for real businesses.
          </p>
        </div>

        {/* Working Filter Navigation (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.value;
            return (
              <button
                key={tab.value}
                id={`filter-btn-${tab.value.toLowerCase()}`}
                onClick={() => setSelectedFilter(tab.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9FFF] cursor-pointer ${
                  isActive
                    ? 'bg-[#4D9FFF] text-[#080808] shadow-md shadow-[#4D9FFF]/20'
                    : 'bg-[#141414] text-[#A1A1A1] hover:text-white hover:bg-[#1A1A1A] border border-[#222222]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => setActiveModalProject(project)}
              className="group relative rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#4D9FFF]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#4D9FFF]/5 cursor-pointer"
            >
              {/* Top Browser / Workspace Mockup Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#161616] border-b border-[#222222]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  <span className="text-[11px] font-mono text-[#666666] ml-2 hidden sm:inline-block">
                    elevenlab.studio/projects/{project.id}
                  </span>
                </div>
                
                {/* Real Live Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C1C1C] border border-[#2E2E2E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-[#CCCCCC] uppercase tracking-wider">
                    Live Demo
                  </span>
                </div>
              </div>

              {/* Card Body Presentation */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative">
                
                {/* Background Subtle Gradient Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-40 bg-gradient-to-br ${project.gradientTheme || 'from-blue-600/20 to-transparent'}`} />

                <div>
                  {/* Category & Project Index */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${project.badgeColor || 'text-blue-400 border-blue-500/30 bg-blue-950/30'}`}>
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#666666]">
                      #{project.number}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3 group-hover:text-[#4D9FFF] transition-colors">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.highlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-[#CCCCCC] bg-[#181818] border border-[#282828] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action: VIEW LIVE DEMO Button & Details Trigger */}
                <div className="pt-5 border-t border-[#1F1F1F] flex items-center justify-between">
                  <a
                    id={`live-demo-link-${project.id}`}
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F5F5F5] hover:text-[#4D9FFF] tracking-wider uppercase transition-colors"
                  >
                    <span>VIEW LIVE DEMO</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="p-2.5 rounded-xl bg-[#181818] hover:bg-[#252525] text-[#A1A1A1] hover:text-white border border-[#2A2A2A] transition-all duration-200"
                      title="View Project Details"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-[#181818] hover:bg-[#4D9FFF] hover:text-[#080808] text-[#A1A1A1] border border-[#2A2A2A] transition-all duration-200"
                      aria-label={`Open live demo for ${project.name}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Work Official Portfolio Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#141414] via-[#161616] to-[#121212] border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-[#4D9FFF]/10 border border-[#4D9FFF]/20 text-[#4D9FFF]">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight">
                Want to explore the complete showcase?
              </div>
              <div className="text-xs sm:text-sm text-[#A1A1A1]">
                Access our full repository of digital experiences and custom web applications.
              </div>
            </div>
          </div>

          <a
            id="view-all-work-btn"
            href={OFFICIAL_PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 bg-[#F5F5F5] hover:bg-white text-[#080808] font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>VIEW ALL WORK</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Interactive Project Detail Modal */}
      {activeModalProject && (
        <div
          id="project-detail-modal-backdrop"
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            id="project-detail-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-[#121212] border border-[#2A2A2A] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Close Button */}
            <button
              id="close-project-modal-btn"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#1C1C1C] hover:bg-[#282828] text-[#A1A1A1] hover:text-white border border-[#333333] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${activeModalProject.badgeColor || 'text-blue-400 border-blue-500/30 bg-blue-950/30'}`}>
                  {activeModalProject.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#888888]">
                  #{activeModalProject.number}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activeModalProject.name}
              </h3>
            </div>

            {/* Visual Mockup Preview Bar */}
            <div className="rounded-2xl bg-[#0A0A0A] border border-[#222222] p-5 mb-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="text-xs font-mono text-[#666666] ml-2 truncate max-w-xs">
                    {activeModalProject.liveDemoUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              <p className="text-sm text-[#A1A1A1] leading-relaxed mb-4">
                {activeModalProject.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  KEY FEATURES & CAPABILITIES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#CCCCCC] bg-[#141414] p-2.5 rounded-lg border border-[#222222]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4D9FFF] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                id="modal-launch-demo-btn"
                href={activeModalProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#4D9FFF] hover:bg-[#3d8de6] text-[#080808] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md shadow-[#4D9FFF]/20"
              >
                <span>OPEN LIVE DEMO PLATFORM</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-white text-xs font-bold uppercase tracking-wider border border-[#2E2E2E] transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
