import React from 'react';
import { ECOSYSTEM_LOGOS } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';
import { Layers, Cpu, Compass, BookOpen } from 'lucide-react';

export const CapabilitiesEcosystemSection: React.FC = () => {
  return (
    <section id="capabilities" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>06. TECHNICAL INFRASTRUCTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              ENGINEERING TOOLS &amp; RESEARCH ECOSYSTEM
            </h2>
          </div>
          <p className="text-sm text-[#8888C8] max-w-md font-mono">
            A curated view of engineering tools, component resources and aerospace research organizations referenced in the project materials. Logo inclusion alone does not imply sponsorship, endorsement or a formal partnership.
          </p>
        </div>

        {/* 1. Design, Simulation & CFD Software Tooling */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-4">
            <Layers className="w-4 h-4" />
            <span>Design, Aerodynamic Simulation &amp; FEA Tools</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ECOSYSTEM_LOGOS.cad_cfd.map((tool) => (
              <div
                key={tool.name}
                className="aero-float-card aero-float-card--soft bg-[#090910] border border-[#15151F] hover:border-[#29263C] p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all group" data-aero-tilt="soft"
              >
                <div className={`h-14 w-full flex items-center justify-center mb-2 px-2 rounded-md ${tool.logoWell === 'light' ? 'bg-[#F4F2F7] border border-white/10' : 'bg-[#07050B] border border-white/[0.04]'}`}>
                  <SafeImage
                    src={tool.src}
                    alt={tool.name}
                    fallbackTitle={tool.name}
                    className="max-h-11 max-w-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-bold text-[#F4F2FF] font-display block">
                  {tool.name}
                </span>
                <span className="text-[10px] font-mono text-[#8888C8] mt-0.5 block">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. UAV Component & Hardware Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#090910] border border-[#15151F] p-6 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-4">
              <Cpu className="w-4 h-4" />
              <span>UAV Hardware &amp; Component Resources</span>
            </div>
            <p className="text-xs text-[#8888C8] mb-6 leading-relaxed">
              Examples of component marketplaces and hardware resources relevant to UAV development. Check each provider for current availability, specifications and suitability.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ECOSYSTEM_LOGOS.hardware.map((item) => (
                <div
                  key={item.name}
                  className="aero-float-card aero-float-card--soft bg-[#030305] border border-[#29263C] p-4 rounded-lg flex flex-col items-center justify-center text-center" data-aero-tilt="soft"
                >
                  <div className={`h-14 w-full rounded-md flex items-center justify-center p-2 mb-2 ${item.logoWell === 'light' ? 'bg-[#F4F2F7]' : 'bg-[#07050B]'}`}>
                    <SafeImage
                      src={item.src}
                      alt={item.name}
                      fallbackTitle={item.name}
                      className="max-h-10 max-w-[110px] object-contain"
                      containerClassName="h-full w-full flex items-center justify-center"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#F4F2FF] font-display">{item.name}</span>
                  <span className="text-[10px] font-mono text-[#8888C8]">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Academic & Research Interaction */}
          <div className="bg-[#090910] border border-[#15151F] p-6 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Aerospace &amp; Research Organizations</span>
            </div>
            <p className="text-xs text-[#8888C8] mb-6 leading-relaxed">
              These organization logos are shown as references from the supplied materials. Their appearance here does not independently establish a collaboration, endorsement or project relationship.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {ECOSYSTEM_LOGOS.academic_research.map((item) => (
                <div
                  key={item.name}
                  className="aero-float-card aero-float-card--soft bg-[#030305] border border-[#29263C] p-4 rounded-lg flex flex-col items-center justify-center text-center" data-aero-tilt="soft"
                >
                  <div className={`h-14 w-full rounded-md flex items-center justify-center p-2 mb-2 ${item.logoWell === 'light' ? 'bg-[#F4F2F7]' : 'bg-[#07050B]'}`}>
                    <SafeImage
                      src={item.src}
                      alt={item.name}
                      fallbackTitle={item.name}
                      className="max-h-10 max-w-[110px] object-contain"
                      containerClassName="h-full w-full flex items-center justify-center"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#F4F2FF] font-display">{item.name}</span>
                  <span className="text-[10px] font-mono text-[#8888C8]">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Validation Capabilities Checklist */}
        <div className="aero-float-card aero-float-card--subtle p-8 bg-[#090910] border border-[#29263C] rounded-xl" data-aero-tilt="subtle">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase block mb-1">
                COMPUTATIONAL FLUID DYNAMICS
              </span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Full 3D steady-state and transient Navier-Stokes simulation for high AoA wing stall prediction and propwash interaction.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase block mb-1">
                EMBEDDED FIRMWARE DESIGN
              </span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Custom bare-metal C/C++ firmware, custom RTOS scheduling, CAN-bus telemetry, and hardware-in-the-loop (HIL) testing.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase block mb-1">
                COMPOSITE TOOLING &amp; FABRICATION
              </span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                In-house vacuum bagging, female epoxy molds, high-aspect ratio carbon spars, and precision foam core wire cutting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
