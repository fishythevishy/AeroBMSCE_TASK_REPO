import React from 'react';
import { Camera, ArrowUpRight } from 'lucide-react';
import { publicAsset } from '../utils/publicAsset';

const TEAM_PHOTOS = [
  {
    image: '/images/team-aerothon-2025.jpg',
    alt: 'AeroBMSCE team group photograph at Aerothon 2025',
    title: 'Aerothon 2025',
    detail: 'A moment from the Aerothon stage',
    aspect: 'aspect-[16/9]',
  },
  {
    image: '/images/team-airframe-build.jpg',
    alt: 'Team members standing with fixed-wing aircraft',
    title: 'Airframes & teamwork',
    detail: 'People and aircraft, side by side',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/images/team-flightline-group.jpg',
    alt: 'Team group photograph outdoors at a flight field',
    title: 'Out in the field',
    detail: 'A group moment at the flight field',
    aspect: 'aspect-[3/2]',
  },
  {
    image: '/images/team-prathyusha-visit.jpg',
    alt: 'Team group photograph outside Prathyusha Engineering College',
    title: 'Campus visit',
    detail: 'A team photograph outside the college',
    aspect: 'aspect-[3/2]',
  },
  {
    image: '/images/team-aerobmsce-gathering.jpg',
    alt: 'A large team group photograph indoors',
    title: 'The wider team',
    detail: 'A gathering of the people behind the work',
    aspect: 'aspect-[4/3]',
  },
  {
    image: '/images/team-uav-project.jpg',
    alt: 'Team members posing with a multirotor UAV prototype',
    title: 'UAV project team',
    detail: 'Working together around an aircraft prototype',
    aspect: 'aspect-[3/2]',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="aero-gloss-surface py-24 border-b border-[#15151F] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-[0.18em] mb-3">
            <Camera className="w-4 h-4" aria-hidden="true" />
            <span>THE PEOPLE BEHIND THE FLIGHT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F2FF] font-display uppercase tracking-tight">
            Meet the team
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#B9B7FF]/80 max-w-2xl leading-relaxed">
            The people, gatherings and aircraft moments that make the work possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TEAM_PHOTOS.map((photo, index) => (
            <article
              key={photo.image}
              className="aero-float-card aero-float-card--soft aero-gloss-panel group overflow-hidden rounded-xl border border-[#29263C]/80 transition duration-300 hover:-translate-y-1 hover:border-[#8888C8]/70" data-aero-tilt="soft"
            >
              <div className={`relative ${photo.aspect} overflow-hidden bg-[#050509]`}>
                <img
                  src={publicAsset(photo.image)}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030305]/55 via-transparent to-white/[0.035]" />
                <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-[#030305]/70 px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#E3E0FF] backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')} / {String(TEAM_PHOTOS.length).padStart(2, '0')}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-[#F4F2FF]">{photo.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#A6A3C3]">{photo.detail}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#8888C8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D0CEFF]" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
