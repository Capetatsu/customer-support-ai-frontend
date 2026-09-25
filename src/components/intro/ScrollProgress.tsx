// ScrollProgress.tsx
// Minimal vertical progress indicator for 7 scenes

import React from 'react';

interface ScrollProgressProps {
  progress: number;
  currentScene: string;
  onSelectProgress: (p: number) => void;
}

const SCENES = [
  { id: 'brain', label: 'PROBLEM', start: 0.00, end: 0.12, target: 0.06 },
  { id: 'scatter', label: 'SIGNALS', start: 0.12, end: 0.24, target: 0.18 },
  { id: 'clusters', label: 'INTELLIGENCE', start: 0.24, end: 0.36, target: 0.30 },
  { id: 'bulb', label: 'INSIGHT', start: 0.36, end: 0.48, target: 0.42 },
  { id: 'investigation', label: 'INVESTIGATION', start: 0.48, end: 0.60, target: 0.54 },
  { id: 'recommendation', label: 'RECOMMENDATION', start: 0.60, end: 0.72, target: 0.66 },
  { id: 'resolution', label: 'RESOLUTION', start: 0.72, end: 1.00, target: 0.86 },
];

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  progress,
  currentScene,
  onSelectProgress,
}) => {
  return (
    <aside className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4 select-none font-mono text-[11px] pointer-events-auto">
      {SCENES.map((s, idx) => {
        const isActive = progress >= s.start && progress <= s.end;
        const isCurrent = s.id === currentScene;

        return (
          <button
            key={idx}
            onClick={() => onSelectProgress(s.target)}
            className="group flex items-center gap-3 text-left transition-all cursor-pointer"
          >
            <span
              className={`h-px transition-all duration-200 ${
                isActive || isCurrent ? 'w-8 bg-[#8052ff]' : 'w-3 bg-white/20 group-hover:bg-white/40'
              }`}
            />
            <span
              className={`transition-colors duration-200 ${
                isActive || isCurrent ? 'text-white font-medium' : 'text-[#666666] group-hover:text-[#9a9a9a]'
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};