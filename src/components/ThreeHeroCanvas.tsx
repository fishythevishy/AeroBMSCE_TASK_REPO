import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Camera,
  RotateCw,
  Eye,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info,
  X,
  Gauge
} from 'lucide-react';

export type CameraPreset = 'CINE' | 'ORBIT' | 'TOP' | 'SIDE' | 'FRONT';

interface ComponentPartMeta {
  id: string;
  name: string;
  material: string;
  role: string;
  specs: string;
}

const PART_METADATA: Record<string, ComponentPartMeta> = {
  fuselage: {
    id: 'fuselage',
    name: 'Primary Monocoque Fuselage',
    material: 'High-Modulus Carbon-Fiber & Balsa Core',
    role: 'Central aerodynamic shell housing payload & avionics trays',
    specs: 'L: 1420mm · Drag coefficient Cd0: 0.021 · Modular bay capacity: 1.8kg'
  },
  wings: {
    id: 'wings',
    name: 'Swept High-Aspect Ratio Wings',
    material: 'Carbon-Balsa D-Tube Torsion Box & Foam Core',
    role: 'Primary lift generation with integrated ailerons & wingtip fences',
    specs: 'Span: 2100mm · Wing Area: 0.52m² · Aspect Ratio: 8.5 · Airfoil: Selig S1223 modified'
  },
  booms: {
    id: 'booms',
    name: 'Twin Composite Tail Booms',
    material: '3K Twill High-Torsion Carbon Tube (Ø 18mm)',
    role: 'Rigid empennage support isolating control surfaces from prop wash',
    specs: 'Length: 780mm · Natural bending frequency: 44Hz · Ultra-lightweight 84g each'
  },
  tail: {
    id: 'tail',
    name: 'Inverted V-Tail & Horizontal Stabilizer',
    material: 'Carbon Ribs & Kevlar Live Hinges',
    role: 'Pitch and yaw directional damping with differential ruddervators',
    specs: 'Span: 620mm · Anhedral angle: 110° · Full dynamic pitch authority'
  },
  propulsion: {
    id: 'propulsion',
    name: 'Tractor Electric Propulsion Unit',
    material: 'Brushless Outrunner + CNC 7075 Aluminum Mount',
    role: 'Direct aerodynamic thrust with high-efficiency folding carbon prop',
    specs: '920KV Motor · 14×8 CF Folding Prop · Static Thrust: 3.4kgf @ 22.2V 6S'
  },
  canopy: {
    id: 'canopy',
    name: 'Avionics & Gimbal Sensor Pod',
    material: 'Optical Polycarbonate & EMI Shielded Enclosure',
    role: 'Aerodynamic nose fairing housing pitot telemetry & 4K optical sensor',
    specs: 'Quick-release magnetic latches · 2-axis brushless stabilization gimbal'
  },
  gear: {
    id: 'gear',
    name: 'Tricycle Shock-Absorbing Landing Gear',
    material: '6061-T6 Tempered Aluminum Struts & Neoprene Tires',
    role: 'Rough-field ground rolling stability & hard-landing energy dissipation',
    specs: 'Track width: 420mm · Energy capacity: 3.5 m/s sink rate absorption'
  }
};

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI States
  const [currentPreset, setCurrentPreset] = useState<CameraPreset>('CINE');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  // Flight simulation states
  const [flightState, setFlightState] = useState<'READY' | 'FLYING' | 'PAUSED' | 'COMPLETED'>('READY');
  const [showFlightPath, setShowFlightPath] = useState<boolean>(true);
  const [loopFlight, setLoopFlight] = useState<boolean>(true);
  const [flightSpeed, setFlightSpeed] = useState<number>(1.0);
  const [cameraFollow, setCameraFollow] = useState<boolean>(false);
  const [flightProgress, setFlightProgress] = useState<number>(0);

  // Active inspected part
  const [activePart, setActivePart] = useState<ComponentPartMeta | null>(null);

  // Collapsible bottom dock
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'VIEW' | 'FLIGHT'>('VIEW');

  // Internal mutable refs for 3D loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const aircraftGroupRef = useRef<THREE.Group | null>(null);
  const subComponentsRef = useRef<Map<string, { mesh: THREE.Object3D; basePos: THREE.Vector3; explodePos: THREE.Vector3 }>>(new Map());
  const propMeshRef = useRef<THREE.Object3D | null>(null);
  const flightCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const pathLineRef = useRef<THREE.LineLoop | null>(null);
  const waypointsGroupRef = useRef<THREE.Group | null>(null);

  const flightProgressRef = useRef<number>(0);
  const flightStateRef = useRef<'READY' | 'FLYING' | 'PAUSED' | 'COMPLETED'>('READY');
  const cameraFollowRef = useRef<boolean>(false);
  const flightSpeedRef = useRef<number>(1.0);
  const loopFlightRef = useRef<boolean>(true);
  const isExplodedRef = useRef<boolean>(false);
  const autoRotateRef = useRef<boolean>(false);
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(10, 4.5, 12));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Sync refs with state
  useEffect(() => {
    flightStateRef.current = flightState;
  }, [flightState]);

  useEffect(() => {
    cameraFollowRef.current = cameraFollow;
  }, [cameraFollow]);

  useEffect(() => {
    flightSpeedRef.current = flightSpeed;
  }, [flightSpeed]);

  useEffect(() => {
    loopFlightRef.current = loopFlight;
  }, [loopFlight]);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Handle wireframe toggling
  useEffect(() => {
    if (!aircraftGroupRef.current) return;
    aircraftGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if (m && 'wireframe' in m) {
              (m as THREE.MeshStandardMaterial).wireframe = isWireframe;
            }
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = isWireframe;
        }
      }
    });
  }, [isWireframe]);

  // Handle path line visibility
  useEffect(() => {
    if (pathLineRef.current) {
      pathLineRef.current.visible = showFlightPath;
    }
    if (waypointsGroupRef.current) {
      waypointsGroupRef.current.visible = showFlightPath;
    }
  }, [showFlightPath]);

  // Camera presets
  const applyCameraPreset = useCallback((preset: CameraPreset) => {
    setCurrentPreset(preset);
    if (!controlsRef.current) return;

    switch (preset) {
      case 'CINE':
        targetCameraPosRef.current.set(9, 4.5, 11);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case 'ORBIT':
        // Keep current camera angle, enable free rotate
        break;
      case 'TOP':
        targetCameraPosRef.current.set(0, 16, 0.01);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case 'SIDE':
        targetCameraPosRef.current.set(16, 1.2, 0);
        targetLookAtRef.current.set(0, 0, 0);
        break;
      case 'FRONT':
        targetCameraPosRef.current.set(0, 1.2, 16);
        targetLookAtRef.current.set(0, 0, 0);
        break;
    }
  }, []);

  // Flight simulation controls
  const handleStartFlight = () => {
    if (isExploded) {
      setIsExploded(false); // assemble model for flight
    }
    setFlightState('FLYING');
  };

  const handlePauseFlight = () => {
    setFlightState('PAUSED');
  };

  const handleResetFlight = () => {
    flightProgressRef.current = 0;
    setFlightProgress(0);
    setFlightState('READY');
    if (aircraftGroupRef.current) {
      aircraftGroupRef.current.position.set(0, 0, 0);
      aircraftGroupRef.current.rotation.set(0, 0, 0);
      aircraftGroupRef.current.quaternion.identity();
    }
    if (cameraFollow) {
      targetCameraPosRef.current.set(9, 4.5, 11);
      targetLookAtRef.current.set(0, 0, 0);
    }
  };

  // Three.js Mount Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x030305);
    scene.fog = new THREE.FogExp2(0x030305, 0.018);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 200);
    camera.position.set(9, 4.5, 11);
    cameraRef.current = camera;

    // 3. Renderer with ACES ToneMapping & SRGB
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.05).texture;
    pmremGenerator.dispose();

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 35;
    controls.minDistance = 2.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // avoid looking completely underneath floor
    controls.target.set(0, 0, 0);

    let isUserDragging = false;
    controls.addEventListener('start', () => { isUserDragging = true; });
    controls.addEventListener('end', () => { isUserDragging = false; });

    // 6. Lighting Rig
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xf4f2ff, 2.8);
    keyLight.position.set(12, 18, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Cool rim light (Icy Lavender #B9B7FF)
    const rimLight = new THREE.DirectionalLight(0xb9b7ff, 2.5);
    rimLight.position.set(-14, 10, -14);
    scene.add(rimLight);

    // Soft sky-ground hemisphere fill
    const hemiLight = new THREE.HemisphereLight(0x8888c8, 0x090910, 0.9);
    scene.add(hemiLight);

    // 7. Contact Shadow & Floor Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0x29263c, 0x15151f);
    gridHelper.position.y = -1.6;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.4;
    scene.add(gridHelper);

    // Soft radial ground shadow disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(3, 3, 5, 0.35)');
      grad.addColorStop(1, 'rgba(3, 3, 5, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.8
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.58;
    scene.add(shadowMesh);

    // 8. Procedural UAV Aircraft Assembly
    const aircraftGroup = new THREE.Group();
    aircraftGroupRef.current = aircraftGroup;
    scene.add(aircraftGroup);

    // Materials
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a12,
      roughness: 0.28,
      metalness: 0.82
    });

    const lavenderMat = new THREE.MeshStandardMaterial({
      color: 0xb9b7ff,
      roughness: 0.3,
      metalness: 0.6,
      emissive: 0x2a2550,
      emissiveIntensity: 0.4
    });

    const metalDarkMat = new THREE.MeshStandardMaterial({
      color: 0x242434,
      roughness: 0.2,
      metalness: 0.95
    });

    const canopyGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x151522,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.85,
      ior: 1.5,
      transparent: true
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.8,
      metalness: 0.1
    });

    // Helper for tagging parts for raycasting and exploded view
    const registerPart = (id: string, obj: THREE.Object3D, explodeOffset: THREE.Vector3) => {
      obj.userData = { partId: id };
      subComponentsRef.current.set(id, {
        mesh: obj,
        basePos: obj.position.clone(),
        explodePos: obj.position.clone().add(explodeOffset)
      });
    };

    // A. Fuselage
    const fuselageGroup = new THREE.Group();
    // Main sleek aerodynamic fuselage body
    const fuselageShape = new THREE.CylinderGeometry(0.38, 0.18, 4.4, 24);
    fuselageShape.rotateX(Math.PI / 2);
    const fuselageMesh = new THREE.Mesh(fuselageShape, carbonMat);
    fuselageMesh.castShadow = true;
    fuselageMesh.receiveShadow = true;
    fuselageGroup.add(fuselageMesh);

    // Nose Cone
    const noseGeo = new THREE.ConeGeometry(0.38, 0.9, 24);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, carbonMat);
    noseMesh.position.z = 2.65;
    noseMesh.castShadow = true;
    fuselageGroup.add(noseMesh);

    // Pitot tube at nose tip
    const pitotGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8);
    pitotGeo.rotateX(Math.PI / 2);
    const pitotMesh = new THREE.Mesh(pitotGeo, lavenderMat);
    pitotMesh.position.z = 3.3;
    fuselageGroup.add(pitotMesh);

    // Subtle technical fuselage accent lines
    const stripeGeo = new THREE.TorusGeometry(0.385, 0.01, 8, 32);
    const stripeMesh = new THREE.Mesh(stripeGeo, lavenderMat);
    stripeMesh.position.z = 1.0;
    fuselageGroup.add(stripeMesh);

    aircraftGroup.add(fuselageGroup);
    registerPart('fuselage', fuselageGroup, new THREE.Vector3(0, -0.4, 0));

    // B. Canopy / Sensor Turret Pod
    const canopyGroup = new THREE.Group();
    const canopyGeo = new THREE.SphereGeometry(0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    canopyGeo.scale(1, 0.6, 2.2);
    const canopyMesh = new THREE.Mesh(canopyGeo, canopyGlassMat);
    canopyMesh.position.set(0, 0.28, 0.6);
    canopyGroup.add(canopyMesh);

    // Underbelly EO/IR Sensor Ball
    const sensorGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const sensorMesh = new THREE.Mesh(sensorGeo, metalDarkMat);
    sensorMesh.position.set(0, -0.32, 1.4);
    const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.05, 16);
    lensGeo.rotateX(Math.PI / 2);
    const lensMesh = new THREE.Mesh(lensGeo, lavenderMat);
    lensMesh.position.set(0, -0.32, 1.58);
    canopyGroup.add(sensorMesh);
    canopyGroup.add(lensMesh);

    aircraftGroup.add(canopyGroup);
    registerPart('canopy', canopyGroup, new THREE.Vector3(0, 1.4, 0.8));

    // C. Wings (Main swept wings + winglets)
    const wingsGroup = new THREE.Group();
    // Center wing section
    const wingShape = new THREE.BoxGeometry(7.2, 0.08, 0.9);
    const wingMesh = new THREE.Mesh(wingShape, carbonMat);
    wingMesh.position.set(0, 0.18, 0.2);
    wingMesh.castShadow = true;
    wingMesh.receiveShadow = true;
    wingsGroup.add(wingMesh);

    // Left Winglet (Micro-fin)
    const wingletGeo = new THREE.BoxGeometry(0.04, 0.45, 0.7);
    const leftWinglet = new THREE.Mesh(wingletGeo, lavenderMat);
    leftWinglet.position.set(-3.6, 0.35, 0.2);
    wingsGroup.add(leftWinglet);

    // Right Winglet
    const rightWinglet = new THREE.Mesh(wingletGeo, lavenderMat);
    rightWinglet.position.set(3.6, 0.35, 0.2);
    wingsGroup.add(rightWinglet);

    // Aileron hinges & aerodynamic chord stripes
    const aileronLineGeo = new THREE.BoxGeometry(2.4, 0.02, 0.02);
    const leftAileron = new THREE.Mesh(aileronLineGeo, metalDarkMat);
    leftAileron.position.set(-2.2, 0.22, -0.22);
    const rightAileron = new THREE.Mesh(aileronLineGeo, metalDarkMat);
    rightAileron.position.set(2.2, 0.22, -0.22);
    wingsGroup.add(leftAileron);
    wingsGroup.add(rightAileron);

    aircraftGroup.add(wingsGroup);
    registerPart('wings', wingsGroup, new THREE.Vector3(0, 0.9, 0));

    // D. Twin Tail Booms
    const boomsGroup = new THREE.Group();
    const boomGeo = new THREE.CylinderGeometry(0.05, 0.04, 3.2, 12);
    boomGeo.rotateX(Math.PI / 2);

    const leftBoom = new THREE.Mesh(boomGeo, carbonMat);
    leftBoom.position.set(-1.1, 0.16, -1.6);
    leftBoom.castShadow = true;
    boomsGroup.add(leftBoom);

    const rightBoom = new THREE.Mesh(boomGeo, carbonMat);
    rightBoom.position.set(1.1, 0.16, -1.6);
    rightBoom.castShadow = true;
    boomsGroup.add(rightBoom);

    aircraftGroup.add(boomsGroup);
    registerPart('booms', boomsGroup, new THREE.Vector3(0, 0.3, -1.5));

    // E. Empennage (Inverted V-tail and Horizontal Stabilizer)
    const tailGroup = new THREE.Group();
    // Horizontal stabilizer
    const hStabGeo = new THREE.BoxGeometry(2.4, 0.05, 0.55);
    const hStab = new THREE.Mesh(hStabGeo, carbonMat);
    hStab.position.set(0, 0.5, -3.1);
    hStab.castShadow = true;
    tailGroup.add(hStab);

    // Vertical Fins
    const vFinGeo = new THREE.BoxGeometry(0.04, 0.9, 0.55);
    const leftFin = new THREE.Mesh(vFinGeo, carbonMat);
    leftFin.position.set(-1.1, 0.5, -3.1);
    leftFin.rotation.z = -0.15;
    leftFin.castShadow = true;
    tailGroup.add(leftFin);

    const rightFin = new THREE.Mesh(vFinGeo, carbonMat);
    rightFin.position.set(1.1, 0.5, -3.1);
    rightFin.rotation.z = 0.15;
    rightFin.castShadow = true;
    tailGroup.add(rightFin);

    // Top fin caps in Icy Lavender
    const finCapGeo = new THREE.BoxGeometry(0.06, 0.1, 0.56);
    const lCap = new THREE.Mesh(finCapGeo, lavenderMat);
    lCap.position.set(-1.22, 0.95, -3.1);
    const rCap = new THREE.Mesh(finCapGeo, lavenderMat);
    rCap.position.set(1.22, 0.95, -3.1);
    tailGroup.add(lCap);
    tailGroup.add(rCap);

    aircraftGroup.add(tailGroup);
    registerPart('tail', tailGroup, new THREE.Vector3(0, 0.8, -2.4));

    // F. Propulsion (Motor & Propeller)
    const propGroup = new THREE.Group();
    propMeshRef.current = propGroup;

    // Spinner hub
    const hubGeo = new THREE.ConeGeometry(0.18, 0.4, 16);
    hubGeo.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, metalDarkMat);
    hubMesh.position.set(0, 0, 3.2);
    propGroup.add(hubMesh);

    // Propeller Blades
    const bladeGeo = new THREE.BoxGeometry(0.12, 1.8, 0.02);
    const propMesh = new THREE.Mesh(bladeGeo, carbonMat);
    propMesh.position.set(0, 0, 3.15);
    propGroup.add(propMesh);

    aircraftGroup.add(propGroup);
    registerPart('propulsion', propGroup, new THREE.Vector3(0, 0, 2.0));

    // G. Landing Gear
    const gearGroup = new THREE.Group();
    // Nose gear
    const nStrutGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8);
    const nStrut = new THREE.Mesh(nStrutGeo, metalDarkMat);
    nStrut.position.set(0, -0.8, 1.6);
    gearGroup.add(nStrut);

    const nWheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 16);
    nWheelGeo.rotateZ(Math.PI / 2);
    const nWheel = new THREE.Mesh(nWheelGeo, rubberMat);
    nWheel.position.set(0, -1.25, 1.6);
    gearGroup.add(nWheel);

    // Main Gear Struts
    const mStrutGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
    const lMainStrut = new THREE.Mesh(mStrutGeo, metalDarkMat);
    lMainStrut.position.set(-0.7, -0.85, -0.2);
    lMainStrut.rotation.z = -0.3;
    gearGroup.add(lMainStrut);

    const rMainStrut = new THREE.Mesh(mStrutGeo, metalDarkMat);
    rMainStrut.position.set(0.7, -0.85, -0.2);
    rMainStrut.rotation.z = 0.3;
    gearGroup.add(rMainStrut);

    const mWheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
    mWheelGeo.rotateZ(Math.PI / 2);
    const lWheel = new THREE.Mesh(mWheelGeo, rubberMat);
    lWheel.position.set(-1.05, -1.35, -0.2);
    gearGroup.add(lWheel);

    const rWheel = new THREE.Mesh(mWheelGeo, rubberMat);
    rWheel.position.set(1.05, -1.35, -0.2);
    gearGroup.add(rWheel);

    aircraftGroup.add(gearGroup);
    registerPart('gear', gearGroup, new THREE.Vector3(0, -1.2, 0));

    // 9. 3D Flight Trajectory Curve
    // Smooth CatmullRomCurve3 in world space with elevation sweeps and turns
    const trajectoryPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(8, 2.5, -10),
      new THREE.Vector3(18, 5.0, -16),
      new THREE.Vector3(22, 6.5, -4),
      new THREE.Vector3(15, 5.5, 12),
      new THREE.Vector3(2, 3.8, 18),
      new THREE.Vector3(-14, 4.5, 14),
      new THREE.Vector3(-22, 6.0, 0),
      new THREE.Vector3(-18, 3.5, -12),
      new THREE.Vector3(-8, 1.5, -8),
      new THREE.Vector3(0, 0, 0)
    ];

    const flightCurve = new THREE.CatmullRomCurve3(trajectoryPoints, true, 'centripetal');
    flightCurveRef.current = flightCurve;

    // Render trajectory line
    const curvePoints = flightCurve.getPoints(200);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xb9b7ff,
      transparent: true,
      opacity: 0.65,
      linewidth: 2
    });
    const pathLine = new THREE.LineLoop(lineGeo, lineMat);
    pathLineRef.current = pathLine;
    scene.add(pathLine);

    // Waypoint beacons along trajectory
    const waypointsGroup = new THREE.Group();
    waypointsGroupRef.current = waypointsGroup;
    trajectoryPoints.slice(0, -1).forEach((pt, idx) => {
      const beadGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const beadMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0xb9b7ff : 0x8888c8,
        transparent: true,
        opacity: 0.8
      });
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.copy(pt);
      waypointsGroup.add(bead);
    });
    scene.add(waypointsGroup);

    // 10. Raycasting Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(aircraftGroup.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj !== aircraftGroup) {
          if (obj.userData?.partId && PART_METADATA[obj.userData.partId]) {
            setActivePart(PART_METADATA[obj.userData.partId]);
            return;
          }
          obj = obj.parent;
        }
      }
    };

    renderer.domElement.addEventListener('click', handlePointerDown);

    // 11. Animation Tick Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const _pos = new THREE.Vector3();
    const _tangent = new THREE.Vector3();
    const _up = new THREE.Vector3(0, 1, 0);
    const _lookTarget = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera interpolation towards target
      if (controls && !isUserDragging) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPosRef.current.x, 3, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPosRef.current.y, 3, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPosRef.current.z, 3, delta);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, targetLookAtRef.current.x, 4, delta);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, targetLookAtRef.current.y, 4, delta);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, targetLookAtRef.current.z, 4, delta);
      }

      controls.update();

      // Propeller rotation
      if (propMeshRef.current) {
        const propSpeed = flightStateRef.current === 'FLYING' ? 35 : 2.5;
        propMeshRef.current.rotation.z += propSpeed * delta;
      }

      // Exploded View Assembly Damping
      subComponentsRef.current.forEach(({ mesh, basePos, explodePos }) => {
        const dest = isExplodedRef.current ? explodePos : basePos;
        mesh.position.x = THREE.MathUtils.damp(mesh.position.x, dest.x, 6, delta);
        mesh.position.y = THREE.MathUtils.damp(mesh.position.y, dest.y, 6, delta);
        mesh.position.z = THREE.MathUtils.damp(mesh.position.z, dest.z, 6, delta);
      });

      // Turntable Auto-rotate when not flying
      if (autoRotateRef.current && flightStateRef.current !== 'FLYING' && aircraftGroup) {
        aircraftGroup.rotation.y += 0.4 * delta;
      }

      // Flight Simulation Execution along 3D Curve
      if (flightStateRef.current === 'FLYING' && flightCurveRef.current && aircraftGroup) {
        const progressIncrement = delta * 0.035 * flightSpeedRef.current;
        flightProgressRef.current += progressIncrement;

        if (flightProgressRef.current >= 1.0) {
          if (loopFlightRef.current) {
            flightProgressRef.current = flightProgressRef.current % 1.0;
          } else {
            flightProgressRef.current = 1.0;
            flightStateRef.current = 'COMPLETED';
            setFlightState('COMPLETED');
          }
        }

        setFlightProgress(Math.round(flightProgressRef.current * 100));

        const t = flightProgressRef.current;
        flightCurveRef.current.getPointAt(t, _pos);
        flightCurveRef.current.getTangentAt(t, _tangent);

        // Position aircraft
        aircraftGroup.position.copy(_pos);

        // Orient aircraft nose along trajectory tangent
        _lookTarget.copy(_pos).add(_tangent);
        aircraftGroup.lookAt(_lookTarget);

        // Calculate realistic aerodynamic banking
        // Sample next tangent to compute turn direction
        const nextT = (t + 0.015) % 1.0;
        const nextTangent = flightCurveRef.current.getTangentAt(nextT);
        const cross = _tangent.clone().cross(nextTangent);
        const bankAngle = THREE.MathUtils.clamp(-cross.y * 14.0, -0.65, 0.65);
        aircraftGroup.rotateZ(bankAngle);

        // Camera Follow Mode
        if (cameraFollowRef.current) {
          targetLookAtRef.current.copy(_pos);
          const followCamPos = _pos.clone().sub(_tangent.clone().multiplyScalar(9)).add(new THREE.Vector3(0, 3.2, 0));
          targetCameraPosRef.current.copy(followCamPos);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[640px] lg:h-[720px] bg-[#030305] overflow-hidden select-none border-b border-[#15151F]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Spec Badge */}
      <div className="absolute top-5 left-6 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#B9B7FF] rounded-full" />
          <span className="font-mono text-[11px] tracking-wider text-[#B9B7FF] uppercase">
            AEROBMSCE TECHNICAL SIMULATION
          </span>
          <span className="text-[#8888C8] text-[11px] font-mono">/</span>
          <span className="font-mono text-[11px] text-[#8888C8] hidden sm:inline">
            FIXED-WING SURVEILLANCE UAV
          </span>
        </div>
        <p className="text-[10px] text-[#8888C8]/60 font-mono mt-0.5">
          PROPEL LAB-3 · CARBON COMPOSITE AIRFRAME · REAL THREE.JS KINEMATICS
        </p>
      </div>

      {/* Top Right Simulation State Pill (Read-only status) */}
      <div className="absolute top-5 right-6 z-10 pointer-events-none flex items-center gap-3">
        <div className="bg-[#090910]/85 border border-[#29263C] px-3 py-1.5 rounded-md flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#8888C8]">STATUS:</span>
          <span
            className={`font-mono text-[11px] font-semibold ${
              flightState === 'FLYING'
                ? 'text-[#B9B7FF]'
                : flightState === 'PAUSED'
                ? 'text-[#E5A93C]'
                : 'text-[#D7D7E4]'
            }`}
          >
            {flightState}
          </span>
          {flightState === 'FLYING' && (
            <span className="font-mono text-[10px] text-[#B9B7FF]">
              ({flightProgress}%)
            </span>
          )}
        </div>
      </div>

      {/* Active Part Inspected Modal / Floating Popover */}
      {activePart && (
        <div className="absolute top-16 right-6 z-20 w-80 bg-[#090910]/95 border border-[#B9B7FF]/40 rounded-lg p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5 text-[#B9B7FF] text-xs font-mono uppercase tracking-wider">
              <Info className="w-3.5 h-3.5" />
              <span>Airframe Subsystem</span>
            </div>
            <button
              onClick={() => setActivePart(null)}
              className="text-[#8888C8] hover:text-[#F4F2FF] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-sm font-bold text-[#F4F2FF] mt-2 font-display">{activePart.name}</h4>
          <p className="text-xs text-[#8888C8] mt-1">{activePart.role}</p>

          <div className="mt-3 pt-3 border-t border-[#15151F] space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#8888C8]">Material:</span>
              <span className="text-[#D7D7E4] text-right">{activePart.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8888C8]">Specification:</span>
              <span className="text-[#B9B7FF] text-right font-medium">{activePart.specs}</span>
            </div>
          </div>
        </div>
      )}

      {/* Flight Progress Bar Indicator (Visible during flight) */}
      {flightState === 'FLYING' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#15151F] z-20">
          <div
            className="h-full bg-gradient-to-r from-[#8888C8] to-[#B9B7FF] transition-all duration-100"
            style={{ width: `${flightProgress}%` }}
          />
        </div>
      )}

      {/* Ergonomic Unified Bottom Control Dock (Follows 3D Skill Directives) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-3xl transition-transform duration-300 ${
          isHudCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsHudCollapsed(!isHudCollapsed)}
            className="bg-[#090910] border border-b-0 border-[#29263C] text-[#8888C8] hover:text-[#F4F2FF] text-[11px] font-mono px-4 py-1 rounded-t-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isHudCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isHudCollapsed ? 'SHOW 3D FLIGHT CONTROLS' : 'MINIMIZE CONTROLS'}</span>
          </button>
        </div>

        {/* Main Dock Container */}
        <div className="bg-[#090910]/95 border border-[#29263C] rounded-lg p-3 shadow-2xl backdrop-blur-md">
          {/* Dock Header Tabs: CAMERA & INSPECTION vs FLIGHT SIMULATION */}
          <div className="flex items-center justify-between border-b border-[#15151F] pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('VIEW')}
                className={`text-xs font-mono px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'VIEW'
                    ? 'bg-[#15151F] text-[#B9B7FF] font-semibold border border-[#29263C]'
                    : 'text-[#8888C8] hover:text-[#F4F2FF]'
                }`}
              >
                CAMERA &amp; AIRFRAME
              </button>
              <button
                onClick={() => setActiveTab('FLIGHT')}
                className={`text-xs font-mono px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'FLIGHT'
                    ? 'bg-[#15151F] text-[#B9B7FF] font-semibold border border-[#29263C]'
                    : 'text-[#8888C8] hover:text-[#F4F2FF]'
                }`}
              >
                <span>3D FLIGHT SIMULATION</span>
                {flightState === 'FLYING' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B9B7FF]" />
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[#8888C8]">
              <span>DRAG TO ORBIT · SCROLL TO ZOOM</span>
            </div>
          </div>

          {/* TAB 1: CAMERA & AIRFRAME INSPECTION */}
          {activeTab === 'VIEW' && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Camera Presets */}
              <div className="flex items-center gap-1">
                {(['CINE', 'TOP', 'SIDE', 'FRONT'] as CameraPreset[]).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyCameraPreset(preset)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      currentPreset === preset
                        ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                        : 'bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
                <button
                  onClick={() => applyCameraPreset('CINE')}
                  title="Reset Camera Position"
                  className="px-2 py-1 text-xs font-mono rounded bg-[#15151F] text-[#8888C8] hover:text-[#F4F2FF] hover:bg-[#29263C]"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline" />
                </button>
              </div>

              {/* Model View Modes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1 transition-colors ${
                    isWireframe
                      ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                      : 'bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>WIRE</span>
                </button>

                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1 transition-colors ${
                    isExploded
                      ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                      : 'bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>EXPLODED</span>
                </button>

                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1 transition-colors ${
                    autoRotate
                      ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                      : 'bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C]'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>ROTATE</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 3D FLIGHT PATH SIMULATION */}
          {activeTab === 'FLIGHT' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Playback Controls */}
              <div className="flex items-center gap-1.5">
                {flightState === 'FLYING' ? (
                  <button
                    onClick={handlePauseFlight}
                    className="px-3 py-1.5 text-xs font-mono font-semibold bg-[#E5A93C] text-[#030305] rounded flex items-center gap-1.5 hover:bg-[#f5b730] transition-colors"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>PAUSE</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartFlight}
                    className="px-3 py-1.5 text-xs font-mono font-semibold bg-[#B9B7FF] text-[#030305] rounded flex items-center gap-1.5 hover:bg-white transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{flightState === 'PAUSED' ? 'RESUME' : 'FLY PATH'}</span>
                  </button>
                )}

                <button
                  onClick={handleResetFlight}
                  title="Reset Flight Position"
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C] rounded flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>

                <button
                  onClick={() => setShowFlightPath(!showFlightPath)}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
                    showFlightPath
                      ? 'bg-[#15151F] text-[#B9B7FF] border border-[#29263C]'
                      : 'bg-[#15151F] text-[#8888C8]'
                  }`}
                >
                  {showFlightPath ? 'HIDE PATH' : 'SHOW PATH'}
                </button>
              </div>

              {/* Speed Presets & Camera Follow */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#15151F] rounded p-0.5">
                  {[0.5, 1.0, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setFlightSpeed(spd)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                        flightSpeed === spd
                          ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                          : 'text-[#8888C8] hover:text-[#F4F2FF]'
                      }`}
                    >
                      {spd}×
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setLoopFlight(!loopFlight)}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
                    loopFlight
                      ? 'bg-[#15151F] text-[#B9B7FF] border border-[#29263C]'
                      : 'bg-[#15151F] text-[#8888C8]'
                  }`}
                >
                  LOOP
                </button>

                <button
                  onClick={() => setCameraFollow(!cameraFollow)}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded flex items-center gap-1.5 transition-colors ${
                    cameraFollow
                      ? 'bg-[#B9B7FF] text-[#030305] font-semibold'
                      : 'bg-[#15151F] text-[#D7D7E4] hover:bg-[#29263C]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>FOLLOW CAM</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
