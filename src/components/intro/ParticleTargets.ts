// ParticleTargets.ts
// Deterministic 2D/3D Point Generators for the 8 Master Visual Shapes:
// 1. BRAIN: Recognizable anatomical lateral brain profile (cortex gyri, cerebellum, stem)
// 2. SCATTER: Dispersed particle field representing fragmented raw customer signals
// 3. CLUSTERS: 4 distinct semantic clustering hubs (Refund, Delivery, Payments, Quality)
// 4. BULB: Unmistakable incandescent lightbulb (teardrop glass, glowing coiled filament, screw base)
// 5. INVESTIGATION: 7-node connected investigation network (Intake, Classify, Order, Customer, Policy, Cases, Rec)
// 6. RECOMMENDATION: Convergent directional funnel pointing toward the recommended action
// 7. APPROVAL_GATE: Amber vertical decision barrier with paused flow
// 8. RESOLUTION: Harmonic coherent concentric ring / verified resolution geometry

export interface TargetPoint {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  alpha: number;
}

// Pseudo-random deterministic generator with seed
function createSeededRandom(seed = 1337) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ----------------------------------------------------------------------
// 1. BRAIN TARGETS (Hero: Recognizable Lateral Human Brain Profile)
// ----------------------------------------------------------------------
export function generateBrainPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(101);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const brainRadius = Math.min(width * (isSmall ? 0.38 : 0.22), height * 0.32, 220);
  const centerX = isSmall ? 0 : Math.min(width * 0.18, 220); // Right side on desktop
  const centerY = 0;

  // Lateral silhouette boundary formula
  const getProfile = (t: number) => {
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    let r = 1.0;

    // High parietal crown (top)
    if (sinT < -0.2) r = 1.06 + Math.abs(cosT) * 0.08;
    // Frontal lobe expansion (right)
    if (cosT > 0.35 && Math.abs(sinT) < 0.6) r = 1.14;
    // Temporal lobe hook (bottom right)
    if (cosT > 0.1 && sinT > 0.35) r = 0.90;
    // Occipital lobe (left)
    if (cosT < -0.3) r = 1.04;
    // Cerebellar indentation (bottom left)
    if (cosT < 0 && sinT > 0.4) r = 0.74;

    return {
      x: cosT * brainRadius * 1.16 * r,
      y: sinT * brainRadius * 0.92 * r,
    };
  };

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let color = '#8052ff';
    let size = 3.6 + rand() * 2.4;
    let alpha = 0.85;

    if (i < count * 0.26) {
      // 1. Outer Perimeter Contour (crisp anatomical brain edge)
      const t = (i / (count * 0.26)) * Math.PI * 2;
      const prof = getProfile(t);
      const depthAngle = (rand() - 0.5) * Math.PI * 0.7;
      const ripple = Math.sin(t * 14) * 4;

      x = centerX + prof.x * Math.cos(depthAngle * 0.35) + ripple;
      y = centerY + prof.y + ripple * 0.6;
      z = Math.sin(depthAngle) * brainRadius * 0.35;

      // Color coding: Amber top crown, White highlights, Violet body
      if (y < -brainRadius * 0.36) {
        color = rand() > 0.3 ? '#ffb829' : '#ffdb4d'; // Amber crown
      } else if (x > centerX + brainRadius * 0.5) {
        color = '#ffb829'; // Frontal apex
      } else if (rand() < 0.3) {
        color = '#ffffff';
      } else {
        color = '#8052ff';
      }
    } else if (i < count * 0.62) {
      // 2. Convoluted Sulci & Gyri Folding Ribbons
      const sulcusIdx = i % 7;
      const prog = rand();
      const depthAngle = (rand() - 0.5) * Math.PI * 0.65;

      let sx = 0;
      let sy = 0;

      if (sulcusIdx === 0) {
        // Central Sulcus (crown to lateral fissure)
        sx = -brainRadius * 0.05 + Math.sin(prog * Math.PI * 3) * 12;
        sy = -brainRadius * 0.65 + prog * brainRadius * 0.85;
      } else if (sulcusIdx === 1) {
        // Precentral Gyrus (parallel frontal)
        sx = brainRadius * 0.22 + Math.cos(prog * Math.PI * 3.5) * 10;
        sy = -brainRadius * 0.6 + prog * brainRadius * 0.8;
      } else if (sulcusIdx === 2) {
        // Sylvian Fissure (horizontal lateral groove)
        sx = -brainRadius * 0.35 + prog * brainRadius * 0.8;
        sy = brainRadius * 0.10 + Math.sin(prog * Math.PI * 2.5) * 10;
      } else if (sulcusIdx === 3) {
        // Temporal convolution
        sx = -brainRadius * 0.25 + prog * brainRadius * 0.7;
        sy = brainRadius * 0.26 + Math.cos(prog * Math.PI * 3) * 8;
      } else if (sulcusIdx === 4) {
        // Parieto-occipital fissure
        sx = -brainRadius * 0.42 + Math.sin(prog * Math.PI * 2) * 14;
        sy = -brainRadius * 0.5 + prog * brainRadius * 0.65;
      } else if (sulcusIdx === 5) {
        // Superior frontal gyrus
        sx = brainRadius * 0.12 + prog * brainRadius * 0.48;
        sy = -brainRadius * 0.42 + Math.sin(prog * Math.PI * 3) * 10;
      } else {
        // Inferior frontal
        sx = brainRadius * 0.2 + prog * brainRadius * 0.4;
        sy = -brainRadius * 0.12 + Math.cos(prog * Math.PI * 3) * 10;
      }

      x = centerX + sx + (rand() - 0.5) * 8;
      y = centerY + sy + (rand() - 0.5) * 8;
      z = Math.sin(depthAngle) * brainRadius * 0.34;

      if (y < -brainRadius * 0.25) {
        color = rand() > 0.35 ? '#ffb829' : '#ffffff';
      } else if (sulcusIdx === 2) {
        color = '#2de0c2'; // Vivid cyan in Sylvian fissure
      } else if (rand() < 0.25) {
        color = '#ffffff';
      } else {
        color = '#8052ff';
      }
    } else if (i < count * 0.80) {
      // 3. Cerebellum (Tucked horizontal folia ripples under occipital lobe)
      const layer = i % 10;
      const prog = rand();
      const layerY = brainRadius * 0.34 + (layer / 10) * brainRadius * 0.28;
      const layerWidth = Math.sin((layer / 10) * Math.PI) * brainRadius * 0.44;

      const cx = -brainRadius * 0.38 + (prog - 0.5) * layerWidth;
      const ripple = Math.sin(prog * Math.PI * 8) * 3;
      const depthAngle = (rand() - 0.5) * Math.PI * 0.65;

      x = centerX + cx;
      y = centerY + layerY + ripple;
      z = Math.sin(depthAngle) * brainRadius * 0.24;

      color = rand() > 0.4 ? '#ffb829' : '#8052ff';
      size = 3.2 + rand() * 2.0;
    } else if (i < count * 0.88) {
      // 4. Brain Stem (Pons & Medulla descending column)
      const prog = (i - count * 0.80) / (count * 0.08);
      const angle = rand() * Math.PI * 2;
      const stemR = (brainRadius * 0.09) * (1 - prog * 0.25);

      x = centerX - brainRadius * 0.05 + Math.cos(angle) * stemR;
      y = centerY + brainRadius * 0.40 + prog * (brainRadius * 0.44);
      z = Math.sin(angle) * stemR * 0.8;

      color = prog > 0.5 ? '#15846e' : '#8052ff';
      size = 3.0 + rand() * 1.8;
    } else {
      // 5. Ambient Cortex Internal Glow
      const u = rand();
      const v = rand();
      const prof = getProfile(u * Math.PI * 2);
      const rad = Math.pow(v, 0.6) * 0.85;
      const depthAngle = (rand() - 0.5) * Math.PI * 0.75;

      x = centerX + prof.x * rad;
      y = centerY + prof.y * rad;
      z = Math.sin(depthAngle) * brainRadius * 0.30 * rad;

      color = rand() > 0.5 ? '#8052ff' : '#2de0c2';
      size = 3.2 + rand() * 2.0;
    }

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}

