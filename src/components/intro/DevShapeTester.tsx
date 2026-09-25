// DevShapeTester.tsx
// Development & Quality-Check Tool:
// Allows testing and verifying each of the 8 individual point-cloud shapes independently
// and observing live scroll progress, active scene, and particle counts.

import React from 'react';
import { Eye, RotateCcw, Activity } from 'lucide-react';

interface DevShapeTesterProps {
  progress: number;
  activeScene: string;
  particleCount: number;
  manualIndex: number | null;
  onSelectManual: (index: number | null) => void;
  onScrollToProgress: (p: number) => void;
}

const shapes = [
  { index: 0, label: '01 Brain', progress: 0.05 },
  { index: 1, label: '02 Scatter', progress: 0.20 },
  { index: 2, label: '03 Clusters', progress: 0.35 },
  { index: 3, label: '04 Lightbulb', progress: 0.50 },
  { index: 4, label: '05 Investigation', progress: 0.65 },
  { index: 5, label: '06 Recommendation', progress: 0.76 },
  { index: 6, label: '07 Approval Gate', progress: 0.88 },
  { index: 7, label: '08 Resolution', progress: 0.98 },
];

export const DevShapeTester: React.FC<DevShapeTesterProps> = ({
  progress,
  activeScene,
  particleCount,
  manualIndex,
  onSelectManual,
  onScrollToProgress,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 select-none font-mono pointer-events-auto">
      {/* Control Pill */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#080808]/90 border border-white/15 backdrop-blur-md shadow-2xl text-[11px]">
        {/* Status Chip */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 text-[#9a9a9a]">
          <Activity className="h-3 w-3 text-[#8052ff] animate-pulse" />
          <span className="text-white font-medium">{(progress * 100).toFixed(0)}%</span>
          <span className="text-[#666666]">|</span>
          <span className="text-[#bdbdbd] truncate max-w-[120px]">{activeScene}</span>
        </div>

        {/* Scroll Mode (Default) */}
        <button
          onClick={() => onSelectManual(null)}
          title="Return to Scroll-driven Morphing"
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
            manualIndex === null
              ? 'bg-[#8052ff] text-white font-medium shadow-sm shadow-[#8052ff]/30'
              : 'text-[#9a9a9a] hover:text-white hover:bg-white/5'
          }`}
        >
          Scroll Mode
        </button>

        {/* Individual Shape Test Triggers */}
        {shapes.map((s) => (
          <button
            key={s.index}
            onClick={() => {
              onSelectManual(s.index);
              onScrollToProgress(s.progress);
            }}
            title={`Force target: ${s.label}`}
            className={`px-2 py-1 rounded-xl transition-all cursor-pointer ${
              manualIndex === s.index
                ? 'bg-[#ffb829] text-black font-semibold shadow-sm'
                : 'text-[#9a9a9a] hover:text-white hover:bg-white/5'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};
