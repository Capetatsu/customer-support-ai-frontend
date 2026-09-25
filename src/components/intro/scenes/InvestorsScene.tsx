// InvestorsScene.tsx
// Screenshot 3: "Our investors" with floating 3D crystals and corporate partners

import React from 'react';

interface InvestorsSceneProps {
  opacity: number;
}

export const InvestorsScene: React.FC<InvestorsSceneProps> = ({ opacity }) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        opacity,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex items-center justify-end px-6 md:px-16 lg:px-24 transition-opacity duration-150 select-none"
    >
      {/* Floating 3D Crystal Partner Labels matching Screenshot 3 */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {/* 1. Seedcamp (Top Left, Gold) */}
        <div className="absolute top-[28%] left-[12%] flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#ffb829]/20 border border-[#ffb829] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb829]" />
          </div>
          <span className="text-xl font-normal text-white font-sans tracking-tight">
            Seedcamp
          </span>
        </div>

        {/* 2. James Meekings (Mid Center-Left, Teal) */}
        <div className="absolute top-[42%] left-[26%] flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#2de0c2]/20 border border-[#2de0c2] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2de0c2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-normal text-white tracking-tight">
              James Meekings
            </span>
            <span className="text-[11px] font-extralight text-[#9a9a9a]">
              Co-founder of Funding Circle
            </span>
          </div>
        </div>

        {/* 3. Evening Fund (Mid Lower-Left, Gold) */}
        <div className="absolute top-[58%] left-[12%] flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#ffb829]/20 border border-[#ffb829] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb829]" />
          </div>
          <span className="text-xl font-normal text-white tracking-tight">
            Evening Fund
          </span>
        </div>

        {/* 4. Roman Schumacher (Lower Center, Violet) */}
        <div className="absolute top-[68%] left-[44%] flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#8052ff]/20 border border-[#8052ff] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8052ff]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-normal text-white tracking-tight">
              Roman Schumacher
            </span>
            <span className="text-[11px] font-extralight text-[#9a9a9a]">
              Co-founder & CPO of Personio
            </span>
          </div>
        </div>

        {/* 5. Valia Ventures (Bottom Left, Violet) */}
        <div className="absolute top-[76%] left-[20%] flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-[#aa75ff]/20 border border-[#aa75ff] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#aa75ff]" />
          </div>
          <span className="text-lg font-normal text-white tracking-tight">
            Valia Ventures
          </span>
        </div>
      </div>

      {/* Right Column: Title and Narrative */}
      <div className="max-w-md space-y-6">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.04em] text-white leading-[1.04]">
          Our investors
        </h2>

        <p className="text-base font-extralight text-[#9a9a9a] leading-relaxed">
          We are supported by some of the world's most pioneering operators and progressive funds to fuel our growth.
        </p>
      </div>
    </div>
  );
};
