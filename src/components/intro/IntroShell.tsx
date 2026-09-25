// IntroShell.tsx
// Single sticky stage architecture: ParticleCanvas + StoryStage + Navigation

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ParticleCanvas, ParticleCanvasHandle } from './ParticleCanvas';
import { IntroNavigation } from './IntroNavigation';
import { RequestAccessModal } from './RequestAccessModal';
import { ScrollProgress } from './ScrollProgress';
import { StoryStage } from './StoryStage';
import { ParticleDebugPanel } from './ParticleDebugPanel';
import { ParticleEngine } from './ParticleEngine';
import { useScrollController, SCENE_BOUNDARIES, getCurrentScene, getSceneProgress } from './ScrollController';

type SceneId = 'brain' | 'scatter' | 'clusters' | 'bulb' | 'investigation' | 'recommendation' | 'resolution';

interface IntroShellProps {
  onEnterApp: (route?: string, entityId?: string) => void;
}

export const IntroShell: React.FC<IntroShellProps> = ({ onEnterApp }) => {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [formationStatus, setFormationStatus] = useState({ shape: 'brain', transition: 0, forming: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  const canvasHandleRef = useRef<ParticleCanvasHandle | null>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  // Sync engine ref from canvas
  useEffect(() => {
    if (canvasHandleRef.current) {
      engineRef.current = canvasHandleRef.current.getEngine();
    }
  }, []);

  // Reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll controller
  const {
    smoothProgress,
    scrollToProgress,
    scrollToScene,
  } = useScrollController({ reducedMotion, scrollHeightMultiplier: 8 });

  // Determine current scene and scene progress
  const currentScene = getCurrentScene(smoothProgress).id as SceneId;
  const sceneProgress = getSceneProgress(smoothProgress, getCurrentScene(smoothProgress));

  // Navigation helpers
  const handleNextScene = useCallback(() => {
    const idx = SCENE_BOUNDARIES.findIndex(s => s.id === currentScene);
    if (idx < SCENE_BOUNDARIES.length - 1) {
      scrollToScene(SCENE_BOUNDARIES[idx + 1].start, SCENE_BOUNDARIES[idx + 1].end);
    }
  }, [currentScene, scrollToScene]);

  const handlePrevScene = useCallback(() => {
    const idx = SCENE_BOUNDARIES.findIndex(s => s.id === currentScene);
    if (idx > 0) {
      scrollToScene(SCENE_BOUNDARIES[idx - 1].start, SCENE_BOUNDARIES[idx - 1].end);
    }
  }, [currentScene, scrollToScene]);

  const scrollToSceneName = useCallback((sceneId: SceneId) => {
    const scene = SCENE_BOUNDARIES.find(s => s.id === sceneId);
    if (scene) scrollToScene(scene.start, scene.end);
  }, [scrollToScene]);

  const handleTriggerReform = useCallback(() => {
    canvasHandleRef.current?.triggerReform(1.0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAccessModalOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevScene();
      } else if (e.key === ' ' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleTriggerReform();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextScene, handlePrevScene, handleTriggerReform, isAccessModalOpen]);

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-[#8052ff] selection:text-white font-sans">
      {/* Virtual scroll track */}
      <div className="relative w-full" style={{ height: '800vh' }} />

      {/* Sticky stage */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#000000]">
        {/* Ambient pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

        {/* Persistent Particle Canvas */}
        <ParticleCanvas
          ref={canvasHandleRef}
          progress={smoothProgress}
          onStatusChange={setFormationStatus}
        />

        {/* Top Navigation */}
        <IntroNavigation
          currentScene={currentScene}
          formationProgress={formationStatus.transition}
          isForming={formationStatus.forming}
          onNextScene={handleNextScene}
          onPrevScene={handlePrevScene}
          onSelectScene={scrollToSceneName}
          onTriggerReform={handleTriggerReform}
          onRequestAccess={() => setIsAccessModalOpen(true)}
          onEnterCockpit={() => onEnterApp('dashboard')}
        />

        {/* Vertical Scroll Progress */}
        <ScrollProgress
          progress={smoothProgress}
          currentScene={currentScene}
          onSelectProgress={scrollToProgress}
        />

        {/* Floating hint */}
        <div className="fixed bottom-6 left-6 z-30 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#9a9a9a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb829] animate-pulse" />
          <span>Scroll to transform • Click for shockwave</span>
        </div>

        {/* SINGLE ACTIVE STORY STAGE */}
        <StoryStage
          scene={currentScene}
          sceneProgress={sceneProgress}
          onExplore={handleNextScene}
          onEnterApp={() => onEnterApp('dashboard')}
        />
      </div>

      {/* Debug panel (dev only) */}
      <ParticleDebugPanel
        engine={engineRef.current}
        isDevelopment={process.env.NODE_ENV === 'development'}
      />

      {/* Request Access Modal */}
      <RequestAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        onEnterCockpit={() => {
          setIsAccessModalOpen(false);
          onEnterApp('dashboard');
        }}
      />
    </div>
  );
};