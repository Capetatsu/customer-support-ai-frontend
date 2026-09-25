// ApprovalScene.tsx
// Scene 6: The particles encounter the vertical Human Approval Gate.

import React, { useState } from 'react';
import { Lock, ShieldCheck, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ApprovalSceneProps {
  progress: number;
  onApproveGate: () => void;
}

export const ApprovalScene: React.FC<ApprovalSceneProps> = ({
  progress,
  onApproveGate,
}) => {
  const [approved, setApproved] = useState(false);

  // Fade in from 0.80 to 0.84, hold until 0.90, fade out by 0.94
  let opacity = 0;
  if (progress >= 0.80 && progress < 0.84) {
    opacity = (progress - 0.80) / 0.04;
  } else if (progress >= 0.84 && progress <= 0.90) {
    opacity = 1;
  } else if (progress > 0.90 && progress <= 0.94) {
    opacity = 1 - (progress - 0.90) / 0.04;
  }

  if (opacity <= 0) return null;

  const handleApprove = () => {
    setApproved(true);
    onApproveGate();
  };

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Narrative on Left */}
      <div className="max-w-xl space-y-5 my-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ffb829] uppercase tracking-wider">
          <Lock className="h-3.5 w-3.5" />
          <span>06 / HUMAN APPROVAL GATE</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.04em] text-white leading-tight">
          Human approval <br />
          <span className="text-[#ffb829]">when it matters.</span>
        </h2>

        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] leading-relaxed">
          Full autonomy without oversight is a liability. While low-risk adjustments execute automatically, consequential refunds halt at an explicit decision barrier.
        </p>

        {/* Interactive Gate Console */}
        <div className="p-5 rounded-2xl bg-[#080808]/90 border border-[#ffb829]/40 backdrop-blur-md space-y-4 max-w-md shadow-2xl">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-medium">FINANCIAL GUARDRAIL TRIGGER</span>
            <span className="text-[#ffb829] font-mono">&gt; $50.00 LIMIT</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#bdbdbd]">
              Proposed Action: <strong className="text-white font-medium">Expedited Replacement + $25 Credit</strong>
            </p>
            <p className="text-[11px] font-mono text-[#9a9a9a]">
              Exposure: $189.50 · SLA: 2 Hours · Policy: §4.2 VIP
            </p>
          </div>

          {/* Interactive Gate Button */}
          {!approved ? (
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-normal transition-all shadow-md shadow-[#8052ff]/25 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Sanction & Open Gate</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#15846e]/15 border border-[#15846e]/30 flex items-center justify-between text-xs font-mono text-[#15846e]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>GATE OPEN · SANCTION DISPATCHED</span>
              </span>
              <button
                onClick={() => setApproved(false)}
                className="text-[10px] text-[#9a9a9a] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>DECISION BOUNDARY: AMBER PARTICLE BARRIER</span>
        <span className="text-[#ffb829]">{approved ? '● BARRIER OPEN' : '● AWAITING OPERATOR SIGN-OFF'}</span>
      </div>
    </div>
  );
};
