// IntelligenceScene.tsx
// Scene 3: Scattered particles gravitate into 4 distinct semantic clusters.

import React from 'react';
import { Flame, Cpu } from 'lucide-react';

interface IntelligenceSceneProps {
  progress: number;
}

export const IntelligenceScene: React.FC<IntelligenceSceneProps> = ({ progress }) => {
  // Fade in from 0.32 to 0.36, hold until 0.44, fade out by 0.50
  let opacity = 0;
  if (progress >= 0.32 && progress < 0.36) {
    opacity = (progress - 0.32) / 0.04;
  } else if (progress >= 0.36 && progress <= 0.44) {
    opacity = 1;
  } else if (progress > 0.44 && progress <= 0.50) {
    opacity = 1 - (progress - 0.44) / 0.06;
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Top Left Narrative */}
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
          <Cpu className="h-3.5 w-3.5" />
          <span>03 / STUDENT 2 INTELLIGENCE ENGINE</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.04em] text-white leading-tight">
          From complaints <br />
          <span className="text-[#8052ff]">to intelligence.</span>
        </h2>

        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          Every unstructured sentence passes through a 6-stage computational pipeline. Raw complaints transform into semantic clusters and emerging operational defect alarms.
        </p>

        {/* Pipeline tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-white/10 text-white">01 CLASSIFY</span>
          <span className="text-[#666666]">→</span>
          <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-white/10 text-white">02 SENTIMENT</span>
          <span className="text-[#666666]">→</span>
          <span className="px-2.5 py-1 rounded-full bg-[#111111] border border-white/10 text-white">03 SEVERITY</span>
          <span className="text-[#666666]">→</span>
          <span className="px-2.5 py-1 rounded-full bg-[#8052ff]/20 border border-[#8052ff]/40 text-[#8052ff]">04 CLUSTER</span>
          <span className="text-[#666666]">→</span>
          <span className="px-2.5 py-1 rounded-full bg-[#ffb829]/20 border border-[#ffb829]/40 text-[#ffb829]">05 TRENDS</span>
        </div>
      </div>

      {/* Cluster Hub Annotations anchored in the void */}
      <div className="hidden lg:grid grid-cols-2 gap-6 max-w-xl self-end">
        {/* Cluster 1: Refund */}
        <div className="p-3.5 rounded-xl bg-[#080808]/90 border border-[#8052ff]/30 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8052ff] uppercase font-semibold">● Cluster #1: Refund Delays</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#ffb829] bg-[#ffb829]/10 px-1.5 py-0.5 rounded">
              <Flame className="h-2.5 w-2.5" /> +34% Spike
            </span>
          </div>
          <p className="text-xs text-white">184 complaints · Root: Gateway v2 timeout on voids</p>
        </div>

        {/* Cluster 2: Delivery */}
        <div className="p-3.5 rounded-xl bg-[#080808]/90 border border-[#ffb829]/30 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#ffb829] uppercase font-semibold">● Cluster #2: Delivery Stalls</span>
            <span className="text-[10px] font-mono text-[#ffb829]">+18%</span>
          </div>
          <p className="text-xs text-white">126 complaints · Root: Denver hub sorting stall</p>
        </div>

        {/* Cluster 3: Payment */}
        <div className="p-3.5 rounded-xl bg-[#080808]/90 border border-[#15846e]/30 backdrop-blur-sm space-y-1">
          <span className="text-xs font-mono text-[#15846e] uppercase font-semibold">● Cluster #3: Payment Disputes</span>
          <p className="text-xs text-white">78 complaints · Root: Checkout double-tap retry</p>
        </div>

        {/* Cluster 4: Damage */}
        <div className="p-3.5 rounded-xl bg-[#080808]/90 border border-white/20 backdrop-blur-sm space-y-1">
          <span className="text-xs font-mono text-white uppercase font-semibold">● Cluster #4: Transit Damage</span>
          <p className="text-xs text-white">64 complaints · Root: Missing fragile protective wrap</p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>NLP VECTOR DISTANCE &lt; 0.14</span>
        <span>4 ACTIVE PATTERN GALAXIES</span>
      </div>
    </div>
  );
};
