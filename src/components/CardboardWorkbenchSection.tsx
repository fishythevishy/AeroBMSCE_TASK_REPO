import React, { useState } from 'react';
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
    detail: 'Notched at 25% chord (aerodynamic center) to seat full-length continuous carbon-fiber tube spar.'
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
    detail: 'Reinforced ply doublers distributing stabilizer pitch loads directly into the main fuselage frames.'
  },
  {
    id: 'nose',
    x: 74,
    y: 56,
    title: 'Motor Firewall & Thrust Line',
    tag: 'PROPULSION CRADLE',
    detail: 'Cardboard mock firewall verifying the intended motor mount and thrust-line geometry.'
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

export const CardboardWorkbenchSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<WorkbenchHotspot>(WORKBENCH_HOTSPOTS[0]);

  const currentStage = WORKBENCH_STAGES[activeStepIndex];
  const handleStepChange = (index: number) => {
    setActiveStepIndex(index);
    const hotspotByStage = ['lofting', 'ribs', 'bulkheads', 'dbox', 'hingeline'];
    const nextHotspot = WORKBENCH_HOTSPOTS.find((spot) => spot.id === hotspotByStage[index]);
    if (nextHotspot) setSelectedHotspot(nextHotspot);
  };

  return (
    <section id="workbench" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <span>03. FABRICATION WORKBENCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              FROM CARDBOARD MOCKUP <br />
              <span className="text-[#8888C8]">TO CARBON COMPOSITE AIRFRAME</span>
            </h2>
          </div>
          <p className="text-sm text-[#8888C8] max-w-md font-mono">
            Every competition airframe is proven first on the workbench with precision cardboard mockups to validate kinematics, wire channels, and center of gravity.
          </p>
        </div>

        {/* 3-Column Interactive Workbench Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Build Sequence Navigator */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-xs font-mono text-[#8888C8] uppercase tracking-wider block mb-3">
              Build Sequence Stages:
            </span>

            {WORKBENCH_STAGES.map((stage, idx) => (
              <button
                key={stage.step}
                data-aero-tilt="soft"
                aria-pressed={activeStepIndex === idx}
                onClick={() => handleStepChange(idx)}
                className={`aero-float-card aero-float-card--soft w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-[#090910] border-[#B9B7FF] text-[#F4F2FF]'
                    : 'bg-[#030305] border-[#15151F] text-[#8888C8] hover:border-[#29263C] hover:text-[#D7D7E4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#B9B7FF] font-semibold">
                    STEP {stage.step}
                  </span>
                  {activeStepIndex === idx && (
                    <span className="text-[10px] font-mono uppercase bg-[#15151F] text-[#B9B7FF] px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold mt-1 text-[#F4F2FF] font-display">
                  {stage.title}
                </h4>
                <p className="text-xs text-[#8888C8] mt-0.5 line-clamp-1">
                  {stage.sub}
                </p>
              </button>
            ))}
          </div>

          {/* Center Column: stage-aware procedural 3D workbench with 2D blueprint fallback */}
          <div className="lg:col-span-6 min-w-0">
            <Workbench3DViewport
              activeStepIndex={activeStepIndex}
              selectedHotspot={selectedHotspot}
              hotspots={WORKBENCH_HOTSPOTS}
              onSelectHotspot={setSelectedHotspot}
            />

            {/* Selected component callout stays linked to both 2D and 3D hotspots */}
            <div className="aero-float-card aero-float-card--subtle mt-4 rounded-lg border border-[#39284F] bg-[#0B0812]/95 p-4" data-aero-tilt="subtle">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C3ACFF]">
                  {selectedHotspot.tag}
                </span>
                <span className="text-[10px] font-mono text-[#8F7CAD]">INSPECTED COMPONENT</span>
              </div>
              <h4 className="font-display text-base font-bold text-[#F4F2FF]">
                {selectedHotspot.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-[#D7D0E4]">
                {selectedHotspot.detail}
              </p>
            </div>
          </div>

          {/* Right Column: Stage Engineering Details & Materials */}
          <div className="aero-float-card aero-float-card--subtle lg:col-span-3 space-y-6 bg-[#090910] border border-[#15151F] p-6 rounded-xl" data-aero-tilt="subtle">
            <div>
              <span className="text-xs font-mono text-[#B9B7FF] uppercase tracking-wider block mb-1">
                STAGE {currentStage.step} ANALYSIS
              </span>
              <h3 className="text-lg font-bold text-[#F4F2FF] font-display">
                {currentStage.title}
              </h3>
              <p className="text-xs text-[#D7D7E4]/90 mt-2 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#15151F] text-xs font-mono">
              <div>
                <span className="text-[#8888C8] block text-[11px] uppercase">Material Specification:</span>
                <span className="text-[#F4F2FF] mt-0.5 block font-medium">{currentStage.material}</span>
              </div>

              <div>
                <span className="text-[#8888C8] block text-[11px] uppercase">Workshop Tooling:</span>
                <span className="text-[#F4F2FF] mt-0.5 block font-medium">{currentStage.tooling}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#15151F]">
              <span className="text-[11px] font-mono text-[#B9B7FF] uppercase tracking-wider block mb-1">
                ENGINEERING TAKEAWAY
              </span>
              <p className="text-xs text-[#8888C8] leading-relaxed">
                {currentStage.engineeringTakeaway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
