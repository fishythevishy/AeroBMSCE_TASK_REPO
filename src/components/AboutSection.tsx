import React from 'react';
import { SafeImage } from './SafeImage';
import { SUB_TEAMS } from '../data/aerobmsceData';
import { ShieldCheck, Cpu, Target, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>01. ORGANIZATIONAL FOUNDATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              PROPEL LAB-3 · BMS COLLEGE OF ENGINEERING
            </h2>
          </div>
          <p className="text-sm text-[#8888C8] max-w-md font-mono">
            EST. 2012 · 10+ ENGINEERING DISCIPLINES COLLABORATING UNDER ONE FLIGHT RESEARCH ROOF
          </p>
        </div>

        {/* Narrative Split: Who We Are & Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#F4F2FF] font-display">
              Transforming Theoretical Mechanics into Airworthy Flight Platforms
            </h3>
            <p className="text-sm sm:text-base text-[#D7D7E4]/90 leading-relaxed">
              AeroBMSCE is the official aerospace, aeromodelling, and unmanned systems innovation club
              of BMS College of Engineering, operating directly from Propel Lab–3. Established in 2012,
              the organization brings together student engineers from across 10+ academic departments
              including Mechanical, Electronics, Computer Science, and Aerospace.
            </p>
            <p className="text-sm sm:text-base text-[#D7D7E4]/90 leading-relaxed">
              We design, build, and flight-test advanced fixed-wing aircraft, autonomous tactical drones,
              and high-G racing systems under real-world aerodynamic, structural, and payload constraints.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#15151F]">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-[#B9B7FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F4F2FF] uppercase">Competitive Airframes</h4>
                  <p className="text-xs text-[#8888C8] mt-0.5">Heavy-lift cargo UAVs &amp; micro-class competition wings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-[#B9B7FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F4F2FF] uppercase">Custom Avionics</h4>
                  <p className="text-xs text-[#8888C8] mt-0.5">Indigenous flight controllers, ESCs &amp; GPS-denied autonomy.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B9B7FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F4F2FF] uppercase">Real Constraints</h4>
                  <p className="text-xs text-[#8888C8] mt-0.5">Rigorous ground validation, structural FEA &amp; wind tunnel testing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#B9B7FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F4F2FF] uppercase">Talent Incubation</h4>
                  <p className="text-xs text-[#8888C8] mt-0.5">Graduates equipped for aerospace R&amp;D and commercial drone industries.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aero-float-card aero-float-card--soft relative rounded-lg overflow-hidden border border-[#29263C] bg-[#090910]" data-aero-tilt="soft">
              <SafeImage
                src="/images/cad-plane.png"
                alt="AeroBMSCE Fixed-Wing CAD Blueprint"
                fallbackTitle="AeroBMSCE Propel Lab-3 CAD Specification"
                className="w-full h-80 sm:h-96 object-contain p-4"
              />
              <div className="p-4 bg-[#090910] border-t border-[#15151F]">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#F4F2FF]">Propel Lab-3 Engineering Blueprint</span>
                  <span className="text-[#8888C8]">Bengaluru, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Competitive Squads Grid */}
        <div className="mt-16">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-1">
              SPECIALIZED TEAMS
            </span>
            <h3 className="text-2xl font-bold text-[#F4F2FF] font-display">
              Four Specialized Divisions Representing BMSCE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUB_TEAMS.map((team, idx) => (
              <div
                key={team.name}
                className="aero-float-card bg-[#090910] border border-[#15151F] hover:border-[#29263C] transition-colors p-6 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#8888C8] block mb-2">
                    0{idx + 1} // SQUAD
                  </span>
                  <h4 className="text-lg font-bold text-[#F4F2FF] font-display">{team.name}</h4>
                  <span className="inline-block text-xs font-mono text-[#B9B7FF] mt-1 mb-3">
                    {team.focus}
                  </span>
                  <p className="text-xs text-[#8888C8] leading-relaxed">
                    {team.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#15151F]">
                  <span className="text-[10px] font-mono text-[#B9B7FF] uppercase tracking-wider block">
                    Propel Lab-3 Division
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Vision Banner */}
        <div className="aero-float-card aero-float-card--subtle mt-16 p-8 bg-[#090910] border border-[#29263C] rounded-lg" data-aero-tilt="subtle">
          <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-2">
            OUR VISION
          </span>
          <p className="text-base sm:text-lg text-[#F4F2FF] font-medium leading-relaxed max-w-4xl">
            "We envision AeroBMSCE as a leading aerospace and unmanned systems research group, renowned
            for design excellence, innovation, and competitive success. We aim to cultivate future leaders
            in the aerospace and drone industry, establishing a legacy of engineering excellence that
            inspires students worldwide."
          </p>
        </div>
      </div>
    </section>
  );
};
