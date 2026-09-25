import React, { useState } from 'react';
import {
  Cpu,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  BarChart2,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';

interface IntelligenceEngineSectionProps {
  onExploreAnalytics: () => void;
}

export const IntelligenceEngineSection: React.FC<IntelligenceEngineSectionProps> = ({
  onExploreAnalytics,
}) => {
  const [activeStep, setActiveStep] = useState(2); // default Sentiment

  const pipelineSteps = [
    {
      id: 0,
      name: 'RAW COMPLAINT',
      tag: 'Step 01',
      desc: 'Ingest raw text across email, web chat, and messaging',
      telemetry: {
        title: 'Incoming Ingestion Payload',
        detail: '"I have been waiting for my $149 refund for 12 days. Your support team promised 3-5 business days. This is totally unacceptable."',
        badge: 'Web Channel · Order #ORD-8821',
      },
    },
    {
      id: 1,
      name: 'CLASSIFICATION',
      tag: 'Step 02',
      desc: 'Zero-shot taxonomy categorization with confidence calibration',
      telemetry: {
        title: 'Intent Categorization',
        detail: 'Detected: REFUND_DELAY_STALLED (Confidence: 99.2%)\nSubcategory: GATEWAY_SETTLEMENT_VOID\nTarget SLA: 2 Hours Maximum',
        badge: 'Confidence 0.992',
      },
    },
    {
      id: 2,
      name: 'SENTIMENT',
      tag: 'Step 03',
      desc: 'Aspect-based emotion and frustration scoring (-1.0 to +1.0)',
      telemetry: {
        title: 'Polarity Analysis',
        detail: 'Score: -0.85 (Strongly Negative / Churn Hazard)\nKeywords: "unacceptable", "waiting 12 days", "promised"\nFrustration velocity: Urgent Escalation Alert',
        badge: 'Polarity: -0.85',
      },
    },
    {
      id: 3,
      name: 'SEVERITY',
      tag: 'Step 04',
      desc: 'Algorithmic urgency tiering based on SLA risk & dollar amount',
      telemetry: {
        title: 'Severity Tier Assignment',
        detail: 'Calculated Severity: HIGH\nFinancial Exposure: $149.00 USD\nCustomer Segment: VIP Enterprise Lead ($4,800 LTV)',
        badge: 'High Severity',
      },
    },
    {
      id: 4,
      name: 'CLUSTERING',
      tag: 'Step 05',
      desc: '768-dim semantic embeddings grouped via HDBSCAN',
      telemetry: {
        title: 'Semantic Vector Proximity',
        detail: 'Mapped to Cluster: "Refund Processing Delay"\nCosine Distance: 0.11 (Extremely Dense)\nActive Cluster Size: 184 complaints',
        badge: 'Cosine: 0.89',
      },
    },
    {
      id: 5,
      name: 'TRENDS',
      tag: 'Step 06',
      desc: 'Emerging spike alarms and systemic hypothesis extraction',
      telemetry: {
        title: 'Systemic Spike Alert',
        detail: 'Trend Velocity: +34% growth in 24 hours\nRoot Cause: Payment Gateway Webhook timeout on voids\nSuggested Action: Engineering review + automated void trigger',
        badge: 'Spike Alert: +34%',
      },
    },
  ];

  return (
    <section id="intelligence" className="relative py-32 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      {/* Background wireframe triangle */}
      <div className="absolute right-0 top-1/4 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <polygon points="50,5 95,90 5,90" stroke="#8052ff" strokeWidth="0.5" />
          <polygon points="50,20 80,80 20,80" stroke="#ffb829" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
            <span>03 / STUDENT 2 INTELLIGENCE ENGINE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-tight">
            From complaints <br />
            <span className="text-[#8052ff]">to intelligence.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#9a9a9a] leading-relaxed">
            Every unstructured customer sentence flows through an automated six-stage computational pipeline. Raw complaints transform into verified severity ratings, vector distances, and emerging operational defect alerts.
          </p>
        </div>

        {/* Animated Pipeline Progression Bar */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#8052ff] text-white shadow-lg shadow-[#8052ff]/20'
                      : 'bg-[#080808] border-white/5 text-[#9a9a9a] hover:text-white hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#9a9a9a] mb-2">
                    <span>{step.tag}</span>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8052ff]" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-white tracking-wide">
                    {step.name}
                  </p>
                  <p className="text-[11px] text-[#9a9a9a] mt-1 line-clamp-2">
                    {step.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Step Telemetry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Step Detail Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#080808] border border-white/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#8052ff]">
                  <Activity className="h-4 w-4" />
                  <span>PIPELINE INSPECTOR // {pipelineSteps[activeStep].name}</span>
                </div>
                <span className="font-mono text-[11px] text-[#ffb829] bg-[#ffb829]/10 px-2.5 py-0.5 rounded-full border border-[#ffb829]/30">
                  {pipelineSteps[activeStep].telemetry.badge}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9a9a9a]">
                  {pipelineSteps[activeStep].telemetry.title}
                </span>
                <div className="p-4 rounded-xl bg-[#020202] border border-white/5 font-mono text-xs text-[#bdbdbd] leading-relaxed whitespace-pre-line">
                  {pipelineSteps[activeStep].telemetry.detail}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-[#9a9a9a]">
              <span>Latency: &lt; 14ms on GPU</span>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % pipelineSteps.length)}
                className="flex items-center gap-1.5 text-white hover:text-[#8052ff] transition-colors"
              >
                <span>Next Pipeline Stage</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Live Trend Telemetry Summary */}
          <div className="lg:col-span-5 rounded-2xl bg-[#080808] border border-white/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="font-mono text-xs text-white uppercase tracking-wider">
                  Operational Trends
                </span>
                <span className="font-mono text-[11px] text-[#15846e]">
                  LIVE SYNC
                </span>
              </div>

              {/* Trend items */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#0e0e0e] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white font-medium">Refund Processing Delay</p>
                    <p className="text-[10px] text-[#9a9a9a] font-mono">184 complaints · Root: Gateway v2</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-[#ffb829] font-semibold">
                      <Flame className="h-3 w-3" />
                      +34%
                    </span>
                    <p className="text-[10px] text-[#9a9a9a]">24h velocity</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0e0e0e] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white font-medium">Delivery Transit Stall</p>
                    <p className="text-[10px] text-[#9a9a9a] font-mono">126 complaints · Root: Midwest Hub</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#ffb829] font-semibold">+18%</span>
                    <p className="text-[10px] text-[#9a9a9a]">24h velocity</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0e0e0e] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white font-medium">Double Billing Subscriptions</p>
                    <p className="text-[10px] text-[#9a9a9a] font-mono">78 complaints · Root: Modal Retry</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#15846e] font-semibold">+8%</span>
                    <p className="text-[10px] text-[#9a9a9a]">stable</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onExploreAnalytics}
              className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-[#8052ff] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore full intelligence analytics in app</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
