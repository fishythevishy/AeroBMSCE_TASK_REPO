export interface Milestone {
  year: string;
  season: string;
  competition: string;
  award: string;
  details?: string;
  cashPrize?: string;
  location?: string;
  date?: string;
  team: 'Team Yaksha' | 'Team Blue Impulse' | 'Team Flying Phantoms' | 'Team Vectors' | 'AeroBMSCE';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Autonomous Systems' | 'Avionics & Electronics' | 'Aerodynamic Mechanisms' | 'Defense & Research';
  description: string;
  image: string;
}

export interface UpcomingComp {
  title: string;
  organizer: string;
  targetYear: string;
  focus: string;
}

export interface PartnerTier {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  benefits: string[];
}

// 100% Verified Credibility Statistics directly from journey.html and index.html
export const CREDIBILITY_STATS = [
  { label: 'Years of Operation', value: '16+' },
  { label: 'Completed Projects', value: '75+' },
  { label: 'Podium Finishes', value: '20+' },
  { label: 'College Departments', value: '10+' },
  { label: 'Research Papers & Reports', value: '50+' },
];

// Documented Sub-Teams from journey.html
export const SUB_TEAMS = [
  {
    name: 'Team Yaksha',
    focus: 'International Competitions',
    description: 'Represents AeroBMSCE at SAE International Aero Design West in the United States.'
  },
  {
    name: 'Team Blue Impulse',
    focus: 'Aeromodelling & Aerothon',
    description: 'Competes nationally in SAE Aerothon and inter-collegiate technical design events.'
  },
  {
    name: 'Team Flying Phantoms',
    focus: 'Drone Development & Autonomy',
    description: 'Specializes in autonomous drone challenges and VTOL navigation.'
  },
  {
    name: 'Team Vectors',
    focus: 'Drone Racing',
    description: 'High-speed competitive FPV drone racing representing BMSCE across India.'
  }
];

// 100% Exact Milestones from journey.html
export const MILESTONES: Milestone[] = [
  {
    year: '2026',
    season: '2026 SEASON',
    competition: 'SAE International Aero Design West',
    award: '2nd Place Internationally under MATLAB Simulation Awards',
    details: 'Overall #16 Globally in Micro Class Category',
    location: 'Fort Worth, Texas, USA',
    team: 'Team Yaksha'
  },
  {
    year: '2026',
    season: '2026 SEASON',
    competition: 'SAE Aerothon',
    award: '1st Place under Unique Technology development at ADDC 2026',
    team: 'Team Blue Impulse'
  },
  {
    year: '2025',
    season: '2025 SEASON',
    competition: 'SAE Aerothon',
    award: '2nd place overall',
    cashPrize: '₹1,25,000 cash prize',
    date: 'Nov 2025',
    team: 'Team Blue Impulse'
  },
  {
    year: '2025',
    season: '2025 SEASON',
    competition: 'SAE-Drone Design Challenge',
    award: '1st place — Best Technical Presentation',
    cashPrize: '₹10,000 cash prize',
    date: 'May 2025',
    team: 'Team Flying Phantoms'
  },
  {
    year: '2025',
    season: '2025 SEASON',
    competition: 'SAE Autonomous Drone Design Challenge',
    award: '1st place — Best Innovation',
    cashPrize: '₹5,000 cash prize',
    date: 'April 2025',
    team: 'Team Flying Phantoms'
  },
  {
    year: '2024',
    season: '2024 SEASON',
    competition: 'NITK Drone Racing Competition',
    award: '2nd place',
    date: 'Oct 18-20, 2024',
    team: 'Team Vectors'
  },
  {
    year: '2024',
    season: '2024 SEASON',
    competition: 'Global Academy of Technology (Drone Racing)',
    award: '1st place',
    date: 'Nov 2024',
    team: 'Team Vectors'
  },
  {
    year: '2024',
    season: '2024 SEASON',
    competition: 'SAE International Aero Design West',
    award: '12th place globally',
    date: 'Aug 2024',
    team: 'Team Yaksha'
  },
  {
    year: '2022',
    season: '2022 SEASON',
    competition: 'SAE Aerothon',
    award: '3rd place',
    cashPrize: '₹50,000 cash prize',
    team: 'Team Blue Impulse'
  },
  {
    year: '2022',
    season: '2022 SEASON',
    competition: 'III South India Exhibition',
    award: '2nd place',
    cashPrize: '₹15,000 cash prize',
    location: 'Kalpataru Institute of Technology, Tiptur, Karnataka',
    team: 'Team Blue Impulse'
  },
  {
    year: '2022',
    season: '2022 SEASON',
    competition: 'AI-VTOL (Techfest, IIT Bombay)',
    award: '4th place nationally',
    team: 'Team Flying Phantoms'
  },
  {
    year: '2022',
    season: '2022 SEASON',
    competition: 'SAE International Aero Design West',
    award: '9th Place (Design report), 11th Place (Technical Presentation) Globally',
    team: 'Team Yaksha'
  },
  {
    year: '2020',
    season: '2020 SEASON',
    competition: 'SAE-India',
    award: '1st place overall',
    cashPrize: '₹1,00,000 cash prize',
    details: 'Team Blue Impulse won Nationally',
    team: 'Team Blue Impulse'
  },
  {
    year: '2020',
    season: '2020 SEASON',
    competition: 'SAE Aero Design West',
    award: '8th place in design standings globally',
    team: 'Team Yaksha'
  },
  {
    year: '2018',
    season: '2018 SEASON',
    competition: 'SAE INDIA',
    award: '3rd place overall, 2nd place in Design Report',
    location: 'Anna University, Chennai',
    team: 'Team Blue Impulse'
  }
];

