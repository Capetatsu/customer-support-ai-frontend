import React from 'react';
import { ArrowUp } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#141414] bg-[#000000] py-16 px-6 text-xs text-[#9a9a9a]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/5">
          {/* Brand & Angular Vector */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,20 2,20" stroke="#8052ff" strokeWidth="1.8" fill="none" />
              <polygon points="12,7 19,19 5,19" fill="#8052ff" fillOpacity="0.25" />
              <circle cx="12" cy="13" r="2" fill="#ffb829" />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-light text-white tracking-tight">Customer Support AI</span>
              <span className="text-[10px] font-mono text-[#9a9a9a]">Intelligence & Resolution Platform</span>
            </div>
          </div>

          {/* Architecture Credits */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-[#bdbdbd]">
            <span>Student 1: DB & API</span>
            <span className="text-[#333333]">/</span>
            <span>Student 2: NLP Clustering</span>
            <span className="text-[#333333]">/</span>
            <span>Student 3: Resolution Reasoner</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#8052ff]">Student 4: Frontend UI</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-xs font-mono self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#15846e]" />
            <span className="text-[#bdbdbd]">CONTRACT SPEC v1.0 · OPERATIONAL</span>
          </div>
          <p className="text-[#9a9a9a]">
            Pure Refero Black-Void Architecture (#000000) · Inter 300 / JetBrains Mono
          </p>
        </div>
      </div>
    </footer>
  );
};
