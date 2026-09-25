// BulbScene.tsx
// Scene 4: The particles converge from clusters to form the iconic LIGHT BULB / INSIGHT shape.

import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

interface BulbSceneProps {
  progress: number;
}

export const BulbScene: React.FC<BulbSceneProps> = ({ progress }) => {
  // Fade in from 0.48 to 0.54, hold strongly until 0.60, fade out by 0.65
  let opacity = 0;
  if (progress >= 0.48 && progress < 0.54) {
    opacity = (progress - 0.48) / 0.06;
  } else if (progress >= 0.54 && progress <= 0.60) {
    opacity = 1;
  } else if (progress > 0.60 && progress <= 0.65) {
    opacity = 1 - (progress - 0.60) / 0.05;
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Left Column: Large Typographic Statement */}
      <div className="max-w-2xl space-y-6 my-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ffb829] uppercase tracking-wider">
          <Lightbulb className="h-3.5 w-3.5 text-[#ffb829]" />
          <span>04 / ILLUMINATED INSIGHT</span>
        </div>

        {/* Signature headline */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-[-0.04em] text-white leading-[1.03]">
          From noise <br />
          <span className="text-[#ffb829]">to insight.</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          When thousands of disparate complaints are mapped into latent semantic space, chaos condenses into illuminating operational clarity. The intelligence engine identifies not just what broke, but why.
        </p>

        {/* Insight Telemetry Capsule */}
        <div className="p-4 rounded-2xl bg-[#080808]/90 border border-[#ffb829]/30 backdrop-blur-md space-y-2 max-w-lg">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#ffb829] font-medium uppercase tracking-wider">
              ● Systemic Root Cause Isolated
            </span>
            <span className="text-[#15846e]">99.4% CONFIDENCE</span>
          </div>
          <p className="text-xs text-white font-mono leading-relaxed">
            "Payment Gateway v2 webhook timeout on automated voids during peak cart traffic."
          </p>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9a9a9a]">
            <span>Affected: 184 customers</span>
            <span>Preventable Churn Risk: $27,400</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>PARTICLE CONVERGENCE: INSIGHT BULB</span>
        <span className="text-[#ffb829]">● ILLUMINATING SYSTEMIC FAILURE</span>
      </div>
    </div>
  );
};
