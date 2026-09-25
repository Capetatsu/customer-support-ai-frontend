import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Edit3,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HumanApprovalSectionProps {
  onGoToApprovals: () => void;
}

export const HumanApprovalSection: React.FC<HumanApprovalSectionProps> = ({
  onGoToApprovals,
}) => {
  const [decisionState, setDecisionState] = useState<'pending' | 'approved' | 'modified' | 'rejected'>('pending');
  const [refundAmount, setRefundAmount] = useState(189.50);
  const [isModifying, setIsModifying] = useState(false);
  const [tempAmount, setTempAmount] = useState('189.50');

  const handleApprove = () => {
    setDecisionState('approved');
    setIsModifying(false);
  };

  const handleSaveModification = () => {
    setRefundAmount(parseFloat(tempAmount) || 189.50);
    setDecisionState('modified');
    setIsModifying(false);
  };

  const handleReject = () => {
    setDecisionState('rejected');
    setIsModifying(false);
  };

  const handleReset = () => {
    setDecisionState('pending');
    setRefundAmount(189.50);
    setTempAmount('189.50');
    setIsModifying(false);
  };

  return (
    <section id="approvals" className="relative py-32 px-6 bg-[#000000] border-t border-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8052ff] uppercase tracking-wider">
            <span>05 / HUMAN-IN-THE-LOOP CONTROL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-tight">
            Autonomous execution. <br />
            <span className="text-[#8052ff]">Guarded by humans.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#9a9a9a] leading-relaxed">
            Full autonomy without oversight is a liability. Our deterministic guardrails ensure low-stakes inquiries resolve instantly, while high-value refunds and warranty exceptions require explicit human sanction before funds move.
          </p>
        </div>

        {/* Split Grid: Interactive Decision Card + Guardrails Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Operator Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#080808] border border-white/5 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#ffb829]" />
                <span className="font-mono text-xs text-white uppercase tracking-wider">
                  Interactive Gate Simulator
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#9a9a9a]">
                Case #CAS-2024-001
              </span>
            </div>

            {/* Case Details Box */}
            <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Full Refund & Courtesy Credit</h4>
                  <p className="text-xs text-[#9a9a9a]">Customer: Sarah Lin · VIP Tier</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono text-[#8052ff] font-semibold">
                    ${refundAmount.toFixed(2)} USD
                  </span>
                  <p className="text-[10px] text-[#9a9a9a] font-mono">+$25 store credit</p>
                </div>
              </div>

              <div className="text-xs text-[#bdbdbd] bg-[#050505] p-3 rounded-xl border border-white/5 leading-relaxed font-light">
                <strong>Agent Reasoning:</strong> FedEx transit stall in Denver confirmed via carrier API. Policy §4.2 applies. Customer lifetime value exceeds $4,800. Automated execution blocked because dollar value exceeds $50.00 auto-threshold.
              </div>
            </div>

            {/* State-dependent interactive area */}
            <AnimatePresence mode="wait">
              {decisionState === 'pending' && !isModifying && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-mono text-[#9a9a9a] uppercase">
                    Operator Decision Required:
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleApprove}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-medium transition-colors shadow-lg shadow-[#8052ff]/20 cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approve & Dispatch Refund</span>
                    </button>

                    <button
                      onClick={() => setIsModifying(true)}
                      className="flex items-center gap-2 py-3 px-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4 text-[#ffb829]" />
                      <span>Modify Terms</span>
                    </button>

                    <button
                      onClick={handleReject}
                      className="flex items-center gap-2 py-3 px-4 rounded-xl bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 text-[#9a9a9a] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span>Reject</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {isModifying && (
                <motion.div
                  key="modifying"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-[#0e0e0e] border border-[#ffb829]/40 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#ffb829]">
                    <span>MODIFY APPROVED REFUND AMOUNT</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-white">$</span>
                    <input
                      type="number"
                      value={tempAmount}
                      onChange={(e) => setTempAmount(e.target.value)}
                      className="bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#8052ff] w-36"
                    />
                    <span className="text-xs text-[#9a9a9a]">USD</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveModification}
                      className="px-4 py-2 rounded-xl bg-[#ffb829] text-black text-xs font-semibold hover:bg-[#e5a625] transition-colors cursor-pointer"
                    >
                      Confirm Modified Approval
                    </button>
                    <button
                      onClick={() => setIsModifying(false)}
                      className="px-4 py-2 rounded-xl text-xs text-[#9a9a9a] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {decisionState !== 'pending' && (
                <motion.div
                  key="decided"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-[#0e0e0e] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {decisionState === 'approved' && (
                        <span className="text-xs font-mono text-[#15846e] flex items-center gap-1.5 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          SANCTIONED & EXECUTED
                        </span>
                      )}
                      {decisionState === 'modified' && (
                        <span className="text-xs font-mono text-[#ffb829] flex items-center gap-1.5 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          MODIFIED TO ${refundAmount.toFixed(2)} & EXECUTED
                        </span>
                      )}
                      {decisionState === 'rejected' && (
                        <span className="text-xs font-mono text-red-400 flex items-center gap-1.5 font-semibold">
                          <XCircle className="h-4 w-4" />
                          REJECTED BY OPERATOR
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 text-[11px] font-mono text-[#9a9a9a] hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Replay test</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#bdbdbd] font-mono">
                    Audit Log Entry #AUD-9912 generated. Webhook dispatched to Stripe API. Customer Sarah Lin notified.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Guardrail Rules Matrix */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#080808] border border-white/5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-white">
                <Lock className="h-4 w-4 text-[#8052ff]" />
                <span>ACTIVE GUARDRAIL BOUNDARIES</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Financial Cap Rule</span>
                    <span className="font-mono text-[#8052ff]">&lt; $50.00 Auto</span>
                  </div>
                  <p className="text-[#9a9a9a] text-[11px]">
                    Refunds below $50 with verified carrier delay auto-execute; amounts above route to Human Gate.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">VIP Escalation Protocol</span>
                    <span className="font-mono text-[#ffb829]">Priority SLA</span>
                  </div>
                  <p className="text-[#9a9a9a] text-[11px]">
                    Enterprise and VIP clients receive dedicated operator review within 15 minutes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Auditability Mandate</span>
                    <span className="font-mono text-[#15846e]">100% Immutable</span>
                  </div>
                  <p className="text-[#9a9a9a] text-[11px]">
                    Every automated or human action writes a cryptographically verifiable log entry.
                  </p>
                </div>
              </div>

              <button
                onClick={onGoToApprovals}
                className="w-full flex items-center justify-between pt-4 border-t border-white/5 text-xs text-[#8052ff] hover:text-white transition-colors cursor-pointer"
              >
                <span>View all pending approvals in app</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
