import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface LandingNavbarProps {
  onEnterApp: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onEnterApp,
  onNavigateSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Signals', id: 'signals' },
    { label: 'Intelligence', id: 'intelligence' },
    { label: 'Investigation', id: 'investigation' },
    { label: 'Approval Gate', id: 'approvals' },
    { label: 'Interface', id: 'preview' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#000000]/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand & Logo with Refero angular triangle motif */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            {/* Angular geometric vector motif */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <polygon points="12,2 22,20 2,20" stroke="#8052ff" strokeWidth="1.8" fill="none" />
              <polygon points="12,7 19,19 5,19" fill="#8052ff" fillOpacity="0.22" />
              <circle cx="12" cy="13" r="2" fill="#ffb829" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-light tracking-tight text-white group-hover:text-white transition-colors">
              Customer Support
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#9a9a9a] uppercase">
              Intelligence & Resolution
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs font-light text-[#9a9a9a] hover:text-white transition-colors tracking-wide cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => onNavigateSection('signals')}
            className="text-xs text-[#9a9a9a] hover:text-white transition-colors px-3 py-1.5"
          >
            How it works
          </button>
          <button
            onClick={onEnterApp}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-normal transition-all shadow-lg shadow-[#8052ff]/20 hover:shadow-[#8052ff]/40 cursor-pointer"
          >
            <span>Enter Application</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9a9a9a] hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#000000]/95 backdrop-blur-2xl border-b border-white/10 p-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-sm text-[#9a9a9a] hover:text-white py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={onEnterApp}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#8052ff] text-white text-sm"
              >
                <span>Enter Application</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
