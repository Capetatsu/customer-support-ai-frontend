// HeroScene.tsx
// Opening cinematic viewport: Large typography on the left, living Particle Brain on the right.

import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HeroSceneProps {
  progress: number;
  onExplore: () => void;
  onEnterApp: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  progress,
  onExplore,
  onEnterApp,
}) => {
  // Fade out and translate as progress goes from 0.08 to 0.18
  const opacity = Math.max(0, Math.min(1, 1 - (progress - 0.08) / 0.08));
  const translateY = -(progress * 180);

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex flex-col justify-between pt-28 pb-12 px-6 md:px-16 transition-opacity duration-150"
    >
      {/* Top telemetry coordinate */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-[#9a9a9a] font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8052ff] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8052ff]" />
          </span>
          <span className="tracking-wider uppercase text-[11px] text-[#bdbdbd]">
            SYS // RESOLUTION-ENGINE v2.4
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px] text-[#9a9a9a]">
          <span>LATENCY &lt; 85ms</span>
          <span>AUTONOMOUS RATIO 78.4%</span>
          <span className="text-[#15846e]">● ALL SERVICES ONLINE</span>
        </div>
      </div>

      {/* Main Two-Column Composition */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Spacious Refero/Dala Typography */}
        <div className="lg:col-span-7 space-y-8 select-none">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono text-[#bdbdbd]">
            <span className="text-[#8052ff]">01</span>
            <span className="text-[#9a9a9a]">/</span>
            <span className="tracking-wider uppercase text-[11px]">
              Customer Intelligence + Resolution
            </span>
          </div>

          {/* Display Headline (Weight 400, large scale, negative tracking) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-[-0.04em] text-white leading-[1.03]">
            Turn customer <br />
            <span className="text-[#8052ff]">complaints</span> <br />
            into decisions.
          </h1>

          {/* Ultra-light body paragraph (18px, weight 200) */}
          <p className="text-base sm:text-lg md:text-xl font-extralight text-[#9a9a9a] max-w-xl leading-relaxed tracking-tight">
            Understand recurring problems. Investigate individual cases. Recommend evidence-backed resolutions under human approval gates.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplore}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-normal text-xs hover:bg-[#eaeaea] transition-all cursor-pointer shadow-lg shadow-white/10"
            >
              <span>Explore the system</span>
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 text-black" />
            </button>

            <button
              onClick={onEnterApp}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white font-normal text-xs transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/45 cursor-pointer"
            >
              <span>Enter application</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Metric chips */}
          <div className="pt-6 border-t border-[#1a1a1a] flex flex-wrap items-center gap-8 text-xs font-mono text-[#9a9a9a]">
            <div>
              <p className="text-white text-base font-light tracking-tight font-sans">
                10-Step
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Investigation Flow</p>
            </div>
            <div className="h-6 w-px bg-[#1a1a1a]" />
            <div>
              <p className="text-[#8052ff] text-base font-light tracking-tight font-sans">
                Semantic
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Pattern Clustering</p>
            </div>
            <div className="h-6 w-px bg-[#1a1a1a]" />
            <div>
              <p className="text-[#ffb829] text-base font-light tracking-tight font-sans">
                100%
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Human Approval Gate</p>
            </div>
          </div>
        </div>

        {/* Right Column: Intentionally open void so the procedural Particle Brain shines */}
        <div className="lg:col-span-5 pointer-events-none hidden lg:block" />
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a] select-none">
        <button
          onClick={onExplore}
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowDown className="h-3.5 w-3.5 text-[#8052ff] animate-bounce" />
          <span>Scroll down to disintegrate the intelligence brain into raw signals</span>
        </button>
        <span className="hidden sm:inline text-[#bdbdbd]">SCROLL // 01 → 07</span>
      </div>
    </div>
  );
};
