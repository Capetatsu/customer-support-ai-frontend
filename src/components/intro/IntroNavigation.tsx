// IntroNavigation.tsx
// Minimal top bar - 4 main navigation items

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ShapeName } from './ParticleEngine';

interface IntroNavigationProps {
  currentScene: ShapeName;
  formationProgress: number;
  isForming: boolean;
  onNextScene: () => void;
  onPrevScene: () => void;
  onSelectScene: (scene: ShapeName) => void;
  onTriggerReform: () => void;
  onRequestAccess: () => void;
  onEnterCockpit: () => void;
}

const MAIN_NAV: { key: ShapeName; label: string }[] = [
  { key: 'brain', label: 'Problem' },
  { key: 'clusters', label: 'Intelligence' },
  { key: 'investigation', label: 'Investigation' },
  { key: 'resolution', label: 'Resolution' },
];

export const IntroNavigation: React.FC<IntroNavigationProps> = ({
  currentScene,
  formationProgress,
  isForming,
  onNextScene,
  onPrevScene,
  onSelectScene,
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
    <header className="fixed top-0 left-0 right-0 z-40 py-5 px-6 md:px-12 flex items-center justify-between select-none pointer-events-auto">
      {/* Logo */}
      <div
        onClick={() => onSelectScene('brain')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-105">
            <polygon points="12,2 22,20 2,20" stroke="#8052ff" strokeWidth="2" fill="none" />
            <polygon points="12,7 19,19 5,19" fill="#8052ff" fillOpacity="0.25" />
            <circle cx="12" cy="13" r="2" fill="#15846e" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono font-medium text-white tracking-wider uppercase">
            Customer Support
          </span>
          <span className="text-[10px] font-mono text-[#9a9a9a] tracking-widest uppercase">
            Intelligence & Resolution
          </span>
        </div>
      </div>

      {/* Center Nav - Only 4 items */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider">
        {MAIN_NAV.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelectScene(item.key)}
            className={`cursor-pointer transition-colors ${
              currentScene === item.key ||
              (item.key === 'clusters' && (currentScene === 'scatter' || currentScene === 'bulb')) ||
              (item.key === 'investigation' && currentScene === 'recommendation')
                ? 'text-white'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Re-form Button */}
        <button
          onClick={onTriggerReform}
          title="Disperse & Re-form Particles (Space)"
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

        {/* Enter Application */}
        <button
          onClick={onEnterCockpit}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-mono font-medium tracking-wide transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/40 cursor-pointer"
        >
          <span>Enter Application</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
};