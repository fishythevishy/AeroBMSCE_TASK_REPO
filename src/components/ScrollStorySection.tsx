import React, { useState } from 'react';
import { SafeImage } from './SafeImage';
import { Compass, PenTool, Wrench, Activity, Sparkles, ArrowRight } from 'lucide-react';

const PHASES = [
  {
    step: '01',
    name: 'IMAGINE',
    title: 'Aerodynamic Mission Formulation',
    lead: 'Translating competition rules and payload requirements into geometric boundaries.',
    body: 'Every flight project starts with constraint envelope modeling: maximum takeoff weight (MTOW), density altitude considerations, runway roll limits, and payload volume requirements. We conduct mission-profile simulations to establish target lift-to-drag ratios.',
    specs: ['Airframe Constraint Envelope', 'Mission Profile Simulation', 'Weight & CG Calculation'],
    image: '/images/cad-morphing-wing.png',
    metric: 'AERODYNAMIC PROFILING'
  },
  {
    step: '02',
    name: 'DESIGN',
    title: 'Computational CFD & Structural FEA',
    lead: 'High-fidelity aerodynamic surface lofting and composite stress analysis.',
    body: 'Using SolidWorks and Siemens NX, airframes are modeled down to individual rib lightening holes and spar joiners. Aerodynamic flowfields are solved in Flow5 and ANSYS Fluent to locate separation bubbles and optimize winglet twist.',
    specs: ['Flow5 Wing & Airfoil Solvers', 'ANSYS Structural Stress Verification', 'Spar Shear Web Sizing'],
    image: '/images/cad-plane.png',
    metric: '3D PARAMETRIC ASSEMBLY'
  },
  {
    step: '03',
    name: 'BUILD',
    title: 'Precision Airframe Fabrication',
    lead: 'From physical cardboard proof-of-fit to carbon-fiber composite airframe.',
    body: 'Full-scale cardboard and foam mockups are constructed on the workbench to verify wire routings and servo clearances. Structural components are then fabricated with 3K twill carbon-fiber and aircraft-grade balsa.',
    specs: ['Cardboard Proof-of-Fit Mockups', 'Composite Carbon Spar Layup', 'Precision Wing Rib Jigging'],
    image: '/images/cad-uav-surveillance.png',
    metric: 'STRUCTURAL FABRICATION'
  },
  {
    step: '04',
    name: 'TEST',
    title: 'Avionics Verification & Telemetry',
    lead: 'Rigorous ground taxi trials, telemetry link checks, and maiden flight runs.',
    body: 'Prior to full payload flights, airframes undergo ground taxi tests, propulsion calibration, and avionics sensor health checks. Flight telemetry streams live via custom digital RF links, logging IMU vibration and control surface response.',
    specs: ['Motor Thrust Calibration', '915MHz RF Telemetry Stream', 'Autopilot Control Logging'],
    image: '/images/cad-flight-controller.png',
    metric: 'TELEMETRY VALIDATION'
  },
  {
    step: '05',
    name: 'IMPROVE',
    title: 'Iterative Telemetry Optimization',
    lead: 'Feeding flight logs back into aerodynamic trim and firmware tuning.',
    body: 'Post-flight black-box data reveals real-world roll damping, battery drain rates, and elevator authority. The engineering cycle closes as control loop PIDs are refined and aerodynamic modifications are documented for the next iteration.',
    specs: ['Black-Box Log Extraction', 'In-Flight PID Rate Tuning', 'Design Report Documentation'],
    image: '/images/cad-micro-fins.png',
    metric: 'AERODYNAMIC REFINEMENT'
  }
];

export const ScrollStorySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = PHASES[activeStep];

  return (
    <section className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
            <span>02. ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
            IMAGINE <span className="text-[#8888C8]">→</span> DESIGN <span className="text-[#8888C8]">→</span> BUILD <span className="text-[#8888C8]">→</span> TEST <span className="text-[#8888C8]">→</span> IMPROVE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8888C8] max-w-2xl font-mono">
            Every AeroBMSCE airframe adheres to a disciplined engineering loop where empirical flight test data continuously refines simulation models.
          </p>
        </div>

        {/* Interactive Phase Scrubber / Timeline Bar */}
        <div className="flex items-center justify-between border-b border-[#29263C] pb-4 mb-10 overflow-x-auto gap-4">
          {PHASES.map((phase, idx) => (
            <button
              key={phase.name}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 py-2 px-3 text-left transition-colors shrink-0 cursor-pointer rounded-md ${
                activeStep === idx
                  ? 'bg-[#15151F] text-[#F4F2FF]'
                  : 'text-[#8888C8] hover:text-[#D7D7E4]'
              }`}
            >
              <span
                className={`font-mono text-xs px-2 py-0.5 rounded ${
                  activeStep === idx
                    ? 'bg-[#B9B7FF] text-[#030305] font-bold'
                    : 'bg-[#090910] text-[#8888C8]'
                }`}
              >
                {phase.step}
              </span>
              <span className="font-display font-bold text-sm tracking-wider uppercase">
                {phase.name}
              </span>
            </button>
          ))}
        </div>

        {/* Phase Presentation Card (Split View) */}
        <div className="aero-float-card aero-float-card--subtle aero-gloss-panel bg-[#090910] border border-[#29263C] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12" data-aero-tilt="subtle">
          {/* Left Column: Phase Narrative & Technical Specifications */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
                <span>PHASE {current.step} OF 05</span>
                <span aria-hidden="true">·</span>
                <span>{current.metric}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F2FF] font-display">
                {current.title}
              </h3>

              <p className="mt-2 text-base text-[#B9B7FF] font-medium">
                {current.lead}
              </p>

              <p className="mt-4 text-sm text-[#D7D7E4]/90 leading-relaxed">
                {current.body}
              </p>

              {/* Technical Criteria Checklist */}
              <div className="mt-8 pt-6 border-t border-[#15151F] space-y-2">
                <span className="text-xs font-mono text-[#8888C8] uppercase tracking-wider block mb-2">
                  Engineering Deliverables:
                </span>
                {current.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-xs font-mono text-[#D7D7E4]">
                    <span className="w-1.5 h-1.5 bg-[#B9B7FF] rounded-full" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="mt-10 pt-6 border-t border-[#15151F] flex items-center justify-between">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : PHASES.length - 1))}
                className="text-xs font-mono text-[#8888C8] hover:text-[#F4F2FF] transition-colors"
              >
                ← PREVIOUS PHASE
              </button>

              <button
                onClick={() => setActiveStep((prev) => (prev < PHASES.length - 1 ? prev + 1 : 0))}
                className="text-xs font-mono text-[#B9B7FF] hover:text-white flex items-center gap-1 font-semibold transition-colors"
              >
                <span>NEXT PHASE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Inspection */}
          <div className="lg:col-span-5 bg-[#030305] relative min-h-[320px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#29263C] flex flex-col justify-center">
            <SafeImage
              src={current.image}
              alt={current.title}
              fallbackTitle={current.name}
              className="w-full h-full object-cover max-h-[460px]"
            />
            <div className="p-4 bg-[#090910] border-t border-[#15151F] flex justify-between items-center text-[11px] font-mono">
              <span className="text-[#8888C8]">Propel Lab-3 Engineering Archive</span>
              <span className="text-[#B9B7FF] font-medium">{current.name} STAGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
