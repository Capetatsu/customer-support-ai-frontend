// SignalScene.tsx
// Scene 2: Brain disintegrates; thousands of particles scatter into raw moving customer signals.

import React from 'react';

interface SignalSceneProps {
  progress: number;
}

const rawSignals = [
  { id: '1', text: 'My refund is still pending after 14 days.', channel: 'web', top: '18%', left: '12%', color: '#8052ff' },
  { id: '2', text: 'Package arrived crushed with broken interior seal.', channel: 'email', top: '26%', left: '68%', color: '#15846e' },
  { id: '3', text: 'Charged twice for annual subscription renewal.', channel: 'whatsapp', top: '72%', left: '16%', color: '#8052ff' },
  { id: '4', text: 'Delivery is 4 days late with zero tracking update.', channel: 'web', top: '78%', left: '62%', color: '#ffb829' },
  { id: '5', text: 'Wrong item size dispatched in replacement order.', channel: 'email', top: '42%', left: '78%', color: '#15846e' },
  { id: '6', text: 'Courier claims delivered but porch camera shows nothing.', channel: 'web', top: '38%', left: '22%', color: '#ffb829' },
];

export const SignalScene: React.FC<SignalSceneProps> = ({ progress }) => {
  // Fade in from 0.16 to 0.22, hold until 0.28, fade out by 0.34
  let opacity = 0;
  if (progress >= 0.16 && progress < 0.22) {
    opacity = (progress - 0.16) / 0.06;
  } else if (progress >= 0.22 && progress <= 0.28) {
    opacity = 1;
  } else if (progress > 0.28 && progress <= 0.34) {
    opacity = 1 - (progress - 0.28) / 0.06;
  }

  if (opacity <= 0) return null;

  return (
    <div
      style={{ opacity, pointerEvents: opacity > 0.4 ? 'auto' : 'none' }}
      className="fixed inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-16 transition-opacity duration-200"
    >
      {/* Narrative Headline in Center-Left */}
      <div className="max-w-2xl mx-auto md:mx-0 space-y-4 my-auto pointer-events-auto">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
          <span>02 / CUSTOMER SIGNALS</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.04em] text-white leading-tight">
          Thousands of signals. <br />
          <span className="text-[#8052ff]">One hidden pattern.</span>
        </h2>

        <p className="text-base sm:text-lg font-extralight text-[#9a9a9a] leading-relaxed max-w-lg">
          Support tickets, emails, reviews, and chat logs arrive as isolated complaints. In the void, they drift as raw unstructured noise.
        </p>
      </div>

      {/* Floating Real-World Complaint Snippets between the particles */}
      <div className="absolute inset-0 pointer-events-none">
        {rawSignals.map((item, idx) => {
          // Dynamic gentle floating motion
          const floatOffset = Math.sin((progress * 20) + idx) * 12;

          return (
            <div
              key={item.id}
              style={{
                top: item.top,
                left: item.left,
                transform: `translateY(${floatOffset}px)`,
              }}
              className="absolute hidden md:block max-w-xs p-3 rounded-xl bg-[#080808]/85 border border-white/10 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#9a9a9a] pb-1">
                <span className="uppercase" style={{ color: item.color }}>● {item.channel}</span>
                <span>Active</span>
              </div>
              <p className="text-xs font-light text-white leading-snug">
                "{item.text}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer telemetry caption */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
        <span>HDBSCAN EMBEDDING LATENT SPACE</span>
        <span>SCATTER STAGE · 2,200 RAW VECTORS</span>
      </div>
    </div>
  );
};
