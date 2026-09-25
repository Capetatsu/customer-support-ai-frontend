// BrainScene.tsx
// Screenshot 5: "Unlock collective wisdom."

import React from 'react';

interface BrainSceneProps {
  opacity: number;
  onRequestAccess: () => void;
}

export const BrainScene: React.FC<BrainSceneProps> = ({
  opacity,
  onRequestAccess,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        opacity,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex items-center px-6 md:px-16 lg:px-24 transition-opacity duration-150 select-none"
    >
      <div className="max-w-xl space-y-6">
        {/* Massive Grotesque Title (Weight 400, tight line height and tracking) */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-normal tracking-[-0.04em] text-white leading-[0.98]">
          Unlock <br />
          collective <br />
          wisdom.
        </h1>

        {/* Saffron Amber Accent Micro-Header */}
        <div className="pt-2">
          <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-wider uppercase text-[#ffb829]">
            STOP MANAGING KNOWLEDGE. START USING IT.
          </p>
        </div>

        {/* Ultra-light body paragraph (Inter weight 200, airy line height) */}
        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          Plug into your team's shared brainpower. Ask Dala to instantly find anything or anyone from any workplace system. Focus on doing your best work with context, conviction and clarity.
        </p>

        {/* Solid Violet Pill Button */}
        <div className="pt-2">
          <button
            onClick={onRequestAccess}
            className="px-6 py-3 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-mono tracking-wide uppercase transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/45 cursor-pointer"
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
};
