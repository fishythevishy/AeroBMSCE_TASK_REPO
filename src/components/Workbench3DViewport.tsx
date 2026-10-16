import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Box,
  Crosshair,
  Layers3,
  Maximize2,
  RotateCcw,
  Scan,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { SafeImage } from './SafeImage';

export interface WorkbenchHotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  tag: string;
  detail: string;
}

interface Workbench3DViewportProps {
  activeStepIndex: number;
  selectedHotspot: WorkbenchHotspot;
  hotspots: WorkbenchHotspot[];
  onSelectHotspot: (hotspot: WorkbenchHotspot) => void;
}

type ViewMode = '3D' | '2D';

interface WingSpec {
  halfSpan: number;
  rootChord: number;
  tipChord: number;
  leadingZ: number;
  sweep: number;
}

const MAIN_WING: WingSpec = {
  halfSpan: 3.35,
  rootChord: 1.55,
  tipChord: 0.88,
  leadingZ: 0.38,
  sweep: 0.17,
};

const HOTSPOT_POSITIONS: Record<string, [number, number, number]> = {
  lofting: [-1.75, 0.24, 0.09],
  ribs: [-1.72, 0.23, 0.02],
  dbox: [0.92, 0.15, -0.06],
  bulkheads: [0.02, 0.26, -0.48],
  spar: [0.18, 0.11, 0.12],
  empennage: [0.02, 0.13, -1.48],
  nose: [0.02, 0.17, 0.94],
  hingeline: [1.72, 0.12, -0.81],
};

const material = (
  color: THREE.ColorRepresentation,
  options: { opacity?: number; metalness?: number; roughness?: number; emissive?: THREE.ColorRepresentation } = {},
) => new THREE.MeshStandardMaterial({
  color,
  metalness: options.metalness ?? 0.34,
  roughness: options.roughness ?? 0.42,
  transparent: (options.opacity ?? 1) < 1,
  opacity: options.opacity ?? 1,
  side: THREE.DoubleSide,
  emissive: options.emissive ?? '#130923',
  emissiveIntensity: 0.32,
  depthWrite: (options.opacity ?? 1) >= 0.95,
});

function wingPoint(x: number, t: number, side: 1 | -1, spec: WingSpec, zOffset = 0) {
  const ratio = Math.min(1, Math.abs(x) / spec.halfSpan);
  const chord = spec.rootChord - (spec.rootChord - spec.tipChord) * ratio;
  const leading = spec.leadingZ - spec.sweep * Math.abs(x);
  const safeSin = Math.max(0, Math.sin(Math.PI * t));
  const thickness = 0.145 * chord * Math.sqrt(safeSin) * (1 - 0.23 * t);
  const camber = 0.035 * chord * safeSin;
  return new THREE.Vector3(x, camber + side * thickness, leading - chord * t - zOffset);
}

function makeWingSurface(
  spec: WingSpec,
  tStart: number,
  tEnd: number,
  side: 1 | -1,
  tint: string,
  opacity: number,
  zOffset = 0,
  spanStart = -spec.halfSpan,
  spanEnd = spec.halfSpan,
) {
  const spanSegments = 32;
  const chordSegments = 18;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= spanSegments; i += 1) {
    const x = spanStart + ((spanEnd - spanStart) * i) / spanSegments;
    for (let j = 0; j <= chordSegments; j += 1) {
      const t = tStart + ((tEnd - tStart) * j) / chordSegments;
      const p = wingPoint(x, t, side, spec, zOffset);
      positions.push(p.x, p.y, p.z);
    }
  }

  for (let i = 0; i < spanSegments; i += 1) {
    for (let j = 0; j < chordSegments; j += 1) {
      const a = i * (chordSegments + 1) + j;
      const b = a + chordSegments + 1;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material(tint, { opacity, metalness: 0.52, roughness: 0.31, emissive: '#26103F' }));
}

function makeAirfoilLoop(x: number, spec: WingSpec, color = '#BDA4FF', xOffset = 0) {
  const points: THREE.Vector3[] = [];
  const samples = 28;
  for (let i = 0; i <= samples; i += 1) points.push(wingPoint(x + xOffset, i / samples, 1, spec));
  for (let i = samples; i >= 0; i -= 1) points.push(wingPoint(x + xOffset, i / samples, -1, spec));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }));
}

