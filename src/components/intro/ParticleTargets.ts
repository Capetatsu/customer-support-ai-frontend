// ParticleTargets.ts
// Deterministic target point generators for 7 core visual shapes
// Each generator produces exactly PARTICLE_COUNT points

export interface TargetPoint {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  alpha: number;
}

// Seeded random for deterministic generation
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Sample points from a 2D shape mask (returns normalized -1 to 1 coordinates)
function sampleShapeMask(
  count: number,
  width: number,
  height: number,
  isInside: (x: number, y: number) => boolean,
  seed: number
): { x: number; y: number }[] {
  const rand = createSeededRandom(seed);
  const points: { x: number; y: number }[] = [];
  const aspect = width / height;
  const bounds = Math.max(width, height);

  while (points.length < count) {
    // Sample in normalized space
    const nx = (rand() - 0.5) * 2 * aspect;
    const ny = (rand() - 0.5) * 2;

    if (isInside(nx, ny)) {
      points.push({ x: nx, y: ny });
    }
  }

  return points;
}

// ============================================================
// 1. BRAIN - Organic lateral brain silhouette
// ============================================================
export function generateBrainTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(101);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const brainRadius = Math.min(width * (isSmall ? 0.35 : 0.2), height * 0.3, 200);
  const centerX = isSmall ? 0 : -width * 0.15;
  const centerY = 0;

  // Brain silhouette test function (lateral view)
  const isInBrain = (nx: number, ny: number) => {
    // Scale to brain radius
    const x = nx * brainRadius * 1.2;
    const y = ny * brainRadius * 0.9;

    // Brain shape: two lobes with center cleft
    const leftLobe = Math.pow(x + brainRadius * 0.15, 2) / Math.pow(brainRadius * 0.7, 2) +
                     Math.pow(y, 2) / Math.pow(brainRadius * 0.55, 2);
    const rightLobe = Math.pow(x - brainRadius * 0.15, 2) / Math.pow(brainRadius * 0.7, 2) +
                      Math.pow(y, 2) / Math.pow(brainRadius * 0.55, 2);

    // Cerebellum (bottom-left)
    const cerebellum = Math.pow(x + brainRadius * 0.4, 2) / Math.pow(brainRadius * 0.25, 2) +
                       Math.pow(y - brainRadius * 0.45, 2) / Math.pow(brainRadius * 0.2, 2);

    // Brain stem
    const stem = Math.pow(x + brainRadius * 0.05, 2) / Math.pow(brainRadius * 0.1, 2) +
                 Math.pow(y - brainRadius * 0.6, 2) / Math.pow(brainRadius * 0.3, 2);

    return leftLobe <= 1 || rightLobe <= 1 || cerebellum <= 1 || stem <= 1;
  };

  const samples = sampleShapeMask(count, width, height, isInBrain, 101);

  for (let i = 0; i < count; i++) {
    const s = samples[i];
    const depthAngle = (rand() - 0.5) * Math.PI * 0.7;
    const ripple = Math.sin((s.x + s.y) * 20) * 3;

    const x = centerX + s.x * brainRadius * 1.1 + ripple;
    const y = centerY + s.y * brainRadius * 0.9 + ripple * 0.5;
    const z = Math.sin(depthAngle) * brainRadius * 0.35;

    let color = '#8052ff';
    if (s.y < -0.3) color = rand() > 0.3 ? '#ffb829' : '#ffdb4d'; // Amber crown
    else if (s.x > 0.4) color = '#ffb829'; // Frontal
    else if (rand() < 0.25) color = '#ffffff';

    points.push({
      x, y, z,
      color,
      size: 3.5 + rand() * 2.2,
      alpha: 0.85,
    });
  }

  return points;
}

