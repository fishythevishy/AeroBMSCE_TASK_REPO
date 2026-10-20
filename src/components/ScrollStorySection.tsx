import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MoveDown } from 'lucide-react';
import { MILESTONES, RESEARCH_PROJECTS, SUB_TEAMS } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';

type StoryPanel = {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  imageNote: string;
  target: string;
  action: string;
  kind?: 'teams' | 'result';
  detail?: string;
  teamNames?: string[];
  result?: {
    season: string;
    competition: string;
    team: string;
    award: string;
    cashPrize?: string;
  };
};

// Pull all specific claims and labels from the project's existing content model.
// Images are supplied project assets; no new people, events, awards, or partnerships are generated here.
const featuredProject = RESEARCH_PROJECTS.find((project) => project.id === 'surveillance-uav') ?? RESEARCH_PROJECTS[0];
const aerothonResult = MILESTONES.find(
  (milestone) => milestone.year === '2025' && milestone.competition === 'SAE Aerothon'
) ?? MILESTONES[0];

const STORY_PANELS: StoryPanel[] = [
  {
    number: '01',
    eyebrow: 'OUR STORY',
    title: 'Beyond the classroom.',
    copy: 'AeroBMSCE is the aerospace, aeromodelling, and unmanned systems innovation club of BMS College of Engineering.',
    image: '/images/team-aerobmsce-gathering.jpg',
    imageAlt: 'A large AeroBMSCE team group photograph indoors',
    imageNote: 'THE PEOPLE BEHIND THE WORK',
    target: '#about',
    action: 'MEET AEROBMSCE',
  },
  {
    number: '02',
    eyebrow: 'PROJECTS & RESEARCH',
    title: 'Ideas take shape.',
    copy: featuredProject?.title ?? 'Projects & initiatives',
    detail: featuredProject?.description ?? '',
    image: featuredProject?.image ?? '/images/cad-plane.png',
    imageAlt: 'Illustrative project visual accompanying the existing aircraft development entry',
    imageNote: 'PROJECT VISUAL',
    target: '#projects',
    action: 'EXPLORE THE WORK',
  },
  {
    number: '03',
    eyebrow: 'THE PEOPLE BEHIND THE FLIGHT',
    title: 'Built through people.',
    copy: 'The existing team structure brings together specialist groups with different competition and technical focus areas.',
    image: '/images/team-uav-project.jpg',
    imageAlt: 'Team members posing with a multirotor UAV prototype',
    imageNote: 'TEAM ARCHIVE',
    target: '#team',
    action: 'MEET THE TEAMS',
    kind: 'teams',
    teamNames: SUB_TEAMS.map((team) => team.name),
  },
  {
    number: '04',
    eyebrow: 'COMPETITION RECORD',
    title: 'Progress, recorded.',
    copy: aerothonResult ? `${aerothonResult.team} at ${aerothonResult.competition}.` : 'A documented competition milestone.',
    image: '/images/team-aerothon-2025.jpg',
    imageAlt: 'AeroBMSCE team group photograph at Aerothon 2025',
    imageNote: 'AEROTHON 2025',
    target: '#journey',
    action: 'EXPLORE THE JOURNEY',
    kind: 'result',
    result: aerothonResult ? {
      season: aerothonResult.season,
      competition: aerothonResult.competition,
      team: aerothonResult.team,
      award: aerothonResult.award,
      cashPrize: aerothonResult.cashPrize,
    } : undefined,
  },
  {
    number: '05',
    eyebrow: 'COLLABORATION',
    title: 'Stronger together.',
    copy: 'Explore the existing collaboration framework and its proposed sponsorship categories, including technical and academic support opportunities.',
    image: '/images/team-airframe-build.jpg',
    imageAlt: 'Team members standing with a fixed-wing aircraft',
    imageNote: 'AIRFRAME & TEAMWORK',
    target: '#partners',
    action: 'EXPLORE COLLABORATION',
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const ScrollStorySection: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const path = pathRef.current;
    const glowPath = stage?.querySelector<SVGPathElement>('.aero-story-curve__glow');
    if (!stage || !path) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pathLength = path.getTotalLength();
    const panels = Array.from(stage.querySelectorAll<HTMLElement>('[data-story-panel]'));

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = reducedMotion ? '0' : `${pathLength}`;
    if (glowPath) {
      glowPath.style.strokeDasharray = `${pathLength}`;
      glowPath.style.strokeDashoffset = reducedMotion ? '0' : `${pathLength}`;
    }

    const updateScrollScene = () => {
      const viewportHeight = window.innerHeight || 1;
      const stageRect = stage.getBoundingClientRect();
      const stageProgress = clamp(
        (viewportHeight - stageRect.top) / (stageRect.height + viewportHeight),
        0,
        1,
      );

      const dashOffset = pathLength * (1 - (reducedMotion ? 1 : stageProgress));
      path.style.strokeDashoffset = `${dashOffset}`;
      if (glowPath) glowPath.style.strokeDashoffset = `${dashOffset}`;

      panels.forEach((panel) => {
        if (reducedMotion) {
          panel.style.setProperty('--story-offset-x', '0px');
          panel.style.setProperty('--story-offset-y', '0px');
          panel.style.setProperty('--story-rotate-y', '0deg');
          panel.style.setProperty('--story-rotate-z', '0deg');
          panel.style.setProperty('--story-scale', '1');
          panel.style.setProperty('--story-opacity', '1');
          panel.style.setProperty('--story-blur', '0px');
          return;
        }

        const rect = panel.getBoundingClientRect();
        const start = viewportHeight * 0.9;
        const settle = viewportHeight * 0.48;
        const progress = clamp((start - rect.top) / (start - settle), 0, 1);
        const remaining = 1 - progress;
        const fromSide = panel.dataset.storySide === 'left' ? 1 : -1;

        // Each panel drifts in from the central flight path, unwinds, and settles
        // as the reader approaches it. Text remains still once the panel is in view.
        panel.style.setProperty('--story-offset-x', `${fromSide * remaining * 94}px`);
        panel.style.setProperty('--story-offset-y', `${remaining * 18}px`);
        panel.style.setProperty('--story-rotate-y', `${fromSide * remaining * -10}deg`);
        panel.style.setProperty('--story-rotate-z', `${fromSide * remaining * 2.6}deg`);
        panel.style.setProperty('--story-scale', `${0.94 + progress * 0.06}`);
        panel.style.setProperty('--story-opacity', `${0.4 + progress * 0.6}`);
        panel.style.setProperty('--story-blur', `${remaining * 1.4}px`);
      });
    };

    let frame = 0;
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateScrollScene();
      });
    };

    updateScrollScene();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="story" className="aero-story-section" aria-labelledby="aero-story-heading">
      <div className="aero-story-shell">
        <div className="aero-story-intro">
          <div className="aero-story-kicker">
            <span className="aero-story-kicker__rule" aria-hidden="true" />
            <span>THE AEROBMSCE STORY</span>
            <span className="aero-story-kicker__index">01 — 05</span>
          </div>
          <h2 id="aero-story-heading" className="aero-story-heading">
            A story that <em>keeps moving.</em>
          </h2>
          <div className="aero-story-intro__bottom">
            <p>People, projects, competition records, and ways to collaborate—follow the path, then explore each chapter in depth.</p>
            <span className="aero-story-scroll-cue"><MoveDown size={14} aria-hidden="true" /> SCROLL TO EXPLORE</span>
          </div>
        </div>

        <div className="aero-story-stage" ref={stageRef}>
          <svg
            className="aero-story-curve"
            viewBox="0 0 1200 2200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="aero-story-path-gradient" x1="0" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#7772A4" stopOpacity="0.38" />
                <stop offset="45%" stopColor="#D2CCFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#9690C9" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              className="aero-story-curve__glow"
              d="M600 0 C500 90 386 128 426 207 S724 328 738 427 S522 548 438 665 S722 791 744 895 S504 1014 432 1126 S689 1255 726 1382 S515 1505 443 1625 S701 1750 726 1861 S620 2038 600 2200"
            />
            <path
              ref={pathRef}
              className="aero-story-curve__line"
              d="M600 0 C500 90 386 128 426 207 S724 328 738 427 S522 548 438 665 S722 791 744 895 S504 1014 432 1126 S689 1255 726 1382 S515 1505 443 1625 S701 1750 726 1861 S620 2038 600 2200"
            />
            <g className="aero-story-curve__nodes">
              <circle cx="426" cy="207" r="4" />
              <circle cx="738" cy="427" r="4" />
              <circle cx="438" cy="665" r="4" />
              <circle cx="744" cy="895" r="4" />
              <circle cx="432" cy="1126" r="4" />
              <circle cx="726" cy="1382" r="4" />
              <circle cx="443" cy="1625" r="4" />
              <circle cx="726" cy="1861" r="4" />
            </g>
          </svg>

          <div className="aero-story-panels">
            {STORY_PANELS.map((panel, index) => (
              <div
                className={`aero-story-row aero-story-row--${index % 2 === 0 ? 'left' : 'right'}`}
                key={panel.number}
              >
                <article
                  className={`aero-story-panel aero-story-panel--${panel.kind ?? 'standard'}`}
                  data-story-panel
                  data-story-side={index % 2 === 0 ? 'left' : 'right'}
                  style={{ '--story-delay': `${index * 70}ms` } as React.CSSProperties}
                >
                  <div className="aero-story-panel__media">
                    <SafeImage
                      src={panel.image}
                      alt={panel.imageAlt}
                      fallbackTitle={panel.eyebrow}
                      className="aero-story-panel__image"
                      containerClassName="aero-story-panel__image-frame"
                    />
                  </div>
                  <div className="aero-story-panel__shade" aria-hidden="true" />
                  <span className="aero-story-panel__image-note" aria-hidden="true">{panel.imageNote}</span>

                  <div className="aero-story-panel__content">
                    <div className="aero-story-panel__topline">
                      <span className="aero-story-panel__number">{panel.number}</span>
                      <span className="aero-story-panel__eyebrow">{panel.eyebrow}</span>
                    </div>

                    <div className="aero-story-panel__copy-block">
                      <h3>{panel.title}</h3>
                      <p className="aero-story-panel__copy">{panel.copy}</p>

                      {panel.detail && <p className="aero-story-panel__detail">{panel.detail}</p>}

                      {panel.kind === 'teams' && panel.teamNames && (
                        <div className="aero-story-team-list" aria-label="Documented AeroBMSCE teams">
                          {panel.teamNames.map((team) => <span key={team}>{team}</span>)}
                        </div>
                      )}

                      {panel.kind === 'result' && panel.result && (
                        <div className="aero-story-result">
                          <span>{panel.result.season} <b>·</b> {panel.result.team}</span>
                          <strong>{panel.result.award}</strong>
                          {panel.result.cashPrize && <small>{panel.result.cashPrize}</small>}
                        </div>
                      )}
                    </div>

                    <a className="aero-story-panel__link" href={panel.target}>
                      <span>{panel.action}</span>
                      <span className="aero-story-panel__link-icon"><ArrowUpRight size={15} aria-hidden="true" /></span>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="aero-story-outro" aria-hidden="true">
          <span className="aero-story-outro__line" />
          <span>FOLLOW THE WORK</span>
          <span className="aero-story-outro__line" />
        </div>
      </div>
    </section>
  );
};
