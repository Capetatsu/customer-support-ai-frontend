// StoryStage.tsx
// Single active scene renderer - 7 clean story scenes

import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

type SceneId = 'brain' | 'scatter' | 'clusters' | 'bulb' | 'investigation' | 'recommendation' | 'resolution';

interface StoryStageProps {
  scene: SceneId;
  sceneProgress: number; // 0-1 within current scene
  onExplore: () => void;
  onEnterApp: () => void;
}

const sceneData: Record<SceneId, {
  eyebrow: string;
  headline: string;
  body: string;
  labels?: string[];
  ctaText?: string;
  ctaAction?: () => void;
  side: 'left' | 'right';
}> = {
  brain: {
    eyebrow: '01 THE PROBLEM',
    headline: 'Turn customer\ncomplaints\ninto decisions.',
    body: 'Customer signals are scattered across complaints, reviews, tickets and orders. We turn those signals into actionable intelligence and evidence-backed resolution workflows.',
    labels: ['10-Step Investigation', 'Semantic Clustering', 'Human Approval Gate'],
    ctaText: 'Explore the system',
    side: 'left',
  },
  scatter: {
    eyebrow: '02 SCATTERED SIGNALS',
    headline: 'Thousands of signals.\nOne hidden pattern.',
    body: 'Every complaint arrives as noise. A refund request here. A delivery delay there. A damaged item. A failed payment. Individually meaningless. Collectively: the truth.',
    labels: ['Refund pending', 'Late delivery', 'Wrong item', 'Payment failed', 'Damaged product'],
    side: 'left',
  },
  clusters: {
    eyebrow: '03 INTELLIGENCE',
    headline: 'From noise\nto intelligence.',
    body: 'The Intelligence Engine classifies complaints, understands sentiment and severity, groups similar issues and detects emerging trends.',
    labels: ['CLASSIFY', 'SENTIMENT', 'SEVERITY', 'CLUSTER', 'TREND'],
    side: 'left',
  },
  bulb: {
    eyebrow: '04 INSIGHT',
    headline: 'Patterns become\nvisible.',
    body: 'Recurring complaints reveal problems that individual tickets can hide.',
    labels: ['REFUND PENDING — 184 complaints — +34% this week'],
    side: 'right',
  },
  investigation: {
    eyebrow: '05 INVESTIGATION',
    headline: 'Now investigate\none case.',
    body: 'The Resolution Agent combines the complaint with customer context, order information, approved policy and similar historical cases.',
    labels: ['COMPLAINT', 'ORDER', 'CUSTOMER', 'POLICY', 'SIMILAR CASES', 'INVESTIGATION'],
    side: 'left',
  },
  recommendation: {
    eyebrow: '06 RECOMMENDATION + APPROVAL',
    headline: 'Recommend.\nDon\'t guess.',
    body: 'The system produces a recommendation with full evidence traceability. Human approval is required for high-consequence actions.',
    labels: [
      'RECOMMENDED ACTION: Offer Return / Replacement',
      'REASON: Item delivered. Return window open. 92% similar cases resolved.',
      'CONFIDENCE: 91%',
      'HUMAN APPROVAL: Approve · Modify · Reject'
    ],
    side: 'right',
  },
  resolution: {
    eyebrow: '07 RESOLUTION',
    headline: 'From complaint\nto resolution.',
    body: 'Every outcome becomes part of the closed loop. The system learns. The customer is heard. The problem is solved.',
    labels: [
      'Complaint → Intelligence → Investigation → Recommendation → Approval → Resolution → Feedback'
    ],
    ctaText: 'Enter Application',
    side: 'left',
  },
};

