import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Layers3 } from 'lucide-react';
import { WORKBENCH_STAGES } from '../data/aerobmsceData';
import { Workbench3DViewport, type WorkbenchHotspot } from './Workbench3DViewport';

const WORKBENCH_HOTSPOTS: WorkbenchHotspot[] = [
  {
    id: 'lofting',
    x: 41,
    y: 43,
    title: 'Lofted Airfoil Stations',
    tag: 'AIRFOIL LOFT / PROFILE GRID',
    detail: 'A procedural illustration of cross-span profile stations and chord guide curves used to visualize the aerodynamic lofting stage.'
  },
  {
    id: 'ribs',
    x: 48,
    y: 44,
    title: 'Cambered Wing Ribs',
    tag: 'NACA 2412 PROFILE',
    detail: 'Precision hand-cut corrugated card ribs with lightening holes and carbon spar pass-through indexing slots.'
  },
  {
    id: 'bulkheads',
    x: 64,
    y: 52,
    title: 'Fuselage Bulkheads & Stringers',
    tag: 'STRUCTURAL MONOCOQUE',
    detail: 'Interlocking transverse bulkheads mounted on aluminum jig pins to ensure true centerline alignment and zero fuselage twist.'
  },
  {
    id: 'spar',
    x: 35,
    y: 58,
    title: 'Main Shear Web & Spar Slot',
    tag: 'PRIMARY BENDING MEMBER',
    detail: 'Notched at 25% chord to seat the longitudinal spar in this illustrative assembly model.'
  },
  {
    id: 'dbox',
    x: 55,
    y: 48,
    title: 'Leading-edge D-box Skin',
    tag: 'TORSIONAL SKIN / D-BOX',
    detail: 'A translucent illustrative leading-edge skin shows how the outer shell sits over the forward wing ribs and spar region.'
  },
  {
    id: 'empennage',
    x: 32,
    y: 35,
    title: 'Tail Boom Hardpoints',
    tag: 'EMPENNAGE MOUNT',
    detail: 'A conceptual view of the tail and its connection to the fuselage structure.'
  },
  {
    id: 'nose',
    x: 74,
    y: 56,
    title: 'Motor Firewall & Thrust Line',
    tag: 'PROPULSION CRADLE',
    detail: 'An illustrative firewall area for inspecting the relationship between the motor mount and fuselage centerline.'
  },
  {
    id: 'hingeline',
    x: 57,
    y: 57,
    title: 'Aileron Hingeline',
    tag: 'CONTROL SURFACE GEOMETRY',
    detail: 'The hinge line separates the aileron from the wing. The 3D viewport provides an illustrative deflection control for inspecting the movement.'
  }
];

