// ParticleEngine.ts
// Continuous Scroll-Driven 2D/3D Particle Morphing Engine
// Renders persistent triangular glyphs with spring-damping physics,
// deterministic shape targets, and bidirectional scroll interpolation.

import {
  TargetPoint,
  generateBrainPoints,
  generateScatterPoints,
  generateClusterPoints,
  generateBulbPoints,
  generateInvestigationPoints,
  generateRecommendationPoints,
  generateApprovalGatePoints,
  generateResolutionPoints,
} from './ParticleTargets';

export interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  size: number;
  targetSize: number;
  color: string;
  targetColor: string;
  opacity: number;
  targetOpacity: number;
  rotation: number;
  vRotation: number;
  hasInner: boolean;
  noiseSeedX: number;
  noiseSeedY: number;
  noiseSeedZ: number;
}

export class ParticleEngine {
  public particles: Particle[] = [];
  public width = 1200;
  public height = 800;
  public dpr = 1;
  public particleCount = 2400;
  public time = 0;
  public mouseX = -1000;
  public mouseY = -1000;

  // Perspective Camera
  public fov = 650;
  public cameraZ = 750;

  // Spring Physics Tuning
  public springStrength = 0.085;
  public damping = 0.82;
  public noiseScale = 1.4;

  // Master State Targets (8 States)
  public brainTargets: TargetPoint[] = [];
  public scatterTargets: TargetPoint[] = [];
  public clusterTargets: TargetPoint[] = [];
  public bulbTargets: TargetPoint[] = [];
  public investigationTargets: TargetPoint[] = [];
  public recommendationTargets: TargetPoint[] = [];
  public approvalTargets: TargetPoint[] = [];
  public resolutionTargets: TargetPoint[] = [];

  // Manual Test Mode (null for normal scroll control; 0..7 to freeze/test a specific shape)
  public manualTargetIndex: number | null = null;

  // Status Telemetry
  public currentSceneName = 'HERO_BRAIN';
  public transitionRatio = 0;
  public isSettled = false;

  constructor() {
    // Initialized via init()
  }

  public init(width: number, height: number, isMobile = false) {
    this.width = width;
    this.height = height;
    this.particleCount = isMobile ? 1200 : 2400;
    this.particles = [];

    // Precompute all 8 verified deterministic point cloud target maps
    this.generateAllTargets();

    // Spawn persistent particles directly at their brain target positions
    for (let i = 0; i < this.particleCount; i++) {
      const bTarget = this.brainTargets[i] || { x: 0, y: 0, z: 0, color: '#8052ff', size: 4.5, alpha: 0.85 };
      const jitter = 25; // Gentle initial jitter

      const px = bTarget.x + (Math.random() - 0.5) * jitter;
      const py = bTarget.y + (Math.random() - 0.5) * jitter;
      const pz = bTarget.z + (Math.random() - 0.5) * jitter;

      this.particles.push({
        id: i,
        x: px,
        y: py,
        z: pz,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        vz: (Math.random() - 0.5) * 1.5,
        targetX: bTarget.x,
        targetY: bTarget.y,
        targetZ: bTarget.z,
        size: bTarget.size,
        targetSize: bTarget.size,
        color: bTarget.color,
        targetColor: bTarget.color,
        opacity: bTarget.alpha,
        targetOpacity: bTarget.alpha,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.04,
        hasInner: Math.random() < 0.30,
        noiseSeedX: Math.random() * 1000,
        noiseSeedY: Math.random() * 1000,
        noiseSeedZ: Math.random() * 1000,
      });
    }
  }

  public resize(width: number, height: number, isMobile = false) {
    this.width = width;
    this.height = height;
    const count = isMobile ? 1200 : 2400;

    if (this.particleCount !== count) {
      this.init(width, height, isMobile);
      return;
    }

    this.generateAllTargets();
  }

  // Precompute target maps for all 8 visual phases
  private generateAllTargets() {
    this.brainTargets = generateBrainPoints(this.particleCount, this.width, this.height);
    this.scatterTargets = generateScatterPoints(this.particleCount, this.width, this.height);
    this.clusterTargets = generateClusterPoints(this.particleCount, this.width, this.height);
    this.bulbTargets = generateBulbPoints(this.particleCount, this.width, this.height);
    this.investigationTargets = generateInvestigationPoints(this.particleCount, this.width, this.height);
    this.recommendationTargets = generateRecommendationPoints(this.particleCount, this.width, this.height);
    this.approvalTargets = generateApprovalGatePoints(this.particleCount, this.width, this.height);
    this.resolutionTargets = generateResolutionPoints(this.particleCount, this.width, this.height);
  }

