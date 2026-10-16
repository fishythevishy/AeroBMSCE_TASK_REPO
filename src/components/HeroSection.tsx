import React from 'react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { ArrowRight, ChevronDown, Compass } from 'lucide-react';
import { CREDIBILITY_STATS } from '../data/aerobmsceData';

export const HeroSection: React.FC = () => {
  return (
    <section className="aero-gloss-surface relative w-full bg-[#030305] overflow-hidden pt-10 pb-4">
      {/* Editorial Headline & Context */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Column: Bold Headline & Mission */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8888C8]">
              <span className="text-[#B9B7FF]">AEROBMSCE</span>
              <span aria-hidden="true">·</span>
              <span>PROPEL LAB-3</span>
              <span aria-hidden="true">·</span>
              <span>BMS COLLEGE OF ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4F2FF] font-display uppercase leading-[1.05]">
              STUDENTS FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F2FF] via-[#D7D7E4] to-[#B9B7FF]">
                THE SKIES.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#D7D7E4]/90 max-w-xl leading-relaxed">
              Aerospace engineering, built by students. We design, fabricate, and test competitive
              aircraft and autonomous unmanned systems — taking ideas from the drawing board into the real world.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#journey"
                className="px-5 py-2.5 bg-[#B9B7FF] text-[#030305] text-xs font-mono font-bold tracking-wider rounded-md hover:bg-white transition-colors flex items-center gap-2"
              >
                <span>EXPLORE OUR JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 bg-[#090910] text-[#D7D7E4] border border-[#29263C] text-xs font-mono tracking-wider rounded-md hover:border-[#8888C8] hover:text-[#F4F2FF] transition-colors"
              >
                EXPLORE OUR WORK
              </a>
            </div>
          </div>

          {/* Right Column: Mission Footnote & Credibility Indicator */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end">
            <div className="aero-float-card aero-float-card--subtle aero-gloss-panel p-4 bg-[#090910] border border-[#29263C]/80 rounded-lg max-w-md" data-aero-tilt="subtle">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Operational Base</span>
              </div>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Operating from Propel Lab-3, BMSCE Bengaluru. Established in 2012, bringing together students from 10+ engineering departments with international flight history at SAE competitions in the USA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Central Interactive Three.js Aircraft & 3D Flight Simulation */}
      <div className="w-full relative">
        <ThreeHeroCanvas />
      </div>

      {/* Full-width Credibility Metrics Strip */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-[#15151F]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {CREDIBILITY_STATS.map((stat) => (
            <div key={stat.label} className="border-l border-[#29263C] pl-4">
              <span className="block text-2xl sm:text-3xl font-black text-[#F4F2FF] font-display tabular-nums">
                {stat.value}
              </span>
              <span className="block text-xs font-mono text-[#8888C8] mt-1 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