// ----------------------------------------------------------------------
// 2. SCATTER TARGETS (Scene 2: Dispersed Fragmented Customer Signals)
// ----------------------------------------------------------------------
export function generateScatterPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(202);
  const points: TargetPoint[] = [];

  const spreadX = width * 0.44;
  const spreadY = height * 0.38;

  for (let i = 0; i < count; i++) {
    // Distributed in organic floating drifts across the viewport
    const u = rand();
    const v = rand();
    const angle = u * Math.PI * 2;
    const dist = Math.pow(v, 0.55);

    const x = Math.cos(angle) * spreadX * dist + (rand() - 0.5) * 40;
    const y = Math.sin(angle) * spreadY * dist + (rand() - 0.5) * 40;
    const z = (rand() - 0.5) * 350;

    let color = '#8052ff';
    const r = rand();
    if (r > 0.75) color = '#ffb829'; // Amber signal
    else if (r > 0.55) color = '#2de0c2'; // Teal signal
    else if (r > 0.40) color = '#ffffff'; // White signal
    else color = '#8052ff'; // Violet signal

    const size = 3.2 + rand() * 2.2;
    const alpha = 0.55 + rand() * 0.40;

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}

// ----------------------------------------------------------------------
// 3. CLUSTERS TARGETS (Scene 3 & 4: 4 Distinct Semantic Pattern Hubs)
// ----------------------------------------------------------------------
export function generateClusterPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(303);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const spanX = Math.min(width * (isSmall ? 0.35 : 0.28), 320);
  const spanY = Math.min(height * 0.26, 180);
  const clusterCenterX = isSmall ? 0 : Math.min(width * 0.12, 160);

  // 4 Cluster Centers:
  // 1. Refund Delays (Top-Right, Amber Spike)
  // 2. Delivery Stalls (Bottom-Right, Warm Amber/Gold)
  // 3. Payment Disputes (Top-Left, Violet)
  // 4. Transit Damage (Bottom-Left, Teal)
  const hubs = [
    { x: clusterCenterX + spanX * 0.65, y: -spanY * 0.65, z: 20, color: '#ffb829', radius: 72, name: 'Refund' },
    { x: clusterCenterX + spanX * 0.70, y: spanY * 0.60, z: -10, color: '#ff8e52', radius: 64, name: 'Delivery' },
    { x: clusterCenterX - spanX * 0.60, y: -spanY * 0.55, z: 15, color: '#8052ff', radius: 58, name: 'Payments' },
    { x: clusterCenterX - spanX * 0.55, y: spanY * 0.65, z: -15, color: '#2de0c2', radius: 54, name: 'Damage' },
  ];

  for (let i = 0; i < count; i++) {
    // 78% of particles gravitate densely into the 4 hubs; 22% form connective satellite bridges
    if (i < count * 0.78) {
      const hubIdx = i % 4;
      const h = hubs[hubIdx];
      const r = Math.pow(rand(), 0.65) * h.radius;
      const theta = rand() * Math.PI * 2;

      // Slight elliptical clustering
      const x = h.x + Math.cos(theta) * r * 1.15;
      const y = h.y + Math.sin(theta) * r * 0.95;
      const z = h.z + (rand() - 0.5) * 45;

      const color = rand() > 0.25 ? h.color : '#ffffff';
      const size = 3.6 + rand() * 2.6;
      const alpha = 0.85;

      points.push({ x, y, z, color, size, alpha });
    } else {
      // Connective orbital bridges between clusters
      const h1 = hubs[i % 4];
      const h2 = hubs[(i + 1) % 4];
      const t = rand();

      const x = h1.x + (h2.x - h1.x) * t + (rand() - 0.5) * 25;
      const y = h1.y + (h2.y - h1.y) * t + (rand() - 0.5) * 25;
      const z = (rand() - 0.5) * 60;

      const color = rand() > 0.5 ? '#8052ff' : '#2de0c2';
      const size = 2.8 + rand() * 1.6;
      const alpha = 0.60;

      points.push({ x, y, z, color, size, alpha });
    }
  }

  return points;
}

