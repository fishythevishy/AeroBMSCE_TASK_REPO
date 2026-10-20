import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Workbench', href: '#workbench' },
    { label: 'Journey', href: '#journey' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#projects' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Partners', href: '#partners' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030305]/90 backdrop-blur-md border-b border-[#29263C]/80 aero-gloss-panel">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/images/logo.png"
            alt="AeroBMSCE Logo"
            className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
          <span className="sr-only">AeroBMSCE - BMS College of Engineering</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-[#D7D7E4]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#B9B7FF] transition-colors whitespace-nowrap shrink-0 text-[13px] tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-mono font-medium text-[#030305] bg-[#B9B7FF] rounded-md hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            CONNECT LAB
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#D7D7E4] hover:text-[#B9B7FF] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090910] border-b border-[#29263C] px-6 py-5 space-y-4 aero-gloss-panel">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#D7D7E4] hover:text-[#B9B7FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#15151F]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-xs font-mono font-semibold text-[#030305] bg-[#B9B7FF] rounded-md hover:bg-white transition-colors"
            >
              CONNECT WITH AEROBMSCE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
