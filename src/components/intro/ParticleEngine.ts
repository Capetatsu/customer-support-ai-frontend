// ParticleEngine.ts
// Clean spring-physics particle engine with deterministic shape targets
// Single persistent particle system that morphs between states via scroll

import {
  TargetPoint,
  generateBrainTargets,
  generateScatterTargets,
  generateClusterTargets,
  generateBulbTargets,
  generateInvestigationTargets,
  generateRecommendationTargets,
  generateResolutionTargets,
} from './ParticleTargets';

export type ShapeName =
  | 'brain'
  | 'scatter'
  | 'clusters'
  | 'bulb'
  | 'investigation'
  | 'recommendation'
  | 'resolution';

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

  // Perspective Camera
  public fov = 650;
  public cameraZ = 750;

  // Spring Physics
  public springStrength = 0.085;
  public damping = 0.82;
  public noiseScale = 1.2;

  // Shape Targets (7 core states)
  public brainTargets: TargetPoint[] = [];
  public scatterTargets: TargetPoint[] = [];
  public clusterTargets: TargetPoint[] = [];
  public bulbTargets: TargetPoint[] = [];
  public investigationTargets: TargetPoint[] = [];
  public recommendationTargets: TargetPoint[] = [];
  public resolutionTargets: TargetPoint[] = [];

  // Manual test mode
  public manualShape: ShapeName | null = null;

  // Telemetry
  public currentShape: ShapeName = 'brain';
  public transitionProgress = 0;
  public isTransitioning = false;

  private lastValidTargets: Map<ShapeName, TargetPoint[]> = new Map();

  constructor() {}

  public init(width: number, height: number, isMobile = false) {
    this.width = width;
    this.height = height;
    this.particleCount = isMobile ? 1200 : 2400;
    this.particles = [];

    this.generateAllTargets();
    this.validateAllTargets();

    // Spawn particles at brain targets
    for (let i = 0; i < this.particleCount; i++) {
      const bTarget = this.brainTargets[i] || { x: 0, y: 0, z: 0, color: '#8052ff', size: 4, alpha: 0.85 };
      const jitter = 20;

      this.particles.push({
        id: i,
        x: bTarget.x + (Math.random() - 0.5) * jitter,
        y: bTarget.y + (Math.random() - 0.5) * jitter,
        z: bTarget.z + (Math.random() - 0.5) * jitter,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        vz: (Math.random() - 0.5) * 1,
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
        vRotation: (Math.random() - 0.5) * 0.03,
        hasInner: Math.random() < 0.3,
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
    this.validateAllTargets();
  }

  private generateAllTargets() {
    this.brainTargets = generateBrainTargets(this.particleCount, this.width, this.height);
    this.scatterTargets = generateScatterTargets(this.particleCount, this.width, this.height);
    this.clusterTargets = generateClusterTargets(this.particleCount, this.width, this.height);
    this.bulbTargets = generateBulbTargets(this.particleCount, this.width, this.height);
    this.investigationTargets = generateInvestigationTargets(this.particleCount, this.width, this.height);
    this.recommendationTargets = generateRecommendationTargets(this.particleCount, this.width, this.height);
    this.resolutionTargets = generateResolutionTargets(this.particleCount, this.width, this.height);
  }

  private validateAllTargets() {
    const shapes: ShapeName[] = ['brain', 'scatter', 'clusters', 'bulb', 'investigation', 'recommendation', 'resolution'];
    for (const shape of shapes) {
      const targets = this.getTargetsForShape(shape);
      if (this.isValidTarget(targets)) {
        this.lastValidTargets.set(shape, targets.map(t => ({ ...t })));
      }
    }
  }

  private isValidTarget(targets: TargetPoint[]): boolean {
    if (!targets || targets.length !== this.particleCount) return false;
    for (const t of targets) {
      if (!t || !isFinite(t.x) || !isFinite(t.y) || !isFinite(t.z)) return false;
    }
    return true;
  }

  private getTargetsForShape(shape: ShapeName): TargetPoint[] {
    switch (shape) {
      case 'brain': return this.brainTargets;
      case 'scatter': return this.scatterTargets;
      case 'clusters': return this.clusterTargets;
      case 'bulb': return this.bulbTargets;
      case 'investigation': return this.investigationTargets;
      case 'recommendation': return this.recommendationTargets;
      case 'resolution': return this.resolutionTargets;
      default: return this.brainTargets;
    }
  }

  public setManualShape(shape: ShapeName | null) {
    this.manualShape = shape;
  }

  // Public methods for debug panel
  public triggerDisperseAndReform(impulse = 1.0) {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const angle = Math.random() * Math.PI * 2;
      const power = 15 * impulse;
      p.vx += Math.cos(angle) * power;
      p.vy += Math.sin(angle) * power;
      p.vz += (Math.random() - 0.5) * power * 0.8;
    }
    this.isTransitioning = true;
    this.transitionProgress = 0;
  }

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

  public regenerateTargets() {
    this.generateAllTargets();
    this.validateAllTargets();
  }

  // Made public for debug panel
  public generateAllTargetsPublic() {
    this.generateAllTargets();
  }

  public validateAllTargetsPublic() {
    this.validateAllTargets();
  }

  public getTargets(shape: ShapeName): TargetPoint[] {
    const targets = this.getTargetsForShape(shape);
    if (!this.isValidTarget(targets)) {
      const fallback = this.lastValidTargets.get(shape);
      if (fallback) return fallback;
      return this.brainTargets;
    }
    return targets;
  }

  // Spring physics update with scroll-driven interpolation
  public update(scrollProgress: number, dt: number) {
    this.time += dt;

    // Determine current shape and transition
    let shapeA: ShapeName;
    let shapeB: ShapeName;
    let t: number;

    if (this.manualShape) {
      shapeA = this.manualShape;
      shapeB = this.manualShape;
      t = 0;
      this.currentShape = this.manualShape;
      this.transitionProgress = 0;
      this.isTransitioning = false;
    } else {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // Scene timeline (7 core scenes mapped to 0-1)
      // 0.00-0.12: BRAIN
      // 0.12-0.24: BRAIN -> SCATTER
      // 0.24-0.36: SCATTER -> CLUSTERS
      // 0.36-0.48: CLUSTERS -> BULB
      // 0.48-0.60: BULB -> INVESTIGATION
      // 0.60-0.72: INVESTIGATION -> RECOMMENDATION
      // 0.72-0.84: RECOMMENDATION -> RESOLUTION
      // 0.84-1.00: RESOLUTION

      if (p <= 0.12) {
        shapeA = 'brain'; shapeB = 'brain'; t = 0; this.currentShape = 'brain';
      } else if (p <= 0.24) {
        shapeA = 'brain'; shapeB = 'scatter'; t = (p - 0.12) / 0.12; this.currentShape = 'brain';
      } else if (p <= 0.36) {
        shapeA = 'scatter'; shapeB = 'clusters'; t = (p - 0.24) / 0.12; this.currentShape = 'scatter';
      } else if (p <= 0.48) {
        shapeA = 'clusters'; shapeB = 'bulb'; t = (p - 0.36) / 0.12; this.currentShape = 'clusters';
      } else if (p <= 0.60) {
        shapeA = 'bulb'; shapeB = 'investigation'; t = (p - 0.48) / 0.12; this.currentShape = 'bulb';
      } else if (p <= 0.72) {
        shapeA = 'investigation'; shapeB = 'recommendation'; t = (p - 0.60) / 0.12; this.currentShape = 'investigation';
      } else if (p <= 0.84) {
        shapeA = 'recommendation'; shapeB = 'resolution'; t = (p - 0.72) / 0.12; this.currentShape = 'recommendation';
      } else {
        shapeA = 'resolution'; shapeB = 'resolution'; t = 0; this.currentShape = 'resolution';
      }

      this.transitionProgress = t;
      this.isTransitioning = t > 0.01 && t < 0.99;
    }

    const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const targetsA = this.getTargets(shapeA);
    const targetsB = this.getTargets(shapeB);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const targetA = targetsA[i] || targetsA[0];
      const targetB = targetsB[i] || targetsB[0];

      if (!targetA || !isFinite(targetA.x) || !targetB || !isFinite(targetB.x)) continue;

      const targetX = targetA.x + (targetB.x - targetA.x) * easedT;
      const targetY = targetA.y + (targetB.y - targetA.y) * easedT;
      const targetZ = targetA.z + (targetB.z - targetA.z) * easedT;

      p.targetX = targetX;
      p.targetY = targetY;
      p.targetZ = targetZ;

      p.targetColor = easedT < 0.5 ? targetA.color : targetB.color;
      p.targetSize = targetA.size + (targetB.size - targetA.size) * easedT;
      p.targetOpacity = targetA.alpha + (targetB.alpha - targetA.alpha) * easedT;

      // Subtle organic noise (never overpowers target)
      const noiseX = Math.sin(this.time * 1.6 + p.noiseSeedX) * this.noiseScale;
      const noiseY = Math.cos(this.time * 1.4 + p.noiseSeedY) * this.noiseScale;
      const noiseZ = Math.sin(this.time * 1.2 + p.noiseSeedZ) * this.noiseScale;

      const destX = p.targetX + noiseX;
      const destY = p.targetY + noiseY;
      const destZ = p.targetZ + noiseZ;

      const forceX = (destX - p.x) * this.springStrength;
      const forceY = (destY - p.y) * this.springStrength;
      const forceZ = (destZ - p.z) * this.springStrength;

      p.vx = (p.vx + forceX) * this.damping;
      p.vy = (p.vy + forceY) * this.damping;
      p.vz = (p.vz + forceZ) * this.damping;

      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      p.size += (p.targetSize - p.size) * 0.15;
      p.color = p.targetColor;
      p.opacity += (p.targetOpacity - p.opacity) * 0.15;
      p.rotation += p.vRotation;
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 1.0;

    const centerX = this.width * 0.5;
    const centerY = this.height * 0.5;
    const fov = this.fov;
    const camZ = this.cameraZ;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      const zDist = camZ + p.z;
      if (zDist <= 10) continue;

      const scale = fov / zDist;
      const screenX = centerX + p.x * scale;
      const screenY = centerY + p.y * scale;

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

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();

      // Subtle fill
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(0.3, p.opacity * 0.25);
      ctx.fill();

      // Crisp stroke
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(0.8, 1.2 * scale);
      ctx.globalAlpha = Math.min(1.0, p.opacity * 1.1);
      ctx.stroke();

      // Inner triangle for density
      if (p.hasInner && scale > 0.7) {
        ctx.beginPath();
        ctx.moveTo((p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
        ctx.lineTo((p1.x + p2.x) * 0.5, (p1.y + p2.y) * 0.5);
        ctx.lineTo((p2.x + p0.x) * 0.5, (p2.y + p0.y) * 0.5);
        ctx.closePath();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = p.opacity * 0.4;
        ctx.stroke();
      }
    }
  }
}