// ============================================================
// 2. SCATTER - Dispersed organic field
// ============================================================
export function generateScatterTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(202);
  const points: TargetPoint[] = [];

  const spreadX = width * 0.5;
  const spreadY = height * 0.45;

  for (let i = 0; i < count; i++) {
    const u = rand();
    const v = rand();
    const angle = u * Math.PI * 2;
    const dist = Math.pow(v, 0.5);

    const x = Math.cos(angle) * spreadX * dist + (rand() - 0.5) * 50;
    const y = Math.sin(angle) * spreadY * dist + (rand() - 0.5) * 50;
    const z = (rand() - 0.5) * 400;

    let color = '#8052ff';
    const r = rand();
    if (r > 0.75) color = '#ffb829';
    else if (r > 0.55) color = '#2de0c2';
    else if (r > 0.4) color = '#ffffff';

    points.push({
      x, y, z,
      color,
      size: 3 + rand() * 2,
      alpha: 0.5 + rand() * 0.4,
    });
  }

  return points;
}

// ============================================================
// 3. CLUSTERS - 4 semantic hubs
// ============================================================
export function generateClusterTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(303);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const spanX = Math.min(width * (isSmall ? 0.4 : 0.3), 350);
  const spanY = Math.min(height * 0.3, 200);
  const cx = isSmall ? 0 : -width * 0.1;

  // 4 cluster centers
  const hubs = [
    { x: cx + spanX * 0.6, y: -spanY * 0.55, z: 25, color: '#ffb829', radius: 80 }, // Refund
    { x: cx + spanX * 0.65, y: spanY * 0.55, z: -15, color: '#ff8e52', radius: 70 }, // Delivery
    { x: cx - spanX * 0.55, y: -spanY * 0.5, z: 20, color: '#8052ff', radius: 70 }, // Payments
    { x: cx - spanX * 0.5, y: spanY * 0.6, z: -20, color: '#2de0c2', radius: 65 }, // Quality
  ];

  for (let i = 0; i < count; i++) {
    if (i < count * 0.75) {
      // 75% in hubs
      const hubIdx = i % 4;
      const h = hubs[hubIdx];
      const r = Math.pow(rand(), 0.6) * h.radius;
      const theta = rand() * Math.PI * 2;

      const x = h.x + Math.cos(theta) * r * 1.1;
      const y = h.y + Math.sin(theta) * r * 0.9;
      const z = h.z + (rand() - 0.5) * 50;

      points.push({
        x, y, z,
        color: rand() > 0.2 ? h.color : '#ffffff',
        size: 3.5 + rand() * 2.5,
        alpha: 0.88,
      });
    } else {
      // 25% bridges between clusters
      const h1 = hubs[i % 4];
      const h2 = hubs[(i + 1) % 4];
      const t = rand();

      points.push({
        x: h1.x + (h2.x - h1.x) * t + (rand() - 0.5) * 30,
        y: h1.y + (h2.y - h1.y) * t + (rand() - 0.5) * 30,
        z: (rand() - 0.5) * 70,
        color: rand() > 0.5 ? '#8052ff' : '#2de0c2',
        size: 2.8 + rand() * 1.5,
        alpha: 0.6,
      });
    }
  }

  return points;
}

