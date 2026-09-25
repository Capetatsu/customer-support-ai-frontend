// ResolutionScene.tsx
// Scene 7: Final Resolution & Seamless Application Reveal.

import React from 'react';
import { ArrowRight, CheckCircle2, Inbox, Briefcase, CheckCircle, BarChart3 } from 'lucide-react';

interface ResolutionSceneProps {
  progress: number;
  onEnterApp: (route?: string) => void;
}

export const ResolutionScene: React.FC<ResolutionSceneProps> = ({
  progress,
  onEnterApp,
}) => {
  // Fade in from 0.92 to 0.96, hold at 1.0
  let opacity = 0;
  if (progress >= 0.92) {
    opacity = Math.min(1, (progress - 0.92) / 0.05);
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Center Hero Reveal */}
      <div className="max-w-3xl mx-auto my-auto text-center space-y-8 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono text-[#bdbdbd]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15846e]" />
          <span>CLOSED-LOOP OPERATIONAL SYSTEM</span>
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] text-white leading-[1.04]">
          From complaint to <br />
          <span className="text-[#8052ff]">resolution</span> in 280ms.
        </h2>

        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] max-w-xl mx-auto leading-relaxed">
          The cycle is complete. Automated investigation, policy grounding, human sanction, and customer fulfillment unified in one architecture.
        </p>

        {/* Primary Enter Application CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onEnterApp('dashboard')}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white font-normal text-sm transition-all shadow-2xl shadow-[#8052ff]/30 hover:shadow-[#8052ff]/50 cursor-pointer"
          >
            <span>Ready to investigate — Enter Application</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Direct quick jumps into specific application views */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#9a9a9a]">
          <span className="text-[#bdbdbd]">DIRECT COCKPIT MODULES:</span>
          <button
            onClick={() => onEnterApp('complaints')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#080808] border border-white/10 cursor-pointer"
          >
            <Inbox className="h-3 w-3 text-[#8052ff]" />
            <span>Complaints Stream</span>
          </button>
          <button
            onClick={() => onEnterApp('cases')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#080808] border border-white/10 cursor-pointer"
          >
            <Briefcase className="h-3 w-3 text-[#ffb829]" />
            <span>Case Reasoner</span>
          </button>
          <button
            onClick={() => onEnterApp('approvals')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#080808] border border-white/10 cursor-pointer"
          >
            <CheckCircle className="h-3 w-3 text-[#15846e]" />
            <span>Approval Gate</span>
          </button>
          <button
            onClick={() => onEnterApp('analytics')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#080808] border border-white/10 cursor-pointer"
          >
            <BarChart3 className="h-3 w-3 text-[#bdbdbd]" />
            <span>Intelligence Telemetry</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>FINAL STATE: CONVERGENT HARMONIC RING</span>
        <span className="text-[#15846e]">● ALL SERVICES VERIFIED</span>
      </div>
    </div>
  );
};
