import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { MILESTONES } from '../data/aerobmsceData';
import { SafeImage } from './SafeImage';
import { Trophy, MapPin, ArrowUpRight, Orbit, CalendarDays } from 'lucide-react';

type RouteState = { width: number; height: number; path: string; anchors: Array<{ x: number; y: number; side: 'left' | 'right' }> };

const TEAMS = ['All', 'Team Yaksha', 'Team Blue Impulse', 'Team Flying Phantoms', 'Team Vectors'];
const INITIAL_ROUTE: RouteState = { width: 1, height: 1, path: '', anchors: [] };

const BLUEPRINT_FEATURES = [
  {
    id: 'wing',
    title: 'Wing planform',
    shortLabel: 'WING PLANFORM',
    description: 'The lateral wing outline visible in the supplied top-view blueprint.',
    left: '77%',
    top: '43%',
  },
  {
    id: 'fuselage',
    title: 'Fuselage centreline',
    shortLabel: 'FUSELAGE CENTRELINE',
    description: 'The central body alignment in the supplied plan view.',
    left: '50%',
    top: '48%',
  },
  {
    id: 'tail',
    title: 'Tailplane',
    shortLabel: 'TAILPLANE',
    description: 'The aft horizontal surface visible at the lower end of the plan view.',
    left: '50%',
    top: '75%',
  },
] as const;

type BlueprintFeatureId = (typeof BLUEPRINT_FEATURES)[number]['id'];