// ============================================================
// 4. BULB - Incandescent light bulb
// ============================================================
export function generateBulbTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(404);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const bulbScale = Math.min(width * (isSmall ? 0.35 : 0.22), height * 0.32, 200);
  const centerX = isSmall ? 0 : -width * 0.12;
  const centerY = -10;

  for (let i = 0; i < count; i++) {
    let lx = 0, ly = 0, lz = 0;
    let color = '#ffb829';
    let size = 3.5 + rand() * 2.2;
    let alpha = 0.85;

    if (i < count * 0.4) {
      // Bulb envelope - teardrop shape
      const t = (i / (count * 0.4)) * Math.PI * 1.5 - Math.PI * 0.25;
      const a = rand() * Math.PI * 2;
      let r = bulbScale * 0.45;
      let neckY = -Math.sin(t) * r;

      if (neckY > bulbScale * 0.1) {
        const taper = 1 - (neckY - bulbScale * 0.1) / (bulbScale * 0.35) * 0.6;
        r *= Math.max(0.35, taper);
      }

      lx = Math.cos(a) * Math.cos(t) * r;
      ly = neckY;
      lz = Math.sin(a) * Math.cos(t) * r * 0.75;

      if (ly < -bulbScale * 0.15) color = '#ffb829';
      else if (ly < bulbScale * 0.1) color = rand() > 0.3 ? '#ffffff' : '#ffb829';
      else color = '#8052ff';
    } else if (i < count * 0.6) {
      // Filament
      const sub = i - count * 0.4;
      const subTotal = count * 0.2;
      const p = sub / subTotal;

      if (p < 0.25) {
        lx = -bulbScale * 0.1;
        ly = bulbScale * 0.2 - p * bulbScale * 0.35;
        color = '#ffffff';
      } else if (p < 0.5) {
        lx = bulbScale * 0.1;
        ly = bulbScale * 0.2 - (p - 0.25) / 0.25 * bulbScale * 0.35;
        color = '#ffffff';
      } else {
        const pp = (p - 0.5) / 0.5;
        const arch = Math.sin(pp * Math.PI);
        const coil = Math.sin(pp * Math.PI * 10) * 5;

        lx = (-0.12 + pp * 0.24) * bulbScale;
        ly = -bulbScale * 0.12 - arch * bulbScale * 0.18 + coil * 0.25;
        lz = Math.cos(pp * Math.PI * 10) * 5;
        color = rand() > 0.2 ? '#ffdb4d' : '#ffffff';
        size = 4.5 + rand() * 2.5;
      }
    } else if (i < count * 0.85) {
      // Screw collar
      const prog = (i - count * 0.6) / (count * 0.25);
      const collarY = bulbScale * 0.25 + prog * bulbScale * 0.25;
      const angle = prog * Math.PI * 9;
      const r = bulbScale * 0.18;
      const wave = Math.sin(angle) * 3;
      const a = rand() * Math.PI * 2;

      lx = Math.cos(a) * (r + wave);
      ly = collarY;
      lz = Math.sin(a) * (r + wave) * 0.8;
      color = '#8052ff';
    } else {
      // Base contact
      const prog = (i - count * 0.85) / (count * 0.15);
      const tipY = bulbScale * 0.5 + prog * bulbScale * 0.12;
      const tipR = bulbScale * 0.1 * (1 - prog * 0.8);
      const a = rand() * Math.PI * 2;

      lx = Math.cos(a) * tipR;
      ly = tipY;
      lz = Math.sin(a) * tipR * 0.8;
      color = '#15846e';
    }

    points.push({
      x: centerX + lx,
      y: centerY + ly,
      z: lz,
      color, size, alpha,
    });
  }

  return points;
}