// Documented Upcoming Competitions from partners.html
export const UPCOMING_COMPETITIONS: UpcomingComp[] = [
  {
    title: 'NACDEC 2026',
    organizer: 'Organized by the Aeronautical Society of India',
    targetYear: '2026',
    focus: 'National Aerospace Concept Design & Engineering'
  },
  {
    title: 'ISRO IROC',
    organizer: 'International Rover Challenge – ISRO Track',
    targetYear: '2026',
    focus: 'Rover & Aerial Integration Challenge'
  },
  {
    title: 'NITK Drone Racing Competition 2026',
    organizer: 'NIT Karnataka, Surathkal',
    targetYear: '2026',
    focus: 'University Level Drone Racing'
  },
  {
    title: 'SAE International Aero Design West 2027',
    organizer: 'SAE International',
    targetYear: '2027',
    focus: 'International Heavy-Lift Aircraft Competition'
  },
  {
    title: 'SAE Aerothon 2027',
    organizer: 'SAE India',
    targetYear: '2027',
    focus: 'Aerospace & UAV Design Challenge'
  }
];

// Documented R&D Initiatives from partners.html mapped to authentic CAD visuals
export const RESEARCH_PROJECTS: ProjectItem[] = [
  {
    id: 'surveillance-uav',
    title: 'Surveillance Aircraft Development',
    category: 'Autonomous Systems',
    description: 'Re-configurable Multi-Mission Fixed-Wing UAV with Convertible Propulsion and Integrated Modular Payload Bay.',
    image: '/images/cad-uav-surveillance.png'
  },
  {
    id: 'flight-controller',
    title: 'Indigenous Flight Controller Development',
    category: 'Avionics & Electronics',
    description: 'End-to-end hardware and firmware design.',
    image: '/images/cad-flight-controller.png'
  },
  {
    id: 'esc-development',
    title: 'Electronic Speed Controller (ESC) Development',
    category: 'Avionics & Electronics',
    description: 'High-efficiency propulsion electronics.',
    image: '/images/cad-esc-module.png'
  },
  {
    id: 'gps-denied-nav',
    title: 'GPS-Denied Navigation Systems',
    category: 'Autonomous Systems',
    description: 'Vision- and sensor-based autonomous navigation.',
    image: '/images/cad-gps-denied.png'
  },
  {
    id: 'morphing-wingtip',
    title: 'Morphing Wingtip Mechanisms',
    category: 'Aerodynamic Mechanisms',
    description: 'Adaptive aerodynamics for performance optimization.',
    image: '/images/cad-morphing-wing.png'
  },
  {
    id: 'deployable-micro-fins',
    title: 'Directional Stability Enhancement Using Deployable Micro-Fins',
    category: 'Aerodynamic Mechanisms',
    description: 'Active stability control for UAV platforms.',
    image: '/images/cad-micro-fins.png'
  },
  {
    id: 'drdo-collab',
    title: 'Confidential Defense Project',
    category: 'Defense & Research',
    description: 'In collaboration with DRDO (details restricted).',
    image: '/images/cad-drdo-defense.png'
  }
];

// Documented Collaboration Ecosystem from partners.html
export const ECOSYSTEM_LOGOS = {
  cad_cfd: [
    { name: 'SolidWorks', category: 'Design & Simulation Software', src: '/images/solidworks.png', logoWell: 'light' },
    { name: 'Ansys', category: 'Engineering Simulation Software', src: '/images/ansys.png', logoWell: 'dark' },
    { name: 'Altair', category: 'Engineering Software', src: '/images/altair.png', logoWell: 'light' },
    { name: 'Siemens', category: 'Engineering Software', src: '/images/siemens.png', logoWell: 'light' },
    { name: 'Flow5', category: 'Wing & Airfoil Analysis', src: '/images/flow5.png', logoWell: 'dark' },
    { name: 'SimScale', category: 'Simulation Platform', src: '/images/simscale.png', logoWell: 'light' }
  ],
  hardware: [
    { name: 'DRKStore', category: 'UAV Hardware & Component Resources', src: '/images/drkstore.png', logoWell: 'dark' },
    { name: 'UAV Marketplace', category: 'UAV Hardware & Component Resources', src: '/images/uav-marketplace.png', logoWell: 'dark' }
  ],
  academic_research: [
    { name: 'DRDO', category: 'Aerospace & Defence Research', src: '/images/drdo.png', logoWell: 'dark' },
    { name: 'CSIR-NAL', category: 'Aerospace Research', src: '/images/csir-nal.png', logoWell: 'light' }
  ]
};

