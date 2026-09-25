// BulbScene.tsx
// Screenshot 1: "Spark lightbulb moments" (Text on right, diagonal incandescent bulb on left)

import React from 'react';

interface BulbSceneProps {
  opacity: number;
}

export const BulbScene: React.FC<BulbSceneProps> = ({ opacity }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        opacity,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex items-center justify-end px-6 md:px-16 lg:px-24 transition-opacity duration-150 select-none"
    >
      <div className="max-w-xl space-y-6">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal tracking-[-0.04em] text-white leading-[1.02]">
          Spark lightbulb <br />
          moments
        </h2>

        {/* 3 Ultra-light narrative paragraphs */}
        <div className="space-y-4 text-sm sm:text-base font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          <p>
            Dala is your intelligent, real-time source of truth that eliminates the cultural, financial and operational struggles of splintered tools.
          </p>

          <p>
            We connect your systems behind the scenes and pull together exactly the knowledge you require into an elegant contextual view.
          </p>

          <p>
            Just ask Dala for the answer that advances your work, and helps you make better decisions with more confidence.
          </p>
        </div>
      </div>
    </div>
  );
};
