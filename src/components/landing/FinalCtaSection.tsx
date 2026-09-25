import React from 'react';
import { ArrowRight, Inbox, Briefcase, CheckCircle, BarChart3 } from 'lucide-react';

interface FinalCtaSectionProps {
  onEnterApp: () => void;
  onNavigateRoute: (route: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onEnterApp,
  onNavigateRoute,
}) => {
  return (
    <section className="relative py-36 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      {/* Subtle geometric wireframe watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="50" cy="50" r="48" stroke="#8052ff" strokeWidth="0.5" strokeDasharray="2,2" />
          <polygon points="50,2 98,85 2,85" stroke="#ffffff" strokeWidth="0.4" />
          <polygon points="50,15 88,80 12,80" stroke="#ffb829" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono text-[#bdbdbd]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15846e]" />
          <span>PRODUCTION-READY OPERATIONS PLATFORM</span>
        </div>

        {/* Huge lightweight headline */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] text-white leading-[1.05]">
          Step into the <br />
          <span className="text-[#8052ff]">operational</span> cockpit.
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl font-light text-[#9a9a9a] max-w-2xl mx-auto leading-relaxed">
          From unstructured complaint streams to verified, human-governed resolutions in under 300 milliseconds.
        </p>

        {/* Primary Enter Application Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onEnterApp}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white font-normal text-base transition-all shadow-2xl shadow-[#8052ff]/30 hover:shadow-[#8052ff]/50 cursor-pointer"
          >
            <span>Enter Application</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Direct quick jumps into specific application views */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-[#9a9a9a]">
          <span className="text-[#bdbdbd]">DIRECT LAUNCH:</span>
          <button
            onClick={() => onNavigateRoute('complaints')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#080808] border border-white/5"
          >
            <Inbox className="h-3 w-3 text-[#8052ff]" />
            <span>Complaints Queue</span>
          </button>
          <button
            onClick={() => onNavigateRoute('cases')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#080808] border border-white/5"
          >
            <Briefcase className="h-3 w-3 text-[#ffb829]" />
            <span>Case Investigations</span>
          </button>
          <button
            onClick={() => onNavigateRoute('approvals')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#080808] border border-white/5"
          >
            <CheckCircle className="h-3 w-3 text-[#15846e]" />
            <span>Approvals Gate</span>
          </button>
          <button
            onClick={() => onNavigateRoute('analytics')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#080808] border border-white/5"
          >
            <BarChart3 className="h-3 w-3 text-[#bdbdbd]" />
            <span>Telemetry Analytics</span>
          </button>
        </div>
      </div>
    </section>
  );
};
