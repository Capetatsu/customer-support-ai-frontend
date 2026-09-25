// ScrollProgress.tsx
// Minimal, non-intrusive vertical stage indicator for the scroll narrative

import React from 'react';

interface ScrollProgressProps {
  progress: number;
  onSelectProgress: (p: number) => void;
}

const stages = [
  { label: '01 BRAIN', min: 0.00, max: 0.14, target: 0.05 },
  { label: '02 SIGNALS', min: 0.14, max: 0.27, target: 0.20 },
  { label: '03 CLUSTERS', min: 0.27, max: 0.42, target: 0.35 },
  { label: '04 INSIGHT', min: 0.42, max: 0.56, target: 0.50 },
  { label: '05 INVESTIGATION', min: 0.56, max: 0.83, target: 0.72 },
  { label: '06 APPROVAL', min: 0.83, max: 0.94, target: 0.88 },
  { label: '07 RESOLUTION', min: 0.94, max: 1.00, target: 0.98 },
];

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  progress,
  onSelectProgress,
}) => {
  return (
    <aside className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4 select-none font-mono text-[11px] pointer-events-auto">
      {stages.map((s, idx) => {
        const isActive = progress >= s.min && progress <= s.max;

        return (
          <button
            key={idx}
            onClick={() => onSelectProgress(s.target)}
            className="group flex items-center gap-3 text-left transition-all cursor-pointer"
          >
            {/* Minimal line / dot */}
            <span
              className={`h-px transition-all duration-200 ${
                isActive ? 'w-8 bg-[#8052ff]' : 'w-3 bg-white/20 group-hover:bg-white/40'
              }`}
            />
            {/* Label */}
            <span
              className={`transition-colors duration-200 ${
                isActive ? 'text-white font-medium' : 'text-[#666666] group-hover:text-[#9a9a9a]'
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
