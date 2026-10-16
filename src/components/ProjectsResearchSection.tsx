import React, { useState } from 'react';
import { RESEARCH_PROJECTS, UPCOMING_COMPETITIONS, ProjectItem } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';
import { Cpu, Plane, Calendar, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ProjectsResearchSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Autonomous Systems',
    'Avionics & Electronics',
    'Aerodynamic Mechanisms',
    'Defense & Research'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? RESEARCH_PROJECTS
    : RESEARCH_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>05. R&amp;D AND FLIGHT SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              PROJECTS &amp; INITIATIVES
            </h2>
          </div>
          <div className="text-xs font-mono text-[#8888C8] space-y-1">
            <p className="text-[#F4F2FF] font-semibold">100% R&amp;D SUBSIDIZED BY BMSCE</p>
            <p>Flight-proven platforms &amp; proprietary embedded avionics</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090910] border border-[#29263C] rounded-lg mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B9B7FF] text-[#030305] font-bold shadow-sm'
                  : 'text-[#8888C8] hover:text-[#F4F2FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="aero-float-card bg-[#090910] border border-[#15151F] hover:border-[#29263C] transition-all rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#030305] p-2 flex items-center justify-center">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackTitle={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-mono text-[#8888C8] uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#F4F2FF] font-display leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#D7D7E4]/90 mt-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#15151F] mt-2">
                <span className="text-[10px] font-mono text-[#B9B7FF] uppercase tracking-wider block pt-3">
                  Propel Lab-3 BMSCE R&amp;D Initiative
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Competitions Horizon */}
        <div className="aero-float-card aero-float-card--subtle aero-gloss-panel bg-[#090910] border border-[#29263C] rounded-xl p-8 sm:p-10" data-aero-tilt="subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-1">
                COMPETITION HORIZON
              </span>
              <h3 className="text-2xl font-bold text-[#F4F2FF] font-display">
                Upcoming Delegations (2026 &amp; 2027)
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8888C8]">
              Target representation across global aerospace events
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_COMPETITIONS.map((comp) => (
              <div
                key={comp.title}
                className="aero-float-card aero-float-card--soft bg-[#030305] border border-[#15151F] p-5 rounded-lg flex flex-col justify-between" data-aero-tilt="soft"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#B9B7FF]">
                      TARGET: {comp.targetYear}
                    </span>
                    <Calendar className="w-3.5 h-3.5 text-[#8888C8]" />
                  </div>
                  <h4 className="text-base font-bold text-[#F4F2FF] font-display">
                    {comp.title}
                  </h4>
                  <span className="text-xs text-[#8888C8] mt-1 block">
                    {comp.organizer}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-[#15151F]">
                  <span className="text-[11px] font-mono text-[#D7D7E4]">
                    Focus: {comp.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