// ----------------------------------------------------------------------
// 4. BULB TARGETS (Scene 5 & 6: Iconic Incandescent Light Bulb)
// ----------------------------------------------------------------------
export function generateBulbPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(404);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const bulbScale = Math.min(width * (isSmall ? 0.36 : 0.24), height * 0.34, 220);
  const centerX = isSmall ? 0 : Math.min(width * 0.16, 200); // Placed right on desktop
  const centerY = -10;

  for (let i = 0; i < count; i++) {
    let lx = 0;
    let ly = 0;
    let lz = 0;
    let color = '#ffb829';
    let size = 3.8 + rand() * 2.4;
    let alpha = 0.85;

    if (i < count * 0.44) {
      // 1. Bulb Teardrop Glass Envelope (Spherical top dome tapering into neck)
      const t = (i / (count * 0.44)) * Math.PI * 1.55 - Math.PI * 0.28;
      const a = rand() * Math.PI * 2;
      let r = bulbScale * 0.48;
      let neckY = -Math.sin(t) * r;

      if (neckY > bulbScale * 0.14) {
        const taper = 1 - (neckY - bulbScale * 0.14) / (bulbScale * 0.34) * 0.52;
        r *= Math.max(0.44, taper);
      }

      lx = Math.cos(a) * Math.cos(t) * r;
      ly = neckY;
      lz = Math.sin(a) * Math.cos(t) * r * 0.80;

      if (ly < -bulbScale * 0.18) {
        color = '#ffb829'; // Glowing amber dome
      } else if (ly < bulbScale * 0.12) {
        color = rand() > 0.3 ? '#ffffff' : '#ffb829'; // White glass glare
      } else {
        color = '#8052ff'; // Violet neck
      }
    } else if (i < count * 0.68) {
      // 2. Coiled Incandescent Tungsten Filament (Lead rods + M-loop bridge)
      const sub = i - count * 0.44;
      const subTotal = count * 0.24;

      if (sub < subTotal * 0.25) {
        // Left lead support post
        const p = sub / (subTotal * 0.25);
        lx = -bulbScale * 0.12;
        ly = bulbScale * 0.24 - p * bulbScale * 0.38;
        color = '#ffffff';
      } else if (sub < subTotal * 0.50) {
        // Right lead support post
        const p = (sub - subTotal * 0.25) / (subTotal * 0.25);
        lx = bulbScale * 0.12;
        ly = bulbScale * 0.24 - p * bulbScale * 0.38;
        color = '#ffffff';
      } else {
        // Glowing looped tungsten filament coil
        const p = (sub - subTotal * 0.50) / (subTotal * 0.50);
        const arch = Math.sin(p * Math.PI);
        const coilWave = Math.sin(p * Math.PI * 12) * 6;

        lx = (-0.14 + p * 0.28) * bulbScale;
        ly = -bulbScale * 0.14 - arch * bulbScale * 0.20 + coilWave * 0.3;
        lz = Math.cos(p * Math.PI * 12) * 6;

        color = rand() > 0.2 ? '#ffdb4d' : '#ffffff'; // Blazing incandescent gold/white
        size = 4.8 + rand() * 2.6;
      }
    } else if (i < count * 0.90) {
      // 3. Threaded Screw Collar (Edison metal base with helical ridges)
      const prog = (i - count * 0.68) / (count * 0.22);
      const collarY = bulbScale * 0.30 + prog * bulbScale * 0.30;
      const threadAngle = prog * Math.PI * 10;
      const collarR = bulbScale * 0.19;
      const threadWave = Math.sin(threadAngle) * 4;
      const a = rand() * Math.PI * 2;

      lx = Math.cos(a) * (collarR + threadWave);
      ly = collarY;
      lz = Math.sin(a) * (collarR + threadWave) * 0.85;

      color = '#8052ff'; // Violet screw metal
    } else {
      // 4. Electrical Contact Base Tip
      const prog = (i - count * 0.90) / (count * 0.10);
      const tipY = bulbScale * 0.60 + prog * bulbScale * 0.12;
      const tipR = bulbScale * 0.11 * (1 - prog * 0.8);
      const a = rand() * Math.PI * 2;

      lx = Math.cos(a) * tipR;
      ly = tipY;
      lz = Math.sin(a) * tipR * 0.85;

      color = '#15846e'; // Deep verdant contact point
    }

    points.push({
      x: centerX + lx,
      y: centerY + ly,
      z: lz,
      color,
      size,
      alpha,
    });
  }

  return points;
}