function makeLine(points: THREE.Vector3[], color = '#9D8BF5', opacity = 0.9) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
  return line;
}

function makeTube(points: THREE.Vector3[], radius = 0.022, color = '#B99AFF', opacity = 0.9) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, Math.max(24, points.length * 2), radius, 7, false);
  return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color,
    metalness: 0.58,
    roughness: 0.28,
    transparent: opacity < 1,
    opacity,
    emissive: color,
    emissiveIntensity: 0.16,
  }));
}

function addWingRibs(group: THREE.Group, count: number, spec: WingSpec, exploded: boolean, color = '#BDA9FF') {
  for (let i = 0; i < count; i += 1) {
    const x = -spec.halfSpan + (2 * spec.halfSpan * i) / (count - 1);
    const spread = exploded ? Math.sign(x) * Math.min(0.25, Math.abs(x) * 0.07) : 0;
    group.add(makeAirfoilLoop(x, spec, color, spread));
  }
}

function addWingSpars(group: THREE.Group, spec: WingSpec, chordFractions: number[] = [0.28, 0.69], exploded = false) {
  for (const fraction of chordFractions) {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i += 1) {
      const x = -spec.halfSpan + (2 * spec.halfSpan * i) / 32;
      const p = wingPoint(x, fraction, 1, spec);
      p.y = 0.02 + (exploded ? Math.sign(x) * 0.035 : 0);
      points.push(p);
    }
    group.add(makeTube(points, fraction < 0.4 ? 0.035 : 0.022, fraction < 0.4 ? '#D4C7FF' : '#866BC8', 0.95));
  }
}

function makeFuselageSkin(opacity = 0.4) {
  const stations = [
    { z: 1.22, rx: 0.025, ry: 0.035 },
    { z: 0.93, rx: 0.12, ry: 0.13 },
    { z: 0.54, rx: 0.19, ry: 0.18 },
    { z: 0.1, rx: 0.25, ry: 0.23 },
    { z: -0.38, rx: 0.26, ry: 0.24 },
    { z: -0.82, rx: 0.21, ry: 0.2 },
    { z: -1.28, rx: 0.13, ry: 0.14 },
    { z: -1.68, rx: 0.035, ry: 0.045 },
  ];
  const radialSegments = 24;
  const positions: number[] = [];
  const indices: number[] = [];
  stations.forEach((station) => {
    for (let j = 0; j <= radialSegments; j += 1) {
      const theta = (j / radialSegments) * Math.PI * 2;
      positions.push(station.rx * Math.cos(theta), station.ry * Math.sin(theta), station.z);
    }
  });
  for (let i = 0; i < stations.length - 1; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const a = i * (radialSegments + 1) + j;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material('#7153A9', { opacity, metalness: 0.42, roughness: 0.38, emissive: '#1E0B35' }));
}

function addFuselageFrames(group: THREE.Group, exploded: boolean, showSkin: boolean) {
  const stations = [
    { z: 1.22, rx: 0.025, ry: 0.035 },
    { z: 0.93, rx: 0.12, ry: 0.13 },
    { z: 0.54, rx: 0.19, ry: 0.18 },
    { z: 0.1, rx: 0.25, ry: 0.23 },
    { z: -0.38, rx: 0.26, ry: 0.24 },
    { z: -0.82, rx: 0.21, ry: 0.2 },
    { z: -1.28, rx: 0.13, ry: 0.14 },
    { z: -1.68, rx: 0.035, ry: 0.045 },
  ];
  if (showSkin) group.add(makeFuselageSkin(0.26));
  stations.forEach((station, index) => {
    const z = station.z + (exploded ? (index - (stations.length - 1) / 2) * 0.055 : 0);
    const ringPoints: THREE.Vector3[] = [];
    for (let j = 0; j < 32; j += 1) {
      const theta = (j / 32) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(station.rx * Math.cos(theta), station.ry * Math.sin(theta), z));
    }
    group.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ringPoints), new THREE.LineBasicMaterial({ color: index % 2 ? '#A99AF8' : '#D0C4FF', transparent: true, opacity: 0.95 })));
  });
  // Four longitudinal stringers connect the former rings and make alignment easy to inspect.
  for (let corner = 0; corner < 8; corner += 1) {
    const theta = (corner / 8) * Math.PI * 2;
    const points = stations.map((station, index) => new THREE.Vector3(
      (station.rx + 0.012) * Math.cos(theta),
      (station.ry + 0.012) * Math.sin(theta),
      station.z + (exploded ? (index - (stations.length - 1) / 2) * 0.055 : 0),
    ));
    group.add(makeLine(points, '#806AC1', 0.68));
  }
  group.add(makeLine([new THREE.Vector3(0, 0, 1.36), new THREE.Vector3(0, 0, -1.8)], '#6F5BA9', 0.6));
}

