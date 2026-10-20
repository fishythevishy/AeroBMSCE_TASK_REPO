import React from 'react';
import { SafeImage } from './SafeImage';
import { ArrowRight, Mail, MapPin, Compass, Shield } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  return (
    <footer className="aero-gloss-surface bg-[#030305] border-t border-[#29263C]/80 relative overflow-hidden">
      {/* Cinematic Closing Banner */}
      <div className="relative py-24 border-b border-[#15151F] aero-gloss-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>PROPEL LAB-3 · AEROSPACE INNOVATION</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-[#F4F2FF] font-display uppercase tracking-tight leading-[1.05]">
                BUILD WHAT FLIES. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9B7FF] via-[#D7D7E4] to-white">
                  ENGINEER WHAT’S NEXT.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#D7D7E4]/90 max-w-2xl leading-relaxed">
                From hand-profiled cardboard rib mockups on the workbench to carbon-fiber international
                podium UAVs. Join AeroBMSCE in taking aerospace innovation above gravity and beyond limits.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 bg-[#B9B7FF] text-[#030305] text-xs font-mono font-bold tracking-wider rounded-md hover:bg-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span>CONTACT AEROBMSCE</span>
                </button>
                <a
                  href="#projects"
                  className="px-6 py-3 bg-[#090910] text-[#D7D7E4] border border-[#29263C] text-xs font-mono tracking-wider rounded-md hover:border-[#8888C8] hover:text-[#F4F2FF] transition-colors"
                >
                  EXPLORE ALL PROJECTS
                </a>
              </div>
            </div>

            {/* Right CAD Schematics Visual */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="aero-float-card aero-float-card--soft w-full p-6 bg-[#090910] border border-[#29263C] rounded-xl text-center" data-aero-tilt="soft">
                <SafeImage
                  src="/images/cad-plane.png"
                  alt="AeroBMSCE Fixed Wing CAD Spec"
                  fallbackTitle="CAD Blueprint"
                  className="w-full h-36 object-contain mb-3"
                />
                <span className="text-xs font-mono text-[#B9B7FF] block font-semibold">
                  PROPRIETARY AIRFRAME ARCHITECTURE
                </span>
                <span className="text-[11px] font-mono text-[#8888C8] mt-1 block">
                  Propel Lab-3 · BMSCE Aerospace
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Footer Navigation & Institutional Details */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <img
              src="/images/header-logo.png"
              alt="AeroBMSCE Logo"
              className="h-10 w-auto object-contain"
            />
            <p className="text-xs text-[#8888C8] max-w-sm leading-relaxed font-mono">
              The official aerospace, aeromodelling, and unmanned systems innovation club of BMS College of Engineering, operating from Propel Lab–3. Established in 2012.
            </p>
            <div className="text-xs font-mono text-[#B9B7FF]/90">
              • Above Gravity • Beyond Limits •
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono text-[#F4F2FF] uppercase font-bold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#8888C8]">
              <li><a href="#" className="hover:text-[#B9B7FF] transition-colors">Hero &amp; 3D Flight Simulation</a></li>
              <li><a href="#about" className="hover:text-[#B9B7FF] transition-colors">About &amp; Squads</a></li>
              <li><a href="#workbench" className="hover:text-[#B9B7FF] transition-colors">Cardboard Workbench</a></li>
              <li><a href="#journey" className="hover:text-[#B9B7FF] transition-colors">Milestones &amp; Records</a></li>
              <li><a href="#team" className="hover:text-[#B9B7FF] transition-colors">Meet the Team</a></li>
              <li><a href="#gallery" className="hover:text-[#B9B7FF] transition-colors">Technical &amp; Flight Gallery</a></li>
              <li><a href="#projects" className="hover:text-[#B9B7FF] transition-colors">Projects &amp; R&amp;D</a></li>
              <li><a href="#capabilities" className="hover:text-[#B9B7FF] transition-colors">Engineering Ecosystem</a></li>
              <li><a href="#partners" className="hover:text-[#B9B7FF] transition-colors">Partnership Tiers</a></li>
            </ul>
          </div>

          {/* Col 3: Operational Headquarters & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono text-[#F4F2FF] uppercase font-bold block">
              Operational Base &amp; Contact
            </span>
            <div className="space-y-2 text-xs font-mono text-[#8888C8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B9B7FF] shrink-0 mt-0.5" />
                <span>Propel Lab-3, BMS College of Engineering, Bull Temple Road, Basavanagudi, Bengaluru, Karnataka 560019</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#B9B7FF] shrink-0" />
                <a href="mailto:aerobmsce@bmsce.ac.in" className="text-[#D7D7E4] hover:text-[#B9B7FF] transition-colors">
                  aerobmsce@bmsce.ac.in
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#8888C8]">
                Partnership Desk: Rajesh (Partnership Head)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Notice & Copyright */}
        <div className="pt-8 border-t border-[#15151F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8888C8]">
          <p>© {new Date().getFullYear()} AeroBMSCE. All rights reserved.</p>
          <p className="text-center sm:text-right text-[11px] text-[#8888C8]/70">
            Practice website for the AeroBMSCE web development recruitment task.
          </p>
        </div>
      </div>
    </footer>
  );
};
