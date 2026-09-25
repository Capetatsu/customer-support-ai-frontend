// ScrollController.tsx
// Smooth scroll progress with lerp and reduced motion support

import { useEffect, useRef, useState, useCallback } from 'react';

export interface ScrollControllerOptions {
  reducedMotion?: boolean;
  lerpFactor?: number;
  scrollHeightMultiplier?: number; // e.g., 800vh = 8
}

export function useScrollController(options: ScrollControllerOptions = {}) {
  const {
    reducedMotion = false,
    lerpFactor = 0.12,
    scrollHeightMultiplier = 8,
  } = options;

  const [smoothProgress, setSmoothProgress] = useState(0);
  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Set virtual scroll height
  useEffect(() => {
    document.documentElement.style.setProperty('--scroll-height', `${scrollHeightMultiplier * 100}vh`);
  }, [scrollHeightMultiplier]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        rawProgressRef.current = Math.max(0, Math.min(1, scrollY / totalScrollable));
      }
      isScrollingRef.current = true;

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loop = () => {
      const current = smoothProgressRef.current;
      const target = rawProgressRef.current;
      const factor = reducedMotion ? 1.0 : lerpFactor;
      const next = current + (target - current) * factor;

      if (Math.abs(next - current) > 0.0002) {
        smoothProgressRef.current = next;
        setSmoothProgress(next);
      } else if (Math.abs(target - current) > 0.0001) {
        smoothProgressRef.current = target;
        setSmoothProgress(target);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [reducedMotion, lerpFactor]);

  const scrollToProgress = useCallback((targetProgress: number) => {
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    const targetY = targetProgress * totalScrollable;
    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [reducedMotion]);

  const scrollToScene = useCallback((sceneStart: number, sceneEnd: number) => {
    const target = (sceneStart + sceneEnd) / 2;
    scrollToProgress(target);
  }, [scrollToProgress]);

  return {
    smoothProgress,
    rawProgress: rawProgressRef.current,
    isScrolling: isScrollingRef.current,
    scrollToProgress,
    scrollToScene,
  };
}

// Scene boundaries for the 7 core scenes
export const SCENE_BOUNDARIES = [
  { id: 'brain', label: 'PROBLEM', start: 0.00, end: 0.12, center: 0.06 },
  { id: 'scatter', label: 'SIGNALS', start: 0.12, end: 0.24, center: 0.18 },
  { id: 'clusters', label: 'INTELLIGENCE', start: 0.24, end: 0.36, center: 0.30 },
  { id: 'bulb', label: 'INSIGHT', start: 0.36, end: 0.48, center: 0.42 },
  { id: 'investigation', label: 'INVESTIGATION', start: 0.48, end: 0.60, center: 0.54 },
  { id: 'recommendation', label: 'RECOMMENDATION', start: 0.60, end: 0.72, center: 0.66 },
  { id: 'resolution', label: 'RESOLUTION', start: 0.72, end: 1.00, center: 0.86 },
];

export function getCurrentScene(progress: number): typeof SCENE_BOUNDARIES[0] {
  for (const scene of SCENE_BOUNDARIES) {
    if (progress >= scene.start && progress <= scene.end) return scene;
  }
  return SCENE_BOUNDARIES[SCENE_BOUNDARIES.length - 1];
}

export function getSceneProgress(progress: number, scene: typeof SCENE_BOUNDARIES[0]): number {
  if (scene.end <= scene.start) return 1;
  return Math.max(0, Math.min(1, (progress - scene.start) / (scene.end - scene.start)));
}