// Documented Collaboration Tiers from partners.html
export const PARTNERSHIP_TIERS: PartnerTier[] = [
  {
    id: 'platinum',
    name: 'PLATINUM PARTNER',
    subtitle: 'Title Partner | Strategic Alignment',
    icon: '/images/icon-platinum.png',
    color: '#B9B7FF',
    benefits: [
      'Primary logo on aircraft & UAV models',
      'Logo placement and verbal acknowledgement in official videos and key events',
      'Priority placement on flags, banners & standees',
      'Featured in reports, submissions & press releases',
      'Direct engagement with core team & leads',
      'Association with flagship projects & major events'
    ]
  },
  {
    id: 'gold',
    name: 'GOLD PARTNER',
    subtitle: 'High Visibility | Competition Presence',
    icon: '/images/icon-gold.png',
    color: '#E5A93C',
    benefits: [
      'Secondary logo on selected aircraft models',
      'Logo on team uniforms & presentations',
      'Shared branding on competition banners & standees',
      'Recognition across events & social media',
      'Branding during workshops & technical events',
      'Presence at national & international competitions'
    ]
  },
  {
    id: 'silver',
    name: 'SILVER PARTNER',
    subtitle: 'Event & Media Visibility',
    icon: '/images/icon-silver.png',
    color: '#D7D7E4',
    benefits: [
      'Logo on team uniforms',
      'Logo on presentations & project materials',
      'Inclusion on team banners & shared standees',
      'Recognition in event communications',
      'Social media mentions during competitions',
      'Visibility at select AeroBMSCE events'
    ]
  },
  {
    id: 'technical',
    name: 'TECHNICAL & ECOSYSTEM PARTNER',
    subtitle: 'Design | Simulation | Analysis Partner',
    icon: '/images/icon-technical.png',
    color: '#8888C8',
    benefits: [
      'Tools show cased in design & competition reports',
      'Credit in technical presentations & submissions',
      'Co-branded hands-on workshops',
      'Logo on reports, posters & certificates',
      'Technical banners & workshop standees',
      'Early access to high-performing students'
    ]
  }
];

export const WORKBENCH_STAGES = [
  {
    step: '01',
    title: 'Aerodynamic Lofting & Templates',
    sub: 'Translating aerofoil coordinates to cutting profiles',
    description: 'Precision NACA 2412 and custom camber profiles plotted to establish spar clearance, chord thickness, and control surface hingelines before composite layup.',
    material: 'Heavy card stock and drafting sheet',
    tooling: 'Drafting instruments, steel straightedge, precision vernier',
    engineeringTakeaway: 'Physical lofting reveals chord-thickness anomalies and control surface clearance before fabrication.'
  },
  {
    step: '02',
    title: 'Rib Profiling & Spar Notching',
    sub: 'Precision hand-cutting of wing ribs and bulkheads',
    description: 'Individual rib blanks cut with vertical flute orientation for maximum compressive strength under high-G positive wing loading.',
    material: 'Double-wall fluted corrugated board',
    tooling: 'Scalpel blade, cutting mat, alignment square',
    engineeringTakeaway: 'Vertical corrugation flute orientation maximizes compressive buckling resistance under G-loads.'
  },
  {
    step: '03',
    title: 'Fuselage Former & Bulkhead Jigging',
    sub: 'Interlocking structural rings on a true centerline',
    description: 'Centerline alignment jigging preventing airframe twist and ensuring exact motor thrust-line alignment.',
    material: 'Fluted cardboard bulkheads and balsa stringers',
    tooling: 'Centerline assembly jig, digital angle gauge',
    engineeringTakeaway: 'Centerline jigging guarantees thrust line accuracy and zero unintended yaw coupling.'
  },
  {
    step: '04',
    title: 'Skin Sheeting & Torsion D-Box',
    sub: 'Wrapping the wing envelope into a rigid torsion tube',
    description: 'Closed leading-edge D-tube skin preventing aeroelastic torsional flutter at high airspeeds.',
    material: 'Tough card outer skin and bonding points',
    tooling: 'Curvature mandrel, clamping strips',
    engineeringTakeaway: 'Closed leading-edge D-tube carries wing torsion, preventing aeroelastic twist.'
  },
  {
    step: '05',
    title: 'Hingeline Geometry & Deflection Checks',
    sub: 'Beveling ailerons and establishing throw angles',
    description: 'Control surface separation with double-beveled 45-degree hingelines for smooth, unbinding deflection.',
    material: 'Reinforced hinge tape and control horns',
    tooling: 'Miter sanding block, deflection protractor',
    engineeringTakeaway: 'Zero hingeline slop prevents high-speed flutter and provides crisp control response.'
  }
];