  // Manual Test Mode setter
  public setManualTarget(index: number | null) {
    this.manualTargetIndex = index;
  }

  // Impulse shockwave (e.g. on click)
  public triggerShockwave(screenX: number, screenY: number, force = 75) {
    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;
    const clickX = screenX - centerX;
    const clickY = screenY - centerY;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 260 && dist > 1) {
        const power = (1 - dist / 260) * force;
        p.vx += (dx / dist) * power;
        p.vy += (dy / dist) * power;
        p.vz += (Math.random() - 0.5) * power * 0.8;
      }
    }
  }

  // Master Update Loop: Continuous bidirectional scroll-driven morphology
  public update(smoothScrollProgress: number, dt: number) {
    this.time += dt;

    // 1. Resolve State A and State B based on Timeline or Manual Override
    let stateA: TargetPoint[];
    let stateB: TargetPoint[];
    let t: number; // 0.0 to 1.0 transition ratio

    if (this.manualTargetIndex !== null) {
      // Manual test mode: freeze directly at chosen shape
      const targetArrays = [
        this.brainTargets,
        this.scatterTargets,
        this.clusterTargets,
        this.bulbTargets,
        this.investigationTargets,
        this.recommendationTargets,
        this.approvalTargets,
        this.resolutionTargets,
      ];
      const safeIdx = Math.max(0, Math.min(targetArrays.length - 1, this.manualTargetIndex));
      stateA = targetArrays[safeIdx];
      stateB = targetArrays[safeIdx];
      t = 0;
      this.currentSceneName = `MANUAL_MODE_${safeIdx}`;
      this.transitionRatio = 0;
    } else {
      // MASTER SCENE TIMELINE:
      // [0.00 – 0.14]: HERO / BRAIN
      // [0.14 – 0.27]: BRAIN → SCATTER
      // [0.27 – 0.42]: SCATTER → CLUSTERS
      // [0.42 – 0.56]: CLUSTERS → BULB
      // [0.56 – 0.69]: BULB → INVESTIGATION NETWORK
      // [0.69 – 0.83]: INVESTIGATION → RECOMMENDATION
      // [0.83 – 0.94]: RECOMMENDATION → APPROVAL GATE
      // [0.94 – 1.00]: APPROVAL GATE → RESOLUTION STATE

      const p = Math.max(0, Math.min(1.0, smoothScrollProgress));

      if (p <= 0.14) {
        stateA = this.brainTargets;
        stateB = this.brainTargets;
        t = 0;
        this.currentSceneName = 'HERO_BRAIN';
      } else if (p <= 0.27) {
        stateA = this.brainTargets;
        stateB = this.scatterTargets;
        t = (p - 0.14) / 0.13;
        this.currentSceneName = 'BRAIN_TO_SCATTER';
      } else if (p <= 0.42) {
        stateA = this.scatterTargets;
        stateB = this.clusterTargets;
        t = (p - 0.27) / 0.15;
        this.currentSceneName = 'SCATTER_TO_CLUSTERS';
      } else if (p <= 0.56) {
        stateA = this.clusterTargets;
        stateB = this.bulbTargets;
        t = (p - 0.42) / 0.14;
        this.currentSceneName = 'CLUSTERS_TO_BULB';
      } else if (p <= 0.69) {
        stateA = this.bulbTargets;
        stateB = this.investigationTargets;
        t = (p - 0.56) / 0.13;
        this.currentSceneName = 'BULB_TO_INVESTIGATION';
      } else if (p <= 0.83) {
        stateA = this.investigationTargets;
        stateB = this.recommendationTargets;
        t = (p - 0.69) / 0.14;
        this.currentSceneName = 'INVESTIGATION_TO_RECOMMENDATION';
      } else if (p <= 0.94) {
        stateA = this.recommendationTargets;
        stateB = this.approvalTargets;
        t = (p - 0.83) / 0.11;
        this.currentSceneName = 'RECOMMENDATION_TO_APPROVAL';
      } else {
        stateA = this.approvalTargets;
        stateB = this.resolutionTargets;
        t = (p - 0.94) / 0.06;
        this.currentSceneName = 'APPROVAL_TO_RESOLUTION';
      }

      this.transitionRatio = t;
    }

    // Smooth cubic easing for interpolation between target states
    const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // 2. Physics & Morphing Update Loop
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const targetA = stateA[i] || stateA[0];
      const targetB = stateB[i] || stateB[0];

      // Safe fallback if target coordinate is invalid
      if (!targetA || isNaN(targetA.x) || !targetB || isNaN(targetB.x)) {
        continue;
      }

      // Linear interpolation between shape targets A and B
      const targetX = targetA.x + (targetB.x - targetA.x) * easedT;
      const targetY = targetA.y + (targetB.y - targetA.y) * easedT;
      const targetZ = targetA.z + (targetB.z - targetA.z) * easedT;

      p.targetX = targetX;
      p.targetY = targetY;
      p.targetZ = targetZ;

      // Color, Size, and Opacity interpolation
      p.targetColor = easedT < 0.5 ? targetA.color : targetB.color;
      p.targetSize = targetA.size + (targetB.size - targetA.size) * easedT;
      p.targetOpacity = targetA.alpha + (targetB.alpha - targetA.alpha) * easedT;

      // Subtle organic harmonic noise around target (never overpowers target)
      const noiseX = Math.sin(this.time * 1.6 + p.noiseSeedX) * this.noiseScale;
      const noiseY = Math.cos(this.time * 1.4 + p.noiseSeedY) * this.noiseScale;
      const noiseZ = Math.sin(this.time * 1.2 + p.noiseSeedZ) * this.noiseScale;

      const destX = p.targetX + noiseX;
      const destY = p.targetY + noiseY;
      const destZ = p.targetZ + noiseZ;

      // Spring-like physics toward target
      const forceX = (destX - p.x) * this.springStrength;
      const forceY = (destY - p.y) * this.springStrength;
      const forceZ = (destZ - p.z) * this.springStrength;

      p.vx = (p.vx + forceX) * this.damping;
      p.vy = (p.vy + forceY) * this.damping;
      p.vz = (p.vz + forceZ) * this.damping;

      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Size and color lerp
      p.size += (p.targetSize - p.size) * 0.15;
      p.color = p.targetColor;
      p.opacity += (p.targetOpacity - p.opacity) * 0.15;

      // Subtle rotation
      p.rotation += p.vRotation;
    }
  }

  // Render to canvas with perspective projection and triangular glyphs
  public render(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 1.0;

    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;
    const fov = this.fov;
    const camZ = this.cameraZ;

    // Render Point-Cloud Particles as HOLLOW OUTLINED TRIANGLES WITH SUBTLE FILL
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      const zDist = camZ + p.z;
      if (zDist <= 10) continue; // Behind camera clipping

      const scale = fov / zDist;
      const screenX = centerX + p.x * scale;
      const screenY = centerY + p.y * scale;

      // Triangle local vertices
      const s = p.size * scale;
      const h = s * 1.15;

      const v0 = { x: 0, y: -h * 0.65 };
      const v1 = { x: s * 0.55, y: h * 0.45 };
      const v2 = { x: -s * 0.55, y: h * 0.45 };

      const cosR = Math.cos(p.rotation);
      const sinR = Math.sin(p.rotation);

      const p0 = { x: screenX + (v0.x * cosR - v0.y * sinR), y: screenY + (v0.x * sinR + v0.y * cosR) };
      const p1 = { x: screenX + (v1.x * cosR - v1.y * sinR), y: screenY + (v1.x * sinR + v1.y * cosR) };
      const p2 = { x: screenX + (v2.x * cosR - v2.y * sinR), y: screenY + (v2.x * sinR + v2.y * cosR) };

      // Path
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();

      // Subtle translucent fill
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(0.35, p.opacity * 0.28);
      ctx.fill();

      // Crisp outlined triangle stroke
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(0.85, 1.35 * scale);
      ctx.globalAlpha = Math.min(1.0, p.opacity * 1.15);
      ctx.stroke();

      // Inner concentric triangle for high-density tech aesthetic
      if (p.hasInner && scale > 0.72) {
        ctx.beginPath();
        ctx.moveTo((p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
        ctx.lineTo((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
        ctx.lineTo((p2.x + p0.x) * 0.5, (p2.y + p0.y) * 0.5);
        ctx.closePath();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.75;
        ctx.globalAlpha = p.opacity * 0.45;
        ctx.stroke();
      }
    }
  }
}