// ----------------------------------------------------------------------
// 5. INVESTIGATION TARGETS (Scene 7 & 8: 7-Node Reasoner Graph)
// ----------------------------------------------------------------------
export function generateInvestigationPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(505);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const netW = Math.min(width * (isSmall ? 0.40 : 0.28), 340);
  const netH = Math.min(height * 0.34, 220);
  const centerX = isSmall ? 0 : Math.min(width * 0.16, 200);
  const centerY = 0;

  // 7 Structured Reasoner Nodes:
  // Node 0: INTAKE (top-center)
  // Node 1: CLASSIFY (mid-left)
  // Node 2: ORDER CONTEXT (mid-right)
  // Node 3: CUSTOMER 360 (center)
  // Node 4: POLICY ENGINE (lower-left)
  // Node 5: SIMILAR CASES (lower-right)
  // Node 6: REASONING CORE (bottom-center)
  const nodes = [
    { x: centerX, y: centerY - netH * 0.70, z: 20, color: '#8052ff', label: 'Intake' },
    { x: centerX - netW * 0.55, y: centerY - netH * 0.25, z: -10, color: '#2de0c2', label: 'Classify' },
    { x: centerX + netW * 0.55, y: centerY - netH * 0.25, z: 10, color: '#2de0c2', label: 'Order' },
    { x: centerX, y: centerY, z: 25, color: '#ffffff', label: 'Customer360' },
    { x: centerX - netW * 0.45, y: centerY + netH * 0.45, z: -15, color: '#15846e', label: 'Policy' },
    { x: centerX + netW * 0.45, y: centerY + netH * 0.45, z: 15, color: '#8052ff', label: 'Similar' },
    { x: centerX, y: centerY + netH * 0.75, z: 30, color: '#ffb829', label: 'Reason' },
  ];

  // Graph edges connecting nodes
  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 3], [2, 3],
    [3, 4], [3, 5],
    [4, 6], [5, 6], [3, 6],
  ];

  for (let i = 0; i < count; i++) {
    if (i < count * 0.55) {
      // 55% Clustered into the 7 reasoner nodes
      const nIdx = i % 7;
      const node = nodes[nIdx];
      const r = Math.pow(rand(), 0.7) * (nIdx === 6 || nIdx === 3 ? 42 : 32);
      const theta = rand() * Math.PI * 2;

      const x = node.x + Math.cos(theta) * r;
      const y = node.y + Math.sin(theta) * r;
      const z = node.z + (rand() - 0.5) * 30;

      const color = rand() > 0.3 ? node.color : '#ffffff';
      const size = 3.8 + rand() * 2.4;
      const alpha = 0.90;

      points.push({ x, y, z, color, size, alpha });
    } else {
      // 45% Flowing along graph edges like active data packets
      const edgeIdx = i % edges.length;
      const [fromIdx, toIdx] = edges[edgeIdx];
      const n1 = nodes[fromIdx];
      const n2 = nodes[toIdx];
      const t = rand();

      const x = n1.x + (n2.x - n1.x) * t + (rand() - 0.5) * 12;
      const y = n1.y + (n2.y - n1.y) * t + (rand() - 0.5) * 12;
      const z = n1.z + (n2.z - n1.z) * t + (rand() - 0.5) * 12;

      const color = rand() > 0.5 ? n1.color : n2.color;
      const size = 3.0 + rand() * 1.8;
      const alpha = 0.75;

      points.push({ x, y, z, color, size, alpha });
    }
  }

  return points;
}

