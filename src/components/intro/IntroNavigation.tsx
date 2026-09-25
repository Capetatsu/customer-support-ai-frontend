// IntroNavigation.tsx
// Pixel-accurate recreation of Dala's floating top bar & control capsule
// Includes live Dynamic Particle Forming status indicator & interactive Re-form action

import React from 'react';
import { Maximize2, SkipForward, ArrowLeft, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';

interface IntroNavigationProps {
  currentStage: number; // 0 to 4
  formationProgress: number; // 0.0 to 1.0
  isForming: boolean;
  onNextStage: () => void;
  onPrevStage: () => void;
  onSelectStage: (stage: number) => void;
  onTriggerReform: () => void;
  onRequestAccess: () => void;
  onEnterCockpit: () => void;
}

export const IntroNavigation: React.FC<IntroNavigationProps> = ({
  currentStage,
  formationProgress,
  isForming,
  onNextStage,
  onPrevStage,
  onSelectStage,
  onTriggerReform,
  onRequestAccess,
  onEnterCockpit,
}) => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const percent = Math.round(formationProgress * 100);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 flex items-center justify-between select-none pointer-events-auto">
      {/* Brand 4-Petal Color Logo */}
      <div
        onClick={() => onSelectStage(0)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          {/* Exact 4-Petal geometric propeller icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {/* Top-left: Teal */}
            <path
              d="M14 14C14 6.268 7.732 0 0 0V14H14Z"
              fill="#2de0c2"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
            {/* Top-right: Lavender / Violet */}
            <path
              d="M14 14C21.732 14 28 7.732 28 0H14V14Z"
              fill="#8052ff"
              className="opacity-95 transition-transform group-hover:scale-105"
            />
            {/* Bottom-right: Amber */}
            <path
              d="M14 14C14 21.732 20.268 28 28 28V14H14Z"
              fill="#ffb829"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
            {/* Bottom-left: Peach / Pink */}
            <path
              d="M14 14C6.268 14 0 20.268 0 28H14V14Z"
              fill="#ff8e52"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
          </svg>
        </div>
      </div>

      {/* Floating Center Control Capsule (Matches Screenshots 1, 2, 3, 4, 5 + Dynamic Forming Control) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 rounded-2xl bg-[#0e0e0e]/85 border border-white/10 backdrop-blur-md shadow-2xl">
        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullScreen}
          title="Toggle Fullscreen"
          className="h-9 w-9 rounded-xl flex items-center justify-center text-[#bdbdbd] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Dynamic Particles Re-form / Assembly Trigger Button */}
        <button
          onClick={onTriggerReform}
          title="Disperse & Dynamically Re-form Particles (Space / F)"
          className={`h-9 px-3 rounded-xl flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer ${
            isForming
              ? 'bg-[#ffb829]/15 text-[#ffb829] border border-[#ffb829]/30 shadow-sm shadow-[#ffb829]/20'
              : 'text-[#bdbdbd] hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className={`h-3.5 w-3.5 ${isForming ? 'animate-spin text-[#ffb829]' : 'text-[#8052ff]'}`} />
          <span className="hidden sm:inline">
            {isForming ? `FORMING ${percent}%` : 'RE-FORM'}
          </span>
        </button>

        {/* Skip / Next Step */}
        <button
          onClick={onNextStage}
          title="Next Slide (>|)"
          className="h-9 w-9 rounded-xl flex items-center justify-center text-[#bdbdbd] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <SkipForward className="h-4 w-4" />
        </button>

        {/* Previous / Next Arrow Pills when on inner stages */}
        {currentStage === 3 && (
          <div className="flex items-center gap-1 pl-1 border-l border-white/10">
            <button
              onClick={onPrevStage}
              className="h-7 w-7 rounded-full bg-[#8052ff]/80 hover:bg-[#8052ff] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm"
            >
              <ArrowLeft className="h-3 w-3" />
            </button>
            <button
              onClick={onNextStage}
              className="h-7 w-7 rounded-full bg-[#8052ff]/80 hover:bg-[#8052ff] flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm"
            >
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Right Navigation Links & Request Access Pill */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-mono tracking-wider">
          <button
            onClick={() => onSelectStage(0)}
            className={`cursor-pointer transition-colors ${
              currentStage === 0 ? 'text-white' : 'text-[#bdbdbd] hover:text-white'
            }`}
          >
            MANIFESTO
          </button>
          <button
            onClick={() => onSelectStage(3)}
            className={`cursor-pointer transition-colors ${
              currentStage === 3 ? 'text-white' : 'text-[#bdbdbd] hover:text-white'
            }`}
          >
            TEAM
          </button>
          <button
            onClick={() => onSelectStage(2)}
            className={`cursor-pointer transition-colors ${
              currentStage === 2 ? 'text-white' : 'text-[#bdbdbd] hover:text-white'
            }`}
          >
            BLOG
          </button>
        </nav>

        {/* Enter Cockpit Quick Button */}
        <button
          onClick={onEnterCockpit}
          title="Open Operational Cockpit"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-[#9a9a9a] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
        >
          <LayoutDashboard className="h-3.5 w-3.5 text-[#8052ff]" />
          <span>Cockpit</span>
        </button>

        {/* Violet Pill Button: REQUEST ACCESS */}
        <button
          onClick={onRequestAccess}
          className="px-5 py-2.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-medium tracking-wide transition-all shadow-lg shadow-[#8052ff]/25 hover:shadow-[#8052ff]/45 cursor-pointer uppercase font-mono"
        >
          Request Access
        </button>
      </div>
    </header>
  );
};
