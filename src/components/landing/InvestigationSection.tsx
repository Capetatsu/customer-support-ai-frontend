import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Search,
  FileText,
  User,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

interface InvestigationSectionProps {
  onInspectCase: (caseId: string) => void;
}

export const InvestigationSection: React.FC<InvestigationSectionProps> = ({
  onInspectCase,
}) => {
  const [activeTab, setActiveTab] = useState<'trace' | 'evidence' | 'reply'>('trace');

  const steps = [
    { num: '01', title: 'Intake Complaint', detail: 'Received via Web Helpdesk', status: 'done', latency: '12ms' },
    { num: '02', title: 'Intent & Urgency Classification', detail: 'LOST_IN_TRANSIT // Severity: High', status: 'done', latency: '24ms' },
    { num: '03', title: 'Customer 360 Retrieval', detail: 'Customer Sarah Lin (VIP Tier, $4,800 LTV, 18 Orders)', status: 'done', latency: '38ms' },
    { num: '04', title: 'Carrier Logistics API Query', detail: 'FedEx Tracking #789012 stalled in Denver hub 4 days', status: 'done', latency: '65ms' },
    { num: '05', title: 'Policy Engine Evaluation', detail: 'Policy §4.2: Expedited replacement for VIP within 14d', status: 'done', latency: '18ms' },
    { num: '06', title: 'Historic Precedents Search', detail: '96% match with resolved precedent #CAS-741', status: 'done', latency: '32ms' },
    { num: '07', title: 'Root Cause Synthesis', detail: 'Carrier transit stall caused by Denver terminal backlog', status: 'done', latency: '29ms' },
    { num: '08', title: 'Guardrail Enforcement', detail: 'Value ($189.50) exceeds $50 auto-threshold → Human Gate', status: 'done', latency: '11ms' },
    { num: '09', title: 'Deterministic Resolution Draft', detail: 'Replacement dispatch + $25 courtesy store credit', status: 'done', latency: '44ms' },
    { num: '10', title: 'Human Approval Gate', detail: 'Awaiting operator confirmation in Approvals Queue', status: 'active', latency: 'Live' },
  ];

  const evidenceItems = [
    { title: 'Customer Lifetime Profile', fact: 'VIP Tier, 18 successful orders, zero prior complaints, 100% genuine trust score.', source: 'Database (Student 1)' },
    { title: 'Carrier Tracking Telemetry', fact: 'FedEx API reports last scan in Denver sorting hub 96 hours ago with no subsequent motion.', source: 'Logistics API' },
    { title: 'Corporate Guarantee Policy', fact: 'Policy §4.2 allows immediate zero-cost replacement dispatch for premium accounts when transit exceeds 72h stall.', source: 'Policy Engine' },
    { title: 'Historical Precedent #741', fact: 'Case #CAS-741 resolved identical Denver freeze incident with expedited replacement and 5/5 CSAT rating.', source: 'Vector Precedents' },
  ];

  return (
    <section id="investigation" className="relative py-32 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
            <span>04 / STUDENT 3 AI RESOLUTION AGENT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-tight">
            Autonomous <br />
            <span className="text-[#8052ff]">investigation.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#9a9a9a] leading-relaxed">
            No robotic scripts or blind hallucinations. The resolution agent performs a systematic 10-step investigation across user databases, carrier APIs, and refund policies before recommending any action.
          </p>
        </div>

        {/* Live Case Workspace Frame */}
        <div className="rounded-3xl bg-[#080808] border border-white/5 overflow-hidden shadow-2xl">
          {/* Case Header Strip */}
          <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-[#8052ff]/10 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff]">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-white">CASE #CAS-2024-001</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffb829]/15 border border-[#ffb829]/30 text-[#ffb829] font-mono text-[10px]">
                    Pending Approval
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#8052ff]/15 border border-[#8052ff]/30 text-[#8052ff] font-mono text-[10px]">
                    VIP Tier
                  </span>
                </div>
                <p className="text-xs text-[#9a9a9a]">
                  Customer: Sarah Lin · Order #ORD-8821 ($189.50) · "Delivery is 4 days late with no tracking updates"
                </p>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-[#141414] border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('trace')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'trace' ? 'bg-[#8052ff] text-white' : 'text-[#9a9a9a] hover:text-white'
                }`}
              >
                10-Step Trace
              </button>
              <button
                onClick={() => setActiveTab('evidence')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'evidence' ? 'bg-[#8052ff] text-white' : 'text-[#9a9a9a] hover:text-white'
                }`}
              >
                Verified Evidence
              </button>
              <button
                onClick={() => setActiveTab('reply')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'reply' ? 'bg-[#8052ff] text-white' : 'text-[#9a9a9a] hover:text-white'
                }`}
              >
                Drafted Response
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'trace' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a] pb-2">
                  <span>INVESTIGATION REASONING TIMELINE</span>
                  <span>TOTAL LATENCY: 298ms</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {steps.map((step) => (
                    <div
                      key={step.num}
                      className={`p-3.5 rounded-xl border transition-all ${
                        step.status === 'active'
                          ? 'bg-[#8052ff]/10 border-[#8052ff]/40 text-white'
                          : 'bg-[#0e0e0e] border-white/5 text-[#bdbdbd]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#8052ff] font-semibold">{step.num}</span>
                        <div className="flex items-center gap-1.5">
                          {step.status === 'done' ? (
                            <span className="text-[#15846e] flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              {step.latency}
                            </span>
                          ) : (
                            <span className="text-[#ffb829] flex items-center gap-1 animate-pulse">
                              <Clock className="h-3 w-3" />
                              AWAITING HUMAN
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-white">{step.title}</p>
                      <p className="text-[11px] text-[#9a9a9a] mt-0.5">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a] pb-2">
                  <span>CROSS-SYSTEM EVIDENCE RETRIEVAL</span>
                  <span className="text-[#15846e]">4 VERIFIED SOURCES</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evidenceItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0e0e0e] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white">{item.title}</span>
                        <span className="text-[10px] font-mono text-[#8052ff] bg-[#8052ff]/10 px-2 py-0.5 rounded border border-[#8052ff]/20">
                          {item.source}
                        </span>
                      </div>
                      <p className="text-xs text-[#bdbdbd] font-light leading-relaxed">
                        {item.fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reply' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a] pb-2">
                  <span>SYNTHESIZED CUSTOMER RESPONSE (PRE-DRAFTED)</span>
                  <span className="text-[#8052ff]">Ready for Operator Approval</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#020202] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
                    <span>TO: sarah.lin@enterprise.com</span>
                    <span>SUBJECT: Immediate update regarding Order #ORD-8821</span>
                  </div>

                  <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                    Dear Sarah,<br /><br />
                    Thank you for contacting us regarding Order #ORD-8821. We have investigated the transit status with FedEx and confirmed that your package experienced an unexpected 4-day sorting backlog at the Denver terminal.<br /><br />
                    Because you are a valued VIP partner, we have immediately initiated an expedited priority replacement shipment via FedEx Overnight at zero charge to you. Additionally, we have applied a $25 courtesy credit to your account for the inconvenience.<br /><br />
                    You will receive the new tracking number in a separate email within the next 30 minutes. Please let us know if there is anything else we can do to make this right.
                  </p>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
                    <span>Tone: Empathetic & Solution-first</span>
                    <span>Policy Citation: §4.2 VIP Expedited Replacement</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar with Action */}
          <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between">
            <span className="text-xs text-[#9a9a9a] font-mono">
              Action proposed: <strong className="text-white">Priority Replacement + $25 Credit</strong>
            </span>
            <button
              onClick={() => onInspectCase('CAS-001')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-medium transition-colors shadow-lg shadow-[#8052ff]/20 cursor-pointer"
            >
              <span>Inspect full investigation in app</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
