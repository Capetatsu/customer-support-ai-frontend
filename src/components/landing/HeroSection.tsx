import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Filter, Layers, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onEnterApp: () => void;
}

interface SignalNode {
  id: string;
  label: string;
  type: 'complaint' | 'review' | 'ticket' | 'order' | 'payment' | 'delivery';
  scatteredX: number;
  scatteredY: number;
  clusteredX: number;
  clusteredY: number;
  cluster: string;
  color: string;
}

const initialSignals: SignalNode[] = [
  { id: '1', label: 'Refund pending 8d', type: 'complaint', scatteredX: 18, scatteredY: 22, clusteredX: 28, clusteredY: 34, cluster: 'Billing', color: '#8052ff' },
  { id: '2', label: 'Delivery delayed', type: 'delivery', scatteredX: 74, scatteredY: 18, clusteredX: 68, clusteredY: 32, cluster: 'Logistics', color: '#ffb829' },
  { id: '3', label: 'Double charged sub', type: 'payment', scatteredX: 30, scatteredY: 68, clusteredX: 32, clusteredY: 42, cluster: 'Billing', color: '#8052ff' },
  { id: '4', label: 'Damaged item', type: 'complaint', scatteredX: 82, scatteredY: 62, clusteredX: 72, clusteredY: 68, cluster: 'Quality', color: '#15846e' },
  { id: '5', label: 'Missing accessory', type: 'ticket', scatteredX: 48, scatteredY: 16, clusteredX: 66, clusteredY: 72, cluster: 'Quality', color: '#15846e' },
  { id: '6', label: 'Return label expired', type: 'order', scatteredX: 12, scatteredY: 52, clusteredX: 36, clusteredY: 36, cluster: 'Billing', color: '#8052ff' },
  { id: '7', label: 'Carrier tracking lost', type: 'delivery', scatteredX: 62, scatteredY: 78, clusteredX: 72, clusteredY: 38, cluster: 'Logistics', color: '#ffb829' },
  { id: '8', label: 'Poor packaging 1-star', type: 'review', scatteredX: 88, scatteredY: 38, clusteredX: 74, clusteredY: 76, cluster: 'Quality', color: '#15846e' },
  { id: '9', label: 'Wrong item size', type: 'ticket', scatteredX: 42, scatteredY: 82, clusteredX: 68, clusteredY: 64, cluster: 'Quality', color: '#15846e' },
  { id: '10', label: 'Stuck in customs', type: 'delivery', scatteredX: 68, scatteredY: 28, clusteredX: 64, clusteredY: 38, cluster: 'Logistics', color: '#ffb829' },
  { id: '11', label: 'Chargeback threatened', type: 'complaint', scatteredX: 24, scatteredY: 36, clusteredX: 26, clusteredY: 46, cluster: 'Billing', color: '#8052ff' },
  { id: '12', label: 'Checkout gateway 502', type: 'payment', scatteredX: 36, scatteredY: 26, clusteredX: 34, clusteredY: 48, cluster: 'Billing', color: '#8052ff' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onEnterApp,
}) => {
  const [isClustered, setIsClustered] = useState(false);
  const [activeSignal, setActiveSignal] = useState<SignalNode | null>(null);

  // Auto toggle cluster preview after short delay to show the transformation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClustered(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 overflow-hidden bg-[#000000]">
      {/* Subtle background ambient lines and coordinate grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      {/* Top Coordinate Marker */}
      <div className="relative max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-[#9a9a9a] font-mono select-none">
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

      {/* Main Hero Content & Split Visualization */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Huge lightweight typography & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono text-[#bdbdbd]">
            <span className="text-[#8052ff]">01</span>
            <span className="text-[#9a9a9a]">/</span>
            <span className="tracking-wider uppercase text-[11px]">
              Customer Intelligence + Resolution
            </span>
          </div>

          {/* Huge Headline (Weight 300 / 400, negative tracking, Refero style) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-light tracking-[-0.04em] text-white leading-[1.04]">
            Turn customer <br />
            <span className="text-[#8052ff]">complaints</span> <br />
            into decisions.
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl font-light text-[#9a9a9a] max-w-xl leading-relaxed tracking-tight">
            Understand recurring systemic failures. Investigate individual customer cases with policy grounding. Propose and execute verifiable resolutions under human approval gates.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplore}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-normal text-sm hover:bg-[#eaeaea] transition-all cursor-pointer"
            >
              <span>Explore the system</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-black" />
            </button>

            <button
              onClick={onEnterApp}
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white font-normal text-sm transition-all shadow-xl shadow-[#8052ff]/20 hover:shadow-[#8052ff]/40 cursor-pointer"
            >
              <span>Open dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Key Metric Chips */}
          <div className="pt-6 border-t border-[#1a1a1a] flex flex-wrap items-center gap-8 text-xs font-mono text-[#9a9a9a]">
            <div>
              <p className="text-white text-lg font-light tracking-tight font-sans">
                10-Step
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Investigation Flow</p>
            </div>
            <div className="h-7 w-px bg-[#1a1a1a]" />
            <div>
              <p className="text-[#8052ff] text-lg font-light tracking-tight font-sans">
                Semantic
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Pattern Clustering</p>
            </div>
            <div className="h-7 w-px bg-[#1a1a1a]" />
            <div>
              <p className="text-[#ffb829] text-lg font-light tracking-tight font-sans">
                100%
              </p>
              <p className="text-[10px] text-[#9a9a9a] uppercase">Human Approval Gate</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual — Abstract Signals & Clustering Network */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-3xl bg-[#080808] border border-white/5 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Visual Frame Header */}
            <div className="flex items-center justify-between text-[11px] font-mono z-10">
              <div className="flex items-center gap-2 text-[#bdbdbd]">
                <Layers className="h-3.5 w-3.5 text-[#8052ff]" />
                <span>LATENT SIGNAL MAP</span>
              </div>
              {/* Interactive clustering toggle */}
              <button
                onClick={() => setIsClustered(!isClustered)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] transition-all cursor-pointer border ${
                  isClustered
                    ? 'bg-[#8052ff]/20 text-[#8052ff] border-[#8052ff]/40'
                    : 'bg-[#141414] text-[#9a9a9a] border-white/10 hover:text-white'
                }`}
              >
                <Filter className="h-3 w-3" />
                <span>{isClustered ? 'Grouped by Pattern' : 'Scattered Raw Signals'}</span>
              </button>
            </div>

            {/* Interactive Signal Canvas */}
            <div className="relative w-full h-[320px] my-auto">
              {/* Connecting lines between nodes when clustered */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {isClustered ? (
                  <>
                    {/* Cluster 1: Billing lines */}
                    <line x1="28%" y1="34%" x2="32%" y2="42%" stroke="#8052ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="32%" y1="42%" x2="36%" y2="36%" stroke="#8052ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="32%" y1="42%" x2="26%" y2="46%" stroke="#8052ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="26%" y1="46%" x2="34%" y2="48%" stroke="#8052ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Cluster 2: Logistics lines */}
                    <line x1="68%" y1="32%" x2="72%" y2="38%" stroke="#ffb829" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="72%" y1="38%" x2="64%" y2="38%" stroke="#ffb829" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Cluster 3: Quality lines */}
                    <line x1="72%" y1="68%" x2="66%" y2="72%" stroke="#15846e" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="66%" y1="72%" x2="74%" y2="76%" stroke="#15846e" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="66%" y1="72%" x2="68%" y2="64%" stroke="#15846e" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Triangles for Refero angular aesthetic */}
                    <polygon points="100,120 130,160 85,155" fill="none" stroke="#8052ff" strokeWidth="0.8" strokeOpacity="0.25" />
                    <polygon points="260,110 290,130 250,140" fill="none" stroke="#ffb829" strokeWidth="0.8" strokeOpacity="0.25" />
                    <polygon points="270,220 300,250 255,240" fill="none" stroke="#15846e" strokeWidth="0.8" strokeOpacity="0.25" />
                  </>
                ) : (
                  <>
                    {/* Faint ambient wireframe */}
                    <line x1="18%" y1="22%" x2="74%" y2="18%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                    <line x1="74%" y1="18%" x2="82%" y2="62%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                    <line x1="30%" y1="68%" x2="48%" y2="16%" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
                  </>
                )}
              </svg>

              {/* Cluster Hub Labels when clustered */}
              {isClustered && (
                <>
                  <div className="absolute left-[20%] top-[24%] px-2 py-0.5 rounded bg-[#8052ff]/10 border border-[#8052ff]/30 text-[#8052ff] font-mono text-[9px] uppercase tracking-wider animate-in fade-in duration-500">
                    Cluster #1: Billing & Gateway
                  </div>
                  <div className="absolute right-[12%] top-[20%] px-2 py-0.5 rounded bg-[#ffb829]/10 border border-[#ffb829]/30 text-[#ffb829] font-mono text-[9px] uppercase tracking-wider animate-in fade-in duration-500">
                    Cluster #2: Carrier Logistics
                  </div>
                  <div className="absolute right-[10%] bottom-[12%] px-2 py-0.5 rounded bg-[#15846e]/10 border border-[#15846e]/30 text-[#15846e] font-mono text-[9px] uppercase tracking-wider animate-in fade-in duration-500">
                    Cluster #3: Packaging & Damage
                  </div>
                </>
              )}

              {/* Render Signal Nodes */}
              {initialSignals.map((node) => {
                const posX = isClustered ? node.clusteredX : node.scatteredX;
                const posY = isClustered ? node.clusteredY : node.scatteredY;

                return (
                  <motion.div
                    key={node.id}
                    animate={{ left: `${posX}%`, top: `${posY}%` }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    onMouseEnter={() => setActiveSignal(node)}
                    onMouseLeave={() => setActiveSignal(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse point */}
                      <div
                        className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ backgroundColor: node.color }}
                      />
                      {/* Small subtle label */}
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono text-[#bdbdbd] group-hover:text-white transition-colors bg-[#000000]/80 px-1 rounded border border-white/5 opacity-80 group-hover:opacity-100">
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Visual Frame Footer Caption */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9a9a9a] z-10">
              <span className="text-[#bdbdbd]">
                {activeSignal ? (
                  <span className="text-white">
                    Inspecting: <span style={{ color: activeSignal.color }}>{activeSignal.label}</span> [{activeSignal.type}]
                  </span>
                ) : (
                  <span>
                    {isClustered
                      ? '3 Emergent Clusters identified by HDBSCAN'
                      : 'Thousands of scattered customer signals'}
                  </span>
                )}
              </span>
              <span className="text-[#8052ff] cursor-pointer hover:underline" onClick={() => setIsClustered(!isClustered)}>
                {isClustered ? 'Scatter' : 'Cluster'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div className="relative max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[#141414] text-xs font-mono text-[#9a9a9a]">
        <button
          onClick={onExplore}
          className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowDown className="h-3.5 w-3.5 text-[#8052ff] animate-bounce" />
          <span>Scroll to uncover the customer intelligence story</span>
        </button>
        <span className="hidden sm:inline text-[#9a9a9a]">SCROLL // 01 → 06</span>
      </div>
    </section>
  );
};