export const StoryStage: React.FC<StoryStageProps> = ({
  scene,
  sceneProgress,
  onExplore,
  onEnterApp,
}) => {
  const data = sceneData[scene];
  const isLastScene = scene === 'resolution';

  // Fade in/out based on scene progress
  const opacity = Math.max(0, Math.min(1, sceneProgress));
  const translateY = (1 - sceneProgress) * 25;

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-20 flex items-center justify-between pt-20 pb-12 px-6 md:px-16 transition-opacity duration-300 select-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Column */}
        <div
          className={`lg:col-span-7 space-y-8 ${data.side === 'right' ? 'lg:col-start-6' : ''}`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-xs font-mono text-[#bdbdbd]">
            <span className="text-[#8052ff]">{data.eyebrow.split(' ')[0]}</span>
            <span className="text-[#9a9a9a]">/</span>
            <span className="tracking-wider uppercase text-[11px]">{data.eyebrow.split(' ').slice(1).join(' ')}</span>
          </div>

          {/* Display Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-[-0.04em] text-white leading-[1.03]">
            {data.headline.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] max-w-xl leading-relaxed tracking-tight">
            {data.body}
          </p>

          {/* Labels */}
          {data.labels && data.labels.length > 0 && (
            <div className="pt-4 border-t border-[#1a1a1a] space-y-3 text-sm font-mono text-[#9a9a9a]">
              {data.labels.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i < 5 && (
                    <span className="w-5 h-5 rounded-full border border-[#8052ff]/50 flex items-center justify-center text-[10px] text-[#8052ff]">
                      {i + 1}
                    </span>
                  )}
                  <span className="text-white font-light tracking-wide uppercase">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {(data.ctaText || isLastScene) && (
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {data.ctaText && !isLastScene && (
                <button
                  onClick={onExplore}
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-normal text-xs hover:bg-[#eaeaea] transition-all cursor-pointer shadow-lg shadow-white/10"
                >
                  <span>{data.ctaText}</span>
                  <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 text-black" />
                </button>
              )}
              {isLastScene && (
                <button
                  onClick={onEnterApp}
                  className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white font-normal text-xs transition-all shadow-xl shadow-[#8052ff]/25 hover:shadow-[#8052ff]/45 cursor-pointer"
                >
                  <span>Enter Application</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          )}

          {/* Metric chips - only on brain scene */}
          {scene === 'brain' && (
            <div className="pt-6 border-t border-[#1a1a1a] flex flex-wrap items-center gap-8 text-xs font-mono text-[#9a9a9a]">
              <div>
                <p className="text-white text-base font-light tracking-tight font-sans">10-Step</p>
                <p className="text-[10px] text-[#9a9a9a] uppercase">Investigation Flow</p>
              </div>
              <div className="h-6 w-px bg-[#1a1a1a]" />
              <div>
                <p className="text-[#8052ff] text-base font-light tracking-tight font-sans">Semantic</p>
                <p className="text-[10px] text-[#9a9a9a] uppercase">Pattern Clustering</p>
              </div>
              <div className="h-6 w-px bg-[#1a1a1a]" />
              <div>
                <p className="text-[#ffb829] text-base font-light tracking-tight font-sans">100%</p>
                <p className="text-[10px] text-[#9a9a9a] uppercase">Human Approval Gate</p>
              </div>
            </div>
          )}
        </div>

        {/* Particle Visual Column - opposite side */}
        <div className={`lg:col-span-5 pointer-events-none hidden lg:block ${data.side === 'left' ? 'lg:col-start-8' : ''}`} />
      </div>

      {/* Bottom scroll prompt - only on early scenes */}
      {['brain', 'scatter', 'clusters'].includes(scene) && (
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a] absolute bottom-8 left-0 right-0 px-6 md:px-16">
          <button
            onClick={onExplore}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowDown className="h-3.5 w-3.5 text-[#8052ff] animate-bounce" />
            <span>
              {scene === 'brain' && 'Scroll down to disintegrate the intelligence brain into raw signals'}
              {scene === 'scatter' && 'Scroll to see intelligence emerge from scattered signals'}
              {scene === 'clusters' && 'Scroll to see patterns become visible'}
            </span>
          </button>
          <span className="hidden sm:inline text-[#bdbdbd]">
            {scene === 'brain' && 'SCROLL // 01 → 07'}
            {scene === 'scatter' && '02 / 07'}
            {scene === 'clusters' && '03 / 07'}
          </span>
        </div>
      )}
    </div>
  );
};