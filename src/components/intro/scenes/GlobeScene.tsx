// GlobeScene.tsx
// Screenshot 2: "Build a better world of work"

import React from 'react';

interface GlobeSceneProps {
  opacity: number;
}

export const GlobeScene: React.FC<GlobeSceneProps> = ({ opacity }) => {
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
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal tracking-[-0.04em] text-white leading-[1.02]">
          Build a better world <br />
          of work
        </h2>

        {/* 3 Ultra-light narrative paragraphs */}
        <div className="space-y-4 text-sm sm:text-base font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          <p>
            Our mission is to make work more coherent and delightful—reframing productivity from <em className="not-italic text-white">doing more</em> to <span className="text-[#ffb829] font-normal">being better</span>.
          </p>

          <p>
            Your happiest and most purposeful moments at work are when you're in flow, intellectually stimulated, and creating value for customers.
          </p>

          <p>
            We want to recreate that every time you experience Dala. A tool that is completely integrated with how you think, <span className="underline decoration-white/20 underline-offset-4">feel</span> and work.
          </p>
        </div>
      </div>
    </div>
  );
};
