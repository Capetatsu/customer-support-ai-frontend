// IntroShell.tsx
// Cinematic master scroll & stage controller for Dala's 5 exact signature scenes:
// 1. The Human Brain ("Unlock collective wisdom.")
// 2. The Spherical Globe ("Build a better world of work")
// 3. The Tilted Light Bulb ("Spark lightbulb moments")
// 4. The Investors 3D Galaxy ("Our investors")
// 5. The 4-Petal Propeller Emblem ("Your workplace has the answer. Ask Dala to find it.")

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ParticleCanvas, ParticleCanvasHandle } from './ParticleCanvas';
import { IntroNavigation } from './IntroNavigation';
import { RequestAccessModal } from './RequestAccessModal';

import { BrainScene } from './scenes/BrainScene';
import { GlobeScene } from './scenes/GlobeScene';
import { BulbScene } from './scenes/BulbScene';
import { InvestorsScene } from './scenes/InvestorsScene';
import { EmblemScene } from './scenes/EmblemScene';

interface IntroShellProps {
  onEnterApp: (route?: string, entityId?: string) => void;
}

export const IntroShell: React.FC<IntroShellProps> = ({ onEnterApp }) => {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [formationStatus, setFormationStatus] = useState({ progress: 1.0, isForming: false, stage: 0 });

  const canvasHandleRef = useRef<ParticleCanvasHandle | null>(null);
  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Compute smooth scroll progress via 60fps lerp
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        rawProgressRef.current = Math.max(0, Math.min(1, scrollY / totalScrollable));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const loop = () => {
      const current = smoothProgressRef.current;
      const target = rawProgressRef.current;
      const next = current + (target - current) * 0.14;

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
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Determine active stage index (0 to 4)
  const currentStage = Math.min(4, Math.floor(smoothProgress * 5));

  // Trigger dynamic dispersion and re-formation
  const handleTriggerReform = useCallback(() => {
    canvasHandleRef.current?.triggerReform(1.0);
  }, []);

  // Programmatic jump to target stage centers (0.0, 0.30, 0.50, 0.70, 0.92)
  const stageTargets = [0.0, 0.30, 0.50, 0.70, 0.92];

  const scrollToStage = (stageIdx: number) => {
    const targetIdx = Math.max(0, Math.min(4, stageIdx));
    const targetP = stageTargets[targetIdx];
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: targetP * totalScrollable,
      behavior: 'smooth',
    });
  };

  const handleNextStage = () => {
    const next = (currentStage + 1) % 5;
    scrollToStage(next);
  };

  const handlePrevStage = () => {
    const prev = (currentStage - 1 + 5) % 5;
    scrollToStage(prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAccessModalOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextStage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevStage();
      } else if (e.key === ' ' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleTriggerReform();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage, isAccessModalOpen, handleTriggerReform]);

  // Compute precise opacities for the 5 scenes based on smoothProgress (0.00 to 1.00)
  const getSceneOpacity = (start: number, end: number, fadeLen: number = 0.04) => {
    if (smoothProgress < start - fadeLen || smoothProgress > end + fadeLen) return 0;
    if (smoothProgress < start) return (smoothProgress - (start - fadeLen)) / fadeLen;
    if (smoothProgress > end) return 1 - (smoothProgress - end) / fadeLen;
    return 1;
  };

  // Opacities for the 5 stages matching exact formed intervals
  const brainOpacity = getSceneOpacity(0.00, 0.18, 0.04);
  const globeOpacity = getSceneOpacity(0.24, 0.38, 0.04);
  const bulbOpacity = getSceneOpacity(0.44, 0.58, 0.04);
  const investorsOpacity = getSceneOpacity(0.64, 0.78, 0.04);
  const emblemOpacity = getSceneOpacity(0.84, 1.00, 0.04);

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-[#8052ff] selection:text-white font-sans">
      {/* 1. Generous 600vh virtual scroll track for smooth tactile narrative pacing */}
      <div className="relative w-full" style={{ height: '600vh' }} />

      {/* 2. Fixed sticky viewport pinning the living 3D particle system & UI overlays */}
      <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#000000]">
        {/* Subtle background ambient dot pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

        {/* Persistent 3D Procedural Dynamic Particle Canvas */}
        <ParticleCanvas
          ref={canvasHandleRef}
          progress={smoothProgress}
          onFormationStatusChange={setFormationStatus}
        />

        {/* Minimalist Dala Top Header & Controls */}
        <IntroNavigation
          currentStage={currentStage}
          formationProgress={formationStatus.progress}
          isForming={formationStatus.isForming}
          onNextStage={handleNextStage}
          onPrevStage={handlePrevStage}
          onSelectStage={scrollToStage}
          onTriggerReform={handleTriggerReform}
          onRequestAccess={() => setIsAccessModalOpen(true)}
          onEnterCockpit={() => onEnterApp('dashboard')}
        />

        {/* Interactive Dynamic Formation Floating Hint */}
        <div className="fixed bottom-6 left-6 z-30 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#9a9a9a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb829] animate-pulse" />
          <span>Scroll to morph shapes • Click anywhere to send shockwave • Press [Space] to re-form</span>
        </div>

        {/* Stage 1: The Human Brain ("Unlock collective wisdom.") */}
        <BrainScene
          opacity={brainOpacity}
          onRequestAccess={() => setIsAccessModalOpen(true)}
        />

        {/* Stage 2: The Spherical Globe ("Build a better world of work") */}
        <GlobeScene
          opacity={globeOpacity}
        />

        {/* Stage 3: The Tilted Lightbulb ("Spark lightbulb moments") */}
        <BulbScene
          opacity={bulbOpacity}
        />

        {/* Stage 4: Our Investors ("Our investors") */}
        <InvestorsScene
          opacity={investorsOpacity}
        />

        {/* Stage 5: 4-Petal Propeller Emblem ("Your workplace has the answer. Ask Dala to find it.") */}
        <EmblemScene
          opacity={emblemOpacity}
          onRequestAccess={() => setIsAccessModalOpen(true)}
          onEnterCockpit={() => onEnterApp('dashboard')}
        />
      </div>

      {/* Request Access & Sandbox Launch Modal */}
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
