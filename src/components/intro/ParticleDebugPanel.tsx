// ParticleDebugPanel.tsx
// Development-only debug controls for the particle system

import React, { useState, useEffect } from 'react';
import { ParticleEngine, ShapeName } from './ParticleEngine';
import { X, ChevronDown, ChevronUp, Bug, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

interface ParticleDebugPanelProps {
  engine: ParticleEngine | null;
  isDevelopment: boolean;
}

export const ParticleDebugPanel: React.FC<ParticleDebugPanelProps> = ({
  engine,
  isDevelopment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fps, setFps] = useState(0);
  const [lastFrameTime, setLastFrameTime] = useState(performance.now());
  const [frameCount, setFrameCount] = useState(0);

  // FPS calculation
  useEffect(() => {
    if (!isDevelopment || !engine) return;

    const calculateFps = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      setFrameCount((c) => c + 1);

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        setFrameCount(0);
        setLastFrameTime(now);
      }

      requestAnimationFrame(calculateFps);
    };

    const raf = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(raf);
  }, [isDevelopment, engine, lastFrameTime, frameCount]);

  if (!isDevelopment) return null;

  const shapes: ShapeName[] = ['brain', 'scatter', 'clusters', 'bulb', 'investigation', 'recommendation', 'resolution'];

  const handleShapeClick = (shape: ShapeName) => {
    if (engine) {
      engine.setManualShape(shape);
    }
  };

  const handleClearManual = () => {
    if (engine) {
      engine.setManualShape(null);
    }
  };

  const handleTriggerReform = () => {
    if (engine) {
      engine.triggerDisperseAndReform(1.5);
    }
  };

  const handleTriggerShockwave = () => {
    if (engine) {
      engine.triggerShockwave(engine.width / 2, engine.height / 2, 100);
    }
  };

  const handleRegenerateTargets = () => {
    if (engine) {
      engine.generateAllTargetsPublic?.();
      engine.validateAllTargetsPublic?.();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto font-mono">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0a0a0a] border border-white/10 text-xs text-[#9a9a9a] hover:text-white hover:border-white/20 transition-all cursor-pointer ${
          isOpen ? 'bg-[#8052ff]/20 border-[#8052ff]/40 text-[#8052ff]' : ''
        }`}
      >
        <Bug className="h-4 w-4" />
        <span>DEBUG</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div
          className={`absolute bottom-12 right-0 w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl transition-all duration-200 ${
            !isOpen ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-white">
              <Bug className="h-4 w-4 text-[#8052ff]" />
              <span className="font-medium">Particle Engine Debug</span>
              <span className="px-2 py-0.5 rounded text-[9px] bg-[#8052ff]/20 text-[#8052ff]">DEV ONLY</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#9a9a9a] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#111111] border border-white/5">
              <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">FPS</p>
              <p className="text-2xl font-mono tabular-nums text-white">{fps}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#111111] border border-white/5">
              <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">Particles</p>
              <p className="text-2xl font-mono tabular-nums text-white">{engine?.particleCount || 0}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#111111] border border-white/5">
              <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">Scroll</p>
              <p className="text-2xl font-mono tabular-nums text-white">{engine ? engine.transitionProgress.toFixed(2) : '0'}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#111111] border border-white/5">
              <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider">Shape</p>
              <p className="text-xl font-mono tabular-nums text-white">{engine?.currentShape || 'brain'}</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-2 py-1 rounded text-[10px] font-mono ${
              engine?.isTransitioning ? 'bg-[#ffb829]/20 text-[#ffb829] border border-[#ffb829]/40' : 'bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/40'
            }`}>
              {engine?.isTransitioning ? <AlertCircle className="h-3 w-3 inline mr-1" /> : <CheckCircle className="h-3 w-3 inline mr-1" />}
              {engine?.isTransitioning ? 'FORMING' : 'SETTLED'}
            </span>
            <span className={`px-2 py-1 rounded text-[10px] font-mono ${
              engine?.manualShape ? 'bg-[#8052ff]/20 text-[#8052ff] border border-[#8052ff]/40' : 'bg-white/5 text-[#9a9a9a] border border-white/10'
            }`}>
              {engine?.manualShape ? (
                <>
                  MANUAL: {engine.manualShape.toUpperCase()}
                </>
              ) : (
                'AUTO (Scroll)'
              )}
            </span>
          </div>

          {/* Shape Quick Select */}
          <div className="mb-4">
            <p className="text-[10px] text-[#9a9a9a] uppercase tracking-wider mb-2">Quick Shape Select</p>
            <div className="grid grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {shapes.map((shape) => (
                <button
                  key={shape}
                  onClick={() => handleShapeClick(shape)}
                  className={`px-2 py-1.5 rounded text-[10px] font-mono text-left transition-all ${
                    engine?.manualShape === shape
                      ? 'bg-[#8052ff]/30 text-[#8052ff] border border-[#8052ff]/40'
                      : engine?.currentShape === shape
                      ? 'bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/40'
                      : 'bg-[#111111] text-[#9a9a9a] border border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {shape.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="border-t border-white/10 pt-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs text-[#9a9a9a] hover:text-white"
            >
              <span>Advanced Controls</span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="flex items-center gap-2 text-xs text-[#9a9a9a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={engine?.manualShape !== null}
                      onChange={(e) => {
                        if (!e.target.checked && engine) {
                          engine.setManualShape(null);
                        }
                      }}
                      className="w-4 h-4 accent-[#8052ff]"
                    />
                    Manual Mode Active
                  </label>
                </div>

                <button
                  onClick={handleClearManual}
                  disabled={engine?.manualShape === null}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#9a9a9a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Manual Target (Resume Scroll)
                </button>

                <button
                  onClick={handleTriggerReform}
                  className="w-full px-3 py-2 rounded-xl bg-[#ffb829]/20 hover:bg-[#ffb829]/30 border border-[#ffb829]/40 text-[#ffb829] text-xs font-mono transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Trigger Disperse & Reform
                </button>

                <button
                  onClick={handleTriggerShockwave}
                  className="w-full px-3 py-2 rounded-xl bg-[#8052ff]/20 hover:bg-[#8052ff]/30 border border-[#8052ff]/40 text-[#8052ff] text-xs font-mono transition-colors"
                >
                  Trigger Center Shockwave
                </button>

                <button
                  onClick={handleRegenerateTargets}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#9a9a9a] hover:text-white transition-colors"
                >
                  Regenerate All Targets
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2 rounded bg-[#111111]">
                    <p className="text-[9px] text-[#9a9a9a] uppercase">Spring</p>
                    <p className="font-mono text-white">{engine?.springStrength?.toFixed(3) || '0.085'}</p>
                  </div>
                  <div className="p-2 rounded bg-[#111111]">
                    <p className="text-[9px] text-[#9a9a9a] uppercase">Damping</p>
                    <p className="font-mono text-white">{engine?.damping?.toFixed(2) || '0.82'}</p>
                  </div>
                  <div className="p-2 rounded bg-[#111111]">
                    <p className="text-[9px] text-[#9a9a9a] uppercase">Noise</p>
                    <p className="font-mono text-white">{engine?.noiseScale?.toFixed(1) || '1.2'}</p>
                  </div>
                  <div className="p-2 rounded bg-[#111111]">
                    <p className="text-[9px] text-[#9a9a9a] uppercase">Viewport</p>
                    <p className="font-mono text-white">{engine?.width || 0}×{engine?.height || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};