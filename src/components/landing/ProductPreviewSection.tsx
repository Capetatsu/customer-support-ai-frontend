import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  CheckCircle,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductPreviewSectionProps {
  onLaunchView: (route: string) => void;
}

export const ProductPreviewSection: React.FC<ProductPreviewSectionProps> = ({
  onLaunchView,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'complaints' | 'cases' | 'approvals'>('dashboard');

  const tabs = [
    { id: 'dashboard' as const, label: 'Overview Cockpit', icon: LayoutDashboard, route: 'dashboard' },
    { id: 'complaints' as const, label: 'Complaints Stream', icon: Inbox, route: 'complaints' },
    { id: 'cases' as const, label: 'Case Investigation', icon: Briefcase, route: 'cases' },
    { id: 'approvals' as const, label: 'Approvals Queue', icon: CheckCircle, route: 'approvals' },
  ];

  return (
    <section id="preview" className="relative py-32 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
            <span>06 / OPERATIONAL COCKPIT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-tight">
            Explore the <br />
            <span className="text-[#8052ff]">interface.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#9a9a9a] leading-relaxed">
            Designed according to strict editorial principles: zero decorative clutter, high-density monospace telemetry, and instant keyboard-accessible operator workflows.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#080808] border border-white/5 max-w-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] text-white font-medium border border-white/10 shadow-lg'
                    : 'text-[#9a9a9a] hover:text-white hover:bg-[#101010]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#8052ff]' : 'text-[#9a9a9a]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive View Container Frame */}
        <div className="rounded-3xl bg-[#080808] border border-white/5 overflow-hidden shadow-2xl">
          {/* Mock Browser/App Chrome Header */}
          <div className="px-6 py-3.5 border-b border-white/5 bg-[#050505] flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#222222]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#222222]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#222222]" />
              <span className="ml-3 text-[11px] text-[#bdbdbd]">
                app.support.ai / {activeTab}
              </span>
            </div>

            <button
              onClick={() => onLaunchView(activeTab)}
              className="flex items-center gap-1.5 text-xs text-[#8052ff] hover:text-white transition-colors cursor-pointer"
            >
              <span>Launch in live app</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Dynamic Preview Viewport */}
          <div className="p-6 sm:p-8 min-h-[480px] bg-[#020202]">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">Total Ingested</span>
                      <p className="text-2xl font-light text-white font-mono">1,482</p>
                      <span className="text-[10px] font-mono text-[#15846e]">+12% vs last week</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">High Severity</span>
                      <p className="text-2xl font-light text-white font-mono">24</p>
                      <span className="text-[10px] font-mono text-[#ffb829]">Needs operator review</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">Pending Approvals</span>
                      <p className="text-2xl font-light text-[#8052ff] font-mono">3</p>
                      <span className="text-[10px] font-mono text-[#8052ff]">Gate active</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">Autonomous Ratio</span>
                      <p className="text-2xl font-light text-white font-mono">78.4%</p>
                      <span className="text-[10px] font-mono text-[#15846e]">Zero-touch resolution</span>
                    </div>
                  </div>

                  {/* SVG Chart Preview */}
                  <div className="p-6 rounded-2xl bg-[#080808] border border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white">COMPLAINT VOLUME & ESCALATION TRAJECTORY (30D)</span>
                      <span className="text-[#8052ff]">● Volume  ▲ Escalation</span>
                    </div>
                    <div className="h-36 w-full flex items-end gap-2 pt-6">
                      {[40, 55, 38, 70, 85, 62, 95, 110, 88, 120, 140, 115, 90, 75, 130, 145].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-t transition-all ${
                              i >= 10 ? 'bg-[#8052ff]' : 'bg-[#1a1a1a]'
                            }`}
                            style={{ height: `${(val / 150) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'complaints' && (
                <motion.div
                  key="complaints"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 text-xs font-mono text-[#9a9a9a]">
                    <span>HIGH-DENSITY COMPLAINTS QUEUE</span>
                    <span>35 ACTIVE RECORDS</span>
                  </div>

                  <div className="rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0a0a0a] text-[10px] font-mono text-[#9a9a9a] uppercase border-b border-white/5">
                        <tr>
                          <th className="py-2.5 px-4">ID</th>
                          <th className="py-2.5 px-4">Customer & Issue</th>
                          <th className="py-2.5 px-4">Severity</th>
                          <th className="py-2.5 px-4">Cluster</th>
                          <th className="py-2.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-xs">
                        <tr className="hover:bg-[#0a0a0a]">
                          <td className="py-3 px-4 text-[#8052ff]">C-001</td>
                          <td className="py-3 px-4 font-sans text-white">Refund stalled after 14 days for order #8821</td>
                          <td className="py-3 px-4"><span className="text-[#ffb829]">High</span></td>
                          <td className="py-3 px-4 text-[#9a9a9a]">Refund Delay</td>
                          <td className="py-3 px-4 text-[#8052ff]">Pending Approval</td>
                        </tr>
                        <tr className="hover:bg-[#0a0a0a]">
                          <td className="py-3 px-4 text-[#8052ff]">C-002</td>
                          <td className="py-3 px-4 font-sans text-white">Delivered wrong size shoe for anniversary gift</td>
                          <td className="py-3 px-4"><span className="text-[#9a9a9a]">Medium</span></td>
                          <td className="py-3 px-4 text-[#9a9a9a]">Wrong Item</td>
                          <td className="py-3 px-4 text-[#15846e]">Resolved</td>
                        </tr>
                        <tr className="hover:bg-[#0a0a0a]">
                          <td className="py-3 px-4 text-[#8052ff]">C-003</td>
                          <td className="py-3 px-4 font-sans text-white">Package crushed and contents shattered during transit</td>
                          <td className="py-3 px-4"><span className="text-red-400">Critical</span></td>
                          <td className="py-3 px-4 text-[#9a9a9a]">Damage in Transit</td>
                          <td className="py-3 px-4 text-[#ffb829]">Investigating</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'cases' && (
                <motion.div
                  key="cases"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 text-xs font-mono text-[#9a9a9a]">
                    <span>CASE INVESTIGATION WORKSPACE</span>
                    <span>10-STEP REASONING ENGINE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono text-[#8052ff] uppercase">Customer 360</span>
                      <p className="text-white font-medium">Sarah Lin · VIP</p>
                      <p className="text-[#9a9a9a] text-[11px] leading-relaxed">
                        18 past orders with $4,800 LTV. Clean account with zero chargeback history.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono text-[#ffb829] uppercase">Logistics API</span>
                      <p className="text-white font-medium">FedEx Denver Stall</p>
                      <p className="text-[#9a9a9a] text-[11px] leading-relaxed">
                        Carrier tracking confirmed 4-day sort facility pause. Weather delay clause valid.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#080808] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono text-[#15846e] uppercase">Policy Check</span>
                      <p className="text-white font-medium">Rule §4.2 Satisfied</p>
                      <p className="text-[#9a9a9a] text-[11px] leading-relaxed">
                        Automatic replacement authorized for VIP tier without waiting for package return.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'approvals' && (
                <motion.div
                  key="approvals"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 text-xs font-mono text-[#9a9a9a]">
                    <span>PENDING OPERATOR GATES</span>
                    <span className="text-[#ffb829]">3 PENDING ACTIONS</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#080808] border border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-white">CAS-2024-001</span>
                        <span className="text-[10px] font-mono text-[#8052ff] bg-[#8052ff]/10 px-2 py-0.5 rounded">
                          Refund $189.50
                        </span>
                      </div>
                      <p className="text-xs text-[#9a9a9a]">Sarah Lin · Reason: FedEx transit stall</p>
                    </div>
                    <button
                      onClick={() => onLaunchView('approvals')}
                      className="px-4 py-2 rounded-full bg-[#8052ff] text-white text-xs font-medium hover:bg-[#7042ee] transition-colors"
                    >
                      Review in App
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-white/5 bg-[#050505] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#9a9a9a]">
              Full keyboard shortcut support (⌘K global search, J/K queue navigation)
            </span>
            <button
              onClick={() => onLaunchView(activeTab)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-normal text-xs hover:bg-[#eaeaea] transition-all cursor-pointer"
            >
              <span>Launch {tabs.find((t) => t.id === activeTab)?.label} in App</span>
              <ArrowRight className="h-3.5 w-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