const STICKY_TOP = 64;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const CardboardWorkbenchSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<WorkbenchHotspot>(WORKBENCH_HOTSPOTS[0]);
  const runwayRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStepIndex;

  const currentStage = WORKBENCH_STAGES[activeStepIndex] ?? WORKBENCH_STAGES[0];

  const handleStepChange = useCallback((index: number) => {
    const nextIndex = clamp(index, 0, WORKBENCH_STAGES.length - 1);
    setActiveStepIndex(nextIndex);
    const hotspotByStage = ['lofting', 'ribs', 'bulkheads', 'dbox', 'hingeline'];
    const nextHotspot = WORKBENCH_HOTSPOTS.find((spot) => spot.id === hotspotByStage[nextIndex]);
    if (nextHotspot) setSelectedHotspot(nextHotspot);
  }, []);

  const jumpToStage = useCallback((index: number) => {
    const runway = runwayRef.current;
    const pinningEnabled = window.matchMedia('(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)').matches;
    if (!runway || !pinningEnabled) {
      handleStepChange(index);
      return;
    }

    const rect = runway.getBoundingClientRect();
    const documentTop = window.scrollY + rect.top;
    const stickyHeight = window.innerHeight - STICKY_TOP;
    const scrollDistance = Math.max(0, runway.offsetHeight - stickyHeight);
    // Each stage starts at its own scroll marker; the final stage has room to breathe at the end.
    const stageProgress = index / WORKBENCH_STAGES.length;
    const target = documentTop - STICKY_TOP + scrollDistance * stageProgress;
    window.scrollTo({ top: target, behavior: 'smooth' });
    handleStepChange(index);
  }, [handleStepChange]);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;
    const media = window.matchMedia('(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)');
    if (!media.matches) return;

    let frame = 0;
    const updateFromScroll = () => {
      const rect = runway.getBoundingClientRect();
      const documentTop = window.scrollY + rect.top;
      const stickyHeight = window.innerHeight - STICKY_TOP;
      const scrollDistance = Math.max(1, runway.offsetHeight - stickyHeight);
      const start = documentTop - STICKY_TOP;
      const progress = clamp((window.scrollY - start) / scrollDistance, 0, 0.9999);
      const nextIndex = Math.min(WORKBENCH_STAGES.length - 1, Math.floor(progress * WORKBENCH_STAGES.length));
      if (nextIndex !== activeStepRef.current) handleStepChange(nextIndex);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateFromScroll();
      });
    };

    updateFromScroll();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [handleStepChange]);

  const previousStage = () => jumpToStage(activeStepIndex - 1);
  const nextStage = () => jumpToStage(activeStepIndex + 1);

  return (
    <section id="workbench" className="workbench-immersive-section" aria-labelledby="workbench-title">
      <header className="workbench-intro-shell">
        <div className="workbench-intro-topline">
          <span><i /> 03 / FABRICATION WORKBENCH</span>
          <span>INTERACTIVE ENGINEERING STUDY</span>
        </div>
        <div className="workbench-intro-layout">
          <h2 id="workbench-title">FROM CARDBOARD<br /><em>TO CARBON COMPOSITE AIRFRAME.</em></h2>
          <p>Explore the existing build-sequence visualisation—from aerodynamic lofting and structural members to skinning and control-surface checks. The model is illustrative, not an exact CAD representation.</p>
        </div>
        <div className="workbench-intro-bottom"><span>FIVE STAGES / ONE CONTINUOUS STUDY</span><span><ArrowDown size={13} /> SCROLL TO MOVE THROUGH THE BUILD</span></div>
      </header>

      <div className="workbench-scroll-runway" ref={runwayRef}>
        <div className="workbench-scroll-frame">
          <div className="workbench-frame-topline">
            <span className="workbench-live-indicator"><i /> WORKBENCH SESSION</span>
            <span className="workbench-frame-note">SCROLL-DRIVEN ASSEMBLY <b>·</b> DIRECT INSPECTION ENABLED</span>
          </div>

          <div className="workbench-experience-grid">
            <nav className="workbench-stage-rail" aria-label="Fabrication stages">
              <div className="workbench-stage-rail__heading"><span>BUILD SEQUENCE</span><span>05</span></div>
              <div className="workbench-stage-rail__items">
                {WORKBENCH_STAGES.map((stage, index) => (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => jumpToStage(index)}
                    aria-current={activeStepIndex === index ? 'step' : undefined}
                    className={`workbench-stage-link ${activeStepIndex === index ? 'is-active' : ''}`}
                  >
                    <span className="workbench-stage-link__number">{stage.step}</span>
                    <span className="workbench-stage-link__copy"><strong>{stage.title}</strong><small>{stage.sub}</small></span>
                    <span className="workbench-stage-link__mark" aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="workbench-stage-rail__foot"><Layers3 size={14} /><span>STRUCTURE / PROFILE / CONTROL</span></div>
            </nav>

            <div className="workbench-model-column">
              <div className="workbench-model-heading">
                <div><span>STAGE {String(activeStepIndex + 1).padStart(2, '0')} / 05</span><h3>{currentStage.title}</h3></div>
                <span className="workbench-model-heading__status"><i /> 3D STUDY</span>
              </div>
              <Workbench3DViewport
                activeStepIndex={activeStepIndex}
                selectedHotspot={selectedHotspot}
                hotspots={WORKBENCH_HOTSPOTS}
                onSelectHotspot={setSelectedHotspot}
              />
            </div>

            <aside className="workbench-stage-analysis" aria-live="polite" aria-atomic="true">
              <div className="workbench-stage-analysis__top"><span>STAGE ANALYSIS</span><span>0{activeStepIndex + 1}</span></div>
              <div className="workbench-stage-analysis__main">
                <span className="workbench-stage-analysis__eyebrow">CURRENT OPERATION</span>
                <h4>{currentStage.title}</h4>
                <p>{currentStage.description}</p>
              </div>
              <div className="workbench-stage-analysis__spec">
                <div><span>MATERIAL SPECIFICATION</span><p>{currentStage.material}</p></div>
                <div><span>WORKSHOP TOOLING</span><p>{currentStage.tooling}</p></div>
              </div>
              <div className="workbench-stage-analysis__takeaway"><span>ENGINEERING TAKEAWAY</span><p>{currentStage.engineeringTakeaway}</p></div>
              <div className="workbench-stage-analysis__component"><span>SELECTED COMPONENT</span><strong>{selectedHotspot.title}</strong><p>{selectedHotspot.detail}</p></div>
            </aside>
          </div>

          <div className="workbench-frame-footer">
            <div className="workbench-frame-footer__step"><span>PROGRESS</span><strong>0{activeStepIndex + 1}<i> / 05</i></strong></div>
            <div className="workbench-progress-track" aria-hidden="true"><span style={{ width: `${((activeStepIndex + 1) / WORKBENCH_STAGES.length) * 100}%` }} /></div>
            <div className="workbench-frame-footer__controls">
              <button type="button" onClick={previousStage} disabled={activeStepIndex === 0} aria-label="Previous fabrication stage"><ArrowLeft size={15} /></button>
              <button type="button" onClick={nextStage} disabled={activeStepIndex === WORKBENCH_STAGES.length - 1} aria-label="Next fabrication stage"><ArrowRight size={15} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
