import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  TrendingUp,
  Flame,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SignalsClusterSectionProps {
  onSelectCluster: (clusterName: string) => void;
}

interface FloatingComplaint {
  id: string;
  snippet: string;
  cluster: 'Refund' | 'Delivery' | 'Payments' | 'Quality';
  channel: 'email' | 'web' | 'whatsapp';
  time: string;
}

const complaints: FloatingComplaint[] = [
  { id: 'c1', snippet: 'My refund is still pending after 14 days.', cluster: 'Refund', channel: 'web', time: '4m ago' },
  { id: 'c2', snippet: 'Order arrived with crushed outer box and cracked screen.', cluster: 'Quality', channel: 'email', time: '7m ago' },
  { id: 'c3', snippet: 'My payment was charged twice for annual subscription.', cluster: 'Payments', channel: 'whatsapp', time: '11m ago' },
  { id: 'c4', snippet: 'Delivery is three days late with zero tracking update.', cluster: 'Delivery', channel: 'web', time: '14m ago' },
  { id: 'c5', snippet: 'Received wrong size and replacement was not dispatched.', cluster: 'Quality', channel: 'email', time: '18m ago' },
  { id: 'c6', snippet: 'Return label QR code invalid at courier drop-off.', cluster: 'Refund', channel: 'web', time: '21m ago' },
  { id: 'c7', snippet: 'Courier claims delivered but my porch camera shows nothing.', cluster: 'Delivery', channel: 'whatsapp', time: '25m ago' },
  { id: 'c8', snippet: 'Checkout error 502 charged my card anyway.', cluster: 'Payments', channel: 'web', time: '29m ago' },
  { id: 'c9', snippet: 'Bottle seal broken, liquid spilled all over items.', cluster: 'Quality', channel: 'email', time: '34m ago' },
  { id: 'c10', snippet: 'Still waiting on store credit approval email.', cluster: 'Refund', channel: 'web', time: '40m ago' },
  { id: 'c11', snippet: 'Package stuck at regional distribution facility for 5 days.', cluster: 'Delivery', channel: 'web', time: '44m ago' },
  { id: 'c12', snippet: 'Card billed while account says Payment Pending.', cluster: 'Payments', channel: 'whatsapp', time: '52m ago' },
];