// ----------------------------------------------------------------------
// 6. RECOMMENDATION TARGETS (Scene 9: Convergent Funnel)
// ----------------------------------------------------------------------
export function generateRecommendationPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(606);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const radius = Math.min(width * (isSmall ? 0.36 : 0.22), height * 0.30, 200);
  const centerX = isSmall ? 0 : Math.min(width * 0.16, 200);
  const centerY = 0;

  for (let i = 0; i < count; i++) {
    // Dynamic chevron / convergent directional arrowhead pointing forward
    const t = rand(); // 0 (tail) to 1 (arrowhead tip)
    const side = rand() > 0.5 ? 1 : -1;

    // Arrowhead arm profile
    const armX = (t - 0.4) * radius * 1.2;
    const armY = side * (1 - t) * radius * 0.85;
    const spread = (rand() - 0.5) * 18;

    const x = centerX + armX + spread;
    const y = centerY + armY + spread;
    const z = (rand() - 0.5) * 40;

    let color = '#8052ff';
    if (t > 0.7) color = '#ffb829'; // Amber tip
    else if (t > 0.4) color = '#ffffff'; // White core
    else color = '#8052ff';

    const size = 3.6 + rand() * 2.4;
    const alpha = 0.85;

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}

// ----------------------------------------------------------------------
// 7. APPROVAL GATE TARGETS (Scene 10: Amber Decision Barrier)
// ----------------------------------------------------------------------
export function generateApprovalGatePoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(707);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const gateHeight = Math.min(height * 0.70, 480);
  const gateX = isSmall ? 0 : Math.min(width * 0.16, 200);
  const centerY = 0;

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let color = '#ffb829';
    let size = 3.8 + rand() * 2.4;
    let alpha = 0.90;

    if (i < count * 0.65) {
      // 1. Vertical Amber Boundary Columns (The Decision Wall)
      const col = (i % 3) - 1; // -1, 0, 1
      const prog = (i / (count * 0.65));
      const py = (prog - 0.5) * gateHeight;

      x = gateX + col * 18 + (rand() - 0.5) * 8;
      y = centerY + py;
      z = (rand() - 0.5) * 35;

      color = rand() > 0.25 ? '#ffb829' : '#ffffff';
    } else {
      // 2. Paused / Hovering Particle Swarm before the Gate
      const side = rand() > 0.6 ? 1 : -1;
      const dist = 30 + rand() * 120;
      const angle = (rand() - 0.5) * Math.PI * 0.8;

      x = gateX - dist;
      y = centerY + Math.sin(angle) * (gateHeight * 0.45);
      z = (rand() - 0.5) * 60;

      color = rand() > 0.5 ? '#8052ff' : '#ffb829';
      alpha = 0.75;
    }

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}

