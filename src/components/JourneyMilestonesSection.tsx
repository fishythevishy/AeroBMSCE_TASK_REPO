import React, { useState } from 'react';
import { MILESTONES, Milestone } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';
import { Trophy, Award, MapPin, Calendar, Filter } from 'lucide-react';

export const JourneyMilestonesSection: React.FC = () => {
  const [teamFilter, setTeamFilter] = useState<string>('All');

  const filteredMilestones = teamFilter === 'All'
    ? MILESTONES
    : MILESTONES.filter(m => m.team === teamFilter);

  const teams = ['All', 'Team Yaksha', 'Team Blue Impulse', 'Team Flying Phantoms', 'Team Vectors'];

  return (
    <section id="journey" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>04. COMPETITIVE RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              OUR JOURNEY &amp; MILESTONES
            </h2>
          </div>
          <div className="text-xs font-mono text-[#8888C8] space-y-1">
            <p className="text-[#F4F2FF] font-semibold">16+ YEARS · 75+ PROJECTS · 20+ PODIUM FINISHES</p>
            <p>Documented flight history across SAE International USA &amp; National Championships</p>
          </div>
        </div>

        {/* Team Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090910] border border-[#29263C] rounded-lg mb-12 overflow-x-auto">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setTeamFilter(t)}
              className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                teamFilter === t
                  ? 'bg-[#B9B7FF] text-[#030305] font-bold shadow-sm'
                  : 'text-[#8888C8] hover:text-[#F4F2FF]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Timeline Records */}
        <div className="space-y-6">
          {filteredMilestones.map((item, idx) => (
            <div
              key={`${item.year}-${item.competition}-${idx}`}
              className="aero-float-card aero-float-card--subtle bg-[#090910] border border-[#15151F] hover:border-[#29263C] transition-all p-6 sm:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6" data-aero-tilt="subtle"
            >
              {/* Left Column: Season & Competition */}
              <div className="space-y-2 md:max-w-xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="text-[#B9B7FF] font-bold">{item.season}</span>
                  <span className="text-[#8888C8]">·</span>
                  <span className="text-[#D7D7E4]">{item.team}</span>
                  {item.date && (
                    <>
                      <span className="text-[#8888C8]">·</span>
                      <span className="text-[#8888C8]">{item.date}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F2FF] font-display">
                  {item.competition}
                </h3>

                <p className="text-base text-[#B9B7FF] font-semibold">
                  {item.award}
                </p>

                {item.details && (
                  <p className="text-xs text-[#8888C8] leading-relaxed">
                    {item.details}
                  </p>
                )}
              </div>

              {/* Right Column: Location & Cash Prize Badges */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                {item.cashPrize && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#15151F] border border-[#29263C] rounded-md text-xs font-mono text-[#E5A93C]">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{item.cashPrize}</span>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#8888C8]">
                    <MapPin className="w-3.5 h-3.5 text-[#B9B7FF]" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Documented Impact & Verification Summary directly from journey.html */}
        <div className="mt-16 pt-12 border-t border-[#15151F]">
          <div className="aero-float-card aero-float-card--subtle bg-[#090910] border border-[#29263C] rounded-xl p-8 sm:p-10" data-aero-tilt="subtle">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block">
                  DOCUMENTED IMPACT &amp; CREDIBILITY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F2FF] font-display">
                  16+ Years · 75+ Projects · 20+ Podium Finishes
                </h3>
                <p className="text-xs sm:text-sm text-[#D7D7E4]/90 leading-relaxed font-mono">
                  "Since we have started, we’ve taken on and successfully completed 75+ projects, collaborating with students from more than 10 departments across the college. Along the way, we’ve produced 50+ research papers, reports, and certifications that highlight the creativity and dedication of our members."
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#8888C8]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#B9B7FF] rounded-full" />
                    Propel Lab-3, BMSCE
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#B9B7FF] rounded-full" />
                    International Flight History
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#B9B7FF] rounded-full" />
                    SAE International &amp; Aerothon
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#030305] border border-[#15151F] rounded-lg p-4 text-center">
                <SafeImage
                  src="/images/cad-plane.png"
                  alt="AeroBMSCE Competition Aircraft Airframe CAD Blueprint"
                  fallbackTitle="Competition Airframe Spec"
                  className="w-full h-44 object-contain"
                />
                <span className="text-[11px] font-mono text-[#8888C8] block mt-2">
                  AeroBMSCE Competition Airframe Blueprint
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
