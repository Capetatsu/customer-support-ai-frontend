// ParticleCanvas.tsx
// Persistent, pinned full-screen canvas that renders the living particle system.
// Connects user pointer interactions, dynamic re-formation triggers, and 60fps rendering.

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ParticleEngine } from './ParticleEngine';

export interface ParticleCanvasHandle {
  triggerReform: (impulse?: number) => void;
  triggerShockwave: (x: number, y: number, force?: number) => void;
  getFormationStatus: () => { progress: number; isForming: boolean; stage: number };
}

interface ParticleCanvasProps {
  progress: number; // 0.0 to 1.0 smooth scroll progress
  onFormationStatusChange?: (status: { progress: number; isForming: boolean; stage: number }) => void;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle, ParticleCanvasProps>(
  ({ progress, onFormationStatusChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ParticleEngine | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(performance.now());
    const progressRef = useRef<number>(progress);
    const lastStageRef = useRef<number>(-1);
    const lastIsFormingRef = useRef<boolean>(false);

    // Keep progressRef in sync
    useEffect(() => {
      progressRef.current = progress;
    }, [progress]);

    // Imperative API for IntroShell / IntroNavigation
    useImperativeHandle(ref, () => ({
      triggerReform: (impulse = 1.0) => {
        engineRef.current?.triggerDisperseAndReform(impulse);
      },
      triggerShockwave: (x: number, y: number, force = 80) => {
        engineRef.current?.triggerShockwave(x, y, force);
      },
      getFormationStatus: () => ({
        progress: engineRef.current?.formationProgress ?? 1.0,
        isForming: engineRef.current?.isForming ?? false,
        stage: engineRef.current?.currentStageIndex ?? 0,
      }),
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
        engine.mouseX = e.clientX - window.innerWidth * 0.5;
        engine.mouseY = e.clientY - window.innerHeight * 0.5;
      };

      const handleMouseLeave = () => {
        engine.mouseX = -1000;
        engine.mouseY = -1000;
      };

      const handlePointerDown = (e: MouseEvent) => {
        engine.triggerShockwave(e.clientX, e.clientY, 85);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('pointerdown', handlePointerDown);

      // Animation Loop
      const loop = (now: number) => {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = now;

        engine.update(progressRef.current, dt);
        engine.render(ctx, progressRef.current);

        // Notify parent only when stage or isForming changes to avoid React re-render thrashing
        if (
          onFormationStatusChange &&
          (engine.currentStageIndex !== lastStageRef.current || engine.isForming !== lastIsFormingRef.current)
        ) {
          lastStageRef.current = engine.currentStageIndex;
          lastIsFormingRef.current = engine.isForming;
          onFormationStatusChange({
            progress: engine.formationProgress,
            isForming: engine.isForming,
            stage: engine.currentStageIndex,
          });
        }

        animFrameRef.current = requestAnimationFrame(loop);
      };

      animFrameRef.current = requestAnimationFrame(loop);

      return () => {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
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
