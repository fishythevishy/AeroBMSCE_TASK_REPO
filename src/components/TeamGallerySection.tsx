import React, { useState, useEffect, useCallback } from 'react';
import { SafeImage } from './SafeImage';
import { Camera, Maximize2, X, Compass, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  division: 'Team Yaksha' | 'Team Blue Impulse' | 'Drone Division' | 'Propel Lab-3' | 'CAD & Engineering Archive';
  caption: string;
  recordSource: string;
  specs?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // Verified Team Photographs (Existing)
  {
    id: 'photo1',
    image: '/images/photo1.jpg',
    title: 'Team Yaksha — SAE International Aero Design West',
    division: 'Team Yaksha',
    caption: 'Official international competition aircraft entry. Ranked 2nd Place Internationally under MATLAB Simulation Awards and Overall #16 Globally in Micro Class Category in Fort Worth, Texas, USA.',
    recordSource: 'SAE International Aero Design West (2026 Season Records)',
    specs: 'Micro Class Airframe · High-Lift Cargo Geometry'
  },
  {
    id: 'photo2',
    image: '/images/photo2.jpg',
    title: 'Team Blue Impulse — SAE Aerothon',
    division: 'Team Blue Impulse',
    caption: 'Aeromodelling and structural airframe development. Awarded 1st Place under Unique Technology Development at ADDC 2026, 2nd Place overall with ₹1,25,000 cash prize (2025), and 1st Place Nationally with ₹1,00,000 (2020).',
    recordSource: 'SAE Aerothon & ADDC Official Records (2020-2026)',
    specs: 'Aeromodelling Division · Propel Lab-3 Lofting'
  },
  {
    id: 'photo3',
    image: '/images/photo3.jpg',
    title: 'Propel Lab-3 Engineering Facility',
    division: 'Propel Lab-3',
    caption: 'The official aerospace, aeromodelling, and unmanned systems innovation laboratory of BMS College of Engineering. Established in 2012, bringing together students across 10+ college academic departments.',
    recordSource: 'AeroBMSCE Official Charter (Est. 2012, Bengaluru)',
    specs: 'Propel Lab-3 · BMS College of Engineering'
  },
  {
    id: 'photo4',
    image: '/images/photo4.jpg',
    title: 'Team Vectors & Flying Phantoms — Drone Racing & Autonomy',
    division: 'Drone Division',
    caption: 'Competitive high-speed FPV racing quadcopters and autonomous drone systems. Won 1st Place at Global Academy of Technology (Nov 2024), 2nd Place at NITK Drone Racing (Oct 2024), and 1st Place Best Innovation at SAE Autonomous Drone Challenge (2025).',
    recordSource: 'NITK Drone Racing & SAE Autonomous Challenge Records',
    specs: 'Custom Carbon-Fiber Racing Airframe · Autonomous Autopilot'
  },
  {
    id: 'photo5',
    image: '/images/photo5.jpg',
    title: 'SAE International Flight Line Operations',
    division: 'Team Yaksha',
    caption: 'Pre-flight technical inspection, center-of-gravity verification, and static engine run-ups on the competition flight line prep table during international flight rounds.',
    recordSource: 'SAE International Aero Design West (Airfield Flight Line Archive)',
    specs: 'Micro Class Airfield Prep · Inspection Stand'
  },
  {
    id: 'photo6',
    image: '/images/photo6.jpg',
    title: 'Field Telemetry & Long-Range Link',
    division: 'Drone Division',
    caption: 'Runway flight telemetry and ground control station operations during fixed-wing UAV range trials and autonomous mission validation.',
    recordSource: 'AeroBMSCE Autonomous Flight Operations Log',
    specs: 'Long-Range RF Telemetry Link · IMU Data Stream'
  },
  {
    id: 'photo7',
    image: '/images/photo7.jpg',
    title: 'Propel Lab-3 Structural Integration',
    division: 'Propel Lab-3',
    caption: 'Final mechanical airframe assembly in Propel Lab-3, integrating carbon-fiber D-tube wing spars, control surface hingelines, and modular payload bays.',
    recordSource: 'Propel Lab-3 Airframe Assembly Archive',
    specs: 'Structural Wingbox Rigging · Control Linkages'
  },
  {
    id: 'photo8',
    image: '/images/photo8.jpg',
    title: 'AeroBMSCE Flagship Flight Platform',
    division: 'Team Blue Impulse',
    caption: 'Representing one of India’s longest-running competitive aerospace and UAV student organizations with 16+ years of flight history, 75+ completed projects, and 20+ national and global podium finishes.',
    recordSource: 'AeroBMSCE Official Credibility Summary',
    specs: 'Multi-Mission Fixed-Wing Airframe · BMSCE Bengaluru'
  },

  // Newly Added Images from Uploaded Project Assets
  {
    id: 'cad-plane',
    image: '/images/cad-plane.png',
    title: 'Fixed-Wing Technical CAD Airframe',
    division: 'CAD & Engineering Archive',
    caption: 'Parametric 3D CAD aircraft airframe model illustrating aerodynamic wing lofting and structural rib alignment from project assets.',
    recordSource: 'Original Project Asset: images/cad-plane.png',
    specs: 'Parametric 3D CAD Airframe'
  },
  {
    id: 'cad-workbench-blueprint',
    image: '/images/cad-workbench-blueprint.png',
    title: 'Airframe Lofting & Fabrication Blueprint',
    division: 'CAD & Engineering Archive',
    caption: 'Precision workbench lofting blueprint with millimeter cutting grid coordinates used for prototype airframe layup.',
    recordSource: 'Original Project Asset: images/cad-workbench-blueprint.png',
    specs: 'Fabrication Grid & Cut Pattern'
  },
  {
    id: 'cad-uav-surveillance',
    image: '/images/cad-uav-surveillance.png',
    title: 'Autonomous Surveillance Airframe CAD',
    division: 'CAD & Engineering Archive',
    caption: 'CAD geometric model for long-endurance autonomous reconnaissance and surveillance UAV with modular sensor payload bay.',
    recordSource: 'Original Project Asset: images/cad-uav-surveillance.png',
    specs: 'Reconnaissance UAV CAD Geometry'
  },
  {
    id: 'cad-flight-controller',
    image: '/images/cad-flight-controller.png',
    title: 'Avionics & Flight Controller Unit Architecture',
    division: 'CAD & Engineering Archive',
    caption: 'Hardware architecture blueprint of the flight computer module, IMU sensor suite, and telemetry interface.',
    recordSource: 'Original Project Asset: images/cad-flight-controller.png',
    specs: 'Flight Controller & IMU System'
  },
  {
    id: 'cad-esc-module',
    image: '/images/cad-esc-module.png',
    title: 'Power Distribution & ESC System',
    division: 'CAD & Engineering Archive',
    caption: 'Electronic speed controller configuration and power bus schematic for brushless multi-rotor propulsion.',
    recordSource: 'Original Project Asset: images/cad-esc-module.png',
    specs: 'ESC & Power Distribution Unit'
  },
  {
    id: 'cad-gps-denied',
    image: '/images/cad-gps-denied.png',
    title: 'GPS-Denied Optical Navigation Rig',
    division: 'CAD & Engineering Archive',
    caption: 'Sensor payload mounting and optical flow camera rig for indoor and GPS-denied autonomous navigation.',
    recordSource: 'Original Project Asset: images/cad-gps-denied.png',
    specs: 'Optical Navigation Sensor Rig'
  },
  {
    id: 'cad-morphing-wing',
    image: '/images/cad-morphing-wing.png',
    title: 'Morphing Wing Rib Profile',
    division: 'CAD & Engineering Archive',
    caption: 'Parametric variable-camber aerodynamic airfoil cross-section and mechanical hingeline rib geometry.',
    recordSource: 'Original Project Asset: images/cad-morphing-wing.png',
    specs: 'Variable Camber Airfoil Rib'
  },
  {
    id: 'cad-micro-fins',
    image: '/images/cad-micro-fins.png',
    title: 'Micro Class High-Lift Winglet Fin',
    division: 'CAD & Engineering Archive',
    caption: 'Aerodynamic winglet fin geometry designed for vortex suppression and induced drag reduction on micro-class airframes.',
    recordSource: 'Original Project Asset: images/cad-micro-fins.png',
    specs: 'High-Lift Winglet Fin CAD'
  },
  {
    id: 'cad-drdo-defense',
    image: '/images/cad-drdo-defense.png',
    title: 'Fixed-Wing Defense Airframe Architecture',
    division: 'CAD & Engineering Archive',
    caption: 'Composite fixed-wing airframe geometry engineered for extended operational range and high payload capacity.',
    recordSource: 'Original Project Asset: images/cad-drdo-defense.png',
    specs: 'Fixed-Wing Composite Airframe'
  },
  {
    id: 'bg-asset',
    image: '/images/bg.jpg',
    title: 'AeroBMSCE Airframe Coordinate Grid',
    division: 'Propel Lab-3',
    caption: 'Official AeroBMSCE dark obsidian coordinate grid and airframe visual backdrop from uploaded project assets.',
    recordSource: 'Original Project Asset: images/bg.jpg',
    specs: 'Dark Obsidian Engineering Grid'
  }
];