export const SignalsClusterSection: React.FC<SignalsClusterSectionProps> = ({
  onSelectCluster,
}) => {
  const [activeStage, setActiveStage] = useState<'scattered' | 'clustered'>('clustered');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string | null>(null);

  const clusterMeta = {
    Refund: {
      count: 184,
      change: '+34%',
      spike: true,
      color: '#8052ff',
      rootCause: 'Payment Gateway v2 webhook timeout on automated voids',
      clusterName: 'Refund Processing Delay',
    },
    Delivery: {
      count: 126,
      change: '+18%',
      spike: true,
      color: '#ffb829',
      rootCause: 'Midwest carrier regional transit stall & missing scan events',
      clusterName: 'Delivery Transit Delay',
    },
    Payments: {
      count: 78,
      change: '+8%',
      spike: false,
      color: '#15846e',
      rootCause: 'Double charge caused by impatient user retry on checkout modal',
      clusterName: 'Double Billing Dispute',
    },
    Quality: {
      count: 64,
      change: '-6%',
      spike: false,
      color: '#bdbdbd',
      rootCause: 'Fragile glassware shipped without secondary bubble wrap',
      clusterName: 'Product Damage in Transit',
    },
  };

  return (
    <section id="signals" className="relative py-32 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
            <span>02 / CUSTOMER SIGNALS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-tight">
            Thousands of signals. <br />
            <span className="text-[#8052ff]">One hidden pattern.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#9a9a9a] leading-relaxed">
            Support tickets, emails, reviews, and chat logs arrive as isolated complaints. Left unorganized, teams treat them as separate one-off headaches. The intelligence engine maps latent vector similarities to reveal the true systemic failure behind them.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#080808] border border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#9a9a9a]">VIEW MODE:</span>
            <button
              onClick={() => setActiveStage('scattered')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeStage === 'scattered'
                  ? 'bg-white text-black font-medium'
                  : 'text-[#9a9a9a] hover:text-white bg-[#141414]'
              }`}
            >
              Raw Incoming Snippets
            </button>
            <button
              onClick={() => setActiveStage('clustered')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeStage === 'clustered'
                  ? 'bg-[#8052ff] text-white font-medium shadow-md shadow-[#8052ff]/30'
                  : 'text-[#9a9a9a] hover:text-white bg-[#141414]'
              }`}
            >
              Organized into 4 Semantic Clusters
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#9a9a9a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#15846e]" />
            <span>Cosine Threshold: 0.78</span>
          </div>
        </div>

        {/* Dynamic Canvas Container */}
        {activeStage === 'scattered' ? (
          /* Scattered View: Floating subtle snippets */
          <div className="relative min-h-[460px] rounded-3xl bg-[#060606] border border-white/5 p-8 overflow-hidden flex flex-wrap gap-4 items-center justify-center content-center">
            <div className="absolute top-4 left-6 text-xs font-mono text-[#9a9a9a]">
              [UNSTRUCTURED RAW INTAKE STREAM]
            </div>

            {complaints.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="p-3.5 rounded-xl bg-[#0f0f0f] border border-white/5 max-w-xs shadow-lg hover:border-white/20 transition-all cursor-default"
              >
                <div className="flex items-center justify-between gap-2 pb-2 text-[10px] font-mono text-[#9a9a9a]">
                  <span className="uppercase text-[#bdbdbd]">Via {item.channel}</span>
                  <span>{item.time}</span>
                </div>
                <p className="text-xs text-white font-light leading-relaxed">
                  "{item.snippet}"
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Clustered View: 4 Pillars with metrics & root hypotheses */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(['Refund', 'Delivery', 'Payments', 'Quality'] as const).map((clusterKey) => {
              const meta = clusterMeta[clusterKey];
              const clusterComplaints = complaints.filter((c) => c.cluster === clusterKey);

              return (
                <motion.div
                  key={clusterKey}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-[#080808] border border-white/5 p-6 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Header: Cluster Category & Spike tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="font-mono text-xs uppercase tracking-wider text-white">
                          {clusterKey}
                        </span>
                      </div>

                      {meta.spike && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffb829]/15 border border-[#ffb829]/30 text-[#ffb829] font-mono text-[10px]">
                          <Flame className="h-3 w-3" />
                          <span>Spike</span>
                        </span>
                      )}
                    </div>

                    {/* Numeric volume & Growth rate */}
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-light text-white tracking-tight">
                          {meta.count}
                        </span>
                        <span
                          className={`text-xs font-mono font-medium ${
                            meta.change.startsWith('+') ? 'text-[#ffb829]' : 'text-[#15846e]'
                          }`}
                        >
                          {meta.change} 24h
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9a9a9a]">complaints in active cluster</p>
                    </div>

                    {/* Root Cause Hypothesis box */}
                    <div className="p-3 rounded-xl bg-[#0e0e0e] border border-white/5 space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#9a9a9a]">
                        Root Cause Hypothesis
                      </span>
                      <p className="text-xs text-white/90 font-light leading-snug">
                        {meta.rootCause}
                      </p>
                    </div>

                    {/* Contributing sample snippets */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">
                        Contributing Snippets
                      </span>
                      {clusterComplaints.slice(0, 2).map((c) => (
                        <div key={c.id} className="text-[11px] text-[#bdbdbd] font-light italic">
                          "{c.snippet}"
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Application */}
                  <button
                    onClick={() => onSelectCluster(meta.clusterName)}
                    className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs text-[#8052ff] hover:text-white transition-colors cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Filter {meta.count} complaints in app</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
