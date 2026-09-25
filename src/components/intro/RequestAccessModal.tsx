// RequestAccessModal.tsx
// Elegant Request Access modal with immediate option to enter the live Customer Support Cockpit.

import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, LayoutDashboard, Sparkles } from 'lucide-react';
import { useToast } from '../ui/Toast';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterCockpit: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  isOpen,
  onClose,
  onEnterCockpit,
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    showToast('Early access request received. Demo environment unlocked.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-6 text-white font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9a9a9a] hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header with 4-petal logo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d="M14 14C14 6.268 7.732 0 0 0V14H14Z" fill="#2de0c2" />
              <path d="M14 14C21.732 14 28 7.732 28 0H14V14Z" fill="#8052ff" />
              <path d="M14 14C14 21.732 20.268 28 28 28V14H14Z" fill="#ffb829" />
              <path d="M14 14C6.268 14 0 20.268 0 28H14V14Z" fill="#ff8e52" />
            </svg>
            <span className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider">
              Dala Access Portal
            </span>
          </div>

          <h3 className="text-2xl font-normal tracking-tight text-white">
            Unlock the Intelligence System
          </h3>
          <p className="text-xs font-extralight text-[#9a9a9a] leading-relaxed">
            Experience real-time customer complaint clustering, 10-step investigation reasoning, and human-in-the-loop approvals.
          </p>
        </div>

        {/* Immediate Demo Access Button */}
        <div className="p-4 rounded-2xl bg-[#8052ff]/10 border border-[#8052ff]/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#8052ff] font-medium uppercase tracking-wider">
              Live Operations Sandbox
            </span>
            <span className="text-[10px] text-[#2de0c2] bg-[#2de0c2]/10 px-2 py-0.5 rounded">
              Ready to Explore
            </span>
          </div>

          <p className="text-xs text-[#bdbdbd] font-light">
            Skip the waitlist and enter the live interactive support intelligence workspace immediately.
          </p>

          <button
            onClick={() => {
              onClose();
              onEnterCockpit();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-medium tracking-wide transition-all shadow-md shadow-[#8052ff]/30 cursor-pointer"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Launch Operations Cockpit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-mono text-[#9a9a9a] uppercase">Or request invitation</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Request Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a] uppercase block mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#8052ff]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#9a9a9a] uppercase block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#8052ff]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wide transition-colors cursor-pointer"
            >
              Submit Waitlist Request
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-[#15846e]/15 border border-[#15846e]/30 space-y-2 text-center text-xs">
            <CheckCircle2 className="h-6 w-6 text-[#2de0c2] mx-auto" />
            <p className="font-medium text-white">You're on the list!</p>
            <p className="text-[#9a9a9a] text-[11px]">
              We've dispatched confirmation to <span className="text-white">{email}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
