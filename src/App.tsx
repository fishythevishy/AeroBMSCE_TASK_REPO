import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ScrollStorySection } from './components/ScrollStorySection';
import { CardboardWorkbenchSection } from './components/CardboardWorkbenchSection';
import { JourneyMilestonesSection } from './components/JourneyMilestonesSection';
import { TeamSection } from './components/TeamSection';
import { TeamGallerySection } from './components/TeamGallerySection';
import { ProjectsResearchSection } from './components/ProjectsResearchSection';
import { CapabilitiesEcosystemSection } from './components/CapabilitiesEcosystemSection';
import { PartnershipTiersSection } from './components/PartnershipTiersSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Pointer-driven 3D card tilt is delegated by class so the Three.js aircraft
  // canvas and its own pointer/camera controls remain completely separate.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let activeCard: HTMLElement | null = null;
    const resetCard = (card: HTMLElement | null) => {
      if (!card) return;
      card.style.removeProperty('--aero-tilt-x');
      card.style.removeProperty('--aero-tilt-y');
      card.style.removeProperty('--aero-shine-x');
      card.style.removeProperty('--aero-shine-y');
      card.removeAttribute('data-aero-pointer');
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const target = event.target instanceof Element ? event.target : null;
      const nextCard = target?.closest<HTMLElement>('.aero-float-card') ?? null;
      if (nextCard !== activeCard) {
        resetCard(activeCard);
        activeCard = nextCard;
      }
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const tilt = activeCard.dataset.aeroTilt === 'subtle' ? 1.7 : activeCard.dataset.aeroTilt === 'soft' ? 2.8 : 5.2;
      const tiltX = (0.5 - y) * tilt * 2;
      const tiltY = (x - 0.5) * tilt * 2;
      activeCard.style.setProperty('--aero-tilt-x', `${tiltX.toFixed(2)}deg`);
      activeCard.style.setProperty('--aero-tilt-y', `${tiltY.toFixed(2)}deg`);
      activeCard.style.setProperty('--aero-shine-x', `${(x * 100).toFixed(1)}%`);
      activeCard.style.setProperty('--aero-shine-y', `${(y * 100).toFixed(1)}%`);
      activeCard.setAttribute('data-aero-pointer', 'true');
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && !event.relatedTarget) {
        resetCard(activeCard);
        activeCard = null;
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
      resetCard(activeCard);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030305] text-[#F4F2FF] selection:bg-[#B9B7FF]/20 selection:text-[#B9B7FF] flex flex-col font-sans">
      {/* Discreet Original Notice from Source HTML */}
      <div className="bg-[#090910] border-b border-[#15151F] text-[#8888C8] text-[11px] font-mono py-1.5 px-6 text-center tracking-wide">
        Practice website for the AeroBMSCE web development recruitment task. BMS College of Engineering · Propel Lab-3.
      </div>

      {/* Primary Sticky Navbar */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Real Interactive Three.js Aircraft & 3D Flight Path */}
        <HeroSection />

        {/* 2. Scroll-driven S-curve story panels; content is drawn from existing project data */}
        <ScrollStorySection />

        {/* 3. Organizational Foundation & The 4 Specialized Squads */}
        <AboutSection />

        {/* 4. Interactive Cardboard Aircraft Workbench */}
        <CardboardWorkbenchSection />

        {/* 5. Journey & Milestones (Source Records & Verification) */}
        <JourneyMilestonesSection />

        {/* 6. New Team Photographs — kept separate from the technical archive */}
        <TeamSection />

        {/* 7. Existing Technical / Flight Archive — preserve its filters and viewer */}
        <TeamGallerySection />

        {/* 8. Projects & Research Initiatives */}
        <ProjectsResearchSection />

        {/* 7. Engineering Capabilities & Ecosystem Tooling */}
        <CapabilitiesEcosystemSection />

        {/* 8. Partnership Framework & Collaboration Tiers */}
        <PartnershipTiersSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Structured Cinematic Closing & Footer */}
      <FooterSection onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Contact & Partnership Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