// ============================================================
// 5. INVESTIGATION - 7-node network
// ============================================================
export function generateInvestigationTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(505);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const netW = Math.min(width * (isSmall ? 0.42 : 0.3), 360);
  const netH = Math.min(height * 0.38, 240);
  const centerX = isSmall ? 0 : -width * 0.1;
  const centerY = 0;

  // 7 nodes
  const nodes = [
    { x: centerX, y: centerY - netH * 0.7, z: 20, color: '#8052ff' },      // Intake
    { x: centerX - netW * 0.55, y: centerY - netH * 0.25, z: -10, color: '#2de0c2' }, // Classify
    { x: centerX + netW * 0.55, y: centerY - netH * 0.25, z: 10, color: '#2de0c2' },  // Order
    { x: centerX, y: centerY, z: 25, color: '#ffffff' },                     // Customer360
    { x: centerX - netW * 0.45, y: centerY + netH * 0.4, z: -15, color: '#15846e' },   // Policy
    { x: centerX + netW * 0.45, y: centerY + netH * 0.4, z: 15, color: '#8052ff' },   // Similar
    { x: centerX, y: centerY + netH * 0.7, z: 30, color: '#ffb829' },       // Reason
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 3], [2, 3],
    [3, 4], [3, 5],
    [4, 6], [5, 6], [3, 6],
  ];

  for (let i = 0; i < count; i++) {
    if (i < count * 0.5) {
      // 50% in nodes
      const nIdx = i % 7;
      const node = nodes[nIdx];
      const r = Math.pow(rand(), 0.65) * (nIdx === 3 || nIdx === 6 ? 45 : 35);
      const theta = rand() * Math.PI * 2;

      points.push({
        x: node.x + Math.cos(theta) * r,
        y: node.y + Math.sin(theta) * r,
        z: node.z + (rand() - 0.5) * 35,
        color: rand() > 0.3 ? node.color : '#ffffff',
        size: 3.8 + rand() * 2.2,
        alpha: 0.9,
      });
    } else {
      // 50% on edges
      const [from, to] = edges[i % edges.length];
      const n1 = nodes[from];
      const n2 = nodes[to];
      const t = Math.pow(rand(), 0.7);

      points.push({
        x: n1.x + (n2.x - n1.x) * t + (rand() - 0.5) * 10,
        y: n1.y + (n2.y - n1.y) * t + (rand() - 0.5) * 10,
        z: n1.z + (n2.z - n1.z) * t + (rand() - 0.5) * 10,
        color: rand() > 0.4 ? n2.color : n1.color,
        size: 3 + rand() * 1.8,
        alpha: 0.75,
      });
    }
  }

  return points;
}

// ============================================================
// 6. RECOMMENDATION - Convergent funnel
// ============================================================
export function generateRecommendationTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(606);
  const points: TargetPoint[] = [];

  const isSmall = width < 1024;
  const radius = Math.min(width * (isSmall ? 0.38 : 0.24), height * 0.32, 210);
  const centerX = isSmall ? 0 : -width * 0.12;
  const centerY = 0;

  for (let i = 0; i < count; i++) {
    const t = rand(); // 0 = tail, 1 = tip
    const side = rand() > 0.5 ? 1 : -1;

    // Chevron arms converging to center
    const armX = (t - 0.35) * radius * 1.3;
    const armY = side * (1 - t) * radius * 0.9;
    const spread = (rand() - 0.5) * 20;

    const x = centerX + armX + spread;
    const y = centerY + armY + spread;
    const z = (rand() - 0.5) * 50;

    let color = '#8052ff';
    if (t > 0.75) color = '#ffb829';
    else if (t > 0.45) color = '#ffffff';

    points.push({ x, y, z, color, size: 3.5 + rand() * 2.2, alpha: 0.88 });
  }

  return points;
}

// ============================================================
// 7. RESOLUTION - Concentric harmonic rings
// ============================================================
export function generateResolutionTargets(count: number, width: number, height: number): TargetPoint[] {
  const rand = createSeededRandom(707);
  const points: TargetPoint[] = [];

  const radius = Math.min(width * 0.22, height * 0.3, 200);
  const centerX = 0;
  const centerY = 0;

  for (let i = 0; i < count; i++) {
    const ringIdx = i % 4;
    const rBase = ringIdx === 0 ? radius : ringIdx === 1 ? radius * 0.7 : ringIdx === 2 ? radius * 0.4 : radius * 0.12;
    const theta = rand() * Math.PI * 2;
    const wave = Math.sin(theta * 10) * 3;

    const r = rBase + wave + (rand() - 0.5) * 6;
    const x = centerX + Math.cos(theta) * r;
    const y = centerY + Math.sin(theta) * r;
    const z = (rand() - 0.5) * 35;

    let color = '#15846e';
    if (ringIdx === 0) color = rand() > 0.3 ? '#8052ff' : '#2de0c2';
    else if (ringIdx === 1) color = rand() > 0.3 ? '#15846e' : '#2de0c2';
    else if (ringIdx === 2) color = '#ffffff';
    else color = '#ffb829';

    const size = ringIdx === 3 ? 4.8 + rand() * 2.5 : 3.6 + rand() * 2;
    const alpha = 0.9;

    points.push({ x, y, z, color, size, alpha });
  }

  return points;
}