export const JourneyMilestonesSection: React.FC = () => {
  const [teamFilter, setTeamFilter] = useState<string>('All');
  const [visiblePanels, setVisiblePanels] = useState<number[]>([]);
  const [motionReady, setMotionReady] = useState(false);
  const [route, setRoute] = useState<RouteState>(INITIAL_ROUTE);
  const [activeBlueprintFeature, setActiveBlueprintFeature] = useState<BlueprintFeatureId | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const routePathRef = useRef<SVGPathElement | null>(null);

  const filteredMilestones = useMemo(
    () => teamFilter === 'All' ? MILESTONES : MILESTONES.filter((item) => item.team === teamFilter),
    [teamFilter],
  );

  // Reveal each entry once as it enters the viewport. With no JS, the full timeline remains readable.
  useEffect(() => {
    const nodes = panelRefs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisiblePanels(filteredMilestones.map((_, index) => index));
      setMotionReady(false);
      return;
    }

    setVisiblePanels([]);
    setMotionReady(true);
    const observer = new IntersectionObserver((entries) => {
      const newlyVisible: number[] = [];
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number((entry.target as HTMLElement).dataset.panelIndex);
        if (Number.isFinite(index)) newlyVisible.push(index);
        observer.unobserve(entry.target);
      });
      if (newlyVisible.length) setVisiblePanels((current) => Array.from(new Set([...current, ...newlyVisible])));
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filteredMilestones]);

  // Draw the SVG trajectory from measured card edges so the S-curve stays aligned as cards resize/filter.
  useEffect(() => {
    let resizeObserver: ResizeObserver | undefined;
    let raf = 0;

    const buildRoute = () => {
      const track = trackRef.current;
      if (!track) return;
      const bounds = track.getBoundingClientRect();
      const width = Math.max(bounds.width, 1);
      const height = Math.max(track.scrollHeight, 1);
      const anchors: RouteState['anchors'] = [];

      panelRefs.current.slice(0, filteredMilestones.length).forEach((panel, index) => {
        if (!panel) return;
        const side = index % 2 === 0 ? 'left' : 'right';
        const row = panel.parentElement;
        const rowRect = row?.getBoundingClientRect();
        if (!rowRect) return;
        const compact = width < 700;
        const measuredX = rowRect.left - bounds.left + panel.offsetLeft + (side === 'left' ? panel.offsetWidth - 2 : 2);
        const x = compact ? 12 : measuredX;
        const y = rowRect.top - bounds.top + panel.offsetTop + Math.min(panel.offsetHeight * 0.56, panel.offsetHeight - 18);
        anchors.push({ x: Math.max(4, Math.min(width - 4, x)), y: Math.max(12, Math.min(height - 12, y)), side });
      });

      if (anchors.length < 2) {
        setRoute({ width, height, path: '', anchors });
        return;
      }
      let path = `M ${width * 0.5} ${Math.max(4, anchors[0].y - 110)}`;
      path += ` C ${width * 0.26} ${anchors[0].y - 72}, ${width * 0.12} ${anchors[0].y - 28}, ${anchors[0].x} ${anchors[0].y}`;
      for (let i = 0; i < anchors.length - 1; i += 1) {
        const current = anchors[i];
        const next = anchors[i + 1];
        const dy = Math.max(60, next.y - current.y);
        const compact = width < 700;
        const direction = i % 2 === 0 ? 1 : -1;
        const c1x = compact ? width * (direction > 0 ? 0.045 : 0.19) : width * (direction > 0 ? 0.14 : 0.86);
        const c2x = compact ? width * (direction > 0 ? 0.19 : 0.045) : width * (direction > 0 ? 0.86 : 0.14);
        path += ` C ${c1x} ${current.y + dy * 0.42}, ${c2x} ${next.y - dy * 0.42}, ${next.x} ${next.y}`;
      }
      const last = anchors[anchors.length - 1];
      path += ` C ${width * 0.76} ${last.y + 36}, ${width * 0.62} ${Math.min(height - 8, last.y + 78)}, ${width * 0.5} ${Math.min(height - 8, last.y + 92)}`;
      setRoute({ width, height, path, anchors });
    };

    const scheduleBuild = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(buildRoute);
    };

    scheduleBuild();
    if ('ResizeObserver' in window && trackRef.current) {
      resizeObserver = new ResizeObserver(scheduleBuild);
      resizeObserver.observe(trackRef.current);
      panelRefs.current.slice(0, filteredMilestones.length).forEach((panel) => panel && resizeObserver?.observe(panel));
    }
    window.addEventListener('resize', scheduleBuild);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleBuild);
    };
  }, [filteredMilestones, visiblePanels]);

  // Scroll progress draws the path gradually through the whole milestone field.
  useEffect(() => {
    let raf = 0;
    const updateProgress = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const span = rect.height + window.innerHeight * 0.7;
        const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.86 - rect.top) / Math.max(span, 1)));
        const path = routePathRef.current;
        if (path) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length * (1 - progress)}`;
        }
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [route.path, route.height, filteredMilestones]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="aero-gloss-surface journey-swirl-section py-24 bg-[#030305] border-b border-[#15151F]"
    >
      <div className="journey-shell max-w-7xl mx-auto px-6">
        <div className="journey-heading flex flex-col xl:flex-row xl:items-end justify-between gap-7 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-3">
              <span>04. COMPETITIVE RECORD</span>
              <span className="journey-heading-rule" />
              <span className="text-[#6B6686]">{String(filteredMilestones.length).padStart(2, '0')} RECORDS</span>
            </div>
            <h2 className="journey-display-title text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              OUR JOURNEY<span className="journey-title-comma">,</span><br />IN MOTION
            </h2>
            <p className="journey-heading-caption">A record of competition, iteration, and progress—across the teams that carry AeroBMSCE forward.</p>
          </div>
          <div className="journey-heading-stats text-xs font-mono text-[#8888C8] space-y-2 xl:text-right">
            <p className="text-[#F4F2FF] font-semibold">16+ YEARS · 75+ PROJECTS · 20+ PODIUM FINISHES</p>
            <p>Documented flight history across SAE International USA &amp; National Championships</p>
            <div className="journey-scroll-indicator"><Orbit size={13} /><span>SCROLL TO TRACE THE RECORD</span></div>
          </div>
        </div>

        <div className="journey-filter-wrap">
          <div className="journey-filter-label"><span>FILTER BY TEAM</span><span>{String(filteredMilestones.length).padStart(2, '0')} MILESTONES IN VIEW</span></div>
          <div className="journey-team-filter" role="group" aria-label="Filter milestones by team">
            {TEAMS.map((team) => (
              <button
                key={team}
                type="button"
                onClick={() => setTeamFilter(team)}
                aria-pressed={teamFilter === team}
                className={`journey-filter-button ${teamFilter === team ? 'is-active' : ''}`}
              >
                {team === 'All' ? 'All records' : team.replace('Team ', '')}
              </button>
            ))}
          </div>
        </div>

        <div className={`journey-timeline ${motionReady ? 'is-motion-ready' : ''}`} ref={trackRef}>
          <svg
            className="journey-trajectory"
            viewBox={`0 0 ${route.width} ${route.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journeyRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7770B8" stopOpacity="0.28" />
                <stop offset="48%" stopColor="#B9B7FF" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#8A7CE8" stopOpacity="0.48" />
              </linearGradient>
              <filter id="journeyRouteGlow" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="3.6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {route.path && <path className="journey-route-underlay" d={route.path} />}
            {route.path && <path ref={routePathRef} className="journey-route-line" d={route.path} />}
            {route.anchors.map((anchor, index) => (
              <g key={`${index}-${anchor.x.toFixed(0)}-${anchor.y.toFixed(0)}`} className={`journey-route-node ${visiblePanels.includes(index) ? 'is-active' : ''}`} transform={`translate(${anchor.x}, ${anchor.y})`}>
                <circle r="8" className="journey-node-halo" />
                <circle r="3.1" className="journey-node-core" />
              </g>
            ))}
          </svg>

          {filteredMilestones.map((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const visible = visiblePanels.includes(index);
            const style = { '--panel-index': index, '--panel-turn': side === 'left' ? '-1' : '1' } as CSSProperties;
            return (
              <div className={`journey-timeline-row journey-side-${side}`} key={`${item.year}-${item.competition}-${item.team}-${index}`}>
                <article
                  ref={(node) => { panelRefs.current[index] = node; }}
                  data-panel-index={index}
                  className={`journey-swirl-panel ${visible ? 'is-visible' : ''} ${item.cashPrize ? 'has-prize' : ''}`}
                  style={style}
                >
                  <div className="journey-panel-edge" aria-hidden="true" />
                  <div className="journey-panel-topline">
                    <span className="journey-panel-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="journey-panel-season">{item.season}</span>
                    <span className="journey-panel-team">{item.team}</span>
                  </div>
                  <div className="journey-panel-main">
                    <div className="journey-panel-copy">
                      <h3>{item.competition}</h3>
                      <p className="journey-panel-award">{item.award}</p>
                      {item.details && <p className="journey-panel-details">{item.details}</p>}
                    </div>
                    <div className="journey-panel-aside">
                      {item.cashPrize && (
                        <div className="journey-prize-mark"><Trophy size={14} /><span>{item.cashPrize}</span></div>
                      )}
                      {item.location && (
                        <div className="journey-location-mark"><MapPin size={13} /><span>{item.location}</span></div>
                      )}
                      {item.date && (
                        <div className="journey-date-mark"><CalendarDays size={12} /><span>{item.date}</span></div>
                      )}
                    </div>
                  </div>
                  <div className="journey-panel-bottomline">
                    <span><span className="journey-status-dot" /> RECORDED MILESTONE</span>
                    <span className="journey-panel-link" aria-hidden="true"><ArrowUpRight size={15} /></span>
                  </div>
                </article>
              </div>
            );
          })}

          {filteredMilestones.length === 0 && (
            <div className="journey-empty-state">No milestones are recorded for this filter.</div>
          )}
        </div>

        <div className="journey-endcap">
          <div className="journey-endcap-index">THE RECORD CONTINUES <span>↘</span></div>
          <div
            className="journey-impact-panel"
            onPointerMove={(event) => {
              if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
              const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
              event.currentTarget.style.setProperty('--impact-pointer-x', `${(x * 100).toFixed(1)}%`);
              event.currentTarget.style.setProperty('--impact-pointer-y', `${(y * 100).toFixed(1)}%`);
              event.currentTarget.style.setProperty('--impact-tilt-x', `${((0.5 - y) * 2.2).toFixed(2)}deg`);
              event.currentTarget.style.setProperty('--impact-tilt-y', `${((x - 0.5) * 3).toFixed(2)}deg`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty('--impact-tilt-x', '0deg');
              event.currentTarget.style.setProperty('--impact-tilt-y', '0deg');
              event.currentTarget.style.setProperty('--impact-pointer-x', '50%');
              event.currentTarget.style.setProperty('--impact-pointer-y', '50%');
            }}
          >
            <div className="journey-impact-copy">
              <span className="journey-impact-eyebrow">DOCUMENTED IMPACT &amp; CREDIBILITY</span>
              <h3>Built through competition.<br /><em>Improved through iteration.</em></h3>
              <p>"Since we have started, we’ve taken on and successfully completed 75+ projects, collaborating with students from more than 10 departments across the college. Along the way, we’ve produced 50+ research papers, reports, and certifications that highlight the creativity and dedication of our members."</p>
              <div className="journey-impact-tags">
                <span>Propel Lab-3, BMSCE</span><span>SAE International &amp; Aerothon</span>
              </div>
            </div>
            <div
              className="journey-impact-blueprint"
              onPointerMove={(event) => {
                if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
                const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
                event.currentTarget.style.setProperty('--blueprint-pointer-x', `${(x * 100).toFixed(1)}%`);
                event.currentTarget.style.setProperty('--blueprint-pointer-y', `${(y * 100).toFixed(1)}%`);
                event.currentTarget.style.setProperty('--blueprint-tilt-x', `${((0.5 - y) * 3).toFixed(2)}deg`);
                event.currentTarget.style.setProperty('--blueprint-tilt-y', `${((x - 0.5) * 4).toFixed(2)}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty('--blueprint-tilt-x', '0deg');
                event.currentTarget.style.setProperty('--blueprint-tilt-y', '0deg');
                event.currentTarget.style.setProperty('--blueprint-pointer-x', '50%');
                event.currentTarget.style.setProperty('--blueprint-pointer-y', '50%');
              }}
            >
              <div className="journey-blueprint-grid" aria-hidden="true" />
              <div className="journey-blueprint-interactive-view">
                <SafeImage
                  src="/images/cad-plane.png"
                  alt="AeroBMSCE fixed-wing aircraft airframe plan-view blueprint"
                  fallbackTitle="Competition Airframe Spec"
                  className="journey-blueprint-image"
                  containerClassName="journey-blueprint-image-frame"
                />
                {BLUEPRINT_FEATURES.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    className={`journey-blueprint-hotspot journey-blueprint-hotspot--${feature.id}${activeBlueprintFeature === feature.id ? ' is-selected' : ''}`}
                    style={{ left: feature.left, top: feature.top }}
                    data-label={feature.shortLabel}
                    aria-label={`Inspect ${feature.title}`}
                    aria-pressed={activeBlueprintFeature === feature.id}
                    onClick={() => setActiveBlueprintFeature((current) => current === feature.id ? null : feature.id)}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
              {activeBlueprintFeature && (
                <div className="journey-blueprint-readout" role="status" aria-live="polite">
                  {BLUEPRINT_FEATURES.filter((feature) => feature.id === activeBlueprintFeature).map((feature) => (
                    <React.Fragment key={feature.id}>
                      <span className="journey-blueprint-readout-label">COMPONENT REFERENCE</span>
                      <strong>{feature.title}</strong>
                      <span>{feature.description}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
              <div className="journey-blueprint-label"><span>FIG. 01</span><span>AEROBMSCE AIRFRAME / BLUEPRINT</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
