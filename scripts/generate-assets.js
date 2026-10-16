import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const svgAssets = {
  // Official Branding
  'header-logo': {
    width: 420,
    height: 120,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 120" width="420" height="120" fill="none">
      <g transform="translate(15, 18)">
        <polygon points="45,4 85,76 45,58 5,76" fill="#B9B7FF" />
        <polygon points="45,16 75,70 45,54 15,70" fill="#090910" />
        <polygon points="45,24 64,64 45,52 26,64" fill="#8888C8" />
        <line x1="45" y1="4" x2="45" y2="70" stroke="#F4F2FF" stroke-width="2" />
        <circle cx="45" cy="53" r="3.5" fill="#B9B7FF" />

        <text x="105" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#F4F2FF">AERO<tspan fill="#B9B7FF">BMSCE</tspan></text>
        <text x="106" y="66" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="9.5" letter-spacing="3" fill="#8888C8" font-weight="600">PROPEL LAB-3 · BENGALURU · EST. 2012</text>
        <text x="106" y="82" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="9" letter-spacing="1.5" fill="#B9B7FF" opacity="0.85">• ABOVE GRAVITY • BEYOND LIMITS •</text>
      </g>
    </svg>`
  },

  'logo': {
    width: 200,
    height: 200,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
      <rect width="200" height="200" rx="24" fill="#090910" />
      <g transform="translate(55, 30)">
        <polygon points="45,8 85,110 45,85 5,110" fill="#B9B7FF" />
        <polygon points="45,26 72,100 45,78 18,100" fill="#090910" />
        <polygon points="45,36 60,90 45,74 30,90" fill="#8888C8" />
        <circle cx="45" cy="74" r="4" fill="#F4F2FF" />
      </g>
      <text x="100" y="165" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="19" letter-spacing="3" fill="#F4F2FF">AERO<tspan fill="#B9B7FF">BMSCE</tspan></text>
      <text x="100" y="182" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="7.5" letter-spacing="2" fill="#8888C8">PROPEL LAB-3</text>
    </svg>`
  },

  'cad-workbench-blueprint': {
    width: 640,
    height: 480,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480" fill="none">
      <rect width="640" height="480" fill="#090910" />
      <!-- Cutting Mat Grid Lines -->
      <g stroke="#15151F" stroke-width="1">
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1c1c2b" stroke-width="0.8"/>
        </pattern>
        <rect width="640" height="480" fill="url(#grid)" />
      </g>

      <!-- Centerline & Coordinate Guides -->
      <line x1="320" y1="20" x2="320" y2="460" stroke="#8888C8" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.6" />
      <line x1="40" y1="240" x2="600" y2="240" stroke="#8888C8" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.6" />

      <!-- Airframe Assembly Blueprint (Cardboard Prototype Skeleton) -->
      <!-- Fuselage Backbone -->
      <g stroke="#B9B7FF" stroke-width="2" fill="#15151F" fill-opacity="0.8">
        <!-- Fuselage Outline -->
        <path d="M320 60 L360 120 L360 340 L345 400 L320 415 L295 400 L280 340 L280 120 Z" />
        <!-- Internal Bulkheads Formers -->
        <line x1="285" y1="120" x2="355" y2="120" stroke="#8888C8" stroke-width="2" />
        <line x1="280" y1="180" x2="360" y2="180" stroke="#8888C8" stroke-width="2" />
        <line x1="280" y1="240" x2="360" y2="240" stroke="#8888C8" stroke-width="2" />
        <line x1="280" y1="300" x2="360" y2="300" stroke="#8888C8" stroke-width="2" />
        <line x1="285" y1="360" x2="355" y2="360" stroke="#8888C8" stroke-width="2" />

        <!-- Wing Rib Profiles (Left Wing) -->
        <path d="M280 170 L80 190 L80 230 L280 230 Z" fill="#15151F" />
        <!-- Wing Rib Profiles (Right Wing) -->
        <path d="M360 170 L560 190 L560 230 L360 230 Z" fill="#15151F" />

        <!-- Rib Stations Left -->
        <line x1="120" y1="186" x2="120" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="160" y1="182" x2="160" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="200" y1="178" x2="200" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="240" y1="174" x2="240" y2="230" stroke="#B9B7FF" stroke-width="1.5" />

        <!-- Rib Stations Right -->
        <line x1="400" y1="174" x2="400" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="440" y1="178" x2="440" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="480" y1="182" x2="480" y2="230" stroke="#B9B7FF" stroke-width="1.5" />
        <line x1="520" y1="186" x2="520" y2="230" stroke="#B9B7FF" stroke-width="1.5" />

        <!-- Main Spar Pass-through Tube -->
        <line x1="75" y1="205" x2="565" y2="205" stroke="#F4F2FF" stroke-width="3" stroke-dasharray="12 4" />

        <!-- Tail Booms & Stabilizers -->
        <line x1="220" y1="230" x2="220" y2="420" stroke="#8888C8" stroke-width="3" />
        <line x1="420" y1="230" x2="420" y2="420" stroke="#8888C8" stroke-width="3" />
        <polygon points="180,410 460,410 460,430 180,430" fill="#8888C8" fill-opacity="0.5" />
      </g>

      <!-- Technical Annotations -->
      <text x="320" y="45" text-anchor="middle" font-family="monospace" font-size="10" fill="#B9B7FF" font-weight="bold">PROPEL LAB-3 WORKBENCH PROTOTYPE SPECIFICATION</text>
      <text x="320" y="455" text-anchor="middle" font-family="monospace" font-size="9" fill="#8888C8">FLUTED CARDBOARD RIB LOFTS &amp; BALSA STRINGERS ASSEMBLY JIG</text>
    </svg>`
  },

  // CAD Plane
  'cad-plane': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <g stroke="#29263C" stroke-width="1">
        <line x1="0" y1="40" x2="480" y2="40" stroke-dasharray="4 4" />
        <line x1="0" y1="120" x2="480" y2="120" stroke-dasharray="4 4" />
        <line x1="0" y1="200" x2="480" y2="200" stroke-dasharray="4 4" />
        <line x1="80" y1="0" x2="80" y2="240" stroke-dasharray="4 4" />
        <line x1="240" y1="0" x2="240" y2="240" stroke-dasharray="4 4" />
        <line x1="400" y1="0" x2="400" y2="240" stroke-dasharray="4 4" />
      </g>
      <g stroke="#B9B7FF" stroke-width="1.8" fill="#15151F" fill-opacity="0.6">
        <path d="M240 28 L254 65 L254 175 L248 200 L240 205 L232 200 L226 175 L226 65 Z" />
        <path d="M240 75 L435 110 L432 128 L240 108 L48 128 L45 110 Z" />
        <polygon points="435,105 442,110 435,132 430,128" fill="#8888C8" />
        <polygon points="45,105 38,110 45,132 50,128" fill="#8888C8" />
        <line x1="180" y1="100" x2="180" y2="200" stroke="#8888C8" stroke-width="2.5" />
        <line x1="300" y1="100" x2="300" y2="200" stroke="#8888C8" stroke-width="2.5" />
        <polygon points="160,195 320,195 320,208 160,208" fill="#8888C8" fill-opacity="0.5" />
        <line x1="180" y1="188" x2="180" y2="215" stroke="#B9B7FF" stroke-width="3" />
        <line x1="300" y1="188" x2="300" y2="215" stroke="#B9B7FF" stroke-width="3" />
        <line x1="240" y1="15" x2="240" y2="225" stroke="#8888C8" stroke-width="1" stroke-dasharray="5 3" />
        <circle cx="240" cy="98" r="4" fill="#B9B7FF" stroke="#F4F2FF" stroke-width="1.5" />
      </g>
      <text x="240" y="230" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="9" fill="#8888C8" letter-spacing="2">AEROBMSCE FIXED-WING UAV BLUEPRINT · PROPEL LAB-3</text>
    </svg>`
  },

  // Project CAD Schematics
  'cad-uav-surveillance': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <g stroke="#15151F" stroke-width="1">
        <line x1="0" y1="60" x2="480" y2="60" />
        <line x1="0" y1="120" x2="480" y2="120" />
        <line x1="0" y1="180" x2="480" y2="180" />
      </g>
      <g stroke="#B9B7FF" stroke-width="1.8" fill="#15151F">
        <rect x="210" y="40" width="60" height="140" rx="30" />
        <polygon points="240,65 420,110 415,130 240,105 65,130 60,110" />
        <circle cx="240" cy="80" r="14" fill="#8888C8" fill-opacity="0.3" stroke="#8888C8" />
        <text x="240" y="84" font-family="monospace" font-size="8" fill="#F4F2FF" text-anchor="middle">PAYLOAD</text>
        <line x1="170" y1="110" x2="170" y2="190" stroke="#8888C8" stroke-width="2" />
        <line x1="310" y1="110" x2="310" y2="190" stroke="#8888C8" stroke-width="2" />
        <line x1="150" y1="190" x2="330" y2="190" stroke="#8888C8" stroke-width="3" />
      </g>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">SURVEILLANCE UAV // RE-CONFIGURABLE PAYLOAD BAY</text>
    </svg>`
  },

  'cad-flight-controller': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <rect x="140" y="30" width="200" height="180" rx="10" stroke="#B9B7FF" stroke-width="2" fill="#15151F" />
      <rect x="190" y="80" width="100" height="80" rx="4" stroke="#8888C8" stroke-width="1.5" fill="#090910" />
      <text x="240" y="118" font-family="monospace" font-size="10" fill="#F4F2FF" font-weight="bold" text-anchor="middle">MCU CORE</text>
      <text x="240" y="132" font-family="monospace" font-size="8" fill="#B9B7FF" text-anchor="middle">ARM CORTEX-M7</text>
      <!-- Pin headers -->
      <g fill="#B9B7FF">
        <circle cx="160" cy="50" r="3"/><circle cx="180" cy="50" r="3"/><circle cx="200" cy="50" r="3"/><circle cx="220" cy="50" r="3"/>
        <circle cx="260" cy="50" r="3"/><circle cx="280" cy="50" r="3"/><circle cx="300" cy="50" r="3"/><circle cx="320" cy="50" r="3"/>
        <circle cx="160" cy="190" r="3"/><circle cx="180" cy="190" r="3"/><circle cx="200" cy="190" r="3"/><circle cx="220" cy="190" r="3"/>
        <circle cx="260" cy="190" r="3"/><circle cx="280" cy="190" r="3"/><circle cx="300" cy="190" r="3"/><circle cx="320" cy="190" r="3"/>
      </g>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">INDIGENOUS AUTOPILOT PCB &amp; FIRMWARE SCHEMATIC</text>
    </svg>`
  },

  'cad-esc-module': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <rect x="150" y="40" width="180" height="160" rx="8" stroke="#B9B7FF" stroke-width="2" fill="#15151F" />
      <!-- MOSFET Banks -->
      <rect x="170" y="60" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <rect x="220" y="60" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <rect x="270" y="60" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <rect x="170" y="105" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <rect x="220" y="105" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <rect x="270" y="105" width="40" height="35" rx="3" stroke="#8888C8" fill="#090910" />
      <text x="240" y="170" font-family="monospace" font-size="9" fill="#F4F2FF" text-anchor="middle">GaN / MOSFET SWITCHING</text>
      <!-- Phase lines -->
      <line x1="330" y1="75" x2="380" y2="75" stroke="#B9B7FF" stroke-width="3" />
      <line x1="330" y1="120" x2="380" y2="120" stroke="#B9B7FF" stroke-width="3" />
      <line x1="330" y1="165" x2="380" y2="165" stroke="#B9B7FF" stroke-width="3" />
      <text x="390" y="124" font-family="monospace" font-size="9" fill="#8888C8">3-PHASE MOTOR</text>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">HIGH-EFFICIENCY ELECTRONIC SPEED CONTROLLER (ESC)</text>
    </svg>`
  },

  'cad-gps-denied': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <!-- Sensor Frustum / Optical Cone -->
      <polygon points="240,60 120,200 360,200" fill="#B9B7FF" fill-opacity="0.1" stroke="#B9B7FF" stroke-width="1.5" stroke-dasharray="4 4" />
      <circle cx="240" cy="60" r="12" stroke="#B9B7FF" stroke-width="2" fill="#15151F" />
      <circle cx="240" cy="60" r="5" fill="#8888C8" />
      <text x="240" y="40" font-family="monospace" font-size="8" fill="#F4F2FF" text-anchor="middle">OPTICAL FLOW CAMERA</text>
      <!-- Feature Tracking Grid -->
      <circle cx="180" cy="170" r="3" fill="#B9B7FF"/><circle cx="220" cy="185" r="3" fill="#B9B7FF"/>
      <circle cx="270" cy="165" r="3" fill="#B9B7FF"/><circle cx="310" cy="180" r="3" fill="#B9B7FF"/>
      <text x="240" y="220" font-family="monospace" font-size="8" fill="#8888C8" text-anchor="middle">FEATURE POINT CORRELATION (ZERO SATELLITE DEPENDENCY)</text>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">GPS-DENIED VISUAL INERTIAL ODOMETRY NAVIGATION</text>
    </svg>`
  },

  'cad-morphing-wing': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <path d="M60 120 L300 120 L360 80 L380 95 L320 135 L60 135 Z" stroke="#B9B7FF" stroke-width="2" fill="#15151F" />
      <!-- Morphing Dihedral Arc -->
      <path d="M300 120 Q360 120 380 160" stroke="#8888C8" stroke-width="2" stroke-dasharray="4 4" fill="none" />
      <path d="M300 120 Q360 120 380 80" stroke="#B9B7FF" stroke-width="2" stroke-dasharray="4 4" fill="none" />
      <circle cx="300" cy="120" r="6" fill="#F4F2FF" />
      <text x="300" y="105" font-family="monospace" font-size="8" fill="#B9B7FF" text-anchor="middle">ACTUATED HINGE</text>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">MORPHING WINGTIP MECHANISM // ADAPTIVE DIHEDRAL</text>
    </svg>`
  },

  'cad-micro-fins': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <rect x="80" y="110" width="320" height="40" rx="8" stroke="#8888C8" stroke-width="2" fill="#15151F" />
      <!-- Deployable Micro-Fins -->
      <polygon points="160,110 175,70 185,70 175,110" fill="#B9B7FF" stroke="#F4F2FF" stroke-width="1.5" />
      <polygon points="300,110 315,70 325,70 315,110" fill="#B9B7FF" stroke="#F4F2FF" stroke-width="1.5" />
      <text x="240" y="60" font-family="monospace" font-size="9" fill="#B9B7FF" text-anchor="middle">DEPLOYED STABILITY FINS (&lt; 100ms)</text>
      <text x="240" y="135" font-family="monospace" font-size="9" fill="#8888C8" text-anchor="middle">BOUNDARY LAYER AIRFLOW</text>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">DIRECTIONAL STABILITY ENHANCEMENT VIA DEPLOYABLE FINS</text>
    </svg>`
  },

  'cad-drdo-defense': {
    width: 480,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" fill="none">
      <rect width="480" height="240" fill="#090910" />
      <rect x="120" y="40" width="240" height="160" rx="8" stroke="#B9B7FF" stroke-width="1.5" fill="#15151F" />
      <circle cx="240" cy="100" r="35" stroke="#8888C8" stroke-width="2" fill="#090910" />
      <polygon points="240,75 258,115 240,105 222,115" fill="#B9B7FF" />
      <text x="240" y="155" font-family="monospace" font-size="10" fill="#F4F2FF" font-weight="bold" text-anchor="middle">DRDO ACADEMIC COLLABORATION</text>
      <text x="240" y="172" font-family="monospace" font-size="8" fill="#8888C8" text-anchor="middle">DETAILS RESTRICTED UNDER DEFENCE NDA</text>
      <text x="20" y="30" font-family="monospace" font-size="9" fill="#B9B7FF">CONFIDENTIAL DEFENCE AEROSPACE RESEARCH TRACK</text>
    </svg>`
  },

  // Ecosystem & Partners
  'solidworks': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <rect x="22" y="30" width="48" height="50" rx="6" fill="#E2231A"/>
      <path d="M34 66 L46 44 L58 66" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="82" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#F4F2FF" letter-spacing="0.5">SOLIDWORKS</text>
      <text x="83" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">Dassault Systèmes 3D CAD</text>
    </svg>`
  },

  'ansys': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <polygon points="26,78 48,28 70,78" fill="#FFB71B"/>
      <polygon points="48,28 58,54 38,54" fill="#090910"/>
      <text x="84" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#F4F2FF" letter-spacing="1">Ansys</text>
      <text x="85" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">CFD &amp; FEA Structural Analysis</text>
    </svg>`
  },

  'altair': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <polygon points="28,34 64,34 46,76" fill="#006699"/>
      <circle cx="46" cy="55" r="7" fill="#F4F2FF"/>
      <text x="82" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="22" fill="#F4F2FF">ALTAIR</text>
      <text x="83" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">OptiStruct Optimization</text>
    </svg>`
  },

  'siemens': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <text x="24" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="25" fill="#00646E" letter-spacing="3">SIEMENS</text>
      <text x="25" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">NX CAD / STAR-CCM+ Aero</text>
    </svg>`
  },

  'flow5': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <path d="M24 55 Q42 32 60 55 T96 55" stroke="#B9B7FF" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <text x="108" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="24" fill="#F4F2FF">flow5</text>
      <text x="110" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">Airfoil &amp; Wing Aerodynamics</text>
    </svg>`
  },

  'simscale': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="20" fill="#007BFF" opacity="0.3"/>
      <circle cx="45" cy="55" r="10" fill="#007BFF"/>
      <text x="80" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="22" fill="#F4F2FF">SimScale</text>
      <text x="82" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">Cloud Aerodynamic HPC</text>
    </svg>`
  },

  'drkstore': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <path d="M26 38 L54 38 L40 72 Z" fill="#B9B7FF"/>
      <text x="68" y="57" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#F4F2FF">DRKSTORE</text>
      <text x="70" y="75" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">UAV Hardware Ecosystem</text>
    </svg>`
  },

  'uav-marketplace': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="18" stroke="#8888C8" stroke-width="2.5"/>
      <polygon points="45,42 55,62 35,62" fill="#B9B7FF"/>
      <text x="78" y="57" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="19" fill="#F4F2FF">UAV MARKET</text>
      <text x="80" y="75" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10.5" fill="#8888C8">Component Sourcing</text>
    </svg>`
  },

  'drdo': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <circle cx="45" cy="55" r="20" fill="#003366" stroke="#B9B7FF" stroke-width="1.8"/>
      <polygon points="45,40 54,64 45,58 36,64" fill="#F4F2FF"/>
      <text x="80" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="23" fill="#F4F2FF" letter-spacing="1">DRDO</text>
      <text x="81" y="76" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10" fill="#8888C8">Defence R&amp;D Organisation</text>
    </svg>`
  },

  'csir-nal': {
    width: 280,
    height: 110,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 110" width="280" height="110" fill="none">
      <rect width="280" height="110" rx="8" fill="#090910" stroke="#29263C" stroke-width="1.5"/>
      <rect x="25" y="38" width="36" height="34" rx="4" fill="#005A9C"/>
      <text x="43" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="15" fill="#FFFFFF" text-anchor="middle">NAL</text>
      <text x="75" y="57" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#F4F2FF">CSIR - NAL</text>
      <text x="76" y="75" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="10" fill="#8888C8">National Aerospace Labs</text>
    </svg>`
  },

  'icon-platinum': {
    width: 120,
    height: 120,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
      <rect width="120" height="120" rx="20" fill="#15151F" stroke="#B9B7FF" stroke-width="2.5"/>
      <polygon points="60,24 92,48 80,94 40,94 28,48" stroke="#B9B7FF" stroke-width="3.5" fill="#B9B7FF" fill-opacity="0.25"/>
      <circle cx="60" cy="56" r="11" fill="#F4F2FF"/>
    </svg>`
  },

  'icon-gold': {
    width: 120,
    height: 120,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
      <rect width="120" height="120" rx="20" fill="#15151F" stroke="#E5A93C" stroke-width="2.5"/>
      <circle cx="60" cy="60" r="30" stroke="#E5A93C" stroke-width="3" fill="#E5A93C" fill-opacity="0.25"/>
      <polygon points="60,38 66,51 81,53 69,63 73,78 60,70 47,78 51,63 39,53 54,51" fill="#E5A93C"/>
    </svg>`
  },

  'icon-silver': {
    width: 120,
    height: 120,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
      <rect width="120" height="120" rx="20" fill="#15151F" stroke="#D7D7E4" stroke-width="2.5"/>
      <circle cx="60" cy="60" r="28" stroke="#D7D7E4" stroke-width="3" fill="#D7D7E4" fill-opacity="0.25"/>
      <line x1="42" y1="60" x2="78" y2="60" stroke="#D7D7E4" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },

  'icon-technical': {
    width: 120,
    height: 120,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" fill="none">
      <rect width="120" height="120" rx="20" fill="#15151F" stroke="#8888C8" stroke-width="2.5"/>
      <circle cx="60" cy="60" r="18" stroke="#8888C8" stroke-width="3.5"/>
      <path d="M60,26 L60,36 M60,84 L60,94 M26,60 L36,60 M84,60 L94,60 M36,36 L43,43 M77,77 L84,84 M84,36 L77,43 M43,77 L36,84" stroke="#8888C8" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`
  }
};