function addSmallTail(group: THREE.Group) {
  const tailSpec: WingSpec = { halfSpan: 1.12, rootChord: 0.62, tipChord: 0.38, leadingZ: -1.35, sweep: 0.11 };
  group.add(makeWingSurface(tailSpec, 0, 1, 1, '#7A64B9', 0.42));
  group.add(makeWingSurface(tailSpec, 0, 1, -1, '#7A64B9', 0.28));
  addWingRibs(group, 5, tailSpec, false, '#A899E8');
  const finGeometry = new THREE.BufferGeometry();
  finGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0.07, -1.56,
    0, 0.72, -1.22,
    0, 0.07, -0.96,
  ], 3));
  finGeometry.setIndex([0, 1, 2]);
  finGeometry.computeVertexNormals();
  group.add(new THREE.Mesh(finGeometry, material('#7354A8', { opacity: 0.48, roughness: 0.36 })));
  group.add(makeLine([
    new THREE.Vector3(0, 0.07, -1.56),
    new THREE.Vector3(0, 0.72, -1.22),
    new THREE.Vector3(0, 0.07, -0.96),
  ], '#BDA9FF', 0.95));
}

function addHotspotMarkers(group: THREE.Group, onMeshes: THREE.Mesh[], stageIndex: number) {
  const idsByStage = [
    ['lofting', 'ribs'],
    ['ribs', 'spar'],
    ['bulkheads', 'empennage', 'nose'],
    ['ribs', 'spar', 'dbox'],
    ['lofting', 'ribs', 'dbox', 'bulkheads', 'spar', 'empennage', 'nose', 'hingeline'],
  ];
  const allowed = new Set(idsByStage[stageIndex] ?? idsByStage[0]);
  Object.entries(HOTSPOT_POSITIONS).filter(([id]) => allowed.has(id)).forEach(([id, [x, y, z]]) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.135, 0.009, 6, 24),
      new THREE.MeshBasicMaterial({ color: '#A991FF', transparent: true, opacity: 0.82 }),
    );
    ring.position.set(x, y, z);
    ring.userData.hotspotRingId = id;
    group.add(ring);
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.067, 12, 10),
      new THREE.MeshStandardMaterial({ color: '#E1D6FF', emissive: '#7040C8', emissiveIntensity: 0.8, roughness: 0.3 }),
    );
    marker.position.set(x, y, z);
    marker.userData.hotspotId = id;
    group.add(marker);
    onMeshes.push(marker);
  });
}

