// ParticleCanvas.tsx
// Persistent Canvas 2D renderer for the particle system

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ParticleEngine } from './ParticleEngine';

export interface ParticleCanvasHandle {
  setManualShape: (shape: string | null) => void;
  triggerReform: (impulse?: number) => void;
  triggerShockwave: (x: number, y: number, force?: number) => void;
  getEngine: () => ParticleEngine | null;
}

interface ParticleCanvasProps {
  progress: number; // 0.0 to 1.0 smooth scroll progress
  onStatusChange?: (status: { shape: string; transition: number; forming: boolean }) => void;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle, ParticleCanvasProps>(
  ({ progress, onStatusChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ParticleEngine | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(performance.now());
    const progressRef = useRef<number>(progress);
    const lastShapeRef = useRef<string>('');
    const lastFormingRef = useRef<boolean>(false);

    useEffect(() => {
      progressRef.current = progress;
    }, [progress]);

    useImperativeHandle(ref, () => ({
      setManualShape: (shape: string | null) => {
        engineRef.current?.setManualShape(shape as any);
      },
      triggerReform: (impulse = 1.0) => {
        engineRef.current?.triggerDisperseAndReform?.(impulse);
      },
      triggerShockwave: (x: number, y: number, force = 80) => {
        engineRef.current?.triggerShockwave?.(x, y, force);
      },
      getEngine: () => engineRef.current,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const engine = new ParticleEngine();
      engineRef.current = engine;

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        engine.dpr = dpr;
        engine.resize(width, height, width < 1024);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const handleMouseMove = (e: MouseEvent) => {
        // Optional: subtle mouse influence
      };

      const handlePointerDown = (e: MouseEvent) => {
        engine.triggerShockwave?.(e.clientX, e.clientY, 85);
      };

      window.addEventListener('pointerdown', handlePointerDown);

      const loop = (now: number) => {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = now;

        engine.update(progressRef.current, dt);
        engine.render(ctx);

        if (onStatusChange &&
            (engine.currentShape !== lastShapeRef.current || engine.isTransitioning !== lastFormingRef.current)) {
          lastShapeRef.current = engine.currentShape;
          lastFormingRef.current = engine.isTransitioning;
          onStatusChange({
            shape: engine.currentShape,
            transition: engine.transitionProgress,
            forming: engine.isTransitioning,
          });
        }

        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);

      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointerdown', handlePointerDown);
      };
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden bg-transparent">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full pointer-events-none"
        />
      </div>
    );
  }
);

ParticleCanvas.displayName = 'ParticleCanvas';