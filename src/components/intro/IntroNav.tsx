// IntroNav.tsx
// Minimalist, high-craft top bar adhering strictly to Refero / Dala design language

import React from 'react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

interface IntroNavProps {
  progress: number;
  onNavigateStage: (targetProgress: number) => void;
  onEnterApp: () => void;
}

export const IntroNav: React.FC<IntroNavProps> = ({
  progress,
  onNavigateStage,
  onEnterApp,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-5 px-6 md:px-12 flex items-center justify-between select-none pointer-events-auto">
      {/* Product Logo & Brand Wordmark */}
      <div
        onClick={() => onNavigateStage(0)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
              d="M13 13C13 5.82 7.18 0 0 0V13H13Z"
              fill="#2de0c2"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
            <path
              d="M13 13C20.18 13 26 7.18 26 0H13V13Z"
              fill="#8052ff"
              className="opacity-95 transition-transform group-hover:scale-105"
            />
            <path
              d="M13 13C13 20.18 18.82 26 26 26V13H13Z"
              fill="#ffb829"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
            <path
              d="M13 13C5.82 13 0 18.82 0 26H13V13Z"
              fill="#ff8e52"
              className="opacity-90 transition-transform group-hover:scale-105"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-mono font-medium text-white tracking-wider uppercase">
            CUSTOMER SUPPORT
          </span>
          <span className="text-[10px] font-mono text-[#9a9a9a] tracking-widest uppercase">
            INTELLIGENCE & RESOLUTION
          </span>
        </div>
      </div>

      {/* Center Nav Links to Major Story Stages */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider">
        <button
          onClick={() => onNavigateStage(0.05)}
          className={`cursor-pointer transition-colors ${
            progress <= 0.14 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          01 BRAIN
        </button>
        <button
          onClick={() => onNavigateStage(0.20)}
          className={`cursor-pointer transition-colors ${
            progress > 0.14 && progress <= 0.27 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          02 SIGNALS
        </button>
        <button
          onClick={() => onNavigateStage(0.35)}
          className={`cursor-pointer transition-colors ${
            progress > 0.27 && progress <= 0.42 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          03 CLUSTERS
        </button>
        <button
          onClick={() => onNavigateStage(0.50)}
          className={`cursor-pointer transition-colors ${
            progress > 0.42 && progress <= 0.56 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          04 INSIGHT BULB
        </button>
        <button
          onClick={() => onNavigateStage(0.72)}
          className={`cursor-pointer transition-colors ${
            progress > 0.56 && progress <= 0.83 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          05 INVESTIGATION
        </button>
        <button
          onClick={() => onNavigateStage(0.88)}
          className={`cursor-pointer transition-colors ${
            progress > 0.83 && progress <= 0.94 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          06 APPROVAL
        </button>
        <button
          onClick={() => onNavigateStage(0.98)}
          className={`cursor-pointer transition-colors ${
            progress > 0.94 ? 'text-white' : 'text-[#9a9a9a] hover:text-white'
          }`}
        >
          07 RESOLUTION
        </button>
      </nav>

      {/* Right Action: Enter Operational Cockpit */}
      <div className="flex items-center gap-4">
        <button
          onClick={onEnterApp}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-mono font-medium tracking-wide transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/40 cursor-pointer"
        >
          <span>Enter Application</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
};