// ----------------------------------------------------------------------
// 8. RESOLUTION TARGETS (Scene 11: Concentric Harmonic Resolution Ring)
// ----------------------------------------------------------------------
export function generateResolutionPoints(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(808);
  const points: TargetPoint[] = [];

  const radius = Math.min(width * 0.22, height * 0.30, 200);
  const centerX = 0; // Centered
  const centerY = 0;

  for (let i = 0; i < count; i++) {
    // 3 Concentric Rings of verified resolution
    const ringIdx = i % 3;
    const rBase = ringIdx === 0 ? radius : ringIdx === 1 ? radius * 0.68 : radius * 0.36;
    const theta = rand() * Math.PI * 2;
    const wave = Math.sin(theta * 8) * 4;

    const r = rBase + wave + (rand() - 0.5) * 8;
    const x = centerX + Math.cos(theta) * r;
    const y = centerY + Math.sin(theta) * r;
    const z = (rand() - 0.5) * 35;

    let color = '#15846e'; // Deep Verdant (Safe / Resolved)
    if (ringIdx === 0) color = rand() > 0.3 ? '#8052ff' : '#2de0c2';
    else if (ringIdx === 1) color = rand() > 0.3 ? '#15846e' : '#2de0c2';
    else color = '#ffffff';

    const size = 3.6 + rand() * 2.2;
    const alpha = 0.85;

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}