export const TeamGallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Team Yaksha',
    'Team Blue Impulse',
    'Drone Division',
    'Propel Lab-3',
    'CAD & Engineering Archive'
  ];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.division === filter);

  const activeIndex = activePhoto
    ? filteredItems.findIndex(item => item.id === activePhoto.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActivePhoto(filteredItems[activeIndex - 1]);
    } else if (activeIndex === 0) {
      setActivePhoto(filteredItems[filteredItems.length - 1]);
    }
  }, [activeIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (activeIndex >= 0 && activeIndex < filteredItems.length - 1) {
      setActivePhoto(filteredItems[activeIndex + 1]);
    } else if (activeIndex === filteredItems.length - 1) {
      setActivePhoto(filteredItems[0]);
    }
  }, [activeIndex, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handlePrev, handleNext]);

  return (
    <section id="gallery" className="aero-gloss-surface py-24 bg-[#030305] border-b border-[#15151F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4" />
              <span>OFFICIAL TEAM &amp; FLIGHT ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
              VERIFIED PHOTOGRAPHS &amp; RECORDS
            </h2>
          </div>
          <div className="text-xs font-mono text-[#8888C8] space-y-1">
            <p className="text-[#F4F2FF] font-semibold">100% OFFICIAL CLUB RECORDS &amp; ASSETS</p>
            <p>Total {GALLERY_ITEMS.length} verified photographs, airframes, and technical drawings</p>
          </div>
        </div>

        {/* Division Filter Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090910] border border-[#29263C] rounded-lg mb-10 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter(i => i.division === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                  filter === cat
                    ? 'bg-[#B9B7FF] text-[#030305] font-bold shadow-sm'
                    : 'text-[#8888C8] hover:text-[#F4F2FF]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  filter === cat ? 'bg-[#030305]/20 text-[#030305]' : 'bg-[#15151F] text-[#8888C8]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="aero-float-card aero-float-card--soft bg-[#090910] border border-[#15151F] hover:border-[#29263C] rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all hover:-translate-y-0.5" data-aero-tilt="soft"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#030305]">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded bg-[#090910]/80 text-[#B9B7FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#090910]/85 border border-[#29263C] text-[9.5px] font-mono text-[#B9B7FF] uppercase">
                    {item.division}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#F4F2FF] font-display group-hover:text-[#B9B7FF] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8888C8] mt-2.5 leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#15151F] mt-3">
                <span className="text-[10px] font-mono text-[#8888C8] block pt-3 truncate">
                  Record: <span className="text-[#D7D7E4]">{item.recordSource}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Expanded View Modal with Carousel Navigation */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-[#090910] border border-[#29263C] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 text-[#8888C8] hover:text-[#F4F2FF] p-2 bg-[#090910]/80 border border-[#29263C] rounded-full transition-colors cursor-pointer"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Nav Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/3 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#090910]/85 border border-[#29263C] text-[#D7D7E4] hover:text-[#B9B7FF] hover:border-[#B9B7FF] transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/3 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#090910]/85 border border-[#29263C] text-[#D7D7E4] hover:text-[#B9B7FF] hover:border-[#B9B7FF] transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Full Image Container */}
              <div className="relative aspect-[16/9] w-full bg-[#030305] border-b border-[#15151F]">
                <SafeImage
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fallbackTitle={activePhoto.title}
                  className="w-full h-full object-contain"
                />
                {/* Index Counter */}
                {activeIndex >= 0 && (
                  <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded bg-[#090910]/80 border border-[#29263C] text-xs font-mono text-[#8888C8]">
                    {activeIndex + 1} / {filteredItems.length}
                  </div>
                )}
              </div>

              {/* Image Details */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{activePhoto.division}</span>
                  {activePhoto.specs && (
                    <>
                      <span>·</span>
                      <span className="text-[#8888C8]">{activePhoto.specs}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F2FF] font-display">
                  {activePhoto.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#D7D7E4] leading-relaxed">
                  {activePhoto.caption}
                </p>

                <div className="pt-4 border-t border-[#15151F] flex items-center justify-between text-xs font-mono text-[#8888C8]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#B9B7FF]" />
                    <span>Citation: <strong>{activePhoto.recordSource}</strong></span>
                  </div>
                  <span className="hidden sm:inline text-[11px] text-[#555577]">
                    Use ← and → arrows to navigate · ESC to close
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
