import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Cpu, ShieldCheck, Target, Users } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { SUB_TEAMS } from '../data/aerobmsceData';

const PILLARS = [
  {
    icon: Target,
    title: 'Competitive airframes',
    copy: 'Heavy-lift cargo UAVs & micro-class competition wings.',
  },
  {
    icon: Cpu,
    title: 'Custom avionics',
    copy: 'Indigenous flight controllers, ESCs & GPS-denied autonomy.',
  },
  {
    icon: ShieldCheck,
    title: 'Real constraints',
    copy: 'Ground validation, structural FEA & wind-tunnel testing.',
  },
  {
    icon: Users,
    title: 'Talent incubation',
    copy: 'Preparing graduates for aerospace R&D and commercial drone industries.',
  },
];

export const AboutSection: React.FC = () => {
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const activeTeam = SUB_TEAMS[activeTeamIndex] ?? SUB_TEAMS[0];

  return (
    <section id="about" className="aero-about-section" aria-labelledby="aero-about-title">
      <div className="aero-about-shell">
        <div className="aero-about-topline">
          <span className="aero-about-eyebrow"><span className="aero-about-eyebrow__dot" /> 01 / ORGANIZATIONAL FOUNDATION</span>
          <span className="aero-about-location">BMS COLLEGE OF ENGINEERING <i /> BENGALURU, INDIA</span>
        </div>

        <div className="aero-about-opening">
          <div className="aero-about-opening__copy">
            <h2 id="aero-about-title">AEROSPACE, <em>MADE BY STUDENTS.</em></h2>
            <p className="aero-about-lede">
              AeroBMSCE is the official aerospace, aeromodelling, and unmanned systems innovation club of BMS College of Engineering, operating from Propel Lab–3.
            </p>
            <p className="aero-about-body">
              Established in 2012, the organization brings together student engineers from multiple academic departments to work across aircraft design, aeromodelling, avionics, and unmanned systems.
            </p>
            <div className="aero-about-facts" aria-label="Organization details">
              <div><span>ESTABLISHED</span><strong>2012</strong></div>
              <div><span>ENGINEERING HOME</span><strong>Propel Lab–3</strong></div>
            </div>
          </div>

          <div className="aero-about-blueprint" data-aero-tilt="subtle">
            <div className="aero-about-blueprint__grid" aria-hidden="true" />
            <div className="aero-about-blueprint__topline">
              <span>PROPEL LAB–3 <b>/</b> AIRFRAME STUDY</span>
              <span>FIG. 01</span>
            </div>
            <div className="aero-about-blueprint__image-wrap">
              <SafeImage
                src="/images/cad-plane.png"
                alt="AeroBMSCE fixed-wing aircraft CAD blueprint"
                fallbackTitle="AeroBMSCE Airframe Blueprint"
                containerClassName="aero-about-blueprint__image-container"
                className="aero-about-blueprint__image"
              />
            </div>
            <div className="aero-about-blueprint__crosshair aero-about-blueprint__crosshair--one" aria-hidden="true" />
            <div className="aero-about-blueprint__crosshair aero-about-blueprint__crosshair--two" aria-hidden="true" />
            <div className="aero-about-blueprint__label aero-about-blueprint__label--left"><span>01</span> STRUCTURE</div>
            <div className="aero-about-blueprint__label aero-about-blueprint__label--right"><span>02</span> FLIGHT SYSTEMS</div>
            <div className="aero-about-blueprint__footer">
              <span>DESIGN / ANALYSIS / BUILD</span>
              <span className="aero-about-blueprint__footer-mark"><i /> ORIGINAL PROJECT VISUAL</span>
            </div>
          </div>
        </div>

        <div className="aero-about-pillars" aria-label="AeroBMSCE focus areas">
          {PILLARS.map(({ icon: Icon, title, copy }, index) => (
            <article key={title} className="aero-about-pillar">
              <div className="aero-about-pillar__top"><Icon size={17} strokeWidth={1.5} /><span>0{index + 1}</span></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="aero-about-teams" aria-labelledby="aero-about-teams-title">
          <div className="aero-about-teams__heading">
            <span className="aero-about-eyebrow">SPECIALIZED TEAMS / 04 DIVISIONS</span>
            <h3 id="aero-about-teams-title">Different disciplines.<br /><em>One direction.</em></h3>
            <p>Explore the four specialist teams through their existing competition and technical focus areas.</p>
            <div className="aero-about-team-focus">
              <span>SELECTED FOCUS</span>
              <strong>{activeTeam.focus}</strong>
            </div>
          </div>

          <div className="aero-about-team-explorer">
            <div className="aero-about-team-list" role="group" aria-label="Select a specialized team">
              {SUB_TEAMS.map((team, index) => (
                <button
                  key={team.name}
                  type="button"
                  aria-pressed={activeTeamIndex === index}
                  onClick={() => setActiveTeamIndex(index)}
                  className={`aero-about-team-tab ${activeTeamIndex === index ? 'is-active' : ''}`}
                >
                  <span className="aero-about-team-tab__index">0{index + 1}</span>
                  <span className="aero-about-team-tab__text"><strong>{team.name}</strong><small>{team.focus}</small></span>
                  <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="aero-about-team-detail" id="aero-team-detail" aria-live="polite" aria-atomic="true" key={activeTeam.name}>
              <div className="aero-about-team-detail__index">0{activeTeamIndex + 1}<span> / 04</span></div>
              <div>
                <span className="aero-about-team-detail__eyebrow">{activeTeam.focus}</span>
                <h4>{activeTeam.name}</h4>
                <p>{activeTeam.description}</p>
              </div>
              <div className="aero-about-team-detail__bottom"><span>PROPEL LAB–3 / AEROBMSCE</span><ArrowDownRight size={18} strokeWidth={1.5} aria-hidden="true" /></div>
            </div>
          </div>
        </div>

        <div className="aero-about-vision">
          <div className="aero-about-vision__label"><span>OUR VISION</span><span>THE LONG VIEW <i /></span></div>
          <p>“We envision AeroBMSCE as a leading aerospace and unmanned systems research group, renowned for design excellence, innovation, and competitive success. We aim to cultivate future leaders in the aerospace and drone industry, establishing a legacy of engineering excellence that inspires students worldwide.”</p>
        </div>
      </div>
    </section>
  );
};
