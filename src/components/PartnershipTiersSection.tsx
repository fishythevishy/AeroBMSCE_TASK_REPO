import React from 'react';
import { PARTNERSHIP_TIERS } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';
import { Mail, Check, ArrowRight, ShieldCheck, Eye, Compass, GraduationCap } from 'lucide-react';

interface PartnershipTiersSectionProps {
  onOpenContact: () => void;
}

export const PartnershipTiersSection: React.FC<PartnershipTiersSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="partners" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>07. COLLABORATION FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              PARTNER WITH AEROBMSCE
            </h2>
          </div>
          <p className="text-sm text-[#8888C8] max-w-md font-mono">
            Support India's premier student aerospace team as we represent BMSCE across national and international flight arenas.
          </p>
        </div>

        {/* Strategic Status & What Enables Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="aero-float-card aero-float-card--subtle aero-gloss-panel bg-[#090910] border border-[#29263C] p-8 rounded-xl" data-aero-tilt="subtle">
            <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-2">
              STRATEGIC PROJECT STATUS
            </span>
            <h3 className="text-xl font-bold text-[#F4F2FF] font-display mb-3">
              Subsidized R&amp;D with Flight-Proven Airframes
            </h3>
            <p className="text-xs sm:text-sm text-[#D7D7E4]/90 leading-relaxed mb-4">
              100% of the Research, Development, and Technical Fabrication for our current flight systems
              is subsidized by the R&amp;D department at BMS College of Engineering. We have a flight-proven
              product ready for the world stage.
            </p>
            <div className="p-3 bg-[#030305] border border-[#15151F] rounded text-xs font-mono text-[#8888C8]">
              Ready for international deployment at SAE Aero Design West (USA) and national aerothon tracks.
            </div>
          </div>

          <div className="aero-float-card aero-float-card--subtle bg-[#090910] border border-[#29263C] p-8 rounded-xl" data-aero-tilt="subtle">
            <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-2">
              HOW PARTNERS ENABLE SUCCESS
            </span>
            <h3 className="text-xl font-bold text-[#F4F2FF] font-display mb-3">
              Direct Strategic Enablers
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D7D7E4]/90">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B9B7FF] shrink-0 mt-0.5" />
                <span><strong>Financial Sponsorship</strong> — Critical support for airframe shipping, international airfare, accommodation, and competition logistics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B9B7FF] shrink-0 mt-0.5" />
                <span><strong>Academic &amp; Research Guidance</strong> — Technical mentorship from defense and aerospace industry engineers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#B9B7FF] shrink-0 mt-0.5" />
                <span><strong>Opportunity &amp; Exposure</strong> — Connecting student innovators with advanced industry technology and engineering careers.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Collaboration Tiers (Opportunities) */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-1">
                SPONSORSHIP CATEGORIES
              </span>
              <h3 className="text-2xl font-bold text-[#F4F2FF] font-display">
                Four Structured Collaboration Tiers
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8888C8]">
              Proposed sponsorship and ecosystem integration packages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERSHIP_TIERS.map((tier) => (
              <div
                key={tier.id}
                className="aero-float-card bg-[#090910] border border-[#15151F] hover:border-[#29263C] p-6 rounded-xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SafeImage
                      src={tier.icon}
                      alt={tier.name}
                      fallbackTitle={tier.name}
                      className="w-12 h-12 object-contain"
                    />
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border uppercase"
                      style={{ color: tier.color, borderColor: `${tier.color}40`, backgroundColor: `${tier.color}10` }}
                    >
                      {tier.id}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#F4F2FF] font-display">
                    {tier.name}
                  </h4>
                  <p className="text-xs font-mono text-[#8888C8] mt-1 mb-5">
                    {tier.subtitle}
                  </p>

                  <ul className="space-y-2.5 border-t border-[#15151F] pt-4 text-xs text-[#D7D7E4]/90">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#B9B7FF] mt-1 shrink-0">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#15151F]">
                  <button
                    onClick={onOpenContact}
                    className="w-full py-2 bg-[#15151F] hover:bg-[#29263C] text-xs font-mono text-[#F4F2FF] rounded transition-colors text-center cursor-pointer"
                  >
                    DISCUSS TIER
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Measurable Partner Outcomes */}
        <div className="aero-float-card aero-float-card--subtle p-8 bg-[#090910] border border-[#29263C] rounded-xl mb-12" data-aero-tilt="subtle">
          <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-2">
            MEASURABLE OUTCOMES
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F4F2FF] font-display mb-6">
            Why Corporate &amp; Ecosystem Partners Back AeroBMSCE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#F4F2FF] font-display block">Talent Incubation Pipeline</span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Direct early recruitment access to verified student engineers with hands-on multi-disciplinary aerospace, CAD, FEA, and avionics mastery.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#F4F2FF] font-display block">High-Impact Brand Presence</span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Over 20,000+ digital reach and 50,000+ on-ground impressions at premier technical symposiums and international SAE events.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#F4F2FF] font-display block">Technical Credibility</span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                Association with internationally ranked collegiate flight teams competing under rigorous technical jury review.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Contact Callout */}
        <div className="aero-float-card aero-float-card--subtle bg-gradient-to-r from-[#090910] to-[#15151F] border border-[#B9B7FF]/30 p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6" data-aero-tilt="subtle">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#F4F2FF] font-display">
              Initiate a Strategic Partnership Discussion
            </h4>
            <p className="text-xs text-[#8888C8] font-mono">
              Contact Rajesh (Partnership Head) · E-Mail: aerobmsce@bmsce.ac.in
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 bg-[#B9B7FF] text-[#030305] text-xs font-mono font-bold tracking-wider rounded-md hover:bg-white transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>CONTACT PARTNERSHIP DESK</span>
          </button>
        </div>
      </div>
    </section>
  );
};