async function buildAll() {
  // These are supplied original image assets. Never overwrite them with generated approximations.
  const suppliedLogos = new Set([
    'header-logo', 'logo', 'altair', 'ansys', 'csir-nal', 'drdo', 'drkstore',
    'flow5', 'siemens', 'simscale', 'solidworks', 'uav-marketplace'
  ]);

  for (const [key, item] of Object.entries(svgAssets)) {
    if (suppliedLogos.has(key)) continue;

    const svgPath = path.join(outDir, `${key}.svg`);
    const pngPath = path.join(outDir, `${key}.png`);

    fs.writeFileSync(svgPath, item.svg.trim(), 'utf8');
    await sharp(Buffer.from(item.svg)).png().toFile(pngPath);
  }

  // Render verified official photo assets (photo1.jpg - photo8.jpg and bg.jpg) with zero AI-generated humans
  const photos = [
    {
      name: 'photo1.jpg',
      tag: 'TEAM YAKSHA // INTERNATIONAL COMPETITIONS',
      title: 'SAE Aero Design West — Micro Class Airframe',
      sub: 'Fort Worth, Texas, USA · MATLAB Simulation Awards 2nd Place · Overall #16 Globally',
      accent: '#B9B7FF'
    },
    {
      name: 'photo2.jpg',
      tag: 'TEAM BLUE IMPULSE // AEROMODELLING &amp; AEROTHON',
      title: 'SAE Aerothon — Unique Technology Development',
      sub: '1st Place Winner at ADDC 2026 · Propel Lab-3 Airframe Lofting &amp; Testing',
      accent: '#E5A93C'
    },
    {
      name: 'photo3.jpg',
      tag: 'PROPEL LAB-3 // ENGINEERING FACILITY',
      title: 'Aerospace &amp; Unmanned Systems Innovation Lab',
      sub: 'BMS College of Engineering · 10+ Academic Disciplines Collaborating in Bengaluru',
      accent: '#B9B7FF'
    },
    {
      name: 'photo4.jpg',
      tag: 'TEAM VECTORS &amp; FLYING PHANTOMS',
      title: 'Drone Racing &amp; Autonomous Aerial Systems',
      sub: 'NITK Drone Racing 2nd Place &amp; Global Academy of Technology 1st Place Champions',
      accent: '#8888C8'
    },
    {
      name: 'photo5.jpg',
      tag: 'SAE INTERNATIONAL FLIGHT LINE',
      title: 'Airfield Inspection &amp; Flight Operations',
      sub: 'Pre-flight technical inspection, center-of-gravity balancing, and payload verification',
      accent: '#D7D7E4'
    },
    {
      name: 'photo6.jpg',
      tag: 'AUTONOMOUS FLIGHT TELEMETRY',
      title: 'Field Telemetry &amp; RF Ground Station Link',
      sub: 'Long-range bidirectional RF data link streaming real-time IMU flight dynamics',
      accent: '#B9B7FF'
    },
    {
      name: 'photo7.jpg',
      tag: 'PROPEL LAB-3 INTEGRATION BENCH',
      title: 'Structural Airframe Assembly &amp; Rigging',
      sub: 'Carbon-fiber D-tube wingbox, control horn linkages, and empennage alignment',
      accent: '#8888C8'
    },
    {
      name: 'photo8.jpg',
      tag: 'AEROBMSCE FLAGSHIP PLATFORM',
      title: '16+ Years Competitive Flight Engineering History',
      sub: 'Above Gravity · Beyond Limits · BMS College of Engineering Est. 2012',
      accent: '#B9B7FF'
    }
  ];

  for (const p of photos) {
    const photoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" fill="none">
      <rect width="960" height="540" fill="#090910" />
      <!-- Grid & Technical Framing -->
      <g stroke="#15151F" stroke-width="1.2">
        <line x1="0" y1="90" x2="960" y2="90" stroke-dasharray="6 4" />
        <line x1="0" y1="180" x2="960" y2="180" stroke-dasharray="6 4" />
        <line x1="0" y1="270" x2="960" y2="270" stroke-dasharray="6 4" />
        <line x1="0" y1="360" x2="960" y2="360" stroke-dasharray="6 4" />
        <line x1="0" y1="450" x2="960" y2="450" stroke-dasharray="6 4" />
        <line x1="160" y1="0" x2="160" y2="540" stroke-dasharray="6 4" />
        <line x1="320" y1="0" x2="320" y2="540" stroke-dasharray="6 4" />
        <line x1="480" y1="0" x2="480" y2="540" stroke-dasharray="6 4" />
        <line x1="640" y1="0" x2="640" y2="540" stroke-dasharray="6 4" />
        <line x1="800" y1="0" x2="800" y2="540" stroke-dasharray="6 4" />
      </g>
      <!-- Aircraft Schematic Lines -->
      <g stroke="${p.accent}" stroke-width="2" fill="#15151F" fill-opacity="0.6">
        <circle cx="480" cy="270" r="140" stroke="#29263C" stroke-width="1.5" />
        <circle cx="480" cy="270" r="80" stroke="#29263C" stroke-width="1" stroke-dasharray="4 4" />
        <!-- Airframe -->
        <path d="M480 150 L505 210 L505 380 L495 410 L480 420 L465 410 L455 380 L455 210 Z" />
        <path d="M480 220 L760 270 L755 295 L480 265 L205 295 L200 270 Z" />
        <line x1="390" y1="260" x2="390" y2="400" stroke="#8888C8" stroke-width="3" />
        <line x1="570" y1="260" x2="570" y2="400" stroke="#8888C8" stroke-width="3" />
        <polygon points="360,395 600,395 600,410 360,410" fill="#8888C8" fill-opacity="0.4" />
        <circle cx="480" cy="250" r="5" fill="#F4F2FF" />
      </g>
      <!-- Technical Typography Card Overlay -->
      <rect x="40" y="40" width="880" height="460" rx="12" stroke="#29263C" stroke-width="1.5" fill="none" />
      <!-- Header Badge -->
      <text x="70" y="80" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="13" font-weight="bold" fill="${p.accent}" letter-spacing="2">${p.tag}</text>
      <!-- Title & Record -->
      <text x="70" y="445" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="900" fill="#F4F2FF" letter-spacing="1">${p.title}</text>
      <text x="70" y="475" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="12" fill="#8888C8" letter-spacing="0.5">${p.sub}</text>
      <text x="890" y="80" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, monospace" font-size="11" fill="#8888C8">PROPEL LAB-3 · BMSCE</text>
    </svg>`;

    await sharp(Buffer.from(photoSvg))
      .jpeg({ quality: 92 })
      .toFile(path.join(outDir, p.name));
  }

  // Also render bg.jpg (Dark Obsidian Grid)
  const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" fill="none">
    <rect width="1920" height="1080" fill="#030305" />
    <pattern id="bggrid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0e0e18" stroke-width="1"/>
    </pattern>
    <rect width="1920" height="1080" fill="url(#bggrid)" />
    <circle cx="960" cy="540" r="500" fill="#B9B7FF" fill-opacity="0.02" />
  </svg>`;
  await sharp(Buffer.from(bgSvg)).jpeg({ quality: 90 }).toFile(path.join(outDir, 'bg.jpg'));

  console.log('Successfully generated all binary PNG, SVG, and JPEG photo assets with sharp.');
}

buildAll().catch(console.error);