function buildWorkbenchModel(stageIndex: number, exploded: boolean, cutaway: boolean) {
  const root = new THREE.Group();
  const hotspotMeshes: THREE.Mesh[] = [];
  let aileron: THREE.Group | null = null;

  if (stageIndex === 0) {
    root.add(makeWingSurface(MAIN_WING, 0, 1, 1, '#7257B6', cutaway ? 0.07 : 0.26));
    root.add(makeWingSurface(MAIN_WING, 0, 1, -1, '#4E3D81', cutaway ? 0.04 : 0.15));
    addWingRibs(root, 11, MAIN_WING, exploded, '#D1C4FF');
    [0.08, 0.28, 0.52, 0.76, 0.98].forEach((fraction, index) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 32; i += 1) {
        const x = -MAIN_WING.halfSpan + (2 * MAIN_WING.halfSpan * i) / 32;
        const p = wingPoint(x, fraction, 1, MAIN_WING);
        p.y += 0.03 + index * 0.006;
        points.push(p);
      }
      root.add(makeTube(points, index === 1 ? 0.024 : 0.012, index === 1 ? '#E0D6FF' : '#8B76D2', 0.8));
    });
  } else if (stageIndex === 1) {
    if (!cutaway) {
      root.add(makeWingSurface(MAIN_WING, 0, 1, 1, '#69509F', 0.08));
    }
    addWingRibs(root, cutaway ? 8 : 13, MAIN_WING, exploded, '#D0C3FF');
    addWingSpars(root, MAIN_WING, [0.28, 0.67], exploded);
    const leadingEdge: THREE.Vector3[] = [];
    const trailingEdge: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i += 1) {
      const x = -MAIN_WING.halfSpan + (2 * MAIN_WING.halfSpan * i) / 32;
      leadingEdge.push(wingPoint(x, 0.02, 1, MAIN_WING));
      trailingEdge.push(wingPoint(x, 0.97, 1, MAIN_WING));
    }
    root.add(makeTube(leadingEdge, 0.024, '#8B75D6', 0.8));
    root.add(makeTube(trailingEdge, 0.018, '#6D5BAF', 0.7));
  } else if (stageIndex === 2) {
    addFuselageFrames(root, exploded, !cutaway);
    // Tail roots and a pair of wing-reference lines keep the model's orientation clear.
    root.add(makeTube([new THREE.Vector3(-0.3, 0.05, -0.4), new THREE.Vector3(-2.6, 0.05, -0.5)], 0.02, '#7767B7', 0.65));
    root.add(makeTube([new THREE.Vector3(0.3, 0.05, -0.4), new THREE.Vector3(2.6, 0.05, -0.5)], 0.02, '#7767B7', 0.65));
  } else if (stageIndex === 3) {
    addWingRibs(root, 11, MAIN_WING, exploded, '#BFB1FF');
    addWingSpars(root, MAIN_WING, [0.28, 0.7], exploded);
    if (!cutaway) {
      root.add(makeWingSurface(MAIN_WING, 0, 0.43, 1, '#8D64CE', 0.5));
      root.add(makeWingSurface(MAIN_WING, 0, 0.43, -1, '#5E438E', 0.31));
    } else {
      // Cutaway mode keeps one leading-edge skin strip while exposing the internal ribs.
      root.add(makeWingSurface(MAIN_WING, 0, 0.23, 1, '#9D79E0', 0.19, 0, 0.05, MAIN_WING.halfSpan));
    }
    const sparLine: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i += 1) {
      const x = -MAIN_WING.halfSpan + (2 * MAIN_WING.halfSpan * i) / 32;
      sparLine.push(wingPoint(x, 0.43, 1, MAIN_WING));
    }
    root.add(makeTube(sparLine, 0.03, '#E0D4FF', 0.95));
  } else {
    const mainWingTEnd = cutaway ? 0.74 : 0.76;
    root.add(makeWingSurface(MAIN_WING, 0, mainWingTEnd, 1, '#7B60B5', cutaway ? 0.18 : 0.36));
    root.add(makeWingSurface(MAIN_WING, 0, mainWingTEnd, -1, '#4D3A79', cutaway ? 0.1 : 0.2));
    addWingRibs(root, 9, MAIN_WING, exploded, '#BEB0FF');
    addWingSpars(root, MAIN_WING, [0.28, 0.67], exploded);
    addFuselageFrames(root, exploded, !cutaway);
    addSmallTail(root);

    const hingeZ = wingPoint(0, 0.76, 1, MAIN_WING).z;
    aileron = new THREE.Group();
    aileron.position.z = hingeZ;
    aileron.add(makeWingSurface(MAIN_WING, 0.76, 0.96, 1, '#AD8BEB', cutaway ? 0.16 : 0.58, hingeZ));
    aileron.add(makeWingSurface(MAIN_WING, 0.76, 0.96, -1, '#6A4DA3', cutaway ? 0.1 : 0.33, hingeZ));
    const hingePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i += 1) {
      const x = -MAIN_WING.halfSpan + (2 * MAIN_WING.halfSpan * i) / 32;
      const p = wingPoint(x, 0.76, 1, MAIN_WING);
      p.y += 0.015;
      hingePoints.push(new THREE.Vector3(p.x, p.y, p.z - hingeZ));
    }
    aileron.add(makeTube(hingePoints, 0.014, '#E4DAFF', 0.95));
    root.add(aileron);
  }

  addHotspotMarkers(root, hotspotMeshes, stageIndex);
  return { root, hotspotMeshes, aileron };
}

