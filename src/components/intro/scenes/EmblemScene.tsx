// EmblemScene.tsx
// Screenshot 4: "Your workplace has the answer. Ask Dala to find it." & 4-Petal Propeller Emblem

import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface EmblemSceneProps {
  opacity: number;
  onRequestAccess: () => void;
  onEnterCockpit: () => void;
}

export const EmblemScene: React.FC<EmblemSceneProps> = ({
  opacity,
  onRequestAccess,
  onEnterCockpit,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      style={{
        opacity,
        pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-12 px-6 md:px-16 transition-opacity duration-150 select-none"
    >
      <div />

      {/* Centerpiece Typography & Action */}
      <div className="max-w-3xl mx-auto text-center space-y-6 my-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-[-0.04em] text-white leading-[1.08]">
          Your workplace has the answer. <br />
          Ask Dala to find it.
        </h2>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Exact Violet Pill Button */}
          <button
            onClick={onRequestAccess}
            className="px-6 py-3 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-mono tracking-wide uppercase transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/45 cursor-pointer"
          >
            Request Access
          </button>

          {/* Quick Jump to Customer Support Operations Cockpit */}
          <button
            onClick={onEnterCockpit}
            className="px-5 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-[#bdbdbd] hover:text-white text-xs font-mono tracking-wide transition-all cursor-pointer"
          >
            Enter Operations Cockpit →
          </button>
        </div>
      </div>

      {/* Exact Minimal Footer from Screenshot 4 */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9a9a9a] pt-6 border-t border-white/5">
        <p>© 2021 Dala Technologies Limited. All rights reserved.</p>

        <div className="flex items-center gap-6 text-[#bdbdbd]">
          <span className="hover:text-white cursor-pointer transition-colors">MANIFESTO</span>
          <span className="hover:text-white cursor-pointer transition-colors">TEAM</span>
          <span className="hover:text-white cursor-pointer transition-colors">BLOG</span>
          <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
          <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
        </div>

        <div className="flex items-center gap-4 text-[#bdbdbd]">
          <Linkedin className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
          <Mail className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};
