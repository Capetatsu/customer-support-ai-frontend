// InvestigationScene.tsx
// Scene 5: Bulb dissolves; particles reorganize into the 7-node investigation network for an individual case.

import React from 'react';
import { Search, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface InvestigationSceneProps {
  progress: number;
}

export const InvestigationScene: React.FC<InvestigationSceneProps> = ({ progress }) => {
  // Fade in from 0.65 to 0.70, hold until 0.76, fade out by 0.82
  let opacity = 0;
  if (progress >= 0.65 && progress < 0.70) {
    opacity = (progress - 0.65) / 0.05;
  } else if (progress >= 0.70 && progress <= 0.76) {
    opacity = 1;
  } else if (progress > 0.76 && progress <= 0.82) {
    opacity = 1 - (progress - 0.76) / 0.06;
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Left Column: Case Narrative */}
      <div className="max-w-xl space-y-5 my-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
          <Search className="h-3.5 w-3.5" />
          <span>05 / STUDENT 3 INVESTIGATION REASONER</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.04em] text-white leading-tight">
          Don't guess. <br />
          <span className="text-[#8052ff]">Investigate.</span>
        </h2>

        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] leading-relaxed">
          The bulb dissolves as attention narrows to an individual complaint. A live 10-step investigation traverses customer records, carrier logistics APIs, and refund policies.
        </p>

        {/* Case Badge & Evidence Convergence Capsule */}
        <div className="p-4 rounded-2xl bg-[#080808]/90 border border-white/10 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-semibold">CASE #CAS-2024-001</span>
            <span className="text-[#8052ff] bg-[#8052ff]/10 px-2 py-0.5 rounded border border-[#8052ff]/20">
              VIP Tier ($4.8k LTV)
            </span>
          </div>

          <p className="text-xs text-[#bdbdbd] italic font-light">
            "My package arrived with broken interior seal and damaged components."
          </p>

          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-[#0e0e0e] border border-white/5">
              <span className="text-[#9a9a9a]">LOGISTICS API:</span>
              <p className="text-white font-sans mt-0.5 font-light">Denver terminal sort delay</p>
            </div>
            <div className="p-2 rounded-lg bg-[#0e0e0e] border border-white/5">
              <span className="text-[#15846e]">POLICY ENGINE:</span>
              <p className="text-white font-sans mt-0.5 font-light">§4.2 VIP Replacement valid</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>MULTI-HOP EVIDENCE RETRIEVAL</span>
        <span>7 GRAPH NODES CONVERGING</span>
      </div>
    </div>
  );
};