export const Workbench3DViewport: React.FC<Workbench3DViewportProps> = ({
  activeStepIndex,
  selectedHotspot,
  hotspots,
  onSelectHotspot,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('3D');
  const [exploded, setExploded] = useState(false);
  const [cutaway, setCutaway] = useState(false);
  const [zoomed2D, setZoomed2D] = useState(false);
  const [deflectionAngle, setDeflectionAngle] = useState(0);
  const [webglError, setWebglError] = useState(false);
  const viewModeRef = useRef<ViewMode>('3D');
  viewModeRef.current = viewMode;
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const hotspotMeshesRef = useRef<THREE.Mesh[]>([]);
  const aileronRef = useRef<THREE.Group | null>(null);
  const downPointRef = useRef<{ x: number; y: number } | null>(null);
  const selectHotspotRef = useRef(onSelectHotspot);

  useEffect(() => { selectHotspotRef.current = onSelectHotspot; }, [onSelectHotspot]);

  const resetCamera = useCallback(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.set(7.2, 5.4, 7.1);
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#090611');
      scene.fog = new THREE.Fog('#090611', 12, 28);
      camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(7.2, 5.4, 7.1);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.domElement.className = 'workbench-3d-canvas';
      renderer.domElement.setAttribute('aria-label', 'Interactive illustrative 3D airframe workbench; drag to orbit and use the scroll wheel to zoom');
      mount.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.075;
      controls.minDistance = 5.2;
      controls.maxDistance = 16;
      controls.target.set(0, 0, 0);
      controls.update();

      scene.add(new THREE.HemisphereLight('#D8C9FF', '#170C25', 1.75));
      const keyLight = new THREE.DirectionalLight('#F0E5FF', 2.1);
      keyLight.position.set(4, 7, 5);
      scene.add(keyLight);
      const violetLight = new THREE.PointLight('#9560F3', 24, 18, 2);
      violetLight.position.set(-4, 2.8, -2.6);
      scene.add(violetLight);
      const magentaLight = new THREE.PointLight('#C84EBD', 12, 14, 2);
      magentaLight.position.set(3, -0.8, 3.8);
      scene.add(magentaLight);

      const grid = new THREE.GridHelper(16, 32, '#57407A', '#251936');
      grid.position.y = -1.05;
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      gridMaterials.forEach((entry) => { entry.transparent = true; entry.opacity = 0.34; });
      scene.add(grid);

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      controlsRef.current = controls;
      setWebglError(false);

      const resize = () => {
        if (!mount || !rendererRef.current || !cameraRef.current) return;
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      let animationFrame = 0;
      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate);
        if (viewModeRef.current === '3D') {
          controls.update();
          renderer.render(scene, camera);
        }
      };
      animate();

      const onPointerDown = (event: PointerEvent) => {
        downPointRef.current = { x: event.clientX, y: event.clientY };
      };
      const onPointerUp = (event: PointerEvent) => {
        const down = downPointRef.current;
        downPointRef.current = null;
        if (!down || Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const pointer = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(hotspotMeshesRef.current, false)[0];
        const id = hit?.object.userData.hotspotId as string | undefined;
        const hotspot = hotspots.find((item) => item.id === id);
        if (hotspot) selectHotspotRef.current(hotspot);
      };
      renderer.domElement.addEventListener('pointerdown', onPointerDown);
      renderer.domElement.addEventListener('pointerup', onPointerUp);

      return () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointerup', onPointerUp);
        controls.dispose();
        if (modelRef.current) disposeGroup(modelRef.current);
        renderer.dispose();
        renderer.domElement.remove();
        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        controlsRef.current = null;
        modelRef.current = null;
        hotspotMeshesRef.current = [];
        aileronRef.current = null;
      };
    } catch (error) {
      console.error('3D workbench could not initialize:', error);
      setWebglError(true);
      return;
    }
  }, [hotspots]);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      disposeGroup(modelRef.current);
    }
    const model = buildWorkbenchModel(activeStepIndex, exploded, cutaway);
    modelRef.current = model.root;
    hotspotMeshesRef.current = model.hotspotMeshes;
    aileronRef.current = model.aileron;
    sceneRef.current.add(model.root);
  }, [activeStepIndex, exploded, cutaway]);

  useEffect(() => {
    if (aileronRef.current) aileronRef.current.rotation.x = THREE.MathUtils.degToRad(deflectionAngle);
  }, [deflectionAngle]);

  useEffect(() => {
    hotspotMeshesRef.current.forEach((marker) => {
      const isSelected = marker.userData.hotspotId === selectedHotspot.id;
      marker.scale.setScalar(isSelected ? 1.42 : 1);
      const markerMaterial = marker.material as THREE.MeshStandardMaterial;
      markerMaterial.color.set(isSelected ? '#F6EFFF' : '#B9A0FF');
      markerMaterial.emissive.set(isSelected ? '#9B63F5' : '#7040C8');
      markerMaterial.emissiveIntensity = isSelected ? 1.35 : 0.8;
    });
    modelRef.current?.children.forEach((child) => {
      const ringId = child.userData.hotspotRingId as string | undefined;
      if (!ringId || !(child instanceof THREE.Mesh)) return;
      const ringMaterial = child.material as THREE.MeshBasicMaterial;
      ringMaterial.color.set(ringId === selectedHotspot.id ? '#F3EAFF' : '#A991FF');
      ringMaterial.opacity = ringId === selectedHotspot.id ? 1 : 0.72;
    });
  }, [selectedHotspot.id, activeStepIndex, exploded, cutaway]);

  useEffect(() => {
    setExploded(false);
    setCutaway(false);
    setDeflectionAngle(0);
  }, [activeStepIndex]);

  const zoom2D = () => setZoomed2D((value) => !value);

  return (
    <div className="aero-gloss-panel relative overflow-hidden rounded-xl border border-[#39284F] bg-[#090611] shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#241831] bg-[#0B0812]/95 p-2.5">
        <div className="flex items-center gap-1 rounded-lg border border-[#342447] bg-[#07050B] p-1" role="group" aria-label="Workbench display mode">
          <button type="button" onClick={() => setViewMode('3D')} aria-pressed={viewMode === '3D'} className={`rounded-md px-3 py-1.5 text-[11px] font-mono transition-colors ${viewMode === '3D' ? 'bg-[#B9A0FF] text-[#120A20]' : 'text-[#B6A6CE] hover:text-white'}`}>
            <Box className="mr-1 inline h-3.5 w-3.5" /> 3D VIEW
          </button>
          <button type="button" onClick={() => setViewMode('2D')} aria-pressed={viewMode === '2D'} className={`rounded-md px-3 py-1.5 text-[11px] font-mono transition-colors ${viewMode === '2D' ? 'bg-[#B9A0FF] text-[#120A20]' : 'text-[#B6A6CE] hover:text-white'}`}>
            2D BLUEPRINT
          </button>
        </div>
        {viewMode === '3D' ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" onClick={() => setExploded((value) => !value)} aria-pressed={exploded} className={`workbench-tool-button ${exploded ? 'is-active' : ''}`} title="Separate structural parts">
              <Layers3 className="h-3.5 w-3.5" /> EXPLODE
            </button>
            <button type="button" onClick={() => setCutaway((value) => !value)} aria-pressed={cutaway} className={`workbench-tool-button ${cutaway ? 'is-active' : ''}`} title="Reveal internal structure">
              <Scan className="h-3.5 w-3.5" /> CUTAWAY
            </button>
            <button type="button" onClick={resetCamera} className="workbench-tool-button" title="Reset camera">
              <RotateCcw className="h-3.5 w-3.5" /> RESET
            </button>
          </div>
        ) : (
          <button type="button" onClick={zoom2D} className="workbench-tool-button" title="Zoom blueprint">
            {zoomed2D ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />} {zoomed2D ? 'ZOOM OUT' : 'ZOOM IN'}
          </button>
        )}
      </div>

      <div className={`relative ${viewMode === '3D' ? '' : 'hidden'}`}>
        <div ref={mountRef} className={`workbench-3d-stage h-[360px] sm:h-[480px] ${webglError ? 'hidden' : ''}`} />
        {webglError && (
          <div className="flex h-[360px] flex-col items-center justify-center gap-3 px-8 text-center sm:h-[480px]">
            <Box className="h-9 w-9 text-[#B9A0FF]" />
            <h4 className="font-display text-lg font-bold text-[#F4F2FF]">3D preview unavailable</h4>
            <p className="max-w-sm text-xs leading-relaxed text-[#B6A6CE]">WebGL could not be started in this browser. Switch to the 2D blueprint to continue using the workbench.</p>
            <button type="button" onClick={() => setViewMode('2D')} className="workbench-tool-button is-active">OPEN 2D BLUEPRINT</button>
          </div>
        )}
        {!webglError && (
          <>
            <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/10 bg-[#090611]/75 px-2 py-1 text-[9px] font-mono tracking-wide text-[#CBB9F8] backdrop-blur-sm">
              PROCEDURAL ENGINEERING MODEL · NOT EXACT CAD
            </div>
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/10 bg-[#090611]/75 px-2 py-1.5 text-[10px] font-mono text-[#C1B1DF] backdrop-blur-sm">
              <Crosshair className="h-3.5 w-3.5 text-[#C1A8FF]" /> DRAG TO ORBIT · SCROLL TO ZOOM · CLICK HOTSPOTS
            </div>
            <button type="button" onClick={resetCamera} className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-[#090611]/80 p-2 text-[#C7B2F3] backdrop-blur-sm transition-colors hover:text-white" aria-label="Reset 3D view" title="Reset 3D view">
              <Maximize2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {viewMode === '2D' && (
        <div className="relative h-[360px] cursor-zoom-in overflow-hidden bg-[#090611] sm:h-[480px]" onClick={zoom2D}>
          <div className={`absolute inset-0 transition-transform duration-300 ${zoomed2D ? 'scale-125 cursor-zoom-out' : ''}`}>
            <SafeImage
              src="/images/cad-workbench-blueprint.png"
              alt="Technical 2D blueprint for the cardboard aircraft workbench"
              fallbackTitle="Cardboard Airframe Assembly Blueprint"
              containerClassName="h-full w-full"
              className="h-full w-full object-contain p-2"
            />
            {hotspots.map((spot) => (
              <button
                type="button"
                key={spot.id}
                onClick={(event) => { event.stopPropagation(); onSelectHotspot(spot); }}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border p-1.5 transition-all ${selectedHotspot.id === spot.id ? 'scale-125 border-white bg-[#B9A0FF] shadow-[0_0_16px_#B9A0FF]' : 'border-[#B9A0FF]/80 bg-[#090611]/85 text-[#B9A0FF] hover:scale-110'}`}
                aria-label={`Inspect ${spot.title}`}
                title={spot.title}
              >
                <Crosshair className={`h-3.5 w-3.5 ${selectedHotspot.id === spot.id ? 'text-[#11091C]' : 'text-[#C9B8FF]'}`} />
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/10 bg-[#090611]/80 px-2 py-1.5 text-[10px] font-mono text-[#C1B1DF]">
            2D REFERENCE · CLICK A HOTSPOT TO INSPECT
          </div>
        </div>
      )}

      {activeStepIndex === 4 && viewMode === '3D' && !webglError && (
        <div className="flex flex-wrap items-center gap-3 border-t border-[#241831] bg-[#0B0812] px-4 py-3">
          <label htmlFor="aileron-deflection" className="whitespace-nowrap text-[10px] font-mono tracking-wide text-[#BCA8E8]">AILERON DEFLECTION</label>
          <input id="aileron-deflection" aria-label="Illustrative aileron deflection angle" type="range" min="-20" max="20" step="1" value={deflectionAngle} onChange={(event) => setDeflectionAngle(Number(event.target.value))} className="min-w-[110px] flex-1 accent-[#B9A0FF]" />
          <span className="min-w-[42px] text-right text-xs font-mono tabular-nums text-[#F1E9FF]">{deflectionAngle}°</span>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#241831] bg-[#090611] px-4 py-2 text-[10px] font-mono text-[#8F7CAD]">
        <span>STAGE {String(activeStepIndex + 1).padStart(2, '0')} / 05</span>
        <span>{viewMode === '3D' ? (exploded ? 'EXPLODED ASSEMBLY' : cutaway ? 'INTERNAL STRUCTURE' : 'INTERACTIVE ASSEMBLY') : 'BLUEPRINT REFERENCE'}</span>
      </div>
    </div>
  );
};

function disposeGroup(group: THREE.Group) {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineLoop) {
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((entry) => entry.dispose());
    }
  });
}
